import type { Credit } from "@/lib/content";
import Reveal from "./Reveal";

interface CreditsBlockProps {
  credits: Credit[];
}

export default function CreditsBlock({ credits }: CreditsBlockProps) {
  if (!credits.length) return null;

  return (
    <section className="border-t border-line pt-10 md:pt-14">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-6">
          Credits
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
        {credits.map((credit, i) => (
          <Reveal key={`${credit.role}-${credit.name}-${i}`} delay={i * 0.03}>
            <div className="flex items-baseline gap-3 border-b border-line-2 py-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted shrink-0 w-[45%]">
                {credit.role}
              </span>
              <span className="text-ink text-[15px]">{credit.name}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
