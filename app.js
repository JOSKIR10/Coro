/* Coro — red social de fragmentos musicales. Sin dependencias; Supabase se carga solo si está configurado. */
(() => {
"use strict";

// ---------- Idiomas ----------
const L = (navigator.language || "es").toLowerCase();
const LANG = L.startsWith("es") ? "es" : "en";
const DICT = {
  es: {
    feed: "Inicio", new: "Publicar", me: "Perfil", login: "Entrar", logout: "Salir",
    empty_feed: "Aún no hay publicaciones. ¡Sé la primera persona en compartir una canción!",
    write: "¿Qué te hace sentir esta canción?", search: "Busca una canción o artista",
    pick_song: "Elige la canción", clip: "Elige el fragmento (15 segundos)", from: "Desde el segundo",
    listen_clip: "Escuchar fragmento", publish: "Publicar", publishing: "Publicando…",
    need_song: "Elige una canción primero", posted: "¡Publicado!", like: "Me gusta", report: "Reportar",
    reported: "Gracias, lo revisaremos", del: "Borrar", deleted: "Publicación borrada", confirm_del: "¿Borrar esta publicación?",
    top: "Mi top de canciones", top_of: "Top de canciones", posts: "Publicaciones", edit: "Editar perfil",
    save: "Guardar", saved: "Guardado", username: "Nombre de usuario (a-z, 0-9, _)", display: "Nombre visible",
    bio: "Biografía", country: "País (para buscar música de tu región)", add_top: "Agrega canciones a tu top (máx. 10)",
    no_top: "Todavía no ha elegido su top.", no_posts: "Sin publicaciones todavía.",
    user_taken: "Ese nombre de usuario ya existe", user_bad: "Usa 3 a 20 letras minúsculas, números o _",
    email: "Correo", password: "Contraseña (mínimo 8)", signin: "Entrar", signup: "Crear cuenta",
    have_acc: "¿Ya tienes cuenta? Entra", no_acc: "¿No tienes cuenta? Créala",
    check_email: "Revisa tu correo para confirmar la cuenta y luego entra.",
    demo: "Modo prueba: lo que publiques se guarda solo en este navegador. Conecta Supabase en config.js para abrirla al mundo.",
    welcome: "Crea tu perfil", welcome_sub: "Elige cómo te verán los demás.", start: "Empezar",
    full_song: "Escuchar completa", not_found: "Perfil no encontrado", no_results: "Sin resultados",
    error: "Algo salió mal. Intenta de nuevo.", offline: "Sin conexión", too_many: "Has publicado mucho hoy. Intenta mañana.",
    up: "Subir", down: "Bajar", remove: "Quitar", now: "ahora", login_needed: "Entra para hacer eso",
    privacy: "Solo mostramos vistas previas oficiales de 30 s con licencia. La canción completa se escucha en su plataforma.",
    top_month: "Top 10 del mes", my_top: "Mi Top 10 del mes", top_title: "Top 10 de {m}", your_top: "Tu Top 10 de {m}",
    top_empty_me: "Aún no armas tu Top 10 de {m}. ¿Cuáles son tus 10 canciones de este mes?", build_top: "Armar mi Top 10",
    use_prev: "Empezar con mi top de {m}", month: "Mes", past_frozen: "Los meses pasados quedan guardados como historial y ya no se pueden cambiar.",
    with_apple: "Continuar con Apple", with_facebook: "Continuar con Facebook", or_email: "o con tu correo",
    guest: "Entrar sin cuenta", guest_sub: "Sin correo ni redes. Ojo: si borras la app o cambias de teléfono, pierdes este perfil.",
    settings: "Ajustes", colors: "Tus colores", colors_sub: "Elige una paleta o combina tus propios colores.",
    c_bg: "Fondo", c_1: "Color 1", c_2: "Color 2", sounds: "Sonidos al tocar", sounds_sub: "Cada toque suena con una nota distinta, siempre en armonía.", sound_style: "Elige el estilo:", snd_marimba: "🪵 Marimba", snd_kalimba: "🎐 Kalimba", snd_bubble: "🫧 Burbujas", snd_drops: "💧 Gotas", snd_synth: "🎹 Synth suave", show_pw: "Mostrar contraseña", hide_pw: "Ocultar contraseña",
    on: "Activado", off: "Silenciado", install: "Instalar Coro en tu teléfono", install_btn: "Instalar app",
    install_ios: "En iPhone: toca el botón Compartir (cuadrado con flecha) y luego \"Agregar a inicio\".",
    install_android: "En Android: toca los ⋮ de Chrome y luego \"Instalar app\" o \"Agregar a pantalla principal\".",
    installed: "Ya está instalada 🎉", albums: "Álbumes", album_new: "Nuevo álbum", album_title: "Nombre del álbum",
    album_note: "¿Para quién es o de qué trata?", album_link: "Enlace a tu playlist (Spotify, Apple Music, YouTube Music, Deezer…) — opcional",
    album_link_bad: "Ese enlace no es de una app de música conocida", album_songs: "Canciones del álbum (máx. 25)",
    album_empty_me: "Crea álbumes de recomendación para tus amigos: \"Para correr\", \"Si estás triste\", \"Mi 2000s\"…",
    album_empty: "Todavía no tiene álbumes.", open_in: "Abrir playlist en {app}", album_del: "Borrar álbum", album_confirm_del: "¿Borrar este álbum?",
    songs_n: "{n} canciones", edit_album: "Editar álbum", tab_top: "Top 10", need_title: "Ponle nombre al álbum", cover: "Portada", back: "Volver",
    w_tag: "Encuentra la música que te conecta con los demás.", w_create: "Crear cuenta", w_login: "Ya tengo cuenta", w_guest: "Entrar sin cuenta",
    w_start: "Empezar", w_terms: "Al continuar aceptas la", w_privacy: "política de privacidad",
    w_f1: "🎧 Fragmentos de 15 s", w_f2: "🏆 Tu Top 10 de cada mes", w_f3: "💌 Dedícale canciones a tus amigos",
    m_feliz: "Feliz", m_nostalgia: "Nostalgia", m_fiesta: "Fiesta", m_amor: "Amor", m_desamor: "Desamor", m_calma: "Calma", m_energia: "Energía", m_motivacion: "Motivación",
    mood_q: "¿Qué emoción tiene?", all_moods: "Todo", explore_mood: "Explorar por emoción", empty_mood: "Nadie ha compartido algo así todavía. ¡Sé la primera persona!",
    dedicate: "Dedicar a un amigo (opcional)", dedicate_ph: "Busca a quién dedicarla…", for_u: "para", dedicate_btn: "💌 Dedicar una canción", act_dedication: "te dedicó {s}",
    sotd: "Canción del día", sotd_old: "Su canción", sotd_set: "Elegir mi canción del día", sotd_change: "Cambiar", sotd_title: "Tu canción del día", sotd_sub: "Sonará en tu perfil para quien te visite. Elige el pedacito que más te guste.",
    sotd_none: "Elige la canción que te define hoy y aparecerá arriba en tu perfil.",
    compat: "Compatibilidad musical", compat_common: "En común:", compat_none: "Aún no hay suficiente música para comparar. ¡Arma tu Top 10 y vuelve!",
    compat_0: "Gustos opuestos: ¡mucho por descubrir juntos!", compat_1: "Hay algo en común: buen comienzo.", compat_2: "Buena sintonía 🎶", compat_3: "Almas gemelas musicales 💞",
    kind_post: "Fragmento", kind_duel: "Duelo", duel_q: "Pregunta del duelo", duel_q_ph: "¿Cuál es mejor para el gym?", duel_a: "Canción A", duel_b: "Canción B",
    duel_need: "Elige las dos canciones", duel_vote: "Votar", duel_votes: "{n} votos", duel_vote1: "1 voto", duel_you: "Tu voto", duel_title: "Duelo de canciones", vs: "VS",
    capsule: "Cápsula del tiempo", capsule_cta: "✨ Ver mi cápsula {y}", capsule_cta_other: "✨ Ver su cápsula {y}", capsule_intro: "El año musical de {n}", capsule_start: "▶ Empezar",
    capsule_month: "El #1 de {m}", capsule_artist: "Artista del año", capsule_stats: "En números", capsule_months: "meses con Top 10", capsule_songs: "canciones distintas",
    capsule_repeat: "La que más se repitió", capsule_end: "¡Gracias por la música!", capsule_empty: "Todavía no hay Tops de {y}. Arma tu Top 10 de este mes y tu cápsula irá creciendo.",
    replay: "Ver de nuevo", next: "Siguiente",
    photo: "Foto de perfil", photo_pick: "Elegir foto", photo_remove: "Quitar foto", photo_bad: "Esa imagen no se pudo usar. Prueba con otra (JPG o PNG)",
    comments: "Comentarios", comment_ph: "Escribe un comentario…", send: "Enviar", no_comments: "Sé la primera persona en comentar.",
    activity: "Actividad", act_follow: "empezó a seguirte", act_like: "le dio me gusta a tu fragmento de {s}", act_comment: "comentó en {s}:",
    act_empty: "Aquí verás quién te sigue, comenta o da me gusta.", act_local: "La actividad aparece cuando la app está conectada a Supabase.",
    block: "Bloquear", unblock: "Desbloquear", block_confirm: "¿Bloquear a @{u}? No verás su música y no podrá seguirte ni comentarte.",
    blocked: "Bloqueaste a esta persona.", danger: "Zona de cuidado", del_account: "Borrar mi cuenta",
    del_account_sub: "Se borra tu perfil, tus publicaciones, tops, álbumes y comentarios. No se puede deshacer.",
    del_account_confirm: "Para confirmar, escribe tu nombre de usuario (@{u}):", del_account_done: "Tu cuenta fue borrada. ¡Gracias por haber sido parte de Coro!",
    find: "Buscar", find_ph: "Busca personas por nombre o @usuario", find_new: "Recién llegados a Coro", find_none: "No encontramos a nadie con ese nombre",
    follow: "Seguir", following_btn: "Siguiendo", followers: "seguidores", following: "siguiendo", for_you: "Para ti", feed_following: "Siguiendo",
    empty_following: "Aún no sigues a nadie. Busca a tus amigos y síguelos para ver aquí su música.", find_friends: "Buscar amigos",
    hero: "Encuentra la música que te conecta con los demás.", hero_sub: "15 segundos, tu Top 10 de cada mes y álbumes para tus amigos. Solo música.", hero_cta: "Crear mi perfil",
    edit_top: "Editar mi Top 10", share: "Compartir", copied: "Enlace copiado", no_top_month: "No armó un Top 10 en {m}."
  },
  en: {
    feed: "Home", new: "Post", me: "Profile", login: "Sign in", logout: "Sign out",
    empty_feed: "No posts yet. Be the first to share a song!",
    write: "How does this song make you feel?", search: "Search a song or artist",
    pick_song: "Pick the song", clip: "Pick the snippet (15 seconds)", from: "From second",
    listen_clip: "Play snippet", publish: "Post", publishing: "Posting…",
    need_song: "Pick a song first", posted: "Posted!", like: "Like", report: "Report",
    reported: "Thanks, we'll review it", del: "Delete", deleted: "Post deleted", confirm_del: "Delete this post?",
    top: "My top songs", top_of: "Top songs", posts: "Posts", edit: "Edit profile",
    save: "Save", saved: "Saved", username: "Username (a-z, 0-9, _)", display: "Display name",
    bio: "Bio", country: "Country (to search music from your region)", add_top: "Add songs to your top (max 10)",
    no_top: "No top songs yet.", no_posts: "No posts yet.",
    user_taken: "That username is taken", user_bad: "Use 3 to 20 lowercase letters, numbers or _",
    email: "Email", password: "Password (min 8)", signin: "Sign in", signup: "Create account",
    have_acc: "Have an account? Sign in", no_acc: "No account? Create one",
    check_email: "Check your email to confirm your account, then sign in.",
    demo: "Demo mode: posts are saved only in this browser.",
    welcome: "Create your profile", welcome_sub: "Choose how others will see you.", start: "Start",
    full_song: "Listen to full song", not_found: "Profile not found", no_results: "No results",
    error: "Something went wrong. Try again.", offline: "Offline", too_many: "You've posted a lot today. Try tomorrow.",
    up: "Up", down: "Down", remove: "Remove", now: "now", login_needed: "Sign in to do that",
    privacy: "We only play official licensed 30 s previews. Full songs play on their platform.",
    top_month: "Top 10 of the month", my_top: "My monthly Top 10", top_title: "Top 10 of {m}", your_top: "Your Top 10 of {m}",
    top_empty_me: "You haven't built your Top 10 for {m} yet. What are your 10 songs this month?", build_top: "Build my Top 10",
    use_prev: "Start from my {m} top", month: "Month", past_frozen: "Past months are kept as history and can no longer be changed.",
    with_apple: "Continue with Apple", with_facebook: "Continue with Facebook", or_email: "or with your email",
    guest: "Continue without an account", guest_sub: "No email or social login. Note: if you delete the app or change phones, you lose this profile.",
    settings: "Settings", colors: "Your colors", colors_sub: "Pick a palette or mix your own colors.",
    c_bg: "Background", c_1: "Color 1", c_2: "Color 2", sounds: "Tap sounds", sounds_sub: "Every tap plays a different note, always in tune.", sound_style: "Pick a style:", snd_marimba: "🪵 Marimba", snd_kalimba: "🎐 Kalimba", snd_bubble: "🫧 Bubbles", snd_drops: "💧 Drops", snd_synth: "🎹 Soft synth", show_pw: "Show password", hide_pw: "Hide password",
    on: "On", off: "Muted", install: "Install Coro on your phone", install_btn: "Install app",
    install_ios: "On iPhone: tap Share (square with arrow), then \"Add to Home Screen\".",
    install_android: "On Android: tap Chrome's ⋮, then \"Install app\" or \"Add to Home screen\".",
    installed: "Already installed 🎉", albums: "Albums", album_new: "New album", album_title: "Album name",
    album_note: "Who is it for, or what is it about?", album_link: "Link to your playlist (Spotify, Apple Music, YouTube Music, Deezer…) — optional",
    album_link_bad: "That link isn't from a known music app", album_songs: "Album songs (max 25)",
    album_empty_me: "Make recommendation albums for your friends: \"For running\", \"If you're sad\", \"My 2000s\"…",
    album_empty: "No albums yet.", open_in: "Open playlist in {app}", album_del: "Delete album", album_confirm_del: "Delete this album?",
    songs_n: "{n} songs", edit_album: "Edit album", tab_top: "Top 10", need_title: "Give the album a name", cover: "Cover", back: "Back",
    w_tag: "Find the music that connects you with others.", w_create: "Create account", w_login: "I have an account", w_guest: "Continue without an account",
    w_start: "Start", w_terms: "By continuing you accept the", w_privacy: "privacy policy",
    w_f1: "🎧 15-second snippets", w_f2: "🏆 Your Top 10 every month", w_f3: "💌 Dedicate songs to friends",
    m_feliz: "Happy", m_nostalgia: "Nostalgia", m_fiesta: "Party", m_amor: "Love", m_desamor: "Heartbreak", m_calma: "Calm", m_energia: "Energy", m_motivacion: "Motivation",
    mood_q: "What's the mood?", all_moods: "All", explore_mood: "Explore by mood", empty_mood: "Nobody has shared something like this yet. Be the first!",
    dedicate: "Dedicate to a friend (optional)", dedicate_ph: "Search who to dedicate it to…", for_u: "for", dedicate_btn: "💌 Dedicate a song", act_dedication: "dedicated {s} to you",
    sotd: "Song of the day", sotd_old: "Their song", sotd_set: "Pick my song of the day", sotd_change: "Change", sotd_title: "Your song of the day", sotd_sub: "It shows on your profile for visitors. Pick your favorite bit.",
    sotd_none: "Pick the song that defines you today and it will show at the top of your profile.",
    compat: "Music match", compat_common: "In common:", compat_none: "Not enough music to compare yet. Build your Top 10 and come back!",
    compat_0: "Opposite tastes: lots to discover together!", compat_1: "Something in common: good start.", compat_2: "Good vibes 🎶", compat_3: "Musical soulmates 💞",
    kind_post: "Snippet", kind_duel: "Duel", duel_q: "Duel question", duel_q_ph: "Which one is better for the gym?", duel_a: "Song A", duel_b: "Song B",
    duel_need: "Pick both songs", duel_vote: "Vote", duel_votes: "{n} votes", duel_vote1: "1 vote", duel_you: "Your vote", duel_title: "Song duel", vs: "VS",
    capsule: "Time capsule", capsule_cta: "✨ See my {y} capsule", capsule_cta_other: "✨ See their {y} capsule", capsule_intro: "{n}'s year in music", capsule_start: "▶ Start",
    capsule_month: "#1 of {m}", capsule_artist: "Artist of the year", capsule_stats: "By the numbers", capsule_months: "months with a Top 10", capsule_songs: "different songs",
    capsule_repeat: "Most repeated", capsule_end: "Thanks for the music!", capsule_empty: "No Tops in {y} yet. Build this month's Top 10 and your capsule will grow.",
    replay: "Replay", next: "Next",
    photo: "Profile photo", photo_pick: "Choose photo", photo_remove: "Remove photo", photo_bad: "That image couldn't be used. Try another one (JPG or PNG)",
    comments: "Comments", comment_ph: "Write a comment…", send: "Send", no_comments: "Be the first to comment.",
    activity: "Activity", act_follow: "started following you", act_like: "liked your snippet of {s}", act_comment: "commented on {s}:",
    act_empty: "Here you'll see who follows, comments or likes.", act_local: "Activity shows up when the app is connected to Supabase.",
    block: "Block", unblock: "Unblock", block_confirm: "Block @{u}? You won't see their music and they can't follow or comment on you.",
    blocked: "You blocked this person.", danger: "Careful zone", del_account: "Delete my account",
    del_account_sub: "Deletes your profile, posts, tops, albums and comments. This can't be undone.",
    del_account_confirm: "To confirm, type your username (@{u}):", del_account_done: "Your account was deleted. Thanks for being part of Coro!",
    find: "Search", find_ph: "Search people by name or @username", find_new: "New on Coro", find_none: "Nobody found with that name",
    follow: "Follow", following_btn: "Following", followers: "followers", following: "following", for_you: "For you", feed_following: "Following",
    empty_following: "You don't follow anyone yet. Find your friends and follow them to see their music here.", find_friends: "Find friends",
    hero: "Find the music that connects you with others.", hero_sub: "15 seconds, your monthly Top 10 and albums for your friends. Just music.", hero_cta: "Create my profile",
    edit_top: "Edit my Top 10", share: "Share", copied: "Link copied", no_top_month: "No Top 10 for {m}."
  }
};
const t = (k, v) => { let s = DICT[LANG][k] ?? DICT.es[k] ?? k; if (v) for (const [a, b] of Object.entries(v)) s = s.replace("{" + a + "}", b); return s; };
document.documentElement.lang = LANG;

// ---------- Utilidades ----------
const $app = document.getElementById("app");
const CLIP = 15;               // duración del fragmento en segundos
const MAX_TEXT = 280, MAX_TOP = 10;
const USER_RE = /^[a-z0-9_]{3,20}$/;
const SAFE_MEDIA = /^https:\/\/[a-z0-9.-]+\.(apple|mzstatic)\.com\//i;
const SAFE_LINK = /^https:\/\/(music|itunes|geo\.music)\.apple\.com\//i;
const PLAYLIST_APPS = [
  [/^https:\/\/open\.spotify\.com\//i, "Spotify"], [/^https:\/\/(music|embed\.music)\.apple\.com\//i, "Apple Music"],
  [/^https:\/\/music\.youtube\.com\//i, "YouTube Music"], [/^https:\/\/(www\.)?youtube\.com\/playlist/i, "YouTube"],
  [/^https:\/\/(www\.)?deezer\.com\/|^https:\/\/link\.deezer\.com\//i, "Deezer"], [/^https:\/\/(www\.|on\.)?soundcloud\.com\//i, "SoundCloud"],
  [/^https:\/\/(listen\.)?tidal\.com\//i, "TIDAL"], [/^https:\/\/music\.amazon\.[a-z.]+\//i, "Amazon Music"]
];
const playlistApp = url => (PLAYLIST_APPS.find(([re]) => re.test(url || "")) || [])[1] || null;
const MAX_ALBUM = 25;
const MOODS = [["feliz", "😊"], ["nostalgia", "🥹"], ["fiesta", "🎉"], ["amor", "💘"], ["desamor", "💔"], ["calma", "🌙"], ["energia", "⚡"], ["motivacion", "🔥"]];
const moodEmoji = m => (MOODS.find(x => x[0] === m) || [])[1] || "";
const trackJson = (tr, start) => ({ id: tr.id, name: tr.name, artist: tr.artist, art: tr.art, preview: tr.preview, url: tr.url, ...(start != null ? { start } : {}) });
const COVERS = ["💿", "🎧", "🔥", "🌙", "☀️", "💔", "🏃", "🚗", "🌧️", "🎉", "🌊", "🌸", "✨", "🎸", "🎹", "☕"];

function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k === "class") el.className = v;
    else if (k === "html") el.innerHTML = v; // solo para íconos SVG fijos
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(String(c)));
  return el;
}
const ICON = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C.3 8.4 2.2 4.5 6 4.5c2.2 0 3.5 1.2 4.3 2.4h3.4C14.5 5.7 15.8 4.5 18 4.5c3.8 0 5.7 3.9 4 7.2C19.5 16.4 12 21 12 21z"/></svg>',
  flag: '<svg viewBox="0 0 24 24"><path d="M5 3h2v18H5zM8 4h10l-2 4 2 4H8z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M6 7h12l-1 14H7zM9 3h6l1 2h4v2H4V5h4z"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5C21 16.5 17 14 12 14z"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><path d="M19.4 13a7.6 7.6 0 000-2l2.1-1.6-2-3.5-2.5 1a7.7 7.7 0 00-1.7-1L15 3h-4l-.4 2.7a7.7 7.7 0 00-1.7 1l-2.5-1-2 3.5L6.6 11a7.6 7.6 0 000 2l-2.1 1.6 2 3.5 2.5-1a7.7 7.7 0 001.7 1L11 21h4l.4-2.7a7.7 7.7 0 001.7-1l2.5 1 2-3.5zM13 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" transform="translate(-1 0)"/></svg>',
  note: '<svg viewBox="0 0 24 24"><path d="M9 3v11.3A3.5 3.5 0 1011 17.5V8h7V3z"/></svg>',
  chat: '<svg viewBox="0 0 24 24"><path d="M4 4h16v12H8l-4 4z"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M12 22a2.5 2.5 0 002.5-2.5h-5A2.5 2.5 0 0012 22zm7-6V11a7 7 0 00-5.5-6.8V3h-3v1.2A7 7 0 005 11v5l-2 2v1h18v-1z"/></svg>',
  camera: '<svg viewBox="0 0 24 24"><path d="M9 4l-1.5 2H4v14h16V6h-3.5L15 4zm3 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"/></svg>',
  search: '<svg viewBox="0 0 24 24"><path d="M10 3a7 7 0 015.6 11.2l5.1 5.1-1.4 1.4-5.1-5.1A7 7 0 1110 3zm0 2a5 5 0 100 10 5 5 0 000-10z"/></svg>',
  mute: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9zm13.6 3l2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z"/></svg>'
};
// Traduce los errores técnicos más comunes a algo que se entienda
function friendly(e) {
  const m = String(e?.message || e || "");
  const map = LANG === "es" ? [
    [/invalid login credentials/i, "Correo o contraseña incorrectos"], [/email not confirmed/i, "Confirma tu correo primero (revisa tu bandeja y spam)"],
    [/already registered|already been registered/i, "Ese correo ya tiene cuenta. Toca \"Entrar\""], [/password should be at least/i, "La contraseña debe tener al menos 8 caracteres"],
    [/rate limit|too many/i, "Demasiados intentos. Espera un momento"], [/anonymous sign-ins are disabled/i, "Entrar sin cuenta aún no está activado"],
    [/provider is not enabled|unsupported provider/i, "Esa forma de entrar aún no está activada"], [/album limit/i, "Llegaste al máximo de 30 álbumes"], [/follow limit/i, "Has seguido a muchas personas hoy. Intenta mañana"], [/comment limit/i, "Has comentado mucho hoy. Intenta mañana"], [/row-level security|permission denied/i, "No se puede hacer eso"],
    [/failed to fetch|networkerror|load failed/i, "Sin conexión. Revisa tu internet"], [/invalid email|unable to validate email/i, "Ese correo no parece válido"]
  ] : [[/album limit/i, "You reached the 30 album limit"], [/failed to fetch|networkerror|load failed/i, "No connection. Check your internet"]];
  for (const [re, txt] of map) if (re.test(m)) return txt;
  return m && m.length < 120 && !/^[A-Z_]+$/.test(m) ? m : t("error");
}
let toastTimer;
function toast(msg) {
  document.querySelector(".toast")?.remove();
  const el = h("div", { class: "toast", role: "status" }, msg);
  document.body.append(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), 2600);
}
function hue(s) { let x = 0; for (const c of String(s)) x = (x * 31 + c.charCodeAt(0)) >>> 0; return x % 360; }
const SAFE_AVATAR = /^(data:image\/jpeg;base64,[a-z0-9+/=]+|https:\/\/[a-z0-9-]+\.supabase\.co\/storage\/v1\/object\/public\/avatars\/[a-f0-9-]+\/avatar\.jpg(\?v=\d+)?)$/i;
function avatar(user, size) {
  const name = user.display_name || user.username || "?";
  const cls = "avatar" + (size === true || size === "big" ? " big" : size === "sm" ? " sm" : "");
  if (user.avatar_url && SAFE_AVATAR.test(user.avatar_url))
    return h("img", { class: cls, src: user.avatar_url, alt: "", loading: "lazy", decoding: "async" });
  return h("div", { class: cls, style: `background:hsl(${hue(user.username)} 65% 45%)`, "aria-hidden": "true" }, name.trim()[0]?.toUpperCase() || "?");
}
// Recorta al centro y reduce la foto a 320×320 JPEG (rápida de cargar, sin datos de ubicación)
async function squareJpeg(file, size = 320) {
  if (!/^image\//.test(file.type) || file.size > 15e6) throw new Error(t("photo_bad"));
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const m = Math.min(img.naturalWidth, img.naturalHeight);
    const c = document.createElement("canvas"); c.width = c.height = size;
    c.getContext("2d").drawImage(img, (img.naturalWidth - m) / 2, (img.naturalHeight - m) / 2, m, m, 0, 0, size, size);
    return await new Promise(res => c.toBlob(res, "image/jpeg", 0.85));
  } catch { throw new Error(t("photo_bad")); } finally { URL.revokeObjectURL(url); }
}
const blobToDataUrl = b => new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(b); });
const rtf = new Intl.RelativeTimeFormat(LANG, { numeric: "auto" });
function ago(iso) {
  const s = (new Date(iso) - Date.now()) / 1000;
  if (Math.abs(s) < 60) return t("now");
  for (const [u, n] of [["minute", 60], ["hour", 3600], ["day", 86400], ["week", 604800], ["month", 2592000], ["year", 31536000]].reverse())
    if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), u);
  return rtf.format(Math.round(s / 60), "minute");
}
function clean(s, max) { return String(s ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F‪-‮⁦-⁩]/g, "").trim().slice(0, max); }
function defaultCountry() {
  const m = (navigator.languages || [navigator.language]).map(l => (l || "").split("-")[1]).find(c => c && c.length === 2);
  return (m || "US").toUpperCase();
}
const COUNTRIES = "AR BO BR CA CL CO CR DO EC ES SV GT HN MX NI PA PY PE PR US UY VE GB IE FR DE IT PT NL BE CH AT SE NO DK FI PL CZ GR TR RU UA IL AE SA EG ZA NG KE MA IN PK ID PH VN TH MY SG JP KR TW HK CN AU NZ".split(" ");
// Meses: clave "AAAA-MM" en la hora local de cada persona
const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
function monthKey(d = new Date()) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"); }
function prevMonth(key) { const [y, m] = key.split("-").map(Number); return monthKey(new Date(y, m - 2, 1)); }
const monthFmt = new Intl.DateTimeFormat(LANG, { month: "long", year: "numeric" });
function monthLabel(key) { const [y, m] = key.split("-").map(Number); return monthFmt.format(new Date(y, m - 1, 1)); }
const regionName = (() => { try { const d = new Intl.DisplayNames([LANG], { type: "region" }); return c => d.of(c) || c; } catch { return c => c; } })();

