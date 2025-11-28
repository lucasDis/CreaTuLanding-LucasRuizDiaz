import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <h3>Mantenete al día</h3>
          <p>Suscribite para recibir ofertas y novedades.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Ingresá tu email" required />
            <button type="submit" className="btn btn-accent">Suscribirme</button>
          </form>
        </div>

        {/* Navigation Links */}
        <div className="footer-column">
          <h3>Secciones</h3>
          <ul>
            <li><Link to="/category/Herramientas">Herramientas</Link></li>
            <li><Link to="/category/Materiales">Materiales</Link></li>
            <li><Link to="/#about">Sobre nosotros</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Ferretería Plus. Todos los derechos reservados.</p>
          <div className="footer-help-links">
            <Link to="#">Preguntas frecuentes</Link>
            <Link to="#">Envíos y devoluciones</Link>
            <Link to="#">Contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
