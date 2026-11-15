# Coro — red social para compartir música

## Qué hace (primera versión)
- Publicar un estado de texto (hasta 280 letras) con un fragmento de 15 s de una canción.
- Buscar canciones de cualquier país (catálogo oficial de Apple Music/iTunes).
- Perfil con foto de inicial, bio, país y **Top 10 de canciones favoritas**.
- Me gusta, borrar lo tuyo, reportar publicaciones.
- Español e inglés automático según el idioma del teléfono.
- Se instala en el celular como app (PWA), sin tiendas.

## Por qué es legal
No se suben canciones. Se usan las vistas previas oficiales y gratuitas de 30 s de Apple,
que ya tienen licencia, y cada canción enlaza a "Escuchar completa".

## Seguridad
- Cada persona solo puede crear, editar o borrar lo suyo (reglas de la base de datos).
- Límite anti-spam de 30 publicaciones al día.
- Todo el texto se muestra como texto plano (no se puede inyectar código).
- Solo se aceptan audios e imágenes de servidores oficiales de Apple.

## Pasos para abrirla al mundo (gratis)
1. Crear cuenta en supabase.com y un proyecto nuevo.
2. SQL Editor → pegar `supabase-esquema.sql` → Run.
3. Project Settings → API → copiar "Project URL" y "anon public key" en `config.js`.
4. Publicar la carpeta en GitHub Pages (o Netlify/Vercel).