// ---------- Música (vistas previas oficiales de Apple/iTunes: gratis, legales, globales) ----------
const searchCache = new Map();
function normTrack(r) {
  return {
    id: r.trackId, name: clean(r.trackName, 200), artist: clean(r.artistName, 200),
    art: String(r.artworkUrl100 || "").replace("100x100bb", "300x300bb"),
    preview: r.previewUrl, url: r.trackViewUrl || ""
  };
}
function jsonp(url) {
  return new Promise((res, rej) => {
    const cb = "coro_cb_" + Math.random().toString(36).slice(2);
    const s = document.createElement("script");
    const done = () => { delete window[cb]; s.remove(); };
    window[cb] = d => { done(); res(d); };
    s.onerror = () => { done(); rej(new Error("jsonp")); };
    s.src = url + "&callback=" + cb;
    document.head.append(s);
    setTimeout(() => { if (window[cb]) { done(); rej(new Error("timeout")); } }, 10000);
  });
}
async function searchSongs(term, country) {
  term = clean(term, 100);
  if (term.length < 2) return [];
  const key = country + "|" + term.toLowerCase();
  if (searchCache.has(key)) return searchCache.get(key);
  const url = `https://itunes.apple.com/search?media=music&entity=song&limit=25&country=${encodeURIComponent(country)}&term=${encodeURIComponent(term)}`;
  let data;
  try { const r = await fetch(url); if (!r.ok) throw 0; data = await r.json(); }
  catch { data = await jsonp(url); }
  const out = (data.results || []).filter(r => r.previewUrl && SAFE_MEDIA.test(r.previewUrl)).map(normTrack);
  searchCache.set(key, out);
  return out;
}

