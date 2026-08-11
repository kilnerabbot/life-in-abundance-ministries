-- Pastor portrait image slot (About page Shepherd). Idempotent.
insert into public.cms_content (key, section, data, sort_order, published) values
  ('home.pastorImage', 'images', '{"url":""}', 2, true)
on conflict (key) do update set section = 'images', published = true;
