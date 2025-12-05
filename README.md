<a name="readme-top"></a>

<div align="center">

  <h1>🔨 Ferretería</h1>

  <p>
    Landing page de e-commerce especializada en ferretería, herramientas y materiales de construcción.
    <br />
    <a href="#características-principales"><strong>Explorar características »</strong></a>
    <br />
    <br />
    <a href="#capturas-de-pantalla">Ver Demo</a>
  </p>
</div>

<details>
<summary>Tabla de contenidos</summary>

- [Ferretería](#ferretería)
- [Características principales](#características-principales)
  - [Capturas de pantalla](#capturas-de-pantalla)
- [Para empezar](#para-empezar)
  - [Prerequisitos](#prerequisitos)
  - [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [🛠️ Stack](#️-stack)

</details>

## Características principales

Este proyecto representa la primera entrega del curso de React, enfocándose en la estructura base de componentes y un diseño profesional.

- **Diseño Mobile First**: Interfaz optimizada para dispositivos móviles, ideal para usuarios en obra.
- **Navegación Intuitiva**: NavBar simplificado con categorías esenciales (Herramientas, Materiales).
- **Carrito Interactivo**: Implementación de un `CartSheet` (tipo drawer) para una mejor experiencia de usuario.
- **Estética Industrial**: Paleta de colores y tipografía seleccionadas para transmitir confianza y profesionalismo.

### Capturas de pantalla

_(Espacio reservado para capturas de pantalla)_

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Para empezar

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio

   ```sh
   git clone https://github.com/lucasDis/CreaTuLanding-LucasRuizDiaz
   ```

2. Instala las dependencias

   ```sh
   npm install
   ```

3. Ejecuta el proyecto
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Estructura del Proyecto

```
src/
├── components/
│   ├── NavBar.tsx          # Barra de navegación principal
│   ├── CartWidget.tsx      # Widget del carrito con notificaciones
│   ├── CartSheet.tsx       # Panel lateral del carrito (Drawer)
│   └── ItemListContainer.tsx # Contenedor principal
├── App.tsx                 # Componente raíz
└── index.css               # Estilos globales y variables CSS
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## 🛠️ Stack

- [![React][react-badge]][react-url] - Biblioteca para interfaces de usuario.
- [![TypeScript][typescript-badge]][typescript-url] - JavaScript con tipado estático.
- [![Vite][vite-badge]][vite-url] - Herramienta de build rápida.
- [![CSS3][css-badge]][css-url] - Estilos con enfoque Mobile First.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

[react-url]: https://reactjs.org/
[typescript-url]: https://www.typescriptlang.org/
[vite-url]: https://vitejs.dev/
[css-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[react-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[typescript-badge]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[vite-badge]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[css-badge]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
