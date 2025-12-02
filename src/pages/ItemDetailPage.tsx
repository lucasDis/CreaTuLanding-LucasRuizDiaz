import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, type Product } from '../data/products';
import { useCart } from '../context/CartContext';

const ItemDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError('ID de producto no válido');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const data = await getProductById(Number(id));
                if (data) {
                    setProduct(data);
                    setSelectedImage(data.thumbnail);
                } else {
                    setError('Producto no encontrado');
                }
            } catch (err) {
                setError('Error al cargar el producto');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id.toString(),
                title: product.title,
                price: product.price,
                image: product.thumbnail,
                quantity: quantity
            });
        }
    };

    if (loading) {
        return (
            <div className="page-container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <div className="loading-spinner" />
                <p style={{ marginTop: '1rem', color: '#666' }}>Cargando producto...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="page-container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <h2 style={{ color: '#ff6b6b' }}>{error || 'Producto no encontrado'}</h2>
                <button
                    onClick={() => navigate('/')}
                    className="add-to-cart-btn"
                    style={{ marginTop: '2rem' }}
                >
                    Volver al inicio
                </button>
            </div>
        );
    }

    const finalPrice = product.discountPercentage
        ? product.price * (1 - product.discountPercentage / 100)
        : product.price;

    const images = product.images && product.images.length > 0
        ? product.images
        : [product.thumbnail];

    return (
        <div className="page-container">
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    ← Volver
                </button>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '3rem'
                }}>
                    <div>
                        <div style={{
                            width: '100%',
                            aspectRatio: '1',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            marginBottom: '1rem',
                            background: '#f5f5f5'
                        }}>
                            <img
                                src={selectedImage}
                                alt={product.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/500x500?text=No+Image';
                                }}
                            />
                        </div>

                        {images.length > 1 && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                                gap: '0.5rem'
                            }}>
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        style={{
                                            aspectRatio: '1',
                                            borderRadius: '6px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: selectedImage === img ? '3px solid var(--color-primary)' : '2px solid #ddd',
                                            background: '#f5f5f5'
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.title} - ${idx + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        {product.brand && (
                            <p style={{
                                color: 'var(--color-primary)',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                textTransform: 'uppercase',
                                fontSize: '0.9rem'
                            }}>
                                {product.brand}
                            </p>
                        )}

                        <h1 style={{
                            fontSize: '2rem',
                            marginBottom: '1rem',
                            color: '#2c3e50'
                        }}>
                            {product.title}
                        </h1>

                        {product.rating && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '1rem'
                            }}>
                                <div style={{ color: '#ffc107', fontSize: '1.2rem' }}>
                                    {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
                                </div>
                                <span style={{ color: '#666' }}>({product.rating.toFixed(1)})</span>
                            </div>
                        )}

                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <p style={{
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                color: 'var(--color-primary)'
                            }}>
                                ${finalPrice.toFixed(2)}
                            </p>
                            {product.discountPercentage && product.discountPercentage > 0 && (
                                <>
                                    <span style={{
                                        fontSize: '1.5rem',
                                        color: '#999',
                                        textDecoration: 'line-through'
                                    }}>
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span style={{
                                        background: 'var(--color-accent)',
                                        color: 'white',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold'
                                    }}>
                                        -{product.discountPercentage.toFixed(0)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <p style={{
                            color: '#555',
                            lineHeight: '1.6',
                            marginBottom: '2rem',
                            fontSize: '1.05rem'
                        }}>
                            {product.description}
                        </p>

                        {product.stock !== undefined && (
                            <p style={{
                                marginBottom: '1.5rem',
                                color: product.stock > 10 ? '#27ae60' : '#e74c3c',
                                fontWeight: '600'
                            }}>
                                {product.stock > 0
                                    ? `${product.stock} unidades disponibles`
                                    : 'Sin stock'}
                            </p>
                        )}

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                            marginBottom: '2rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <label htmlFor="quantity" style={{ fontWeight: '600' }}>Cantidad:</label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max={product.stock || 99}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    style={{
                                        width: '80px',
                                        padding: '0.5rem',
                                        border: '2px solid #ddd',
                                        borderRadius: '6px',
                                        fontSize: '1rem',
                                        textAlign: 'center'
                                    }}
                                />
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="add-to-cart-btn"
                                disabled={!product.stock || product.stock === 0}
                                style={{
                                    flex: 1,
                                    padding: '1rem 2rem',
                                    fontSize: '1.1rem',
                                    opacity: (!product.stock || product.stock === 0) ? 0.5 : 1,
                                    cursor: (!product.stock || product.stock === 0) ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Agregar al Carrito
                            </button>
                        </div>

                        {product.category && (
                            <p style={{
                                color: '#666',
                                fontSize: '0.95rem',
                                marginBottom: '0.5rem'
                            }}>
                                <strong>Categoría:</strong> {product.category}
                            </p>
                        )}
                    </div>
                </div>

                {product.reviews && product.reviews.length > 0 && (
                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #ddd' }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                            Reseñas ({product.reviews.length})
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {product.reviews.slice(0, 5).map((review, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '1rem',
                                        background: '#f9f9f9',
                                        borderRadius: '8px',
                                        border: '1px solid #e0e0e0'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <strong>{review.reviewerName}</strong>
                                        <div style={{ color: '#ffc107' }}>
                                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                        </div>
                                    </div>
                                    <p style={{ color: '#555', fontSize: '0.95rem' }}>
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemDetailPage;
