import { createClient } from "@/lib/supabase/server";
import { requireProfile, EDITORS } from "@/lib/supabase/roles";
import { PageHeading, Card, Field, SubmitButton, EmptyState } from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";
import { createMinistry } from "./actions";

export default async function MinistriesPage() {
  const profile = await requireProfile();
  const canEdit = EDITORS.includes(profile.role);
  const supabase = createClient();

  const { data: ministries } = await supabase
    .from("ministries")
    .select("id, name, description, active")
    .order("name");

  return (
    <>
      <PageHeading title="Ministries" subtitle="The areas of ministry in your church." />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          {ministries && ministries.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {ministries.map((m) => (
                <li key={m.id}>
                  <Card>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold text-abundance-blue">
                        {m.name}
                      </h3>
                      {canEdit && <DeleteButton table="ministries" id={m.id} label={m.name} />}
                    </div>
                    {m.description && (
                      <p className="mt-2 font-body text-sm leading-relaxed text-abundance-night/65">
                        {m.description}
                      </p>
                    )}
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>No ministries yet. Add your first on the right.</EmptyState>
          )}
        </div>

        {canEdit && (
          <Card>
            <h2 className="mb-4 font-display text-lg font-semibold text-abundance-blue">Add ministry</h2>
            <form action={createMinistry} className="space-y-3">
              <Field label="Name" name="name" required placeholder="Youth Ministry" />
              <Field label="Description" name="description" as="textarea" />
              <SubmitButton>Add ministry</SubmitButton>
            </form>
          </Card>
        )}
      </div>
    </>
  );
}
