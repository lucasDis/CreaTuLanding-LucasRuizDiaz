import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProducts, type Product } from '../data/products';

const BestsellersSection: React.FC = () => {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const products = await getProducts();
        const topRated = products
          .filter(p => p.rating && p.rating >= 4.5)
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 4);
        setBestsellers(topRated);
      } catch (error) {
        console.error('Error cargando productos destacados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  if (loading) {
    return (
      <section className="section section-bestsellers">
        <div className="section-header">
          <h2>Más vendidos</h2>
          <p>Cargando productos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-bestsellers">
      <div className="section-header">
        <h2>Más vendidos</h2>
        <p>Los productos mejor valorados por nuestros clientes.</p>
      </div>
      <div className="product-grid">
        {bestsellers.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default BestsellersSection;
