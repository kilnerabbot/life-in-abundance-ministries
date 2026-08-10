-- Church Manager expansion — visitors, ministries, prayer requests, audit log.
-- Extends 0001_init.sql. Reuses its helpers: current_role(), is_staff(),
-- can_write(). Run after 0001.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type visitor_status as enum ('new', 'contacted', 'visited', 'returning', 'joined', 'closed');
create type prayer_status  as enum ('new', 'assigned', 'praying', 'follow_up', 'completed');

-- ---------------------------------------------------------------------------
-- Ministries
-- ---------------------------------------------------------------------------
create table public.ministries (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text,
  leader_id    uuid references public.members(id) on delete set null,
  active       boolean not null default true,
  created_at   timestamptz not null default now(),
  created_by   uuid references public.profiles(id)
);
alter table public.ministries enable row level security;
create policy "ministries readable by staff"
  on public.ministries for select using (public.is_staff());
create policy "ministries writable by editors"
  on public.ministries for all using (public.can_write());

-- ---------------------------------------------------------------------------
-- Visitors — fed by the public visitor form or manual entry.
-- ---------------------------------------------------------------------------
create table public.visitors (
  id             uuid primary key default gen_random_uuid(),
  first_name     text not null,
  last_name      text,
  email          text,
  phone          text,
  first_visit    date not null default current_date,
  source         text,                       -- how they found the church
  status         visitor_status not null default 'new',
  assigned_to    uuid references public.profiles(id) on delete set null,
  notes          text,
  created_at     timestamptz not null default now(),
  created_by     uuid references public.profiles(id)
);
alter table public.visitors enable row level security;
create policy "visitors readable by staff"
  on public.visitors for select using (public.is_staff());
create policy "visitors writable by editors"
  on public.visitors for all using (public.can_write());

-- ---------------------------------------------------------------------------
-- Prayer requests — the public site's prayer form inserts here (anon INSERT),
-- but only staff may read/manage. No public SELECT.
-- ---------------------------------------------------------------------------
create table public.prayer_requests (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  email          text,
  phone          text,
  request        text not null,
  is_public      boolean not null default false,
  status         prayer_status not null default 'new',
  assigned_to    uuid references public.profiles(id) on delete set null,
  internal_notes text,
  created_at     timestamptz not null default now()
);
alter table public.prayer_requests enable row level security;

-- Anyone (the public form, using the anon key) may submit a request…
create policy "anyone can submit a prayer request"
  on public.prayer_requests for insert with check (true);
-- …but only staff can read them, and only editors can update/delete.
create policy "prayer readable by staff"
  on public.prayer_requests for select using (public.is_staff());
create policy "prayer writable by editors"
  on public.prayer_requests for update using (public.can_write());
create policy "prayer deletable by editors"
  on public.prayer_requests for delete using (public.can_write());

-- ---------------------------------------------------------------------------
-- Audit log — sensitive actions. App writes rows; staff may read.
-- ---------------------------------------------------------------------------
create table public.audit_log (
  id           bigint generated always as identity primary key,
  actor_id     uuid references public.profiles(id) on delete set null,
  actor_name   text,
  action       text not null,               -- 'create' | 'update' | 'delete' | 'view'
  module       text not null,               -- 'members' | 'giving' | ...
  record_id    text,
  detail       text,
  created_at   timestamptz not null default now()
);
alter table public.audit_log enable row level security;
create policy "audit readable by admins"
  on public.audit_log for select using (public.current_role() in ('pastor','admin'));
create policy "audit insert by staff"
  on public.audit_log for insert with check (public.is_staff());

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index on public.visitors (status);
create index on public.prayer_requests (status, created_at);
create index on public.audit_log (created_at);
create index on public.ministries (active);
