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
  const forwardAddresses: string[] = [];

  switch (toAddress) {
    case "support@draculatheme.com":
      if (HUBSPOT_FORWARD_EMAIL) {
        forwardAddresses.push(HUBSPOT_FORWARD_EMAIL);
      }
      break;
    case "zeno@draculatheme.com":
      if (HUBSPOT_FORWARD_EMAIL) {
        forwardAddresses.push(HUBSPOT_FORWARD_EMAIL);
      }
      if (ZENO_EMAIL) {
        forwardAddresses.push(ZENO_EMAIL);
      }
      break;
    case "lucas@draculatheme.com":
      if (LUCAS_EMAIL) {
        forwardAddresses.push(LUCAS_EMAIL);
      }
      break;
    default:
      if (DEFAULT_FORWARD_EMAIL) {
        forwardAddresses.push(DEFAULT_FORWARD_EMAIL);
      }
      break;
  }

  return forwardAddresses;
};

const downloadAndEncodeAttachments = async (
  attachments: Array<{
    id: string;
    filename?: string;
    content_type?: string;
    download_url: string;
  }>
): Promise<
  Array<{
    filename: string;
    content: string;
    type?: string;
  }>
> => {
  const processedAttachments = [];

  for (const attachment of attachments) {
    try {
      if (!attachment.download_url) {
        console.error("Attachment missing download_url");
        continue;
      }

      const response = await fetch(attachment.download_url);

      if (!response.ok) {
        console.error(
          `Failed to download attachment ${attachment.filename || "unknown"}: ${response.statusText}`
        );
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      const base64Content = buffer.toString("base64");

      processedAttachments.push({
        filename: attachment.filename || "attachment",
        content: base64Content,
        type: attachment.content_type
      });
    } catch (error) {
      console.error(
        `Error processing attachment ${attachment.filename || "unknown"}:`,
        error
      );
    }
  }

  return processedAttachments;
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
        await resend.emails.receiving.attachments.list({
          emailId
        });

      if (attachmentsError) {
        console.error("Failed to retrieve attachments:", attachmentsError);
      }

      const attachmentsList =
        attachmentsResponse?.data && attachmentsResponse.data.length > 0
          ? attachmentsResponse.data
          : [];

      const attachments =
        attachmentsList.length > 0
          ? await downloadAndEncodeAttachments(attachmentsList)
          : [];

      const toAddress = email.to?.[0] || "";
      const forwardAddresses = getForwardAddresses(toAddress);

      if (forwardAddresses.length === 0) {
        return NextResponse.json(
          { message: "No forward addresses configured" },
          { status: 400 }
        );
      }

      const { error: sendError } = await resend.emails.send({
        from: "forward@draculatheme.com",
        to: forwardAddresses,
        subject: event.data.subject || email.subject || "",
        html: email.html || "",
        text: email.text || "",
        attachments: attachments.length > 0 ? attachments : undefined
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
