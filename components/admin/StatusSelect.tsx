"use client";

import { useRef } from "react";

/**
 * Inline status dropdown that submits its form the moment the value changes.
 * `action` is a server action; the row id + new status post to it.
 */
export default function StatusSelect({
  action,
  id,
  current,
  options,
}: {
  action: (formData: FormData) => void;
  id: string;
  current: string;
  options: { value: string; label: string }[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form action={action} ref={formRef}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={current}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded-lg border border-brand-200 bg-white px-2 py-1 font-body text-xs capitalize text-abundance-night outline-none focus:border-abundance-blue"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </form>
  );
}
