-- Align the CMS mission statement with the official wording ("walk in").
-- The homepage reads this row via getText('mission.statement', …), so the code
-- change alone is not enough — the published DB row must match.
update public.cms_content
set data = '{"text":"To Cause People to See, Experience and Walk in the Abundant Life that Jesus Came to Give Us."}'
where key = 'mission.statement';
