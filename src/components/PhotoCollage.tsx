import Image from "next/image";
import type { Photo } from "@/lib/content";

/**
 * Stills collage for a case study.
 *
 * Even grid (see the comment in the component). The earlier masonry columns left
 * ragged bottoms and let pale shots bleed into the page background.
 */
export default function PhotoCollage({
  photos,
  layout,
}: {
  photos: Photo[];
  layout?: "stack";
}) {
  if (photos.length === 0) return null;

  // Pre-made collages (several shots already composed into one image): one per row,
  // full width, never cropped.
  if (layout === "stack") {
    return (
      <div className="flex flex-col gap-2 md:gap-3">
        {photos.map((photo) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={photo.w}
            height={photo.h}
            sizes="(min-width: 1200px) 1128px, 100vw"
            className="w-full h-auto block"
          />
        ))}
      </div>
    );
  }


  // One or two stills do not need a mosaic: show them side by side.
  if (photos.length <= 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
        {photos.map((photo) => (
          <div key={photo.src} className="relative overflow-hidden bg-[#ECE9E2] ring-1 ring-inset ring-line aspect-[3/2]">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>
    );
  }

  // A portrait fills 1 of 3 columns, a landscape 2. If the total does not fill the
  // last row, drop the last landscape rather than leave a hole in the grid.
  const units = (list: Photo[]) => list.reduce((n, p) => n + (p.w > p.h ? 2 : 1), 0);
  let shown = photos;
  while (shown.length > 1 && units(shown) % 3 !== 0) {
    const idx = shown.map((p) => p.w > p.h).lastIndexOf(true);
    if (idx === -1) break;
    shown = shown.filter((_, i) => i !== idx);
  }

  // Tidy grid: portraits are one 3:4 tile, landscapes span two columns at 3:2, so
  // every row is the same height. Tiles carry a tint and hairline so pale product
  // shots read as framed pictures instead of dissolving into the page.
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 [grid-auto-flow:dense]">
      {shown.map((photo) => {
        const wide = photo.w > photo.h;
        return (
          <div
            key={photo.src}
            className={`relative overflow-hidden bg-[#ECE9E2] ring-1 ring-inset ring-line ${
              wide ? "col-span-2 aspect-[3/2]" : "aspect-[3/4]"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={wide ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
