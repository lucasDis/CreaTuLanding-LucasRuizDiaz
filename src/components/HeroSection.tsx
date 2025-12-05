import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Tipografías premium para proyectos excepcionales.</h1>
        <p>Fuentes profesionales de alta calidad de las mejores fundiciones del mundo.</p>
        <div className="hero-actions">
          <Link to="/category/serif" className="btn btn-primary">Ver tipografías destacadas</Link>
        </div>
      </div>
      <div className="hero-media">
        <div className="hero-placeholder-image">
          Muestra de tipografías / Preview de fuentes
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
