import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { publishedServicePages } from "@/lib/services";
import { SITE_URL } from "@/lib/seo";

// Not in the header or footer menu by design: reached from the service pages,
// the sitemap, and search.
export const metadata: Metadata = {
  title: "Video Production Services in LA and Orange County",
  description:
    "MMG video production services in Los Angeles and Orange County: red carpet coverage, event video, same day recaps, brand films, and commercials.",
};

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <section className="pt-[110px] pb-[54px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <span
              className="block font-mono uppercase text-accent mb-[22px]"
              style={{ fontSize: 11, letterSpacing: "0.22em" }}
            >
              Services
            </span>
            <h1
              className="font-display font-semibold m-0 text-ink"
              style={{
                fontSize: "clamp(36px,6vw,72px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                maxWidth: "18ch",
              }}
            >
              Video production services in Los Angeles and Orange County
            </h1>
            <p
              className="text-ink mt-[30px] mb-0"
              style={{ fontSize: 20, lineHeight: 1.55, maxWidth: "60ch" }}
            >
              MMG backs up brands, PR firms, agencies, and event teams from the live moment to the finished film. The concept stays yours. The execution is ours.
            </p>
          </div>
        </section>

        <div className="h-px bg-line" />

        <section className="pt-[40px] pb-[110px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-9">
            <ul className="list-none m-0 p-0 border-b border-line">
              {publishedServicePages.map((s, i) => (
                <li key={s.slug} className="border-t border-line">
                  <Reveal delay={Math.min(i * 0.05, 0.2)}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-3 md:gap-10 py-8 no-underline"
                    >
                      <h2
                        className="font-display font-semibold text-ink group-hover:text-accent transition-colors duration-200 m-0"
                        style={{ fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.1, letterSpacing: "-0.01em" }}
                      >
                        {s.linkLabel} →
                      </h2>
                      <p className="text-muted m-0" style={{ fontSize: 16, lineHeight: 1.7 }}>
                        {s.metaDescription}
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
