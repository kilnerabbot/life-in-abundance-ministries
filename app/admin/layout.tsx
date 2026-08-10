import type { Metadata } from "next";

// The admin area must never be indexed.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-sand-100">{children}</div>;
}
