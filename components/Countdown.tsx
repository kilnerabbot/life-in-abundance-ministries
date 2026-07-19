"use client";

import { useEffect, useState } from "react";
import { services } from "@/content";

// South Africa observes SAST (UTC+2) year-round with no daylight saving, so a
// fixed offset is safe. We shift the absolute epoch by that offset and then
// read wall-clock fields with the UTC getters — this makes the countdown
// correct for a visitor in any timezone, not just one sitting in Johannesburg.
const SAST_OFFSET_MS = 2 * 60 * 60 * 1000;
const DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function shiftedNowMs(now: Date): number {
  // now.getTime() is already an absolute UTC epoch — no local-offset
  // correction needed.
  return now.getTime() + SAST_OFFSET_MS;
}

function candidateMs(
  shifted: number,
  dayOfWeek: number,
  hh: number,
  mm: number,
  weekOffset: number
): number {
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
  live: boolean;
};

function findNextService(now: Date): Next {
  const shifted = shiftedNowMs(now);
  let best: Next | null = null;

  for (const s of services) {
    const [sh, sm] = parseHM(s.start);
    const [eh, em] = parseHM(s.end);

    // weekOffset 1 always yields a candidate whose end is in the future, so a
    // match is guaranteed and the loop can stop at the first one it finds.
    for (const weekOffset of [0, 1]) {
      const startMs = candidateMs(shifted, s.day, sh, sm, weekOffset);
      const endMs = candidateMs(shifted, s.day, eh, em, weekOffset);
      if (endMs > shifted) {
        if (!best || startMs < best.startMs) {
          best = {
            name: s.name,
            day: s.day,
            start: s.start,
            startMs,
            endMs,
            live: startMs <= shifted,
          };
        }
        break;
      }
    }
  }

  return best as Next;
}

function splitDuration(ms: number) {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center rounded-xl bg-white/10 px-3 py-4 backdrop-blur-sm sm:min-w-[6rem]">
      <span className="font-display text-4xl font-semibold tabular-nums text-white sm:text-5xl">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="mt-1 font-body text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [now, setNow] = useState<Date | null>(null);

  // Rendered only after mount: the server has no idea what time it is for the
  // visitor, so emitting a countdown during SSR would guarantee a mismatch.
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const next = now ? findNextService(now) : null;
  const remaining = next && now ? next.startMs - shiftedNowMs(now) : 0;
  const { days, hours, minutes, seconds } = splitDuration(remaining);

  return (
    <section aria-labelledby="countdown-heading" className="bg-abundance-blue py-20 sm:py-24">
      <div className="container-px mx-auto max-w-3xl text-center">
        <h2
          id="countdown-heading"
          className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-abundance-leaf"
        >
          Next Service
        </h2>

        {!next ? (
          <div className="mt-6 h-[9.5rem]" aria-hidden="true" />
        ) : next.live ? (
          <div className="mt-6">
            <p className="font-display text-3xl font-semibold text-white sm:text-4xl">
              {next.name} is happening now
            </p>
            <p className="mt-3 font-body text-white/70">
              {DAY_LABELS[next.day]} &middot; {to12Hour(next.start)} &middot; You are welcome to join us.
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {next.name}
            </p>
            <p className="mt-1 font-body text-sm uppercase tracking-[0.15em] text-abundance-leaf">
              {DAY_LABELS[next.day]} &middot; {to12Hour(next.start)}
            </p>

            <div
              className="mt-8 flex justify-center gap-2.5 sm:gap-4"
              role="timer"
              aria-live="off"
              aria-label={`Time remaining until ${next.name}: ${days} days, ${hours} hours, ${minutes} minutes`}
            >
              <Unit value={days} label="Days" />
              <Unit value={hours} label="Hours" />
              <Unit value={minutes} label="Mins" />
              <Unit value={seconds} label="Secs" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
