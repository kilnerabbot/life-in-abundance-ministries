"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { verses } from "@/content";
import { LeafField } from "./Motion";

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
}

export default function VerseOfDay() {
  // Chosen only after mount: the server (UTC) and the visitor's browser can
  // disagree on the day of year near midnight, which would otherwise surface
  // as a hydration mismatch and a visible verse swap.
  const [verse, setVerse] = useState<(typeof verses)[number] | null>(null);

  useEffect(() => {
    setVerse(verses[dayOfYear(new Date()) % verses.length]);
  }, []);

  return (
    <section
      aria-labelledby="votd-heading"
      className="relative overflow-hidden bg-abundance-offwhite py-20 sm:py-28"
    >
      <LeafField count={8} speed={-50} opacity={0.08} color="#3E7C3A" />

      <div className="container-px relative z-10 mx-auto max-w-3xl text-center">
        <h2
          id="votd-heading"
          className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-abundance-green"
        >
          Verse of the Day
        </h2>

        {!verse ? (
          <div className="mt-8 h-32" aria-hidden="true" />
        ) : (
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="mt-8"
          >
            <svg
              viewBox="0 0 24 24"
              className="mx-auto mb-5 h-8 w-8 text-abundance-leaf"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2H4v2h1a4 4 0 0 0 4-4V7zm11 0h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V7z" />
            </svg>
            <p className="font-display text-2xl italic leading-snug text-abundance-blue sm:text-4xl">
              {verse.text}
            </p>
            <footer className="mt-6 font-body text-xs font-semibold uppercase tracking-[0.25em] text-abundance-green">
              {verse.ref}
            </footer>
          </motion.blockquote>
        )}
      </div>
    </section>
  );
}
