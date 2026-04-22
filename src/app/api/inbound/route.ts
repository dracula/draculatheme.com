import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_TOKEN);

const {
  HUBSPOT_FORWARD_EMAIL,
  ZENO_EMAIL,
  LUCAS_EMAIL,
  DEFAULT_FORWARD_EMAIL
} = process.env;

const getForwardAddresses = (toAddress: string): string[] => {
  const addressMap: Record<string, (string | undefined)[]> = {
    "support@draculatheme.com": [HUBSPOT_FORWARD_EMAIL],
    "zeno@draculatheme.com": [HUBSPOT_FORWARD_EMAIL, ZENO_EMAIL],
    "lucas@draculatheme.com": [LUCAS_EMAIL]
  };

  return (addressMap[toAddress] || [DEFAULT_FORWARD_EMAIL]).filter(
    Boolean
  ) as string[];
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const extractEmailAddress = (fromHeader: string): string => {
  const trimmed = fromHeader.trim();
  const angleMatch = /<([^>]+)>/.exec(trimmed);
  return angleMatch?.[1]?.trim() ?? trimmed;
};

type ReceivingEmailFields = {
  from: string;
  reply_to: string[] | null;
  message_id: string;
  html: string | null;
  text: string | null;
};

const buildForwardContent = (
  email: ReceivingEmailFields,
  destinationAddress: string
): { html: string; text: string; replyTo: string } => {
  const originalFrom = email.from?.trim() || "Unknown sender";
  const replyToHeader =
    email.reply_to
      ?.map((address) => address.trim())
      .filter(Boolean)
      .join(", ") || null;

  const lines = [
    `Original sender: ${originalFrom}`,
    `Delivered to: ${destinationAddress}`,
    `Message-ID: ${email.message_id}`
  ];

  if (replyToHeader && replyToHeader !== originalFrom) {
    lines.push(`Original reply-to: ${replyToHeader}`);
  }

  const rule = "-".repeat(60);
  const textBanner = `${lines.join("\n")}\n${rule}\n\n`;
  const htmlBanner = `<div>\n${lines
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("\n")}\n</div>\n`;

  const trimmedText = email.text?.trim() ?? "";
  const trimmedHtml = email.html?.trim() ?? "";

  let bodyText: string;

  if (trimmedText) {
    bodyText = trimmedText;
  } else if (trimmedHtml) {
    bodyText = "(This message has no plain-text part; see the HTML version.)";
  } else {
    bodyText = "(No message body was available from the receiving gateway.)";
  }

  let bodyHtml: string;

  if (trimmedHtml) {
    bodyHtml = trimmedHtml;
  } else if (trimmedText) {
    bodyHtml = `<pre>${escapeHtml(trimmedText)}</pre>`;
  } else {
    bodyHtml =
      "<p>No message body was available from the receiving gateway.</p>";
  }

  const replyCandidate = extractEmailAddress(originalFrom);
  const replyTo =
    replyCandidate.includes("@") && !replyCandidate.includes(" ")
      ? replyCandidate
      : "";

  return {
    html: htmlBanner + bodyHtml,
    text: textBanner + bodyText,
    replyTo
  };
};

export const POST = async (request: NextRequest) => {
  try {
    const payload = await request.text();

    const event = await resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get("svix-id") || "",
        timestamp: request.headers.get("svix-timestamp") || "",
        signature: request.headers.get("svix-signature") || ""
      },
      webhookSecret: process.env.RESEND_WEBHOOK_SECRET || ""
    });

    if (event.type === "email.received") {
      const emailId = event.data.email_id;

      const { data: email, error: emailError } =
        await resend.emails.receiving.get(emailId);

      if (emailError || !email) {
        console.error("Failed to retrieve email:", emailError);
        return NextResponse.json(
          { message: "Failed to retrieve email" },
          { status: 500 }
        );
      }

      const { data: attachmentsResponse, error: attachmentsError } =
        await resend.emails.receiving.attachments.list({ emailId });

      if (attachmentsError) {
        console.error("Failed to retrieve attachments:", attachmentsError);
      }

      const attachments =
        attachmentsResponse?.data
          ?.filter((attachment) => attachment.download_url)
          .map((attachment) => ({
            path: attachment.download_url,
            filename: attachment.filename
          })) || [];

      const toAddress = email.to?.[0] || "";
      const forwardAddresses = getForwardAddresses(toAddress);

      if (forwardAddresses.length === 0) {
        return NextResponse.json(
          { message: "No forward addresses configured" },
          { status: 400 }
        );
      }

      const { html, text, replyTo } = buildForwardContent(email, toAddress);

      const { error: sendError } = await resend.emails.send({
        from: "forward@draculatheme.com",
        to: forwardAddresses,
        subject: event.data.subject || email.subject || "(no subject)",
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
        ...(attachments.length > 0 && { attachments })
      });

      if (sendError) {
        console.error("Failed to forward email:", sendError);
        return NextResponse.json(
          { message: "Failed to forward email" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Email forwarded successfully",
        attachmentsCount: attachments.length
      });
    }

    return NextResponse.json({ message: "Email received" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ message: "Invalid webhook" }, { status: 400 });
  }
};
