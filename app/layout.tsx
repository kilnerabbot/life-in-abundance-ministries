import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content";

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

// Base metadata. The public (site) group extends this with church-specific
// SEO + structured data; the admin area sets noindex in its own layout.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Church in ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} — a church in ${site.city}, South Africa.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* Scroll-reveal elements ship as opacity:0 because Framer Motion
            serialises `initial` into the markup. If JavaScript never runs
            they would stay invisible, so force them visible without it. */}
        <noscript>
          {/* eslint-disable-next-line react/no-danger */}
          <style
            dangerouslySetInnerHTML={{
              __html: "[data-reveal]{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