// ---------- Reproductor (un solo audio a la vez) ----------
const player = { audio: new Audio(), btn: null, stopAt: 0, start: 0 };
player.audio.preload = "none";
function setBtn(btn, playing, pct) {
  if (!btn) return;
  btn.querySelector(".ico").innerHTML = playing ? ICON.pause : ICON.play;
  btn.setAttribute("aria-label", playing ? "Pause" : "Play");
  btn.querySelector(".ring").style.setProperty("--p", (pct || 0) + "%");
}
function stopAudio() { player.audio.pause(); setBtn(player.btn, false, 0); player.btn?.closest(".track")?.classList.remove("playing"); player.btn = null; }
player.audio.addEventListener("timeupdate", () => {
  const a = player.audio;
  const pct = Math.min(100, ((a.currentTime - player.start) / CLIP) * 100);
  setBtn(player.btn, true, pct);
  if (a.currentTime >= player.stopAt) stopAudio();
});
player.audio.addEventListener("ended", stopAudio);
function playClip(track, start, btn) {
  if (player.btn === btn) return stopAudio();
  stopAudio();
  if (!SAFE_MEDIA.test(track.preview)) return;
  const a = player.audio;
  player.btn = btn; player.start = start; player.stopAt = start + CLIP;
  btn.closest(".track")?.classList.add("playing");
  if (a.src !== track.preview) a.src = track.preview;
  const go = () => { try { a.currentTime = start; } catch {} a.play().catch(() => stopAudio()); };
  if (a.readyState >= 1) go(); else { a.addEventListener("loadedmetadata", go, { once: true }); a.load(); }
  setBtn(btn, true, 0);
}
function playButton(track, start) {
  const b = h("button", { class: "play", type: "button", "aria-label": "Play" }, h("span", { class: "ring" }), h("span", { class: "ico", html: ICON.play }));
  b.addEventListener("click", e => { e.stopPropagation(); playClip(track, start, b); });
  return b;
}
const fmtSec = n => Math.floor(n / 60) + ":" + String(n % 60).padStart(2, "0");
function trackRow(track, opts = {}) {
  const img = h("img", { src: SAFE_MEDIA.test(track.art) ? track.art : "", alt: "", loading: "lazy", width: 56, height: 56, decoding: "async" });
  return h("div", { class: "track" + (opts.sel ? " sel" : ""), onclick: opts.onclick },
    h("div", { class: "disc" }, h("span", { class: "vinyl", "aria-hidden": "true" }), img),
    h("div", { class: "info" },
      h("div", { class: "name" }, track.name),
      h("div", { class: "artist" }, track.artist),
      opts.clipLabel ? h("div", { class: "clip-tag" }, "♪ " + fmtSec(opts.start || 0) + "–" + fmtSec((opts.start || 0) + CLIP)) : null,
      opts.link && SAFE_LINK.test(track.url) ? h("a", { class: "apple", href: track.url, target: "_blank", rel: "noopener noreferrer" }, t("full_song") + " ↗") : null),
    opts.noPlay ? null : playButton(track, opts.start || 0),
    opts.extra || null);
}

// ---------- Sonidos al tocar (Web Audio, escala pentatónica: siempre suenan en armonía) ----------
// Varios estilos para elegir en Ajustes: marimba, kalimba, burbuja, gotas y sintetizador suave.
const SOUND_STYLES = ["marimba", "kalimba", "bubble", "drops", "synth"];
const sfx = (() => {
  let ctx = null, out = null, step = 0, last = -1;
  const KEY = "coro_sound", SKEY = "coro_sound_style";
  const PENTA = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51]; // Do pentatónica
  const ls = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
  let on = ls(KEY, "1") !== "0";
  let style = SOUND_STYLES.includes(ls(SKEY, "")) ? ls(SKEY, "") : "marimba";
  function setup() {
    ctx ||= new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    if (!out) { // un poco de eco suave para que suene "en un cuarto" y no plano
      out = ctx.createGain(); out.gain.value = 1; out.connect(ctx.destination);
      const d = ctx.createDelay(), fb = ctx.createGain(), wet = ctx.createGain(), lp = ctx.createBiquadFilter();
      d.delayTime.value = 0.13; fb.gain.value = 0.28; wet.gain.value = 0.22; lp.type = "lowpass"; lp.frequency.value = 2600;
      out.connect(d); d.connect(lp); lp.connect(fb); fb.connect(d); lp.connect(wet); wet.connect(ctx.destination);
    }
  }
  function partial(type, freq, t0, dur, vol, attack = 0.004, sweep = 0) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t0);
    if (sweep) o.frequency.exponentialRampToValueAtTime(freq * sweep, t0 + dur * 0.6);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(out); o.start(t0); o.stop(t0 + dur + 0.05);
  }
  // Cada estilo es una "voz": cómo suena una nota
  const VOICES = {
    marimba: (f, t0, v) => { partial("sine", f, t0, 0.5, v); partial("sine", f * 4, t0, 0.07, v * 0.35); partial("sine", f * 10, t0, 0.02, v * 0.12); },
    kalimba: (f, t0, v) => { partial("sine", f, t0, 0.9, v * 0.9, 0.002); partial("sine", f * 5.4, t0, 0.12, v * 0.3); partial("triangle", f * 2, t0, 0.25, v * 0.15); },
    bubble: (f, t0, v) => { partial("sine", f * 0.7, t0, 0.22, v * 1.1, 0.006, 1.9); },
    drops: (f, t0, v) => { partial("sine", f * 2, t0, 0.14, v * 0.8, 0.002, 0.55); partial("sine", f * 3, t0 + 0.04, 0.1, v * 0.3, 0.002, 0.6); },
    synth: (f, t0, v) => { partial("sine", f, t0, 0.4, v); partial("triangle", f * 2, t0, 0.4, v * 0.15, 0.012); }
  };
  const note = (i, when, v, st = style) => VOICES[st](PENTA[Math.max(0, Math.min(PENTA.length - 1, i))], ctx.currentTime + when, v);
  function play(kind = "tap", st = style) {
    if (!on) return;
    try {
      setup();
      const v = 0.07;
      if (kind === "ok") [5, 7, 9, 10].forEach((n, i) => note(n, i * 0.075, v, st));                 // guardar / publicar: arpegio
      else if (kind === "like") { note(8, 0, v, st); note(10, 0.09, v, st); note(12, 0.18, v * 0.8, st); } // me gusta: salto alegre
      else if (kind === "soft") note(2 + (step++ % 4), 0, v * 0.3, st);                                // teclear: muy suave
      else if (kind === "down") { note(8, 0, v, st); note(5, 0.09, v, st); }                         // quitar / borrar
      else { // toque normal: nota al azar de la escala, sin repetir la anterior, para que nunca suene igual
        let n; do { n = 5 + Math.floor(Math.random() * 6); } while (n === last); last = n;
        note(n, 0, v, st);
      }
    } catch {}
  }
  return {
    play, get on() { return on; }, get style() { return style; },
    set(v) { on = v; try { localStorage.setItem(KEY, v ? "1" : "0"); } catch {} if (v) play("ok"); },
    setStyle(v) { if (!SOUND_STYLES.includes(v)) return; style = v; try { localStorage.setItem(SKEY, v); } catch {} if (on) play("like"); }
  };
})();
document.addEventListener("pointerdown", e => {
  const el = e.target.closest("button, a, select, input[type=range], input[type=color], .track[onclick], .results .track");
  if (!el || el.disabled) return;
  if (el.dataset.sfx === "none") return;
  sfx.play(el.dataset.sfx || "tap");
}, { capture: true, passive: true });
// ---------- Animaciones "vivas" ----------
const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const NOTE_CHARS = ["♪", "♫", "♬", "♩", "𝄞"];
// Al tocar: una onda suave sale desde el dedo (coordenadas de la página, para que salga justo donde tocas aunque haya scroll o teclado) (más intensa al publicar o dar me gusta)
function ripple(x, y, strong) {
  if (calm()) return;
  const el = document.createElement("span");
  el.className = "tap-ripple" + (strong ? " strong" : "");
  el.style.left = x + "px"; el.style.top = y + "px";
  document.body.append(el);
  setTimeout(() => el.remove(), 700);
}
document.addEventListener("pointerdown", e => {
  const el = e.target.closest("button, a, .results .track");
  if (!el || el.disabled) return;
  const kind = el.dataset.sfx;
  ripple(e.pageX, e.pageY, kind === "ok" || kind === "like");
  el.classList.remove("boing"); void el.offsetWidth; el.classList.add("boing");
}, { passive: true });
// Interfaz fija: sin zoom con pellizco ni doble toque
["gesturestart", "gesturechange"].forEach(ev => document.addEventListener(ev, e => e.preventDefault(), { passive: false }));
document.addEventListener("touchmove", e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
// Ecualizador que baila en la parte de abajo (bienvenida)
function eqBars(n = 32) {
  return h("div", { class: "eq-floor", "aria-hidden": "true" }, ...Array.from({ length: n }, (_, i) => {
    const mid = 1 - Math.abs(i - (n - 1) / 2) / (n / 2); // más altas en el centro
    return h("i", { style: `--max:${Math.round(25 + mid * 65 + Math.random() * 10)}%;--min:${Math.round(6 + Math.random() * 10)}%;--d:${(0.6 + Math.random() * 0.9).toFixed(2)}s;--del:-${(Math.random() * 1.5).toFixed(2)}s` });
  }));
}
document.addEventListener("keydown", e => { if (e.target.matches("input[type=text], input[type=search], input[type=email], textarea") && e.key.length === 1) sfx.play("soft"); }, { capture: true, passive: true });

// ---------- Colores personalizables ----------
const HEX = /^#[0-9a-f]{6}$/i;
const PALETTES = [
  { name: "Noche", bg: "#0f0c1d", a: "#ff4f8b", b: "#7c5cff" },
  { name: "Atardecer", bg: "#1c0f14", a: "#ff7a45", b: "#ffc53d" },
  { name: "Océano", bg: "#06141f", a: "#22d3ee", b: "#3b82f6" },
  { name: "Bosque", bg: "#0b1710", a: "#4ade80", b: "#facc15" },
  { name: "Neón", bg: "#0a0a0a", a: "#39ff14", b: "#ff00e6" },
  { name: "Chicle", bg: "#fff0f6", a: "#ec4899", b: "#8b5cf6" },
  { name: "Vainilla", bg: "#fbf7ef", a: "#e4572e", b: "#2e86ab" },
  { name: "Lavanda", bg: "#f3f0ff", a: "#7c3aed", b: "#14b8a6" }
];
function lum(hex) { const n = parseInt(hex.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
function themeVars(th) {
  if (!th || !HEX.test(th.bg) || !HEX.test(th.a) || !HEX.test(th.b)) return null;
  const light = lum(th.bg) > 0.4;
  const text = light ? "#1d1a2b" : "#f4f1ff";
  return { "--bg": th.bg, "--accent": th.a, "--accent2": th.b, "--text": text,
    "--card": `color-mix(in srgb, ${th.bg} ${light ? 88 : 90}%, ${light ? "#ffffff" : "#ffffff"} ${light ? 12 : 10}%)`,
    "--card2": `color-mix(in srgb, ${th.bg} 80%, ${th.b} 20%)`,
    "--line": `color-mix(in srgb, ${th.bg} 75%, ${th.b} 25%)`,
    "--muted": `color-mix(in srgb, ${text} 62%, ${th.bg} 38%)`,
    "--glass": `color-mix(in srgb, ${th.bg} 88%, transparent)` };
}
function applyVars(el, th) { const v = themeVars(th); if (!v) return false; for (const [k, x] of Object.entries(v)) el.style.setProperty(k, x); return true; }
const theme = {
  get() { try { const x = JSON.parse(localStorage.getItem("coro_theme")); return themeVars(x) ? x : null; } catch { return null; } },
  apply(th) {
    th = th && themeVars(th) ? th : PALETTES[0];
    applyVars(document.documentElement, th);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", th.bg);
  },
  set(th) { try { localStorage.setItem("coro_theme", JSON.stringify(th)); } catch {} theme.apply(th); }
};
theme.apply(theme.get());

// ---------- Instalar en el teléfono ----------
let installPrompt = null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installPrompt = e; });
const isInstalled = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
function installBox() {
  if (isInstalled()) return h("div", { class: "muted" }, t("installed"));
  const box = h("div", { class: "col" });
  if (installPrompt) box.append(h("button", { class: "btn", "data-sfx": "ok", onclick: async () => { installPrompt.prompt(); await installPrompt.userChoice.catch(() => {}); installPrompt = null; box.replaceWith(installBox()); } }, t("install_btn")));
  box.append(h("div", { class: "muted small" }, isIOS() ? t("install_ios") : t("install_android")));
  return box;
}

// ---------- Datos: modo prueba (local) ----------
function LocalStore() {
  const KEY = "coro_demo_v1";
  let db; try { db = JSON.parse(localStorage.getItem(KEY)); } catch {}
  db ||= { me: null, posts: [], likes: {}, tops: {}, albums: [] };
  db.albums ||= []; db.comments ||= {}; db.duels ||= []; db.votes ||= {};
  if (!db.tops) { db.tops = {}; if (db.top?.length) db.tops[monthKey()] = db.top; delete db.top; } // datos de la versión anterior
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch {} };
  const decorate = p => ({ ...p, user: db.me, likes: db.likes[p.id] ? 1 : 0, liked: !!db.likes[p.id], comments: (db.comments[p.id] || []).length });
  return {
    mode: "local",
    async session() { return db.me ? { id: "local" } : null; },
    async me() { return db.me; },
    async saveProfile(p) { db.me = { id: "local", ...db.me, ...p }; save(); return db.me; },
    async profileByUsername(u) { return db.me && db.me.username === u ? db.me : null; },
    async feed(_scope, mood) { return db.posts.filter(p => !mood || p.mood === mood).map(decorate); },
    async duels(_scope, userId) { return db.duels.map(d => { const v = db.votes[d.id]; return { ...d, user: db.me, votes: [v === 0 ? 1 : 0, v === 1 ? 1 : 0], myVote: v ?? null }; }); },
    async createDuel(d) { db.duels.unshift({ id: Date.now(), user_id: "local", ...d, created_at: new Date().toISOString() }); save(); },
    async deleteDuel(id) { db.duels = db.duels.filter(d => d.id !== id); delete db.votes[id]; save(); },
    async vote(duel, pick) { db.votes[duel.id] = pick; save(); },
    async saveSong(song) { db.me.song = song; save(); },
    async musicOf() { return []; },
    async topsOfYear(_u, year) { const out = {}; for (const [k, v] of Object.entries(db.tops)) if (k.startsWith(year + "-") && v.length) out[k] = v; return out; },
    async uploadAvatar(blob) { db.me.avatar_url = await blobToDataUrl(blob); save(); return db.me.avatar_url; },
    async removeAvatar() { delete db.me.avatar_url; save(); },
    async comments(postId) { return (db.comments[postId] || []).map(c => ({ ...c, user: db.me })); },
    async addComment(postId, text) { (db.comments[postId] ||= []).push({ id: Date.now(), post_id: postId, user_id: "local", text, created_at: new Date().toISOString() }); save(); },
    async deleteComment(id) { for (const k in db.comments) db.comments[k] = db.comments[k].filter(c => c.id !== id); save(); },
    async activity() { return null; },
    async blockedIds() { return new Set(); }, async block() {}, async unblock() {},
    async deleteAccount() { try { localStorage.removeItem(KEY); } catch {} db = { me: null, posts: [], likes: {}, tops: {}, albums: [], comments: {} }; },
    async searchUsers(q) { q = (q || "").toLowerCase(); return db.me && (!q || db.me.username.includes(q) || (db.me.display_name || "").toLowerCase().includes(q)) ? [db.me] : []; },
    async counts() { return { followers: 0, following: 0 }; },
    async isFollowing() { return false; },
    async follow() {}, async unfollow() {},
    async userPosts() { return db.posts.map(decorate); },
    async createPost(p) { db.posts.unshift({ id: Date.now(), ...p, created_at: new Date().toISOString() }); save(); },
    async deletePost(id) { db.posts = db.posts.filter(p => p.id !== id); delete db.likes[id]; save(); },
    async toggleLike(post) { if (db.likes[post.id]) delete db.likes[post.id]; else db.likes[post.id] = 1; save(); },
    async top(_u, month) { return db.tops[month] || []; },
    async topMonths() { return Object.keys(db.tops).filter(k => db.tops[k].length).sort().reverse(); },
    async saveTop(list, month) { db.tops[month] = list.slice(0, MAX_TOP); save(); },
    async saveTheme(th) { if (db.me) { db.me.theme = th; save(); } },
    async albums() { return db.albums.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at)); },
    async album(id) { return db.albums.find(a => String(a.id) === String(id)) || null; },
    async saveAlbum(a) {
      const now = new Date().toISOString();
      if (a.id) { const i = db.albums.findIndex(x => x.id === a.id); if (i >= 0) db.albums[i] = { ...db.albums[i], ...a, updated_at: now }; }
      else { a = { ...a, id: Date.now(), user_id: "local", created_at: now, updated_at: now }; db.albums.push(a); }
      save(); return a.id;
    },
    async deleteAlbum(id) { db.albums = db.albums.filter(a => a.id !== id); save(); },
    async report() {},
    async signOut() {}
  };
}

