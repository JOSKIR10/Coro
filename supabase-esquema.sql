-- Coro: base de datos segura para Supabase (plan gratis).
-- Cómo usarlo: en Supabase abre "SQL Editor", pega TODO este archivo y pulsa "Run".
-- Se puede volver a ejecutar sin problema cuando haya una versión nueva (actualiza sin borrar datos).
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

-- Foto de perfil (se guarda en Supabase Storage, carpeta "avatars")
alter table public.profiles add column if not exists avatar_url text
  check (avatar_url is null or avatar_url ~ '^https://[a-z0-9-]+\.supabase\.co/storage/v1/object/public/avatars/[a-f0-9-]+/avatar\.jpg(\?v=[0-9]+)?$');

-- Colores elegidos por cada persona (para ver su perfil con su paleta)
alter table public.profiles add column if not exists theme jsonb check (theme is null or (jsonb_typeof(theme) = 'object' and pg_column_size(theme) < 400));

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

-- Top 10 del mes (máximo 10 por persona y por mes; los meses pasados quedan como historial)
create table if not exists public.top_songs (
  user_id uuid not null references public.profiles(id) on delete cascade,
  month date not null default date_trunc('month', now())::date check (extract(day from month) = 1),
  position smallint not null check (position between 1 and 10),
  track_id bigint not null,
  track_name text not null check (char_length(track_name) <= 200),
  artist_name text not null check (char_length(artist_name) <= 200),
  artwork_url text check (artwork_url ~ '^https://[a-z0-9.-]+\.mzstatic\.com/'),
  preview_url text not null check (preview_url ~ '^https://[a-z0-9.-]+\.(apple|mzstatic)\.com/'),
  track_url text check (track_url is null or track_url = '' or track_url ~ '^https://(music|itunes|geo\.music)\.apple\.com/'),
  primary key (user_id, month, position)
);
-- Si ya habías creado la tabla con la versión anterior (sin meses), esto la actualiza sin perder datos.
do $$ begin
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'top_songs' and column_name = 'month') then
    alter table public.top_songs add column month date not null default date_trunc('month', now())::date check (extract(day from month) = 1);
    alter table public.top_songs drop constraint top_songs_pkey;
    alter table public.top_songs add primary key (user_id, month, position);
  end if;
end $$;

-- Álbumes de recomendación (cada persona arma los suyos; máx. 25 canciones y 30 álbumes)
create table if not exists public.albums (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 60),
  emoji text check (char_length(emoji) <= 8),
  note text check (char_length(note) <= 200),
  link text check (link is null or link = '' or (char_length(link) <= 300 and link ~ '^https://')),
  songs jsonb not null default '[]' check (jsonb_typeof(songs) = 'array' and jsonb_array_length(songs) <= 25 and pg_column_size(songs) < 40000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists albums_user_idx on public.albums (user_id, updated_at desc);

-- Seguir a otras personas
create table if not exists public.follows (
  follower uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  followee uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower, followee),
  check (follower <> followee)
);
create index if not exists follows_followee_idx on public.follows (followee);
create index if not exists profiles_created_idx on public.profiles (created_at desc);

-- Comentarios
create table if not exists public.comments (
  id bigint generated always as identity primary key,
  post_id bigint not null references public.posts(id) on delete cascade,
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  text text not null check (char_length(text) between 1 and 200),
  created_at timestamptz not null default now()
);
create index if not exists comments_post_idx on public.comments (post_id, created_at);
create index if not exists comments_user_idx on public.comments (user_id, created_at desc);

-- Bloqueos (solo los ve quien bloquea)
create table if not exists public.blocks (
  blocker uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  blocked uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker, blocked),
  check (blocker <> blocked)
);
create index if not exists blocks_blocked_idx on public.blocks (blocked);
create index if not exists likes_post_idx on public.likes (post_id, created_at desc);

-- ¿"quien" está bloqueado por "por"? (función segura para usar en las reglas sin exponer la tabla)
create or replace function public.is_blocked(por uuid, quien uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.blocks where blocker = por and blocked = quien)
$$;

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

