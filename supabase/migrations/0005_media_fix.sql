-- Idempotent repair for media/gallery. Safe to run repeatedly.
-- Fixes a half-applied 0004 (create policy/table are not idempotent, so a
-- prior partial run could stop before the image-slot seed at the bottom).

-- Bucket ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- Storage policies (drop-then-create = idempotent) ---------------------------
drop policy if exists "media public read"   on storage.objects;
drop policy if exists "media staff upload"   on storage.objects;
drop policy if exists "media staff update"   on storage.objects;
drop policy if exists "media staff delete"   on storage.objects;
create policy "media public read" on storage.objects for select using (bucket_id = 'media');
create policy "media staff upload" on storage.objects for insert to authenticated with check (bucket_id = 'media');
create policy "media staff update" on storage.objects for update to authenticated using (bucket_id = 'media');
create policy "media staff delete" on storage.objects for delete to authenticated using (bucket_id = 'media');

-- Gallery table --------------------------------------------------------------
create table if not exists public.gallery (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  caption     text,
  sort_order  int not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  created_by  uuid references public.profiles(id)
);
alter table public.gallery enable row level security;

drop policy if exists "gallery public read published" on public.gallery;
drop policy if exists "gallery staff read all"         on public.gallery;
drop policy if exists "gallery writable by editors"    on public.gallery;
create policy "gallery public read published" on public.gallery for select using (published);
create policy "gallery staff read all"        on public.gallery for select using (public.is_staff());
create policy "gallery writable by editors"   on public.gallery for all using (public.can_write());

create index if not exists gallery_pub_order_idx on public.gallery (published, sort_order);

-- Image slots — force section='images' so the admin Media page lists them.
-- upsert (not "do nothing") repairs rows a prior run left in a wrong section.
insert into public.cms_content (key, section, data, sort_order, published) values
  ('home.missionImage', 'images', '{"url":""}', 0, true),
  ('home.heroImage',    'images', '{"url":""}', 1, true)
on conflict (key) do update set section = 'images', published = true;
