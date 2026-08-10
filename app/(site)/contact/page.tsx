import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProgrammeBoard from "@/components/ProgrammeBoard";
import { Reveal } from "@/components/Motion";
import { contact, site } from "@/content";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description: `Find ${site.name} in ${site.city}. Call 081 400 3228 or 073 409 5254, or message us on WhatsApp to plan your visit.`,
};

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    contact.whatsappMessage
  )}`;

  return (
    <>
      <PageHeader
        eyebrow="Come and See"
        title={contact.heading}
        intro="We would love to meet you. Call, message, or simply arrive on Sunday morning — someone will be waiting at the door."
      />

      <section aria-labelledby="contact-heading" className="bg-abundance-offwhite py-20 sm:py-24">
        <div className="container-px mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Details */}
          <Reveal>
            <h2 id="contact-heading" className="sr-only">
              Contact details
            </h2>

            <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-abundance-blue/10">
              <h3 className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-abundance-green">
                Where to Find Us
              </h3>
              <address className="mt-3 not-italic">
                <p className="font-display text-2xl font-semibold text-abundance-blue">
                  {contact.address}
                </p>
                <p className="mt-2 font-body text-sm text-abundance-night/60">
                  {contact.addressNote}
                </p>
              </address>

              <hr className="my-6 border-abundance-blue/10" />

              <h3 className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-abundance-green">
                Call Us
              </h3>
              <ul className="mt-3 space-y-2">
                {contact.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
                      className="font-display text-xl font-semibold text-abundance-blue underline-offset-4 hover:text-abundance-leaf hover:underline"
                    >
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-abundance-leaf px-6 py-3.5 font-body text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03]"
              >
                <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.61 1.912 6.484L4 29l7.7-1.877A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm6.977 17.02c-.294.827-1.455 1.516-2.386 1.71-.633.13-1.46.234-4.245-.912-3.561-1.47-5.856-5.086-6.033-5.322-.177-.235-1.44-1.916-1.44-3.655s.914-2.593 1.24-2.95c.294-.323.646-.404.86-.404.213 0 .44.006.632.014.203.009.474-.077.741.566.294.706.998 2.437 1.084 2.615.088.177.147.383.03.618-.117.235-.176.383-.352.588-.177.206-.373.46-.53.617-.176.177-.36.368-.155.72.206.353.914 1.51 1.964 2.446 1.35 1.204 2.49 1.577 2.844 1.754.353.176.559.147.765-.088.206-.235.882-1.03 1.117-1.384.235-.353.47-.294.794-.176.323.117 2.052.968 2.404 1.144.353.177.588.265.677.412.088.147.088.851-.206 1.678z" />
                </svg>
                Message us on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1}>
            <div className="h-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-abundance-blue/10">
              <iframe
                title={`Map showing ${site.city}, South Africa`}
                src={contact.mapEmbedSrc}
                className="h-full w-full"
                style={{ border: 0, minHeight: 420 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service times reminder */}
      <section aria-label="Service times" className="bg-abundance-offwhite pb-20 sm:pb-28">
        <div className="container-px mx-auto max-w-5xl">
          <ProgrammeBoard withMission={false} />
        </div>
      </section>

      {/* Invitation */}
      <section className="bg-white py-20 text-center sm:py-24">
        <div className="container-px mx-auto max-w-2xl">
          <Reveal>
            <p className="font-display text-3xl font-semibold leading-snug text-abundance-blue sm:text-4xl">
              {contact.invitation}
            </p>
            <p className="mt-5 font-body text-sm uppercase tracking-[0.2em] text-abundance-green">
              {site.tagline}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
