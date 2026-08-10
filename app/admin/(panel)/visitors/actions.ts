"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createVisitor(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const get = (k: string) => (formData.get(k) as string)?.trim() || null;

  const { error } = await supabase.from("visitors").insert({
    first_name: get("first_name"),
    last_name: get("last_name"),
    phone: get("phone"),
    email: get("email"),
    source: get("source"),
    first_visit: get("first_visit") ?? new Date().toISOString().slice(0, 10),
    status: get("status") ?? "new",
    notes: get("notes"),
    created_by: user?.id ?? null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/visitors");
}

export async function setVisitorStatus(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase
    .from("visitors")
    .update({ status: formData.get("status") })
    .eq("id", formData.get("id"));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/visitors");
}
