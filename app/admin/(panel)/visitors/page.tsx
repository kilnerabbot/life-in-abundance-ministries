import { createClient } from "@/lib/supabase/server";
import { requireProfile, EDITORS } from "@/lib/supabase/roles";
import { PageHeading, Table, Card, Field, SubmitButton, EmptyState } from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";
import StatusSelect from "@/components/admin/StatusSelect";
import { createVisitor, setVisitorStatus } from "./actions";

const STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "visited", label: "Visited" },
  { value: "returning", label: "Returning" },
  { value: "joined", label: "Joined" },
  { value: "closed", label: "Closed" },
];

export default async function VisitorsPage() {
  const profile = await requireProfile();
  const canEdit = EDITORS.includes(profile.role);
  const supabase = createClient();

  const { data: visitors } = await supabase
    .from("visitors")
    .select("id, first_name, last_name, phone, source, first_visit, status")
    .order("first_visit", { ascending: false });

  return (
    <>
      <PageHeading title="Visitors" subtitle="First-time guests and their follow-up journey." />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          {visitors && visitors.length > 0 ? (
            <Table head={["Name", "Phone", "First visit", "Source", "Status", ""]}>
              {visitors.map((v) => (
                <tr key={v.id} className="font-body text-sm text-abundance-night/80">
                  <td className="px-4 py-3 font-medium text-abundance-blue">
                    {v.first_name} {v.last_name}
                  </td>
                  <td className="px-4 py-3">{v.phone || "—"}</td>
                  <td className="px-4 py-3">{v.first_visit}</td>
                  <td className="px-4 py-3">{v.source || "—"}</td>
                  <td className="px-4 py-3">
                    {canEdit ? (
                      <StatusSelect action={setVisitorStatus} id={v.id} current={v.status} options={STATUSES} />
                    ) : (
                      <span className="capitalize">{v.status}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {canEdit && (
                      <DeleteButton table="visitors" id={v.id} label={`${v.first_name} ${v.last_name || ""}`} />
                    )}
                  </td>
                </tr>
              ))}
            </Table>
          ) : (
            <EmptyState>No visitors yet. Add one, or connect the public visitor form.</EmptyState>
          )}
        </div>

        {canEdit && (
          <Card>
            <h2 className="mb-4 font-display text-lg font-semibold text-abundance-blue">Add visitor</h2>
            <form action={createVisitor} className="space-y-3">
              <Field label="First name" name="first_name" required />
              <Field label="Last name" name="last_name" />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Email" name="email" type="email" />
              <Field label="First visit" name="first_visit" type="date" />
              <Field label="How they found us" name="source" placeholder="Friend, social media…" />
              <SubmitButton>Add visitor</SubmitButton>
            </form>
          </Card>
        )}
      </div>
    </>
  );
}
