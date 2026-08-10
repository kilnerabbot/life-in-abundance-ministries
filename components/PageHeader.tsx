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
          className="font-body text-fluid-sm font-semibold uppercase tracking-eyebrow text-abundance-leaf"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 font-display text-fluid-3xl font-semibold leading-[1.03] text-white"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-6 max-w-prose font-body text-fluid-base leading-relaxed text-white/80"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </header>
  );
}
