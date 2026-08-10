import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site, contact, programmes } from "@/content";

const description =
  `${site.name} is a church in ${site.city}, South Africa. Join us for Sunday Divine Service ` +
  `(8:00 AM – 10:00 AM), Wednesday Healing & Bible Study, and Friday Holy Ghost Baptism. ` +
  `Abundance to the Full, Till it Overflows — John 10:10.`;

export const metadata: Metadata = {
  description,
  keywords: [
    "church in Johannesburg",
    "Johannesburg church service times",
    "Life in Abundance Ministries",
    "Sunday service Johannesburg",
    "bible study Johannesburg",
    "healing service",
  ],
  openGraph: {
    title: `${site.name} | Church in ${site.city}`,
    description,
    url: site.url,
    siteName: site.name,
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Church in ${site.city}`,
    description,
  },
  robots: { index: true, follow: true },
};

// Placeholder copy is bracketed (e.g. "[STREET ADDRESS]"). Structured data
// must never carry it — search engines would index the placeholder verbatim.
const isPlaceholder = (value: string) => value.includes("[");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: site.name,
  description,
  url: site.url,
  slogan: site.tagline,
  telephone: contact.phones.map((p) => p.tel),
  address: {
    "@type": "PostalAddress",
    ...(isPlaceholder(contact.address) ? {} : { streetAddress: contact.address }),
    addressLocality: site.city,
    addressRegion: "Gauteng",
    addressCountry: "ZA",
  },
  event: programmes.map((p) => ({
    "@type": "Event",
    name: p.title,
    description: p.summary,
    eventSchedule: {
      "@type": "Schedule",
      repeatFrequency: "P1W",
      byDay: `https://schema.org/${p.schemaDay}`,
      startTime: p.startTime,
      endTime: p.endTime,
      scheduleTimezone: "Africa/Johannesburg",
    },
    location: {
      "@type": "Place",
      name: site.name,
      address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "ZA" },
    },
  })),
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
