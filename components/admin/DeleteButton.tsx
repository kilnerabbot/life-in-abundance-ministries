"use client";

import { deleteRow } from "@/app/admin/(panel)/actions";

/**
 * Delete control. Submits to the guarded server action, but asks for native
 * confirmation first so a stray click can't wipe a record.
 */
export default function DeleteButton({
  table,
  id,
  label = "this record",
}: {
  table: string;
  id: string;
  label?: string;
}) {
  return (
    <form
      action={deleteRow}
      onSubmit={(e) => {
        if (!confirm(`Delete ${label}? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="table" value={table} />
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="font-body text-xs font-semibold text-red-600 hover:underline"
      >
        Delete
      </button>
    </form>
  );
}
