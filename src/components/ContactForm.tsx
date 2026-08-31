"use client";

import { useEffect, useRef, useState } from "react";

interface ContactFormProps {
  // "compact" drops the Company field and shortens the textarea, for the
  // homepage CTA. "full" is the /contact page and must stay unchanged.
  variant?: "full" | "compact";
}

export default function ContactForm({ variant = "full" }: ContactFormProps) {
  const compact = variant === "compact";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const sentRef = useRef<HTMLDivElement>(null);
  // Held so a failed send can hand the sender their own words back as a
  // prefilled email instead of stranding them in a form that won't submit.
  const [rescue, setRescue] = useState("");

  // The form collapses from tall to short on success, which can leave the
  // confirmation behind the sticky header or above the fold. A confirmation
  // the sender can't see is the same as no confirmation.
  useEffect(() => {
    if (status !== "sent") return;
    sentRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [status]);

  const fieldClass =
    "w-full bg-card text-ink font-display px-4 py-[14px] text-[15px] border border-line rounded-[3px] focus:outline-none focus:border-accent transition-colors duration-[200ms]";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    // Company is absent in the compact variant, and optional in the API route.
    const companyEl = form.elements.namedItem("company") as HTMLInputElement | null;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: companyEl?.value ?? "",
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      investment: (form.elements.namedItem("investment") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = [
        `Name: ${data.name}`,
        data.company ? `Company: ${data.company}` : null,
        `Email: ${data.email}`,
        `Investment: ${data.investment}`,
        "",
        data.message,
      ]
        .filter((line) => line !== null)
        .join("\n");
      setRescue(
        `mailto:hello@makemovegrow.com?subject=${encodeURIComponent(
          `New inquiry from ${data.name}`
        )}&body=${encodeURIComponent(body)}`
      );
    }

    setStatus(res.ok ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <div ref={sentRef} className="py-10 scroll-mt-24">
        <p className="font-display text-ink text-[22px] font-semibold mb-2">
          Thank you for your submission.
        </p>
        <p className="font-mono uppercase text-faint" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
          Our team will be in touch with you within 24 to 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {[
        { label: "Name", name: "name", type: "text", placeholder: "Your name" },
        ...(compact
          ? []
          : [{ label: "Company", name: "company", type: "text", placeholder: "Company or brand" }]),
        { label: "Email", name: "email", type: "email", placeholder: "you@company.com" },
        { label: "Investment", name: "investment", type: "text", placeholder: "Ballpark budget" },
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
          style={{ minHeight: compact ? 88 : 120 }}
        />
      </div>

      {status === "error" && (
        <div className="mb-4">
          <p className="font-mono text-accent" style={{ fontSize: 11 }}>
            Something went wrong on our end. Nothing you wrote is lost.
          </p>
          <a
            href={rescue}
            className="inline-block font-mono uppercase text-ink underline underline-offset-4 decoration-line hover:text-accent transition-colors duration-[250ms] mt-2"
            style={{ fontSize: 11, letterSpacing: "0.14em" }}
          >
            Send it as an email instead →
          </a>
        </div>
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
