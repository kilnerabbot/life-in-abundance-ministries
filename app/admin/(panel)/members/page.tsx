import { createClient } from "@/lib/supabase/server";
import { requireProfile, EDITORS } from "@/lib/supabase/roles";
import { PageHeading, Table, Card, Field, SubmitButton, EmptyState } from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";
import { createMember } from "./actions";

export default async function MembersPage() {
  const profile = await requireProfile();
  const canEdit = EDITORS.includes(profile.role);
  const supabase = createClient();

  const { data: members } = await supabase
    .from("members")
    .select("id, first_name, last_name, phone, email, status, joined_on")
    .order("last_name");

  return (
    <>
      <PageHeading
        title="Members"
        subtitle="Your congregation directory."
        action={
          <a
            href="/admin/members/export"
            className="rounded-lg border border-brand-200 px-4 py-2 font-body text-sm font-semibold text-abundance-blue transition-colors hover:bg-brand-50"
          >
            Export CSV
          </a>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          {members && members.length > 0 ? (
            <Table head={["Name", "Phone", "Status", "Joined", canEdit ? "" : "​"]}>
              {members.map((m) => (
                <tr key={m.id} className="font-body text-sm text-abundance-night/80">
                  <td className="px-4 py-3 font-medium text-abundance-blue">
                    {m.first_name} {m.last_name}
                  </td>
                  <td className="px-4 py-3">{m.phone || "—"}</td>
                  <td className="px-4 py-3 capitalize">{m.status}</td>
                  <td className="px-4 py-3">{m.joined_on || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    {canEdit && (
                      <DeleteButton table="members" id={m.id} label={`${m.first_name} ${m.last_name}`} />
                    )}
                  </td>
                </tr>
              ))}
            </Table>
          ) : (
            <EmptyState>No members yet. Add your first on the right.</EmptyState>
          )}
        </div>

        {canEdit && (
          <Card>
            <h2 className="mb-4 font-display text-lg font-semibold text-abundance-blue">Add member</h2>
            <form action={createMember} className="space-y-3">
              <Field label="First name" name="first_name" required />
              <Field label="Last name" name="last_name" required />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Email" name="email" type="email" />
              <Field
                label="Status"
                name="status"
                as="select"
                defaultValue="new"
                options={[
                  { value: "new", label: "New" },
                  { value: "active", label: "Active" },
                  { value: "visitor", label: "Visitor" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />
              <Field label="Joined on" name="joined_on" type="date" />
              <SubmitButton>Add member</SubmitButton>
            </form>
          </Card>
        )}
      </div>
    </>
  );
}
