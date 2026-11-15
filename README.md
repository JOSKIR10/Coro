# Coro — red social para compartir música

## Qué hace (primera versión)
- Publicar un estado de texto (hasta 280 letras) con un fragmento de 15 s de una canción.
- Buscar canciones de cualquier país (catálogo oficial de Apple Music/iTunes).
- Perfil con foto de inicial, bio, país y **Top 10 del mes**: cada mes armas tus 10 canciones,
  y los meses pasados quedan como historial que cualquiera puede ver (selector de mes en el perfil).
  Puedes empezar el mes copiando tu top anterior y compartir el enlace de tu top (`#/u/usuario/AAAA-MM`).
- Me gusta, borrar lo tuyo, reportar publicaciones.
- Español e inglés automático según el idioma del teléfono.
- Se instala en el celular como app (PWA), sin tiendas.

## Por qué es legal
No se suben canciones. Se usan las vistas previas oficiales y gratuitas de 30 s de Apple,
que ya tienen licencia, y cada canción enlaza a "Escuchar completa".

## Seguridad
- Cada persona solo puede crear, editar o borrar lo suyo (reglas de la base de datos).
- Límite anti-spam de 30 publicaciones al día.
- Solo se puede editar el Top 10 del mes en curso; el historial queda congelado (lo protege la base de datos, no solo la app).
- Todo el texto se muestra como texto plano (no se puede inyectar código).
- Solo se aceptan audios e imágenes de servidores oficiales de Apple.

## Más funciones
- **Pantalla de bienvenida** como Instagram: lo primero es crear cuenta, entrar o entrar sin cuenta.
- **Canción del día** arriba en tu perfil, **estado de ánimo** en cada fragmento (y explorar por emoción),
  **dedicatorias** a amigos (💌), **compatibilidad musical** en %, **duelos de canciones** con votos y
  **cápsula del tiempo** animada con el #1 de cada mes.
- **Foto de perfil** (se recorta y reduce sola), **comentarios**, **actividad** (🔔: quién te sigue, comenta o da me gusta), **bloquear** y **borrar mi cuenta**.
- **Seguir a amigos** y **buscar personas** (⌕ en la barra de abajo). En Inicio puedes ver "Para ti" (todo) o solo "Siguiendo".
- **Álbumes de recomendación** en el perfil (hasta 25 canciones, portada con emoji, nota y enlace a tu playlist de Spotify, Apple Music, YouTube Music, Deezer…).
- **Colores a tu manera**: 8 paletas o combina fondo + 2 colores. Tu perfil se ve con tus colores para quien lo visite.
- **Notas musicales suaves** al tocar (escala pentatónica, siempre en armonía). Se silencian con el ícono 🎵 de arriba.
- **Instalar en el teléfono** desde Ajustes (⚙️).

## Inicio de sesión
Sin cuenta (perfil invitado), correo y contraseña, **Facebook** y **Apple** (los dos últimos se activan en `config.js` → `loginProviders` cuando estén configurados en Supabase).

## Pasos para abrirla al mundo (gratis)
Guía detallada, paso a paso: [GUIA-CONFIGURACION.md](GUIA-CONFIGURACION.md).

1. Crear cuenta en supabase.com y un proyecto nuevo.
2. SQL Editor → pegar `supabase-esquema.sql` → Run. (Si ya lo habías ejecutado antes, vuelve a ejecutarlo: actualiza sin borrar datos.)
3. Project Settings → API → copiar "Project URL" y "anon public key" en `config.js`.
4. Publicar la carpeta en GitHub Pages (o Netlify/Vercel).
