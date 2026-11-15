# Guía: abrir Coro al mundo, con inicio de sesión

Tu app ya está publicada en https://joskir10.github.io/Coro/ pero en **modo prueba**:
cada persona ve solo lo suyo. Para que haya cuentas reales y todos vean las publicaciones,
sigue estas partes en orden. Solo la Parte 1 es obligatoria; Facebook y Apple son opcionales.

Cuando termines cada parte, pásale a Claude lo que dice "Mándale a Claude" y él actualiza la app.

---

## Parte 1 · Base de datos y correo (gratis, unos 10 minutos)

1. Entra a **https://supabase.com** y toca **Start your project**.
2. Toca **Continue with GitHub** y acepta. (Usa la misma cuenta de GitHub de Coro.)
3. Toca **New project**.
   - **Name:** `Coro`
   - **Database Password:** toca **Generate a password** y guárdala en un lugar seguro.
   - **Region:** la más cercana a ti (por ejemplo, *East US* para América).
   - Toca **Create new project** y espera un par de minutos.
4. En el menú de la izquierda toca **SQL Editor** y luego **New query**.
5. Abre https://github.com/JOSKIR10/Coro/blob/main/supabase-esquema.sql , toca el botón de **copiar**
   (los dos cuadraditos arriba a la derecha del archivo), pégalo en Supabase y toca **Run**.
   Debe decir *Success*.
6. En el menú de la izquierda toca **Authentication** y luego **URL Configuration**.
   - **Site URL:** `https://joskir10.github.io/Coro/` y toca **Save**.
   - En **Redirect URLs** toca **Add URL**, pega `https://joskir10.github.io/Coro/` y guarda.
7. Toca el engrane **Project Settings** y luego **API** (o **Data API** / **API Keys**). Copia:
   - **Project URL** (algo como `https://abcd1234.supabase.co`)
   - La clave **anon public** (un texto largo que empieza con `eyJ`).

**Mándale a Claude:** el *Project URL* y la clave *anon public*.
Son públicas por diseño y es seguro compartirlas. **Nunca** compartas la clave `service_role`
ni la contraseña de la base de datos.

> Con esto ya funciona **entrar con correo**. Ojo: el correo de confirmación gratis de Supabase
> solo envía unos pocos correos por hora. Para muchos usuarios más adelante se conecta un servicio de correo.

---

## Parte 2 · Entrar con Facebook (gratis, unos 15 minutos)

Necesitas tu Project URL de la Parte 1. Tu dirección de regreso es:
`https://TU-PROYECTO.supabase.co/auth/v1/callback` (cambia `TU-PROYECTO` por el tuyo).

1. Entra a **https://developers.facebook.com** con tu Facebook y toca **Mis apps** → **Crear app**.
2. Ponle de nombre `Coro` y tu correo. Cuando pregunte el caso de uso, elige
   **Autenticar y solicitar datos a los usuarios con el inicio de sesión con Facebook**. Termina de crearla.
3. En el menú de la app abre **Casos de uso** → **Autenticar…** → **Personalizar** → **Configuración**
   (dentro de *Inicio de sesión con Facebook*).
   En **URI de redireccionamiento de OAuth válidos** pega tu dirección de regreso y guarda.
4. En **Configuración de la app** → **Básica**:
   - **URL de la política de privacidad:** `https://joskir10.github.io/Coro/privacidad.html`
   - **Eliminación de datos de usuario:** la misma dirección.
   - Copia el **Identificador de la app** y la **Clave secreta de la app** (toca *Mostrar*).
   - Guarda los cambios.
5. En Supabase: **Authentication** → **Sign In / Providers** (o **Providers**) → **Facebook**.
   Actívalo, pega el *Identificador* en **Client ID** y la *Clave secreta* en **Client Secret**, y guarda.
6. De vuelta en Facebook, cambia la app de **Desarrollo** a **Publicada** (arriba en la página)
   para que cualquier persona pueda entrar, no solo tú.

**Mándale a Claude:** "Facebook listo". (No hace falta mandar la clave secreta.)

---

## Parte 3 · Entrar con Apple (cuesta 99 USD al año)

Apple exige una cuenta del **Apple Developer Program**, que cuesta 99 dólares al año.
Recomendación: empieza con correo y Facebook, y agrega Apple cuando la app tenga usuarios
o cuando la publiques en la App Store (ahí la necesitarás de todos modos).

Cuando tengas la cuenta, los pasos son:
1. En https://developer.apple.com → **Certificates, Identifiers & Profiles**:
   - Crea un **App ID** con la casilla **Sign In with Apple**.
   - Crea un **Services ID** (por ejemplo `com.coro.web`). Actívale *Sign In with Apple* y en
     **Configure** pon el dominio `TU-PROYECTO.supabase.co` y la dirección de regreso de la Parte 2.
   - Crea una **Key** con *Sign In with Apple* y descarga el archivo `.p8` (solo se puede descargar una vez).
2. En Supabase → **Authentication** → **Providers** → **Apple**: actívalo y sigue sus instrucciones
   para pegar el Services ID y generar la clave secreta con el archivo `.p8`.
   Esa clave secreta caduca cada 6 meses y hay que renovarla.

**Mándale a Claude:** "Apple listo".

---

## Un detalle más

La página de privacidad (`privacidad.html`) dice que la gente puede escribirte para borrar su cuenta.
Dile a Claude qué **correo de contacto** quieres que aparezca ahí (puede ser uno nuevo solo para Coro).
