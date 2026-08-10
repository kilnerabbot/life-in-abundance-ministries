"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type State = "idle" | "sending" | "done" | "error";

const inputCls =
  "mt-1 w-full rounded-lg border border-brand-200 bg-white px-3 py-2.5 font-body text-sm text-abundance-night outline-none focus:border-abundance-blue focus:ring-2 focus:ring-abundance-blue/20";

// Shared honeypot: a hidden field bots fill and humans never see. If it has a
// value we silently drop the submission.
function isBot(form: HTMLFormElement) {
  return Boolean((form.elements.namedItem("company") as HTMLInputElement)?.value);
}

function Honeypot() {
  return (
    <div aria-hidden className="hidden">
      <label>
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function PrayerForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (isBot(form)) return;
    const fd = new FormData(form);
    const request = (fd.get("request") as string).trim();
    const name = (fd.get("name") as string).trim();
    if (!name || request.length < 3) return;

    setState("sending");
    const { error } = await createClient()
      .from("prayer_requests")
      .insert({
        name,
        email: (fd.get("email") as string).trim() || null,
        phone: (fd.get("phone") as string).trim() || null,
        request,
      });
    setState(error ? "error" : "done");
    if (!error) form.reset();
  }

  if (state === "done")
    return (
      <p className="rounded-xl bg-leaf-100 px-5 py-4 font-body text-sm text-leaf-700">
        Thank you. Our team has received your prayer request and will be praying with you.
      </p>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Honeypot />
      <label className="block">
        <span className="font-body text-sm font-medium text-abundance-night/80">Your name</span>
        <input name="name" required className={inputCls} />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="font-body text-sm font-medium text-abundance-night/80">Phone</span>
          <input name="phone" type="tel" className={inputCls} />
        </label>
        <label className="block">
          <span className="font-body text-sm font-medium text-abundance-night/80">Email</span>
          <input name="email" type="email" className={inputCls} />
        </label>
      </div>
      <label className="block">
        <span className="font-body text-sm font-medium text-abundance-night/80">Your prayer request</span>
        <textarea name="request" required rows={4} className={inputCls} />
      </label>
      {state === "error" && (
        <p role="alert" className="font-body text-sm text-red-600">
          Something went wrong. Please try again or call us.
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-full bg-abundance-leaf px-7 py-3 font-body text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send prayer request"}
      </button>
    </form>
  );
}

export function VisitorForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (isBot(form)) return;
    const fd = new FormData(form);
    const first_name = (fd.get("first_name") as string).trim();
    if (!first_name) return;

    setState("sending");
    const { error } = await createClient()
      .from("visitors")
      .insert({
        first_name,
        last_name: (fd.get("last_name") as string).trim() || null,
        email: (fd.get("email") as string).trim() || null,
        phone: (fd.get("phone") as string).trim() || null,
        source: (fd.get("source") as string).trim() || null,
      });
    setState(error ? "error" : "done");
    if (!error) form.reset();
  }

  if (state === "done")
    return (
      <p className="rounded-xl bg-leaf-100 px-5 py-4 font-body text-sm text-leaf-700">
        Wonderful — we can&rsquo;t wait to meet you. Someone from our team will be in touch soon.
      </p>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Honeypot />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="font-body text-sm font-medium text-abundance-night/80">First name</span>
          <input name="first_name" required className={inputCls} />
        </label>
        <label className="block">
          <span className="font-body text-sm font-medium text-abundance-night/80">Last name</span>
          <input name="last_name" className={inputCls} />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="font-body text-sm font-medium text-abundance-night/80">Phone</span>
          <input name="phone" type="tel" className={inputCls} />
        </label>
        <label className="block">
          <span className="font-body text-sm font-medium text-abundance-night/80">Email</span>
          <input name="email" type="email" className={inputCls} />
        </label>
      </div>
      <label className="block">
        <span className="font-body text-sm font-medium text-abundance-night/80">How did you hear about us?</span>
        <input name="source" placeholder="A friend, social media…" className={inputCls} />
      </label>
      {state === "error" && (
        <p role="alert" className="font-body text-sm text-red-600">
          Something went wrong. Please try again or call us.
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-full bg-abundance-blue px-7 py-3 font-body text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Plan my visit"}
      </button>
    </form>
  );
}
