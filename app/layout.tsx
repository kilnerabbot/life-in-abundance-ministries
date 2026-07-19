import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site, contact } from "@/content";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Church in ${site.city}, South Africa`,
  description:
    `${site.name} is a church in ${site.city}, South Africa. Join our Sunday Divine Service (8:00 AM – 10:00 AM), ` +
    `Wednesday Healing & Bible Study, and Friday Holy Ghost Baptism services. Abundance to the Full, Till it Overflows.`,
  openGraph: {
    title: `${site.name} | Church in ${site.city}, South Africa`,
    description:
      `Join ${site.name} for Sunday Divine Service at 8:00 AM in ${site.city}. Life to the full — John 10:10.`,
    url: site.url,
    siteName: site.name,
    locale: "en_ZA",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: site.name,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "ZA",
  },
  telephone: contact.phones,
  url: site.url,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
