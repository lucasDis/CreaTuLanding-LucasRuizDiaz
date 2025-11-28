import React from 'react';
import ProductCard from './ProductCard';

const BestsellersSection: React.FC = () => {
  // Mock data for bestsellers
  const bestsellers = [
    { id: '101', title: 'Taladro percutor 20V', description: 'Ideal para concreto, madera y metal. Incluye dos baterías.', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=60' },
    { id: '102', title: 'Juego de llaves combinadas', description: 'Acero cromo-vanadio, estuche enrollable.', image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=500&q=60' },
    { id: '103', title: 'Kit de tornillos', description: 'Organizador con 12 medidas distintas.', image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=500&q=60' },
    { id: '104', title: 'Pintura látex interior', description: 'Acabado mate, alto poder cubritivo.', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=60' },
  ];

  return (
    <section className="section section-bestsellers">
      <div className="section-header">
        <h2>Más vendidos</h2>
        <p>Las herramientas y materiales preferidos por nuestros clientes profesionales y hogareños.</p>
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
