import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProgrammeBoard from "@/components/ProgrammeBoard";
import Countdown from "@/components/Countdown";
import { Reveal } from "@/components/Motion";
import { programmes, whatToExpect, site, contact } from "@/content";

export const metadata: Metadata = {
  title: "Programmes & Service Times",
  description: `Service times at ${site.name}, ${site.city}: Sunday Divine Service 8:00 AM – 10:00 AM, Wednesday Healing & Bible Study 6:30 PM – 7:30 PM, Friday Holy Ghost Baptism 6:30 PM – 7:30 PM.`,
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHeader
        eyebrow="When We Gather"
        title="Programmes"
        intro="Three gatherings a week, each with its own character — but the same welcome at the door."
      />

      {/* Signboard */}
      <section aria-label="Service times" className="bg-abundance-offwhite py-16 sm:py-20">
        <div className="container-px mx-auto max-w-5xl">
          <ProgrammeBoard />
        </div>
      </section>

      <Countdown />

      {/* Service detail */}
      <section aria-labelledby="detail-heading" className="bg-abundance-offwhite py-20 sm:py-28">
        <div className="container-px mx-auto max-w-4xl">
          <Reveal>
            <h2
              id="detail-heading"
              className="text-center font-display text-3xl font-semibold text-abundance-blue sm:text-4xl"
            >
              What Happens at Each Service
            </h2>
          </Reveal>

          <div className="mt-14 space-y-8">
            {programmes.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <article
                  id={p.slug}
                  className="scroll-mt-24 overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-abundance-blue/10"
                >
                  <div className="flex flex-wrap items-center gap-3 border-b border-abundance-blue/10 bg-abundance-blue/5 px-6 py-4">
                    <span className="rounded-full bg-abundance-leaf px-4 py-1.5 font-body text-xs font-extrabold uppercase tracking-wider text-white">
                      {p.day}
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-abundance-blue">
                      {p.title}
                    </h3>
                    <span className="ml-auto font-body text-sm font-semibold text-abundance-green">
                      {p.time}
                    </span>
                  </div>
                  <div className="px-6 py-6">
                    <p className="font-display text-lg italic text-abundance-blue/80">{p.summary}</p>
                    <p className="mt-4 font-body text-sm leading-relaxed text-abundance-night/75">
                      {p.detail}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section aria-labelledby="expect-heading" className="bg-white py-20 sm:py-28">
        <div className="container-px mx-auto max-w-5xl">
          <Reveal>
            <h2
              id="expect-heading"
              className="text-center font-display text-3xl font-semibold text-abundance-blue sm:text-4xl"
            >
              Visiting for the First Time?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center font-body text-abundance-night/65">
              Here is exactly what to expect, so nothing catches you off guard.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {whatToExpect.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.07}
                className="rounded-2xl border border-abundance-blue/10 bg-abundance-offwhite p-6"
              >
                <h3 className="font-display text-xl font-semibold text-abundance-blue">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-abundance-night/70">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-block rounded-full bg-abundance-leaf px-8 py-3 font-body text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
              >
                Get Directions
              </Link>
            </p>
            <p className="mt-5 text-center font-display text-xl italic text-abundance-blue">
              {contact.invitation}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
