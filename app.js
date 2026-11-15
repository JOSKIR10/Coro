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
  user: '<svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5C21 16.5 17 14 12 14z"/></svg>'
};
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
function stopAudio() { player.audio.pause(); setBtn(player.btn, false, 0); player.btn = null; }
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
function trackRow(track, opts = {}) {
  const img = h("img", { src: SAFE_MEDIA.test(track.art) ? track.art : "", alt: "", loading: "lazy", width: 56, height: 56, decoding: "async" });
  return h("div", { class: "track" + (opts.sel ? " sel" : ""), onclick: opts.onclick },
    img,
    h("div", { class: "info" },
      h("div", { class: "name" }, track.name),
      h("div", { class: "artist" }, track.artist),
      opts.link && SAFE_LINK.test(track.url) ? h("a", { class: "apple", href: track.url, target: "_blank", rel: "noopener noreferrer" }, t("full_song") + " ↗") : null),
    opts.noPlay ? null : playButton(track, opts.start || 0),
    opts.extra || null);
}

// ---------- Datos: modo prueba (local) ----------
function LocalStore() {
  const KEY = "coro_demo_v1";
  let db; try { db = JSON.parse(localStorage.getItem(KEY)); } catch {}
  db ||= { me: null, posts: [], likes: {}, tops: {} };
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
    async userPosts() { return db.posts.map(decorate); },
    async createPost(p) { db.posts.unshift({ id: Date.now(), ...p, created_at: new Date().toISOString() }); save(); },
    async deletePost(id) { db.posts = db.posts.filter(p => p.id !== id); delete db.likes[id]; save(); },
    async toggleLike(post) { if (db.likes[post.id]) delete db.likes[post.id]; else db.likes[post.id] = 1; save(); },
    async top(_u, month) { return db.tops[month] || []; },
    async topMonths() { return Object.keys(db.tops).filter(k => db.tops[k].length).sort().reverse(); },
    async saveTop(list, month) { db.tops[month] = list.slice(0, MAX_TOP); save(); },
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
  const sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { auth: { persistSession: true, autoRefreshToken: true } });
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
    async feed() { const { data, error } = await sb.from("posts").select(POST_SEL).order("created_at", { ascending: false }).limit(50); err(error); return withLikes(data); },
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
  const link = (href, icon, label, cls = "") => h("a", { href, class: cls + (r === href ? " act" : ""), "aria-label": label }, h("span", { html: icon }), label);
  const nav = document.getElementById("nav");
  nav.replaceChildren(
    link("#/", ICON.home, t("feed")),
    link("#/nuevo", ICON.plus, t("new"), "plus"),
    link(me ? "#/u/" + me.username : "#/yo", ICON.user, t("me")));
  const hdr = document.getElementById("hdr");
  hdr.replaceChildren();
  if (S.mode === "cloud") {
    hdr.append(me || state.session
      ? h("button", { class: "icon-btn", onclick: async () => { await S.signOut(); state.session = null; location.hash = "#/"; route(); } }, t("logout"))
      : h("a", { class: "btn ghost", href: "#/entrar", style: "padding:6px 14px;text-decoration:none" }, t("login")));
  }
}

function postCard(p, me, onChange) {
  const mine = me && p.user.id === me.id;
  const likeBtn = h("button", { class: "icon-btn" + (p.liked ? " on" : ""), "aria-pressed": String(!!p.liked), "aria-label": t("like") },
    h("span", { html: ICON.heart }), h("span", null, String(p.likes || 0)));
  likeBtn.onclick = async () => {
    if (!me) return toast(t("login_needed"));
    try { await S.toggleLike(p); p.liked = !p.liked; p.likes += p.liked ? 1 : -1;
      likeBtn.classList.toggle("on", p.liked); likeBtn.setAttribute("aria-pressed", String(p.liked)); likeBtn.lastChild.textContent = p.likes; }
    catch { toast(t("error")); }
  };
  const actions = [likeBtn];
  if (mine) actions.push(h("button", { class: "icon-btn", "aria-label": t("del"), onclick: async () => {
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
    trackRow(p.track, { start: p.clip_start, link: true }),
    h("div", { class: "actions" }, ...actions));
}

async function viewFeed(me) {
  const list = h("div", null, h("div", { class: "empty" }, "…"));
  const parts = [];
  if (S.mode === "local") parts.push(h("div", { class: "banner" }, t("demo")));
  $app.replaceChildren(...parts, list);
  const load = async () => {
    try {
      const posts = await S.feed();
      list.replaceChildren(...(posts.length ? posts.map(p => postCard(p, me, load)) : [h("div", { class: "empty" }, t("empty_feed"))]));
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
  const pub = h("button", { class: "btn", disabled: true }, t("publish"));
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
    } catch (e) { toast(e.message || t("error")); pub.disabled = false; pub.textContent = t("publish"); }
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
        h("button", { class: "icon-btn", "aria-label": t("remove"), onclick: () => { list.splice(i, 1); draw(); } }, "✕")) }))),
      list.length < MAX_TOP ? songSearch(s => { if (!list.some(x => x.id === s.id)) list.push(s); draw(); }) : null,
      h("button", { class: "btn", onclick: async e => { e.target.disabled = true; try { await onSave(list); toast(t("saved")); } catch { toast(t("error")); } e.target.disabled = false; } }, t("save")));
  };
  draw();
  return box;
}

