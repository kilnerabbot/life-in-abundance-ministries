"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";
import type { UserRole } from "@/lib/supabase/roles";

type Item = { href: string; label: string; roles?: UserRole[] };
type Group = { heading: string; items: Item[] };

// Grouped navigation. `roles` restricts visibility; omitted = all staff.
// Only routes that exist are listed — no dead links.
const GROUPS: Group[] = [
  {
    heading: "Overview",
    items: [{ href: "/admin", label: "Dashboard" }],
  },
  {
    heading: "People",
    items: [
      { href: "/admin/members", label: "Members" },
      { href: "/admin/visitors", label: "Visitors" },
      { href: "/admin/attendance", label: "Attendance" },
    ],
  },
  {
    heading: "Ministries",
    items: [{ href: "/admin/ministries", label: "Ministries" }],
  },
  {
    heading: "Care",
    items: [{ href: "/admin/prayer", label: "Prayer Requests" }],
  },
  {
    heading: "Events",
    items: [{ href: "/admin/events", label: "Events" }],
  },
  {
    heading: "Finance",
    items: [{ href: "/admin/giving", label: "Giving", roles: ["pastor", "admin", "finance"] }],
  },
  {
    heading: "Website",
    items: [{ href: "/admin/cms", label: "Site Content", roles: ["pastor", "admin"] }],
  },
];

export default function Sidebar({ role, name }: { role: UserRole; name: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-brand-800 bg-abundance-night text-white">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-4">
        <Logo className="h-9 w-9" />
        <div className="leading-tight">
          <p className="font-display text-base font-semibold">Church Manager</p>
          <p className="font-body text-[0.6rem] uppercase tracking-widest text-abundance-leaf">
            {role}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4" aria-label="Admin">
        {GROUPS.map((group) => {
          const items = group.items.filter((i) => !i.roles || i.roles.includes(role));
          if (!items.length) return null;
          return (
            <div key={group.heading}>
              <p className="px-3 pb-1.5 font-body text-[0.6rem] font-semibold uppercase tracking-widest text-white/35">
                {group.heading}
              </p>
              <div className="space-y-0.5">
                {items.map((item) => {
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2 font-body text-sm transition-colors ${
                        active
                          ? "bg-abundance-leaf text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="truncate font-body text-sm text-white/80">{name || "Staff"}</p>
        <button onClick={signOut} className="mt-2 font-body text-xs text-abundance-leaf hover:underline">
          Sign out
        </button>
      </div>
    </aside>
  );
}
