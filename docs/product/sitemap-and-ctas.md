# Mapa de páginas y CTA

## Navegación principal

Orden sugerido: Inicio, Finanzas personales, Gastos grupales, Inversiones y Cómo funciona. Gastos grupales debe ser fácil de encontrar, sin desplazar el posicionamiento general de Bilancio. Evitar sumar navegación comercial fuera de estas páginas en V1.

## Páginas previstas

| Ruta | Objetivo y contenido | Acción principal |
| --- | --- | --- |
| `/` | Presentar la propuesta general con el claim **Tus finanzas, más claras.**; introducir finanzas personales, inversiones y gastos grupales. | CTA de autenticación según el estado confirmado en #5/#6; enlace secundario a Gastos grupales. |
| `/gastos-grupales` | Captar interés y explicar el flujo cotidiano de grupo, gasto, distribución, balance y sugerencia, diferenciando la liquidación manual. | CTA contextual sujeto al estado de acceso; nunca sugerir un pago ejecutado por Bilancio. |
| `/finanzas-personales` | Explicar registro y organización de ingresos, gastos, cuentas, categorías, monedas e historial con los límites documentados. | CTA de autenticación sujeto a #5/#6. |
| `/inversiones` | Presentar registro, posiciones, distribución y rendimiento con cobertura variable y sin promesas de trading o tiempo real. | CTA de autenticación sujeto a #5/#6. |
| `/como-funciona` | Recorrer el producto a nivel general y conectar las tres áreas con demostraciones fieles y sintéticas. | CTA de autenticación sujeto a #5/#6. |
| `/privacidad` | Reservar la ruta para información de privacidad aplicable a la website. No redactar una política ficticia. | Sin CTA hasta que el contenido y revisión legal estén aprobados. |
| `/terminos` | Reservar la ruta para términos aplicables a la website. No redactar términos ficticios. | Sin CTA hasta que el contenido y revisión legal estén aprobados. |

No añadir blog, pricing, newsletter ni otras páginas comerciales en este alcance.

## Jerarquía y destinos de CTA

- CTA de autenticación conduce a `app.bilancioapp.com`; nunca al dominio de API.
- El estado de conversión puede ser **registro público habilitado** o **beta/acceso restringido**. Copy, visibilidad del botón y destinos concretos se deciden sólo después de verificar rutas y runtime en [website #5](https://github.com/02Nico02/bilancio-website/issues/5).
- Si el registro está habilitado, puede presentarse un CTA de crear cuenta sólo cuando el flujo esté confirmado.
- Si el acceso está restringido, no simular una lista de espera ni ofrecer «Solicitar acceso» sin mecanismo real. Se puede mantener el acceso a login para quienes ya tienen cuenta y explicar la limitación de forma factual, sujeto a #5.
- La publicación de registro abierto requiere una decisión explícita posterior a [website #6](https://github.com/02Nico02/bilancio-website/issues/6). Publicar la website no habilita el registro.
- Los CTAs deben tener etiquetas descriptivas y destino validado; no usar botones sin destino mientras se implementa.

## Pendientes de verificación para el handoff

1. Issue #5 debe verificar rutas actuales de login/registro, deep links, estados de aprobación y acceso restringido, navegación desde un origen distinto y destino seguro. El router Angular actual contiene `/login` y `/registro`, pero eso no prueba qué está abierto en el entorno público.
2. Issue #6 debe establecer un go/no-go humano para apertura pública y atender sus bloqueantes. La website no toma esa decisión.
3. Las páginas legales permanecen vacías de contenido hasta revisión y aprobación legal; los documentos legales existentes en la app no se copian automáticamente a la website.
4. Las demostraciones de cada página deben contrastarse con la UI y el comportamiento existentes al momento de capturar; mantener fixtures sintéticos y no reconstruir estados mediante HTML ficticio.
