import React from 'react';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';

const ProductCard = ({
  product,
  isWishlisted,
  onWishlistToggle,
  onAddToCart,
  onOpenDetails
}) => {
  const { id, name, tagline, category, price, rating, reviewsCount, image } = product;

  return (
    <article className="glass-card card-item">
      {/* Visual Header / Cover Image */}
      <div className="card-img-wrapper">
        <img
          src={image}
          alt={name}
          className="card-img"
          loading="lazy"
          onClick={() => onOpenDetails(product)}
        />
        
        {/* Absolute overlays */}
        <div className="card-overlay">
          <span className="badge badge-primary">{category}</span>
          
          <button
            className={`card-overlay-btn card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle(id);
            }}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="card-details">
        <div className="card-meta">
          <div className="card-rating">
            <Star size={13} fill="currentColor" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
            ({reviewsCount} reviews)
          </span>
        </div>

        <h3 className="card-title" onClick={() => onOpenDetails(product)}>
          {name}
        </h3>
        
        <p className="card-tagline">
          {tagline}
        </p>

        {/* Action Footer */}
        <div className="card-footer">
          <span className="card-price">${price.toFixed(2)}</span>
          
          <button
            className="card-btn-add"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            title="Add to Cart"
          >
            <ShoppingCart size={13} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
