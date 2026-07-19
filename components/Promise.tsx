"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { promise } from "@/content";

const LEAF_PATH = "M12 2C6 6 4 12 8 18c3 4 8 4 10 0 3-6-1-13-6-16z";

function LeafLayer({
  count,
  speed,
  className,
}: {
  count: number;
  speed: number;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div style={{ y }} className="absolute inset-0">
        {Array.from({ length: count }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            width={20 + (i % 3) * 10}
            height={20 + (i % 3) * 10}
            style={{
              position: "absolute",
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              opacity: 0.15,
              transform: `rotate(${(i * 47) % 360}deg)`,
            }}
          >
            <path d={LEAF_PATH} fill="#7AB648" />
          </svg>
        ))}
      </motion.div>
    </div>
  );
}

export default function Promise() {
  const words = promise.statement.split(" ");

  return (
    <section
      aria-labelledby="promise-heading"
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-abundance-blue py-24"
    >
      <LeafLayer count={10} speed={-60} className="opacity-70" />
      <LeafLayer count={14} speed={90} className="opacity-40" />

      <div className="container-px relative z-10 mx-auto max-w-4xl text-center">
        <h2 id="promise-heading" className="mb-8 font-display text-sm uppercase tracking-[0.3em] text-abundance-leaf">
          {promise.heading}
        </h2>
        <p className="font-display text-3xl font-medium leading-snug text-abundance-offwhite sm:text-4xl md:text-5xl">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}
