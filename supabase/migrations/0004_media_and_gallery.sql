-- Media storage + gallery. Run after 0003.

-- ---------------------------------------------------------------------------
-- Public storage bucket for site imagery.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Anyone may read (bucket is public); only signed-in staff may upload/replace/
-- delete objects in the media bucket.
create policy "media public read"
  on storage.objects for select using (bucket_id = 'media');
create policy "media staff upload"
  on storage.objects for insert to authenticated with check (bucket_id = 'media');
create policy "media staff update"
  on storage.objects for update to authenticated using (bucket_id = 'media');
create policy "media staff delete"
  on storage.objects for delete to authenticated using (bucket_id = 'media');

-- ---------------------------------------------------------------------------
-- Gallery — images shown on the public About page.
-- ---------------------------------------------------------------------------
create table public.gallery (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  caption     text,
  sort_order  int not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  created_by  uuid references public.profiles(id)
);
alter table public.gallery enable row level security;

-- Published rows are world-readable (public About page); staff manage all.
create policy "gallery public read published"
  on public.gallery for select using (published);
create policy "gallery staff read all"
  on public.gallery for select using (public.is_staff());
create policy "gallery writable by editors"
  on public.gallery for all using (public.can_write());

create index on public.gallery (published, sort_order);

-- ---------------------------------------------------------------------------
-- Swappable image slots for the site — CMS stores the uploaded URL here.
-- Empty url => the public component keeps its built-in SVG art.
-- ---------------------------------------------------------------------------
insert into public.cms_content (key, section, data, sort_order, published) values
  ('home.missionImage', 'images', '{"url":""}', 0, true),
  ('home.heroImage',    'images', '{"url":""}', 1, true)
on conflict (key) do nothing;
