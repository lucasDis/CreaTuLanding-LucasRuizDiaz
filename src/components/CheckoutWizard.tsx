import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Tipos para el estado del formulario
interface CheckoutFormData {
    // Datos Tarjeta
    cardNumber: string;
    cardName: string;
    cardExpiry: string;
    cardCvc: string;
    // Datos Envío
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
}

interface FormErrors {
    [key: string]: boolean;
}

const CheckoutWizard: React.FC = () => {
    const navigate = useNavigate();
    const { totalPrice } = useCart();
    const [currentStep, setCurrentStep] = useState(1);

    // Calcular envío y total
    const shippingCost = 1500;
    const finalTotal = totalPrice + shippingCost;

    // Estado único para todos los campos
    const [formData, setFormData] = useState<CheckoutFormData>({
        cardNumber: '', cardName: '', cardExpiry: '', cardCvc: '',
        fullName: '', email: '', address: '', city: '', zipCode: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // Auto-scroll al cambiar paso
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep]);

    // Manejo de cambios en inputs con auto-formato
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formatted = value;

        // Auto-formato para número de tarjeta
        if (name === 'cardNumber') {
            formatted = value.replace(/\D/g, '').substring(0, 16);
            formatted = formatted.replace(/(.{4})/g, '$1 ').trim();
        }

        // Auto-formato para fecha de vencimiento
        if (name === 'cardExpiry') {
            formatted = value.replace(/\D/g, '').substring(0, 4);
            if (formatted.length >= 2) {
                formatted = formatted.substring(0, 2) + '/' + formatted.substring(2);
            }
        }

        setFormData(prev => ({ ...prev, [name]: formatted }));

        // Limpiar error al escribir
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    // Validaciones por paso
    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (step === 1) { // Validación Tarjeta
            if (formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = true;
            if (!formData.cardName) newErrors.cardName = true;
            if (formData.cardExpiry.length < 5) newErrors.cardExpiry = true;
            if (formData.cardCvc.length < 3) newErrors.cardCvc = true;
        }

        if (step === 2) { // Validación Domicilio
            if (!formData.fullName) newErrors.fullName = true;
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = true;
            if (!formData.address) newErrors.address = true;
            if (!formData.city) newErrors.city = true;
            if (!formData.zipCode) newErrors.zipCode = true;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
        }

        return isValid;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const confirmOrder = () => {
        alert('¡Compra completada con éxito! Gracias por tu compra.');
        navigate('/');
    };

    // Renderizado del stepper
    const renderStepper = () => {
        const steps = [
            { num: 1, label: 'Pago' },
            { num: 2, label: 'Envío' },
            { num: 3, label: 'Confirmar' }
        ];

        return (
            <div className="checkout-steps">
                {steps.map((step) => (
                    <div
                        key={step.num}
                        className={`step-item ${currentStep === step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}
                    >
                        <div className="step-circle">
                            {currentStep > step.num ? '✓' : step.num}
                        </div>
                        <span className="step-label">{step.label}</span>
                    </div>
                ))}
            </div>
        );
    };

    // --- Renderizado de Pasos ---

    const renderStep1 = () => (
        <div className="form-section active">
            <h2><span style={{ color: 'var(--color-accent)' }}>01.</span> Método de Pago</h2>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>Ingresa los datos de tu tarjeta (Simulación).</p>

            <div className="form-group">
                <label>Número de Tarjeta</label>
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={errors.cardNumber ? 'error' : ''}
                    maxLength={19}
                />
                {errors.cardNumber && <span className="error-text visible">Número de tarjeta inválido (16 dígitos)</span>}
            </div>

            <div className="form-group">
                <label>Nombre del Titular</label>
                <input
                    type="text"
                    name="cardName"
                    placeholder="COMO FIGURA EN LA TARJETA"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={errors.cardName ? 'error' : ''}
                    style={{ textTransform: 'uppercase' }}
                />
                {errors.cardName && <span className="error-text visible">Nombre requerido</span>}
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label>Vencimiento (MM/AA)</label>
                    <input
                        type="text"
                        name="cardExpiry"
                        placeholder="12/25"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        className={errors.cardExpiry ? 'error' : ''}
                        maxLength={5}
                    />
                    {errors.cardExpiry && <span className="error-text visible">Fecha inválida</span>}
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input
                        type="password"
                        name="cardCvc"
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        maxLength={4}
                        className={errors.cardCvc ? 'error' : ''}
                    />
                    {errors.cardCvc && <span className="error-text visible">Código inválido</span>}
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="form-section active">
            <h2><span style={{ color: 'var(--color-accent)' }}>02.</span> Datos de Envío</h2>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>¿A dónde enviamos tu pedido?</p>

            <div className="form-group">
                <label>Nombre Completo</label>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Juan Pérez"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-text visible">Nombre completo requerido</span>}
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="juan@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text visible">Email inválido</span>}
            </div>

            <div className="form-group">
                <label>Dirección</label>
                <input
                    type="text"
                    name="address"
                    placeholder="Calle Falsa 123"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-text visible">Dirección requerida</span>}
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label>Ciudad</label>
                    <input
                        type="text"
                        name="city"
                        placeholder="Buenos Aires"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-text visible">Ciudad requerida</span>}
                </div>
                <div className="form-group">
                    <label>Código Postal</label>
                    <input
                        type="text"
                        name="zipCode"
                        placeholder="1001"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={errors.zipCode ? 'error' : ''}
                    />
                    {errors.zipCode && <span className="error-text visible">CP requerido</span>}
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="form-section active">
            <h2><span style={{ color: 'var(--color-accent)' }}>03.</span> Confirmación</h2>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>Por favor revisa que todos los datos sean correctos.</p>

            <div className="review-section">
                <h3>Datos de Pago</h3>
                <div className="review-grid">
                    <div className="review-item">
                        <strong>Tarjeta</strong>
                        <span>**** **** **** {formData.cardNumber.slice(-4) || '0000'}</span>
                    </div>
                    <div className="review-item">
                        <strong>Titular</strong>
                        <span>{formData.cardName || '-'}</span>
                    </div>
                </div>
            </div>

            <div className="review-section">
                <h3>Datos de Envío</h3>
                <div className="review-grid">
                    <div className="review-item">
                        <strong>Destinatario</strong>
                        <span>{formData.fullName || '-'}</span>
                    </div>
                    <div className="review-item">
                        <strong>Dirección</strong>
                        <span>{formData.address ? `${formData.address}, ${formData.city} (CP: ${formData.zipCode})` : '-'}</span>
                    </div>
                    <div className="review-item">
                        <strong>Email</strong>
                        <span>{formData.email || '-'}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="checkout-wizard-container">
            {renderStepper()}

            <div className="checkout-layout">
                {/* COLUMNA IZQUIERDA: FORMULARIOS */}
                <div className="checkout-main">
                    <form onSubmit={(e) => e.preventDefault()}>
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}
                        {currentStep === 3 && renderStep3()}

                        <div className="checkout-actions">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="btn btn-outline"
                                style={{ visibility: currentStep > 1 ? 'visible' : 'hidden' }}
                            >
                                Atrás
                            </button>

                            {currentStep < 3 ? (
                                <button type="button" onClick={handleNext} className="btn btn-primary">
                                    Siguiente
                                </button>
                            ) : (
                                <button type="button" onClick={confirmOrder} className="btn btn-success">
                                    Confirmar y Pagar
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* COLUMNA DERECHA: RESUMEN MONETARIO */}
                <div className="checkout-sidebar">
                    <h2>Resumen</h2>
                    <div className="summary-item">
                        <span>Subtotal</span>
                        <span>${totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="summary-item">
                        <span>Envío</span>
                        <span>${shippingCost.toLocaleString()}</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>${finalTotal.toLocaleString()}</span>
                    </div>

                    <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#777', padding: '1rem', backgroundColor: '#f0f3f4', borderRadius: '4px' }}>
                        <p>🔒 <strong>Pago Seguro</strong><br />Tus datos están protegidos con encriptación SSL de 256-bits.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutWizard;
