import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      gap: '1.5rem',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '4rem',
        color: 'var(--color-danger, #E74C3C)'
      }}>
        ⚠️
      </div>
      
      <div>
        <h3 style={{ 
          color: 'var(--color-primary)', 
          marginBottom: '0.5rem',
          fontSize: '1.5rem'
        }}>
          Oops! Algo salió mal
        </h3>
        <p style={{ 
          color: '#666',
          fontSize: '1rem',
          maxWidth: '500px'
        }}>
          {message}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#34495e'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
        >
          Intentar nuevamente
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
