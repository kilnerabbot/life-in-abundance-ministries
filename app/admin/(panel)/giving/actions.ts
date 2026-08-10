"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function recordGift(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const get = (k: string) => (formData.get(k) as string)?.trim() || null;

  const { error } = await supabase.from("giving").insert({
    amount: Number(formData.get("amount")),
    fund: get("fund") ?? "offering",
    method: get("method") ?? "eft",
    given_on: get("given_on") ?? new Date().toISOString().slice(0, 10),
    reference: get("reference"),
    note: get("note"),
    created_by: user?.id ?? null,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/giving");
}
