import { createClient } from "@/lib/supabase/server";
import { requireProfile, EDITORS } from "@/lib/supabase/roles";
import { PageHeading, Table, Card, Field, SubmitButton, EmptyState } from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";
import { recordAttendance } from "./actions";
import { programmes } from "@/content";

export default async function AttendancePage() {
  const profile = await requireProfile();
  const canEdit = EDITORS.includes(profile.role);
  const supabase = createClient();

  const { data: rows } = await supabase
    .from("attendance")
    .select("id, service_date, service_name, head_count, first_timers")
    .order("service_date", { ascending: false })
    .limit(100);

  return (
    <>
      <PageHeading title="Attendance" subtitle="Weekly headcounts per service." />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          {rows && rows.length > 0 ? (
            <Table head={["Date", "Service", "Present", "First-timers", canEdit ? "" : "​"]}>
              {rows.map((r) => (
                <tr key={r.id} className="font-body text-sm text-abundance-night/80">
                  <td className="px-4 py-3">{r.service_date}</td>
                  <td className="px-4 py-3 font-medium text-abundance-blue">{r.service_name}</td>
                  <td className="px-4 py-3">{r.head_count}</td>
                  <td className="px-4 py-3">{r.first_timers}</td>
                  <td className="px-4 py-3 text-right">
                    {canEdit && (
                      <DeleteButton table="attendance" id={r.id} label={`${r.service_name} ${r.service_date}`} />
                    )}
                  </td>
                </tr>
              ))}
            </Table>
          ) : (
            <EmptyState>No attendance recorded yet.</EmptyState>
          )}
        </div>

        {canEdit && (
          <Card>
            <h2 className="mb-4 font-display text-lg font-semibold text-abundance-blue">Record</h2>
            <form action={recordAttendance} className="space-y-3">
              <Field label="Date" name="service_date" type="date" required />
              <Field
                label="Service"
                name="service_name"
                as="select"
                defaultValue={programmes[0].title}
                options={programmes.map((p) => ({ value: p.title, label: p.title }))}
              />
              <Field label="Present" name="head_count" type="number" required />
              <Field label="First-timers" name="first_timers" type="number" defaultValue={0} />
              <SubmitButton>Record</SubmitButton>
            </form>
          </Card>
        )}
      </div>
    </>
  );
}
