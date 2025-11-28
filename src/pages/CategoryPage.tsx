import React from 'react';
import { useParams } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock products based on category (simplified logic)
  const products = [
    { id: '1', title: 'Taladro Percutor', description: 'Potente taladro para uso profesional.', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=60' },
    { id: '2', title: 'Set de Destornilladores', description: 'Kit completo de 10 piezas.', image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=500&q=60' },
    { id: '3', title: 'Martillo Carpintero', description: 'Mango de fibra de vidrio.', image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=500&q=60' },
    { id: '4', title: 'Sierra Circular', description: 'Corte preciso y rápido.', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=60' },
  ];

  return (
    <div className="page-container">
      <div className="breadcrumb-container">
        <Breadcrumb />
      </div>
      
      <div className="category-layout">
        <FilterSidebar />
        
        <main className="category-content">
          <h1>Categoría: {id}</h1>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