// ---------- Datos: Supabase (red social real) ----------
function loadScript(src) {
  return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.crossOrigin = "anonymous"; s.onload = res; s.onerror = rej; document.head.append(s); });
}
async function CloudStore(cfg) {
  await loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js");
  const sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "pkce" } });
  let meCache = undefined;
  const uid = async () => (await sb.auth.getSession()).data.session?.user?.id || null;
  const fromRow = (r, mine) => ({
    id: r.id, text: r.text, clip_start: r.clip_start, created_at: r.created_at, mood: r.mood, dedicatee: r.dedicatee || null,
    track: { id: r.track_id, name: r.track_name, artist: r.artist_name, art: r.artwork_url, preview: r.preview_url, url: r.track_url },
    user: r.profiles ? { id: r.user_id, ...r.profiles } : { id: r.user_id },
    likes: r.likes?.[0]?.count || 0, liked: mine.has(r.id), comments: r.comments?.[0]?.count || 0
  });
  const err = e => { if (e) { const x = new Error(e.message); x.code = e.code; throw x; } };
  async function withLikes(rows) {
    const id = await uid(); let mine = new Set();
    if (id && rows.length) {
      const { data } = await sb.from("likes").select("post_id").eq("user_id", id).in("post_id", rows.map(r => r.id));
      mine = new Set((data || []).map(x => x.post_id));
    }
    const blocked = await store.blockedIds();
    return rows.filter(r => !blocked.has(r.user_id)).map(r => fromRow(r, mine));
  }
  const POST_SEL = "id,user_id,text,track_id,track_name,artist_name,artwork_url,preview_url,track_url,clip_start,created_at,mood,dedicated_to,profiles!posts_user_id_fkey(username,display_name,avatar_url),dedicatee:profiles!posts_dedicated_to_fkey(username,display_name),likes(count),comments(count)";
  const PROF = "username,display_name,avatar_url";
  let blockedCache = null;
  const store = {
    mode: "cloud", sb,
    async session() { return (await sb.auth.getSession()).data.session; },
    async me() {
      if (meCache !== undefined) return meCache;
      const id = await uid(); if (!id) return (meCache = null);
      const { data, error } = await sb.from("profiles").select("*").eq("id", id).maybeSingle(); err(error);
      return (meCache = data);
    },
    async saveProfile(p) {
      const id = await uid();
      const { data, error } = await sb.from("profiles").upsert({ id, ...p }).select().single();
      if (error?.code === "23505") throw new Error(t("user_taken")); err(error);
      return (meCache = data);
    },
    async profileByUsername(u) { const { data } = await sb.from("profiles").select("*").eq("username", u).maybeSingle(); return data; },
    async feed(scope, mood) {
      let q = sb.from("posts").select(POST_SEL).order("created_at", { ascending: false }).limit(50);
      if (mood) q = q.eq("mood", mood);
      if (scope === "following") {
        const id = await uid(); if (!id) return [];
        const { data: f, error: fe } = await sb.from("follows").select("followee").eq("follower", id).limit(1000); err(fe);
        const ids = (f || []).map(x => x.followee);
        if (!ids.length) return [];
        q = q.in("user_id", [...ids, id]);
      }
      const { data, error } = await q; err(error); return withLikes(data);
    },
    async duels(scope, userId) {
      let q = sb.from("duels").select("*,profiles(username,display_name,avatar_url)").order("created_at", { ascending: false }).limit(20);
      if (userId) q = q.eq("user_id", userId);
      else if (scope === "following") {
        const id = await uid(); if (!id) return [];
        const { data: f } = await sb.from("follows").select("followee").eq("follower", id).limit(1000);
        q = q.in("user_id", [...(f || []).map(x => x.followee), id]);
      }
      const { data, error } = await q; err(error);
      const rows = data || []; if (!rows.length) return [];
      const id = await uid();
      const { data: vs } = await sb.from("duel_votes").select("duel_id,pick,user_id").in("duel_id", rows.map(r => r.id)).limit(5000);
      const blocked = await store.blockedIds();
      return rows.filter(r => !blocked.has(r.user_id)).map(r => {
        const mine = (vs || []).filter(v => v.duel_id === r.id);
        return { ...r, user: { id: r.user_id, ...r.profiles }, votes: [mine.filter(v => v.pick === 0).length, mine.filter(v => v.pick === 1).length], myVote: mine.find(v => v.user_id === id)?.pick ?? null };
      });
    },
    async createDuel(d) { const { error } = await sb.from("duels").insert({ question: d.question, a: d.a, b: d.b }); if (error && /limit/i.test(error.message)) throw new Error(t("too_many")); err(error); },
    async deleteDuel(id) { const { error } = await sb.from("duels").delete().eq("id", id); err(error); },
    async vote(duel, pick) { const { error } = await sb.from("duel_votes").upsert({ duel_id: duel.id, user_id: await uid(), pick }); err(error); },
    async saveSong(song) { const id = await uid(); const { error } = await sb.from("profiles").update({ song }).eq("id", id); err(error); if (meCache) meCache.song = song; },
    async musicOf(userId) {
      const [a, b, c] = await Promise.all([
        sb.from("top_songs").select("track_id,artist_name").eq("user_id", userId).limit(300),
        sb.from("posts").select("track_id,artist_name").eq("user_id", userId).limit(200),
        sb.from("albums").select("songs").eq("user_id", userId).limit(30)]);
      return [...(a.data || []), ...(b.data || [])].map(x => ({ id: x.track_id, artist: x.artist_name }))
        .concat((c.data || []).flatMap(x => (Array.isArray(x.songs) ? x.songs : []).map(s => ({ id: s.id, artist: s.artist }))));
    },
    async topsOfYear(userId, year) {
      const { data, error } = await sb.from("top_songs").select("*").eq("user_id", userId).gte("month", year + "-01-01").lte("month", year + "-12-01").order("month").order("position"); err(error);
      const out = {};
      for (const r of data || []) (out[String(r.month).slice(0, 7)] ||= []).push({ id: r.track_id, name: r.track_name, artist: r.artist_name, art: r.artwork_url, preview: r.preview_url, url: r.track_url });
      return out;
    },
    async uploadAvatar(blob) {
      const id = await uid(), path = id + "/avatar.jpg";
      const { error } = await sb.storage.from("avatars").upload(path, blob, { upsert: true, contentType: "image/jpeg", cacheControl: "3600" }); err(error);
      const url = sb.storage.from("avatars").getPublicUrl(path).data.publicUrl + "?v=" + Date.now();
      const { error: e2 } = await sb.from("profiles").update({ avatar_url: url }).eq("id", id); err(e2);
      if (meCache) meCache.avatar_url = url; return url;
    },
    async removeAvatar() {
      const id = await uid();
      await sb.storage.from("avatars").remove([id + "/avatar.jpg"]);
      const { error } = await sb.from("profiles").update({ avatar_url: null }).eq("id", id); err(error);
      if (meCache) meCache.avatar_url = null;
    },
    async comments(postId) {
      const { data, error } = await sb.from("comments").select(`id,post_id,user_id,text,created_at,profiles(${PROF})`).eq("post_id", postId).order("created_at").limit(200); err(error);
      const blocked = await store.blockedIds();
      return (data || []).filter(c => !blocked.has(c.user_id)).map(c => ({ ...c, user: { id: c.user_id, ...c.profiles } }));
    },
    async addComment(postId, text) { const { error } = await sb.from("comments").insert({ post_id: postId, text }); err(error); },
    async deleteComment(id) { const { error } = await sb.from("comments").delete().eq("id", id); err(error); },
    async activity() {
      const id = await uid(); if (!id) return [];
      const [f, l, c] = await Promise.all([
        sb.from("follows").select(`created_at,follower,profiles!follows_follower_fkey(${PROF})`).eq("followee", id).order("created_at", { ascending: false }).limit(30),
        sb.from("likes").select(`created_at,user_id,profiles(${PROF}),posts!inner(user_id,track_name)`).eq("posts.user_id", id).neq("user_id", id).order("created_at", { ascending: false }).limit(30),
        sb.from("comments").select(`created_at,user_id,text,post_id,profiles(${PROF}),posts!inner(user_id,track_name)`).eq("posts.user_id", id).neq("user_id", id).order("created_at", { ascending: false }).limit(30)]);
      const dd = await sb.from("posts").select(`created_at,user_id,track_name,text,profiles!posts_user_id_fkey(${PROF})`).eq("dedicated_to", id).order("created_at", { ascending: false }).limit(30);
      err(f.error || l.error || c.error || dd.error);
      const blocked = await store.blockedIds();
      return [
        ...(f.data || []).map(x => ({ kind: "follow", at: x.created_at, uid: x.follower, user: x.profiles })),
        ...(l.data || []).map(x => ({ kind: "like", at: x.created_at, uid: x.user_id, user: x.profiles, song: x.posts?.track_name })),
        ...(c.data || []).map(x => ({ kind: "comment", at: x.created_at, uid: x.user_id, user: x.profiles, song: x.posts?.track_name, text: x.text })),
        ...(dd.data || []).map(x => ({ kind: "dedication", at: x.created_at, uid: x.user_id, user: x.profiles, song: x.track_name, text: x.text }))
      ].filter(x => x.user && !blocked.has(x.uid)).sort((a, b) => b.at.localeCompare(a.at)).slice(0, 50);
    },
    async lastActivityAt() {
      const id = await uid(); if (!id) return null;
      const [f, c, d] = await Promise.all([
        sb.from("follows").select("created_at").eq("followee", id).order("created_at", { ascending: false }).limit(1),
        sb.from("posts").select("created_at").eq("dedicated_to", id).order("created_at", { ascending: false }).limit(1),
        sb.from("comments").select("created_at,posts!inner(user_id)").eq("posts.user_id", id).neq("user_id", id).order("created_at", { ascending: false }).limit(1)]);
      return [f.data?.[0]?.created_at, c.data?.[0]?.created_at, d.data?.[0]?.created_at].filter(Boolean).sort().pop() || null;
    },
    async blockedIds() {
      if (blockedCache) return blockedCache;
      const id = await uid(); if (!id) return new Set();
      const { data } = await sb.from("blocks").select("blocked").eq("blocker", id).limit(1000);
      return (blockedCache = new Set((data || []).map(x => x.blocked)));
    },
    async block(userId) {
      const id = await uid();
      const { error } = await sb.from("blocks").insert({ blocked: userId }); if (error?.code !== "23505") err(error);
      await sb.from("follows").delete().eq("follower", id).eq("followee", userId);
      blockedCache = null;
    },
    async unblock(userId) { const id = await uid(); const { error } = await sb.from("blocks").delete().eq("blocker", id).eq("blocked", userId); err(error); blockedCache = null; },
    async deleteAccount() {
      const id = await uid();
      await sb.storage.from("avatars").remove([id + "/avatar.jpg"]).catch(() => {});
      const { error } = await sb.rpc("delete_my_account"); err(error);
      await sb.auth.signOut().catch(() => {}); meCache = null;
    },
    async searchUsers(term) {
      const q = clean(term, 40).toLowerCase().replace(/^@/, "").replace(/[^a-z0-9_ áéíóúüñ.-]/gi, "");
      let req = sb.from("profiles").select("id,username,display_name,bio,country,theme,avatar_url").limit(25);
      req = q ? req.or(`username.ilike.%${q.replace(/[ ]/g, "_")}%,display_name.ilike.%${q}%`) : req.order("created_at", { ascending: false });
      const { data, error } = await req; err(error);
      const blocked = await store.blockedIds(); return (data || []).filter(x => !blocked.has(x.id));
    },
    async counts(userId) {
      const [a, b] = await Promise.all([
        sb.from("follows").select("*", { count: "exact", head: true }).eq("followee", userId),
        sb.from("follows").select("*", { count: "exact", head: true }).eq("follower", userId)]);
      return { followers: a.count || 0, following: b.count || 0 };
    },
    async isFollowing(userId) { const id = await uid(); if (!id) return false; const { data } = await sb.from("follows").select("followee").eq("follower", id).eq("followee", userId).maybeSingle(); return !!data; },
    async follow(userId) { const { error } = await sb.from("follows").insert({ followee: userId }); if (error?.code !== "23505") err(error); },
    async unfollow(userId) { const id = await uid(); const { error } = await sb.from("follows").delete().eq("follower", id).eq("followee", userId); err(error); },
    async userPosts(userId) { const { data, error } = await sb.from("posts").select(POST_SEL).eq("user_id", userId).order("created_at", { ascending: false }).limit(50); err(error); return withLikes(data); },
    async createPost(p) {
      const { error } = await sb.from("posts").insert({ mood: p.mood || null, dedicated_to: p.dedicated_to || null, text: p.text, clip_start: p.clip_start, track_id: p.track.id, track_name: p.track.name, artist_name: p.track.artist, artwork_url: p.track.art, preview_url: p.track.preview, track_url: p.track.url });
      if (error && /limit/i.test(error.message)) throw new Error(t("too_many")); err(error);
    },
    async deletePost(id) { const { error } = await sb.from("posts").delete().eq("id", id); err(error); },
    async toggleLike(post) {
      const id = await uid();
      if (post.liked) { const { error } = await sb.from("likes").delete().eq("post_id", post.id).eq("user_id", id); err(error); }
      else { const { error } = await sb.from("likes").insert({ post_id: post.id }); err(error); }
    },
    async top(userId, month) {
      const { data, error } = await sb.from("top_songs").select("*").eq("user_id", userId).eq("month", month + "-01").order("position"); err(error);
      return (data || []).map(r => ({ id: r.track_id, name: r.track_name, artist: r.artist_name, art: r.artwork_url, preview: r.preview_url, url: r.track_url }));
    },
    async topMonths(userId) {
      const { data, error } = await sb.from("top_songs").select("month").eq("user_id", userId).eq("position", 1).order("month", { ascending: false }).limit(120); err(error);
      return (data || []).map(r => String(r.month).slice(0, 7));
    },
    async saveTop(list, month) {
      const { error } = await sb.rpc("save_top_songs", { top_month: month + "-01", songs: list.slice(0, MAX_TOP).map((s, i) => ({ position: i + 1, track_id: s.id, track_name: s.name, artist_name: s.artist, artwork_url: s.art, preview_url: s.preview, track_url: s.url })) });
      err(error);
    },
    async report(postId, reason) { const { error } = await sb.from("reports").insert({ post_id: postId, reason: clean(reason, 200) }); err(error); },
    async signIn(email, password) { const { error } = await sb.auth.signInWithPassword({ email, password }); err(error); meCache = undefined; },
    async signUp(email, password) { const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: location.origin + location.pathname } }); err(error); meCache = undefined; return data; },
    async saveTheme(th) { const id = await uid(); const { error } = await sb.from("profiles").update({ theme: th }).eq("id", id); err(error); if (meCache) meCache.theme = th; },
    async albums(userId) { const { data, error } = await sb.from("albums").select("*").eq("user_id", userId).order("updated_at", { ascending: false }).limit(50); err(error); return data || []; },
    async album(id) { const { data, error } = await sb.from("albums").select("*").eq("id", id).maybeSingle(); err(error); return data; },
    async saveAlbum(a) {
      const row = { title: a.title, emoji: a.emoji, note: a.note, link: a.link || null, songs: a.songs, updated_at: new Date().toISOString() };
      if (a.id) { const { error } = await sb.from("albums").update(row).eq("id", a.id); err(error); return a.id; }
      const { data, error } = await sb.from("albums").insert(row).select("id").single(); err(error); return data.id;
    },
    async deleteAlbum(id) { const { error } = await sb.from("albums").delete().eq("id", id); err(error); },
    async signInGuest() { const { error } = await sb.auth.signInAnonymously(); err(error); meCache = undefined; },
    async signInWith(provider) {
      const { error } = await sb.auth.signInWithOAuth({ provider, options: { redirectTo: location.origin + location.pathname } }); err(error);
    },
    async authName() { const m = (await sb.auth.getSession()).data.session?.user?.user_metadata || {}; return clean(m.full_name || m.name || "", 40); },
    async signOut() { await sb.auth.signOut(); meCache = null; }
  };
  sb.auth.onAuthStateChange(() => { meCache = undefined; blockedCache = null; });
  return store;
}

