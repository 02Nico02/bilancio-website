# Bilancio Website

Sitio público y comercial de Bilancio. Presenta el producto y sus funcionalidades; no forma parte de la aplicación autenticada ni consulta la API.

## Responsabilidad y arquitectura

El producto se organiza en tres dominios independientes:

- `bilancioapp.com`: website comercial.
- `app.bilancioapp.com`: aplicación Angular autenticada.
- `api.bilancioapp.com`: API Symfony.

La website no gestiona autenticación ni datos financieros privados y no requiere una dependencia funcional con la aplicación.

## Tecnología prevista

Astro 7, TypeScript y CSS nativo con generación estática. Cloudflare Pages es el destino previsto; la infraestructura todavía no está configurada desde este repositorio.

## Estado

La base Astro está preparada y la Home comercial está implementada en una primera etapa de la Issue #3. Las otras páginas comerciales continúan estructurales y se completarán en el mismo trabajo.

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
npm run preview
```

`preview` sirve localmente el build ya generado. `check` ejecuta `astro check` para diagnósticos de componentes Astro y TypeScript. No hay linter ni suite E2E configurados: esta base pequeña se valida con el check, el build y revisión manual.

## Estructura

- `src/pages/`: rutas estáticas. La navegación sólo enlaza rutas existentes.
- `src/layouts/BaseLayout.astro`: documento HTML, idioma, metadatos básicos, header, contenido y footer.
- `src/components/`: navegación compartida y placeholder estructural.
- `src/styles/global.css`: tokens visuales y estilos base responsive.
- `src/assets/brand/`: logo oficial procesado y optimizado por Astro.
- `public/favicon.ico`: favicon oficial compartido con la aplicación.
- `public/licenses/fonts/`: licencias de las fuentes distribuidas con el sitio.
- `dist/`: salida HTML estática de `npm run build`; es generada y no se versiona.

Las fuentes Newsreader y Plus Jakarta Sans se incluyen localmente mediante paquetes Fontsource. El build no depende de Google Fonts, API, base de datos ni runtime de aplicación. El modo de salida `static` está fijado en `astro.config.ts`.

El logo fuente (`bilancio-frontend/public/logo-bilancio.png`) y el favicon (`bilancio-frontend/public/favicon.ico`) se reutilizan en este sitio; Angular también emplea el logo verde en su shell. El repositorio Angular conserva además una variante celeste en `src/assets/images/`, que el shell actual no usa y que no se copió. La copia del logo elegido está en `src/assets/brand/logo-bilancio.png` y se transforma a WebP durante el build mediante `astro:assets`; el favicon está en `public/favicon.ico`. No se encontró una licencia o atribución separada para esos archivos. Su origen queda atribuido al [repositorio bilancio-frontend](https://github.com/02Nico02/bilancio-frontend/tree/main/public), y el código fuente de cada repositorio mantiene builds independientes.

## Build y hosting previsto

`npm run build` genera el sitio estático en `dist/`. Para Cloudflare Pages, los valores previstos son comando `npm run build` y directorio `dist`; no hay proyecto, workflow, credenciales ni deployment configurados en este repositorio.

## Documentación

- [AGENTS.md](AGENTS.md): convenciones y router contextual para agentes.
- [Índice documental](docs/README.md): fuentes de verdad y navegación de la documentación.
