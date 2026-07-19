"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { programmes } from "@/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const vineRef = useRef<SVGPathElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const evaluate = () => setReduced(reduceQuery.matches || mobileQuery.matches);
    evaluate();
    reduceQuery.addEventListener("change", evaluate);
    mobileQuery.addEventListener("change", evaluate);
    return () => {
      reduceQuery.removeEventListener("change", evaluate);
      mobileQuery.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    const vine = vineRef.current;
    if (!vine) return;
    const len = vine.getTotalLength();

    if (reduced) {
      gsap.set(vine, { strokeDasharray: len, strokeDashoffset: 0 });
      return;
    }

    gsap.set(vine, { strokeDasharray: len, strokeDashoffset: len });
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      end: "bottom 60%",
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(vine, { strokeDashoffset: len * (1 - self.progress) });
      },
    });

    return () => trigger.kill();
  }, [reduced]);

  return (
    <section
      id="programmes"
      ref={sectionRef}
      aria-labelledby="journey-heading"
      className="relative bg-abundance-offwhite py-24"
    >
      <div className="container-px mx-auto max-w-3xl">
        <h2 id="journey-heading" className="mb-16 text-center font-display text-4xl font-semibold text-abundance-blue">
          The Journey
        </h2>

        <div className="relative">
          <svg
            className="absolute left-6 top-0 h-full w-6 md:left-1/2 md:-translate-x-1/2"
            viewBox="0 0 24 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={vineRef}
              d="M12 0 C 4 15, 20 30, 12 45 C 4 60, 20 75, 12 100"
              fill="none"
              stroke="#7AB648"
              strokeWidth={2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ul className="flex flex-col gap-12 pl-16 md:pl-0">
            {programmes.map((p, i) => (
              <motion.li
                key={p.day}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
              >
                <div className="rounded-xl bg-white p-6 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
                  <span className="inline-block rounded-full bg-abundance-leaf px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {p.day}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-abundance-blue">{p.title}</h3>
                  <p className="mt-1 font-body text-sm text-abundance-night/70">{p.time}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
