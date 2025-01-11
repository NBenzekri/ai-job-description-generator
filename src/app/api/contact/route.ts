import { NextResponse } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

const WEBSITE_NAME = process.env.WEBSITE_NAME!;
const FROM_EMAIL = process.env.FROM_EMAIL!;
const TO_EMAIL = process.env.TO_EMAIL!;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN!;
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY!;
const MAILGUN_ENDPOINT = process.env.MAILGUN_ENDPOINT!;

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: MAILGUN_API_KEY || "key-not-found",
  url: `https://${MAILGUN_ENDPOINT}`,
});

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const data = {
      from: `<${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: `${WEBSITE_NAME} - New contact form ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\nSent from ${WEBSITE_NAME}`,
      html: `
        <h1 style="color: #333;">New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;">${message}</p>
        <br>
        <p>Sent from <strong>${WEBSITE_NAME}</strong></p>
      `,
    };

    await mg.messages.create(MAILGUN_DOMAIN, data);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
