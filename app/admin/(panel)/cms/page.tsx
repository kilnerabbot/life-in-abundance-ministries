import { createClient } from "@/lib/supabase/server";
import { requireRole, EDITORS } from "@/lib/supabase/roles";
import { PageHeading, Card, SubmitButton, EmptyState } from "@/components/admin/ui";
import { saveContent } from "./actions";

export default async function CmsPage() {
  await requireRole(EDITORS);
  const supabase = createClient();

  const { data: rows } = await supabase
    .from("cms_content")
    .select("id, key, section, data, published")
    .order("section")
    .order("sort_order");

  return (
    <>
      <PageHeading
        title="Site Content"
        subtitle="Edit the words on your public website. Changes publish immediately."
      />

      {!rows || rows.length === 0 ? (
        <EmptyState>
          No content rows yet. Seed the <code>cms_content</code> table (see{" "}
          <code>docs/admin-architecture.md</code>) to make the public copy editable here.
        </EmptyState>
      ) : (
        <div className="space-y-5">
          {rows.map((row) => (
            <Card key={row.id}>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="font-display text-lg font-semibold text-abundance-blue">{row.key}</p>
                  <p className="font-body text-xs uppercase tracking-widest text-abundance-night/40">
                    {row.section}
                  </p>
                </div>
              </div>
              <form action={saveContent} className="space-y-3">
                <input type="hidden" name="id" value={row.id} />
                <textarea
                  name="data"
                  rows={5}
                  defaultValue={JSON.stringify(row.data, null, 2)}
                  className="w-full rounded-lg border border-brand-200 px-3 py-2 font-mono text-xs text-abundance-night outline-none focus:border-abundance-blue focus:ring-2 focus:ring-abundance-blue/20"
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 font-body text-sm text-abundance-night/80">
                    <input type="checkbox" name="published" defaultChecked={row.published} className="h-4 w-4" />
                    Published
                  </label>
                  <SubmitButton>Save</SubmitButton>
                </div>
              </form>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