// ---------- App ----------
let S; // almacén de datos
const state = { country: localStorage.getItem("coro_country") || defaultCountry() };

function renderNav(me) {
  const r = location.hash || "#/";
  const active = href => href === "#/" ? (r === "#/" || r === "#") : (r === href || r.startsWith(href + "/"));
  const link = (href, icon, label, cls = "") => h("a", { href, class: cls + (active(href) ? " act" : ""), "aria-label": label, "aria-current": active(href) ? "page" : null }, h("span", { html: icon }), label);
  const nav = document.getElementById("nav");
  nav.replaceChildren(
    link("#/", ICON.home, t("feed")),
    link("#/buscar", ICON.search, t("find")),
    link("#/nuevo", ICON.plus, t("new"), "plus"),
    link(me ? "#/u/" + me.username : "#/yo", ICON.user, t("me")));
  const hdr = document.getElementById("hdr");
  const snd = h("button", { class: "icon-btn", "aria-label": t("sounds"), "aria-pressed": String(sfx.on), html: sfx.on ? ICON.note : ICON.mute });
  snd.onclick = () => { sfx.set(!sfx.on); snd.innerHTML = sfx.on ? ICON.note : ICON.mute; snd.setAttribute("aria-pressed", String(sfx.on)); toast(t("sounds") + ": " + (sfx.on ? t("on") : t("off"))); };
  const bell = me && S.mode === "cloud" ? h("a", { class: "icon-btn bell", href: "#/actividad", "aria-label": t("activity"), html: ICON.bell }) : null;
  if (bell && S.lastActivityAt) S.lastActivityAt().then(at => { let seen = ""; try { seen = localStorage.getItem("coro_seen") || ""; } catch {} if (at && at > seen) bell.classList.add("dot"); }).catch(() => {});
  hdr.replaceChildren(...[bell, snd, h("a", { class: "icon-btn", href: "#/ajustes", "aria-label": t("settings"), html: ICON.gear })].filter(Boolean));
  if (S.mode === "cloud") {
    hdr.append(me || state.session
      ? h("button", { class: "icon-btn", onclick: async () => { await S.signOut(); state.session = null; location.hash = "#/"; route(); } }, t("logout"))
      : h("a", { class: "btn ghost", href: "#/entrar", style: "padding:6px 14px;text-decoration:none" }, t("login")));
  }
}

function postCard(p, me, onChange) {
  const mine = me && p.user.id === me.id;
  const likeBtn = h("button", { "data-sfx": "like", class: "icon-btn" + (p.liked ? " on" : ""), "aria-pressed": String(!!p.liked), "aria-label": t("like") },
    h("span", { html: ICON.heart }), h("span", null, String(p.likes || 0)));
  likeBtn.onclick = async () => {
    if (!me) return toast(t("login_needed"));
    try { await S.toggleLike(p); p.liked = !p.liked; p.likes += p.liked ? 1 : -1;
      likeBtn.classList.toggle("on", p.liked); likeBtn.setAttribute("aria-pressed", String(p.liked)); likeBtn.lastChild.textContent = p.likes;
      if (p.liked) { likeBtn.classList.remove("pop"); void likeBtn.offsetWidth; likeBtn.classList.add("pop"); } }
    catch { toast(t("error")); }
  };
  const box = h("div", { class: "comments", hidden: true });
  const cBtn = h("button", { class: "icon-btn", "aria-label": t("comments"), "aria-expanded": "false" }, h("span", { html: ICON.chat }), h("span", null, String(p.comments || 0)));
  cBtn.onclick = () => {
    const open = box.hidden; box.hidden = !open; cBtn.setAttribute("aria-expanded", String(open));
    if (open) commentsBox(box, p, me, n => { p.comments = n; cBtn.lastChild.textContent = n; });
  };
  const actions = [likeBtn, cBtn];
  if (mine) actions.push(h("button", { class: "icon-btn", "aria-label": t("del"), "data-sfx": "down", onclick: async () => {
    if (!confirm(t("confirm_del"))) return;
    try { await S.deletePost(p.id); toast(t("deleted")); onChange?.(); } catch { toast(t("error")); }
  } }, h("span", { html: ICON.trash })));
  else if (S.mode === "cloud") actions.push(h("button", { class: "icon-btn", "aria-label": t("report"), onclick: async () => {
    if (!me) return toast(t("login_needed"));
    const reason = prompt(t("report") + "?");
    if (reason === null) return;
    try { await S.report(p.id, reason); toast(t("reported")); } catch { toast(t("error")); }
  } }, h("span", { html: ICON.flag })));
  return h("article", { class: "card" },
    h("div", { class: "row" }, avatar(p.user),
      h("div", null,
        h("a", { class: "author", href: "#/u/" + encodeURIComponent(p.user.username || "") }, p.user.display_name || p.user.username || "—"),
        h("div", { class: "muted small" }, "@" + (p.user.username || "") + " · " + ago(p.created_at)))),
    p.mood || p.dedicatee ? h("div", { class: "row", style: "gap:6px;flex-wrap:wrap;margin-top:8px" },
      p.mood ? h("a", { class: "chip", href: "#/emocion/" + p.mood }, moodEmoji(p.mood) + " " + t("m_" + p.mood)) : null,
      p.dedicatee ? h("a", { class: "chip ded", href: "#/u/" + p.dedicatee.username }, "💌 " + t("for_u") + " @" + p.dedicatee.username) : null) : null,
    p.text ? h("p", { class: "text" }, p.text) : h("div", { style: "height:10px" }),
    trackRow(p.track, { start: p.clip_start, link: true, clipLabel: true }),
    h("div", { class: "actions" }, ...actions), box);
}

async function commentsBox(box, post, me, onCount) {
  box.replaceChildren(h("div", { class: "muted small" }, "…"));
  const list = h("div", { class: "col", style: "gap:8px" });
  const draw = async () => {
    try {
      const cs = await S.comments(post.id);
      onCount(cs.length);
      list.replaceChildren(...(cs.length ? cs.map(c => h("div", { class: "comment" }, avatar(c.user, "sm"),
        h("div", { style: "flex:1;min-width:0" },
          h("div", { class: "small" }, h("a", { class: "author", href: "#/u/" + (c.user.username || "") }, c.user.display_name || c.user.username || "—"), h("span", { class: "muted" }, " · " + ago(c.created_at))),
          h("div", { class: "text", style: "margin:2px 0 0" }, c.text)),
        me && (c.user_id === me.id || post.user.id === me.id) ? h("button", { class: "icon-btn", "data-sfx": "down", "aria-label": t("del"), onclick: async () => { try { await S.deleteComment(c.id); draw(); } catch (e) { toast(friendly(e)); } } }, "✕") : null))
        : [h("div", { class: "muted small" }, t("no_comments"))]));
    } catch (e) { list.replaceChildren(h("div", { class: "muted small" }, friendly(e))); }
  };
  const input = h("input", { type: "text", maxlength: 200, placeholder: t("comment_ph"), "aria-label": t("comment_ph"), enterkeyhint: "send" });
  const send = h("button", { class: "btn", "data-sfx": "ok", style: "padding:9px 16px" }, t("send"));
  const go = async () => {
    const txt = clean(input.value, 200); if (!txt) return;
    send.disabled = true;
    try { await S.addComment(post.id, txt); input.value = ""; await draw(); } catch (e) { toast(friendly(e)); }
    send.disabled = false;
  };
  send.onclick = go; input.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
  box.replaceChildren(list, me ? h("div", { class: "row", style: "gap:8px" }, input, send) : h("a", { class: "muted small", href: "#/yo" }, t("login_needed")));
  await draw();
}

async function viewActivity(me) {
  if (!me) return needProfile();
  const list = await S.activity();
  try { localStorage.setItem("coro_seen", new Date().toISOString()); } catch {}
  document.querySelector(".bell")?.classList.remove("dot");
  if (list === null) return $app.replaceChildren(h("div", { class: "empty" }, t("act_local")));
  $app.replaceChildren(h("h2", { style: "margin:4px 4px 12px" }, t("activity")),
    list.length ? h("div", { class: "card col", style: "gap:2px" }, ...list.map(x => h("a", { class: "user-row", href: "#/u/" + x.user.username, style: "text-decoration:none" },
      avatar(x.user),
      h("div", { style: "flex:1;min-width:0" },
        h("div", null, h("b", null, x.user.display_name || x.user.username), " ",
          x.kind === "follow" ? t("act_follow") : x.kind === "like" ? t("act_like", { s: x.song || "" }) : x.kind === "dedication" ? t("act_dedication", { s: x.song || "" }) : t("act_comment", { s: x.song || "" })),
        x.text ? h("div", { class: "muted small", style: "overflow:hidden;text-overflow:ellipsis;white-space:nowrap" }, "“" + x.text + "”") : null,
        h("div", { class: "muted small" }, ago(x.at))),
      h("span", { class: "act-ico", "aria-hidden": "true" }, x.kind === "follow" ? "👋" : x.kind === "like" ? "❤️" : x.kind === "dedication" ? "💌" : "💬"))))
    : h("div", { class: "empty" }, t("act_empty")));
}

function moodChips(current, onPick) {
  const row = h("div", { class: "chips", role: "toolbar", "aria-label": t("explore_mood") });
  const draw = cur => row.replaceChildren(h("button", { class: "chip" + (!cur ? " act" : ""), onclick: () => { onPick(null); draw(null); } }, t("all_moods")),
    ...MOODS.map(([k, e]) => h("button", { class: "chip" + (cur === k ? " act" : ""), "aria-pressed": String(cur === k), onclick: () => { onPick(k); draw(k); } }, e + " " + t("m_" + k))));
  draw(current); return row;
}

function duelCard(d, me, onChange) {
  const total = d.votes[0] + d.votes[1];
  const voted = d.myVote !== null && d.myVote !== undefined;
  const side = (tr, i) => {
    const pct = total ? Math.round(d.votes[i] * 100 / total) : 0;
    return h("div", { class: "duel-side" + (voted && d.myVote === i ? " mine" : "") },
      h("div", { class: "disc big" }, h("span", { class: "vinyl", "aria-hidden": "true" }), h("img", { src: SAFE_MEDIA.test(tr.art || "") ? tr.art : "", alt: "", loading: "lazy" })),
      h("div", { class: "name" }, tr.name), h("div", { class: "muted small" }, tr.artist),
      playButton(tr, tr.start || 0),
      voted ? h("div", { class: "bar" }, h("i", { style: `width:${pct}%` }), h("span", null, pct + "%" + (d.myVote === i ? " · " + t("duel_you") : "")))
        : h("button", { class: "btn", "data-sfx": "ok", onclick: async () => {
          if (!me) { toast(t("login_needed")); return needProfile(); }
          try { await S.vote(d, i); d.myVote = i; d.votes[i]++; onChange ? onChange() : null; card.replaceWith(duelCard(d, me, onChange)); } catch (e) { toast(friendly(e)); }
        } }, t("duel_vote")));
  };
  const mine = me && d.user_id === me.id;
  const card = h("article", { class: "card duel" },
    h("div", { class: "row" }, avatar(d.user),
      h("div", { style: "flex:1" }, h("a", { class: "author", href: "#/u/" + (d.user.username || "") }, d.user.display_name || d.user.username),
        h("div", { class: "muted small" }, "⚔️ " + t("duel_title") + " · " + ago(d.created_at))),
      mine ? h("button", { class: "icon-btn", "data-sfx": "down", "aria-label": t("del"), onclick: async () => { if (!confirm(t("confirm_del"))) return; try { await S.deleteDuel(d.id); card.remove(); } catch (e) { toast(friendly(e)); } } }, h("span", { html: ICON.trash })) : null),
    d.question ? h("h3", { class: "duel-q" }, d.question) : null,
    h("div", { class: "duel-grid" }, side(d.a, 0), h("div", { class: "vs" }, t("vs")), side(d.b, 1)),
    h("div", { class: "muted small", style: "text-align:center;margin-top:8px" }, total === 1 ? t("duel_vote1") : t("duel_votes", { n: total })));
  return card;
}

async function viewFeed(me, moodRoute) {
  const list = h("div", null, h("div", { class: "empty" }, "…"));
  const parts = [];
  if (!me) parts.push(h("div", { class: "card hero" },
    h("div", { class: "hero-notes", "aria-hidden": "true" }, "♪ ♫ ♩ ♬"),
    h("h1", null, t("hero")), h("p", { class: "muted" }, t("hero_sub")),
    h("a", { class: "btn", href: "#/yo", style: "text-decoration:none;align-self:flex-start" }, t("hero_cta"))));
  if (S.mode === "local") parts.push(h("div", { class: "banner" }, t("demo")));
  let scope = "all", mood = moodRoute && MOODS.some(m => m[0] === moodRoute) ? moodRoute : null;
  parts.push(moodChips(mood, m => { mood = m; history.replaceState(null, "", m ? "#/emocion/" + m : "#/"); load(); }));
  try { scope = me && S.mode === "cloud" && localStorage.getItem("coro_feed") === "following" ? "following" : "all"; } catch {}
  if (me && S.mode === "cloud") {
    const seg = h("div", { class: "tabs", role: "tablist" });
    const draw = () => seg.replaceChildren(...[["all", t("for_you")], ["following", t("feed_following")]].map(([k, label]) =>
      h("button", { role: "tab", class: scope === k ? "act" : "", "aria-selected": String(scope === k), onclick: () => { scope = k; try { localStorage.setItem("coro_feed", k); } catch {} draw(); load(); } }, label)));
    draw(); parts.push(seg);
  }
  $app.replaceChildren(...parts, list);
  const load = async () => {
    list.replaceChildren(h("div", { class: "empty" }, "…"));
    try {
      const [posts, duels] = await Promise.all([S.feed(scope, mood), mood ? [] : S.duels(scope).catch(() => [])]);
      const items = [...posts.map(p => ({ k: "p", at: p.created_at, p })), ...duels.map(d => ({ k: "d", at: d.created_at, d }))].sort((a, b) => b.at.localeCompare(a.at));
      const empty = mood ? h("div", { class: "empty" }, moodEmoji(mood) + " " + t("empty_mood")) : scope === "following"
        ? h("div", { class: "empty col", style: "align-items:center" }, t("empty_following"), h("a", { class: "btn", href: "#/buscar", style: "text-decoration:none" }, t("find_friends")))
        : h("div", { class: "empty" }, t("empty_feed"));
      list.replaceChildren(...(items.length ? items.map(x => x.k === "p" ? postCard(x.p, me, load) : duelCard(x.d, me)) : [empty]));
    } catch { list.replaceChildren(h("div", { class: "empty" }, navigator.onLine ? t("error") : t("offline"))); }
  };
  load();
}

function songSearch(onPick, { selectedId } = {}) {
  const input = h("input", { type: "search", placeholder: t("search"), "aria-label": t("search"), maxlength: 100, autocomplete: "off" });
  const results = h("div", { class: "results" });
  let timer, seq = 0;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const my = ++seq;
      if (input.value.trim().length < 2) return results.replaceChildren();
      results.replaceChildren(h("div", { class: "muted" }, "…"));
      try {
        const songs = await searchSongs(input.value, state.country);
        if (my !== seq) return;
        results.replaceChildren(...(songs.length ? songs.map(s => trackRow(s, { sel: s.id === selectedId, onclick: () => onPick(s) })) : [h("div", { class: "muted" }, t("no_results"))]));
      } catch { if (my === seq) results.replaceChildren(h("div", { class: "muted" }, t("error"))); }
    }, 350);
  });
  return h("div", { class: "col" }, input, results);
}

