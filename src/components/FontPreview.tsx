import React, { useState } from 'react';

interface FontPreviewProps {
    fontFamily: string;
}

const FontPreview: React.FC<FontPreviewProps> = ({ fontFamily }) => {
    const [text, setText] = useState('The quick brown fox jumps over the lazy dog');
    const [size, setSize] = useState(32);
    const [weight, setWeight] = useState(400);

    return (
        <div className="preview-container" style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
        }}>
            <h3 style={{ marginBottom: '15px' }}>Preview</h3>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Text</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type something..."
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>

                <div style={{ width: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Size: {size}px</label>
                    <input
                        type="range"
                        min="12"
                        max="120"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ width: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Weight: {weight}</label>
                    <select
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    >
                        <option value="300">Light (300)</option>
                        <option value="400">Regular (400)</option>
                        <option value="700">Bold (700)</option>
                    </select>
                </div>
            </div>

            <div
                style={{
                    fontFamily: fontFamily,
                    fontSize: `${size}px`,
                    fontWeight: weight,
                    minHeight: '100px',
                    wordBreak: 'break-word',
                    lineHeight: 1.5
                }}
            >
                {text}
            </div>
        </div>
    );
};

export default FontPreview;
