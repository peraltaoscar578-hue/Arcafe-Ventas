# Imagenes de productos

## Estructura

Las imagenes del POS viven en `products/` y se referencian desde cada producto con `imagePath`.

```js
{
  id: "americano",
  name: "Americano",
  price: 12,
  grams: 20,
  cat: "cafe",
  group: "hot",
  imagePath: "products/americano.jpg"
}
```

Las ventas historicas siguen usando `name` y `price`, asi que agregar o cambiar imagenes no modifica el historial.

## Productos actuales con imagen

| Producto          | Archivo                          | Estado     |
|-------------------|----------------------------------|------------|
| Americano         | `products/americano.jpg`         | ✅ En repo |
| Latte             | `products/latte.jpg`             | ✅ En repo |
| Cappuccino        | `products/cappuccino.jpg`        | ✅ En repo |
| Mocaccino         | `products/mocaccino.jpg`         | ✅ En repo |
| Expreso           | `products/expreso.jpg`           | ✅ En repo |
| Chocolate         | `products/chocolate.jpg`         | ✅ En repo |
| Hot Dog Extralargo| `products/hot-dog-extralargo.jpg`| ✅ En repo |
| Tucumana          | `products/tucumana.jpg`          | ✅ En repo |
| Mate              | `products/mate.jpg`              | ⏳ Pendiente subir |
| Iced Latte        | `products/iced-latte.jpg`        | ⏳ Pendiente subir |
| Americano Frío    | `products/americano-frio.jpg`    | ⏳ Pendiente subir |
| Frappé            | `products/frappe.jpg`            | ⏳ Pendiente subir |

Los productos con estado "Pendiente subir" muestran el emoji de fallback de su categoría hasta que se suba el archivo.

## Como agregar futuros productos

1. Guardar la imagen optimizada en `products/`, preferentemente cuadrada (400×400px). JPG optimizado es suficiente para fotos sin transparencia.
2. Agregar `id` e `imagePath` al producto en `DEFAULT_PRODUCTS`.
3. Agregar el nombre → ruta en el mapa `PRODUCT_IMAGES` en `index.html`.
4. Agregar la ruta al arreglo `FILES` en `sw.js` para cache offline.
5. Subir el version de `CACHE` en `sw.js` (ej: `arcafe-v10` → `arcafe-v11`).

No hace falta modificar el render de tarjetas, venta rapida, catalogo o futuras pantallas: todas usan el helper `productVisual(product, tipo)`.

## Reglas visuales

- Todas las imagenes se muestran en un contenedor cuadrado (`aspect-ratio: 1/1`).
- Se usa `object-fit: cover` para evitar deformaciones.
- El recorte, borde y radio son uniformes via `.p-media`.
- Si la imagen falta o falla (`onerror`), se muestra el fallback emoji de la categoria.
- Si el inventario marca el producto como agotado, la imagen permanece visible con overlay oscuro y texto `Agotado`.

## Mapa PRODUCT_IMAGES actual (en index.html)

```js
PRODUCT_IMAGES = {
  'Americano':          'products/americano.jpg',
  'Latte':              'products/latte.jpg',
  'Cappuccino':         'products/cappuccino.jpg',
  'Mocaccino':          'products/mocaccino.jpg',
  'Expreso':            'products/expreso.jpg',
  'Chocolate':          'products/chocolate.jpg',
  'Hot Dog Extralargo': 'products/hot-dog-extralargo.jpg',
  'Tucumana':           'products/tucumana.jpg',
  'Mate':               'products/mate.jpg',
  'Iced Latte':         'products/iced-latte.jpg',
  'Americano Frío':     'products/americano-frio.jpg',
  'Frappé':             'products/frappe.jpg',
};
```
