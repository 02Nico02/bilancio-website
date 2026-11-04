# Bilancio Website

Sitio público y comercial de Bilancio. Presenta el producto y sus funcionalidades; no forma parte de la aplicación autenticada.

## Responsabilidad y arquitectura

El producto se organiza en tres dominios independientes:

- `bilancioapp.com`: website comercial.
- `app.bilancioapp.com`: aplicación Angular autenticada.
- `api.bilancioapp.com`: API Symfony.

La website no gestiona autenticación ni datos financieros privados y no requiere una dependencia funcional con la aplicación.

## Tecnología prevista

Astro, TypeScript y CSS con generación estática. Cloudflare Pages es el destino previsto; la infraestructura todavía no está configurada desde este repositorio.

## Estado

Repositorio en preparación: Astro y su estructura de desarrollo todavía no están implementados. Los comandos y las instrucciones de desarrollo se documentarán cuando corresponda.

## Documentación

- [AGENTS.md](AGENTS.md): convenciones y router contextual para agentes.
- [Índice documental](docs/README.md): fuentes de verdad y navegación de la documentación.
