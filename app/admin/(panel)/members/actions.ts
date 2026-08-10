"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createMember(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const get = (k: string) => (formData.get(k) as string)?.trim() || null;

  // RLS rejects the insert if the caller is not pastor/admin — no extra check needed,
  // but we surface a clean error instead of a silent failure.
  const { error } = await supabase.from("members").insert({
    first_name: get("first_name"),
    last_name: get("last_name"),
    email: get("email"),
    phone: get("phone"),
    address: get("address"),
    status: get("status") ?? "new",
    joined_on: get("joined_on"),
    notes: get("notes"),
    created_by: user?.id ?? null,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/members");
}
