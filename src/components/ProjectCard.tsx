import Link from "next/link";
import type { CaseStudy } from "@/lib/content";

function PlayGlyph() {
  return (
    <div
      className="absolute top-4 right-4 z-10 flex items-center justify-center rounded-full"
      style={{ width: 34, height: 34, border: "1px solid rgba(244,242,237,.6)" }}
    >
      <div
        style={{
          borderLeft: "9px solid #F4F2ED",
          borderTop: "6px solid transparent",
          borderBottom: "6px solid transparent",
          marginLeft: 2,
        }}
      />
    </div>
  );
}

export default function ProjectCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link href={`/project/${cs.slug}`} className="group block no-underline">
      <div
        className="relative aspect-video overflow-hidden"
        style={{ background: cs.bg }}
      >
        <PlayGlyph />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(22,22,27,.35)" }}
        />
      </div>
      <div className="pt-4">
        <h3
          className="font-display font-semibold text-ink group-hover:text-accent transition-colors duration-300 m-0"
          style={{ fontSize: 24, lineHeight: 1.12, letterSpacing: "-0.01em" }}
        >
          {cs.title}
        </h3>
        <p
          className="font-mono uppercase text-faint mt-[8px] mb-0"
          style={{ fontSize: 11, letterSpacing: "0.12em" }}
        >
          {cs.roleLine}
        </p>
      </div>
    </Link>
  );
}
