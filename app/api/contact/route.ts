import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/lib/data";

// This route sends the contact-form message straight to your inbox.
// It needs a free Resend API key — see README.md for the 2-minute setup.
export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look valid." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key configured yet (e.g. first run locally) — let the client
    // fall back to opening the visitor's own email app instead.
    return NextResponse.json(
      { error: "Email sending isn't configured yet on this deployment." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: profile.email,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `${message}\n\n—\nFrom: ${name}\nEmail: ${email}`,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send the message." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send the message." }, { status: 500 });
  }
}
