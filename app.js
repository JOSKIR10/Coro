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
    c_bg: "Fondo", c_1: "Color 1", c_2: "Color 2", sounds: "Notas musicales al tocar", sounds_sub: "Cada toque suena con una nota suave, en armonía.",
    on: "Activado", off: "Silenciado", install: "Instalar Coro en tu teléfono", install_btn: "Instalar app",
    install_ios: "En iPhone: toca el botón Compartir (cuadrado con flecha) y luego \"Agregar a inicio\".",
    install_android: "En Android: toca los ⋮ de Chrome y luego \"Instalar app\" o \"Agregar a pantalla principal\".",
    installed: "Ya está instalada 🎉", albums: "Álbumes", album_new: "Nuevo álbum", album_title: "Nombre del álbum",
    album_note: "¿Para quién es o de qué trata?", album_link: "Enlace a tu playlist (Spotify, Apple Music, YouTube Music, Deezer…) — opcional",
    album_link_bad: "Ese enlace no es de una app de música conocida", album_songs: "Canciones del álbum (máx. 25)",
    album_empty_me: "Crea álbumes de recomendación para tus amigos: \"Para correr\", \"Si estás triste\", \"Mi 2000s\"…",
    album_empty: "Todavía no tiene álbumes.", open_in: "Abrir playlist en {app}", album_del: "Borrar álbum", album_confirm_del: "¿Borrar este álbum?",
    songs_n: "{n} canciones", edit_album: "Editar álbum", tab_top: "Top 10", need_title: "Ponle nombre al álbum", cover: "Portada", back: "Volver",
    find: "Buscar", find_ph: "Busca personas por nombre o @usuario", find_new: "Recién llegados a Coro", find_none: "No encontramos a nadie con ese nombre",
    follow: "Seguir", following_btn: "Siguiendo", followers: "seguidores", following: "siguiendo", for_you: "Para ti", feed_following: "Siguiendo",
    empty_following: "Aún no sigues a nadie. Busca a tus amigos y síguelos para ver aquí su música.", find_friends: "Buscar amigos",
    hero: "Comparte el pedacito de canción que te eriza la piel.", hero_sub: "15 segundos, tu Top 10 de cada mes y álbumes para tus amigos. Solo música.", hero_cta: "Crear mi perfil",
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
    c_bg: "Background", c_1: "Color 1", c_2: "Color 2", sounds: "Musical notes on tap", sounds_sub: "Every tap plays a soft, in-tune note.",
    on: "On", off: "Muted", install: "Install Coro on your phone", install_btn: "Install app",
    install_ios: "On iPhone: tap Share (square with arrow), then \"Add to Home Screen\".",
    install_android: "On Android: tap Chrome's ⋮, then \"Install app\" or \"Add to Home screen\".",
    installed: "Already installed 🎉", albums: "Albums", album_new: "New album", album_title: "Album name",
    album_note: "Who is it for, or what is it about?", album_link: "Link to your playlist (Spotify, Apple Music, YouTube Music, Deezer…) — optional",
    album_link_bad: "That link isn't from a known music app", album_songs: "Album songs (max 25)",
    album_empty_me: "Make recommendation albums for your friends: \"For running\", \"If you're sad\", \"My 2000s\"…",
    album_empty: "No albums yet.", open_in: "Open playlist in {app}", album_del: "Delete album", album_confirm_del: "Delete this album?",
    songs_n: "{n} songs", edit_album: "Edit album", tab_top: "Top 10", need_title: "Give the album a name", cover: "Cover", back: "Back",
    find: "Search", find_ph: "Search people by name or @username", find_new: "New on Coro", find_none: "Nobody found with that name",
    follow: "Follow", following_btn: "Following", followers: "followers", following: "following", for_you: "For you", feed_following: "Following",
    empty_following: "You don't follow anyone yet. Find your friends and follow them to see their music here.", find_friends: "Find friends",
    hero: "Share the bit of a song that gives you chills.", hero_sub: "15 seconds, your monthly Top 10 and albums for your friends. Just music.", hero_cta: "Create my profile",
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
    [/provider is not enabled|unsupported provider/i, "Esa forma de entrar aún no está activada"], [/album limit/i, "Llegaste al máximo de 30 álbumes"], [/follow limit/i, "Has seguido a muchas personas hoy. Intenta mañana"],
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
function avatar(user, big) {
  const name = user.display_name || user.username || "?";
  return h("div", { class: "avatar" + (big ? " big" : ""), style: `background:hsl(${hue(user.username)} 65% 45%)`, "aria-hidden": "true" }, name.trim()[0]?.toUpperCase() || "?");
}
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

