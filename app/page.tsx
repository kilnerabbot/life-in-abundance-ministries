import Hero, { HeroEnd } from "@/components/Hero";
import ProgrammeBoard from "@/components/ProgrammeBoard";
import VerseOfDay from "@/components/VerseOfDay";
import Countdown from "@/components/Countdown";
import ServiceBlocks from "@/components/ServiceBlocks";
import { Reveal, LeafField } from "@/components/Motion";
import { Eyebrow, Btn, ArrowLink, Section } from "@/components/UI";
import { homeIntro, mission, shepherd, contact, give, site, programmes } from "@/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroEnd />

      {/* 02 — INTRODUCTION: editorial two-column, text-led */}
      <Section className="bg-sand-100" aria={homeIntro.heading}>
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="green">{homeIntro.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-fluid-2xl font-semibold leading-[1.05] text-abundance-blue">
                {homeIntro.heading}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="font-body text-fluid-base leading-relaxed text-abundance-night/70">
                {homeIntro.body}
              </p>
              <div className="mt-6">
                <ArrowLink href="/about">Meet our church family</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 03 — MISSION MANIFESTO: typography as the hero */}
      <section
        aria-labelledby="mission-heading"
        className="relative overflow-hidden bg-abundance-blue py-24 sm:py-32 lg:py-44"
      >
        <LeafField count={9} speed={-80} opacity={0.1} />
        <div className="container-px relative z-10 mx-auto max-w-editorial">
          <Reveal>
            <Eyebrow tone="leaf">{mission.heading}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              id="mission-heading"
              className="mt-8 max-w-5xl font-display text-fluid-3xl font-medium leading-[1.03] text-white"
            >
              {mission.statement}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-10 max-w-prose font-body text-fluid-base leading-relaxed text-white/70">
              {mission.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 04 — WHAT WE DO: image-led service blocks, asymmetric */}
      <Section className="bg-sand-50" aria="When we gather">
        <div className="max-w-prose">
          <Reveal>
            <Eyebrow tone="green">When We Gather</Eyebrow>
            <h2 className="mt-5 font-display text-fluid-2xl font-semibold leading-tight text-abundance-blue">
              Three gatherings a week. One open door.
            </h2>
          </Reveal>
        </div>
        <div className="mt-14">
          <ServiceBlocks />
        </div>
      </Section>

      {/* 05 — SIGNATURE STORY: pastor pull-quote */}
      <section
        aria-labelledby="story-heading"
        className="relative overflow-hidden bg-abundance-night py-24 sm:py-32 lg:py-40"
      >
        <LeafField count={7} speed={90} opacity={0.07} />
        <div className="container-px relative z-10 mx-auto max-w-editorial">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow tone="leaf">A Word From Our Pastor</Eyebrow>
                <div className="mt-6 h-px w-16 bg-abundance-leaf/50" />
                <p className="mt-6 font-display text-fluid-lg font-semibold text-white">
                  {shepherd.name}
                </p>
                <p className="mt-1 font-body text-fluid-sm uppercase tracking-widest text-abundance-leaf">
                  {shepherd.role}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={0.12}>
                <blockquote>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-10 w-10 text-abundance-leaf/60"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2H4v2h1a4 4 0 0 0 4-4V7zm11 0h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V7z" />
                  </svg>
                  <p
                    id="story-heading"
                    className="mt-5 font-display text-fluid-xl font-medium italic leading-[1.25] text-white/95"
                  >
                    {shepherd.welcome}
                  </p>
                </blockquote>
                <div className="mt-8">
                  <ArrowLink href="/about" tone="white">
                    Read our story
                  </ArrowLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — SERVICE BOARD (real signage artifact) + countdown */}
      <Section className="bg-sand-100" aria="Service times">
        <Reveal>
          <ProgrammeBoard />
        </Reveal>
      </Section>
      <Countdown />

      {/* 07 — VERSE OF THE DAY */}
      <VerseOfDay />

      {/* 08 — CALL TO BELONG */}
      <section
        aria-labelledby="belong-heading"
        className="relative overflow-hidden bg-abundance-blue py-24 sm:py-32"
      >
        <LeafField count={10} speed={-70} opacity={0.1} />
        <div className="container-px relative z-10 mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow tone="leaf" className="justify-center">
              You Belong Here
            </Eyebrow>
            <h2
              id="belong-heading"
              className="mt-6 font-display text-fluid-3xl font-semibold leading-[1.03] text-white"
            >
              There is a place for you at this table.
            </h2>
            <p className="mx-auto mt-6 max-w-prose font-body text-fluid-base leading-relaxed text-white/75">
              Whether you have walked with Jesus for forty years or have never opened a Bible, come
              as you are. You will not be a stranger for long.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Btn href="/contact" variant="primary">
                Plan Your Visit
              </Btn>
              <Btn href="/programmes" variant="ghost">
                See Service Times
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10 — GIVE */}
      <Section className="bg-sand-50" aria={give.heading}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow tone="green">Generosity</Eyebrow>
              <h2 className="mt-5 font-display text-fluid-2xl font-semibold leading-tight text-abundance-blue">
                {give.heading}
              </h2>
              <p className="mt-6 max-w-prose font-body text-fluid-base leading-relaxed text-abundance-night/70">
                {give.intro}
              </p>
              <div className="mt-8">
                <Btn href="/give" variant="primary">
                  Give Today
                </Btn>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {give.reasons.map((r) => (
                  <li
                    key={r.title}
                    className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-brand-100"
                  >
                    <h3 className="font-display text-fluid-lg font-semibold text-abundance-blue">
                      {r.title}
                    </h3>
                    <p className="mt-2 font-body text-fluid-sm leading-relaxed text-abundance-night/65">
                      {r.body}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 11 — FINAL CTA */}
      <section
        aria-labelledby="final-heading"
        className="relative overflow-hidden bg-abundance-night py-28 sm:py-36 lg:py-44 text-center"
      >
        <LeafField count={12} speed={100} opacity={0.08} />
        <div className="container-px relative z-10 mx-auto max-w-3xl">
          <Reveal>
            <h2
              id="final-heading"
              className="font-display text-fluid-3xl font-semibold leading-[1.02] text-white"
            >
              Come as you are.
              <br />
              Live life in abundance.
            </h2>
            <p className="mx-auto mt-6 font-body text-fluid-base text-white/70">
              {programmes[0].day} &middot; {programmes[0].time} &middot; {site.city}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Btn href="/contact" variant="primary">
                Join Us Sunday
              </Btn>
              <Btn href={`tel:${contact.phones[0].tel}`} variant="ghost" external>
                Call {contact.phones[0].display}
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
