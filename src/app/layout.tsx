import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://www.makemovegrow.com"),
  title: {
    template: "%s — MMG",
    default: "MMG — Make. Move. Grow. | Los Angeles Production House",
  },
  description:
    "MMG is a Los Angeles production house. You bring the idea. We bring the crew, the cameras, and the finish. Film, events, broadcast, photography.",
  openGraph: {
    siteName: "MMG",
    type: "website",
    locale: "en_US",
    title: "MMG — Make. Move. Grow. | Los Angeles Production House",
    description:
      "MMG is a Los Angeles production house. You bring the idea. We bring the crew, the cameras, and the finish. Film, events, broadcast, photography.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MMG — Make. Move. Grow. | Los Angeles Production House",
    description:
      "MMG is a Los Angeles production house. You bring the idea. We bring the crew, the cameras, and the finish. Film, events, broadcast, photography.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${archivo.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
