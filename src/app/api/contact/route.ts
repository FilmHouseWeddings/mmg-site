import { NextResponse } from "next/server";

// Where inquiries go, and who they come from. Both are environment driven so
// the switch to a verified domain is a Vercel setting, not a code change and a
// deploy.
//
// Defaults are the sandbox-safe pair: Resend's shared sender only delivers to
// the address the Resend account is registered under, and anything else comes
// back 403. Once makemovegrow.com is verified in Resend, set
//   CONTACT_FROM_EMAIL = "MMG <hello@makemovegrow.com>"
//   CONTACT_TO_EMAIL   = "dennis@makemovegrow.com"
// and inquiries land where they belong, out of the spam folder.
//
// Server-side only. These addresses are never rendered into client HTML — the
// contact page reveals its address from char codes for the same reason.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "MMG Contact Form <onboarding@resend.dev>";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "dennis@filmhouseweddings.com";

export async function POST(req: Request) {
  const { name, company, email, investment, message } = await req.json();

  if (!name || !email || !investment || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: email,
      subject: `New inquiry from ${name}${company ? ` · ${company}` : ""}`,
      text: `Name: ${name}\nCompany: ${company || "—"}\nEmail: ${email}\nInvestment: ${investment}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    // Surface the upstream reason. Without this a failed send is a silent 500
    // and there is no way to tell a missing API key (401) from Resend's
    // sandbox-sender restriction (403) from a validation error (422).
    const detail = await res.text().catch(() => "");
    console.error(`Resend send failed: ${res.status} ${detail}`);
    return NextResponse.json(
      { error: "Failed to send", upstreamStatus: res.status },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