function userPicker(me, initial, onPick) {
  const box = h("div", { class: "col" });
  let chosen = initial || null;
  const draw = () => {
    if (chosen) return box.replaceChildren(h("div", { class: "row chip-row" }, avatar(chosen, "sm"), h("b", { style: "flex:1" }, "💌 @" + chosen.username),
      h("button", { class: "icon-btn", "data-sfx": "down", "aria-label": t("remove"), onclick: () => { chosen = null; onPick(null); draw(); } }, "✕")));
    const input = h("input", { type: "search", placeholder: t("dedicate_ph"), "aria-label": t("dedicate_ph"), maxlength: 40, autocapitalize: "none" });
    const res = h("div", { class: "col", style: "gap:2px" });
    let timer;
    input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(async () => {
      const q = input.value.trim(); if (q.length < 2) return res.replaceChildren();
      const us = (await S.searchUsers(q).catch(() => [])).filter(u => u.id !== me.id).slice(0, 6);
      res.replaceChildren(...us.map(u => h("button", { class: "user-row", type: "button", style: "border:0;background:none;color:inherit;text-align:left;cursor:pointer", onclick: () => { chosen = u; onPick(u); draw(); } }, avatar(u, "sm"), h("span", null, (u.display_name || u.username) + " · @" + u.username))));
    }, 300); });
    box.replaceChildren(input, res);
  };
  draw(); return box;
}

function clipPicker(onChange) {
  let track = null, start = 0;
  const box = h("div", { class: "col" });
  const chosen = h("div", { class: "col" });
  const renderChosen = () => {
    if (!track) return chosen.replaceChildren();
    const lblText = () => t("from") + " " + start + " → " + (start + CLIP) + " s";
    const lbl = h("span", null, lblText());
    const slider = h("input", { class: "slider", type: "range", min: 0, max: CLIP, step: 1, value: start, "aria-label": t("from") });
    slider.addEventListener("input", () => { start = +slider.value; lbl.textContent = lblText(); stopAudio(); preview.replaceChildren(trackRow(track, { start })); onChange(track, start); });
    const preview = h("div", null, trackRow(track, { start }));
    chosen.replaceChildren(preview, h("label", null, t("clip")), slider, h("div", { class: "muted small" }, lbl));
  };
  const search = songSearch(x => { track = x; start = 0; renderChosen(); search.querySelector(".results").replaceChildren(); search.querySelector("input").value = ""; onChange(track, start); });
  box.append(search, chosen);
  return box;
}

async function viewCompose(me, forUser) {
  if (!me) return needProfile();
  let kind = "post";
  const seg = h("div", { class: "tabs", role: "tablist" });
  const body = h("div", null);
  const drawSeg = () => seg.replaceChildren(...[["post", "🎧 " + t("kind_post")], ["duel", "⚔️ " + t("kind_duel")]].map(([k, l]) =>
    h("button", { role: "tab", class: kind === k ? "act" : "", "aria-selected": String(kind === k), onclick: () => { kind = k; stopAudio(); drawSeg(); (k === "post" ? composePost : composeDuel)(me, body, forUser); } }, l)));
  drawSeg();
  $app.replaceChildren(seg, body);
  let pre = null;
  if (forUser) pre = await S.profileByUsername(forUser).catch(() => null);
  composePost(me, body, pre);
}

function composeDuel(me, body) {
  let a = null, b = null;
  const q = h("input", { type: "text", maxlength: 80, placeholder: t("duel_q_ph"), "aria-label": t("duel_q") });
  const pub = h("button", { class: "btn", "data-sfx": "ok" }, t("publish"));
  pub.onclick = async () => {
    if (!a || !b) return toast(t("duel_need"));
    pub.disabled = true;
    try { await S.createDuel({ question: clean(q.value, 80), a: trackJson(a.track, a.start), b: trackJson(b.track, b.start) }); stopAudio(); toast(t("posted")); location.hash = "#/"; }
    catch (e) { toast(friendly(e)); pub.disabled = false; }
  };
  body.replaceChildren(h("div", { class: "card col" },
    h("label", null, t("duel_q")), q,
    h("label", null, "🅰️ " + t("duel_a")), clipPicker((tr, st) => { a = { track: tr, start: st }; }),
    h("div", { class: "vs", style: "margin:4px auto" }, t("vs")),
    h("label", null, "🅱️ " + t("duel_b")), clipPicker((tr, st) => { b = { track: tr, start: st }; }),
    pub));
}

function composePost(me, body, pre) {
  let track = null, start = 0, mood = null, dedicatee = pre && pre.id !== me.id ? pre : null;
  const text = h("textarea", { maxlength: MAX_TEXT, placeholder: t("write"), "aria-label": t("write") });
  const count = h("div", { class: "count" }, "0/" + MAX_TEXT);
  text.addEventListener("input", () => { count.textContent = text.value.length + "/" + MAX_TEXT; });
  const pub = h("button", { class: "btn", disabled: true, "data-sfx": "ok" }, t("publish"));
  const picker = clipPicker((tr, st) => { track = tr; start = st; pub.disabled = false; });
  const moods = h("div", { class: "chips wrap" });
  const drawMoods = () => moods.replaceChildren(...MOODS.map(([k, e]) => h("button", { type: "button", class: "chip" + (mood === k ? " act" : ""), "aria-pressed": String(mood === k), onclick: () => { mood = mood === k ? null : k; drawMoods(); } }, e + " " + t("m_" + k))));
  drawMoods();
  pub.onclick = async () => {
    if (!track) return toast(t("need_song"));
    pub.disabled = true; pub.textContent = t("publishing");
    try {
      await S.createPost({ text: clean(text.value, MAX_TEXT), track, clip_start: start, user_id: me.id, mood, dedicated_to: dedicatee?.id, dedicatee: dedicatee ? { username: dedicatee.username, display_name: dedicatee.display_name } : null });
      stopAudio(); toast(t("posted")); location.hash = "#/";
    } catch (e) { toast(friendly(e)); pub.disabled = false; pub.textContent = t("publish"); }
  };
  body.replaceChildren(h("div", { class: "card col" },
    text, count, h("label", null, t("pick_song")), picker,
    h("label", null, t("mood_q")), moods,
    S.mode === "cloud" ? h("label", null, t("dedicate")) : null, S.mode === "cloud" ? userPicker(me, dedicatee, u => { dedicatee = u; }) : null,
    h("div", { class: "row" }, h("span", { class: "muted small", style: "flex:1" }, t("privacy")), pub)));
}

function topEditor(list, onSave, prev) {
  const box = h("div", { class: "col" });
  const draw = () => {
    box.replaceChildren(
      !list.length && prev?.list.length ? h("button", { class: "btn ghost", onclick: () => { list.push(...prev.list); draw(); } }, t("use_prev", { m: monthLabel(prev.month) })) : null,
      h("div", { class: "top-list" }, ...list.map((s, i) => trackRow(s, { noPlay: true, extra: h("div", { class: "mini" },
        h("button", { class: "icon-btn", disabled: i === 0, "aria-label": t("up"), onclick: () => { [list[i - 1], list[i]] = [list[i], list[i - 1]]; draw(); } }, "↑"),
        h("button", { class: "icon-btn", disabled: i === list.length - 1, "aria-label": t("down"), onclick: () => { [list[i + 1], list[i]] = [list[i], list[i + 1]]; draw(); } }, "↓"),
        h("button", { class: "icon-btn", "aria-label": t("remove"), "data-sfx": "down", onclick: () => { list.splice(i, 1); draw(); } }, "✕")) }))),
      list.length < MAX_TOP ? songSearch(s => { if (!list.some(x => x.id === s.id)) list.push(s); draw(); }) : null,
      h("button", { class: "btn", "data-sfx": "ok", onclick: async e => { e.target.disabled = true; try { await onSave(list); toast(t("saved")); } catch { toast(t("error")); } e.target.disabled = false; } }, t("save")));
  };
  draw();
  return box;
}

async function viewEdit(me, first) {
  const u = h("input", { type: "text", value: me?.username || "", maxlength: 20, autocapitalize: "none", autocomplete: "username", spellcheck: "false", "aria-label": t("username") });
  const d = h("input", { type: "text", value: me?.display_name || (first && S.authName ? await S.authName() : ""), maxlength: 40, "aria-label": t("display") });
  const b = h("textarea", { maxlength: 160, "aria-label": t("bio"), style: "min-height:60px" }, me?.bio || "");
  const c = h("select", { "aria-label": t("country") }, ...[...new Set([state.country, ...COUNTRIES])].sort((a, z) => regionName(a).localeCompare(regionName(z), LANG)).map(code => h("option", { value: code, selected: code === (me?.country || state.country) }, regionName(code))));
  const save = h("button", { class: "btn", "data-sfx": "ok" }, first ? t("start") : t("save"));
  save.onclick = async () => {
    const username = u.value.trim().toLowerCase();
    if (!USER_RE.test(username)) return toast(t("user_bad"));
    save.disabled = true;
    try {
      const p = await S.saveProfile({ username, display_name: clean(d.value, 40) || username, bio: clean(b.value, 160), country: c.value });
      if (first && theme.get()) S.saveTheme(theme.get()).catch(() => {});
      state.country = p.country || c.value; try { localStorage.setItem("coro_country", state.country); } catch {}
      toast(t("saved")); location.hash = "#/u/" + p.username;
    } catch (e) { toast(friendly(e)); save.disabled = false; }
  };
  const photoBox = h("div", { class: "row" });
  const drawPhoto = () => {
    const file = h("input", { type: "file", accept: "image/*", hidden: true });
    file.onchange = async () => {
      const f = file.files[0]; if (!f) return;
      try { const blob = await squareJpeg(f); toast("…"); await S.uploadAvatar(blob); me = await S.me(); toast(t("saved")); drawPhoto(); renderNav(me); }
      catch (e) { toast(friendly(e)); }
    };
    photoBox.replaceChildren(avatar(me || { username: u.value || "?" }, true), file,
      h("div", { class: "col", style: "gap:6px" },
        h("button", { class: "btn ghost", type: "button", onclick: () => file.click() }, h("span", { html: ICON.camera, class: "ico-inline" }), " " + t("photo_pick")),
        me?.avatar_url ? h("button", { class: "icon-btn", type: "button", "data-sfx": "down", onclick: async () => { try { await S.removeAvatar(); me = await S.me(); drawPhoto(); } catch (e) { toast(friendly(e)); } } }, t("photo_remove")) : null));
  };
  if (!first) drawPhoto();
  const parts = [h("div", { class: "card col" },
    h("h2", { style: "margin:0" }, first ? t("welcome") : t("edit")),
    first ? h("div", { class: "muted" }, t("welcome_sub")) : null,
    first ? null : h("label", null, t("photo")), first ? null : photoBox,
    h("label", null, t("username")), u, h("label", null, t("display")), d, h("label", null, t("bio")), b, h("label", null, t("country")), c, save)];
  if (!first) parts.push(h("div", { class: "card col danger" },
    h("h3", { style: "margin:0" }, t("danger")), h("div", { class: "muted small" }, t("del_account_sub")),
    h("button", { class: "btn ghost", "data-sfx": "down", onclick: async () => {
      const typed = prompt(t("del_account_confirm", { u: me.username }));
      if (typed === null || typed.trim().replace(/^@/, "").toLowerCase() !== me.username) return;
      try { await S.deleteAccount(); state.session = null; toast(t("del_account_done")); location.hash = "#/"; route(); } catch (e) { toast(friendly(e)); }
    } }, t("del_account"))));
  $app.replaceChildren(...parts);
}

async function viewSongEditor(me) {
  if (!me) return needProfile();
  let track = null, start = 0;
  const save = h("button", { class: "btn", disabled: true, "data-sfx": "ok" }, t("save"));
  save.onclick = async () => {
    save.disabled = true;
    try { await S.saveSong({ ...trackJson(track, start), at: new Date().toISOString() }); stopAudio(); toast(t("saved")); location.hash = "#/u/" + me.username; }
    catch (e) { toast(friendly(e)); save.disabled = false; }
  };
  $app.replaceChildren(h("div", { class: "card col" }, h("h2", { style: "margin:0" }, "🎵 " + t("sotd_title")), h("div", { class: "muted small" }, t("sotd_sub")),
    clipPicker((tr, st) => { track = tr; start = st; save.disabled = false; }), save));
}

function compatBox(mine, theirs, name) {
  const A = new Set(mine.map(x => (x.artist || "").toLowerCase()).filter(Boolean)), B = new Set(theirs.map(x => (x.artist || "").toLowerCase()).filter(Boolean));
  const TA = new Set(mine.map(x => x.id)), TB = new Set(theirs.map(x => x.id));
  if (A.size < 2 || B.size < 2) return h("div", { class: "compat" }, h("div", { class: "muted small" }, "🔗 " + t("compat") + ": " + t("compat_none")));
  const ca = [...A].filter(x => B.has(x)), ct = [...TA].filter(x => TB.has(x));
  const score = Math.min(100, Math.round(100 * (0.7 * ca.length / Math.min(A.size, B.size) + 0.3 * ct.length / Math.min(TA.size, TB.size)) * 1.3));
  const msg = score < 15 ? t("compat_0") : score < 45 ? t("compat_1") : score < 75 ? t("compat_2") : t("compat_3");
  const pretty = mine.concat(theirs).reduce((m, x) => { const k = (x.artist || "").toLowerCase(); if (ca.includes(k) && !m.has(k)) m.set(k, x.artist); return m; }, new Map());
  return h("div", { class: "compat" },
    h("div", { class: "ring-score", style: `--s:${score}` }, h("b", null, score + "%")),
    h("div", { style: "flex:1;min-width:0" }, h("div", { class: "small", style: "font-weight:700" }, t("compat") + " · @" + name), h("div", { class: "small" }, msg),
      pretty.size ? h("div", { class: "muted small", style: "overflow:hidden;text-overflow:ellipsis;white-space:nowrap" }, t("compat_common") + " " + [...pretty.values()].slice(0, 4).join(", ")) : null));
}

