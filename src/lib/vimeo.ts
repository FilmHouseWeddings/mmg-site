import type { CaseStudy } from "@/lib/content";

// Server-side only. Resolves a video's poster frame via Vimeo's oEmbed API
// (works for unlisted videos when the hash is included). Cached for a day;
// returns null on any failure so callers fall back to the bg gradient.
export async function getVimeoThumbnail(
  vimeoId: string,
  vimeoHash?: string
): Promise<string | null> {
  const videoUrl = `https://vimeo.com/${vimeoId}${vimeoHash ? `/${vimeoHash}` : ""}`;
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}&width=1280`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { thumbnail_url?: unknown };
    return typeof data.thumbnail_url === "string" ? data.thumbnail_url : null;
  } catch {
    return null;
  }
}

// Poster frames for a list of case studies, keyed by slug.
export async function getThumbnailsBySlug(
  items: CaseStudy[]
): Promise<Record<string, string | null>> {
  const entries = await Promise.all(
    items.map(async (cs) => {
      const video = cs.heroVideo;
      const url = video
        ? await getVimeoThumbnail(video.vimeoId, video.vimeoHash)
        : null;
      return [cs.slug, url] as const;
    })
  );
  return Object.fromEntries(entries);
}
