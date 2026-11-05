# Preparación para publicar en Cloudflare Pages

## Estado y alcance

Esta guía describe pasos futuros. Al escribirla no existe un proyecto Cloudflare Pages conectado, no se modificó DNS, no se publicó el sitio ni se configuró Search Console. Cada acción productiva requiere autorización explícita del propietario.

El sitio no incorpora Schema.org/JSON-LD: por ahora no hay datos adicionales verificables (por ejemplo, información organizacional, comercial o de contacto) que justifiquen un marcado más allá del contenido visible y los metadatos sociales. No agregar ratings, reviews, precios ni atributos inferidos.

El layout genera title, description, canonical, Open Graph y Twitter/X por página. No define `og:image` ni `twitter:image`: hoy no existe un recurso social apropiado y aprobado. Revisar esta decisión si se produce una imagen de marca para compartir.

## Build previsto

| Ajuste | Valor |
| --- | --- |
| Runtime de desarrollo y build | Node.js `22.23.4` y npm `10.9.9` |
| Instalación reproducible | `npm ci` |
| Comando de build | `npm run build` |
| Directorio estático | `dist/` |
| Dominio canónico | `https://bilancioapp.com` |

Al crear el proyecto, confirmar la branch de producción y conectar sólo este repositorio de la website. El build es estático e independiente de Angular, Symfony, API y base de datos. No añadir credenciales de producción para este sitio.

## Preparación previa

- [ ] Revisar los cambios y el contenido del commit que se publicará; ejecutar `npm ci`, `npm run check` y `npm run build`.
- [ ] Confirmar que el directorio de salida sea `dist/` y revisar el HTML generado, las cuatro páginas públicas, el sitemap y `robots.txt`.
- [ ] Sustituir antes del lanzamiento las ilustraciones conceptuales por recursos auténticos del frontend Angular, preparados con datos sintéticos. No presentarlas como capturas reales.
- [ ] Completar y revisar legalmente las páginas de privacidad y términos. No publicar políticas ficticias.
- [ ] Resolver por separado analítica, privacidad y consentimiento aplicables. Esta web no incorpora tracking.
- [ ] Revisar que los CTA de cuenta apunten al frontend `app.bilancioapp.com` (`/registro` y `/login`), nunca a la API; comprobar las rutas sin enviar formularios ni cambiar cuentas.
- [ ] Inspeccionar el estado de los registros DNS existentes de `bilancioapp.com`, `www.bilancioapp.com`, `app.bilancioapp.com` y `api.bilancioapp.com`; guardar evidencia para rollback y no alterar los subdominios de aplicación o API.
- [ ] Acordar una ventana de cambio y autorización explícita antes de conectar dominios o cambiar DNS.

## Dominio, HTTPS y publicación

- [ ] Crear un proyecto Pages separado para `bilancio-website`; configurar `npm run build` y `dist/`.
- [ ] Añadir `bilancioapp.com` como dominio principal y `www.bilancioapp.com` como alias con redirección permanente `301` al dominio principal, conservando ruta y query cuando corresponda.
- [ ] Aplicar únicamente los cambios DNS requeridos por la configuración aprobada de Pages, después de respaldar y revisar los registros existentes. No tocar `app.bilancioapp.com` ni `api.bilancioapp.com`.
- [ ] Esperar la emisión del certificado y verificar HTTPS en ambos dominios. Comprobar que HTTP redirija a HTTPS y que `www` llegue al apex en un único recorrido, sin bucles. Si hiciera falta una regla adicional, aplicarla sólo a los hosts de la website; no usar una configuración amplia que altere `app` o `api`.
- [ ] Comprobar que `https://bilancioapp.com/` y las cuatro páginas públicas respondan correctamente; confirmar que rutas inexistentes, incluida `/inversiones/`, entreguen estado HTTP 404 con el documento `404.html`.
- [ ] Revisar los enlaces de autenticación, los canonicals bajo el dominio principal, `/robots.txt` y `/sitemap-index.xml` en el sitio publicado.

