import React from 'react';
import { useCart } from '../context/CartContext';

interface CartWidgetProps {
  onClick: () => void;
}

const CartWidget: React.FC<CartWidgetProps> = ({ onClick }) => {
  const { totalItems } = useCart();

  return (
    <div onClick={onClick} style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}>
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
        style={{ color: 'white' }}
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {totalItems > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-primary)',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartWidget;
