import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Todo lo que necesitás para construir, reparar y crear.</h1>
        <p>Herramientas profesionales, materiales de alta calidad y el asesoramiento de ferreteros de confianza.</p>
        <div className="hero-actions">
          <Link to="/category/Herramientas" className="btn btn-primary">Ver herramientas destacadas</Link>
          <Link to="/category/Materiales" className="btn btn-secondary">Explorar materiales</Link>
        </div>
      </div>
      <div className="hero-media">
        <div className="hero-placeholder-image">
          Imagen de taller / banco de herramientas
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
