import { clients, publishedCaseStudies, isPlaceholder, services } from "@/lib/content";
import { SITE_URL, SITE_LONG_DESCRIPTION } from "@/lib/seo";

// Plain text summary for AI answer engines (llms.txt convention). Generated from
// content.ts so it always matches the live site.
export const dynamic = "force-static";

export function GET() {
  const work = publishedCaseStudies
    .map((cs) => {
      const full = isPlaceholder(cs.synopsis) ? cs.roleLine : cs.synopsis;
      // First sentence only; the project page has the rest.
      const summary = (full.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? full).trim();
      return `- [${cs.title}](${SITE_URL}/project/${cs.slug}): ${summary}`;
    })
    .join("\n");

  const body = `# MMG

> ${SITE_LONG_DESCRIPTION}

## Who we serve
Brands, PR firms, agencies, event teams, and public agencies in Los Angeles, Orange County, and beyond.

## Services
${services.map((s) => `- ${s}`).join("\n")}

## Selected clients
${clients.join(", ")}

## Work
${work}

## Pages
- [What We Do](${SITE_URL}/work): services, categories, and case studies
- [About](${SITE_URL}/about): who we are and how we work
- [Contact](${SITE_URL}/contact): start a project (dennis@makemovegrow.com)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
