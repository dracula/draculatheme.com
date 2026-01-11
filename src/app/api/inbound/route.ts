import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_TOKEN);

export const POST = async (request: NextRequest) => {
  const event = await request.json();

  if (event.type === 'email.received') {
    const { data: email } = await resend
      .emails
      .receiving
      .get(event.data.email_id);

    let forwardAddresses = [];
    
    switch (email?.to[0]) {
      case 'support@draculatheme.com':
        forwardAddresses.push('hello-1@22301188.hubspot-inbox.com');
        break;
      case 'zeno@draculatheme.com':
        forwardAddresses.push('hello-1@22301188.hubspot-inbox.com');
        forwardAddresses.push('zno.rocha@gmail.com');
        break;
      case 'lucas@draculatheme.com':
        forwardAddresses.push('luxon4uta@gmail.com');
        break;
      default:
        forwardAddresses.push('zno.rocha@gmail.com');
        break;
    }

    const { data } = await resend.emails.send({
      from: 'forward@draculatheme.com',
      to: forwardAddresses,
      subject: event.data.subject,
      html: email?.html || '',
      text: email?.text || '',
    });

    return NextResponse.json(data);
  }

  return NextResponse.json({});
};