async function viewEdit(me, first) {
  const u = h("input", { type: "text", value: me?.username || "", maxlength: 20, autocapitalize: "none", autocomplete: "username", spellcheck: "false", "aria-label": t("username") });
  const d = h("input", { type: "text", value: me?.display_name || "", maxlength: 40, "aria-label": t("display") });
  const b = h("textarea", { maxlength: 160, "aria-label": t("bio"), style: "min-height:60px" }, me?.bio || "");
  const c = h("select", { "aria-label": t("country") }, ...[...new Set([state.country, ...COUNTRIES])].sort((a, z) => regionName(a).localeCompare(regionName(z), LANG)).map(code => h("option", { value: code, selected: code === (me?.country || state.country) }, regionName(code))));
  const save = h("button", { class: "btn" }, first ? t("start") : t("save"));
  save.onclick = async () => {
    const username = u.value.trim().toLowerCase();
    if (!USER_RE.test(username)) return toast(t("user_bad"));
    save.disabled = true;
    try {
      const p = await S.saveProfile({ username, display_name: clean(d.value, 40) || username, bio: clean(b.value, 160), country: c.value });
      state.country = p.country || c.value; try { localStorage.setItem("coro_country", state.country); } catch {}
      toast(t("saved")); location.hash = "#/u/" + p.username;
    } catch (e) { toast(e.message || t("error")); save.disabled = false; }
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

async function viewProfile(me, username, wantMonth) {
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
        const posts = await S.userPosts(p.id);
        content.replaceChildren(...(posts.length ? posts.map(x => postCard(x, me, () => show(1))) : [h("div", { class: "empty" }, t("no_posts"))]));
      }
    } catch { content.replaceChildren(h("div", { class: "empty" }, t("error"))); }
  };
  tabs.append(h("button", { role: "tab", onclick: () => show(0) }, t("top_month")), h("button", { role: "tab", onclick: () => show(1) }, t("posts")));
  $app.replaceChildren(
    h("div", { class: "card" },
      h("div", { class: "row" }, avatar(p, true),
        h("div", { style: "flex:1;min-width:0" },
          h("h2", { style: "margin:0;overflow-wrap:anywhere" }, p.display_name || p.username),
          h("div", { class: "muted" }, "@" + p.username + (p.country ? " · " + regionName(p.country) : "")))),
      p.bio ? h("p", { class: "text" }, p.bio) : null,
      isMe ? h("div", { class: "row", style: "margin-top:8px;flex-wrap:wrap;gap:8px" },
        h("a", { class: "btn", href: "#/top", style: "text-decoration:none" }, t("my_top")),
        h("a", { class: "btn ghost", href: "#/editar", style: "text-decoration:none" }, t("edit"))) : null),
    tabs, content);
  show(0);
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
    } catch (e) { toast(e.message || t("error")); go.disabled = false; }
  };
  $app.replaceChildren(h("div", { class: "card col" }, title, email, pass, go, sw));
}

function needProfile() { location.hash = S.mode === "cloud" && !state.session ? "#/entrar" : "#/yo"; }

async function route() {
  stopAudio();
  const hash = decodeURIComponent(location.hash || "#/");
  let me = null;
  try { state.session = await S.session(); me = state.session ? await S.me() : null; } catch {}
  if (me?.country) state.country = me.country;
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
    if (hash.startsWith("#/u/")) { const [u, m] = hash.slice(4).split("/"); return await viewProfile(me, u.toLowerCase(), m); }
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
