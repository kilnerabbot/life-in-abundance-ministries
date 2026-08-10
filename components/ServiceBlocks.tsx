import Link from "next/link";
import { Reveal } from "./Motion";
import { programmes } from "@/content";

/**
 * Editorial, image-led blocks for the three weekly services. No stock photos
 * (brand rule + none exist) — each block carries an original SVG art panel
 * tinted per service so the grid reads as photography-led rather than as
 * bordered cards. Layout is asymmetric: the first block spans wide.
 */

const ART = {
  blue: { from: "#1B5A7D", to: "#0B1D28", motif: "#7AB648" },
  leaf: { from: "#3E7C3A", to: "#123B53", motif: "#A5D078" },
  green: { from: "#164B69", to: "#0B1D28", motif: "#7AB648" },
} as const;

type Tone = keyof typeof ART;
const TONES: Tone[] = ["blue", "leaf", "green"];

function ArtPanel({ tone, index }: { tone: Tone; index: number }) {
  const c = ART[tone];
  const gid = `svc-${tone}-${index}`;
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.from} />
          <stop offset="100%" stopColor={c.to} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid})`} />
      {/* growing tree motif, echoing the logo */}
      <g stroke={c.motif} strokeWidth="2.5" fill="none" opacity="0.55" strokeLinecap="round">
        <path d="M200 300 V150" />
        <path d="M200 190 C 170 165, 130 155, 100 140" />
        <path d="M200 190 C 230 165, 270 155, 300 140" />
        <path d="M200 150 C 185 120, 175 105, 160 88" />
        <path d="M200 150 C 215 120, 225 105, 240 88" />
      </g>
      <g fill={c.motif} opacity="0.5">
        <circle cx="100" cy="140" r="12" />
        <circle cx="300" cy="140" r="12" />
        <circle cx="160" cy="88" r="10" />
        <circle cx="240" cy="88" r="10" />
        <circle cx="200" cy="70" r="14" />
      </g>
    </svg>
  );
}

export default function ServiceBlocks() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {programmes.map((p, i) => {
        const tone = TONES[i % TONES.length];
        // First block spans full width on large screens; the other two share a row.
        const span = i === 0 ? "lg:col-span-12" : "lg:col-span-6";
        const aspect = i === 0 ? "aspect-[16/7]" : "aspect-[16/10]";
        return (
          <Reveal key={p.slug} delay={i * 0.08} className={span}>
            <Link
              href={`/programmes#${p.slug}`}
              className="group block overflow-hidden rounded-3xl bg-abundance-night shadow-soft transition-all duration-500 ease-editorial hover:shadow-soft-lg"
            >
              <div className={`relative ${aspect} overflow-hidden`}>
                <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-105">
                  <ArtPanel tone={tone} index={i} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-abundance-night/85 via-abundance-night/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
                  <div>
                    <span className="inline-block rounded-full bg-abundance-leaf px-3.5 py-1.5 font-body text-xs font-extrabold uppercase tracking-wider text-white">
                      {p.day}
                    </span>
                    <h3 className="mt-3 font-display text-fluid-xl font-semibold leading-tight text-white">
                      {p.title}
                    </h3>
                    <p className="mt-1 max-w-md font-body text-fluid-sm text-white/75">
                      {p.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-body text-fluid-sm font-semibold text-abundance-leaf">
                      {p.time}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 ease-editorial group-hover:border-abundance-leaf group-hover:bg-abundance-leaf">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
