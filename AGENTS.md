# Guía para agentes

## Fuentes de verdad

- Código y tests describen el comportamiento implementado.
- Documentación registra decisiones y convenciones estables; no prueba que algo esté implementado.
- GitHub Issues contienen trabajo pendiente. Pull Requests y Git conservan el historial de implementación.
- Las referencias de Stitch orientan el diseño; no son la implementación definitiva.

## Límites del sitio

La website es una presentación comercial estática e independiente. No implementa autenticación, consulta información financiera privada, accede a PostgreSQL ni reproduce lógica del backend. No introduzcas dependencias innecesarias con Angular ni JavaScript de cliente sin una necesidad concreta.

## Router contextual

Empieza por esta guía y consulta sólo el contexto que requiera la tarea. No leas toda la carpeta `docs/` automáticamente ni investigues backend/frontend cuando el cambio no dependa de ellos. Para cambios de diseño, lee [`docs/design/README.md`](docs/design/README.md) y abre sólo la referencia pertinente. Usa [`docs/README.md`](docs/README.md) para descubrir otros documentos disponibles.

## Diseño y contenido

- Respeta la identidad visual documentada. Los mockups son referencias flexibles, no especificaciones pixel-perfect; no copies literalmente su HTML.
- Mantén responsive y accesibilidad. Usa únicamente datos sintéticos en demostraciones.
- Verifica las funcionalidades anunciadas contra el producto real; no inventes capacidades ni afirmaciones comerciales.
- SEO es un requisito del producto: prioriza HTML indexable y semántico, accesibilidad, rendimiento, JavaScript mínimo y recursos optimizados.

## Seguridad y operaciones

- No incorpores secretos ni datos financieros personales.
- No prometas pagos bancarios automáticos ni ejecución de operaciones bursátiles.
- No habilites registro público por iniciativa propia.
- No configures producción, DNS ni servicios externos sin autorización explícita.

## Git y entrega

- Actualiza `develop` y crea una branch independiente por Issue; trabaja y realiza commits coherentes y acotados en esa branch.
- Publica la branch y abre un Draft PR hacia `develop`, vinculándolo con `Closes #N` cuando corresponda.
- No mergees, marques el PR Ready, cierres Issues ni despliegues. La revisión y aprobación corresponden al coordinador del proyecto.
- Conserva cambios preexistentes y no los incluyas accidentalmente.

## Subagentes

Utiliza un único agente. No crees subagentes salvo autorización expresa para una investigación o auditoría que justifique paralelismo.
