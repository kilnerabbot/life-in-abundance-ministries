import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared editorial UI primitives. Centralises button/eyebrow/link styling so
 * pages compose from one design system instead of re-hardcoding classes.
 */

export function Eyebrow({
  children,
  tone = "leaf",
  className = "",
}: {
  children: ReactNode;
  tone?: "leaf" | "green" | "white";
  className?: string;
}) {
  const color =
    tone === "white"
      ? "text-white/70"
      : tone === "green"
        ? "text-abundance-green"
        : "text-abundance-leaf";
  return (
    <p
      className={`font-body text-fluid-sm font-semibold uppercase tracking-eyebrow ${color} ${className}`}
    >
      {children}
    </p>
  );
}

const arrow = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
};

export function Btn({ href, children, variant = "primary", external, className = "" }: BtnProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-body text-fluid-sm font-semibold transition-all duration-300 ease-editorial focus-visible:outline-none";
  const styles = {
    primary: "bg-abundance-leaf text-white shadow-soft hover:shadow-lift hover:-translate-y-0.5",
    secondary:
      "bg-white text-abundance-blue shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5",
    ghost: "border border-white/40 text-white backdrop-blur-sm hover:bg-white/10",
  }[variant];

  const cls = `${base} ${styles} ${className}`;

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Tertiary text-and-arrow link. Arrow nudges right on hover. */
export function ArrowLink({
  href,
  children,
  tone = "green",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "green" | "white" | "blue";
  external?: boolean;
  className?: string;
}) {
  const color =
    tone === "white"
      ? "text-white"
      : tone === "blue"
        ? "text-abundance-blue"
        : "text-abundance-green";
  const cls = `group inline-flex items-center gap-2 font-body text-fluid-sm font-semibold ${color} ${className}`;
  const inner = (
    <>
      {children}
      {arrow}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Standard vertical rhythm wrapper with the editorial container width. */
export function Section({
  children,
  className = "",
  inner = "max-w-editorial",
  id,
  aria,
}: {
  children: ReactNode;
  className?: string;
  inner?: string;
  id?: string;
  aria?: string;
}) {
  return (
    <section id={id} aria-label={aria} className={`py-20 sm:py-28 lg:py-36 ${className}`}>
      <div className={`container-px mx-auto ${inner}`}>{children}</div>
    </section>
  );
}
