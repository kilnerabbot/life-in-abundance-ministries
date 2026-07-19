"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Fade + rise on scroll into view. Under prefers-reduced-motion the element
 * fades only — no transform is written at all.
 *
 * Framer Motion serialises `initial` into the SSR markup, so these elements
 * ship as opacity:0. The `data-reveal` hook lets the <noscript> rule in
 * app/layout.tsx force them visible when JavaScript never runs — without it a
 * JS failure would leave whole pages blank.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduced = useReducedMotion();

  const props = {
    className,
    "data-reveal": true,
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    // "some" rather than a ratio: an element taller than the viewport can
    // never satisfy a fractional threshold and would stay hidden forever.
    viewport: { once: true, amount: "some" as const },
    transition: {
      duration: reduced ? 0.3 : 0.6,
      delay: reduced ? 0 : delay,
      ease: "easeOut" as const,
    },
  };

  if (as === "li") return <motion.li {...props}>{children}</motion.li>;
  if (as === "section") return <motion.section {...props}>{children}</motion.section>;
  return <motion.div {...props}>{children}</motion.div>;
}

const LEAF_PATH = "M12 2C6 6 4 12 8 18c3 4 8 4 10 0 3-6-1-13-6-16z";

/**
 * Decorative drifting leaves. Callers stack two at different speeds to build
 * depth. Positions are deterministic (no Math.random) so the server and client
 * markup match; motion is disabled under prefers-reduced-motion.
 */
export function LeafField({
  count = 12,
  speed = 60,
  opacity = 0.14,
  color = "#7AB648",
}: {
  count?: number;
  speed?: number;
  opacity?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : speed]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        {Array.from({ length: count }).map((_, i) => {
          const size = 18 + (i % 4) * 9;
          return (
            <svg
              key={i}
              viewBox="0 0 24 24"
              width={size}
              height={size}
              style={{
                position: "absolute",
                left: `${(i * 37) % 96}%`,
                top: `${(i * 53) % 92}%`,
                opacity,
                transform: `rotate(${(i * 47) % 360}deg)`,
              }}
            >
              <path d={LEAF_PATH} fill={color} />
            </svg>
          );
        })}
      </motion.div>
    </div>
  );
}
