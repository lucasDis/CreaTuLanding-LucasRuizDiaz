---
description: MIGRACIÓN A TIENDA CON TIPOGRAFÍAS + ROUTING
---

CONTEXTO DEL PROYECTO
Tienes una aplicación React existente que necesitas transformar en una tienda de tipografías con navegación completa mediante React Router.
OBJETIVO PRINCIPAL
Implementar un sistema de e-commerce de fuentes tipográficas donde los usuarios puedan:

Explorar catálogos de fuentes
Filtrar por categorías (Serif, Sans-serif, Monospace, Display, Handwriting, etc.)
Ver detalles de cada tipografía con previsualización interactiva
Agregar fuentes al carrito (interfaz preparada para futura funcionalidad)


REQUISITOS TÉCNICOS OBLIGATORIOS
1. INSTALACIÓN Y CONFIGURACIÓN
bashnpm install react-router-dom
Configuración en main.jsx o App.jsx:
jsximport { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <App />
</BrowserRouter>

2. ESTRUCTURA DE RUTAS (MÍNIMO 3)
Rutas Obligatorias Base:
jsx<Routes>
  <Route path="/" element={<ItemListContainer />} />
  <Route path="/categoria" element={<CategoryList />} />
  <Route path="/categoria-1" element={<ItemListContainer categoria="serif" />} />
  <Route path="/item" element={<ItemDetailContainer />} />
  <Route path="/detalle" element={<ItemDetailContainer />} />
</Routes>
Rutas Dinámicas (OPCIONAL pero recomendado):
jsx<Routes>
  <Route path="/" element={<ItemListContainer />} />
  <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
  <Route path="/item/:itemId" element={<ItemDetailContainer />} />
</Routes>

3. COMPONENTES PRINCIPALES A DESARROLLAR
A) NavBar con Menú de Categorías

Links a categorías: Serif, Sans-serif, Monospace, Display, Handwriting
Uso de <Link> o <NavLink> de React Router
Navegación mobile-first con menú hamburguesa (responsive)

Ejemplo:
jsx<nav>
  <Link to="/">Todas las Fuentes</Link>
  <Link to="/categoria/serif">Serif</Link>
  <Link to="/categoria/sans-serif">Sans Serif</Link>
  <Link to="/categoria/monospace">Monospace</Link>
</nav>

B) ItemListContainer (Catálogo)
Funcionalidad:

Mostrar grid/lista de tipografías
Si hay categoriaId en la URL → filtrar productos
Si no hay parámetro → mostrar todas las fuentes

Hooks necesarios:
jsximport { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const { categoriaId } = useParams();

useEffect(() => {
  // Fetch o filtrado de productos según categoriaId
}, [categoriaId]);
Datos de ejemplo (JSON):
json[
  {
    "id": "roboto",
    "nombre": "Roboto",
    "categoria": "sans-serif",
    "precio": 0,
    "descripcion": "Fuente versátil y legible",
    "variantes": ["Regular", "Bold", "Light"],
    "googleFontsUrl": "https://fonts.googleapis.com/css2?family=Roboto"
  }
]

C) ItemDetailContainer (Detalle de Fuente)
Funcionalidad:

Mostrar información completa de la tipografía
Previsualización interactiva:

Input para cambiar texto de ejemplo
Selector de peso/variante (Regular, Bold, Italic)
Slider de tamaño de fuente


Interfaz para agregar al carrito (preparada para futuro)

Hooks necesarios:
jsxconst { itemId } = useParams();
const [font, setFont] = useState(null);
const [previewText, setPreviewText] = useState('The quick brown fox...');
const [fontSize, setFontSize] = useState(32);
Cargar fuente dinámicamente:
jsxuseEffect(() => {
  if (font?.googleFontsUrl) {
    const link = document.createElement('link');
    link.href = font.googleFontsUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}, [font]);

4. INTEGRACIÓN CON GOOGLE FONTS API (OPCIONAL)
Fetch de fuentes reales:
jsxuseEffect(() => {
  fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=TU_API_KEY&sort=popularity')
    .then(res => res.json())
    .then(data => {
      const formateadas = data.items.map(font => ({
        id: font.family.toLowerCase().replace(/\s/g, '-'),
        nombre: font.family,
        categoria: font.category,
        variantes: font.variants,
        googleFontsUrl: `https://fonts.googleapis.com/css2?family=${font.family.replace(/\s/g, '+')}`
      }));
      setFonts(formateadas);
    });
}, []);

5. EJEMPLO DE ITEM CARD (Catálogo)
jsxfunction FontCard({ font }) {
  return (
    <Link to={`/item/${font.id}`} className="font-card">
      <h3 style={{ fontFamily: font.nombre }}>{font.nombre}</h3>
      <p className="categoria">{font.categoria}</p>
      <p className="preview" style={{ fontFamily: font.nombre }}>
        Aa Bb Cc 123
      </p>
    </Link>
  );
}

6. COMPONENTE DE PREVISUALIZACIÓN INTERACTIVA
jsxfunction FontPreview({ fontFamily }) {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog');
  const [size, setSize] = useState(32);

  return (
    <div className="preview-container">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe para previsualizar..."
      />
      <input 
        type="range" 
        min="12" 
        max="72" 
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <p 
        style={{ 
          fontFamily: fontFamily, 
          fontSize: `${size}px` 
        }}
      >
        {text}
      </p>
    </div>
  );
}

CHECKLIST DE ENTREGA
Obligatorio ✅

 React Router instalado y configurado
 Mínimo 3 rutas funcionando (/, /categoria, /item)
 NavBar con links a categorías
 Catálogo de fuentes (ItemListContainer)
 Filtrado por categoría funcional
 Vista de detalle (ItemDetailContainer)
 Interfaz básica para "Agregar al carrito"

Opcional (Mejora la nota) ⭐

 Rutas dinámicas con :id
 useParams implementado
 useEffect + fetch con Google Fonts API
 Previsualización interactiva de fuentes
 Diseño mobile-first responsivo
 Carga dinámica de fuentes desde CDN


NOTAS FINALES

Mantén componentes reutilizables y separados
Usa Link en lugar de <a> para navegación interna
Implementa loading states durante fetch
Considera usar Context API para carrito (futura entrega)
Prioriza UX mobile con menús desplegables y grids adaptativos