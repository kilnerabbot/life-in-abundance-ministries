"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LeafField } from "./Motion";

/**
 * Shared masthead for every inner route. Carries the parallax leaf layers so
 * the motion language of the home page continues across the site.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <header className="relative overflow-hidden bg-abundance-blue pb-20 pt-36 sm:pb-24 sm:pt-44">
      {/* two leaf layers at different speeds build the depth */}
      <LeafField count={9} speed={-70} opacity={0.16} />
      <LeafField count={13} speed={110} opacity={0.09} />

      {/* light bleeding in from the base, echoing the dark-to-light narrative */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-abundance-offwhite/25 to-transparent"
        aria-hidden="true"
      />

      <div className="container-px relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-abundance-leaf"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-5 max-w-2xl font-body text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </header>
  );
}
