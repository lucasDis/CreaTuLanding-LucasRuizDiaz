import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Drawer lateral del carrito (sheet component)
const CartSheet: React.FC<CartSheetProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-sheet-overlay" onClick={onClose} />

      <div className="cart-sheet">
        {/* Header del sheet */}
        <div className="cart-sheet-header">
          <h2>Tu Carrito</h2>
          <button className="cart-sheet-close" onClick={onClose}>
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Listado de items */}
        <div className="cart-sheet-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">${item.price.toLocaleString()}</p>
                  
                  {/* Controles de cantidad */}
                  <div className="cart-item-quantity">
                    <button onClick={() => decrementQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.id)}>+</button>
                  </div>
                </div>
                
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Eliminar del carrito"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer con total y checkout */}
        {cart.length > 0 && (
          <div className="cart-sheet-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <button className="cart-checkout-button" onClick={handleCheckout}>
              Ir al Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSheet;
