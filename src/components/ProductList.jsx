import React from 'react';
import ProductCard from './ProductCard.jsx';
import { SlidersHorizontal, PackageX } from 'lucide-react';

const ProductList = ({
  products,
  wishlist,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  maxPrice,
  sortBy,
  setSortBy,
  onWishlistToggle,
  onAddToCart,
  onOpenDetails,
  onResetFilters,
  showWishlistOnly
}) => {
  const categories = ["All", "Electronics", "Home & Living", "Fitness", "Apparel"];

  return (
    <section className="catalog-layout">
      {/* 1. Interactive Filters Block */}
      <div className="glass-card filter-section">
        <div className="filter-row">
          {/* Category Navigation Pills */}
          <div className="categories-container">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sliders and Dropdowns */}
          <div className="controls-group">
            {/* Price Slider */}
            <div className="range-filter-box">
              <SlidersHorizontal size={14} />
              <span>Max Price:</span>
              <div className="slider-wrapper">
                <input
                  type="range"
                  className="price-slider"
                  min="0"
                  max={maxPrice}
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <span style={{ fontWeight: 700, color: 'hsl(var(--text-primary))' }}>
                  ${priceRange}
                </span>
              </div>
            </div>

            {/* Sorting Dropdown */}
            <div className="sort-select-wrapper">
              <span>Sort By:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Title / Meta Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-headings)' }}>
          {showWishlistOnly ? (
            <span>My <span className="gradient-text">Wishlist</span></span>
          ) : (
            <span>Curated <span className="gradient-text">Collection</span></span>
          )}
        </h2>
        <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', fontWeight: 500 }}>
          Showing {products.length} {products.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* 2. Product Grid Rendering */}
      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onWishlistToggle={onWishlistToggle}
              onAddToCart={onAddToCart}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      ) : (
        /* Empty Search or Empty Filter Results */
        <div className="empty-state">
          <PackageX className="empty-state-icon" />
          <h3>No products match your filters</h3>
          <p>Try clearing your search query, adjusting your price limit, or shifting categories to discover items.</p>
          <button className="btn-reset-filter" onClick={onResetFilters}>
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductList;
