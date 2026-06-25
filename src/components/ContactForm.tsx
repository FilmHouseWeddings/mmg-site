"use client";

export default function ContactForm() {
  const fieldClass =
    "w-full bg-card text-ink font-display px-4 py-[14px] text-[15px] border border-line rounded-[3px] focus:outline-none focus:border-accent transition-colors duration-[200ms]";

  return (
    <form>
      {[
        { label: "Name", type: "text", placeholder: "Your name" },
        { label: "Company", type: "text", placeholder: "Company or brand" },
        { label: "Email", type: "email", placeholder: "you@company.com" },
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
            placeholder={field.placeholder}
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
          placeholder="What are you making, and when do you need it"
          className={`${fieldClass} resize-y`}
          style={{ minHeight: 120 }}
        />
      </div>

      {/* TODO: wire to a real handler (Formspree, Resend, or Next.js route) */}
      <button
        type="submit"
        className="font-mono uppercase text-paper bg-ink hover:bg-accent transition-colors duration-[250ms] cursor-pointer border-0 px-7 py-[15px] mt-[6px]"
        style={{ fontSize: 12, letterSpacing: "0.14em" }}
      >
        Send
      </button>
    </form>
  );
}
