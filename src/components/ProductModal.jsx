import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const ProductModal = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const { name, tagline, category, price, rating, reviewsCount, image, description, specs, reviews, inStock } = product;
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews'

  return (
    <div className={`modal-overlay ${product ? 'active' : ''}`} onClick={onClose}>
      <div 
        className="detail-modal-box" 
        onClick={(e) => e.stopPropagation()} /* Stop propagation to avoid closing on inner clicks */
      >
        {/* Absolute floating close button */}
        <button className="modal-close-abs" onClick={onClose} title="Close Details">
          <X size={18} />
        </button>

        {/* Modal Structure Grid */}
        <div className="detail-grid-container">
          
          {/* Left Column: Media & Trust Badges */}
          <div className="detail-visuals">
            <div className="detail-img-box">
              <img src={image} alt={name} className="detail-img" />
            </div>

            {/* Premium Trust Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'hsl(var(--text-secondary))' }}>
                <ShieldCheck size={14} style={{ color: 'hsl(var(--accent-secondary))' }} />
                <span>2 Year Warranty</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'hsl(var(--text-secondary))' }}>
                <Truck size={14} style={{ color: 'hsl(var(--accent-secondary))' }} />
                <span>Fast Track Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Content & Specs Tabs */}
          <div className="detail-content">
            <span className="detail-category-header">{category}</span>
            <h2 className="detail-title">{name}</h2>
            
            {/* Reviews Summary */}
            <div className="detail-ratings-row">
              <div style={{ display: 'flex', color: '#f59e0b', gap: '0.1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                    stroke="currentColor" 
                  />
                ))}
              </div>
              <strong style={{ color: 'hsl(var(--text-primary))' }}>{rating.toFixed(1)}</strong>
              <span style={{ color: 'hsl(var(--text-tertiary))' }}>|</span>
              <span style={{ color: 'hsl(var(--text-secondary))', fontWeight: 500 }}>
                {reviewsCount} customer reviews
              </span>
            </div>

            {/* Stock indicator badge */}
            <div style={{ marginBottom: '1.25rem' }}>
              {inStock <= 5 ? (
                <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontWeight: 700 }}>
                  🚨 Only {inStock} units left in stock!
                </span>
              ) : (
                <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', fontWeight: 700 }}>
                  ✓ Ready to Ship (In Stock)
                </span>
              )}
            </div>

            {/* Main Long Description */}
            <p className="detail-description">
              {description}
            </p>

            {/* Tab Swapping Grid */}
            <div className="tabs-navigation">
              <button 
                className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                Specifications
              </button>
              <button 
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({reviews.length})
              </button>
            </div>

            <div className="tab-pane">
              {activeTab === 'specs' ? (
                /* Specifications Table */
                <div className="specs-grid">
                  {Object.entries(specs).map(([key, val]) => (
                    <div className="spec-item" key={key}>
                      <span className="spec-name">{key}</span>
                      <span className="spec-val">{val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                /* Customer Reviews Pane */
                <div className="reviews-pane">
                  {reviews.map((rev) => (
                    <div className="review-item" key={rev.id}>
                      <div className="review-meta">
                        <span style={{ fontWeight: 700, color: 'hsl(var(--text-primary))' }}>
                          {rev.author}
                        </span>
                        <span>{rev.date}</span>
                      </div>
                      <div style={{ display: 'flex', color: '#f59e0b', gap: '0.1rem', marginBottom: '0.25rem' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={10} 
                            fill={i < rev.rating ? "currentColor" : "none"} 
                            stroke="currentColor" 
                          />
                        ))}
                      </div>
                      <p className="review-comment">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Add to Cart footer */}
            <div className="detail-modal-footer">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-tertiary))', textTransform: 'uppercase', fontWeight: 600 }}>
                  Total Price
                </span>
                <span className="detail-price">${price.toFixed(2)}</span>
              </div>

              <button 
                className="detail-btn-cart"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                <ShoppingBag size={16} />
                <span>Add to Cart</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
