"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveContent(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = formData.get("id") as string;
  // The `data` textarea holds JSON. Parse leniently: on invalid JSON, store it
  // as a { text } object so an editor never loses their edit to a syntax slip.
  let data: unknown;
  const raw = (formData.get("data") as string) ?? "";
  try {
    data = JSON.parse(raw);
  } catch {
    data = { text: raw };
  }

  const { error } = await supabase
    .from("cms_content")
    .update({
      data,
      published: formData.get("published") === "on",
      updated_at: new Date().toISOString(),
      updated_by: user?.id ?? null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/cms");
}
