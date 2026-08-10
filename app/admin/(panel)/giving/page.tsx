import { createClient } from "@/lib/supabase/server";
import { requireRole, FINANCE } from "@/lib/supabase/roles";
import { PageHeading, Table, Card, Field, SubmitButton, EmptyState } from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";
import { recordGift } from "./actions";

const FUNDS = [
  { value: "tithe", label: "Tithe" },
  { value: "offering", label: "Offering" },
  { value: "building", label: "Building" },
  { value: "missions", label: "Missions" },
  { value: "other", label: "Other" },
];
const METHODS = [
  { value: "eft", label: "EFT" },
  { value: "cash", label: "Cash" },
  { value: "card", label: "Card" },
  { value: "other", label: "Other" },
];

export default async function GivingPage() {
  await requireRole(FINANCE);
  const supabase = createClient();

  const { data: gifts } = await supabase
    .from("giving")
    .select("id, amount, fund, method, given_on, reference")
    .order("given_on", { ascending: false })
    .limit(100);

  const total = (gifts ?? []).reduce((s, g) => s + Number(g.amount), 0);

  return (
    <>
      <PageHeading
        title="Giving"
        subtitle="Tithes and offerings. Visible to finance roles only."
        action={
          <a
            href="/admin/giving/export"
            className="rounded-lg border border-brand-200 px-4 py-2 font-body text-sm font-semibold text-abundance-blue transition-colors hover:bg-brand-50"
          >
            Export CSV
          </a>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          {gifts && gifts.length > 0 ? (
            <>
              <p className="mb-3 font-body text-sm text-abundance-night/60">
                Showing last {gifts.length} — total{" "}
                <strong className="text-abundance-blue">R {total.toLocaleString("en-ZA")}</strong>
              </p>
              <Table head={["Date", "Amount", "Fund", "Method", "Reference", ""]}>
                {gifts.map((g) => (
                  <tr key={g.id} className="font-body text-sm text-abundance-night/80">
                    <td className="px-4 py-3">{g.given_on}</td>
                    <td className="px-4 py-3 font-semibold text-abundance-blue">
                      R {Number(g.amount).toLocaleString("en-ZA")}
                    </td>
                    <td className="px-4 py-3 capitalize">{g.fund}</td>
                    <td className="px-4 py-3 uppercase">{g.method}</td>
                    <td className="px-4 py-3">{g.reference || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <DeleteButton table="giving" id={g.id} label="this gift" />
                    </td>
                  </tr>
                ))}
              </Table>
            </>
          ) : (
            <EmptyState>No gifts recorded yet.</EmptyState>
          )}
        </div>

        <Card>
          <h2 className="mb-4 font-display text-lg font-semibold text-abundance-blue">Record gift</h2>
          <form action={recordGift} className="space-y-3">
            <Field label="Amount (R)" name="amount" type="number" required />
            <Field label="Fund" name="fund" as="select" defaultValue="offering" options={FUNDS} />
            <Field label="Method" name="method" as="select" defaultValue="eft" options={METHODS} />
            <Field label="Date" name="given_on" type="date" />
            <Field label="Reference" name="reference" />
            <SubmitButton>Record gift</SubmitButton>
          </form>
        </Card>
      </div>
    </>
  );
}
