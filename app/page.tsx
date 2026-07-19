import Link from "next/link";
import Hero, { HeroEnd } from "@/components/Hero";
import ProgrammeBoard from "@/components/ProgrammeBoard";
import VerseOfDay from "@/components/VerseOfDay";
import Countdown from "@/components/Countdown";
import { Reveal, LeafField } from "@/components/Motion";
import { homeIntro, mission, programmes, contact, shepherd, site } from "@/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroEnd />

      {/* Welcome — the dark hero hands off into the first light section */}
      <section
        aria-labelledby="welcome-heading"
        className="relative overflow-hidden bg-gradient-to-b from-abundance-night via-abundance-blue to-abundance-offwhite py-24 sm:py-32"
      >
        <LeafField count={10} speed={-60} opacity={0.1} />

        <div className="container-px relative z-10 mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-abundance-leaf">
              {homeIntro.eyebrow}
            </p>
            <h2
              id="welcome-heading"
              className="mt-4 font-display text-3xl font-semibold text-white sm:text-5xl"
            >
              {homeIntro.heading}
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed text-white/80 sm:text-lg">
              {homeIntro.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* The Promise — mission statement */}
      <section aria-labelledby="promise-heading" className="bg-abundance-offwhite py-20 sm:py-28">
        <div className="container-px mx-auto max-w-4xl text-center">
          <Reveal>
            <h2
              id="promise-heading"
              className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-abundance-green"
            >
              {mission.heading}
            </h2>
            <p className="mt-6 font-display text-2xl font-medium leading-snug text-abundance-blue sm:text-4xl">
              {mission.statement}
            </p>
            <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-abundance-night/70">
              {mission.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Programme board — the signboard motif */}
      <section aria-labelledby="programmes-heading" className="bg-abundance-offwhite pb-20 sm:pb-28">
        <div className="container-px mx-auto max-w-5xl">
          <Reveal>
            <h2
              id="programmes-heading"
              className="mb-8 text-center font-display text-3xl font-semibold text-abundance-blue sm:text-4xl"
            >
              When We Gather
            </h2>
          </Reveal>
          <ProgrammeBoard />
          <Reveal>
            <p className="mt-8 text-center">
              <Link
                href="/programmes"
                className="font-body text-sm font-semibold text-abundance-green underline-offset-4 hover:underline"
              >
                See what each service is like &rarr;
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <Countdown />
      <VerseOfDay />

      {/* Pastor teaser → about page */}
      <section aria-labelledby="pastor-teaser" className="bg-white py-20 sm:py-24">
        <div className="container-px mx-auto max-w-3xl text-center">
          <Reveal>
            <h2
              id="pastor-teaser"
              className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-abundance-green"
            >
              A Word From Our Pastor
            </h2>
            <blockquote className="mt-6">
              <p className="font-display text-xl italic leading-relaxed text-abundance-blue sm:text-2xl">
                &ldquo;Jesus did not save us to leave us empty — He came so that we could live
                full, overflowing lives in Him.&rdquo;
              </p>
              <footer className="mt-5 font-body text-sm font-semibold uppercase tracking-[0.18em] text-abundance-night/60">
                {shepherd.name}
              </footer>
            </blockquote>
            <Link
              href="/about"
              className="mt-8 inline-block rounded-full border-2 border-abundance-blue px-7 py-3 font-body text-sm font-semibold text-abundance-blue transition-colors hover:bg-abundance-blue hover:text-white"
            >
              Meet Our Church
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Closing invitation */}
      <section
        aria-labelledby="invitation-heading"
        className="relative overflow-hidden bg-abundance-blue py-24 sm:py-28"
      >
        <LeafField count={12} speed={80} opacity={0.1} />

        <div className="container-px relative z-10 mx-auto max-w-2xl text-center">
          <Reveal>
            <h2
              id="invitation-heading"
              className="font-display text-3xl font-semibold text-white sm:text-5xl"
            >
              {contact.invitation}
            </h2>
            <p className="mt-5 font-body text-white/80">
              {programmes[0].day} &middot; {programmes[0].time} &middot; {site.city}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-abundance-leaf px-7 py-3 font-body text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
              >
                Plan Your Visit
              </Link>
              <a
                href={`tel:${contact.phones[0].tel}`}
                className="rounded-full border border-white/40 px-7 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call {contact.phones[0].display}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
