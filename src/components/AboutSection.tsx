import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section section-about">
      <div className="about-inner">
        <div className="about-text">
          <h2>TypeStore, tu destino para tipografías premium</h2>
          <p>
            Somos una tienda especializada en tipografías de alta calidad, ofreciendo
            fuentes de las mejores fundiciones y diseñadores del mundo para que tus diseños
            destaquen desde el primer momento.
          </p>
          <p>
            Nuestro equipo de especialistas en tipografía te asesora para elegir la fuente perfecta,
            ya sea que estés trabajando en una identidad corporativa completa o un proyecto personal.
          </p>
          <Link to="/about" className="btn btn-primary">Conocé más sobre nosotros</Link>
        </div>
        <div className="about-media">
          <div className="about-placeholder-image">
            Expertos en tipografía / Catálogo digital
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
