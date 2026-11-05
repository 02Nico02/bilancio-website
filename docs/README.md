# Documentación de Bilancio Website

Índice para encontrar el contexto pertinente. Comienza por [`AGENTS.md`](../AGENTS.md) y abre sólo los documentos que necesite la tarea; este índice no requiere leer toda la carpeta `docs/`.

## Fuentes de verdad

| Fuente | Autoridad |
| --- | --- |
| Código y tests | Comportamiento implementado |
| Documentación | Decisiones y convenciones estables |
| GitHub Issues | Trabajo pendiente y decisiones por resolver |
| Pull Requests y Git | Historial y trazabilidad de implementación |
| Referencias Stitch | Orientación visual, no implementación definitiva |

Ante una discrepancia, verifica el comportamiento en el código y los tests. Distingue las decisiones documentadas de las capacidades implementadas.

## Mapa documental

### Diseño

- [Decisiones y referencias visuales](design/README.md): dirección aprobada, relación entre documentos y uso de Stitch.
- [Documento de diseño derivado de Stitch](design/DESIGN.md): artefacto visual de referencia, no autoridad de identidad compartida.

### Producto

- [Posicionamiento y claims](product/positioning.md): mensajes aprobados, inventario de funcionalidades con evidencias y estrategia de demostraciones sintéticas.
- [Mapa de páginas y CTA](product/sitemap-and-ctas.md): arquitectura comercial prevista, conversión por estado de acceso y dependencias de #5/#6.

### Desarrollo

- [README del repositorio](../README.md): versiones de Node/npm, instalación, comandos, estructura y build estático.
- Licencias de fuentes distribuidas: [Newsreader](../public/licenses/fonts/Newsreader-OFL.txt) y [Plus Jakarta Sans](../public/licenses/fonts/Plus-Jakarta-Sans-OFL.txt).

### Operaciones

- [Preparación de publicación en Cloudflare Pages](operations/cloudflare-pages-launch.md): checklist futura de build, dominio, SEO, verificación y rollback. No implica que la infraestructura esté configurada.

### Documentación futura

El índice podrá ampliarse cuando haya contenido real sobre arquitectura, desarrollo, operaciones o decisiones arquitectónicas. No se crean secciones ni documentos vacíos por adelantado.
