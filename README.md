# Bilancio Website

Sitio público y comercial de Bilancio. Presenta el producto y sus funcionalidades; no forma parte de la aplicación autenticada ni consulta la API.

## Responsabilidad y arquitectura

El producto se organiza en tres dominios independientes:

- `bilancioapp.com`: website comercial.
- `app.bilancioapp.com`: aplicación Angular autenticada.
- `api.bilancioapp.com`: API Symfony.

La website no gestiona autenticación ni datos financieros privados y no requiere una dependencia funcional con la aplicación.

## Tecnología prevista

Astro 7, TypeScript y CSS nativo con generación estática. Cloudflare Pages publica el sitio; el proyecto se despliega desde `main` y los pull requests generan previews mediante la integración existente de Cloudflare Pages.

## Estado

Las cuatro páginas comerciales públicas están implementadas y las demostraciones principales usan capturas auténticas de Angular con datos sintéticos. No representan información financiera real.

## Desarrollo local

Se fijan Node.js `22.23.4` y npm `10.9.9`. NVM puede leer `.nvmrc`; `.node-version` conserva el formato usado por `bilancio-frontend` y otras herramientas.

```bash
nvm install
nvm use
node --version
npm --version
npm ci
npm run dev
```

Los comandos de calidad y build son:

```bash
npm run check
npm run build
npm run check:static
npm run preview
```

`check` ejecuta `astro check` para diagnósticos de componentes Astro y TypeScript. `check:static` inspecciona el HTML en `dist/`: rutas, títulos, descripciones, canonical, sitemap, robots, 404, enlaces internos, CTA de autenticación y recursos locales. Ejecutá `npm run build` antes de `npm run check:static`; para validar una copia de prueba podés definir `STATIC_SITE_DIST`.

GitHub Actions ejecuta `npm ci`, `npm run check`, `npm run build` y `npm run check:static` en pull requests dirigidos a `develop` o `main`. El workflow sólo valida; no despliega ni modifica infraestructura.

Estos checks no comprueban el status HTTP del hosting, navegación en navegador, layout responsive, accesibilidad completa ni enlaces externos remotos. El archivo `404.html` se comprueba por su metadato `noindex`; la respuesta HTTP 404 requiere una prueba en hosting/preview.

## Estructura

- `src/pages/`: rutas estáticas. La navegación sólo enlaza rutas existentes.
- `src/layouts/BaseLayout.astro`: documento HTML, idioma, metadatos por página, canonical, Open Graph/Twitter, header, contenido y footer.
- `src/components/`: navegación compartida y placeholder estructural.
- `src/styles/global.css`: tokens visuales y estilos base responsive.
- `src/assets/brand/`: logo oficial procesado y optimizado por Astro.
- `public/favicon.ico`: favicon oficial compartido con la aplicación.
- `public/licenses/fonts/`: licencias de las fuentes distribuidas con el sitio.
- `dist/`: salida HTML estática de `npm run build`; es generada y no se versiona.

Las fuentes Newsreader y Plus Jakarta Sans se incluyen localmente mediante paquetes Fontsource. El build no depende de Google Fonts, API, base de datos ni runtime de aplicación. El modo de salida `static` está fijado en `astro.config.ts`.

El logo fuente (`bilancio-frontend/public/logo-bilancio.png`) y el favicon (`bilancio-frontend/public/favicon.ico`) se reutilizan en este sitio; Angular también emplea el logo verde en su shell. El repositorio Angular conserva además una variante celeste en `src/assets/images/`, que el shell actual no usa y que no se copió. La copia del logo elegido está en `src/assets/brand/logo-bilancio.png` y se transforma a WebP durante el build mediante `astro:assets`; el favicon está en `public/favicon.ico`. No se encontró una licencia o atribución separada para esos archivos. Su origen queda atribuido al [repositorio bilancio-frontend](https://github.com/02Nico02/bilancio-frontend/tree/main/public), y el código fuente de cada repositorio mantiene builds independientes.

## Build y hosting

`npm run build` genera el sitio estático en `dist/`. Cloudflare Pages usa `npm run build` y `dist`; los despliegues son gestionados por Cloudflare Pages, fuera del workflow de validación de este repositorio.

## Documentación

- [AGENTS.md](AGENTS.md): convenciones y router contextual para agentes.
- [Índice documental](docs/README.md): fuentes de verdad y navegación de la documentación.

La captura del hero procede del escenario sintético `showcase:home` de [frontend #420](https://github.com/02Nico02/bilancio-frontend/pull/426). La versión de escritorio recorta el panel completo de flujo mensual; la móvil conserva la captura completa. Ambas se convierten a WebP sin pérdida y mantienen ARS y USD separados.
