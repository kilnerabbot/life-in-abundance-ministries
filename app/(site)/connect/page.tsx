import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { Eyebrow } from "@/components/UI";
import { PrayerForm, VisitorForm } from "@/components/public/ConnectForms";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Connect",
  description: `Plan your first visit to ${site.name} in ${site.city}, or send us a prayer request. We would love to meet you.`,
};

export default function ConnectPage() {
  return (
    <>
      <PageHeader
        eyebrow="Connect With Us"
        title="We&rsquo;d Love to Meet You"
        intro="Planning your first visit, or need prayer? Send us a note — a real person on our team will read it and reach out."
      />

      <section className="bg-sand-100 py-20 sm:py-28" aria-label="Connect forms">
        <div className="container-px mx-auto grid max-w-editorial gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-white p-8 shadow-soft ring-1 ring-brand-100">
              <Eyebrow tone="green">Plan a Visit</Eyebrow>
              <h2 className="mb-6 mt-3 font-display text-fluid-xl font-semibold text-abundance-blue">
                Tell us you&rsquo;re coming
              </h2>
              <VisitorForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl bg-white p-8 shadow-soft ring-1 ring-brand-100">
              <Eyebrow tone="green">Prayer</Eyebrow>
              <h2 className="mb-6 mt-3 font-display text-fluid-xl font-semibold text-abundance-blue">
                Let us pray with you
              </h2>
              <PrayerForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
