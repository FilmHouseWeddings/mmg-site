import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import { services } from "@/lib/content";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SITE_LONG_DESCRIPTION } from "@/lib/seo";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | MMG",
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  // "./" resolves to each page's own URL, so every route is its own canonical.
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "MMG",
    type: "website",
    locale: "en_US",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${archivo.variable} ${spaceMono.variable}`}>
      <body>
        {/* Organization schema. Intentionally omits `foundingDate` — the
            15 years is the founder's production experience, not the age of
            the company, and that distinction has to hold in structured data. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization", "ProfessionalService"],
                  "@id": `${SITE_URL}/#organization`,
                  name: "MMG",
                  alternateName: "Make. Move. Grow.",
                  url: SITE_URL,
                  logo: `${SITE_URL}/icon.png`,
                  email: "dennis@makemovegrow.com",
                  description: SITE_LONG_DESCRIPTION,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Los Angeles",
                    addressRegion: "CA",
                    addressCountry: "US",
                  },
                  areaServed: ["Los Angeles", "Orange County", "Worldwide"],
                  audience: {
                    "@type": "BusinessAudience",
                    audienceType:
                      "Brands, PR firms, agencies, event teams, and public agencies",
                  },
                  knowsAbout: [
                    "Video production",
                    "Event coverage",
                    "Commercial production",
                    "Brand films",
                    "Red carpet coverage",
                    "Event and commercial photography",
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Services",
                    itemListElement: services.map((name) => ({
                      "@type": "Offer",
                      itemOffered: { "@type": "Service", name },
                    })),
                  },
                  // No `foundingDate`: the 15 years is the founder's
                  // production experience, not the age of the company.
                  founder: {
                    "@type": "Person",
                    name: "Dennis Mulyar",
                    jobTitle: "Managing Director",
                    description: "Fifteen years of experience in video production.",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "MMG",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
