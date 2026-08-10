"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import type { UserRole } from "@/lib/supabase/roles";

type Item = { href: string; label: string; roles?: UserRole[] };

// Ordered nav. `roles` restricts visibility; omitted = all signed-in staff.
const ITEMS: Item[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/cms", label: "Site Content", roles: ["pastor", "admin"] },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/giving", label: "Giving", roles: ["pastor", "admin", "finance"] },
  { href: "/admin/attendance", label: "Attendance" },
  { href: "/admin/events", label: "Events" },
];

export default function Sidebar({
  role,
  name,
}: {
  role: UserRole;
  name: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const visible = ITEMS.filter((i) => !i.roles || i.roles.includes(role));

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
          <p className="font-display text-base font-semibold">Admin</p>
          <p className="font-body text-[0.65rem] uppercase tracking-widest text-abundance-leaf">
            {role}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin">
        {visible.map((item) => {
          const active =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
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
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="truncate font-body text-sm text-white/80">{name || "Staff"}</p>
        <button
          onClick={signOut}
          className="mt-2 font-body text-xs text-abundance-leaf hover:underline"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
