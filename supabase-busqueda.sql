-- Coro: búsqueda de canciones a través de Supabase.
-- Safari (iPhone) no deja que la app le pida canciones directo a Apple, así que Supabase lo hace por ella.
-- Se puede correr varias veces sin problema.
create extension if not exists http with schema extensions;

-- Guardamos las búsquedas un rato para no pedirle lo mismo a Apple muchas veces
create table if not exists public.song_search_cache (
  key text primary key,
  data jsonb not null,
  created_at timestamptz not null default now()
);
alter table public.song_search_cache enable row level security; -- sin políticas: solo la función la usa

create or replace function public.search_songs(term text, country text default 'US')
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare
  q text := lower(btrim(coalesce(term, '')));
  c text := upper(coalesce(country, 'US'));
  k text;
  cached jsonb;
  r extensions.http_response;
begin
  if char_length(q) < 2 or char_length(q) > 100 then return '{"results":[]}'::jsonb; end if;
  if c !~ '^[A-Z]{2}$' then c := 'US'; end if;
  k := c || '|' || q;
  select data into cached from public.song_search_cache where key = k and created_at > now() - interval '12 hours';
  if cached is not null then return cached; end if;
  perform extensions.http_set_curlopt('CURLOPT_TIMEOUT', '8');
  select * into r from extensions.http_get('https://itunes.apple.com/search?media=music&entity=song&limit=25&country='
    || c || '&term=' || extensions.urlencode(q));
  if r.status <> 200 then raise exception 'busqueda: Apple respondio %', r.status; end if;
  cached := r.content::jsonb;
  insert into public.song_search_cache (key, data) values (k, cached)
    on conflict (key) do update set data = excluded.data, created_at = now();
  delete from public.song_search_cache where created_at < now() - interval '2 days';
  return cached;
end $$;
revoke execute on function public.search_songs(text, text) from public;
grant execute on function public.search_songs(text, text) to anon, authenticated;
