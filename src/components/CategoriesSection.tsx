import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, type Category } from '../data/products';

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats.slice(0, 8));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="section section-categories">
        <div className="section-header">
          <h2>Comprá por categoría</h2>
          <p>Cargando categorías...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-categories">
      <div className="section-header">
        <h2>Comprá por categoría</h2>
      </div>
      <div className="category-grid">
        {categories.map((cat) => (
          <article key={cat.slug} className="category-card">
            <div className="category-image">{cat.name}</div>
            <h3>{cat.name}</h3>
            <Link to={`/category/${cat.slug}`} className="btn btn-outline">
              Ver productos
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
