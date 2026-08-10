import { createClient } from "@/lib/supabase/server";
import { requireProfile, EDITORS } from "@/lib/supabase/roles";
import { PageHeading, Table, Card, Field, SubmitButton, EmptyState } from "@/components/admin/ui";
import { createEvent } from "./actions";

export default async function EventsPage() {
  const profile = await requireProfile();
  const canEdit = EDITORS.includes(profile.role);
  const supabase = createClient();

  const { data: events } = await supabase
    .from("events")
    .select("id, title, location, starts_at, published")
    .order("starts_at", { ascending: false })
    .limit(100);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString("en-ZA", { dateStyle: "medium", timeStyle: "short" });

  return (
    <>
      <PageHeading title="Events" subtitle="Church calendar. Published events can appear on the public site." />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          {events && events.length > 0 ? (
            <Table head={["Event", "When", "Location", "Status"]}>
              {events.map((e) => (
                <tr key={e.id} className="font-body text-sm text-abundance-night/80">
                  <td className="px-4 py-3 font-medium text-abundance-blue">{e.title}</td>
                  <td className="px-4 py-3">{fmt(e.starts_at)}</td>
                  <td className="px-4 py-3">{e.location || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        e.published ? "bg-leaf-100 text-leaf-700" : "bg-sand-200 text-abundance-night/60"
                      }`}
                    >
                      {e.published ? "Published" : "Draft"}
                    </span>
                  </td>
                </tr>
              ))}
            </Table>
          ) : (
            <EmptyState>No events yet.</EmptyState>
          )}
        </div>

        {canEdit && (
          <Card>
            <h2 className="mb-4 font-display text-lg font-semibold text-abundance-blue">Add event</h2>
            <form action={createEvent} className="space-y-3">
              <Field label="Title" name="title" required />
              <Field label="Starts" name="starts_at" type="datetime-local" required />
              <Field label="Ends" name="ends_at" type="datetime-local" />
              <Field label="Location" name="location" />
              <Field label="Description" name="description" as="textarea" />
              <label className="flex items-center gap-2 font-body text-sm text-abundance-night/80">
                <input type="checkbox" name="published" className="h-4 w-4" />
                Publish to public site
              </label>
              <SubmitButton>Add event</SubmitButton>
            </form>
          </Card>
        )}
      </div>
    </>
  );
}
