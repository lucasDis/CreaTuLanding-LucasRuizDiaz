import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import CartSheet from './CartSheet';

const NavBar: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

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
              <span style={{ color: 'var(--color-accent)' }}>TYPE</span>STORE
            </Link>
          </div>

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
