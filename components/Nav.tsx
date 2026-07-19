"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { nav, site } from "@/content";

export default function Nav() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Only the home page has a dark hero for the bar to float over.
  const overHero = pathname === "/";

  // The hero is *pinned* for well over one viewport height, so a scrollY
  // threshold can't tell us when it has actually left. Hero renders a
  // #hero-end sentinel after the pin spacer; we watch that instead.
  useEffect(() => {
    if (!overHero) {
      setPastHero(true);
      return;
    }

    const sentinel = document.getElementById("hero-end");
    if (!sentinel) {
      setPastHero(true);
      return;
    }

    setPastHero(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Solid once the sentinel reaches the header, or has scrolled above it.
        setPastHero(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [overHero, pathname]);

  // Close the drawer on route change.
  useEffect(() => setOpen(false), [pathname]);

  // While the drawer is open: lock scroll, close on Escape, move focus in,
  // and restore focus to the toggle on close.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      (previouslyFocused ?? toggleRef.current)?.focus?.();
    };
  }, [open]);

  const solid = !overHero || pastHero;
  const textClass = solid ? "text-abundance-blue" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-px mx-auto flex max-w-6xl items-center justify-between py-3"
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <Logo className="h-10 w-10 shrink-0" />
          <span className={`font-display text-lg font-semibold leading-tight ${textClass}`}>
            {site.shortName}
            <span className="block font-body text-[0.6rem] font-medium uppercase tracking-[0.22em] opacity-70">
              Ministries
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 font-body text-sm font-medium tracking-wide transition-colors hover:text-abundance-leaf ${
                    active ? "text-abundance-leaf" : textClass
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-abundance-leaf" />
                  )}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="rounded-full bg-abundance-leaf px-5 py-2 font-body text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
            >
              Plan a Visit
            </Link>
          </li>
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className={`-mr-1 p-1 md:hidden ${textClass}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-abundance-night/50 md:hidden"
            />
            <motion.div
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              tabIndex={-1}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-1 bg-white p-8 pt-24 shadow-2xl md:hidden"
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`border-b border-abundance-blue/10 py-4 font-display text-xl font-semibold ${
                    pathname === item.href ? "text-abundance-leaf" : "text-abundance-blue"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-6 rounded-full bg-abundance-leaf px-6 py-3 text-center font-body text-sm font-semibold text-white"
              >
                Plan a Visit
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
