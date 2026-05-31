# Historial de precios y promociones

## Objetivo

Las ventas registradas conservan el precio exacto que tenian al momento de venderse. Cambiar precios actuales, activar modo empleado o agregar promociones futuras no modifica el historial.

## Arquitectura actual

Cada venta se crea con un snapshot inmutable:

```js
{
  name: "Americano",
  ts: 1748000000000,
  takeaway: true,
  price: 15,           // precio final cobrado — campo principal
  pricing: {
    version: 1,
    source: "employee" | "location" | "base" | "legacy",
    location: "aeropuerto",
    basePrice: 15,
    finalPrice: 15,
    adjustments: [],
    capturedAt: "2026-05-24T..."
  }
}
```

- `price`: campo principal para totales y reportes.
- `pricing`: metadatos de auditoria. No se usa para calcular — solo para consulta.
- Las ventas antiguas sin `price` se migran al cargar el local con `migrateSales()`, conservando el valor guardado o usando el precio vigente como fallback con `pricing.source = "legacy"`.

## Precios actuales por local

### Aeropuerto

| Producto                    | Precio público | Precio empleado |
|-----------------------------|---------------|-----------------|
| Americano                   | Bs. 15        | Bs. 13          |
| Latte                       | Bs. 19        | Bs. 17          |
| Cappuccino                  | Bs. 19        | Bs. 17          |
| Café Doble                  | Bs. 12        | Bs. 10          |
| Mocaccino                   | Bs. 22        | Bs. 20          |
| Iced Latte                  | Bs. 19        | Bs. 17          |
| Americano Frío              | Bs. 15        | Bs. 13          |
| Frappé                      | Bs. 22        | Bs. 20          |
| Hot Dog Extralargo          | Bs. 15        | Bs. 13          |
| Hot Dog Chiquito            | Bs. 15        | Bs. 13          |
| Tucumana                    | Bs. 10        | Bs. 9           |
| Tucumana Rematada           | Bs. 10        | Bs. 9           |
| Bolsa de Café               | —             | Bs. 55          |
| Combo Hot Dog + Americano   | Bs. 25        | —               |

### Teleférico Morado

Usa precios base de `DEFAULT_PRODUCTS`. Sin descuentos de empleado.

## Funciones clave

| Funcion              | Uso                                                          |
|----------------------|--------------------------------------------------------------|
| `getPrice(name)`     | Precio actual para mostrar en tarjeta antes de vender        |
| `getPriceQuote(name)`| Genera el quote con todas las reglas activas aplicadas       |
| `createSale(name, tw)`| Registra la venta con snapshot inmutable de precio          |
| `getSalePrice(sale)` | Lee `sale.price` para reportes y totales historicos          |
| `getProductRevenue(name)` | Suma `sale.price` de todas las ventas del producto      |

## Punto de extension

`getPriceQuote(name)` en `index.html` es donde se agregan reglas futuras:

- promociones temporales
- cupones
- combos promocionales
- descuentos por aerolinea
- descuentos por cliente frecuente

Toda regla nueva modifica el quote antes de crear la venta. Una vez creada, el precio queda fijo en `sale.price` y no depende de reglas futuras.

## Productos con restriccion por local

| Producto | Disponible en          |
|----------|------------------------|
| Frappé   | Solo Aeropuerto        |

Se controla con el campo `locales: ['aeropuerto']` en `DEFAULT_PRODUCTS` y se filtra en `loadAll()`.

## Version actual del service worker cache

`arcafe-v10`
