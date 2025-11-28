import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import CartSheet from './CartSheet';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <span style={{ color: 'var(--color-accent)' }}>FERRE</span>TERÍA
            </Link>
          </div>

          {/* Menú hamburguesa (móvil) */}
          <div className="menu-icon" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>

          {/* Enlaces de navegación */}
          <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/category/Herramientas" className="nav-link" onClick={() => setIsOpen(false)}>Herramientas</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/Materiales" className="nav-link" onClick={() => setIsOpen(false)}>Materiales</Link>
            </li>
          </ul>

          {/* Widget del carrito */}
          <div className="cart-container">
              <CartWidget onClick={toggleCart} />
          </div>
        </div>
      </nav>

      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default NavBar;
