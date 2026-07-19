"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { verses } from "@/content";

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export default function VerseOfDay() {
  // Selected only after mount: SSR (Vercel, UTC) and hydration (visitor's
  // local clock) can disagree on day-of-year near midnight, which would
  // otherwise cause a hydration mismatch / verse swap.
  const [verse, setVerse] = useState<(typeof verses)[number] | null>(null);

  useEffect(() => {
    setVerse(verses[dayOfYear(new Date()) % verses.length]);
  }, []);

  return (
    <section aria-labelledby="votd-heading" className="bg-abundance-offwhite py-24">
      <div className="container-px mx-auto max-w-2xl text-center">
        <h2 id="votd-heading" className="mb-8 font-display text-sm uppercase tracking-[0.3em] text-abundance-green">
          Verse of the Day
        </h2>
        {!verse ? (
          <div className="h-32" aria-hidden="true" />
        ) : (
          <motion.blockquote
            key={verse.ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-display text-2xl italic text-abundance-blue sm:text-3xl">&ldquo;{verse.text}&rdquo;</p>
            <footer className="mt-4 font-body text-sm font-semibold uppercase tracking-wide text-abundance-green">
              {verse.ref}
            </footer>
          </motion.blockquote>
        )}
      </div>
    </section>
  );
}
