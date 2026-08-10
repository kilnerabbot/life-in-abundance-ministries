"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createEvent(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const get = (k: string) => (formData.get(k) as string)?.trim() || null;

  const { error } = await supabase.from("events").insert({
    title: get("title"),
    description: get("description"),
    location: get("location"),
    starts_at: formData.get("starts_at"),
    ends_at: get("ends_at"),
    published: formData.get("published") === "on",
    created_by: user?.id ?? null,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/events");
}