// ---------- Notas musicales suaves (Web Audio, escala pentatónica: siempre suenan en armonía) ----------
const sfx = (() => {
  let ctx = null, step = 0;
  const KEY = "coro_sound";
  const PENTA = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51]; // Do mayor pentatónica
  const get = () => { try { return localStorage.getItem(KEY) !== "0"; } catch { return true; } };
  let on = get();
  function tone(freq, when, dur, vol) {
    const o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o2.type = "triangle"; o.frequency.value = freq; o2.frequency.value = freq * 2;
    const g2 = ctx.createGain(); g2.gain.value = 0.15;
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(ctx.destination);
    const t0 = ctx.currentTime + when;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.start(t0); o2.start(t0); o.stop(t0 + dur + 0.05); o2.stop(t0 + dur + 0.05);
  }
  function play(kind = "tap") {
    if (!on) return;
    try {
      ctx ||= new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      const v = 0.05;
      if (kind === "ok") [0, 2, 4, 5].forEach((n, i) => tone(PENTA[n], i * 0.07, 0.6, v));          // guardar / publicar: arpegio
      else if (kind === "like") { tone(PENTA[4], 0, 0.35, v); tone(PENTA[7], 0.08, 0.5, v); }      // me gusta: salto alegre
      else if (kind === "soft") tone(PENTA[step++ % 5] / 2, 0, 0.18, v * 0.35);                    // teclear: muy suave
      else if (kind === "down") { tone(PENTA[3], 0, 0.3, v); tone(PENTA[0], 0.08, 0.45, v); }      // quitar / borrar
      else { const seq = [0, 1, 2, 3, 4, 3, 2, 1]; tone(PENTA[seq[step++ % seq.length]], 0, 0.4, v); } // toque normal: melodía
    } catch {}
  }
  return { play, get on() { return on; }, set(v) { on = v; try { localStorage.setItem(KEY, v ? "1" : "0"); } catch {} if (v) play("ok"); } };
})();
document.addEventListener("pointerdown", e => {
  const el = e.target.closest("button, a, select, input[type=range], input[type=color], .track[onclick], .results .track");
  if (!el || el.disabled) return;
  sfx.play(el.dataset.sfx || "tap");
}, { capture: true, passive: true });
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
  db.albums ||= [];
  if (!db.tops) { db.tops = {}; if (db.top?.length) db.tops[monthKey()] = db.top; delete db.top; } // datos de la versión anterior
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch {} };
  const decorate = p => ({ ...p, user: db.me, likes: db.likes[p.id] ? 1 : 0, liked: !!db.likes[p.id] });
  return {
    mode: "local",
    async session() { return db.me ? { id: "local" } : null; },
    async me() { return db.me; },
    async saveProfile(p) { db.me = { id: "local", ...db.me, ...p }; save(); return db.me; },
    async profileByUsername(u) { return db.me && db.me.username === u ? db.me : null; },
    async feed() { return db.posts.map(decorate); },
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
    id: r.id, text: r.text, clip_start: r.clip_start, created_at: r.created_at,
    track: { id: r.track_id, name: r.track_name, artist: r.artist_name, art: r.artwork_url, preview: r.preview_url, url: r.track_url },
    user: r.profiles ? { id: r.user_id, ...r.profiles } : { id: r.user_id },
    likes: r.likes?.[0]?.count || 0, liked: mine.has(r.id)
  });
  const err = e => { if (e) { const x = new Error(e.message); x.code = e.code; throw x; } };
  async function withLikes(rows) {
    const id = await uid(); let mine = new Set();
    if (id && rows.length) {
      const { data } = await sb.from("likes").select("post_id").eq("user_id", id).in("post_id", rows.map(r => r.id));
      mine = new Set((data || []).map(x => x.post_id));
    }
    return rows.map(r => fromRow(r, mine));
  }
  const POST_SEL = "id,user_id,text,track_id,track_name,artist_name,artwork_url,preview_url,track_url,clip_start,created_at,profiles(username,display_name),likes(count)";
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
    async feed(scope) {
      let q = sb.from("posts").select(POST_SEL).order("created_at", { ascending: false }).limit(50);
      if (scope === "following") {
        const id = await uid(); if (!id) return [];
        const { data: f, error: fe } = await sb.from("follows").select("followee").eq("follower", id).limit(1000); err(fe);
        const ids = (f || []).map(x => x.followee);
        if (!ids.length) return [];
        q = q.in("user_id", [...ids, id]);
      }
      const { data, error } = await q; err(error); return withLikes(data);
    },
    async searchUsers(term) {
      const q = clean(term, 40).toLowerCase().replace(/^@/, "").replace(/[^a-z0-9_ áéíóúüñ.-]/gi, "");
      let req = sb.from("profiles").select("id,username,display_name,bio,country,theme").limit(25);
      req = q ? req.or(`username.ilike.%${q.replace(/[ ]/g, "_")}%,display_name.ilike.%${q}%`) : req.order("created_at", { ascending: false });
      const { data, error } = await req; err(error); return data || [];
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
      const { error } = await sb.from("posts").insert({ text: p.text, clip_start: p.clip_start, track_id: p.track.id, track_name: p.track.name, artist_name: p.track.artist, artwork_url: p.track.art, preview_url: p.track.preview, track_url: p.track.url });
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
  sb.auth.onAuthStateChange(() => { meCache = undefined; });
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
  hdr.replaceChildren(snd, h("a", { class: "icon-btn", href: "#/ajustes", "aria-label": t("settings"), html: ICON.gear }));
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
      likeBtn.classList.toggle("on", p.liked); likeBtn.setAttribute("aria-pressed", String(p.liked)); likeBtn.lastChild.textContent = p.likes; }
    catch { toast(t("error")); }
  };
  const actions = [likeBtn];
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
    p.text ? h("p", { class: "text" }, p.text) : h("div", { style: "height:10px" }),
    trackRow(p.track, { start: p.clip_start, link: true, clipLabel: true }),
    h("div", { class: "actions" }, ...actions));
}