alter table public.albums    enable row level security;

alter table public.follows   enable row level security;

alter table public.comments  enable row level security;
alter table public.blocks    enable row level security;

-- Lectura pública
drop policy if exists "perfiles visibles" on public.profiles;
create policy "perfiles visibles" on public.profiles for select using (true);
drop policy if exists "posts visibles" on public.posts;
create policy "posts visibles" on public.posts    for select using (true);
drop policy if exists "likes visibles" on public.likes;
create policy "likes visibles" on public.likes    for select using (true);
drop policy if exists "tops visibles" on public.top_songs;
create policy "tops visibles" on public.top_songs for select using (true);

drop policy if exists "albumes visibles" on public.albums;
create policy "albumes visibles" on public.albums for select using (true);

drop policy if exists "seguidores visibles" on public.follows;
create policy "seguidores visibles" on public.follows for select using (true);

drop policy if exists "comentarios visibles" on public.comments;
create policy "comentarios visibles" on public.comments for select using (true);
drop policy if exists "mis bloqueos" on public.blocks;
create policy "mis bloqueos" on public.blocks for select to authenticated using (blocker = auth.uid());

-- Escritura solo de lo propio
drop policy if exists "crear mi perfil" on public.profiles;
create policy "crear mi perfil" on public.profiles for insert to authenticated with check (id = auth.uid());
drop policy if exists "editar mi perfil" on public.profiles;
create policy "editar mi perfil" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
drop policy if exists "crear mi post" on public.posts;
create policy "crear mi post" on public.posts for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "borrar mi post" on public.posts;
create policy "borrar mi post" on public.posts for delete to authenticated using (user_id = auth.uid());
drop policy if exists "dar like" on public.likes;
create policy "dar like" on public.likes for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "quitar like" on public.likes;
create policy "quitar like" on public.likes for delete to authenticated using (user_id = auth.uid());
drop policy if exists "crear mi album" on public.albums;
create policy "crear mi album" on public.albums for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "editar mi album" on public.albums;
create policy "editar mi album" on public.albums for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "borrar mi album" on public.albums;
create policy "borrar mi album" on public.albums for delete to authenticated using (user_id = auth.uid());
drop policy if exists "seguir" on public.follows;
create policy "seguir" on public.follows for insert to authenticated with check (follower = auth.uid() and not public.is_blocked(followee, auth.uid()));
drop policy if exists "dejar de seguir" on public.follows;
create policy "dejar de seguir" on public.follows for delete to authenticated using (follower = auth.uid());
drop policy if exists "comentar" on public.comments;
create policy "comentar" on public.comments for insert to authenticated
  with check (user_id = auth.uid() and not public.is_blocked((select p.user_id from public.posts p where p.id = post_id), auth.uid()));
drop policy if exists "borrar comentario" on public.comments;
create policy "borrar comentario" on public.comments for delete to authenticated
  using (user_id = auth.uid() or exists (select 1 from public.posts p where p.id = post_id and p.user_id = auth.uid()));
drop policy if exists "bloquear" on public.blocks;
create policy "bloquear" on public.blocks for insert to authenticated with check (blocker = auth.uid());
drop policy if exists "desbloquear" on public.blocks;
create policy "desbloquear" on public.blocks for delete to authenticated using (blocker = auth.uid());
drop policy if exists "reportar" on public.reports;
create policy "reportar" on public.reports for insert to authenticated with check (reporter = auth.uid());

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

-- Máximo 30 álbumes por persona
create or replace function public.albums_limit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.albums where user_id = new.user_id) >= 30 then
    raise exception 'album limit reached';
  end if;
  return new;
end $$;
drop trigger if exists albums_limit on public.albums;
create trigger albums_limit before insert on public.albums for each row execute function public.albums_limit();

-- Anti-spam: máximo 200 "seguir" nuevos por día por persona
create or replace function public.follows_rate_limit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.follows where follower = new.follower and created_at > now() - interval '1 day') >= 200 then
    raise exception 'follow limit reached';
  end if;
  return new;
