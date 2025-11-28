import React, { useEffect } from 'react';

interface AlertProps {
    type: 'success' | 'error' | 'info';
    message: string;
    onClose: () => void;
    duration?: number;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getBackgroundColor = () => {
        switch (type) {
            case 'success': return '#2ecc71';
            case 'error': return '#e74c3c';
            case 'info': return '#3498db';
            default: return '#34495e';
        }
    };

    const styles: React.CSSProperties = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: getBackgroundColor(),
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '90%',
    };

    return (
        <div style={styles}>
            <span>{message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    padding: '0 0.5rem'
                }}
            >
                &times;
            </button>
        </div>
    );
};

export default Alert;
