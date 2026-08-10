"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-abundance-night px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-soft-lg">
        <div className="flex flex-col items-center text-center">
          <Logo className="h-14 w-14" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-abundance-blue">
            Admin Sign In
          </h1>
          <p className="mt-1 font-body text-sm text-abundance-night/60">
            Life in Abundance Ministries
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="block font-body text-sm font-medium text-abundance-night/80">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2.5 font-body text-sm text-abundance-night outline-none focus:border-abundance-blue focus:ring-2 focus:ring-abundance-blue/20"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-body text-sm font-medium text-abundance-night/80">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2.5 font-body text-sm text-abundance-night outline-none focus:border-abundance-blue focus:ring-2 focus:ring-abundance-blue/20"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 font-body text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-abundance-blue px-4 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
