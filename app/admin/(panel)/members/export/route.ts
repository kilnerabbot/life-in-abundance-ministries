import { createClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/supabase/roles";
import { toCsv } from "@/lib/csv";

export async function GET() {
  await requireProfile(); // any signed-in staff; RLS still filters rows

  const supabase = createClient();
  const { data } = await supabase
    .from("members")
    .select("first_name, last_name, phone, email, address, status, joined_on")
    .order("last_name");

  const csv = toCsv(
    ["First name", "Last name", "Phone", "Email", "Address", "Status", "Joined"],
    (data ?? []).map((m) => [
      m.first_name,
      m.last_name,
      m.phone,
      m.email,
      m.address,
      m.status,
      m.joined_on,
    ])
  );

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="members-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
