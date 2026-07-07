import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import Reveal from "./Reveal";

interface RelatedProjectsProps {
  items: CaseStudy[];
}

export default function RelatedProjects({ items }: RelatedProjectsProps) {
  if (!items.length) return null;

  return (
    <section className="pt-4">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-6">
          More Work
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <Reveal key={item.slug} delay={i * 0.06}>
            <Link href={`/project/${item.slug}`} className="group block">
              <div
                className="relative aspect-video w-full overflow-hidden mb-3 transition-transform duration-300 group-hover:-translate-y-1"
                style={{ background: item.bg }}
              />
              <h3 className="font-display font-semibold text-[17px] text-ink leading-snug transition-colors duration-200 group-hover:text-accent">
                {item.title}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint mt-1">
                {item.roleLine}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
