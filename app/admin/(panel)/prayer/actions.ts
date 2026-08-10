"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createPrayer(formData: FormData) {
  const supabase = createClient();
  const get = (k: string) => (formData.get(k) as string)?.trim() || null;

  const { error } = await supabase.from("prayer_requests").insert({
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    request: get("request"),
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/prayer");
}

export async function setPrayerStatus(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase
    .from("prayer_requests")
    .update({ status: formData.get("status") })
    .eq("id", formData.get("id"));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/prayer");
}
