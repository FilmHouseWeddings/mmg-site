import type { Section } from "@/lib/content";
import Reveal from "./Reveal";

interface ProjectSectionsProps {
  sections: Section[];
}

// Long-form editorial blocks under "What We Did". Shares the accent kicker
// and measure of the surrounding project page so it reads as one document.
export default function ProjectSections({ sections }: ProjectSectionsProps) {
  if (!sections.length) return null;

  return (
    <div className="mt-12 md:mt-16 flex flex-col gap-10 md:gap-14">
      {sections.map((section, i) => (
        <Reveal key={section.kicker} delay={Math.min(i * 0.06, 0.24)}>
          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-3">
              {section.kicker}
            </h2>

            {section.body?.map((paragraph, j) => (
              <p
                key={j}
                className="max-w-[680px] text-[16px] leading-[1.7] text-muted mt-3 first:mt-0"
              >
                {paragraph}
              </p>
            ))}

            {section.bullets && section.bullets.length > 0 && (
              <ul className="max-w-[680px] mt-5 border-t border-line-2">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet.label}
                    className="border-b border-line-2 py-3 text-[16px] leading-[1.7] text-muted"
                  >
                    <span className="text-ink font-semibold">
                      {bullet.label}.
                    </span>{" "}
                    {bullet.text}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </Reveal>
      ))}
    </div>
  );
}
