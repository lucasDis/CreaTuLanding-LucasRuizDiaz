import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section section-about">
      <div className="about-inner">
        <div className="about-text">
          <h2>Ferretería Plus, tu aliado en cada proyecto</h2>
          <p>
            Somos una ferretería con años de experiencia abasteciendo a profesionales de la construcción,
            industrias y hogares. Seleccionamos herramientas y materiales de primeras marcas para que tu
            trabajo quede bien desde la primera vez.
          </p>
          <p>
            Nuestro equipo de ferreteros especializados te asesora para elegir la mejor solución, ya sea
            que estés levantando una obra completa o haciendo un arreglo en casa.
          </p>
          <Link to="/about" className="btn btn-primary">Conocé más sobre nosotros</Link>
        </div>
        <div className="about-media">
          <div className="about-placeholder-image">
            Foto del equipo de ferretería / local
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
