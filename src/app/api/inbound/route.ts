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

      const { error: sendError } = await resend.emails.send({
        from: "forward@draculatheme.com",
        to: forwardAddresses,
        subject: event.data.subject || email.subject || "",
        html: email.html || "",
        text: email.text || "",
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
