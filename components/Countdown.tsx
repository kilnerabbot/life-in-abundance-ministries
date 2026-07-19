"use client";

import { useEffect, useState } from "react";
import { services } from "@/content";

// South Africa uses SAST (UTC+2) year-round — no daylight saving. We compute
// "now" shifted into a UTC-field-readable SAST space so the countdown is
// correct regardless of the visitor's own timezone.
const SAST_OFFSET_MS = 2 * 60 * 60 * 1000;
const DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function shiftedNowMs(now: Date): number {
  // now.getTime() is already an absolute UTC epoch — no local-offset
  // correction needed. Shifting by the fixed SAST offset (UTC+2) lets us
  // read SAST wall-clock fields via the UTC getters below.
  return now.getTime() + SAST_OFFSET_MS;
}

function candidateMs(shifted: number, dayOfWeek: number, hh: number, mm: number, weekOffset: number): number {
  const d = new Date(shifted);
  const currentDow = d.getUTCDay();
  const deltaDays = ((dayOfWeek - currentDow + 7) % 7) + weekOffset * 7;
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + deltaDays, hh, mm, 0, 0);
}

function parseHM(value: string): [number, number] {
  const [h, m] = value.split(":").map(Number);
  return [h, m];
}

function to12Hour(value: string): string {
  const [h, m] = parseHM(value);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

type Next = {
  name: string;
  day: number;
  start: string;
  startMs: number;
  endMs: number;
};

function findNextService(now: Date): Next {
  const shifted = shiftedNowMs(now);
  let best: Next | null = null;

  for (const s of services) {
    const [sh, sm] = parseHM(s.start);
    const [eh, em] = parseHM(s.end);

    for (const weekOffset of [0, 1]) {
      const startMs = candidateMs(shifted, s.day, sh, sm, weekOffset);
      const endMs = candidateMs(shifted, s.day, eh, em, weekOffset);
      if (endMs > shifted) {
        if (!best || startMs < best.startMs) {
          best = { name: s.name, day: s.day, start: s.start, startMs, endMs };
        }
        break;
      }
    }
  }

  // best is always found since a next-week candidate always satisfies endMs > shifted
  return best as Next;
}

function splitDuration(ms: number) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-4xl font-semibold text-abundance-offwhite sm:text-5xl">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs uppercase tracking-widest text-abundance-offwhite/70">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section aria-labelledby="countdown-heading" className="bg-abundance-blue py-20">
      <div className="container-px mx-auto max-w-2xl text-center">
        <h2 id="countdown-heading" className="mb-6 font-display text-sm uppercase tracking-[0.3em] text-abundance-leaf">
          Next Service
        </h2>

        {!mounted || !now ? (
          <div className="h-24" aria-hidden="true" />
        ) : (
          (() => {
            const next = findNextService(now);
            const remaining = next.startMs - shiftedNowMs(now);
            const { days, hours, minutes, seconds } = splitDuration(remaining);
            const label = `Next: ${next.name} — ${DAY_LABELS[next.day]} ${to12Hour(next.start)}`;

            return (
              <div>
                <p className="mb-6 font-body text-lg text-abundance-offwhite">{label}</p>
                <div className="flex justify-center gap-6 sm:gap-10">
                  <Unit value={days} label="Days" />
                  <Unit value={hours} label="Hours" />
                  <Unit value={minutes} label="Minutes" />
                  <Unit value={seconds} label="Seconds" />
                </div>
              </div>
            );
          })()
        )}
      </div>
    </section>
  );
}
