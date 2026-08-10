import Sidebar from "@/components/admin/Sidebar";
import { requireProfile } from "@/lib/supabase/roles";

// Every page under (panel) is gated here: requireProfile redirects to
// /admin/login when there is no valid session. RLS is the real enforcement;
// this provides fast redirects and the role for the sidebar.
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireProfile();

  return (
    <div className="flex min-h-screen">
      <Sidebar role={profile.role} name={profile.full_name} />
      <div className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">{children}</div>
      </div>
    </div>
  );
}
