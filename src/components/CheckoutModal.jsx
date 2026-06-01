import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, ShieldAlert, BadgeCheck, Check, ShoppingBag } from 'lucide-react';

const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [shippingForm, setShippingForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [orderId] = useState(() => `AAD-${Math.floor(100000 + Math.random() * 900000)}`);

  // Calculate pricing numbers
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 150;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal === 0 ? 0 : (isFreeShipping ? 0 : 9.99);
  const taxRate = 0.08;
  const estimatedTax = subtotal * taxRate;
  const grandTotal = subtotal + shippingFee + estimatedTax;

  // Handle shipping form changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle payment form changes & formatting
  const handlePaymentChange = (e) => {
    let { name, value } = e.target;

    if (name === 'cardNumber') {
      // Allow only numbers and format as 0000 0000 0000 0000
      value = value.replace(/\s?/g, '').replace(/\D/g, '');
      const parts = [];
      for (let i = 0; i < value.length; i += 4) {
        parts.push(value.substring(i, i + 4));
      }
      value = parts.join(' ').substring(0, 19);
    } else if (name === 'expiry') {
      // Allow only numbers and format as MM/YY
      value = value.replace(/\D/g, '');
      if (value.length > 2) {
        value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
      }
      value = value.substring(0, 5);
    } else if (name === 'cvv') {
      // Allow only up to 3 numbers
      value = value.replace(/\D/g, '').substring(0, 3);
    }

    setPaymentForm(prev => ({ ...prev, [name]: value }));
  };

  // Form validations before proceeding
  const isShippingValid = () => {
    const { name, email, address, city, state, zip } = shippingForm;
    return name.trim() !== '' && email.trim() !== '' && email.includes('@') && address.trim() !== '' && city.trim() !== '' && state.trim() !== '' && zip.trim() !== '';
  };

  const isPaymentValid = () => {
    const { cardName, cardNumber, expiry, cvv } = paymentForm;
    return cardName.trim() !== '' && cardNumber.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvv.length === 3;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && isShippingValid()) {
      setStep(2);
    } else if (step === 2 && isPaymentValid()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSuccessClose = () => {
    onClearCart();
    onClose();
    // Reset wizard
    setStep(1);
    setShippingForm({ name: '', email: '', address: '', city: '', state: '', zip: '' });
    setPaymentForm({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  };

  return (
    <div className={`modal-overlay active`} onClick={step === 3 ? handleSuccessClose : onClose}>
      <div 
        className="checkout-box" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Wizard Header & Progress Bar */}
        <div className="checkout-wizard-header">
          <h3 style={{ fontWeight: 700, fontFamily: 'var(--font-headings)' }}>
            Checkout Wizard
          </h3>
          
          <div className="checkout-steps-tracker">
            <div className={`step-indicator ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-num">{step > 1 ? <Check size={12} strokeWidth={3} /> : '1'}</div>
              <span>Shipping</span>
            </div>
            
            <div className={`step-indicator ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <div className="step-num">{step > 2 ? <Check size={12} strokeWidth={3} /> : '2'}</div>
              <span>Payment</span>
            </div>
            
            <div className={`step-indicator ${step === 3 ? 'active' : ''}`}>
              <div className="step-num">3</div>
              <span>Receipt</span>
            </div>
          </div>

          {step !== 3 && (
            <button className="drawer-close-btn" onClick={onClose}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Wizard Form/Content Body */}
        <div className="checkout-wizard-body">
          {step === 1 && (
            /* ================== STEP 1: SHIPPING INFO ================== */
            <form onSubmit={handleNextStep} style={{ animation: 'fade-slide-in 0.3s ease-out' }}>
              <div className="form-grid">
                <div className="form-group form-full-row">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="form-control-input"
                    placeholder="John Doe"
                    value={shippingForm.name}
                    onChange={handleShippingChange}
                  />
                </div>

                <div className="form-group form-full-row">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="form-control-input"
                    placeholder="johndoe@example.com"
                    value={shippingForm.email}
                    onChange={handleShippingChange}
                  />
                </div>

                <div className="form-group form-full-row">
                  <label htmlFor="address">Delivery Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    className="form-control-input"
                    placeholder="123 tech parkway, suite 5"
                    value={shippingForm.address}
                    onChange={handleShippingChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    className="form-control-input"
                    placeholder="San Francisco"
                    value={shippingForm.city}
                    onChange={handleShippingChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    className="form-control-input"
                    placeholder="California"
                    value={shippingForm.state}
                    onChange={handleShippingChange}
                  />
                </div>

                <div className="form-group form-full-row">
                  <label htmlFor="zip">ZIP / Postal Code</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    required
                    className="form-control-input"
                    placeholder="94107"
                    value={shippingForm.zip}
                    onChange={handleShippingChange}
                  />
                </div>
              </div>

              {/* Total reminder banner */}
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', padding: '0.75rem', background: 'hsl(var(--bg-tertiary) / 0.3)', borderRadius: 'var(--radius-sm)' }}>
                <span>Order Total:</span>
                <strong style={{ color: 'hsl(var(--text-primary))' }}>${grandTotal.toFixed(2)}</strong>
              </div>

              {/* Step Actions */}
              <div className="wizard-action-footer">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={!isShippingValid()}
                  style={{ opacity: isShippingValid() ? 1 : 0.6, cursor: isShippingValid() ? 'pointer' : 'not-allowed' }}
                >
                  <span>Continue to Payment</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            /* ================== STEP 2: INTERACTIVE PAYMENT ================== */
            <form onSubmit={handleNextStep} style={{ animation: 'fade-slide-in 0.3s ease-out' }}>
              
              {/* Gorgeous Interactive Credit Card Preview */}
              <div className="card-preview-viewport">
                <div className={`card-mockup-wrapper ${isCardFlipped ? 'flipped' : ''}`}>
                  
                  {/* Card Front Side */}
                  <div className="card-face card-front">
                    <div className="card-header-logo">
                      <div className="card-chip"></div>
                      <span className="card-provider">aadhii's Pay</span>
                    </div>

                    <div className="card-preview-number">
                      {paymentForm.cardNumber || "•••• •••• •••• ••••"}
                    </div>

                    <div className="card-preview-meta">
                      <div className="card-meta-block">
                        <span className="card-meta-label">Card Holder</span>
                        <span className="card-meta-val">
                          {paymentForm.cardName.toUpperCase() || "YOUR NAME"}
                        </span>
                      </div>
                      
                      <div className="card-meta-block">
                        <span className="card-meta-label">Expires</span>
                        <span className="card-meta-val">
                          {paymentForm.expiry || "MM/YY"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Back Side (CVV focused) */}
                  <div className="card-face card-back">
                    <div className="card-mag-stripe"></div>
                    <div className="card-cvv-stripe">
                      <span className="card-cvv-val">
                        {paymentForm.cvv || "•••"}
                      </span>
                    </div>
                    <p className="card-back-text">
                      This virtual card is simulated. Any payment details entered here are secure and will not be charged or processed externally.
                    </p>
                  </div>

                </div>
              </div>

              {/* Form Input fields */}
              <div className="form-grid">
                <div className="form-group form-full-row">
                  <label htmlFor="cardName">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    required
                    className="form-control-input"
                    placeholder="John Doe"
                    value={paymentForm.cardName}
                    onChange={handlePaymentChange}
                    onFocus={() => setIsCardFlipped(false)}
                  />
                </div>

                <div className="form-group form-full-row">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                    className="form-control-input"
                    placeholder="4111 2222 3333 4444"
                    value={paymentForm.cardNumber}
                    onChange={handlePaymentChange}
                    onFocus={() => setIsCardFlipped(false)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="expiry">Expiration Date</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    required
                    className="form-control-input"
                    placeholder="MM/YY"
                    value={paymentForm.expiry}
                    onChange={handlePaymentChange}
                    onFocus={() => setIsCardFlipped(false)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV Code</label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    required
                    className="form-control-input"
                    placeholder="•••"
                    value={paymentForm.cvv}
                    onChange={handlePaymentChange}
                    onFocus={() => setIsCardFlipped(true)}
                    onBlur={() => setIsCardFlipped(false)}
                  />
                </div>
              </div>

              {/* Step Actions */}
              <div className="wizard-action-footer">
                <button type="button" className="btn-secondary" onClick={handlePrevStep}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ArrowLeft size={14} />
                    <span>Back to Shipping</span>
                  </div>
                </button>
                
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={!isPaymentValid()}
                  style={{ opacity: isPaymentValid() ? 1 : 0.6, cursor: isPaymentValid() ? 'pointer' : 'not-allowed' }}
                >
                  <span>Pay ${grandTotal.toFixed(2)}</span>
                  <Check size={14} strokeWidth={2.5} />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            /* ================== STEP 3: SUCCESS STATE / RECEIPT ================== */
            <div className="success-checkout-container" style={{ animation: 'fade-slide-in 0.4s ease-out' }}>
              <div className="checkmark-circle">
                <BadgeCheck size={36} strokeWidth={2.5} />
              </div>
              
              <h2 className="success-title">Order Confirmed!</h2>
              <p className="success-text">
                Thank you for your purchase, <strong>{shippingForm.name}</strong>. Your payment was simulated successfully and your tracking number is ready.
              </p>

              {/* Simulated Detailed Receipt Box */}
              <div className="order-receipt-box">
                <div className="receipt-row">
                  <span style={{ color: 'hsl(var(--text-tertiary))' }}>Order Tracking Number</span>
                  <span className="receipt-val-bold">{orderId}</span>
                </div>
                
                <div className="receipt-row">
                  <span style={{ color: 'hsl(var(--text-tertiary))' }}>Estimated Delivery</span>
                  <span className="receipt-val-bold">3 - 5 Business Days</span>
                </div>

                <div className="receipt-row">
                  <span style={{ color: 'hsl(var(--text-tertiary))' }}>Deliver to</span>
                  <span>{shippingForm.city}, {shippingForm.state}</span>
                </div>

                <div className="receipt-row" style={{ marginTop: '0.4rem', borderTop: '1px solid hsl(var(--border-light))', paddingTop: '0.4rem' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="receipt-row">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                </div>

                <div className="receipt-row">
                  <span>Estimated Tax</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="receipt-row receipt-total-row">
                  <span>Grand Total Paid</span>
                  <span className="gradient-text">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="btn-checkout-drawer" style={{ width: 'auto', padding: '0.75rem 2rem' }} onClick={handleSuccessClose}>
                <ShoppingBag size={14} />
                <span>Return to Store</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
