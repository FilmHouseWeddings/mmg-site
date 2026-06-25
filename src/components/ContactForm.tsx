"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const fieldClass =
    "w-full bg-card text-ink font-display px-4 py-[14px] text-[15px] border border-line rounded-[3px] focus:outline-none focus:border-accent transition-colors duration-[200ms]";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setStatus(res.ok ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <div className="py-10">
        <p className="font-display text-ink text-[22px] font-semibold mb-2">Got it.</p>
        <p className="font-mono uppercase text-faint" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
          We&apos;ll be in touch at your email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {[
        { label: "Name", name: "name", type: "text", placeholder: "Your name" },
        { label: "Company", name: "company", type: "text", placeholder: "Company or brand" },
        { label: "Email", name: "email", type: "email", placeholder: "you@company.com" },
      ].map((field) => (
        <div key={field.label} className="mb-5">
          <label
            className="block font-mono uppercase text-faint mb-2"
            style={{ fontSize: 10, letterSpacing: "0.16em" }}
          >
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.name !== "company"}
            className={fieldClass}
          />
        </div>
      ))}

      <div className="mb-5">
        <label
          className="block font-mono uppercase text-faint mb-2"
          style={{ fontSize: 10, letterSpacing: "0.16em" }}
        >
          The project
        </label>
        <textarea
          name="message"
          placeholder="What are you making, and when do you need it"
          required
          className={`${fieldClass} resize-y`}
          style={{ minHeight: 120 }}
        />
      </div>

      {status === "error" && (
        <p className="font-mono text-accent mb-4" style={{ fontSize: 11 }}>
          Something went wrong. Email us directly at hello@makemovegrow.com
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="font-mono uppercase text-paper bg-ink hover:bg-accent transition-colors duration-[250ms] cursor-pointer border-0 px-7 py-[15px] mt-[6px] disabled:opacity-50"
        style={{ fontSize: 12, letterSpacing: "0.14em" }}
      >
        {status === "sending" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