async function viewFeed(me) {
  const list = h("div", null, h("div", { class: "empty" }, "…"));
  const parts = [];
  if (!me) parts.push(h("div", { class: "card hero" },
    h("div", { class: "hero-notes", "aria-hidden": "true" }, "♪ ♫ ♩ ♬"),
    h("h1", null, t("hero")), h("p", { class: "muted" }, t("hero_sub")),
    h("a", { class: "btn", href: "#/yo", style: "text-decoration:none;align-self:flex-start" }, t("hero_cta"))));
  if (S.mode === "local") parts.push(h("div", { class: "banner" }, t("demo")));
  let scope = "all";
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
      const posts = await S.feed(scope);
      const empty = scope === "following"
        ? h("div", { class: "empty col", style: "align-items:center" }, t("empty_following"), h("a", { class: "btn", href: "#/buscar", style: "text-decoration:none" }, t("find_friends")))
        : h("div", { class: "empty" }, t("empty_feed"));
      list.replaceChildren(...(posts.length ? posts.map(p => postCard(p, me, load)) : [empty]));
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

async function viewCompose(me) {
  if (!me) return needProfile();
  let track = null, start = 0;
  const text = h("textarea", { maxlength: MAX_TEXT, placeholder: t("write"), "aria-label": t("write") });
  const count = h("div", { class: "count" }, "0/" + MAX_TEXT);
  text.addEventListener("input", () => { count.textContent = text.value.length + "/" + MAX_TEXT; });
  const chosen = h("div", { class: "col" });
  const pub = h("button", { class: "btn", disabled: true, "data-sfx": "ok" }, t("publish"));
  const renderChosen = () => {
    if (!track) return chosen.replaceChildren();
    const lblText = () => t("from") + " " + start + " → " + (start + CLIP) + " s";
    const lbl = h("span", null, lblText());
    const slider = h("input", { class: "slider", type: "range", min: 0, max: CLIP, step: 1, value: start, "aria-label": t("from") });
    slider.addEventListener("input", () => { start = +slider.value; lbl.textContent = lblText(); stopAudio(); preview.replaceChildren(trackRow(track, { start })); });
    const preview = h("div", null, trackRow(track, { start }));
    chosen.replaceChildren(preview, h("label", null, t("clip")), slider, h("div", { class: "muted small" }, lbl));
  };
  const search = songSearch(s => { track = s; start = 0; pub.disabled = false; renderChosen(); search.querySelector(".results").replaceChildren(); });
  pub.onclick = async () => {
    if (!track) return toast(t("need_song"));
    pub.disabled = true; pub.textContent = t("publishing");
    try {
      await S.createPost({ text: clean(text.value, MAX_TEXT), track, clip_start: start, user_id: me.id });
      stopAudio(); toast(t("posted")); location.hash = "#/";
    } catch (e) { toast(friendly(e)); pub.disabled = false; pub.textContent = t("publish"); }
  };
  $app.replaceChildren(h("div", { class: "card col" },
    h("h2", { style: "margin:0" }, t("new")),
    text, count, h("label", null, t("pick_song")), search, chosen,
    h("div", { class: "row" }, h("span", { class: "muted small", style: "flex:1" }, t("privacy")), pub)));
  text.focus();
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
  const parts = [h("div", { class: "card col" },
    h("h2", { style: "margin:0" }, first ? t("welcome") : t("edit")),
    first ? h("div", { class: "muted" }, t("welcome_sub")) : null,
    h("label", null, t("username")), u, h("label", null, t("display")), d, h("label", null, t("bio")), b, h("label", null, t("country")), c, save)];
  $app.replaceChildren(...parts);
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
        h("button", { class: "btn" + (sfx.on ? "" : " ghost"), onclick: () => { sfx.set(!sfx.on); renderNav(me); draw(); } }, sfx.on ? "🎵 " + t("on") : "🔇 " + t("off"))),
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
        content.replaceChildren(...[picker, body].filter(Boolean));
        await drawMonth();
      } else {
        if (which === 1) {
          const list = await S.albums(p.id);
          content.replaceChildren(
            isMe ? h("a", { class: "btn", href: "#/album/nuevo", style: "display:block;text-align:center;text-decoration:none;margin-bottom:14px" }, "+ " + t("album_new")) : null,
            list.length ? h("div", { class: "albums" }, ...list.map(a => albumTile(a, p))) : h("div", { class: "empty" }, isMe ? t("album_empty_me") : t("album_empty")));
          return;
        }
        const posts = await S.userPosts(p.id);
        content.replaceChildren(...(posts.length ? posts.map(x => postCard(x, me, () => show(2))) : [h("div", { class: "empty" }, t("no_posts"))]));
      }
    } catch { content.replaceChildren(h("div", { class: "empty" }, t("error"))); }
  };
  tabs.append(h("button", { role: "tab", onclick: () => show(0) }, t("tab_top")), h("button", { role: "tab", onclick: () => show(1) }, t("albums")), h("button", { role: "tab", onclick: () => show(2) }, t("posts")));
  const counts = h("div", { class: "small", style: "margin-top:4px" });
  let nums = { followers: 0, following: 0 };
  const paintCounts = () => counts.replaceChildren(h("b", null, String(nums.followers)), " " + t("followers") + " · ", h("b", null, String(nums.following)), " " + t("following"));
  if (S.mode === "cloud") S.counts(p.id).then(c => { nums = c; paintCounts(); }).catch(() => {});
  const fb = isMe ? null : followButton(me, p, on => { nums.followers += on ? 1 : -1; paintCounts(); });
  const head = h("div", { class: "card profile-head" },
      h("div", { class: "row" }, avatar(p, true),
        h("div", { style: "flex:1;min-width:0" },
          h("h2", { style: "margin:0;overflow-wrap:anywhere" }, p.display_name || p.username),
          h("div", { class: "muted" }, "@" + p.username + (p.country ? " · " + regionName(p.country) : "")),
          counts)),
      p.bio ? h("p", { class: "text" }, p.bio) : null,
      isMe ? h("div", { class: "row", style: "margin-top:8px;flex-wrap:wrap;gap:8px" },
        h("a", { class: "btn", href: "#/top", style: "text-decoration:none" }, t("my_top")),
        h("a", { class: "btn ghost", href: "#/editar", style: "text-decoration:none" }, t("edit"))) : null);
  if (fb) head.append(h("div", { style: "margin-top:10px" }, fb));
  if (!isMe) applyVars(head, p.theme); // el perfil de cada persona se ve con SUS colores
  $app.replaceChildren(head, tabs, content);
  show(tab === "albums" ? 1 : 0);
}

