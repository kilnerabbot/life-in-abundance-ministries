"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero } from "@/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Tree branch paths share one viewBox (0 0 200 240), rooted at the seed of
// light near the bottom-center. Each path is animated via stroke-dashoffset.
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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const branchRefs = useRef<(SVGPathElement | null)[]>([]);
  const leafRefs = useRef<(SVGCircleElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [reducedOrMobile, setReducedOrMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const evaluate = () => setReducedOrMobile(reduceQuery.matches || mobileQuery.matches);
    evaluate();
    reduceQuery.addEventListener("change", evaluate);
    mobileQuery.addEventListener("change", evaluate);
    return () => {
      reduceQuery.removeEventListener("change", evaluate);
      mobileQuery.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (reducedOrMobile === null) return;

    const branches = branchRefs.current.filter(Boolean) as SVGPathElement[];
    const leaves = leafRefs.current.filter(Boolean) as SVGCircleElement[];

    if (reducedOrMobile) {
      // Fallback: fully-grown tree, simple fade/translate entrance, no pin/scrub.
      branches.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: 0 });
      });
      gsap.set(leaves, { scale: 1, transformOrigin: "center" });
      gsap.set(bgRef.current, { background: "linear-gradient(180deg,#1B5A7D 0%,#0B1D28 100%)" });
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );
      return;
    }

    const ctx = gsap.context(() => {
      branches.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(leaves, { scale: 0, transformOrigin: "center" });
      gsap.set(headlineRef.current, { opacity: 0, y: 30 });
      gsap.set(bgRef.current, { background: "#0B1D28" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(bgRef.current, {
        background: "linear-gradient(180deg,#F7F7F2 0%,#1B5A7D 100%)",
        duration: 1,
        ease: "none",
      }, 0);

      branches.forEach((p, i) => {
        tl.to(p, { strokeDashoffset: 0, duration: 0.6, ease: "none" }, 0.05 + i * 0.06);
      });

      tl.to(leaves, { scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(2)" }, 0.55);

      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "none" }, 0.75);
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedOrMobile]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Welcome — from darkness to light"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 bg-abundance-night" />

      {/* faint glowing seed of light, always present at center-base of tree */}
      <div
        className="absolute left-1/2 top-[62%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-abundance-leaf/30 blur-2xl"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 200 240"
        className="absolute left-1/2 top-1/2 h-[70vh] w-auto -translate-x-1/2 -translate-y-[60%]"
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

      <div ref={headlineRef} className="relative z-10 px-6 text-center">
        <p className="mb-2 font-body text-sm uppercase tracking-[0.3em] text-abundance-leaf">
          {hero.eyebrow}
        </p>
        <h1 className="font-display text-5xl font-semibold text-abundance-offwhite drop-shadow-lg sm:text-6xl md:text-7xl">
          {hero.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-body text-base text-abundance-offwhite/90 sm:text-lg">
          {hero.subline}
        </p>
      </div>
    </section>
  );
}
