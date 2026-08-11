import "server-only";
import { createServiceClient } from "@/lib/supabase/admin";

export type PublicEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  starts_at: string;
  ends_at: string | null;
};

/**
 * Upcoming published events for the public site. Returns [] when the DB is not
 * configured or errors — the public site must never break on a data-layer
 * hiccup. Cached briefly so the marketing pages stay fast.
 */
export async function getPublishedEvents(limit = 6): Promise<PublicEvent[]> {
  const supabase = createServiceClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("events")
      .select("id, title, description, location, starts_at, ends_at")
      .eq("published", true)
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(limit);
    if (error) return [];
    return (data ?? []) as PublicEvent[];
  } catch {
    return [];
  }
}

/**
 * CMS text override. Looks up a published cms_content row by key and returns
 * its `data.text`; falls back to the compiled value from content.ts when the
 * DB is unconfigured, the row is missing/unpublished, or anything errors.
 * This lets the CMS drive public copy without ever risking a blank page.
 */
export type GalleryImage = { id: string; url: string; caption: string | null };

/** Published gallery images for the public About page. [] when unset/errored. */
export async function getGallery(limit = 24): Promise<GalleryImage[]> {
  const supabase = createServiceClient();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("id, url, caption")
      .eq("published", true)
      .order("sort_order")
      .limit(limit);
    if (error) return [];
    return (data ?? []) as GalleryImage[];
  } catch {
    return [];
  }
}

/**
 * Uploaded image URL for a CMS image slot (e.g. "home.missionImage"), or null
 * when unset/empty/errored — callers fall back to their built-in SVG art.
 */
export async function getImage(key: string): Promise<string | null> {
  const supabase = createServiceClient();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("cms_content")
      .select("data, published")
      .eq("key", key)
      .maybeSingle();
    if (error || !data || !data.published) return null;
    const url = (data.data as { url?: string } | null)?.url;
    return typeof url === "string" && url.trim() ? url : null;
  } catch {
    return null;
  }
}

export async function getText(key: string, fallback: string): Promise<string> {
  const supabase = createServiceClient();
  if (!supabase) return fallback;

  try {
    const { data, error } = await supabase
      .from("cms_content")
      .select("data, published")
      .eq("key", key)
      .maybeSingle();
    if (error || !data || !data.published) return fallback;
    const text = (data.data as { text?: string } | null)?.text;
    return typeof text === "string" && text.trim() ? text : fallback;
  } catch {
    return fallback;
  }
}
