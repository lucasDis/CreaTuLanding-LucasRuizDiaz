import React from 'react';
import ProductCard from './ProductCard';

const BestsellersSection: React.FC = () => {
  // Mock data for bestsellers
  const bestsellers = [
    { id: '101', title: 'Amoladora Angular 115mm 820W', description: 'Black + Decker G720N. Potente y duradera.', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=60', price: 85000 },
    { id: '102', title: 'Amoladora Angular 115mm 1050W', description: 'STANLEY SGS1045. Uso profesional.', image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=500&q=60', price: 110000 },
    { id: '103', title: 'Amoladora Angular 115mm 700W', description: 'DEWALT DWE4010. Compacta y ligera.', image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=500&q=60', price: 135000 },
    { id: '104', title: 'Escalera Aluminio Multiuso 4x4', description: 'Articulada, múltiples posiciones.', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=60', price: 180000 },
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
