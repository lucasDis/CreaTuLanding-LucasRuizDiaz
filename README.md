<a name="readme-top"></a>

<div align="center">

  <h1>🔤 TypeStore - Tienda de Tipografías</h1>

  <p>
    E-commerce especializado en la venta de tipografías profesionales con sistema de filtros avanzado y carrito de compras funcional.
    <br />
    <a href="#características-principales"><strong>Explorar características »</strong></a>
    <br />
    <br />
    <a href="#demo">Ver Demo</a>
    ·
    <a href="#estructura-del-proyecto">Estructura</a>
    ·
    <a href="#tecnologías">Tecnologías</a>
  </p>
</div>

<details>
<summary>Tabla de contenidos</summary>

- [Sobre el Proyecto](#sobre-el-proyecto)
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Rutas de la Aplicación](#rutas-de-la-aplicación)
- [Context API](#context-api)
- [Componentes Principales](#componentes-principales)
- [Roadmap](#roadmap)

</details>

## Sobre el Proyecto

**TypeStore** es una Single Page Application (SPA) desarrollada con React + TypeScript que simula una tienda online especializada en tipografías. El proyecto implementa las mejores prácticas de React incluyendo:

- ✅ React Router para navegación
- ✅ Context API para estado global del carrito
- ✅ Componentes funcionales con hooks
- ✅ Sistema de filtros avanzado con sidebar
- ✅ Carrito de compras completamente funcional
- ✅ Diseño responsive (Mobile First)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Características Principales

### 🛒 Carrito de Compras Funcional

- Agregar tipografías desde la página de detalle
- Controles de cantidad (+/-) en el cart sheet
- Cálculos automáticos de subtotal y total
- Resumen completo en la página de checkout
- Persistencia durante la sesión

### 🔍 Sistema de Filtros Avanzado

- **Sidebar izquierda** con múltiples opciones:
  - Filtro por tipo de fuente (Serif, Sans Serif, Monospace, Display, Handwriting)
  - Slider de variantes mínimas (1-5)
  - Ordenamiento por popularidad
  - Ordenamiento por ventas
- Filtros combinables en tiempo real
- Botón para limpiar todos los filtros

### 🎨 Catálogo de Tipografías

- 60 tipografías organizadas en 5 categorías
- Vista previa de cada fuente
- Información detallada (precio, variantes, descripción)
- Paginación (9 items por página)

### 🧭 Navegación Intuitiva

- Navbar simplificado (logo + carrito)
- Rutas dinámicas con React Router
- Breadcrumbs para orientación
- Transiciones fluidas entre páginas

### 💳 Proceso de Checkout

- Wizard de 3 pasos:
  1. Método de pago
  2. Datos de envío
  3. Confirmación
- Validación de formularios
- Resumen de compra con items del carrito

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Tecnologías Utilizadas

### Core

- [![React][react-badge]][react-url] **React 19.1.1** - Biblioteca para interfaces de usuario
- [![TypeScript][typescript-badge]][typescript-url] **TypeScript** - JavaScript con tipado estático
- [![Vite][vite-badge]][vite-url] **Vite** - Build tool ultrarrápido

### Librerías

- **React Router DOM 7.9.6** - Navegación y routing
- **React Hooks** - useState, useEffect, useContext, useParams

### Herramientas de Desarrollo

- **ESLint** - Linting y calidad de código
- **CSS3** - Estilos con variables CSS y diseño responsive

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── NavBar.tsx          # Barra de navegación
│   ├── CartWidget.tsx      # Ícono del carrito con contador
│   ├── CartSheet.tsx       # Panel lateral del carrito
│   ├── FilterSidebar.tsx   # Barra lateral de filtros
│   ├── ItemListContainer.tsx  # Contenedor del catálogo
│   ├── ItemDetailContainer.tsx # Detalle de producto
│   ├── FontCard.tsx        # Tarjeta de tipografía
│   ├── CheckoutWizard.tsx  # Wizard de checkout
│   ├── Pagination.tsx      # Componente de paginación
│   └── Footer.tsx          # Pie de página
│
├── pages/                  # Páginas principales
│   ├── CategoryPage.tsx    # Página de categoría
│   ├── ItemDetailPage.tsx  # Página de detalle
│   └── CheckoutPage.tsx    # Página de checkout
│
├── context/                # Estado global
│   └── CartContext.tsx     # Context API del carrito
│
├── data/                   # Datos y lógica de negocio
│   ├── fonts.ts           # Catálogo de tipografías
│   └── products.ts        # Funciones de API (opcional)
│
├── App.tsx                # Componente raíz con routing
├── main.tsx               # Punto de entrada
└── index.css              # Estilos globales
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Instalación

### Prerequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Pasos

1. Clona el repositorio

   ```sh
   git clone https://github.com/lucasDis/CreaTuLanding-LucasRuizDiaz
   ```

2. Instala las dependencias

   ```sh
   npm install
   ```

3. Ejecuta el proyecto en modo desarrollo

   ```sh
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173`

### Scripts Disponibles

```sh
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Ejecutar linter
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Rutas de la Aplicación

El proyecto implementa **React Router** con las siguientes rutas:

| Ruta            | Componente          | Descripción                                  |
| --------------- | ------------------- | -------------------------------------------- |
| `/`             | `ItemListContainer` | Catálogo completo de tipografías con filtros |
| `/category/:id` | `CategoryPage`      | Tipografías filtradas por categoría dinámica |
| `/item/:id`     | `ItemDetailPage`    | Detalle individual de una tipografía         |
| `/checkout`     | `CheckoutPage`      | Proceso de finalización de compra            |

### Ejemplo de Uso de Rutas

```typescript
// Navegación a categoría específica
<Link to="/category/serif">Ver Serif</Link>

// Navegación a detalle de producto
<Link to="/item/roboto">Ver Roboto</Link>

// Uso de useParams en componentes
const { id } = useParams<{ id: string }>();
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Context API

### CartContext

El proyecto utiliza **Context API** para manejar el estado global del carrito de compras, evitando props drilling.

#### Funciones Disponibles

```typescript
const {
  cart, // Array de items en el carrito
  addToCart, // Agregar item al carrito
  removeFromCart, // Eliminar item del carrito
  incrementQuantity, // Incrementar cantidad en 1
  decrementQuantity, // Decrementar cantidad en 1
  updateQuantity, // Actualizar cantidad específica
  clearCart, // Vaciar el carrito
  totalItems, // Total de items (suma de cantidades)
  totalPrice, // Precio total del carrito
} = useCart();
```

#### Ejemplo de Uso

```typescript
// En cualquier componente
import { useCart } from "../context/CartContext";

const MyComponent = () => {
  const { addToCart, totalItems } = useCart();

  const handleAdd = () => {
    addToCart({
      id: "roboto",
      title: "Roboto",
      price: 29.99,
      image: "url",
      quantity: 1,
    });
  };

  return <button onClick={handleAdd}>Agregar ({totalItems})</button>;
};
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Componentes Principales

### ItemListContainer

- Muestra el catálogo de tipografías
- Integra FilterSidebar para filtrado
- Implementa paginación
- Usa useEffect para filtrar cuando cambian los parámetros

### FilterSidebar

- Checkboxes para categorías
- Slider para variantes mínimas
- Toggles para ordenamiento
- Botón de limpiar filtros

### CartSheet

- Panel lateral tipo drawer
- Controles +/- para cantidad
- Botón de eliminar item
- Total calculado automáticamente

### CheckoutWizard

- Wizard de 3 pasos
- Validación de formularios
- Resumen de items del carrito
- Cálculo de envío y total

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Roadmap

### ✅ Completado

- [x] Estructura base de componentes
- [x] React Router con rutas dinámicas
- [x] Context API para carrito
- [x] Sistema de filtros avanzado
- [x] Carrito funcional con controles de cantidad
- [x] Proceso de checkout
- [x] Diseño responsive

### 🚧 En Desarrollo

- [ ] Integración con Firebase/Firestore
- [ ] Autenticación de usuarios
- [ ] Historial de pedidos
- [ ] Búsqueda de tipografías
- [ ] Favoritos

### 💡 Futuras Mejoras

- [ ] Tests unitarios y de integración
- [ ] Optimización con React.memo y useMemo
- [ ] Animaciones y transiciones
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

---

## 📝 Notas del Desarrollador

Este proyecto fue desarrollado como parte del curso de React, implementando progresivamente las siguientes unidades:

- **Unidad 2:** Conceptos esenciales (SPA, componentes, props)
- **Unidad 3:** Hooks y ciclo de vida (useState, useEffect)
- **Unidad 4:** Requests y cliente-servidor (fetch, async/await)
- **Unidad 5:** React Router (navegación, rutas dinámicas)
- **Unidad 6:** Context API (estado global)
- **Unidad 7:** Firebase/Firestore _(pendiente de implementación)_

---

<div align="center">

Desarrollado con ❤️ por Lucas Ruiz Diaz

</div>

<!-- BADGES -->

[react-url]: https://reactjs.org/
[typescript-url]: https://www.typescriptlang.org/
[vite-url]: https://vitejs.dev/
[react-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[typescript-badge]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[vite-badge]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
