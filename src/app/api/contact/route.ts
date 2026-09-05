import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Required in .env.local (see README for setup):
//   RESEND_API_KEY    — from resend.com/api-keys
//   CONTACT_TO_EMAIL   — where form submissions get delivered
//   CONTACT_FROM_EMAIL — the "from" address; must be on a domain you've
//                        verified in Resend, or use their test address
//                        "onboarding@resend.dev" while developing.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: { email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!message || message.length < 2) {
    return NextResponse.json({ error: "A message is required." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "Contact form: missing RESEND_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL env var."
    );
    return NextResponse.json(
      { error: "Contact form isn't configured yet. Please email directly instead." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio Contact Form <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New message from ${email}`,
      text: message,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
