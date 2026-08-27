import Image from "next/image";
import type { Photo } from "@/lib/content";

/**
 * Stills collage for a case study.
 *
 * Uses CSS multi-column masonry rather than a grid: the stills run from 1154x2000
 * portraits to 2000x1493 landscapes, and columns absorb that mix without cropping
 * or leaving ragged rows. Each image keeps its intrinsic aspect ratio — no `fill`,
 * no `object-cover` — so nothing is clipped.
 *
 * The gap is deliberately tighter than the `gap-8 md:gap-12` used for secondary
 * media on the project page, so the block reads as one mosaic instead of a
 * stack of separate items.
 */
export default function PhotoCollage({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) return null;

  return (
    <div className="columns-2 lg:columns-3 gap-2 md:gap-3 [column-fill:balance]">
      {photos.map((photo) => (
        <div key={photo.src} className="mb-2 md:mb-3 break-inside-avoid">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.w}
            height={photo.h}
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="w-full h-auto block"
          />
        </div>
      ))}
    </div>
  );
}
