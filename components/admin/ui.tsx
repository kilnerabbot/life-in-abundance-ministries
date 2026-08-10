import type { ReactNode } from "react";

export function PageHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-semibold text-abundance-blue">{title}</h1>
        {subtitle && <p className="mt-1 font-body text-sm text-abundance-night/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-soft ring-1 ring-brand-100 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value }: { label: string; value: ReactNode }) {
  return (
    <Card>
      <p className="font-body text-xs font-semibold uppercase tracking-widest text-abundance-night/50">
        {label}
      </p>
      <p className="mt-2 font-display text-4xl font-semibold text-abundance-blue">{value}</p>
    </Card>
  );
}

export function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  as,
  options,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
  as?: "textarea" | "select";
  options?: { value: string; label: string }[];
}) {
  const cls =
    "mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 font-body text-sm text-abundance-night outline-none focus:border-abundance-blue focus:ring-2 focus:ring-abundance-blue/20";
  return (
    <label className="block">
      <span className="font-body text-sm font-medium text-abundance-night/80">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} required={required} defaultValue={defaultValue} placeholder={placeholder} rows={3} className={cls} />
      ) : as === "select" ? (
        <select name={name} required={required} defaultValue={defaultValue} className={cls}>
          {options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input name={name} type={type} required={required} defaultValue={defaultValue} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-lg bg-abundance-blue px-4 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-brand-600"
    >
      {children}
    </button>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-200 bg-sand-50 p-10 text-center font-body text-sm text-abundance-night/60">
      {children}
    </div>
  );
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-soft ring-1 ring-brand-100">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-brand-100">
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-wider text-abundance-night/50"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-50">{children}</tbody>
      </table>
    </div>
  );
}
