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

La base Astro está preparada. La Home contiene sólo el mensaje aprobado y las demás rutas comerciales son estructurales; su contenido corresponde a la Issue #3.

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
- `public/licenses/fonts/`: licencias de las fuentes distribuidas con el sitio.
- `dist/`: salida HTML estática de `npm run build`; es generada y no se versiona.

Las fuentes Newsreader y Plus Jakarta Sans se incluyen localmente mediante paquetes Fontsource. El build no depende de Google Fonts, API, base de datos ni runtime de aplicación. El modo de salida `static` está fijado en `astro.config.ts`.

## Build y hosting previsto

`npm run build` genera el sitio estático en `dist/`. Para Cloudflare Pages, los valores previstos son comando `npm run build` y directorio `dist`; no hay proyecto, workflow, credenciales ni deployment configurados en este repositorio.

## Documentación

- [AGENTS.md](AGENTS.md): convenciones y router contextual para agentes.
- [Índice documental](docs/README.md): fuentes de verdad y navegación de la documentación.
