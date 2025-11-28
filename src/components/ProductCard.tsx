```typescript
import React from 'react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price?: number; // Precio del producto
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, description, image, price = 10000 }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price,
      image,
      quantity: 1
    });
  };

  return (
    <div className="product-card fade-in">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-info">
        <span className="product-id">ID: {id}</span>
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        <p className="product-price">${price.toLocaleString()}</p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
```