async function viewCapsule(me, username, year) {
  const p = me && me.username === username ? me : await S.profileByUsername(username);
  if (!p) return $app.replaceChildren(h("div", { class: "empty" }, t("not_found")));
  year = /^\d{4}$/.test(year || "") ? year : String(new Date().getFullYear());
  const tops = await S.topsOfYear(p.id, year);
  const months = Object.keys(tops).sort();
  const stage = h("div", { class: "capsule" });
  if (!months.length) { stage.append(h("div", { class: "slide" }, h("div", { class: "big-emoji" }, "⏳"), h("p", null, t("capsule_empty", { y: year })))); return $app.replaceChildren(stage); }
  const all = months.flatMap(m => tops[m]);
  const byArtist = new Map(), bySong = new Map();
  for (const s of all) { byArtist.set(s.artist, (byArtist.get(s.artist) || 0) + 1); const k = s.id; bySong.set(k, { s, n: (bySong.get(k)?.n || 0) + 1 }); }
  const artist = [...byArtist.entries()].sort((a, b) => b[1] - a[1])[0];
  const repeat = [...bySong.values()].sort((a, b) => b.n - a.n)[0];
  const name = p.display_name || p.username;
  const slides = [
    { bg: 0, render: () => [h("div", { class: "big-emoji" }, "✨"), h("h1", null, t("capsule_intro", { n: name })), h("div", { class: "year" }, year)] },
    ...months.map((m, i) => ({ bg: i + 1, track: tops[m][0], render: () => [h("div", { class: "kicker" }, t("capsule_month", { m: monthLabel(m) })),
      h("div", { class: "disc huge spin" }, h("span", { class: "vinyl" }), h("img", { src: SAFE_MEDIA.test(tops[m][0].art || "") ? tops[m][0].art.replace("300x300", "600x600") : "", alt: "" })),
      h("h2", null, tops[m][0].name), h("div", { class: "muted" }, tops[m][0].artist)] })),
    { bg: 3, render: () => [h("div", { class: "kicker" }, t("capsule_artist")), h("div", { class: "big-emoji" }, "🎤"), h("h1", null, artist[0])] },
    { bg: 4, track: repeat.s, render: () => [h("div", { class: "kicker" }, t("capsule_repeat")), h("h2", null, repeat.s.name), h("div", { class: "muted" }, repeat.s.artist + " · " + repeat.n + "×")] },
    { bg: 5, render: () => [h("div", { class: "kicker" }, t("capsule_stats")),
      h("div", { class: "stats" }, h("div", null, h("b", null, String(months.length)), t("capsule_months")), h("div", null, h("b", null, String(bySong.size)), t("capsule_songs")))] },
    { bg: 6, render: () => [h("div", { class: "big-emoji" }, "💜"), h("h1", null, t("capsule_end")),
      h("div", { class: "row", style: "justify-content:center;gap:8px;flex-wrap:wrap" },
        h("button", { class: "btn ghost", onclick: () => go(0) }, t("replay")),
        h("button", { class: "btn", onclick: () => shareLink(location.href, t("capsule_intro", { n: name }) + " " + year) }, t("share") + " ↗"))] }
  ];
  let i = 0, timer;
  const dots = h("div", { class: "dots" });
  const go = n => {
    clearTimeout(timer); stopAudio(); i = n;
    const sl = slides[i];
    stage.style.setProperty("--h", (i * 47) % 360);
    stage.replaceChildren(dots, h("div", { class: "slide enter" }, ...sl.render()));
    dots.replaceChildren(...slides.map((_, k) => h("i", { class: k < i ? "done" : k === i ? "now" : "" })));
    if (sl.track && SAFE_MEDIA.test(sl.track.preview || "")) { const fake = h("button", { class: "play", style: "display:none" }, h("span", { class: "ring" }), h("span", { class: "ico" })); stage.append(fake); playClip(sl.track, 5, fake); }
    if (i < slides.length - 1) timer = setTimeout(() => go(i + 1), 5000);
  };
  stage.onclick = e => { if (e.target.closest("button")) return; if (i < slides.length - 1) go(i + 1); };
  stage.append(h("div", { class: "slide" }, h("div", { class: "big-emoji" }, "✨"), h("h1", null, t("capsule_intro", { n: name })), h("div", { class: "year" }, year),
    h("button", { class: "btn", "data-sfx": "ok", onclick: () => go(1) }, t("capsule_start"))));
  window.addEventListener("hashchange", () => clearTimeout(timer), { once: true });
  $app.replaceChildren(stage);
}

async function viewTopEditor(me) {
  if (!me) return needProfile();
  const month = monthKey(), before = prevMonth(month);
  const [list, prevList] = await Promise.all([S.top(me.id, month), S.top(me.id, before)]);
  $app.replaceChildren(h("div", { class: "card col" },
    h("h2", { style: "margin:0" }, t("your_top", { m: monthLabel(month) })),
    h("div", { class: "muted small" }, t("add_top") + ". " + t("past_frozen")),
    topEditor(list, async l => { await S.saveTop(l, month); location.hash = "#/u/" + me.username; }, { month: before, list: prevList })));
}

async function shareLink(url, title) {
  try { if (navigator.share) return await navigator.share({ title, url }); } catch (e) { if (e?.name === "AbortError") return; }
  try { await navigator.clipboard.writeText(url); toast(t("copied")); } catch { prompt(t("share"), url); }
}

function albumTile(a, owner) {
  const songs = Array.isArray(a.songs) ? a.songs : [];
  return h("a", { class: "album", href: "#/u/" + owner.username + "/a/" + a.id },
    h("div", { class: "album-cover", "aria-hidden": "true" }, a.emoji || "💿"),
    h("div", { class: "album-title" }, a.title),
    h("div", { class: "muted small" }, t("songs_n", { n: songs.length }) + (playlistApp(a.link) ? " · " + playlistApp(a.link) : "")));
}

async function viewAlbum(me, username, id) {
  const p = me && me.username === username ? me : await S.profileByUsername(username);
  const a = p ? await S.album(id) : null;
  if (!p || !a || (a.user_id !== p.id && S.mode === "cloud")) return $app.replaceChildren(h("div", { class: "empty" }, t("not_found")));
  const isMe = me && me.id === p.id;
  const songs = (Array.isArray(a.songs) ? a.songs : []).filter(x => x && x.name);
  const app = playlistApp(a.link);
  const head = h("div", { class: "card col album-head" },
    h("a", { class: "icon-btn", href: "#/u/" + p.username + "/albums", style: "align-self:flex-start" }, "← @" + p.username),
    h("div", { class: "row" }, h("div", { class: "album-cover big", "aria-hidden": "true" }, a.emoji || "💿"),
      h("div", { style: "flex:1;min-width:0" }, h("h2", { style: "margin:0;overflow-wrap:anywhere" }, a.title),
        h("div", { class: "muted small" }, t("songs_n", { n: songs.length })))),
    a.note ? h("p", { class: "text", style: "margin:0" }, a.note) : null,
    app ? h("a", { class: "btn ghost", href: a.link, target: "_blank", rel: "noopener noreferrer", style: "text-decoration:none;text-align:center" }, t("open_in", { app }) + " ↗") : null,
    h("div", { class: "row", style: "gap:8px;flex-wrap:wrap" },
      h("button", { class: "icon-btn", onclick: () => shareLink(location.href, a.title + " · @" + p.username) }, t("share") + " ↗"),
      isMe ? h("a", { class: "icon-btn", href: "#/album/" + a.id }, t("edit_album")) : null));
  if (!isMe) applyVars(head, p.theme);
  $app.replaceChildren(head, songs.length ? h("div", { class: "card col" }, ...songs.map(x => trackRow(x, { link: true }))) : null);
}

async function viewAlbumEditor(me, id) {
  if (!me) return needProfile();
  const a = id === "nuevo" ? { title: "", emoji: "💿", note: "", link: "", songs: [] } : await S.album(id);
  if (!a || (a.user_id && a.user_id !== me.id && S.mode === "cloud")) return $app.replaceChildren(h("div", { class: "empty" }, t("not_found")));
  const list = (Array.isArray(a.songs) ? a.songs : []).slice();
  let emoji = a.emoji || "💿";
  const title = h("input", { type: "text", maxlength: 60, value: a.title || "", "aria-label": t("album_title"), placeholder: t("album_title") });
  const note = h("textarea", { maxlength: 200, "aria-label": t("album_note"), placeholder: t("album_note"), style: "min-height:60px" }, a.note || "");
  const link = h("input", { type: "url", maxlength: 300, value: a.link || "", "aria-label": t("album_link"), placeholder: "https://open.spotify.com/playlist/…", inputmode: "url" });
  const covers = h("div", { class: "covers", role: "radiogroup", "aria-label": t("cover") });
  const drawCovers = () => covers.replaceChildren(...COVERS.map(c => h("button", { type: "button", role: "radio", "aria-checked": String(c === emoji), class: c === emoji ? "act" : "", onclick: () => { emoji = c; drawCovers(); } }, c)));
  drawCovers();
  const songsBox = h("div", { class: "col" });
  const drawSongs = () => songsBox.replaceChildren(
    h("div", { class: "col" }, ...list.map((x, i) => trackRow(x, { noPlay: true, extra: h("button", { class: "icon-btn", "data-sfx": "down", "aria-label": t("remove"), onclick: () => { list.splice(i, 1); drawSongs(); } }, "✕") }))),
    list.length < MAX_ALBUM ? songSearch(x => { if (!list.some(y => y.id === x.id)) list.push(x); drawSongs(); }) : null);
  drawSongs();
  const save = h("button", { class: "btn", "data-sfx": "ok" }, t("save"));
  save.onclick = async () => {
    const tt = clean(title.value, 60); if (!tt) return toast(t("need_title"));
    const ln = link.value.trim(); if (ln && !playlistApp(ln)) return toast(t("album_link_bad"));
    save.disabled = true;
    try {
      const newId = await S.saveAlbum({ id: a.id, title: tt, emoji, note: clean(note.value, 200), link: ln, songs: list.slice(0, MAX_ALBUM) });
      toast(t("saved")); location.hash = "#/u/" + me.username + "/a/" + newId;
    } catch (e) { toast(friendly(e)); save.disabled = false; }
  };
  const parts = [h("div", { class: "card col" },
    h("h2", { style: "margin:0" }, a.id ? t("edit_album") : t("album_new")),
    h("label", null, t("album_title")), title, h("label", null, t("cover")), covers,
    h("label", null, t("album_note")), note, h("label", null, t("album_link")), link,
    h("label", null, t("album_songs")), songsBox, save)];
  if (a.id) parts.push(h("button", { class: "icon-btn", "data-sfx": "down", style: "align-self:center;margin:0 auto;display:flex", onclick: async () => {
    if (!confirm(t("album_confirm_del"))) return;
    try { await S.deleteAlbum(a.id); location.hash = "#/u/" + me.username + "/albums"; } catch { toast(t("error")); }
  } }, h("span", { html: ICON.trash }), t("album_del")));
  $app.replaceChildren(...parts);
}

async function viewSettings(me) {
  const pick = th => { theme.set(th); if (me) S.saveTheme(th).catch(() => {}); draw(); };
  const box = h("div", null);
  const draw = () => {
    const now = theme.get() || PALETTES[0];
    const inp = (key, label) => { const i = h("input", { type: "color", value: now[key], "aria-label": label }); i.addEventListener("input", () => { const th = { ...(theme.get() || PALETTES[0]), [key]: i.value }; theme.set(th); }); i.addEventListener("change", () => pick({ ...(theme.get() || PALETTES[0]) })); return h("label", { class: "swatch-in" }, i, label); };
    box.replaceChildren(
      h("div", { class: "card col" },
        h("h2", { style: "margin:0" }, t("colors")), h("div", { class: "muted small" }, t("colors_sub")),
        h("div", { class: "palettes" }, ...PALETTES.map(pl => {
          const sel = pl.bg === now.bg && pl.a === now.a && pl.b === now.b;
          return h("button", { type: "button", class: "palette" + (sel ? " act" : ""), "aria-pressed": String(sel), onclick: () => pick({ bg: pl.bg, a: pl.a, b: pl.b }), style: `background:${pl.bg};color:${lum(pl.bg) > 0.4 ? "#1d1a2b" : "#fff"}` },
            h("span", { class: "dots" }, h("i", { style: "background:" + pl.a }), h("i", { style: "background:" + pl.b })), pl.name);
        })),
        h("div", { class: "row", style: "flex-wrap:wrap;gap:10px" }, inp("bg", t("c_bg")), inp("a", t("c_1")), inp("b", t("c_2")))),
      h("div", { class: "card col" },
        h("h2", { style: "margin:0" }, t("sounds")), h("div", { class: "muted small" }, t("sounds_sub")),
        h("button", { class: "btn" + (sfx.on ? "" : " ghost"), onclick: () => { sfx.set(!sfx.on); renderNav(me); draw(); } }, sfx.on ? "🎵 " + t("on") : "🔇 " + t("off")),
        sfx.on ? h("div", { class: "muted small" }, t("sound_style")) : null,
        sfx.on ? h("div", { class: "chips sound-styles" }, ...SOUND_STYLES.map(st => h("button", { type: "button", class: "chip" + (sfx.style === st ? " act" : ""), "aria-pressed": String(sfx.style === st), "data-sfx": "none", onclick: () => { sfx.setStyle(st); draw(); } }, t("snd_" + st)))) : null),
      h("div", { class: "card col" }, h("h2", { style: "margin:0" }, t("install")), installBox()));
  };
  draw();
  $app.replaceChildren(box);
}

function followButton(me, user, onChange) {
  if (S.mode !== "cloud" || (me && me.id === user.id)) return null;
  let on = false;
  const b = h("button", { class: "btn follow", type: "button" }, t("follow"));
  const paint = () => { b.textContent = on ? t("following_btn") : t("follow"); b.classList.toggle("ghost", on); b.setAttribute("aria-pressed", String(on)); b.dataset.sfx = on ? "down" : "like"; };
  paint();
  if (me) S.isFollowing(user.id).then(v => { on = v; paint(); }).catch(() => {});
  b.onclick = async () => {
    if (!me) { toast(t("login_needed")); return needProfile(); }
    b.disabled = true;
    try { if (on) await S.unfollow(user.id); else await S.follow(user.id); on = !on; paint(); onChange?.(on); }
    catch (e) { toast(friendly(e)); }
    b.disabled = false;
  };
  return b;
}

function userRow(me, u) {
  const row = h("div", { class: "user-row" },
    h("a", { class: "row", href: "#/u/" + u.username, style: "flex:1;min-width:0;text-decoration:none" }, avatar(u),
      h("div", { style: "min-width:0" },
        h("div", { class: "author", style: "overflow:hidden;text-overflow:ellipsis;white-space:nowrap" }, u.display_name || u.username),
        h("div", { class: "muted small", style: "overflow:hidden;text-overflow:ellipsis;white-space:nowrap" }, "@" + u.username + (u.bio ? " · " + u.bio : "")))),
    followButton(me, u));
  return row;
}

async function viewSearch(me) {
  const input = h("input", { type: "search", placeholder: t("find_ph"), "aria-label": t("find_ph"), maxlength: 40, autocomplete: "off", autocapitalize: "none" });
  const title = h("h3", { class: "muted", style: "margin:4px 4px 10px;font-size:14px" }, t("find_new"));
  const results = h("div", { class: "card col", style: "gap:4px" });
  let seq = 0, timer;
  const run = async () => {
    const my = ++seq, q = input.value.trim();
    title.textContent = q ? "" : t("find_new");
    try {
      const users = await S.searchUsers(q);
      if (my !== seq) return;
      results.replaceChildren(...(users.length ? users.map(u => userRow(me, u)) : [h("div", { class: "empty", style: "padding:20px" }, t("find_none"))]));
    } catch (e) { if (my === seq) results.replaceChildren(h("div", { class: "empty" }, friendly(e))); }
  };
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(run, 300); });
  $app.replaceChildren(h("div", { class: "card", style: "padding:10px" }, input), title, results);
  input.focus(); run();
}

