// import { Resend } from "resend";

// const resend = new Resend("re_46VLc4U7_PKg28UiWogbxPSZGnJfaV8Tm");

// resend.emails.send({
//   from: "onboarding@resend.dev",
//   to: "fin.jioserv@outlook.com",
//   subject: "Hello World",
//   html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
// });

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  var data = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });
}
