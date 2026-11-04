# Posicionamiento y claims

## Propósito

La website presenta Bilancio como un producto de gestión financiera personal, explica sus capacidades reales y dirige a la aplicación autenticada cuando el flujo correspondiente esté verificado. Es una superficie comercial independiente: no consulta datos financieros ni ejecuta operaciones.

## Público y posicionamiento

Personas que quieren ordenar ingresos, gastos e inversiones; y personas que necesitan llevar las cuentas de viajes, salidas y otros gastos compartidos. La website se dirige a público hispanohablante con tono claro, cotidiano y voseo rioplatense. Gastos grupales es un diferencial destacado, sin definir por sí solo toda la identidad del producto.

## Mensajes aprobados

### Home

**Tus finanzas, más claras.**

> Organizá tus ingresos y gastos, seguí tus inversiones y gestioná los gastos que compartís con otras personas. Todo desde un mismo lugar.

Presentar primero la utilidad general de Bilancio y mostrar Gastos grupales como una capacidad importante dentro del producto.

### Gastos grupales

**Compartí los gastos, no las complicaciones.**

> Organizá los gastos de viajes, salidas y grupos. Registrá quién pagó, repartí los importes y descubrí fácilmente quién le debe a quién.

Priorizar situaciones cotidianas. Explicar detalles avanzados en contenido secundario sólo cuando la UI y el estado actual de la función los respalden.

## Inventario comercial y evidencia

Los estados describen la revisión documental y del código consultado en esta tarea; no reemplazan la verificación de una release desplegada ni una revisión de producto antes de publicar cambios futuros.

### Gastos grupales