async function viewProfile(me, username, wantMonth, tab) {
  const p = me && me.username === username ? me : await S.profileByUsername(username);
  if (!p) return $app.replaceChildren(h("div", { class: "empty" }, t("not_found")));
  const isMe = me && me.id === p.id;
  const content = h("div", null);
  const tabs = h("div", { class: "tabs", role: "tablist" });
  const show = async which => {
    [...tabs.children].forEach((b, i) => { b.classList.toggle("act", i === which); b.setAttribute("aria-selected", String(i === which)); });
    content.replaceChildren(h("div", { class: "empty" }, "…"));
    try {
      if (which === 0) {
        const now = monthKey();
        const months = await S.topMonths(p.id);
        let month = wantMonth && MONTH_RE.test(wantMonth) ? wantMonth : (months.includes(now) || isMe || !months.length ? now : months[0]);
        const opts = [...new Set([...(isMe ? [now] : []), ...months, month])].sort().reverse();
        const body = h("div", null);
        const drawMonth = async () => {
          stopAudio();
          body.replaceChildren(h("div", { class: "empty" }, "…"));
          const top = await S.top(p.id, month);
          const url = location.href.split("#")[0] + "#/u/" + p.username + "/" + month;
          const head = h("div", { class: "row", style: "margin-bottom:10px" },
            h("h3", { style: "margin:0;flex:1" }, t("top_title", { m: monthLabel(month) })),
            top.length ? h("button", { class: "icon-btn", onclick: () => shareLink(url, t("top_title", { m: monthLabel(month) }) + " · @" + p.username) }, t("share") + " ↗") : null);
          if (top.length) body.replaceChildren(h("div", { class: "card" }, head, h("div", { class: "top-list" }, ...top.map(s => trackRow(s, { link: true }))),
            isMe && month === now ? h("a", { class: "btn ghost", href: "#/top", style: "display:inline-block;text-decoration:none;margin-top:12px" }, t("edit_top")) : null));
          else if (isMe && month === now) body.replaceChildren(h("div", { class: "card col", style: "text-align:center" },
            h("div", { class: "muted" }, t("top_empty_me", { m: monthLabel(month) })),
            h("a", { class: "btn", href: "#/top", style: "text-decoration:none;align-self:center" }, t("build_top"))));
          else body.replaceChildren(h("div", { class: "empty" }, months.length ? t("no_top_month", { m: monthLabel(month) }) : t("no_top")));
        };
        const picker = opts.length > 1 ? h("select", { "aria-label": t("month"), style: "margin-bottom:12px" }, ...opts.map(m => h("option", { value: m, selected: m === month }, monthLabel(m)))) : null;
        picker?.addEventListener("change", () => { month = picker.value; drawMonth(); });
        const y = String(new Date().getFullYear());
        const cap = months.length ? h("a", { class: "btn ghost capsule-cta", href: "#/u/" + p.username + "/capsula/" + y }, isMe ? t("capsule_cta", { y }) : t("capsule_cta_other", { y })) : null;
        content.replaceChildren(...[cap, picker, body].filter(Boolean));
        await drawMonth();
      } else {
        if (which === 1) {
          const list = await S.albums(p.id);
          content.replaceChildren(
            isMe ? h("a", { class: "btn", href: "#/album/nuevo", style: "display:block;text-align:center;text-decoration:none;margin-bottom:14px" }, "+ " + t("album_new")) : null,
            list.length ? h("div", { class: "albums" }, ...list.map(a => albumTile(a, p))) : h("div", { class: "empty" }, isMe ? t("album_empty_me") : t("album_empty")));
          return;
        }
        const [posts, duels] = await Promise.all([S.userPosts(p.id), S.duels(null, p.id).catch(() => [])]);
        const items = [...posts.map(x => ({ at: x.created_at, el: () => postCard(x, me, () => show(2)) })), ...duels.filter(d => S.mode === "cloud" || isMe).map(d => ({ at: d.created_at, el: () => duelCard(d, me) }))].sort((a, b) => b.at.localeCompare(a.at));
        content.replaceChildren(...(items.length ? items.map(x => x.el()) : [h("div", { class: "empty" }, t("no_posts"))]));
      }
    } catch { content.replaceChildren(h("div", { class: "empty" }, t("error"))); }
  };
  tabs.append(h("button", { role: "tab", onclick: () => show(0) }, t("tab_top")), h("button", { role: "tab", onclick: () => show(1) }, t("albums")), h("button", { role: "tab", onclick: () => show(2) }, t("posts")));
  const counts = h("div", { class: "small", style: "margin-top:4px" });
  let nums = { followers: 0, following: 0 };
  const paintCounts = () => counts.replaceChildren(h("b", null, String(nums.followers)), " " + t("followers") + " · ", h("b", null, String(nums.following)), " " + t("following"));
  if (S.mode === "cloud") S.counts(p.id).then(c => { nums = c; paintCounts(); }).catch(() => {});
  const fb = isMe ? null : followButton(me, p, on => { nums.followers += on ? 1 : -1; paintCounts(); });
  const compatSlot = h("div", null);
  if (!isMe && me && S.mode === "cloud") Promise.all([S.musicOf(me.id), S.musicOf(p.id)]).then(([a, b]) => compatSlot.replaceChildren(compatBox(a, b, p.username))).catch(() => {});
  const head = h("div", { class: "card profile-head" },
      h("div", { class: "row" }, avatar(p, true),
        h("div", { style: "flex:1;min-width:0" },
          h("h2", { style: "margin:0;overflow-wrap:anywhere" }, p.display_name || p.username),
          h("div", { class: "muted" }, "@" + p.username + (p.country ? " · " + regionName(p.country) : "")),
          counts)),
      p.bio ? h("p", { class: "text" }, p.bio) : null,
      p.song && p.song.name ? h("div", { class: "sotd" },
        h("div", { class: "row", style: "justify-content:space-between" }, h("div", { class: "kicker" }, "🎵 " + (Date.now() - new Date(p.song.at || 0) < 864e5 ? t("sotd") : t("sotd_old"))),
          isMe ? h("a", { class: "icon-btn small", href: "#/cancion" }, t("sotd_change")) : null),
        trackRow(p.song, { start: p.song.start || 0, link: true, clipLabel: true }))
        : isMe ? h("a", { class: "sotd empty-sotd", href: "#/cancion" }, "🎵 " + t("sotd_set"), h("div", { class: "muted small" }, t("sotd_none"))) : null,
      !isMe && me && S.mode === "cloud" ? compatSlot : null,
      !isMe && me && S.mode === "cloud" ? h("a", { class: "btn ghost", href: "#/nuevo/para/" + p.username, style: "display:block;text-align:center;text-decoration:none;margin-top:10px" }, t("dedicate_btn")) : null,
      isMe ? h("div", { class: "row", style: "margin-top:8px;flex-wrap:wrap;gap:8px" },
        h("a", { class: "btn", href: "#/top", style: "text-decoration:none" }, t("my_top")),
        h("a", { class: "btn ghost", href: "#/editar", style: "text-decoration:none" }, t("edit"))) : null);
  let isBlocked = false;
  if (!isMe && me && S.mode === "cloud") isBlocked = (await S.blockedIds()).has(p.id);
  const blockBtn = !isMe && me && S.mode === "cloud" ? h("button", { class: "icon-btn small", "data-sfx": "down", onclick: async () => {
    if (!isBlocked && !confirm(t("block_confirm", { u: p.username }))) return;
    try { if (isBlocked) await S.unblock(p.id); else await S.block(p.id); route(); } catch (e) { toast(friendly(e)); }
  } }, isBlocked ? t("unblock") : t("block")) : null;
  if (fb || blockBtn) head.append(h("div", { class: "row", style: "margin-top:10px;justify-content:space-between" }, isBlocked ? h("span", { class: "muted small" }, t("blocked")) : fb, blockBtn));
  if (isBlocked) { $app.replaceChildren(head); return; }
  if (!isMe) applyVars(head, p.theme); // el perfil de cada persona se ve con SUS colores
  $app.replaceChildren(head, tabs, content);
  show(tab === "albums" ? 1 : 0);
}

const EYE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>', EYE_OFF_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
function viewLogin(startSignup) {
  let signup = false;
  const email = h("input", { type: "email", placeholder: t("email"), autocomplete: "email", maxlength: 254 });
  const pass = h("input", { type: "password", placeholder: t("password"), autocomplete: "current-password", minlength: 8, maxlength: 72 });
  const eye = h("button", { type: "button", class: "pw-eye", "aria-label": t("show_pw"), "aria-pressed": "false", "data-sfx": "soft", html: EYE_SVG });
  eye.onclick = () => { const show = pass.type === "password"; pass.type = show ? "text" : "password"; eye.innerHTML = show ? EYE_OFF_SVG : EYE_SVG; eye.setAttribute("aria-label", t(show ? "hide_pw" : "show_pw")); eye.setAttribute("aria-pressed", String(show)); pass.focus(); };
  const passBox = h("div", { class: "pw-wrap" }, pass, eye);
  const go = h("button", { class: "btn" }, t("signin"));
  const sw = h("button", { class: "icon-btn" }, t("no_acc"));
  const title = h("h2", { style: "margin:0" }, t("signin"));
  sw.onclick = () => { signup = !signup; go.textContent = title.textContent = signup ? t("signup") : t("signin"); sw.textContent = signup ? t("have_acc") : t("no_acc"); pass.autocomplete = signup ? "new-password" : "current-password"; };
  go.onclick = async () => {
    if (pass.value.length < 8) return toast(t("password"));
    go.disabled = true;
    try {
      if (signup) { const r = await S.signUp(email.value.trim(), pass.value); if (!r.session) { toast(t("check_email")); go.disabled = false; return; } }
      else await S.signIn(email.value.trim(), pass.value);
      state.session = await S.session(); location.hash = "#/yo"; route();
    } catch (e) { toast(friendly(e)); go.disabled = false; }
  };
  const PROVIDERS = { apple: { label: t("with_apple"), cls: "btn sso sso-apple", icon: '<svg viewBox="0 0 24 24"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9s-2-.9-3.4-.9c-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8 2.2-1.3 3.1-2.5c1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1-3.2-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.2-.6 2.9-1.4z"/></svg>' },
    facebook: { label: t("with_facebook"), cls: "btn sso sso-fb", icon: '<svg viewBox="0 0 24 24"><path d="M14 8V6c0-.9.6-1 1-1h3V1h-4c-4 0-5 3-5 5v2H6v4h3v11h5V12h3.5l.5-4z"/></svg>' } };
  const enabled = (window.CORO_CONFIG?.loginProviders || []).filter(p => PROVIDERS[p]);
  const sso = enabled.map(p => h("button", { class: PROVIDERS[p].cls, type: "button", onclick: async e => {
    const b = e.currentTarget; b.disabled = true;
    try { await S.signInWith(p); } catch (x) { toast(friendly(x)); b.disabled = false; }
  } }, h("span", { html: PROVIDERS[p].icon }), PROVIDERS[p].label));
  const guest = window.CORO_CONFIG?.allowGuest === false ? null : h("div", { class: "col", style: "border-top:1px solid var(--line);padding-top:12px;margin-top:4px" },
    h("button", { class: "btn ghost", type: "button", onclick: async e => {
      const b = e.currentTarget; b.disabled = true;
      try { await S.signInGuest(); state.session = await S.session(); location.hash = "#/yo"; route(); } catch (x) { toast(friendly(x)); b.disabled = false; }
    } }, t("guest")),
    h("div", { class: "muted small", style: "text-align:center" }, t("guest_sub")));
  if (startSignup) sw.onclick();
  $app.replaceChildren(h("a", { class: "icon-btn", href: "#/bienvenida", style: "margin-bottom:8px" }, "← Coro"), h("div", { class: "card col" }, title, ...sso, sso.length ? h("div", { class: "muted small", style: "text-align:center" }, t("or_email")) : null, email, passBox, go, sw, guest));
}

function viewWelcome() {
  document.body.classList.add("welcome-mode");
  const cloud = S.mode === "cloud";
  const guestAllowed = window.CORO_CONFIG?.allowGuest !== false;
  const guest = async e => {
    const b = e.currentTarget; b.disabled = true;
    try { await S.signInGuest(); state.session = await S.session(); location.hash = "#/yo"; } catch (x) { toast(friendly(x)); b.disabled = false; }
  };
  $app.replaceChildren(h("div", { class: "welcome" },
    h("div", { class: "w-orbit", "aria-hidden": "true" }, h("i", { class: "wave" }), h("i", { class: "wave w2" }), h("i", { class: "wave w3" }), h("i", { class: "wave w4" }), h("div", { class: "disc huge spin" }, h("span", { class: "vinyl" }))),
    h("div", { class: "w-logo", role: "img", "aria-label": "Coro", html: document.querySelector(".logo")?.innerHTML || "Coro" }),
    h("p", { class: "w-tag" }, t("w_tag")),
    h("ul", { class: "w-feats" }, h("li", null, t("w_f1")), h("li", null, t("w_f2")), h("li", null, t("w_f3"))),
    h("div", { class: "col", style: "width:100%;max-width:360px" },
      cloud ? h("a", { class: "btn", "data-sfx": "ok", href: "#/entrar/crear", style: "text-align:center;text-decoration:none" }, t("w_create"))
        : h("a", { class: "btn", "data-sfx": "ok", href: "#/yo", style: "text-align:center;text-decoration:none" }, t("w_start")),
      cloud ? h("a", { class: "btn ghost", href: "#/entrar", style: "text-align:center;text-decoration:none" }, t("w_login")) : null,
      cloud && guestAllowed ? h("button", { class: "icon-btn", style: "justify-content:center", onclick: guest }, t("w_guest")) : null),
    h("div", { class: "muted small", style: "text-align:center" }, t("w_terms") + " ", h("a", { href: "privacidad.html" }, t("w_privacy")), ".")));
  $app.append(eqBars());
}

function needProfile() { location.hash = S.mode === "cloud" && !state.session ? "#/entrar" : "#/yo"; }

async function route() {
  stopAudio();
  const hash = decodeURIComponent(location.hash || "#/");
  let me = null;
  try { state.session = await S.session(); me = state.session ? await S.me() : null; } catch {}
  if (/[?&](code|error)=/.test(location.search)) history.replaceState(null, "", location.pathname + location.hash);
  if (S.mode === "cloud" && state.session && !me && hash !== "#/yo") { location.hash = "#/yo"; return; }
  document.body.classList.remove("welcome-mode");
  // Como Instagram: si no tienes perfil, lo primero es entrar o crear la cuenta (los enlaces compartidos sí se pueden ver)
  const open = hash === "#/yo" || hash.startsWith("#/entrar") || hash.startsWith("#/u/");
  if (!me && !open) { renderNav(me); return viewWelcome(); }
  if (me?.country) state.country = me.country;
  if (me?.theme && !theme.get() && themeVars(me.theme)) theme.set(me.theme);
  renderNav(me);
  window.scrollTo(0, 0);
  if (!calm()) { $app.classList.remove("page-in"); void $app.offsetWidth; $app.classList.add("page-in"); }
  try {
    if (hash === "#/nuevo") return viewCompose(me);
    if (hash.startsWith("#/nuevo/para/")) return await viewCompose(me, hash.slice(13).toLowerCase());
    if (hash === "#/cancion") return await viewSongEditor(me);
    if (hash.startsWith("#/emocion/")) return await viewFeed(me, hash.slice(10));
    if (hash === "#/entrar" || hash === "#/entrar/crear") return S.mode === "cloud" ? viewLogin(hash === "#/entrar/crear") : (location.hash = "#/yo");
    if (hash === "#/yo") {
      if (S.mode === "cloud" && !state.session) return viewLogin();
      return me ? (location.hash = "#/u/" + me.username) : viewEdit(null, true);
    }
    if (hash === "#/editar") return me ? viewEdit(me, false) : needProfile();
    if (hash === "#/top") return await viewTopEditor(me);
    if (hash === "#/ajustes") return await viewSettings(me);
    if (hash === "#/buscar") return await viewSearch(me);
    if (hash === "#/actividad") return await viewActivity(me);
    if (hash.startsWith("#/album/")) return await viewAlbumEditor(me, hash.slice(8));
    if (hash.startsWith("#/u/")) {
      const [u, m, id] = hash.slice(4).split("/");
      if (m === "a" && id) return await viewAlbum(me, u.toLowerCase(), id);
      if (m === "capsula") return await viewCapsule(me, u.toLowerCase(), id);
      return await viewProfile(me, u.toLowerCase(), m === "albums" ? null : m, m === "albums" ? "albums" : null);
    }
    return viewFeed(me);
  } catch { $app.replaceChildren(h("div", { class: "empty" }, t("error"))); }
}

async function init() {
  const cfg = window.CORO_CONFIG || {};
  try { S = cfg.supabaseUrl && cfg.supabaseAnonKey ? await CloudStore(cfg) : LocalStore(); }
  catch { S = LocalStore(); }
  window.addEventListener("hashchange", route);
  route();
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost"))
    navigator.serviceWorker.register("sw.js").catch(() => {});
}
init();
})();
