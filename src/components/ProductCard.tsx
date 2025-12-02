import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rating?: number;
  discountPercentage?: number;
  stock?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  price,
  rating,
  discountPercentage,
  stock
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: id.toString(),
      title,
      price,
      image: thumbnail,
      quantity: 1
    });
  };

  const finalPrice = discountPercentage
    ? price * (1 - discountPercentage / 100)
    : price;

  return (
    <Link to={`/item/${id}`} className="product-card fade-in" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-image-container">
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        {discountPercentage && discountPercentage > 0 && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'var(--color-accent)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '0.85rem',
            fontWeight: 'bold'
          }}>
            -{discountPercentage.toFixed(0)}%
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>

        {rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', margin: '5px 0' }}>
            <span style={{ color: '#ffc107' }}>★</span>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>{rating.toFixed(1)}</span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
          <p className="product-price">${finalPrice.toFixed(2)}</p>
          {discountPercentage && discountPercentage > 0 && (
            <span style={{
              fontSize: '0.9rem',
              color: '#999',
              textDecoration: 'line-through'
            }}>
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {stock !== undefined && stock < 10 && stock > 0 && (
          <p style={{ fontSize: '0.85rem', color: '#ff6b6b', margin: '5px 0' }}>
            Solo quedan {stock} en stock
          </p>
        )}

        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Agregar al Carrito
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