| Estado | Capacidad o claim | Alcance y evidencia |
| --- | --- | --- |
| Implementada y verificada | Crear y consultar grupos con moneda única, incorporar participantes económicos manuales, registrar gastos y pagadores. | [Dominio backend](https://github.com/02Nico02/bilancio-backend/blob/main/docs/domain/shared-expenses.md) y [API](https://github.com/02Nico02/bilancio-backend/blob/main/docs/api/shared-expenses.md); [rutas Angular](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/features/shared-expenses/shared-expenses.routes.ts), [pantalla de grupo](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/features/shared-expenses/shared-expense-group-page.component.ts), y [tests de lista y detalle](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/features/shared-expenses/shared-expense-group-page.component.spec.ts). |
| Implementada y verificada | Distribuir un gasto por partes iguales, importes o porcentajes; consultar balances calculados y sugerencias para saldar diferencias. | [Reglas de distribución y balances](https://github.com/02Nico02/bilancio-backend/blob/main/docs/domain/shared-expenses.md); la UI ofrece la selección de participantes y modos de distribución en la [pantalla grupal](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/features/shared-expenses/shared-expense-group-page.component.ts). Las sugerencias son deterministas; no afirmar que minimizan globalmente la cantidad de pagos. |
| Implementada y verificada, según permisos y tipo de participantes | Registrar una liquidación y volver a consultar balances. | [Dominio y API de gastos grupales](https://github.com/02Nico02/bilancio-backend/blob/main/docs/domain/shared-expenses.md). El circuito manual administrativo no aplica a todos los pares de participantes: accesos Bilancio activos pueden requerir declaración y confirmación. Es un hecho declarado en Bilancio; no verifica que haya ocurrido una transferencia bancaria. |
| Implementada y verificada, con condiciones | Consulta grupal compartida de sólo lectura mediante enlace habilitado por el creador; existen accesos autenticados con aprobación y permisos. | [Dominio backend](https://github.com/02Nico02/bilancio-backend/blob/main/docs/domain/shared-expenses.md), [rutas Angular](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/app.routes.ts) y [test de rutas](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/app.routes.spec.ts). No implica acceso anónimo a edición ni a datos de Finanzas Personales. No describir roles o incorporación sin explicar sus permisos. |
| Parcial / depende del flujo activo | Solicitudes de liquidación, propuestas de gastos y estados provisionales. | La documentación de dominio distingue capacidades por etapa y señala transiciones que no necesariamente están activas por HTTP. No anunciarlas como una capacidad general sin verificar runtime, rutas y pantallas vigentes para el flujo concreto. |
| No disponible | Pago, transferencia bancaria o billetera ejecutados desde Bilancio; confirmación bancaria automática. | Las sugerencias orientan y las liquidaciones se registran manualmente. No decir «pagá desde Bilancio», «transferencia automática» ni «pago verificado». |

### Finanzas personales

| Estado | Capacidad o claim | Alcance y evidencia |
| --- | --- | --- |
| Implementada y verificada | Registrar y consultar ingresos y gastos; organizar cuentas y categorías; gestionar movimientos y referencias monetarias. | [Semántica financiera backend](https://github.com/02Nico02/bilancio-backend/blob/main/docs/domain/finance.md), [API de movimientos](https://github.com/02Nico02/bilancio-backend/blob/main/docs/api/movements.md), [cuentas](https://github.com/02Nico02/bilancio-backend/blob/main/docs/api/accounts.md) y [categorías](https://github.com/02Nico02/bilancio-backend/blob/main/docs/api/categories.md); Angular prueba las rutas de [movimientos, cuentas y categorías](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/app.routes.spec.ts). |
| Implementada en backend; presentación frontend a confirmar | Mantener hechos de transferencia e intercambio de moneda diferenciados de ingresos y gastos; conservar montos en monedas separadas. | [Semántica financiera](https://github.com/02Nico02/bilancio-backend/blob/main/docs/domain/finance.md) y [API de movimientos](https://github.com/02Nico02/bilancio-backend/blob/main/docs/api/movements.md) definen los hechos; Angular tiene una superficie y tests de rutas de movimientos. Confirmar el flujo visible en la UI antes de destacarlo comercialmente. No presentar conversiones como saldos consolidados ni sumar ARS y USD sin una capacidad explícita. |
| Implementada, con límites | Consultar movimientos e historial importado/corregido según las fuentes y cobertura disponibles. | [API de movimientos](https://github.com/02Nico02/bilancio-backend/blob/main/docs/api/movements.md) y [calidad de historia financiera](https://github.com/02Nico02/bilancio-backend/blob/main/docs/domain/financial-history-quality.md). La disponibilidad de datos históricos completos no está garantizada por el producto. |
| No disponible como promesa general | Sincronización automática con cualquier banco o tarjeta, cobertura universal o historial necesariamente completo. | Las fuentes y la cobertura dependen de flujos concretos. No afirmar agregación bancaria universal. |

### Inversiones

| Estado | Capacidad o claim | Alcance y evidencia |
| --- | --- | --- |
| Implementada y verificada | Registrar operaciones BUY/SELL y consultar posiciones derivadas e historial de operaciones. | [Dominio de inversiones](https://github.com/02Nico02/bilancio-backend/blob/main/docs/domain/investments.md), [API](https://github.com/02Nico02/bilancio-backend/blob/main/docs/api/investments.md), rutas de [Investments](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/features/investments/investments.routes.ts) y [test de rutas](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/features/investments/investments.routes.spec.ts). |
| Implementada y verificada | Consultar concentración, asignación contra objetivos configurados y una medida de rendimiento por moneda. | [Allocation](https://github.com/02Nico02/bilancio-backend/blob/main/docs/domain/investment-allocation.md), [performance](https://github.com/02Nico02/bilancio-backend/blob/main/docs/domain/investment-performance.md), superficies frontend descritas en la [guía de Investments](https://github.com/02Nico02/bilancio-frontend/blob/main/docs/features/investments.md) y [test de la pantalla de rendimiento](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/features/investments/investment-performance-page.component.spec.ts). La metodología de rendimiento tiene límites documentados; no llamarla rendimiento real garantizado ni consolidarla entre monedas. |
| Implementada con cobertura variable | Valuaciones y series de precio según las fuentes, fechas y cobertura disponibles. | [API de inversiones](https://github.com/02Nico02/bilancio-backend/blob/main/docs/api/investments.md) y [guía frontend](https://github.com/02Nico02/bilancio-frontend/blob/main/docs/features/investments.md) distinguen precios faltantes y coverage parcial. No prometer tiempo real ni cobertura universal. |
| No disponible | Intermediación o ejecución de órdenes bursátiles desde Bilancio, asesoramiento de inversión o garantía de precio/cobertura para todo activo. | Bilancio permite registrar y analizar operaciones; no debe presentarse como intermediario ni asesor. |

## Conversión y límites de claims

El frontend contiene las rutas [`/login` y `/registro`](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/app.routes.ts); el [código](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/features/auth/register-page.component.ts) y sus [tests](https://github.com/02Nico02/bilancio-frontend/blob/main/src/app/features/auth/register-page.component.spec.ts) contemplan `registration_disabled` y aprobación pendiente. Esto no determina qué estado está habilitado en producción. Verificar deep links, comportamiento del backend y estado del entorno en [website #5](https://github.com/02Nico02/bilancio-website/issues/5). Toda apertura pública requiere la decisión posterior a la auditoría de [website #6](https://github.com/02Nico02/bilancio-website/issues/6).

Hasta entonces, no publicar una ruta como contrato comercial ni asegurar que el registro está abierto. Los CTA de autenticación van al frontend `app.bilancioapp.com`, nunca a la API. No usar «Solicitar acceso» sin un mecanismo real y verificado.

No presentar como decisiones aprobadas precios, planes, gratuidad permanente, políticas legales, analítica, integraciones futuras, automatizaciones, promesas de seguridad no verificadas ni apertura pública. Algunas referencias de Stitch contienen textos sobre planes gratuitos, comisiones, «100%» de exactitud, mínima cantidad de pagos o promesas de privacidad; esos textos son contenido de mockup, no claims aprobados. No reutilizarlos sin decisión y evidencia independientes.

## Demostraciones sintéticas

V1 debe priorizar capturas y estados estáticos que correspondan a pantallas existentes. No usar datos de personas, cuentas, operaciones ni grupos reales; nombres, fechas, importes e historias de ejemplo deben ser inventados y reconocibles como demostración. Registrar el fixture de origen para que capturas futuras puedan reproducirse. Los videos son opcionales, no dependencia de V1.

Narrativa sugerida para una captura o secuencia breve de Gastos grupales: grupo ficticio de viaje en ARS con Ana, Beto y Caro; Ana registra un gasto de ARS 18.000 repartido en partes iguales. El balance inicial queda Ana +ARS 12.000, Beto −ARS 6.000 y Caro −ARS 6.000; las sugerencias indican que Beto y Caro salden ARS 6.000 cada uno con Ana. Si se muestra luego una liquidación de Beto, rotularla como registrada manualmente: el balance resultante es Ana +ARS 6.000, Caro −ARS 6.000 y Beto equilibrado. El ejemplo ilustra tres conceptos distintos:

1. **Balance:** resultado económico calculado a partir de gastos, consumos y liquidaciones registradas.
2. **Sugerencia:** guía para saldar diferencias; no es una orden ni un pago.
3. **Liquidación registrada:** anotación en Bilancio de un pago que las personas declaran haber realizado fuera de Bilancio; no acredita una transferencia bancaria.

Usar esta narrativa sólo si puede representarse con la UI real de la versión que se capture. No inventar pantallas para sostener el ejemplo ni afirmar que la sugerencia es la mínima global.
