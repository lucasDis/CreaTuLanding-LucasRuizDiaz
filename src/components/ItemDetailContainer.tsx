import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FontPreview from './FontPreview';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { useCart } from '../context/CartContext';
import { useFont } from '../hooks/useFonts';
import { generatePlaceholderImage } from '../utils/imagePlaceholder';
import { useState } from 'react';

// Vista de detalle de tipografía con preview
const ItemDetailContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart, isInCart } = useCart();
    const [addedToCart, setAddedToCart] = useState(false);
    
    // Fetch de tipografía desde Firestore
    const { font, loading, error } = useFont(id);

    const itemInCart = id ? isInCart(id) : false;

    // Cargar Google Font dinámicamente
    useEffect(() => {
        if (font && font.googleFontsUrl) {
            const link = document.createElement('link');
            link.href = font.googleFontsUrl;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }, [font]);

    // Handler para agregar al carrito
    const handleAddToCart = () => {
        if (!font) return;
        
        addToCart({
            id: font.id || id || '',
            title: font.nombre,
            price: font.precio,
            image: generatePlaceholderImage(font.nombre, 100),
            quantity: 1
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    // Estado de loading
    if (loading) {
        return (
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
                <LoadingSpinner message="Cargando tipografía..." />
            </div>
        );
    }

    // Estado de error
    if (error || !font) {
        return (
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#666', marginBottom: '20px', display: 'inline-block' }}>
                    ← Volver al Catálogo
                </Link>
                <ErrorMessage 
                    message={error || 'Tipografía no encontrada'} 
                />
            </div>
        );
    }

    // Render principal
    return (
        <div className="item-detail-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 20px 20px 40px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#666', marginBottom: '20px', display: 'inline-block' }}>
                ← Volver al Catálogo
            </Link>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px' }}>
                {/* Información del producto */}
                <div style={{ flex: '0 0 400px', minWidth: '300px' }}>
                    <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', fontFamily: font.nombre }}>{font.nombre}</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>{font.descripcion}</p>

                    <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>Categoría:</span>
                        <span style={{ padding: '4px 10px', backgroundColor: '#eee', borderRadius: '15px' }}>{font.categoria}</span>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Variantes:</span>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {font.variantes.map(variant => (
                                <span key={variant} style={{ padding: '4px 10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    {variant}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Métricas de popularidad y ventas */}
                    {((font as any).popularidad || (font as any).ventas) && (
                        <div style={{ marginBottom: '30px', display: 'flex', gap: '20px' }}>
                            {(font as any).popularidad && (
                                <div>
                                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '0.9rem', color: '#666' }}>Popularidad</span>
                                    <span style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}>⭐ {(font as any).popularidad}</span>
                                </div>
                            )}
                            {(font as any).ventas && (
                                <div>
                                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '0.9rem', color: '#666' }}>Ventas</span>
                                    <span style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>🔥 {(font as any).ventas}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Botón de agregar al carrito con estados */}
                    <button 
                        onClick={handleAddToCart}
                        disabled={itemInCart}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: itemInCart 
                                ? '#95a5a6' 
                                : addedToCart 
                                    ? '#4CAF50' 
                                    : 'var(--color-accent, #000)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            cursor: itemInCart ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.3s ease',
                            opacity: itemInCart ? 0.6 : 1
                        }}
                        title={itemInCart ? 'Ya está en el carrito' : ''}
                    >
                        {itemInCart 
                            ? '✓ En el carrito' 
                            : addedToCart 
                                ? '✓ Agregado' 
                                : `Agregar al carrito - $${font.precio}`
                        }
                    </button>
                </div>

                {/* Preview de la tipografía */}
                <div style={{ flex: '1 1 auto', minWidth: '400px', maxWidth: '800px' }}>
                    <FontPreview fontFamily={font.nombre} />
                </div>
            </div>
        </div>
    );
};

export default ItemDetailContainer;
