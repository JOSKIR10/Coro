// Configuración de Coro.
// Si dejas estos dos valores vacíos, la app funciona en "modo prueba":
// todo se guarda solo en este navegador (ideal para probarla).
// Para que sea una red social real (muchas personas, cuentas, likes),
// pega aquí los datos de tu proyecto gratuito de Supabase
// (Project Settings > API). La "anon key" es pública y segura de poner aquí:
// la seguridad la dan las reglas de la base de datos (supabase-esquema.sql).
window.CORO_CONFIG = {
  supabaseUrl: "https://hlsjqnsxyrmvvhuvopkr.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsc2pxbnN4eXJtdnZodXZvcGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3ODYyMDQsImV4cCI6MjExMDM2MjIwNH0.cMi5Owwd-LGNKj7daqujB3pleWUwv9ECKol_XbkyTMo",
  // Botones extra en "Entrar". Activa cada uno también en Supabase > Authentication > Providers.
  // Opciones: "apple", "facebook". Pon solo los que ya configuraste, por ejemplo: ["facebook"]
  loginProviders: [],
  // Permite "Entrar sin cuenta" (hay que activar "Allow anonymous sign-ins" en Supabase > Authentication > Sign In / Providers).
  allowGuest: true
};
