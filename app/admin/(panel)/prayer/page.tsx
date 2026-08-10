import { createClient } from "@/lib/supabase/server";
import { requireProfile, EDITORS } from "@/lib/supabase/roles";
import { PageHeading, Card, Field, SubmitButton, EmptyState } from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";
import StatusSelect from "@/components/admin/StatusSelect";
import { createPrayer, setPrayerStatus } from "./actions";

const STATUSES = [
  { value: "new", label: "New" },
  { value: "assigned", label: "Assigned" },
  { value: "praying", label: "Being prayed for" },
  { value: "follow_up", label: "Follow-up" },
  { value: "completed", label: "Completed" },
];

export default async function PrayerPage() {
  const profile = await requireProfile();
  const canEdit = EDITORS.includes(profile.role);
  const supabase = createClient();

  const { data: requests } = await supabase
    .from("prayer_requests")
    .select("id, name, phone, request, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeading
        title="Prayer Requests"
        subtitle="Requests from the public prayer form and staff entries."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          {requests && requests.length > 0 ? (
            requests.map((r) => (
              <Card key={r.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold text-abundance-blue">{r.name}</p>
                    <p className="font-body text-xs text-abundance-night/50">
                      {r.phone || "no phone"} · {new Date(r.created_at).toLocaleDateString("en-ZA")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {canEdit ? (
                      <StatusSelect action={setPrayerStatus} id={r.id} current={r.status} options={STATUSES} />
                    ) : (
                      <span className="font-body text-xs capitalize text-abundance-green">{r.status}</span>
                    )}
                    {canEdit && <DeleteButton table="prayer_requests" id={r.id} label="this request" />}
                  </div>
                </div>
                <p className="mt-3 font-body text-sm leading-relaxed text-abundance-night/75">
                  {r.request}
                </p>
              </Card>
            ))
          ) : (
            <EmptyState>No prayer requests yet.</EmptyState>
          )}
        </div>

        {canEdit && (
          <Card>
            <h2 className="mb-4 font-display text-lg font-semibold text-abundance-blue">Add request</h2>
            <form action={createPrayer} className="space-y-3">
              <Field label="Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Email" name="email" type="email" />
              <Field label="Request" name="request" as="textarea" required />
              <SubmitButton>Add request</SubmitButton>
            </form>
          </Card>
        )}
      </div>
    </>
  );
}
