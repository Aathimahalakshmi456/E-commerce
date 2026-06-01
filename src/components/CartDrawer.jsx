import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const FREE_SHIPPING_THRESHOLD = 150;
  
  // Calculate pricing numbers
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal === 0 ? 0 : (isFreeShipping ? 0 : 9.99);
  const taxRate = 0.08; // 8% estimated tax
  const estimatedTax = subtotal * taxRate;
  const grandTotal = subtotal + shippingFee + estimatedTax;
  
  // Progress bar calculation
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className={`drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div 
        className="cart-drawer-container" 
        onClick={(e) => e.stopPropagation()} /* Prevent background clicks from closing */
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <h2 className="drawer-title">
            <ShoppingBag size={20} className="gradient-text" />
            <span>Shopping Cart</span>
          </h2>
          <button className="drawer-close-btn" onClick={onClose} title="Close drawer">
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress (Only show if there are items) */}
        {cartItems.length > 0 && (
          <div className="shipping-progress-container">
            <div className="shipping-text">
              {isFreeShipping ? (
                <span>🎉 <span className="shipping-text-success">Free Shipping unlocked!</span> Your order qualifies for free delivery.</span>
              ) : (
                <span>Add <span style={{ fontWeight: 700, color: 'hsl(var(--accent-primary))' }}>${amountToFreeShipping.toFixed(2)}</span> more to unlock <strong>FREE SHIPPING</strong>!</span>
              )}
            </div>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Drawer Body - Items list */}
        <div className="drawer-body-items">
          {cartItems.length > 0 ? (
            cartItems.map(({ product, quantity }) => (
              <div className="cart-item-row" key={product.id}>
                {/* Product thumbnail */}
                <div className="cart-item-img-box">
                  <img src={product.image} alt={product.name} className="cart-item-img" />
                </div>
                
                {/* Details & Controls */}
                <div className="cart-item-info">
                  <div>
                    <h4 className="cart-item-title">{product.name}</h4>
                    <p className="cart-item-tagline">{product.tagline}</p>
                  </div>
                  
                  {/* Quantity adjustments */}
                  <div className="cart-item-adjusters">
                    <div className="quantity-control">
                      <button 
                        className="qty-btn" 
                        onClick={() => onUpdateQty(product.id, quantity - 1)}
                        title="Reduce quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-val">{quantity}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => onUpdateQty(product.id, quantity + 1)}
                        title="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button 
                      className="cart-item-btn-remove"
                      onClick={() => onRemoveItem(product.id)}
                      title="Remove product"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Sub-price display */}
                <div className="cart-item-pricing">
                  <span className="cart-item-price-sum">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-tertiary))', marginTop: '0.2rem' }}>
                    ${product.price.toFixed(2)} each
                  </span>
                </div>
              </div>
            ))
          ) : (
            /* Empty Cart Placeholder */
            <div className="drawer-empty-cart">
              <ShoppingBag size={48} strokeWidth={1} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
              <h3>Your cart is empty</h3>
              <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', maxWidth: '250px' }}>
                Explore our premium essentials catalog and add products to start your collection.
              </p>
              <button 
                className="btn-secondary" 
                style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', width: 'auto' }}
                onClick={onClose}
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer calculations (Only active if items exist) */}
        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="price-summary-line">
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="price-summary-line">
              <span>Estimated Shipping</span>
              <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            
            <div className="price-summary-line">
              <span>Estimated Sales Tax (8%)</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>

            <div className="price-summary-total">
              <span>Total Amount</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <button className="btn-checkout-drawer" onClick={onProceedToCheckout}>
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
