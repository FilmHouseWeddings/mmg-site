import type { MetadataRoute } from "next";
import { categories, publishedCaseStudies } from "@/lib/content";

const BASE = "https://www.makemovegrow.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/work`, priority: 0.9 },
    ...categories.map((cat) => ({
      url: `${BASE}/work/${cat.slug}`,
      priority: 0.7,
    })),
    ...publishedCaseStudies.map((cs) => ({
      url: `${BASE}/project/${cs.slug}`,
      priority: 0.6,
    })),
    { url: `${BASE}/about`, priority: 0.8 },
    { url: `${BASE}/contact`, priority: 0.8 },
  ];
}
