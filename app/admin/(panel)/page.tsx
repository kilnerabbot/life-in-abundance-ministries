import { createClient } from "@/lib/supabase/server";
import { requireProfile, FINANCE } from "@/lib/supabase/roles";
import { PageHeading, StatCard, Card } from "@/components/admin/ui";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { denied?: string };
}) {
  const profile = await requireProfile();
  const supabase = createClient();

  // count-only queries (head:true) — cheap, RLS-filtered.
  const [{ count: members }, { count: events }, { count: visitors }, { count: prayers }] =
    await Promise.all([
      supabase.from("members").select("*", { count: "exact", head: true }),
      supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .gte("starts_at", new Date().toISOString()),
      supabase
        .from("visitors")
        .select("*", { count: "exact", head: true })
        .neq("status", "closed"),
      supabase
        .from("prayer_requests")
        .select("*", { count: "exact", head: true })
        .neq("status", "completed"),
    ]);

  const canSeeGiving = FINANCE.includes(profile.role);
  let givingThisMonth = 0;
  if (canSeeGiving) {
    const first = new Date();
    first.setDate(1);
    const { data } = await supabase
      .from("giving")
      .select("amount")
      .gte("given_on", first.toISOString().slice(0, 10));
    givingThisMonth = (data ?? []).reduce((s, r) => s + Number(r.amount), 0);
  }

  const { data: lastAtt } = await supabase
    .from("attendance")
    .select("service_name, head_count, service_date")
    .order("service_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <>
      <PageHeading
        title={`Welcome, ${profile.full_name || "friend"}`}
        subtitle="Overview of your church at a glance."
      />

      {searchParams.denied && (
        <div className="mb-6 rounded-lg bg-amber-50 px-4 py-3 font-body text-sm text-amber-800">
          You do not have access to that section.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Members" value={members ?? 0} />
        <StatCard label="Open Visitors" value={visitors ?? 0} />
        <StatCard label="Prayer Requests" value={prayers ?? 0} />
        <StatCard label="Upcoming Events" value={events ?? 0} />
        {canSeeGiving && (
          <StatCard
            label="Giving This Month"
            value={`R ${givingThisMonth.toLocaleString("en-ZA")}`}
          />
        )}
        <StatCard label="Last Attendance" value={lastAtt ? lastAtt.head_count : "—"} />
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="font-display text-xl font-semibold text-abundance-blue">Getting started</h2>
          <ul className="mt-3 space-y-2 font-body text-sm text-abundance-night/70">
            <li>• Add your congregation under <strong>Members</strong>.</li>
            <li>• Record weekly headcounts under <strong>Attendance</strong>.</li>
            <li>• Log tithes and offerings under <strong>Giving</strong> (finance roles).</li>
            <li>• Publish services and gatherings under <strong>Events</strong>.</li>
            <li>• Edit the public website copy under <strong>Site Content</strong>.</li>
          </ul>
        </Card>
      </div>
    </>
  );
}
