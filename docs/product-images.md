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

- `products/americano.jpg`
- `products/cappuccino.jpg`
- `products/chocolate.jpg`
- `products/expreso.jpg`
- `products/hot-dog-extralargo.jpg`
- `products/latte.jpg`
- `products/mocaccino.jpg`
- `products/tucumana.jpg`

## Como agregar futuros productos

1. Guardar la imagen optimizada en `products/`, preferentemente cuadrada. JPG optimizado es suficiente para fotos sin transparencia.
2. Agregar `id` e `imagePath` al producto en `DEFAULT_PRODUCTS` o al producto guardado.
3. Agregar la ruta al arreglo `FILES` en `sw.js` si debe estar disponible offline.

No hace falta modificar el render de tarjetas, venta rapida, catalogo o futuras pantallas de menu: todas usan el helper `productVisual(product, tipo)`.

## Reglas visuales

- Todas las imagenes se muestran en un contenedor cuadrado.
- Se usa `object-fit: cover` para evitar deformaciones.
- El recorte, borde y radio son uniformes.
- Si la imagen falta o falla, se muestra un fallback por categoria.
- Si el inventario marca el producto como agotado, la imagen permanece visible con overlay oscuro y texto `Agotado`.
