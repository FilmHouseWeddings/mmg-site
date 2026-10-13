import type { MetadataRoute } from "next";
import { categories, publishedCaseStudies } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
import { publishedServicePages } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, priority: 1 },
    { url: `${SITE_URL}/work`, lastModified, priority: 0.9 },
    ...categories.map((cat) => ({
      url: `${SITE_URL}/work/${cat.slug}`,
      lastModified,
      priority: 0.7,
    })),
    ...publishedCaseStudies.map((cs) => ({
      url: `${SITE_URL}/project/${cs.slug}`,
      lastModified,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/services`, lastModified, priority: 0.8 },
    ...publishedServicePages.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/about`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, priority: 0.8 },
  ];
}
