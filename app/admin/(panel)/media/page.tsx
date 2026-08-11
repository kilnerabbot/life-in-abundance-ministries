import { createClient } from "@/lib/supabase/server";
import { requireRole, EDITORS } from "@/lib/supabase/roles";
import { PageHeading, Card, Field, SubmitButton, EmptyState } from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";
import Uploader from "@/components/admin/Uploader";
import { addGalleryImage, setImageSlot } from "./actions";

const SLOT_LABELS: Record<string, string> = {
  "home.missionImage": "Homepage — The Promise image",
  "home.heroImage": "Homepage — Hero image",
  "home.pastorImage": "About — Pastor portrait",
};

export default async function MediaPage() {
  await requireRole(EDITORS);
  const supabase = createClient();

  const [{ data: gallery }, { data: slots }] = await Promise.all([
    supabase.from("gallery").select("id, url, caption, sort_order").order("sort_order"),
    supabase.from("cms_content").select("id, key, data").eq("section", "images").order("sort_order"),
  ]);

  return (
    <>
      <PageHeading title="Media & Gallery" subtitle="Upload images, swap site artwork, manage the About gallery." />

      {/* Site image slots */}
      <h2 className="mb-4 font-display text-xl font-semibold text-abundance-blue">Site images</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {(slots ?? []).map((slot) => (
          <Card key={slot.id}>
            <p className="mb-1 font-display text-base font-semibold text-abundance-blue">
              {SLOT_LABELS[slot.key] ?? slot.key}
            </p>
            <p className="mb-3 font-body text-xs text-abundance-night/50">
              Leave empty to keep the built-in illustration.
            </p>
            <form action={setImageSlot} className="space-y-3">
              <input type="hidden" name="key" value={slot.key} />
              <Uploader name="url" folder="site" initialUrl={(slot.data as { url?: string })?.url ?? ""} />
              <SubmitButton>Save image</SubmitButton>
            </form>
          </Card>
        ))}
      </div>

      {/* Gallery */}
      <h2 className="mb-4 mt-10 font-display text-xl font-semibold text-abundance-blue">About gallery</h2>
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          {gallery && gallery.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {gallery.map((g) => (
                <li key={g.id} className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-brand-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.url} alt={g.caption ?? "Gallery image"} className="aspect-square w-full object-cover" />
                  <div className="flex items-center justify-between gap-2 p-3">
                    <span className="truncate font-body text-xs text-abundance-night/60">{g.caption || "—"}</span>
                    <DeleteButton table="gallery" id={g.id} label="this image" />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>No gallery images yet. Upload one on the right.</EmptyState>
          )}
        </div>

        <Card>
          <h3 className="mb-4 font-display text-lg font-semibold text-abundance-blue">Add to gallery</h3>
          <form action={addGalleryImage} className="space-y-3">
            <Uploader name="url" folder="gallery" />
            <Field label="Caption" name="caption" placeholder="Sunday worship" />
            <Field label="Order" name="sort_order" type="number" defaultValue={0} />
            <SubmitButton>Add image</SubmitButton>
          </form>
        </Card>
      </div>
    </>
  );
}
