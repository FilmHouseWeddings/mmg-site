import { NextResponse } from "next/server";

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
      from: "MMG Contact Form <onboarding@resend.dev>",
      // Server-side only. This address is deliberately never rendered into
      // client HTML — the contact page reveals it from char codes for the same
      // reason. Keep it out of any component.
      to: "dennis@makemovegrow.com",
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
