"use client";

import { motion } from "framer-motion";
import { shepherd } from "@/content";

// Dignified SVG silhouette avatar placeholder.
// Swap in a real photograph of Rev. Elijah Takyi Hansen when one becomes
// available — keep a similar square aspect ratio and replace this
// component's <svg> with a <Image> from /public.
function SilhouetteAvatar() {
  return (
    <svg viewBox="0 0 200 200" className="h-48 w-48 rounded-full bg-abundance-blue" aria-hidden="true">
      <circle cx="100" cy="100" r="100" fill="#1B5A7D" />
      <circle cx="100" cy="80" r="38" fill="#F7F7F2" fillOpacity={0.9} />
      <path
        d="M40 190c6-38 32-64 60-64s54 26 60 64z"
        fill="#F7F7F2"
        fillOpacity={0.9}
      />
    </svg>
  );
}

export default function Shepherd() {
  return (
    <section id="about" aria-labelledby="shepherd-heading" className="bg-abundance-night py-24">
      <div className="container-px mx-auto grid max-w-4xl grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mx-auto"
        >
          <SilhouetteAvatar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 id="shepherd-heading" className="font-display text-sm uppercase tracking-[0.3em] text-abundance-leaf">
            {shepherd.heading}
          </h2>
          <p className="mt-2 font-display text-3xl font-semibold text-abundance-offwhite">{shepherd.name}</p>
          <p className="mt-4 font-body leading-relaxed text-abundance-offwhite/80">{shepherd.welcome}</p>
        </motion.div>
      </div>
    </section>
  );
}
