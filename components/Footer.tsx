import Logo from "./Logo";
import { site, footer } from "@/content";

export default function Footer() {
  return (
    <footer className="bg-abundance-night py-10 text-center">
      <div className="container-px mx-auto flex max-w-4xl flex-col items-center gap-3">
        <Logo className="h-10 w-10" />
        <p className="font-display text-lg font-semibold text-abundance-offwhite">{site.name}</p>
        <p className="font-body text-xs uppercase tracking-widest text-abundance-leaf">
          {site.anchorVerseRef}
        </p>
        <p className="font-body text-xs text-abundance-offwhite/50">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="font-body text-xs text-abundance-offwhite/40">{footer.credit}</p>
      </div>
    </footer>
  );
}
