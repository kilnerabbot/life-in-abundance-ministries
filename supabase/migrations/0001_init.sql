-- Life in Abundance Ministries — Admin / CMS / ChMS schema
-- Run in the Supabase SQL editor (or `supabase db push`).
--
-- Security model:
--   * Every table has Row-Level Security ENABLED.
--   * Access is decided by the caller's role, stored in public.profiles.role.
--   * Roles: 'pastor' (full), 'admin' (full except role management),
--            'finance' (giving + read members), 'viewer' (read-only).
--   * The anon/public website NEVER reads these tables directly — only the
--     published CMS content is exposed, and only its published rows.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type user_role as enum ('pastor', 'admin', 'finance', 'viewer');
create type member_status as enum ('active', 'inactive', 'visitor', 'new');
create type gift_method as enum ('cash', 'eft', 'card', 'other');
create type gift_fund as enum ('tithe', 'offering', 'building', 'missions', 'other');

-- ---------------------------------------------------------------------------
-- Profiles — one row per auth user, carrying their role.
-- ---------------------------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null default '',
  role        user_role not null default 'viewer',
  created_at  timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- SECURITY DEFINER helper: read a user's role without tripping RLS recursion.
create or replace function public.current_role()
returns user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_staff()
returns boolean
language sql stable security definer set search_path = public as $$
  select public.current_role() in ('pastor','admin','finance','viewer');
$$;

create or replace function public.can_write()
returns boolean
language sql stable security definer set search_path = public as $$
  select public.current_role() in ('pastor','admin');
$$;

-- Profiles policies: staff read all; users update own name; only pastor/admin
-- may change roles (enforced in app + a trigger below).
create policy "profiles readable by staff"
  on public.profiles for select using (public.is_staff());
create policy "user updates own profile"
  on public.profiles for update using (id = auth.uid());
create policy "admin manages profiles"
  on public.profiles for all using (public.current_role() in ('pastor','admin'));

-- Prevent privilege escalation: the "user updates own profile" policy lets a
-- user edit their own row (e.g. their name), but RLS cannot restrict WHICH
-- columns. Without this, a viewer could `update profiles set role='pastor'`.
-- This trigger blocks any role change unless the actor is already pastor/admin.
create or replace function public.guard_role_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role
     and public.current_role() not in ('pastor','admin') then
    raise exception 'not authorised to change role';
  end if;
  return new;
end;
$$;
create trigger guard_role_change_trg
  before update on public.profiles
  for each row execute function public.guard_role_change();

-- Auto-create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- CMS — editable site content. `published` gates what the public site sees.
-- Keyed by a stable `key` (e.g. 'service.sunday', 'verse.1', 'pastor.bio').
-- ---------------------------------------------------------------------------
create table public.cms_content (
  id          uuid primary key default gen_random_uuid(),
  key         text unique not null,
  section     text not null,            -- 'services' | 'verses' | 'pastor' | ...
  data        jsonb not null default '{}'::jsonb,
  sort_order  int not null default 0,
  published   boolean not null default true,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references public.profiles(id)
);
alter table public.cms_content enable row level security;

create policy "cms readable by staff"
  on public.cms_content for select using (public.is_staff());
create policy "cms writable by editors"
  on public.cms_content for all using (public.can_write());
-- NOTE: the public website reads published CMS rows through the service role
-- in a server component, never with the anon key — so no public SELECT policy.

-- ---------------------------------------------------------------------------
-- Members — the church directory. PII lives here; finance can read, not edit.
-- ---------------------------------------------------------------------------
create table public.members (
  id           uuid primary key default gen_random_uuid(),
  first_name   text not null,
  last_name    text not null,
  email        text,
  phone        text,
  address      text,
  status       member_status not null default 'new',
  joined_on    date,
  birthday     date,
  notes        text,
  created_at   timestamptz not null default now(),
  created_by   uuid references public.profiles(id)
);
alter table public.members enable row level security;

create policy "members readable by staff"
  on public.members for select using (public.is_staff());
create policy "members writable by editors"
  on public.members for all using (public.can_write());

-- ---------------------------------------------------------------------------
-- Giving — financial records. finance + pastor/admin only.
-- ---------------------------------------------------------------------------
create table public.giving (
  id          uuid primary key default gen_random_uuid(),
  member_id   uuid references public.members(id) on delete set null,
  amount      numeric(12,2) not null check (amount >= 0),
  fund        gift_fund not null default 'offering',
  method      gift_method not null default 'eft',
  given_on    date not null default current_date,
  reference   text,
  note        text,
  created_at  timestamptz not null default now(),
  created_by  uuid references public.profiles(id)
);
alter table public.giving enable row level security;

create policy "giving readable by finance"
  on public.giving for select
  using (public.current_role() in ('pastor','admin','finance'));
create policy "giving writable by finance"
  on public.giving for all
  using (public.current_role() in ('pastor','admin','finance'));

-- ---------------------------------------------------------------------------
-- Events — church calendar.
-- ---------------------------------------------------------------------------
create table public.events (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text,
  location     text,
  starts_at    timestamptz not null,
  ends_at      timestamptz,
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  created_by   uuid references public.profiles(id)
);
alter table public.events enable row level security;

create policy "events readable by staff"
  on public.events for select using (public.is_staff());
create policy "events writable by editors"
  on public.events for all using (public.can_write());

-- ---------------------------------------------------------------------------
-- Attendance — headcount per service, optionally linked to an event.
-- ---------------------------------------------------------------------------
create table public.attendance (
  id            uuid primary key default gen_random_uuid(),
  service_date  date not null,
  service_name  text not null,
  head_count    int not null check (head_count >= 0),
  first_timers  int not null default 0 check (first_timers >= 0),
  note          text,
  created_at    timestamptz not null default now(),
  created_by    uuid references public.profiles(id),
  unique (service_date, service_name)
);
alter table public.attendance enable row level security;

create policy "attendance readable by staff"
  on public.attendance for select using (public.is_staff());
create policy "attendance writable by editors"
  on public.attendance for all using (public.can_write());

-- ---------------------------------------------------------------------------
-- Helpful indexes
-- ---------------------------------------------------------------------------
create index on public.giving (given_on);
create index on public.giving (member_id);
create index on public.members (last_name, first_name);
create index on public.events (starts_at);
create index on public.attendance (service_date);
create index on public.cms_content (section, sort_order);
