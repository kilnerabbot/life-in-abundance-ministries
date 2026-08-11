import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Shepherd from "@/components/Shepherd";
import Gallery from "@/components/Gallery";
import { Reveal, LeafField } from "@/components/Motion";
import { getGallery } from "@/lib/content-source";
import { story, beliefs, mission, vision, ministries, values, site, contact } from "@/content";

export const metadata: Metadata = {
  title: "About Us",
  description: `Meet the church family at ${site.name} in ${site.city} — our story, what we believe, and our senior pastor Rev. Elijah Takyi Hansen.`,
};

export const revalidate = 300;

export default async function AboutPage() {
  const gallery = await getGallery();
  return (
    <>
      <PageHeader
        eyebrow="Who We Are"
        title="About Our Church"
        intro={`${site.name} exists for one reason — so that people would see, experience and walk in the abundant life Jesus came to give.`}
      />

      {/* Our story */}
      <section aria-labelledby="story-heading" className="bg-abundance-offwhite py-20 sm:py-28">
        <div className="container-px mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
          <Reveal>
            <h2
              id="story-heading"
              className="font-display text-3xl font-semibold text-abundance-blue sm:text-4xl"
            >
              {story.heading}
            </h2>
            <p className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.25em] text-abundance-leaf">
              {site.city}, {site.country}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5">
              {story.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-body text-base leading-relaxed text-abundance-night/75"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission band */}
      <section
        aria-labelledby="mission-heading"
        className="relative overflow-hidden bg-abundance-blue py-20 sm:py-24"
      >
        <LeafField count={10} speed={-70} opacity={0.12} />
        <div className="container-px relative z-10 mx-auto max-w-3xl text-center">
          <Reveal>
            <h2
              id="mission-heading"
              className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-abundance-leaf"
            >
              Our Mission
            </h2>
            <p className="mt-6 font-display text-2xl font-medium leading-snug text-white sm:text-4xl">
              {mission.statement}
            </p>
            <p className="mt-6 font-body leading-relaxed text-white/75">{mission.body}</p>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section aria-labelledby="vision-heading" className="bg-white py-20 sm:py-28">
        <div className="container-px mx-auto max-w-5xl">
          <Reveal>
            <p className="text-center font-body text-xs font-semibold uppercase tracking-[0.3em] text-abundance-leaf">
              {vision.eyebrow}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-abundance-blue/10 bg-abundance-offwhite p-8">
                <h2 id="vision-heading" className="font-display text-2xl font-semibold text-abundance-blue">
                  {vision.visionHeading}
                </h2>
                <p className="mt-4 font-body leading-relaxed text-abundance-night/75">{vision.vision}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-abundance-blue/10 bg-abundance-offwhite p-8">
                <h2 className="font-display text-2xl font-semibold text-abundance-blue">
                  {vision.missionHeading}
                </h2>
                <p className="mt-4 font-body leading-relaxed text-abundance-night/75">{vision.mission}</p>
              </div>
            </Reveal>
          </div>

          {/* Three-fold purpose: See / Experience / Walk */}
          <Reveal>
            <h3 className="mt-16 text-center font-display text-2xl font-semibold text-abundance-blue sm:text-3xl">
              {vision.purposeHeading}
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-center font-body text-abundance-night/65">
              {vision.purposeIntro}
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {vision.purpose.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="rounded-2xl bg-abundance-blue p-7 text-white">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-abundance-leaf">
                  0{i + 1}
                </span>
                <h4 className="mt-3 font-display text-2xl font-semibold">{p.title}</h4>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/80">{p.body}</p>
                <p className="mt-4 font-body text-xs uppercase tracking-widest text-abundance-leaf">{p.ref}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Shepherd />

      {/* Ministries */}
      <section aria-labelledby="ministries-heading" className="bg-abundance-offwhite py-20 sm:py-28">
        <div className="container-px mx-auto max-w-5xl">
          <Reveal>
            <h2
              id="ministries-heading"
              className="text-center font-display text-3xl font-semibold text-abundance-blue sm:text-4xl"
            >
              Our Ministries
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center font-body text-abundance-night/65">
              There is a place to belong and to serve. Ask any leader on a Sunday how to get involved.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((m, i) => (
              <Reveal
                as="li"
                key={m.name}
                delay={(i % 3) * 0.06}
                className="flex items-center gap-3 rounded-xl border border-abundance-blue/10 bg-white p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-abundance-leaf" aria-hidden="true" />
                <span>
                  <span className="font-display text-base font-semibold text-abundance-blue">{m.name}</span>
                  {m.note && (
                    <span className="block font-body text-xs uppercase tracking-widest text-abundance-leaf">
                      {m.note}
                    </span>
                  )}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Gallery images={gallery} />

      {/* What we believe */}
      <section aria-labelledby="beliefs-heading" className="bg-white py-20 sm:py-28">
        <div className="container-px mx-auto max-w-5xl">
          <Reveal>
            <h2
              id="beliefs-heading"
              className="text-center font-display text-3xl font-semibold text-abundance-blue sm:text-4xl"
            >
              What We Believe
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center font-body text-abundance-night/65">
              The convictions that shape our worship, our teaching and our life together.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((belief, i) => (
              <Reveal
                as="li"
                key={belief.title}
                delay={i * 0.06}
                className="rounded-2xl border border-abundance-blue/10 bg-abundance-offwhite p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-abundance-leaf font-body text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-abundance-blue">
                  {belief.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-abundance-night/70">
                  {belief.body}
                </p>
                <p className="mt-3 font-body text-xs font-semibold uppercase tracking-widest text-abundance-leaf">
                  {belief.ref}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Values / Five-Fold Purpose + T.E.A.M. */}
      <section aria-labelledby="values-heading" className="bg-abundance-night py-20 sm:py-28">
        <div className="container-px mx-auto max-w-5xl">
          <Reveal>
            <p className="text-center font-body text-xs font-semibold uppercase tracking-[0.3em] text-abundance-leaf">
              {values.eyebrow}
            </p>
            <h2
              id="values-heading"
              className="mt-4 text-center font-display text-3xl font-semibold text-white sm:text-4xl"
            >
              {values.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center font-body text-white/65">{values.intro}</p>
          </Reveal>
          <ol className="mx-auto mt-12 max-w-3xl space-y-4">
            {values.points.map((point, i) => (
              <Reveal
                as="li"
                key={i}
                delay={i * 0.05}
                className="flex gap-4 rounded-xl bg-white/5 p-5 ring-1 ring-white/10"
              >
                <span className="font-display text-xl font-semibold text-abundance-leaf">0{i + 1}</span>
                <p className="font-body leading-relaxed text-white/85">{point}</p>
              </Reveal>
            ))}
          </ol>

          {/* T.E.A.M. */}
          <Reveal>
            <h3 className="mt-16 text-center font-display text-2xl font-semibold text-white">
              {values.team.heading}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-center font-body text-white/65">
              {values.team.intro}
            </p>
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {values.team.letters.map((l, i) => (
              <Reveal
                as="li"
                key={l.letter}
                delay={i * 0.08}
                className="rounded-2xl bg-abundance-blue p-6 text-center"
              >
                <span className="font-display text-4xl font-bold text-abundance-leaf">{l.letter}</span>
                <span className="mt-2 block font-body text-sm uppercase tracking-widest text-white">
                  {l.word}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bg-abundance-offwhite py-20 text-center sm:py-24">
        <div className="container-px mx-auto max-w-2xl">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-abundance-blue sm:text-4xl">
              {contact.invitation}
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/programmes"
                className="rounded-full bg-abundance-blue px-7 py-3 font-body text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                See Service Times
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-abundance-blue px-7 py-3 font-body text-sm font-semibold text-abundance-blue transition-colors hover:bg-abundance-blue hover:text-white"
              >
                Plan Your Visit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
