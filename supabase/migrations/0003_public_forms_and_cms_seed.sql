-- Public forms + CMS content seed. Run after 0002.

-- ---------------------------------------------------------------------------
-- Let the public visitor form submit (anon INSERT), same shape as prayer.
-- Staff-only SELECT already applies from 0002.
-- ---------------------------------------------------------------------------
create policy "anyone can submit as a visitor"
  on public.visitors for insert with check (true);

-- ---------------------------------------------------------------------------
-- Seed editable site copy into cms_content. Keys match what the public pages
-- read via getText()/getJson(). `on conflict do nothing` keeps re-runs safe
-- and never clobbers edits already made in the admin.
-- ---------------------------------------------------------------------------
insert into public.cms_content (key, section, data, sort_order, published) values
  ('hero.headline', 'home', '{"text":"Life in Abundance"}', 0, true),
  ('hero.subline',  'home', '{"text":"Abundance to the Full, Abundance Till it Overflows — John 10:10"}', 1, true),
  ('home.introHeading', 'home', '{"text":"A Church Family in the Heart of Johannesburg"}', 2, true),
  ('home.introBody', 'home', '{"text":"We are an ordinary congregation serving an extraordinary God. Whether you have walked with Jesus for forty years or have never opened a Bible, there is a seat here with your name on it. Come as you are — you will not be a stranger for long."}', 3, true),
  ('mission.statement', 'mission', '{"text":"To Cause People to See, Experience and Walk on the Abundant Life that Jesus Came to Give Us."}', 0, true),
  ('mission.body', 'mission', '{"text":"Abundance is not a reward reserved for a distant day. It is the life Jesus purchased and handed to us now — in our homes, our work, our health, our relationships and our hope."}', 1, true),
  ('give.intro', 'give', '{"text":"Every service we hold, every person we pray for, and every family we support is made possible by believers who give. Thank you for sowing into the work of the Gospel in Johannesburg."}', 0, true),
  ('contact.invitation', 'contact', '{"text":"You Are Invited to Join Us for Our Sunday Services."}', 0, true),
  ('contact.address', 'contact', '{"text":"[STREET ADDRESS], Johannesburg"}', 1, true)
on conflict (key) do nothing;
