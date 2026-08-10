"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function recordAttendance(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("attendance").insert({
    service_date: formData.get("service_date"),
    service_name: (formData.get("service_name") as string).trim(),
    head_count: Number(formData.get("head_count")),
    first_timers: Number(formData.get("first_timers") || 0),
    note: (formData.get("note") as string)?.trim() || null,
    created_by: user?.id ?? null,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/attendance");
}
