# Admin / CMS / Church Management — Architecture

Phase 1 foundation for the Life in Abundance Ministries admin. Built on
Supabase (Postgres + Auth + Row-Level Security) inside the existing Next.js 14
app.

## Roles

| Role | CMS | Members | Giving | Attendance | Events |
|------|-----|---------|--------|-----------|--------|
| **pastor** | edit | edit | edit | edit | edit |
| **admin** | edit | edit | edit | edit | edit |
| **finance** | — | read | edit | read | read |
| **viewer** | — | read | — | read | read |

Enforcement is in the database via RLS (`supabase/migrations/0001_init.sql`),
not just the UI. `lib/supabase/roles.ts` mirrors the rules for fast redirects
and role-aware navigation.

## Layout separation

- `app/layout.tsx` — root: html/body/fonts only.
- `app/(site)/` — public website (Nav, Footer, church SEO + JSON-LD).
- `app/admin/` — admin, `noindex`. `login` is bare; `(panel)/` is the gated shell.
- `middleware.ts` — refreshes the session and guards `/admin`. Inert until env is set.

## Setup

1. Create a Supabase project.
2. Run `supabase/migrations/0001_init.sql` in the SQL editor.
3. Copy `.env.example` → `.env.local`, fill the two `NEXT_PUBLIC_SUPABASE_*` values.
   On Vercel, add them under Project → Settings → Environment Variables.
4. Create the first user: Supabase → Authentication → Add user (email + password).
5. Promote them: in the SQL editor —
   ```sql
   update public.profiles set role = 'pastor' where id =
     (select id from auth.users where email = 'you@example.com');
   ```
6. Visit `/admin/login`.

## Seeding the CMS (makes public copy editable)

Insert rows into `cms_content` keyed by section. Example:

```sql
insert into public.cms_content (key, section, data, sort_order) values
  ('mission.statement', 'mission',
   '{"text":"To Cause People to See, Experience and Walk on the Abundant Life..."}', 0);
```

The public site still reads `content.ts` today. Phase 2 wires published
`cms_content` rows into the public pages via a server-only service-role client
(`SUPABASE_SERVICE_ROLE_KEY`) so RLS is bypassed for read-only published content.

## Phasing

- **Phase 1 (done):** schema + RLS, auth, role-aware admin shell, dashboard,
  and CRUD for Members, Giving, Attendance, Events, plus a raw CMS editor.
- **Phase 2:** wire published CMS + Events into the public site; member ↔ giving
  linking UI; edit/delete rows; CSV export; attendance charts.
- **Phase 3:** giving statements, member households, groups, bulk messaging.
