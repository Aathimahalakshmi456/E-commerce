import React, { useEffect, useState } from 'react';
import { ShoppingBag, Sun, Moon, Heart, Search } from 'lucide-react';

const Navbar = ({
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
  showWishlistOnly,
  setShowWishlistOnly,
  cartCount,
  cartBump,
  wishlistCount,
  onCartToggle
}) => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#" className="logo-link" onClick={() => setShowWishlistOnly(false)}>
          <div className="logo-icon">
            <ShoppingBag size={18} strokeWidth={2.5} />
          </div>
          <span className="logo-text">
            <span className="logo-brand-name">aadhii's</span>
            <span className="gradient-text">Store</span>
          </span>
        </a>

        {/* Live Search bar */}
        <div className="search-bar-container">
          <Search size={16} className="search-icon-inside" />
          <input
            type="text"
            className="search-input"
            placeholder="Search our curated collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Action controls */}
        <div className="nav-actions">
          {/* Wishlist Toggle Button */}
          <button
            className={`nav-btn ${showWishlistOnly ? 'nav-btn-active' : ''}`}
            onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            title={showWishlistOnly ? "Show All Products" : "Filter by Wishlist"}
          >
            <Heart size={18} fill={showWishlistOnly ? "currentColor" : "none"} />
            {wishlistCount > 0 && (
              <span className="cart-badge-count" style={{ background: '#ef4444' }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            className="nav-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart Trigger Button */}
          <button
            className={`nav-btn ${cartBump ? 'cart-bump' : ''}`}
            onClick={onCartToggle}
            title="View Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="cart-badge-count">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
