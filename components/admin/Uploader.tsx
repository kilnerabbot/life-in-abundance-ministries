"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Uploads an image to the public `media` bucket, then writes the resulting
 * public URL into a hidden input named `name` so the surrounding <form> can
 * post it to a server action. Shows a thumbnail preview once uploaded.
 */
export default function Uploader({
  name,
  folder = "gallery",
  initialUrl = "",
}: {
  name: string;
  folder?: string;
  initialUrl?: string;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);

    const safe = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const path = `${folder}/${Date.now()}-${safe}`;
    const supabase = createClient();

    const { error: upErr } = await supabase.storage
      .from("media")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (upErr) {
      setError(upErr.message);
      setBusy(false);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setUrl(data.publicUrl);
    setBusy(false);
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {url && (
        <img
          src={url}
          alt="Preview"
          className="mb-2 h-28 w-full rounded-lg object-cover ring-1 ring-brand-100"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="block w-full font-body text-sm text-abundance-night/70 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:font-body file:text-sm file:font-semibold file:text-abundance-blue hover:file:bg-brand-100"
      />
      {busy && <p className="mt-1 font-body text-xs text-abundance-night/50">Uploading…</p>}
      {error && <p className="mt-1 font-body text-xs text-red-600">{error}</p>}
    </div>
  );
}
