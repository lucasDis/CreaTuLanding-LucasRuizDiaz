import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fonts } from '../data/fonts';
import FontPreview from './FontPreview';

const ItemDetailContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [font, setFont] = useState(fonts.find(f => f.id === id));

    useEffect(() => {
        const foundFont = fonts.find(f => f.id === id);
        setFont(foundFont);

        if (foundFont) {
            const link = document.createElement('link');
            link.href = foundFont.googleFontsUrl;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }, [id]);

    if (!font) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Font not found</div>;
    }

    return (
        <div className="item-detail-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#666', marginBottom: '20px', display: 'inline-block' }}>
                &larr; Back to Catalog
            </Link>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', fontFamily: font.nombre }}>{font.nombre}</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>{font.descripcion}</p>

                    <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>Category:</span>
                        <span style={{ padding: '4px 10px', backgroundColor: '#eee', borderRadius: '15px' }}>{font.categoria}</span>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Variants:</span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {font.variantes.map(variant => (
                                <span key={variant} style={{ padding: '4px 10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    {variant}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button style={{
                        padding: '12px 24px',
                        backgroundColor: 'var(--color-accent, #000)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}>
                        Add to Cart - ${font.precio}
                    </button>
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <FontPreview fontFamily={font.nombre} />
                </div>
            </div>
        </div>
    );
};

export default ItemDetailContainer;
