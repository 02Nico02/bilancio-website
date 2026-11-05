# Mapa de páginas y CTA

## Navegación principal

Orden sugerido: Inicio, Finanzas personales, Gastos grupales y Cómo funciona. Gastos grupales debe ser fácil de encontrar, sin desplazar el posicionamiento general de Bilancio. Inversiones es una capacidad privada, disponible únicamente para el propietario del proyecto, y queda fuera de la website pública. Evitar sumar navegación comercial fuera de estas páginas en V1.

## Páginas previstas

| Ruta | Objetivo y contenido | Acción principal |
| --- | --- | --- |
| `/` | Presentar la propuesta general con el claim **Tus finanzas, más claras.**; introducir finanzas personales y gastos grupales. | **Crear cuenta**; enlace secundario a Gastos grupales. |
| `/gastos-grupales` | Captar interés y explicar el flujo cotidiano de grupo, gasto, distribución, balance y sugerencia, diferenciando la liquidación manual. | **Crear cuenta**; nunca sugerir un pago ejecutado por Bilancio. |
| `/finanzas-personales` | Explicar registro y organización de ingresos, gastos, cuentas, categorías, monedas e historial con los límites documentados. | **Crear cuenta**. |
| `/como-funciona` | Recorrer el producto a nivel general y conectar finanzas personales y gastos grupales con demostraciones fieles y sintéticas. | **Crear cuenta**. |
| `/privacidad` | Reservar la ruta para información de privacidad aplicable a la website. No redactar una política ficticia. | Sin CTA hasta que el contenido y revisión legal estén aprobados. |
| `/terminos` | Reservar la ruta para términos aplicables a la website. No redactar términos ficticios. | Sin CTA hasta que el contenido y revisión legal estén aprobados. |

No añadir blog, pricing, newsletter ni otras páginas comerciales en este alcance.

La ruta `/inversiones/` no se genera: es una capacidad privada y no una página comercial. Una solicitud para esa ruta recibe la página estática 404, sin redirección ni contenido promocional.

## Jerarquía y destinos de CTA

- **Crear cuenta** es la acción comercial principal y conduce a `https://app.bilancioapp.com/registro`.
- **Ingresar** es la acción para personas con cuenta y conduce a `https://app.bilancioapp.com/login`.
- Header y footer ofrecen ambas acciones. En mobile, Crear cuenta permanece visible en el header e Ingresar está en el menú desplegable.
- Las rutas se verificaron en las rutas de Angular y mediante navegación directa a ambas pantallas productivas. La guardia Angular envía a `/dashboard` a quien ya tiene sesión.
- La website ofrece el recorrido de registro sin condicionar su CTA a la aprobación administrativa. Angular/backend informan si el registro está deshabilitado o requiere aprobación; la website no promete acceso inmediato ni modifica esa política.
- La publicación de la website no habilita el registro ni cambia la decisión operativa que corresponda a [website #6](https://github.com/02Nico02/bilancio-website/issues/6).
- Los CTA deben tener etiquetas descriptivas y destino validado; no usar botones sin destino.

## Pendientes de verificación para el handoff

1. Issue #6 debe establecer un go/no-go humano para la operación pública y atender sus bloqueantes. La website no toma esa decisión ni modifica los controles de registro.
2. Las páginas legales permanecen vacías de contenido hasta revisión y aprobación legal; los documentos legales existentes en la app no se copian automáticamente a la website.
3. Las demostraciones de cada página deben contrastarse con la UI y el comportamiento existentes al momento de capturar; mantener fixtures sintéticos y no reconstruir estados mediante HTML ficticio.
