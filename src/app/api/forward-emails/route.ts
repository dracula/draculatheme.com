import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }

  return new Resend(apiKey);
};

export const POST = async (request: NextRequest) => {
  const payload = await request.json();

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY environment variable" },
      { status: 500 }
    );
  }

  if (payload.type === "email.received") {
    switch (payload.data.to) {
      case "hi@draculatheme.com":
        await forwardEmail(
          "zno.rocha@gmail.com",
          payload.data.subject,
          payload.data.html
        );
        break;
      case "zeno@draculatheme.com":
        await forwardEmail(
          "hello-1@22301188.hubspot-inbox.com",
          payload.data.subject,
          payload.data.html
        );
        break;
      case "support@draculatheme.com":
        await forwardEmail(
          "hello-1@22301188.hubspot-inbox.com",
          payload.data.subject,
          payload.data.html
        );
        break;
      case "admin@draculatheme.com":
        await forwardEmail(
          "zno.rocha@gmail.com",
          payload.data.subject,
          payload.data.html
        );
        break;
      case "lucas@draculatheme.com":
        await forwardEmail(
          "luxon4uta@gmail.com",
          payload.data.subject,
          payload.data.html
        );
        break;
      case "dmarcreports@draculatheme.com":
        await forwardEmail(
          "dmarcreports@resend.com",
          payload.data.subject,
          payload.data.html
        );
        break;
      default:
        await forwardEmail(
          "hello-1@22301188.hubspot-inbox.com",
          payload.data.subject,
          payload.data.html
        );
        break;
    }
  }

  return NextResponse.json({ payload });
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
