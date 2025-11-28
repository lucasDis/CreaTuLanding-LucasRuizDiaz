import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Compra completada con éxito! Gracias por tu compra.');
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="breadcrumb-container">
        <Breadcrumb />
      </div>

      <div className="checkout-container">
        <h1>Finalizar Compra</h1>

        <div className="checkout-layout">
          <div className="checkout-form">
            <h2>Datos de Envío</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" placeholder="Juan Pérez" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="juan@example.com" required />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input type="text" placeholder="Calle Falsa 123" required />
              </div>
              <button type="submit" className="confirm-btn">Confirmar Compra</button>
            </form>
          </div>

          <div className="checkout-summary">
            <h2>Resumen del Pedido</h2>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>$15,000</span>
            </div>
            <div className="summary-item">
              <span>Envío</span>
              <span>$1,500</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>$16,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
