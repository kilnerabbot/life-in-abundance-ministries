import { Reveal } from "./Motion";
import { Eyebrow } from "./UI";
import type { GalleryImage } from "@/lib/content-source";

/**
 * Public gallery grid for the About page. Renders nothing when empty so the
 * page never shows a hollow section before any images are uploaded.
 * Images are managed in the admin under Media & Gallery.
 */
export default function Gallery({ images }: { images: GalleryImage[] }) {
  if (!images.length) return null;

  return (
    <section aria-labelledby="gallery-heading" className="bg-abundance-offwhite py-20 sm:py-28">
      <div className="container-px mx-auto max-w-editorial">
        <Reveal>
          <Eyebrow tone="green">Our Community</Eyebrow>
          <h2
            id="gallery-heading"
            className="mt-4 font-display text-fluid-2xl font-semibold leading-tight text-abundance-blue"
          >
            Life Together
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {images.map((img, i) => (
            <Reveal
              key={img.id}
              delay={(i % 4) * 0.06}
              className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}
            >
              <figure className="group h-full overflow-hidden rounded-2xl shadow-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.caption ?? "Life in Abundance Ministries"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
                />
                {img.caption && (
                  <figcaption className="sr-only">{img.caption}</figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
