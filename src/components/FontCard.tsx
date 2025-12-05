import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Font {
    id: string;
    nombre: string;
    categoria: string;
    googleFontsUrl: string;
}

interface FontCardProps {
    font: Font;
}

const FontCard: React.FC<FontCardProps> = ({ font }) => {

    useEffect(() => {
        // Dynamically load the font from Google Fonts
        const link = document.createElement('link');
        link.href = font.googleFontsUrl;
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        return () => {
            // Cleanup is tricky with appending to head, usually we might check if it exists
            // but for this simple implementation we'll leave it or manage duplicates if needed.
            // A better approach in a real app is a centralized font loader.
        };
    }, [font.googleFontsUrl]);

    return (
        <Link to={`/item/${font.id}`} className="font-card" style={{
            display: 'block',
            padding: '20px',
            border: '1px solid #eee',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.2s, box-shadow 0.2s',
            backgroundColor: '#fff'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{font.nombre}</h3>
                <span style={{
                    fontSize: '0.8rem',
                    padding: '4px 8px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '12px',
                    color: '#666'
                }}>
                    {font.categoria}
                </span>
            </div>
            <div className="preview" style={{
                fontFamily: font.nombre,
                fontSize: '2rem',
                marginTop: '15px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                Aa Bb Cc 123
            </div>
            <p style={{
                fontFamily: font.nombre,
                fontSize: '1rem',
                color: '#888',
                marginTop: '10px'
            }}>
                The quick brown fox jumps over the lazy dog
            </p>
        </Link>
    );
};

export default FontCard;
