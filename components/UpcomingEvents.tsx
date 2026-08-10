import { Reveal } from "./Motion";
import { Eyebrow, ArrowLink, Section } from "./UI";
import type { PublicEvent } from "@/lib/content-source";

/**
 * Public "Upcoming Events" section, fed by published rows from the admin.
 * Renders nothing when there are no events, so the homepage never shows an
 * empty shell before the church has added any.
 */
export default function UpcomingEvents({ events }: { events: PublicEvent[] }) {
  if (!events.length) return null;

  return (
    <Section className="bg-sand-50" aria="Upcoming events">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Reveal>
            <Eyebrow tone="green">What&rsquo;s On</Eyebrow>
            <h2 className="mt-4 font-display text-fluid-2xl font-semibold leading-tight text-abundance-blue">
              Upcoming Events
            </h2>
          </Reveal>
        </div>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e, i) => {
          const start = new Date(e.starts_at);
          const day = start.toLocaleDateString("en-ZA", { day: "2-digit" });
          const month = start.toLocaleDateString("en-ZA", { month: "short" }).toUpperCase();
          const time = start.toLocaleTimeString("en-ZA", { hour: "numeric", minute: "2-digit" });
          return (
            <Reveal as="li" key={e.id} delay={i * 0.08}>
              <article className="flex h-full gap-5 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-brand-100 transition-transform duration-300 ease-editorial hover:-translate-y-1 hover:shadow-soft-lg">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-abundance-blue text-white">
                  <span className="font-display text-2xl font-semibold leading-none">{day}</span>
                  <span className="font-body text-[0.6rem] font-bold tracking-widest">{month}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-fluid-lg font-semibold leading-tight text-abundance-blue">
                    {e.title}
                  </h3>
                  <p className="mt-1 font-body text-fluid-sm text-abundance-green">
                    {time}
                    {e.location ? ` · ${e.location}` : ""}
                  </p>
                  {e.description && (
                    <p className="mt-2 line-clamp-3 font-body text-fluid-sm leading-relaxed text-abundance-night/65">
                      {e.description}
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>

      <div className="mt-10">
        <ArrowLink href="/contact">Ask us about an event</ArrowLink>
      </div>
    </Section>
  );
}
