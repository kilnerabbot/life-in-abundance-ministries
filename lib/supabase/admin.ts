import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — SERVER ONLY. The `server-only` import makes
 * the build fail if this is ever pulled into a client bundle, keeping the
 * secret key off the browser.
 *
 * Used to read *published* CMS/event content for the public website, bypassing
 * RLS (the public site has no signed-in user). Returns null when env is not
 * configured so public pages fall back to static content instead of crashing.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
