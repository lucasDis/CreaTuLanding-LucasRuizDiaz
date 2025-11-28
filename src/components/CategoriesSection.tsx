import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesSection: React.FC = () => {
  const categories = [
    { title: 'Herramientas eléctricas', description: 'Taladros, amoladoras, sierras circulares y más.', link: '/category/Herramientas', image: 'Herramientas eléctricas' },
    { title: 'Herramientas de mano', description: 'Martillos, destornilladores, alicates, cintas métricas.', link: '/category/Herramientas', image: 'Herramientas de mano' },
    { title: 'Cemento', description: 'Cemento Portland, cemento cola y mezclas preparadas.', link: '/category/Materiales', image: 'Cemento' },
    { title: 'Ladrillos', description: 'Ladrillos huecos, macizos y refractarios.', link: '/category/Materiales', image: 'Ladrillos' },
    { title: 'Cal', description: 'Cal hidratada, cal viva y cal aérea.', link: '/category/Materiales', image: 'Cal' },
    { title: 'Losas', description: 'Losas premoldeadas y nervuradas.', link: '/category/Materiales', image: 'Losas' },
    { title: 'Chapa', description: 'Chapas acanaladas, lisas y prepintadas.', link: '/category/Materiales', image: 'Chapa' },
    { title: 'Canaletas', description: 'Canaletas de chapa, PVC y aluminio.', link: '/category/Materiales', image: 'Canaletas' },
  ];

  return (
    <section className="section section-categories">
      <div className="section-header">
        <h2>Comprá por categoría</h2>
      </div>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <article key={index} className="category-card">
            <div className="category-image">{cat.image}</div>
            <h3>{cat.title}</h3>
            <p>{cat.description}</p>
            <Link to={cat.link} className="btn btn-outline">Ver {cat.title.toLowerCase()}</Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
