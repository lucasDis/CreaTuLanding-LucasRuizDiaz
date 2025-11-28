import React from 'react';
import { Link } from 'react-router-dom';

const PromoBanner: React.FC = () => {
  return (
    <section className="promo-banner">
      <div className="promo-inner">
        <h2>Semana del Taladro</h2>
        <p>Hasta 25% OFF en taladros percutores, atornilladores a batería y sets de brocas.</p>
        <Link to="/category/Herramientas" className="btn btn-light">Aprovechar ofertas</Link>
      </div>
    </section>
  );
};

export default PromoBanner;
