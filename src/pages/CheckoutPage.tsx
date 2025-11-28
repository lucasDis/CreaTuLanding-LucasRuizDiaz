import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CheckoutWizard from '../components/CheckoutWizard';

const CheckoutPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="breadcrumb-container">
        <Breadcrumb />
      </div>

      <div className="checkout-container">
        <h1>Finalizar Compra</h1>
        <CheckoutWizard />
      </div>
    </div>
  );
};

export default CheckoutPage;
