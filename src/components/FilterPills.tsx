import Link from "next/link";
import { categories, type CategorySlug } from "@/lib/content";

interface FilterPillsProps {
  active: CategorySlug | "all";
  sticky?: boolean;
}

const pillBase =
  "font-mono uppercase whitespace-nowrap rounded-full px-5 py-[10px] transition-colors duration-200 no-underline";

const pillInactive =
  "bg-[rgba(22,22,27,.06)] text-ink hover:bg-accent hover:text-paper";

const pillActive = "bg-accent text-paper";

export default function FilterPills({ active, sticky = false }: FilterPillsProps) {
  const items: { slug: CategorySlug | "all"; label: string; href: string }[] = [
    { slug: "all", label: "All", href: "/work" },
    ...categories.map((c) => ({ slug: c.slug, label: c.label, href: `/work/${c.slug}` })),
  ];

  return (
    <div
      className={
        sticky
          ? "sticky top-[92px] z-30 border-b border-line"
          : undefined
      }
      style={
        sticky
          ? {
              background: "rgba(246,244,239,0.9)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }
          : undefined
      }
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-9">
        <div className={`flex flex-wrap items-center gap-3 ${sticky ? "py-[18px]" : ""}`}>
          {items.map((item) => {
            const isActive = item.slug === active;
            return (
              <Link
                key={item.slug}
                href={item.href}
                className={`${pillBase} ${isActive ? pillActive : pillInactive}`}
                style={{ fontSize: 11, letterSpacing: "0.12em" }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
