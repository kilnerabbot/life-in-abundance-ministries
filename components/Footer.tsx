import Link from "next/link";
import Logo from "./Logo";
import CurrentYear from "./CurrentYear";
import { site, footer, nav, contact, programmes } from "@/content";

export default function Footer() {
  return (
    <footer className="bg-abundance-night text-abundance-offwhite">
      <div className="container-px mx-auto grid max-w-6xl gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <Logo className="h-12 w-12" />
            <span className="font-display text-xl font-semibold">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-abundance-offwhite/70">
            {footer.blurb}
          </p>
          <p className="mt-5 font-display text-base italic text-abundance-leaf">
            &ldquo;{site.anchorVerseText}&rdquo;
          </p>
          <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-abundance-offwhite/50">
            {site.anchorVerseRef}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-abundance-leaf">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-sm text-abundance-offwhite/75 transition-colors hover:text-abundance-leaf"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-abundance-leaf">
            Service Times
          </h2>
          <ul className="mt-4 space-y-2.5">
            {programmes.map((p) => (
              <li key={p.slug} className="font-body text-sm text-abundance-offwhite/75">
                <span className="block font-semibold text-abundance-offwhite">{p.day}</span>
                {p.time}
              </li>
            ))}
          </ul>
          <ul className="mt-5 space-y-1.5">
            {contact.phones.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className="font-body text-sm text-abundance-offwhite/75 transition-colors hover:text-abundance-leaf"
                >
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="font-body text-xs text-abundance-offwhite/50">
            &copy; <CurrentYear buildYear={new Date().getFullYear()} /> {site.name}. All rights
            reserved.
          </p>
          <p className="font-body text-xs text-abundance-offwhite/40">{footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}
