# Preparación para publicar en Cloudflare Pages

## Alcance y estado

Esta guía prepara la Issue #21; no autoriza crear el proyecto, publicar ni modificar DNS, certificados o infraestructura. Se necesita autorización productiva explícita del propietario. La website es estática, pública e indexable; no contiene la aplicación Angular ni consume la API.

V1 conserva las ilustraciones conceptuales HTML/CSS identificadas y sus datos sintéticos. Las capturas y videos auténticos son mejoras posteriores (#14–#19), no un bloqueo de V1. El footer enlaza a privacidad y términos canónicos de Angular; la website no mantiene copias. El registro conserva la aprobación administrativa gestionada por la aplicación, sin prometer acceso inmediato. Revisar los requisitos legales antes de captar usuarios: los enlaces no demuestran cumplimiento ni sustituyen la identificación y contacto del responsable.

## Configuración propuesta

| Ajuste | Valor |
| --- | --- |
| Integración Git | Solo `02Nico02/bilancio-website` |
| Rama de producción | `main`, una vez que contenga el commit aprobado para publicar |
| Desarrollo | `develop`; ramas no productivas como previews según controles de Pages |
| Node.js / npm | `22.23.4` / `10.9.9`; `.nvmrc` y `.node-version` fijan Node |
| Build | `npm run build` |
| Salida | `dist/`, raíz del repositorio |
| Canonical | `https://bilancioapp.com` |

Cloudflare instala dependencias automáticamente antes del comando de build. Confirmar en los logs que utiliza el lockfile y las versiones esperadas; para exigir `npm ci` explícitamente, usar `SKIP_DEPENDENCY_INSTALL=1` y el comando `npm ci && npm run build` en lugar del build simple. No omitir dependencias de desarrollo durante el build: Astro y las fuentes están declarados allí. El resultado es estático y no necesita Node, dependencias ni secretos en el servidor. Ver [imagen de build](https://developers.cloudflare.com/pages/configuration/build-image/) y [configuración de build](https://developers.cloudflare.com/pages/configuration/build-configuration/).

La integración Git puede desplegar automáticamente al conectar el proyecto o recibir pushes: configurar y activar únicamente en la ventana autorizada. `main` todavía debe recibir el contenido aprobado mediante el proceso Git habitual; no confundir el estado de `develop` con producción. Consultar [integración Git](https://developers.cloudflare.com/pages/get-started/git-integration/).

## Auditoría local y observaciones públicas

Verificado el 8 de noviembre de 2026 sobre `develop` actualizado y esta preparación:

- `npm ci`, `npm run check` y `npm run build` con Node `22.23.4` y npm `10.9.9`: correctos; `dist/` contiene HTML, CSS, fuentes, imagen, favicon, robots y sitemap estáticos, sin JavaScript ni dependencias de runtime de aplicación.
- Las cuatro páginas generan título, descripción, canonical y metadatos sociales; sus enlaces y recursos locales referenciados existen. El sitemap contiene solo las cuatro rutas comerciales y `robots.txt` permite rastreo. `404.html` contiene `noindex`.
- La vista previa local respondió 200 para las cuatro rutas y 404 para una ruta inexistente y `/inversiones/`. Se revisaron las cabeceras de las cuatro páginas a 375 y 1440 px; la revisión no reemplaza pruebas completas de accesibilidad. Footer y foco de enlaces se comprobaron en #20.
- Las pantallas de registro e ingreso y los documentos legales de Angular se mostraron sin iniciar sesión. No se enviaron formularios ni se verificó el flujo completo de registro o aprobación.
- Una búsqueda por patrones habituales en `dist/` no encontró claves privadas ni tokens evidentes; esto no garantiza la ausencia de todo dato sensible. Las ilustraciones revisadas se presentan como conceptuales y sintéticas.

Consultas DNS y HTTP públicas desde el entorno de trabajo, en la misma fecha (resultados sujetos a cambios):

| Host | Observación |
| --- | --- |
| `bilancioapp.com` | Sin A/AAAA/CNAME observables en la consulta; HTTP y HTTPS no resolvieron. |
| `www.bilancioapp.com` | Sin respuesta DNS en la consulta; HTTP y HTTPS no resolvieron. |
| `app.bilancioapp.com` | A `104.21.51.136`, `172.67.181.37`; AAAA `2606:4700:3031::ac43:b525`, `2606:4700:3030::6815:3388`. HTTP redirigió 301 a HTTPS; HTTPS respondió 200 con TLS válido en la consulta. |
| `api.bilancioapp.com` | CNAME `r9t47igd.up.railway.app`; HTTP redirigió 301 a HTTPS y HTTPS respondió 302 a `/admin`, con TLS válido en la consulta. |

Las respuestas DNS públicas no permiten conocer todos los registros, proxy, reglas, permisos, certificados configurados, origen ni dependencias internas de la zona. No se inspeccionó la cuenta de Cloudflare o Railway. No asumir que el apex esté libre ni que la configuración existente sea segura para cambiarla: el propietario debe inventariarla y respaldarla antes de actuar. No cambiar `app` ni `api`, sus registros o reglas; evitar reglas de zona completas que los afecten.

## Pasos pendientes para el propietario

### Antes de autorizar

- [ ] Revisar y aprobar el commit a publicar, la decisión operativa de registro (#6), los requisitos legales, identidad/contacto del responsable y la versión definitiva de los documentos de Angular (frontend #416).
- [ ] Inventariar zona DNS, nameservers, registros de los cuatro hosts, reglas, certificados y servicio actual; conservar evidencia y un plan de reversión. El apex de Pages requiere zona Cloudflare y nameservers de Cloudflare: evaluar cualquier cambio de delegación y su impacto en todos los subdominios antes de decidir. Ver [dominios personalizados](https://developers.cloudflare.com/pages/configuration/custom-domains/).
- [ ] Confirmar que `main` contiene la versión aprobada y acordar ventana y autorización expresa para la conexión y el primer despliegue.

### Tras autorización productiva

- [ ] Conectar solo este repositorio a Pages, seleccionar `main` y los parámetros de build propuestos. Revisar logs, instalación y versión de npm. Limitar previews si corresponde; un push puede provocar despliegues automáticos.
- [ ] Verificar preview de `develop` y de PR: Pages documenta `X-Robots-Tag: noindex` por defecto en previews. Confirmar el encabezado real con `curl -I`; el canonical por sí solo no evita duplicados. Ver [previews](https://developers.cloudflare.com/pages/configuration/preview-deployments/).
- [ ] Tras validar el dominio personalizado, evitar indexación duplicada del host de producción `proyecto.pages.dev`, preferentemente mediante la [redirección nativa documentada](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/). Alcanzar solo el host de producción; no redirigir ni romper las URLs de preview. Verificar ruta y query y que no haya bucles.
- [ ] Configurar apex y `www` con el alcance mínimo aprobado. Para `www`, considerar la [redirección 301 documentada](https://developers.cloudflare.com/pages/how-to/www-redirect/) con path y query preservados, limitada al host exacto. Verificar cualquier registro y regla antes de aplicarlos; no alterar `app` ni `api`.
- [ ] Esperar emisión de certificados y comprobar HTTPS de apex y `www`, redirección HTTP→HTTPS y `www`→apex sin bucles, con ruta y query. Repetir comprobaciones de `app` y `api` para detectar regresiones.
- [ ] Comprobar las cuatro rutas, CTA y legales, recursos, canonical, robots y sitemap; probar una ruta aleatoria y `/inversiones/` con HTTP 404 real. La presencia de `404.html` en la raíz evita el fallback SPA de Pages, pero el estado desplegado debe verificarse. Ver [serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/).
- [ ] Verificar la propiedad en Google Search Console, enviar `https://bilancioapp.com/sitemap-index.xml` y revisar cobertura y canonicals. La indexación y sus plazos no están garantizados.

## Rollback

Si falla el contenido, una persona autorizada puede revertir el commit y desplegar de nuevo o seleccionar un despliegue de producción exitoso anterior en Pages; los previews no son destinos de rollback. En el primer despliegue puede no existir una versión anterior. Ver [rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/). Para un problema DNS, usar el inventario previo y el procedimiento aprobado sin modificar `app` ni `api`; comprobar después TLS, redirecciones, rutas y servicios existentes.
