import { createClient } from "@/lib/supabase/server";
import { requireRole, FINANCE } from "@/lib/supabase/roles";
import { toCsv } from "@/lib/csv";

export async function GET() {
  await requireRole(FINANCE); // redirects non-finance callers

  const supabase = createClient();
  const { data } = await supabase
    .from("giving")
    .select("given_on, amount, fund, method, reference, note")
    .order("given_on", { ascending: false });

  const csv = toCsv(
    ["Date", "Amount", "Fund", "Method", "Reference", "Note"],
    (data ?? []).map((g) => [g.given_on, g.amount, g.fund, g.method, g.reference, g.note])
  );

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="giving-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
