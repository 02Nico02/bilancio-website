# Revisión de contenido legal

**Estado:** auditoría documental para la etapa A de la Issue #20. No es texto legal aprobado ni asesoramiento jurídico. La evidencia de Angular y backend se consultó en `develop` el 5 de noviembre de 2026; no se inspeccionaron ambientes, bases, proveedores ni datos reales.

## Inventario y fuentes

Angular muestra la política de privacidad y los términos en las rutas públicas `/privacidad` y `/terminos`, sin guard de autenticación. El componente legal incluye versión **1.0** y vigencia **septiembre de 2026**. El footer y el formulario de registro enlazan a ambos documentos. Se verificó en [rutas Angular](https://github.com/02Nico02/bilancio-frontend/blob/develop/src/app/app.routes.ts), [contenido legal](https://github.com/02Nico02/bilancio-frontend/blob/develop/src/app/features/legal/legal-page.component.html), [metadatos de versión](https://github.com/02Nico02/bilancio-frontend/blob/develop/src/app/shared/ui/legal/legal.constants.ts), [enlaces legales](https://github.com/02Nico02/bilancio-frontend/blob/develop/src/app/shared/ui/legal/legal-links.component.html) y [formulario de registro](https://github.com/02Nico02/bilancio-frontend/blob/develop/src/app/features/auth/register-page.component.html).

Fuentes funcionales consultadas: documentación de [dominio de gastos grupales](https://github.com/02Nico02/bilancio-backend/blob/develop/docs/domain/shared-expenses.md), [API de gastos grupales](https://github.com/02Nico02/bilancio-backend/blob/develop/docs/api/shared-expenses.md), [cierre y reconciliación de cuentas](https://github.com/02Nico02/bilancio-backend/blob/develop/docs/operations/account-purge-and-restore-reconciliation.md), [discovery del testigo de purgas](https://github.com/02Nico02/bilancio-backend/blob/develop/docs/operations/account-purge-r2-witness-discovery.md), [backups y restore](https://github.com/02Nico02/bilancio-backend/blob/develop/docs/operations/backups-and-restore.md), [observabilidad](https://github.com/02Nico02/bilancio-backend/blob/develop/docs/operations/observability.md), [controles operativos](https://github.com/02Nico02/bilancio-backend/blob/develop/docs/operations/operational-controls.md) y [auth service de Angular](https://github.com/02Nico02/bilancio-frontend/blob/develop/src/app/core/auth/auth.service.ts). En la website se buscaron rutas legales, almacenamiento de navegador y referencias a analítica en `src/`, `public/` y `package.json`; no aparecen páginas legales, formularios de captación ni integración de analítica en el código consultado.

## Matriz de afirmaciones

| Tema | Evidencia / estado | Implicación para el contenido |
| --- | --- | --- |
| Identidad, autenticación y cuenta | **Implementado en app:** registro solicita nombre, apellido, email y contraseña; auth maneja login, refresh y CSRF. El access token se mantiene en memoria en Angular. | La política debe describir categorías y finalidades con precisión. No inferir de esto la configuración efectiva de cookies, sus atributos o el perímetro productivo. |
| Finanzas personales e importaciones | **Documentado e implementado por módulos:** la política enumera cuentas, ingresos, egresos, transferencias, cambios de moneda, categorías, importaciones y tarjetas. El uso de archivos es voluntario según el texto. | Validar los formatos y flujos vigentes, destinos de archivos, errores/historiales y ciclos de vida antes de publicar detalles sobre importaciones o conservación. |
| Inversiones | **Capacidad privada en producto; texto presente en privacidad y términos de Angular.** No pertenece a la oferta pública de la website. | Puede permanecer en los documentos de la aplicación si describe tratamiento real de la app; no promocionarla desde la website. Confirmar alcance y nombres antes de la revisión legal. |
| Gastos grupales | **Implementado con límites:** hechos económicos incluyen grupos, miembros, pagadores, gastos, participaciones, liquidaciones y accesos. El enlace público es revocable y de lectura; cualquiera que lo posea puede ver una proyección económica del grupo. No expone identidad Bilancio ni datos de Finanzas Personales. Accesos registrados dependen de aprobación, estado y permisos. | Incluir grupos y participantes como categorías de datos; explicar la visibilidad asociada a enlaces y accesos. No afirmar que una liquidación verifica una transferencia bancaria ni que todos los colaboradores pueden editar. |
| Registro y aprobación | **Implementado:** registro puede devolver `pending_approval`; Angular muestra verificación de email y aprobación administrativa. La ruta legal es accesible antes del registro. | Los términos deben describir registro, verificación y aprobación sin prometer acceso inmediato. La website no determina el resultado. |
| Cookies, almacenamiento y analítica | **Parcial / pendiente de validación:** Angular documenta sesión, refresh y CSRF; el token de acceso se guarda en memoria. No se encontró analítica en el código de la website consultado. No se verificaron cookies HTTP reales, almacenamiento del hosting/CDN ni logs externos. | No afirmar categóricamente «no usamos cookies» o «no recopilamos datos técnicos» hasta contrastar runtime y proveedores. Diferenciar telemetría de producto de logs necesarios de infraestructura. |
| Soporte y contacto | **Implementado dentro de app autenticada:** existe formulario de reportes de soporte. No se encontró un canal público de contacto en las fuentes revisadas. | No presentar Soporte autenticado como único canal para visitantes o ejercicio de derechos. Definir y probar un canal público y su responsable. |
| Logs y proveedores | **Documentado parcialmente:** backend define logging estructurado y lista campos prohibidos; recomienda retenciones, pero la documentación no certifica el proveedor, despliegue, retención real ni configuración efectiva. Backups prevén almacenamiento privado y lifecycle, cuya configuración debe verificarse. | Identificar responsable/encargados, proveedores, ubicaciones y transferencias internacionales con evidencia contractual y de cuenta. No publicar nombres, ubicaciones o plazos inferidos de recomendaciones. |
| Conservación, cierre y supresión | **Supresión permanente no implementada:** el discovery indica que el cierre bloquea la cuenta, revoca sesiones y tramita notificación/cancelación, pero no hay comando/servicio de purga ni registro externo. El restore puede recuperar datos anteriores; reconciliación de purgas está pendiente. La política de backups documenta retención objetivo, no la efectiva. | Mantener la advertencia sobre backups, pero no prometer borrado permanente, plazo definitivo ni eliminación de copias. Definir el proceso de derechos y reconciliación antes de describir resultados de supresión. |
| Exactitud y servicio | **Términos actuales:** cálculos informativos, responsabilidad de revisar datos importados, posible mantenimiento/interrupción y ausencia de SLA específico. No se evaluó si sus formulaciones son jurídicamente adecuadas. | Conservar como temas a validar; no convertirlos en descargos definitivos sin revisión profesional. |

## Omisiones, tensiones y riesgos de divergencia

- Los documentos implementados no identifican razón social/persona responsable, domicilio, jurisdicción, canal público para derechos, destinatarios/proveedores concretos ni ubicación del tratamiento. Son datos que requieren decisión y evidencia, no relleno editorial.
- La política menciona Soporte como canal para usuarios autenticados, pero el sitio público no ofrece un mecanismo identificado para visitantes. El formulario requiere sesión.
- «Datos técnicos mínimos» y «no usamos analytics de marketing» no cubren necesariamente logs de aplicación, servidor, CDN, métricas operativas o cookies técnicas. La configuración externa no se verificó.
- La política de privacidad incluye Investments y el término contiene una sección de inversiones. Esto no contradice la decisión de excluir la capacidad de la publicidad pública: los documentos de la app pueden cubrir tratamiento interno, sujeto a confirmar que el módulo siga activo y el texto sea exacto.
- La frase de términos que dice que la información puede ser «sincronizada por distintos medios» podría interpretarse como sincronización bancaria general; debe precisarse con los flujos reales o evitarse.
- Los gastos compartidos involucran a participantes que pueden no tener cuenta. El enlace de consulta concede acceso a información económica del grupo a quien lo posee. La política debe explicar los roles y qué información se comparte, sin llamarlo acceso anónimo de edición.
- Las recomendaciones operativas de retención de logs/backups no equivalen a configuración productiva confirmada. Cierre de cuenta tampoco equivale hoy a purga ni a borrado de backups.
- La versión 1.0 y fecha septiembre de 2026 son lo que muestra el código; no hay evidencia en lo consultado de aprobación legal formal o control de cambios que justifique presentarlos como tales.

## Dónde alojar los documentos

**Recomendación: alternativa A, un juego canónico en Angular, con enlaces desde la website a `https://app.bilancioapp.com/privacidad` y `https://app.bilancioapp.com/terminos`, una vez revisados y aprobados para cubrir expresamente los recorridos y tratamientos pertinentes de app y website.** Así se evita mantener copias que diverjan y se conserva una sola versión/fecha. Hoy no recomendaría publicar esos enlaces como política ya aprobada: el contenido existente requiere resolver las omisiones anteriores.

La alternativa B (copias estáticas en Astro) crea dos versiones indexables y duplica revisión, versionado y correcciones. La alternativa C (fuente compartida y distribución a ambos repositorios) agrega proceso y acoplamiento que no se justifican todavía; reconsiderarla si los documentos deben tener ámbitos o ritmos de publicación sustancialmente distintos. Si la revisión concluye que website y app necesitan textos jurídicos separados, documentar claramente alcance y enlaces recíprocos en vez de sincronizarlos por copia informal.

## Propuesta para la website

1. No crear aún `/privacidad/` ni `/terminos/` con contenido provisional.
2. Mantener los enlaces del footer fuera de la navegación hasta que sus destinos reales estén aprobados; luego enlazar directamente a las rutas canónicas de Angular, sin crear una copia en Astro.
3. Para la política canónica, añadir alcance de website y app, categorías/finalidades por superficie, destinatarios y proveedores confirmados, cookies/almacenamiento observados y canal público de derechos/consultas.
4. Para los términos, distinguir sitio comercial estático y aplicación; describir registro/aprobación, disponibilidad, datos ingresados y límites de gastos grupales con revisión legal. Mantener Investments sólo en el ámbito app si corresponde.
5. Incorporar versionado/fecha sólo al aprobar el nuevo contenido. Revisar canonical/sitemap según se mantengan enlaces externos o se decidan páginas propias.

## Cambios potenciales en otros repositorios

- **Frontend, nueva Issue si se aprueba:** actualizar política/términos canónicos, aclarar alcance website/app, revisar texto sobre sincronización, proveedor/contacto y conservación; preservar rutas públicas y probar enlaces desde registro/footer. No cambiar la aprobación de cuentas.
- **Backend, sólo si la revisión descubre una brecha funcional prioritaria:** definir por separado canal/proceso de derechos, purga y reconciliación de backups, y verificar configuración real de logs/proveedores. El documento actual no autoriza implementar ni modificar esas capacidades.
- **Website, etapa B de #20:** enlazar los documentos aprobados, verificar rutas y accesibilidad, actualizar sitemap sólo si se publican páginas locales y ejecutar comprobaciones de enlaces. No desplegar como parte de esta etapa.

## Decisiones del propietario y revisión profesional

Antes de publicar, resolver con asesoría legal y evidencia operativa:

- identidad legal del responsable y, si aplica, encargado; domicilio o información legal que corresponda;
- jurisdicción y ley aplicable, sin presuponerlas por el idioma o ubicación del equipo;
- canal público y procedimiento para información, acceso, rectificación, actualización y supresión; identidad/verificación, recepción y seguimiento;
- plazos y criterios reales de conservación de cuenta, datos financieros, soporte, logs y backups; alcance y excepciones de supresión;
- proveedores, funciones, contratos, ubicación de datos y transferencias internacionales;
- cookies, almacenamiento y mediciones presentes en cada entorno; futura analítica requiere decisión separada;
- condiciones del servicio, aprobación, disponibilidad, alcance de grupos y responsabilidad por hechos declarados;
- si la política y los términos actuales fueron aprobados, quién autoriza cambios, versión y fecha de vigencia.

Como marco de consulta, la [Ley 25.326](https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790/actualizacion) incluye deberes de información sobre finalidad, responsable y derechos; la [AAIP describe derechos de acceso, rectificación, actualización y supresión](https://www.argentina.gob.ar/aaip/datospersonales/derechos). La AAIP también explica que proveedores cloud pueden implicar [transferencias internacionales](https://www.argentina.gob.ar/transferencias-internacionales). Estos enlaces sirven para revisión profesional; este informe no determina la aplicabilidad concreta, cumplimiento, registro o instrumento necesario.

## Etapa B propuesta

1. El propietario define responsable, jurisdicción, contacto, alcance y decisiones de conservación/proveedores.
2. Asesoría legal revisa y aprueba el texto aplicable a app y website, incluyendo términos y versión/fecha.
3. Si los textos canónicos cambian, abrir Issues de Angular/backend para implementaciones necesarias y verificables.
4. En esta Issue #20, implementar sólo el mecanismo aprobado: preferentemente enlaces a Angular; páginas Astro únicamente si se aprueba alcance separado.
5. Validar rutas, texto desplegado, footer, enlaces de registro, accesibilidad, sitemap/canonical y fecha efectiva; mantener la publicación fuera de alcance hasta autorización operativa.
