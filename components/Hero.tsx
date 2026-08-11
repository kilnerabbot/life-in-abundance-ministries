"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero } from "@/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Branch paths share one viewBox (0 0 200 240), rooted at the seed of light
// near the bottom-centre. Each is grown by animating stroke-dashoffset.
const BRANCHES = [
  "M100 220 C 100 180, 100 150, 100 120",
  "M100 150 C 90 130, 70 115, 55 100",
  "M100 150 C 110 130, 130 115, 145 100",
  "M100 120 C 95 95, 85 80, 70 65",
  "M100 120 C 105 95, 115 80, 130 65",
  "M100 120 C 100 90, 100 70, 100 45",
];

const LEAVES = [
  { cx: 55, cy: 100, r: 10 },
  { cx: 145, cy: 100, r: 10 },
  { cx: 70, cy: 65, r: 9 },
  { cx: 130, cy: 65, r: 9 },
  { cx: 100, cy: 45, r: 12 },
  { cx: 100, cy: 65, r: 8 },
];

type MotionMode = "full" | "simple" | "none";

export default function Hero({ heroImage }: { heroImage?: string | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const branchRefs = useRef<(SVGPathElement | null)[]>([]);
  const leafRefs = useRef<(SVGCircleElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<MotionMode | null>(null);

  // "full"   → pinned, scrubbed growth sequence (desktop, motion allowed)
  // "simple" → fully grown tree + one gentle fade (mobile)
  // "none"   → fully grown tree, no animation at all (reduced motion)
  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const evaluate = () =>
      setMode(reduceQuery.matches ? "none" : mobileQuery.matches ? "simple" : "full");
    evaluate();
    reduceQuery.addEventListener("change", evaluate);
    mobileQuery.addEventListener("change", evaluate);
    return () => {
      reduceQuery.removeEventListener("change", evaluate);
      mobileQuery.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (mode === null) return;

    const branches = branchRefs.current.filter(Boolean) as SVGPathElement[];
    const leaves = leafRefs.current.filter(Boolean) as SVGCircleElement[];

    // Fallback for mobile and reduced motion: no pin, no scrub, tree already
    // grown. Wrapped in a context so a mode flip (e.g. resizing across the
    // breakpoint) reverts any in-flight tween and its inline styles.
    if (mode !== "full") {
      const fallbackCtx = gsap.context(() => {
        branches.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: 0 });
        });
        gsap.set(leaves, { scale: 1, opacity: 1, transformOrigin: "center" });
        gsap.set(bgRef.current, {
          background: "linear-gradient(180deg,#0B1D28 0%,#1B5A7D 55%,#2C7FA6 100%)",
        });
        gsap.set(glowRef.current, { opacity: 0.55 });

        if (mode === "simple") {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }
          );
        } else {
          gsap.set(contentRef.current, { opacity: 1, y: 0 });
        }
      }, sectionRef);

      return () => fallbackCtx.revert();
    }

    const ctx = gsap.context(() => {
      branches.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(leaves, { scale: 0, transformOrigin: "center" });
      gsap.set(contentRef.current, { opacity: 0, y: 30 });
      gsap.set(bgRef.current, { background: "linear-gradient(180deg,#0B1D28 0%,#0B1D28 100%)" });
      gsap.set(glowRef.current, { opacity: 0.35, scale: 0.6 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 1,
          // Pin the INNER wrapper, never the <section> itself. ScrollTrigger
          // re-parents whatever it pins into a generated .pin-spacer div. If
          // that were the section — the outermost node React renders here —
          // then on client-side navigation React's main.removeChild(section)
          // would throw NotFoundError and crash the whole app, because the
          // section's real parent had silently become the spacer.
          // Keeping the spacer inside the section leaves React's removal
          // boundary untouched.
          pin: pinRef.current,
          anticipatePin: 1,
        },
      });

      // night → dawn
      tl.to(
        bgRef.current,
        {
          background: "linear-gradient(180deg,#0B1D28 0%,#1B5A7D 45%,#E8C97A 100%)",
          duration: 1,
          ease: "none",
        },
        0
      );

      tl.to(glowRef.current, { opacity: 0.7, scale: 1.15, duration: 0.5, ease: "none" }, 0);

      // branches draw outward from the seed
      branches.forEach((p, i) => {
        tl.to(p, { strokeDashoffset: 0, duration: 0.55, ease: "none" }, 0.05 + i * 0.06);
      });

      // leaves pop in
      tl.to(leaves, { scale: 1, duration: 0.35, stagger: 0.05, ease: "back.out(2)" }, 0.55);

      // glow recedes as the canopy takes over
      tl.to(glowRef.current, { opacity: 0.25, duration: 0.3, ease: "none" }, 0.7);

      // headline arrives last
      tl.to(contentRef.current, { opacity: 1, y: 0, duration: 0.35, ease: "none" }, 0.72);
    }, sectionRef);

    return () => ctx.revert();
  }, [mode]);

  return (
    <section
      ref={sectionRef}
      aria-label="Welcome to Life in Abundance Ministries"
      className="relative w-full bg-abundance-night"
    >
      {/* Inner wrapper is what GSAP pins — see the ScrollTrigger config above. */}
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <div ref={bgRef} className="absolute inset-0 bg-abundance-night" />

        {/* Uploaded hero photo (CMS: home.heroImage). Replaces the SVG art
            when set; the tree animation stays for the default/no-image case. */}
        {heroImage && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
        )}

        {/* the seed of light the tree grows from */}
        {!heroImage && (
          <div
            ref={glowRef}
            className="absolute left-1/2 top-[64%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-abundance-leaf/40 blur-3xl"
            aria-hidden="true"
          />
        )}

        {!heroImage && (
          <svg
            viewBox="0 0 200 240"
            className="absolute left-1/2 top-1/2 h-[78vh] w-auto -translate-x-1/2 -translate-y-[56%] opacity-90"
            aria-hidden="true"
          >
            {BRANCHES.map((d, i) => (
              <path
                key={d}
                ref={(el) => {
                  branchRefs.current[i] = el;
                }}
                d={d}
                fill="none"
                stroke="#7AB648"
                strokeWidth={3}
                strokeLinecap="round"
              />
            ))}
            {LEAVES.map((leaf, i) => (
              <circle
                key={`${leaf.cx}-${leaf.cy}`}
                ref={(el) => {
                  leafRefs.current[i] = el;
                }}
                cx={leaf.cx}
                cy={leaf.cy}
                r={leaf.r}
                fill="#7AB648"
              />
            ))}
          </svg>
        )}

        {/* legibility scrim behind the headline */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-abundance-night/70 via-transparent to-abundance-night/40"
          aria-hidden="true"
        />

        {/* Starts hidden so the desktop scrub sequence can't flash the headline
            before the effect runs. The <noscript> rule in app/layout.tsx forces
            it visible if JavaScript never executes. */}
        <div
          ref={contentRef}
          data-reveal
          style={{ opacity: 0 }}
          className="container-px relative z-10 text-center"
        >
          <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-abundance-leaf">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] text-white drop-shadow-lg sm:text-7xl md:text-8xl">
            {hero.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-body text-sm text-white/85 sm:text-lg">
            {hero.subline}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={hero.cta.href}
              className="rounded-full bg-abundance-leaf px-7 py-3 font-body text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              {hero.cta.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="rounded-full border border-white/40 px-7 py-3 font-body text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.3em] text-white/50"
          aria-hidden="true"
        >
          Scroll
        </div>
      </div>
    </section>
  );
}

/**
 * Marker rendered immediately after the hero. ScrollTrigger's pin spacer makes
 * the hero occupy far more scroll distance than one viewport, so Nav watches
 * this element to know when the dark hero has genuinely left the screen.
 */
export function HeroEnd() {
  return <div id="hero-end" aria-hidden="true" />;
}
