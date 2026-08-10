import { redirect } from "next/navigation";
import { createClient } from "./server";

export type UserRole = "pastor" | "admin" | "finance" | "viewer";

export type Profile = {
  id: string;
  full_name: string;
  role: UserRole;
};

/** Roles allowed to write CMS/members/events/attendance. */
export const EDITORS: UserRole[] = ["pastor", "admin"];
/** Roles allowed to see giving/finance. */
export const FINANCE: UserRole[] = ["pastor", "admin", "finance"];

/**
 * Load the signed-in user's profile, or redirect to login. Every admin page
 * calls this — it is the server-side gate. RLS is the real enforcement; this
 * gives fast redirects and role-aware UI.
 */
export async function requireProfile(): Promise<Profile> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/admin/login");
  return profile as Profile;
}

/** Require the caller to hold one of `roles`, else send them to the dashboard. */
export async function requireRole(roles: UserRole[]): Promise<Profile> {
  const profile = await requireProfile();
  if (!roles.includes(profile.role)) redirect("/admin?denied=1");
  return profile;
}
