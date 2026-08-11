import { Reveal } from "./Motion";
import { shepherd } from "@/content";
import { getImage } from "@/lib/content-source";

/**
 * Dignified SVG silhouette standing in for a portrait.
 *
 * To use a real photograph of Rev. Elijah Takyi Hansen, drop the file in
 * /public and replace this component with next/image:
 *   <Image src="/pastor.jpg" alt="Rev. Elijah Takyi Hansen" width={320}
 *          height={320} className="rounded-2xl object-cover" />
 * Keep the square aspect ratio so the surrounding layout is unaffected.
 */
function SilhouettePortrait() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label={`Illustrated portrait placeholder for ${shepherd.name}`}
    >
      <defs>
        <linearGradient id="shepherd-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B5A7D" />
          <stop offset="100%" stopColor="#0B1D28" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#shepherd-bg)" />
      <circle cx="100" cy="120" r="72" fill="#7AB648" fillOpacity="0.14" />
      <circle cx="100" cy="78" r="34" fill="#F7F7F2" fillOpacity="0.92" />
      <path d="M32 196c5-38 32-64 68-64s63 26 68 64z" fill="#F7F7F2" fillOpacity="0.92" />
    </svg>
  );
}

export default async function Shepherd() {
  const portrait = await getImage("home.pastorImage");
  return (
    <section aria-labelledby="shepherd-heading" className="bg-abundance-offwhite py-20 sm:py-28">
      <div className="container-px mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-14">
        <Reveal className="mx-auto w-56 md:w-72">
          <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-abundance-blue/10">
            <div className="aspect-square">
              {portrait ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={portrait}
                  alt={shepherd.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <SilhouettePortrait />
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            id="shepherd-heading"
            className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-abundance-green"
          >
            {shepherd.heading}
          </h2>
          <p className="mt-3 font-display text-3xl font-semibold text-abundance-blue sm:text-4xl">
            {shepherd.name}
          </p>
          <p className="mt-1 font-body text-sm uppercase tracking-[0.18em] text-abundance-leaf">
            {shepherd.role}
          </p>

          <blockquote className="mt-6 border-l-4 border-abundance-leaf pl-5">
            <p className="font-display text-lg italic leading-relaxed text-abundance-night/85 sm:text-xl">
              {shepherd.welcome}
            </p>
          </blockquote>

          <p className="mt-6 font-body text-sm leading-relaxed text-abundance-night/70">
            {shepherd.bio}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
