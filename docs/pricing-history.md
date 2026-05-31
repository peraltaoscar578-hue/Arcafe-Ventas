# Historial de precios y promociones

## Objetivo

Las ventas registradas deben conservar el precio exacto que tenian al momento de venderse. Cambiar precios actuales, activar modo empleado o agregar promociones futuras no debe modificar el historial.

## Cambios realizados

- Cada venta nueva se crea con un snapshot de precio: `price` y `pricing`.
- `price` sigue siendo el campo principal para compatibilidad con reportes existentes.
- `pricing` guarda metadatos de la regla aplicada: version, origen, local, precio base, precio final, ajustes y fecha de captura.
- Las ventas antiguas se migran al cargar el local:
  - si ya tenian `price`, se conserva ese valor;
  - si no tenian `price`, se fija una vez usando el precio vigente como fallback;
  - se agrega `pricing.source = "legacy"` para identificar ventas migradas.
- Los totales, subtotales por producto, informes y CSV suman `sale.price` de cada venta en lugar de recalcular con el precio actual del producto.
- El cache del service worker subio a `arcafe-v4` para forzar la actualizacion de la app instalada.

## Punto de extension

La funcion `getPriceQuote(name)` en `index.html` es el punto donde deben agregarse reglas futuras:

- descuentos por empleado,
- promociones temporales,
- cupones,
- combos promocionales,
- descuentos por aerolinea,
- descuentos por cliente frecuente.

Toda regla nueva debe modificar el quote antes de crear la venta. Una vez creada la venta, el precio final debe quedar guardado en `sale.price` y no debe depender de reglas activas en el futuro.

## Regla practica

- `getPrice(name)`: solo para mostrar o calcular el precio actual antes de vender.
- `createSale(name, takeaway)`: para registrar una venta con snapshot historico.
- `getSalePrice(sale)`: para reportes y totales historicos.
- `getProductRevenue(name)`: para subtotales por producto basados en ventas reales.