end $$;
drop trigger if exists follows_rate_limit on public.follows;
create trigger follows_rate_limit before insert on public.follows for each row execute function public.follows_rate_limit();

-- Anti-spam: máximo 100 comentarios por día por persona
create or replace function public.comments_rate_limit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.comments where user_id = new.user_id and created_at > now() - interval '1 day') >= 100 then
    raise exception 'comment limit reached';
  end if;
  return new;
end $$;
drop trigger if exists comments_rate_limit on public.comments;
create trigger comments_rate_limit before insert on public.comments for each row execute function public.comments_rate_limit();

-- Borrar mi cuenta: elimina el usuario y, en cascada, todo lo suyo
create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  delete from auth.users where id = auth.uid();
end $$;
revoke execute on function public.delete_my_account() from anon, public;
grant execute on function public.delete_my_account() to authenticated;

-- Guardar el Top 10 de un mes de una vez (reemplaza el de ese mes).
-- Solo se puede editar el mes en curso (con 1 día de margen por las zonas horarias):
-- los meses pasados quedan congelados como historial.
drop function if exists public.save_top_songs(jsonb);
create or replace function public.save_top_songs(songs jsonb, top_month date) returns void
language plpgsql security invoker set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  if jsonb_array_length(songs) > 10 then raise exception 'max 10 songs'; end if;
  if top_month is null or extract(day from top_month) <> 1
     or top_month not in (date_trunc('month', now() - interval '1 day')::date, date_trunc('month', now() + interval '1 day')::date) then
    raise exception 'only the current month can be edited';
  end if;
  delete from public.top_songs where user_id = auth.uid() and month = top_month;
  insert into public.top_songs (user_id, month, position, track_id, track_name, artist_name, artwork_url, preview_url, track_url)
  select auth.uid(), top_month, (s->>'position')::smallint, (s->>'track_id')::bigint, s->>'track_name', s->>'artist_name',
         s->>'artwork_url', s->>'preview_url', s->>'track_url'
  from jsonb_array_elements(songs) s;
end $$;
-- La función corre con los permisos de la persona, así que necesita estas políticas:
-- Solo el mes en curso: así nadie puede reescribir su historial, ni siquiera saltándose la app.
drop policy if exists "mi top: insertar" on public.top_songs;
create policy "mi top: insertar" on public.top_songs for insert to authenticated
  with check (user_id = auth.uid() and month >= date_trunc('month', now() - interval '1 day')::date and month <= date_trunc('month', now() + interval '1 day')::date);
drop policy if exists "mi top: borrar" on public.top_songs;
create policy "mi top: borrar" on public.top_songs for delete to authenticated
  using (user_id = auth.uid() and month >= date_trunc('month', now() - interval '1 day')::date);
revoke execute on function public.save_top_songs(jsonb, date) from anon, public;
grant execute on function public.save_top_songs(jsonb, date) to authenticated;

-- Fotos de perfil: carpeta pública "avatars"; cada persona solo puede subir/cambiar/borrar la suya (máx. 1 MB, solo JPG)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 1048576, array['image/jpeg'])
on conflict (id) do update set public = true, file_size_limit = 1048576, allowed_mime_types = array['image/jpeg'];
drop policy if exists "avatar: subir el mio" on storage.objects;
create policy "avatar: subir el mio" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and name = auth.uid()::text || '/avatar.jpg');
drop policy if exists "avatar: cambiar el mio" on storage.objects;
create policy "avatar: cambiar el mio" on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and name = auth.uid()::text || '/avatar.jpg')
  with check (bucket_id = 'avatars' and name = auth.uid()::text || '/avatar.jpg');
drop policy if exists "avatar: borrar el mio" on storage.objects;
create policy "avatar: borrar el mio" on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and name = auth.uid()::text || '/avatar.jpg');
drop policy if exists "avatar: ver" on storage.objects;
create policy "avatar: ver" on storage.objects for select using (bucket_id = 'avatars');