function viewLogin() {
  let signup = false;
  const email = h("input", { type: "email", placeholder: t("email"), autocomplete: "email", maxlength: 254 });
  const pass = h("input", { type: "password", placeholder: t("password"), autocomplete: "current-password", minlength: 8, maxlength: 72 });
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
  $app.replaceChildren(h("div", { class: "card col" }, title, ...sso, sso.length ? h("div", { class: "muted small", style: "text-align:center" }, t("or_email")) : null, email, pass, go, sw, guest));
}

function needProfile() { location.hash = S.mode === "cloud" && !state.session ? "#/entrar" : "#/yo"; }

async function route() {
  stopAudio();
  const hash = decodeURIComponent(location.hash || "#/");
  let me = null;
  try { state.session = await S.session(); me = state.session ? await S.me() : null; } catch {}
  if (/[?&](code|error)=/.test(location.search)) history.replaceState(null, "", location.pathname + location.hash);
  if (S.mode === "cloud" && state.session && !me && hash !== "#/yo") { location.hash = "#/yo"; return; }
  if (me?.country) state.country = me.country;
  if (me?.theme && !theme.get() && themeVars(me.theme)) theme.set(me.theme);
  renderNav(me);
  window.scrollTo(0, 0);
  try {
    if (hash === "#/nuevo") return viewCompose(me);
    if (hash === "#/entrar") return S.mode === "cloud" ? viewLogin() : (location.hash = "#/yo");
    if (hash === "#/yo") {
      if (S.mode === "cloud" && !state.session) return viewLogin();
      return me ? (location.hash = "#/u/" + me.username) : viewEdit(null, true);
    }
    if (hash === "#/editar") return me ? viewEdit(me, false) : needProfile();
    if (hash === "#/top") return await viewTopEditor(me);
    if (hash === "#/ajustes") return await viewSettings(me);
    if (hash === "#/buscar") return await viewSearch(me);
    if (hash.startsWith("#/album/")) return await viewAlbumEditor(me, hash.slice(8));
    if (hash.startsWith("#/u/")) {
      const [u, m, id] = hash.slice(4).split("/");
      if (m === "a" && id) return await viewAlbum(me, u.toLowerCase(), id);
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
