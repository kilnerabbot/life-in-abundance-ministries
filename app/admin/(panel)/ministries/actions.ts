"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createMinistry(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const get = (k: string) => (formData.get(k) as string)?.trim() || null;

  const { error } = await supabase.from("ministries").insert({
    name: get("name"),
    description: get("description"),
    created_by: user?.id ?? null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/ministries");
}
