import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type InboundEmailPayload = {
  type: string;
  data?: {
    id?: string;
    to?: string;
    subject?: string;
    html?: string;
  };
};

const forwardingRules: Record<string, string> = {
  "hi@draculatheme.com": "zno.rocha@gmail.com",
  "zeno@draculatheme.com": "hello-1@22301188.hubspot-inbox.com",
  "support@draculatheme.com": "hello-1@22301188.hubspot-inbox.com",
  "admin@draculatheme.com": "zno.rocha@gmail.com",
  "lucas@draculatheme.com": "luxon4uta@gmail.com",
  "dmarcreports@draculatheme.com": "dmarcreports@resend.com"
};

const defaultForwardAddress = "hello-1@22301188.hubspot-inbox.com";

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }

  return new Resend(apiKey);
};

const isInboundEmailPayload = (
  payload: InboundEmailPayload
): payload is Required<InboundEmailPayload> & {
  data: Required<NonNullable<InboundEmailPayload["data"]>>;
} => {
  return (
    payload.type === "email.received" &&
    typeof payload.data?.to === "string" &&
    typeof payload.data.subject === "string" &&
    typeof payload.data.html === "string"
  );
};

const buildLogContext = (payload: InboundEmailPayload) => {
  return {
    messageId: payload.data?.id ?? "unknown",
    recipient: payload.data?.to ?? "unknown",
    subject: payload.data?.subject ?? "missing subject"
  };
};

export const POST = async (request: NextRequest) => {
  if (!process.env.RESEND_API_KEY) {
    console.error(
      "forward-emails: missing RESEND_API_KEY environment variable"
    );

    return NextResponse.json(
      { error: "Missing RESEND_API_KEY environment variable" },
      { status: 500 }
    );
  }

  try {
    const payload = (await request.json()) as InboundEmailPayload;
    const logContext = buildLogContext(payload);

    if (!isInboundEmailPayload(payload)) {
      console.warn("forward-emails: received invalid payload", logContext);

      return NextResponse.json(
        { error: "Invalid inbound email payload" },
        { status: 400 }
      );
    }

    const forwardAddress =
      forwardingRules[payload.data.to] ?? defaultForwardAddress;
    const htmlLength = payload.data.html.length;

    console.info("forward-emails: forwarding email", {
      ...logContext,
      to: payload.data.to,
      forwardAddress,
      htmlLength
    });

    const sendResult = await forwardEmail(
      forwardAddress,
      payload.data.subject,
      payload.data.html
    );

    console.info("forward-emails: email forwarded successfully", {
      ...logContext,
      forwardAddress,
      resendId: sendResult?.id ?? "unknown"
    });

    return NextResponse.json({
      message: "Email forwarded",
      forwardAddress,
      resendId: sendResult?.id ?? null
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error encountered";

    console.error("forward-emails: failed to forward email", {
      message
    });

    return NextResponse.json(
      { error: "Failed to forward email" },
      { status: 500 }
    );
  }
};

async function forwardEmail(to: string, subject: string, html: string) {
  const resend = getResend();

  const { data, error } = await resend.emails.send({
    from: "hi@draculatheme.com",
    to: [to],
    subject,
    html
  });

  if (error) {
    throw error;
  }

  return data;
}
