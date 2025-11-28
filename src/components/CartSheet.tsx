import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSheet: React.FC<CartSheetProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div className="cart-sheet-overlay" onClick={onClose} />

      {/* Panel del carrito */}
      <div className="cart-sheet">
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

        <div className="cart-sheet-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.title}</h4>
                    <p className="cart-item-price">${item.price.toLocaleString()}</p>
                    <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Eliminar del carrito"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-sheet-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSheet;
