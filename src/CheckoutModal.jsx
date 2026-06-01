import React, { useState, useMemo } from "react";

const CheckoutModal = ({ isOpen, onClose, cartItems, onClearCart }) => {
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [cartItems]
  );

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (paymentMethod === "PHONEPE") {
      alert("Simulating PhonePe payment... ✅");
    } else if (paymentMethod === "GPAY") {
      alert("Simulating Google Pay payment... ✅");
    } else if (paymentMethod === "CARD") {
      alert("Simulating Card / Netbanking payment... ✅");
    } else {
      alert("Order placed with Cash on Delivery ✅");
    }

    onClearCart();
    onClose();
  };

  return (
    <div className="checkout-backdrop">
      <div className="checkout-modal">
        <header className="checkout-header">
          <h2>Secure Checkout</h2>
          <button className="checkout-close" onClick={onClose}>
            ×
          </button>
        </header>

        <section className="checkout-body">
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.product.id} className="checkout-line">
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="checkout-total">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="checkout-payment">
            <h3>Payment Method</h3>

            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  value="PHONEPE"
                  checked={paymentMethod === "PHONEPE"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>PhonePe</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  value="GPAY"
                  checked={paymentMethod === "GPAY"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Google Pay (GPay)</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  value="CARD"
                  checked={paymentMethod === "CARD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Card / Netbanking</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>
        </section>

        <footer className="checkout-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handlePlaceOrder}>
            Pay {totalAmount > 0 ? `$${totalAmount.toFixed(2)}` : ""}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CheckoutModal;