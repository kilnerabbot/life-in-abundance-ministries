"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addGalleryImage(formData: FormData) {
  const url = (formData.get("url") as string)?.trim();
  if (!url) throw new Error("Upload an image first");

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("gallery").insert({
    url,
    caption: (formData.get("caption") as string)?.trim() || null,
    sort_order: Number(formData.get("sort_order") || 0),
    created_by: user?.id ?? null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/media");
  revalidatePath("/about");
}

/** Set an image slot's URL (e.g. home.missionImage) from an upload. */
export async function setImageSlot(formData: FormData) {
  const key = formData.get("key") as string;
  const url = (formData.get("url") as string)?.trim() ?? "";

  const supabase = createClient();
  const { error } = await supabase
    .from("cms_content")
    .update({ data: { url }, updated_at: new Date().toISOString() })
    .eq("key", key);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/media");
  revalidatePath("/");
}
