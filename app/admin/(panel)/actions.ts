"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Only these tables may be deleted from, and each maps to the path to
// revalidate. Whitelisting prevents an attacker-supplied table name from
// reaching the query. RLS still enforces that the caller has delete rights.
const DELETABLE: Record<string, string> = {
  members: "/admin/members",
  giving: "/admin/giving",
  events: "/admin/events",
  attendance: "/admin/attendance",
  visitors: "/admin/visitors",
  ministries: "/admin/ministries",
  prayer_requests: "/admin/prayer",
  gallery: "/admin/media",
};

export async function deleteRow(formData: FormData) {
  const table = formData.get("table") as string;
  const id = formData.get("id") as string;

  const path = DELETABLE[table];
  if (!path || !id) throw new Error("Invalid delete request");

  const supabase = createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath(path);
}
