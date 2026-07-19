import { give } from "@/content";

const ROWS: [string, string][] = [
  ["Bank", give.bank.bankName],
  ["Account Name", give.bank.accountName],
  ["Account No", give.bank.accountNumber],
  ["Branch Code", give.bank.branchCode],
];

export default function Give() {
  const whatsappHref = `https://wa.me/${give.whatsappNumber}?text=${encodeURIComponent(give.whatsappMessage)}`;

  return (
    <section id="give" aria-labelledby="give-heading" className="bg-abundance-offwhite py-24">
      <div className="container-px mx-auto max-w-xl text-center">
        <h2 id="give-heading" className="font-display text-4xl font-semibold text-abundance-blue">
          {give.heading}
        </h2>
        <p className="mt-4 font-body text-abundance-night/80">{give.intro}</p>

        <dl className="mt-10 divide-y divide-abundance-blue/10 rounded-xl bg-white p-6 text-left shadow-md">
          {ROWS.map(([label, value]) => (
            <div key={label} className="flex justify-between py-3 first:pt-0 last:pb-0">
              <dt className="font-body text-sm font-medium text-abundance-night/60">{label}</dt>
              <dd className="font-body text-sm font-semibold text-abundance-blue">{value}</dd>
            </div>
          ))}
        </dl>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-abundance-leaf px-8 py-3 font-body text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
        >
          Confirm your giving on WhatsApp
        </a>
      </div>
    </section>
  );
}
