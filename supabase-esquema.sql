-- Coro: base de datos segura para Supabase (plan gratis).
-- Cómo usarlo: en Supabase abre "SQL Editor", pega TODO este archivo y pulsa "Run".
-- Reglas de seguridad (RLS): cualquiera puede LEER publicaciones, perfiles y tops,
-- pero cada persona solo puede crear, cambiar o borrar LO SUYO.

-- Perfiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9_]{3,20}$'),
  display_name text check (char_length(display_name) <= 40),
  bio text check (char_length(bio) <= 160),
  country text check (country ~ '^[A-Z]{2}$'),
  created_at timestamptz not null default now()
);

-- Publicaciones (texto + fragmento de 15 s de una vista previa oficial)
create table if not exists public.posts (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  text text check (char_length(text) <= 280),
  track_id bigint not null,
  track_name text not null check (char_length(track_name) <= 200),
  artist_name text not null check (char_length(artist_name) <= 200),
  artwork_url text check (artwork_url ~ '^https://[a-z0-9.-]+\.mzstatic\.com/'),
  preview_url text not null check (preview_url ~ '^https://[a-z0-9.-]+\.(apple|mzstatic)\.com/'),
  track_url text check (track_url is null or track_url = '' or track_url ~ '^https://(music|itunes|geo\.music)\.apple\.com/'),
  clip_start smallint not null default 0 check (clip_start between 0 and 15),
  created_at timestamptz not null default now()
);
create index if not exists posts_created_idx on public.posts (created_at desc);
create index if not exists posts_user_idx on public.posts (user_id, created_at desc);

-- Me gusta
create table if not exists public.likes (
  post_id bigint not null references public.posts(id) on delete cascade,
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);
create index if not exists likes_user_idx on public.likes (user_id);

-- Top de canciones (máximo 10 por persona)
create table if not exists public.top_songs (
  user_id uuid not null references public.profiles(id) on delete cascade,
  position smallint not null check (position between 1 and 10),
  track_id bigint not null,
  track_name text not null check (char_length(track_name) <= 200),
  artist_name text not null check (char_length(artist_name) <= 200),
  artwork_url text check (artwork_url ~ '^https://[a-z0-9.-]+\.mzstatic\.com/'),
  preview_url text not null check (preview_url ~ '^https://[a-z0-9.-]+\.(apple|mzstatic)\.com/'),
  track_url text check (track_url is null or track_url = '' or track_url ~ '^https://(music|itunes|geo\.music)\.apple\.com/'),
  primary key (user_id, position)
);

-- Reportes (solo los ve la administradora desde el panel de Supabase)
create table if not exists public.reports (
  id bigint generated always as identity primary key,
  post_id bigint not null references public.posts(id) on delete cascade,
  reporter uuid not null default auth.uid() references auth.users(id) on delete cascade,
  reason text check (char_length(reason) <= 200),
  created_at timestamptz not null default now(),
  unique (post_id, reporter)
);

-- Activar seguridad por filas
alter table public.profiles  enable row level security;
alter table public.posts     enable row level security;
alter table public.likes     enable row level security;
alter table public.top_songs enable row level security;
alter table public.reports   enable row level security;

-- Lectura pública
create policy "perfiles visibles" on public.profiles for select using (true);
create policy "posts visibles"    on public.posts    for select using (true);
create policy "likes visibles"    on public.likes    for select using (true);
create policy "tops visibles"     on public.top_songs for select using (true);

-- Escritura solo de lo propio
create policy "crear mi perfil"   on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "editar mi perfil"  on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "crear mi post"     on public.posts for insert to authenticated with check (user_id = auth.uid());
create policy "borrar mi post"    on public.posts for delete to authenticated using (user_id = auth.uid());
create policy "dar like"          on public.likes for insert to authenticated with check (user_id = auth.uid());
create policy "quitar like"       on public.likes for delete to authenticated using (user_id = auth.uid());
create policy "reportar"          on public.reports for insert to authenticated with check (reporter = auth.uid());

-- Límite anti-spam: máximo 30 publicaciones por día por persona
create or replace function public.posts_rate_limit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.posts where user_id = new.user_id and created_at > now() - interval '1 day') >= 30 then
    raise exception 'daily post limit reached';
  end if;
  return new;
end $$;
drop trigger if exists posts_rate_limit on public.posts;
create trigger posts_rate_limit before insert on public.posts for each row execute function public.posts_rate_limit();

-- Guardar el top completo de una vez (reemplaza el anterior)
create or replace function public.save_top_songs(songs jsonb) returns void
language plpgsql security invoker set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  if jsonb_array_length(songs) > 10 then raise exception 'max 10 songs'; end if;
  delete from public.top_songs where user_id = auth.uid();
  insert into public.top_songs (user_id, position, track_id, track_name, artist_name, artwork_url, preview_url, track_url)
  select auth.uid(), (s->>'position')::smallint, (s->>'track_id')::bigint, s->>'track_name', s->>'artist_name',
         s->>'artwork_url', s->>'preview_url', s->>'track_url'
  from jsonb_array_elements(songs) s;
end $$;
-- La función corre con los permisos de la persona, así que necesita estas políticas:
create policy "mi top: insertar" on public.top_songs for insert to authenticated with check (user_id = auth.uid());
create policy "mi top: borrar"   on public.top_songs for delete to authenticated using (user_id = auth.uid());
revoke execute on function public.save_top_songs(jsonb) from anon;
