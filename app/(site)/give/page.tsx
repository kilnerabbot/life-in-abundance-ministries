import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Reveal, LeafField } from "@/components/Motion";
import { give, site, verses } from "@/content";

export const metadata: Metadata = {
  title: "Give",
  description: `Sow into the ministry of ${site.name} in ${site.city}. Bank transfer details and WhatsApp confirmation.`,
};

const BANK_ROWS: [string, string][] = [
  ["Bank", give.bank.bankName],
  ["Account Name", give.bank.accountName],
  ["Account No", give.bank.accountNumber],
  ["Branch Code", give.bank.branchCode],
];

// Luke 6:38 — the giving verse from the rotating collection.
const GIVING_VERSE = verses.find((v) => v.ref.startsWith("Luke 6:38")) ?? verses[0];

export default function GivePage() {
  const whatsappHref = `https://wa.me/${give.whatsappNumber}?text=${encodeURIComponent(
    give.whatsappMessage
  )}`;

  return (
    <>
      <PageHeader eyebrow="Partner With Us" title={give.heading} intro={give.intro} />

      {/* Why we give */}
      <section aria-labelledby="why-give-heading" className="bg-abundance-offwhite py-20 sm:py-24">
        <div className="container-px mx-auto max-w-5xl">
          <Reveal>
            <h2
              id="why-give-heading"
              className="text-center font-display text-3xl font-semibold text-abundance-blue sm:text-4xl"
            >
              Why We Give
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {give.reasons.map((reason, i) => (
              <Reveal
                as="li"
                key={reason.title}
                delay={i * 0.08}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-abundance-blue/10"
              >
                <h3 className="font-display text-xl font-semibold text-abundance-blue">
                  {reason.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-abundance-night/70">
                  {reason.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Bank details */}
      <section
        aria-labelledby="bank-heading"
        className="relative overflow-hidden bg-abundance-blue py-20 sm:py-28"
      >
        <LeafField count={11} speed={-60} opacity={0.1} />

        <div className="container-px relative z-10 mx-auto max-w-xl">
          <Reveal>
            <h2
              id="bank-heading"
              className="text-center font-display text-3xl font-semibold text-white sm:text-4xl"
            >
              Banking Details
            </h2>
            <p className="mt-3 text-center font-body text-sm text-white/70">{give.reference}</p>

            <dl className="mt-10 overflow-hidden rounded-2xl bg-white shadow-xl">
              {BANK_ROWS.map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-abundance-blue/10 px-6 py-4 last:border-b-0"
                >
                  <dt className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-abundance-night/50">
                    {label}
                  </dt>
                  <dd className="font-body text-base font-bold tracking-wide text-abundance-blue">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-center font-body text-xs text-white/60">
              Details shown are placeholders — the church will supply the live account information
              before launch.
            </p>

            <div className="mt-8 text-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-abundance-leaf px-8 py-4 font-body text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
              >
                <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.61 1.912 6.484L4 29l7.7-1.877A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm6.977 17.02c-.294.827-1.455 1.516-2.386 1.71-.633.13-1.46.234-4.245-.912-3.561-1.47-5.856-5.086-6.033-5.322-.177-.235-1.44-1.916-1.44-3.655s.914-2.593 1.24-2.95c.294-.323.646-.404.86-.404.213 0 .44.006.632.014.203.009.474-.077.741.566.294.706.998 2.437 1.084 2.615.088.177.147.383.03.618-.117.235-.176.383-.352.588-.177.206-.373.46-.53.617-.176.177-.36.368-.155.72.206.353.914 1.51 1.964 2.446 1.35 1.204 2.49 1.577 2.844 1.754.353.176.559.147.765-.088.206-.235.882-1.03 1.117-1.384.235-.353.47-.294.794-.176.323.117 2.052.968 2.404 1.144.353.177.588.265.677.412.088.147.088.851-.206 1.678z" />
                </svg>
                Confirm your giving on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Giving verse */}
      <section className="bg-abundance-offwhite py-20 text-center sm:py-24">
        <div className="container-px mx-auto max-w-2xl">
          <Reveal>
            <blockquote>
              <p className="font-display text-2xl italic leading-snug text-abundance-blue sm:text-3xl">
                {GIVING_VERSE.text}
              </p>
              <footer className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-abundance-green">
                {GIVING_VERSE.ref}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>
    </>
  );
}
