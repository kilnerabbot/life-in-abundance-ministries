import { Reveal } from "./Motion";
import { programmes, mission, site, contact } from "@/content";

/**
 * Signboard motif lifted from the church's physical banner: a blue field with
 * the mission statement panel, then day / service / time rows in green and
 * white. Rows collapse into stacked cards on small screens.
 */
export default function ProgrammeBoard({ withMission = true }: { withMission?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-abundance-blue shadow-2xl ring-1 ring-abundance-blue/20">
      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-8">
        {withMission && (
          <Reveal className="flex">
            <p className="rounded-xl bg-white/95 p-5 font-body text-sm font-semibold leading-snug text-abundance-blue">
              {mission.statement}
            </p>
          </Reveal>
        )}

        <div className={withMission ? "" : "lg:col-span-2"}>
          <p className="mb-4 text-center font-body text-xs font-bold uppercase tracking-[0.35em] text-abundance-leaf">
            Programmes
          </p>

          <ul className="space-y-3">
            {programmes.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.08}>
                <div className="grid gap-2 sm:grid-cols-[9.5rem_minmax(0,1fr)_11rem] sm:gap-3">
                  <span className="flex items-center justify-center rounded-lg bg-abundance-leaf px-4 py-3 font-body text-sm font-extrabold uppercase tracking-wider text-white">
                    {p.day}
                  </span>
                  <span className="flex items-center justify-center rounded-lg bg-white px-4 py-3 text-center font-display text-lg font-semibold text-abundance-blue sm:justify-start sm:text-left">
                    {p.title}
                  </span>
                  <span className="flex items-center justify-center rounded-lg bg-abundance-leaf px-4 py-3 font-body text-sm font-bold tracking-wide text-white">
                    {p.time}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 bg-white/95 px-6 py-4 text-center">
        <p className="font-display text-base font-semibold uppercase tracking-wide text-abundance-blue sm:text-lg">
          {contact.invitation}
        </p>
        <p className="mt-1 font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-abundance-green">
          {site.tagline}
        </p>
      </div>
    </div>
  );
}