Astro genera un `404.html` superior. Cloudflare Pages puede servir ese archivo para rutas inexistentes y conservar la respuesta de error. Mantenerlo en la raíz de `dist/` y comprobar el estado HTTP 404 tras publicar; no reemplazarlo por una redirección a Home ni asumir que mostrar una página de error garantiza el status correcto. Consultar la [documentación de Pages sobre manejo de rutas 404](https://developers.cloudflare.com/pages/configuration/serving-pages/).

## `pages.dev` y buscadores

- [ ] Revisar la URL `*.pages.dev` de producción y las URLs de preview: respuesta, canonical y encabezados de robots. No asumir que el canonical por sí solo evita toda indexación duplicada.
- [ ] Antes de lanzamiento, definir cómo evitar que la URL `pages.dev` compita con `https://bilancioapp.com` (por ejemplo, redirección o directiva `noindex` según lo que permita y soporte la configuración elegida). Verificar el comportamiento desplegado.
- [ ] Comprobar que el sitemap sólo incluya `/`, `/gastos-grupales/`, `/finanzas-personales/` y `/como-funciona/`; no debe incluir 404, Inversiones ni páginas legales vacías.
- [ ] Crear/verificar la propiedad de Search Console por el método aprobado y enviar `https://bilancioapp.com/sitemap-index.xml`.
- [ ] Inspeccionar algunas URLs, canonicals, robots y respuestas HTTP en Search Console. La indexación y su plazo no están garantizados.

`robots.txt` permite el rastreo público y anuncia el sitemap; no es control de acceso ni reemplaza `noindex`. Las páginas de error llevan `noindex` desde su HTML.

El sitemap se genera durante el build con la [integración oficial de Astro](https://docs.astro.build/en/guides/integrations-guide/sitemap/) y una lista permitida de cuatro páginas públicas.

## Validación posterior

- [ ] Repetir pruebas de Home, páginas públicas, CTA y 404 en desktop y mobile.
- [ ] Verificar redirecciones HTTP/HTTPS, `www` al dominio principal, certificado TLS, canonicals y ausencia de bucles.
- [ ] Confirmar status 404 de una ruta aleatoria y `/inversiones/`.
- [ ] Confirmar que sitemap y robots sean accesibles y tengan el dominio principal correcto.
- [ ] Revisar en Search Console errores de rastreo e indexación; conservar evidencia del estado inicial.

## Rollback

1. Si el problema está en el contenido o build, revertir el commit responsable, generar y revisar un nuevo build y publicar mediante el proceso aprobado. Como alternativa, una persona autorizada puede seleccionar una implementación de producción exitosa anterior desde Deployments y ejecutar el rollback; los previews no son destinos válidos. Verificar después las rutas, CTAs y el estado 404. Seguir la [guía oficial de rollback de Pages](https://developers.cloudflare.com/pages/configuration/rollbacks/).
2. Si el problema está en un dominio o DNS, aplicar sólo el cambio de reversión acordado en la ventana autorizada, usando el inventario y evidencia previos. No editar registros de `app` o `api` como parte de una reversión de la website.
3. Confirmar HTTPS, redirecciones, contenido y respuestas HTTP después de cualquier rollback. Registrar qué se revirtió y quién autorizó la acción.

## Decisiones todavía pendientes

- Crear/conectar Pages, configurar dominios, HTTPS y DNS.
- Definir comportamiento final de `pages.dev`.
- Configurar/verificar Search Console y evaluar indexación real.
- Aprobar contenido legal, analítica y requisitos de consentimiento.
- Reemplazar las ilustraciones conceptuales por recursos auténticos con datos sintéticos.

Esta checklist no ejecuta ni autoriza las tareas pendientes. La indexación de buscadores no se puede garantizar.
