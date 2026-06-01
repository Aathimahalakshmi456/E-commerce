import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import ProductList from "./components/ProductList.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import ProductModal from "./components/ProductModal.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import { productsData } from "./data/productsData.js";
import { Heart, Github } from "lucide-react";

const App = () => {
  // 1. Core Persistent States (LocalStorage checks)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Interactive Search & Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const maxPrice = 400; // Hard max based on Barista Espresso at 399.99
  const [priceRange, setPriceRange] = useState(maxPrice);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // 3. Modal Toggles
  const [activeProduct, setActiveProduct] = useState(null); // Detail modal
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false); // Navbar cart bounce indicator

  // 4. Effects: Sync and DOM Mutations
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // 5. Business logic handlers
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });

    // Cart bump bounce micro-animation
    setCartBump(true);
    setTimeout(() => setCartBump(false), 400);
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleWishlistToggle = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceRange(maxPrice);
    setSortBy("featured");
    setShowWishlistOnly(false);
  };

  // 6. Filtering and Sorting execution
  const filteredProducts = productsData
    .filter((product) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesPrice = product.price <= priceRange;

      const matchesWishlist =
        !showWishlistOnly || wishlist.includes(product.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesWishlist
      );
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // 'featured' retains mock order
    });

  // Calculate cart counts
  const totalCartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app-container">
      {/* Navbar section */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        showWishlistOnly={showWishlistOnly}
        setShowWishlistOnly={setShowWishlistOnly}
        cartCount={totalCartCount}
        cartBump={cartBump}
        wishlistCount={wishlist.length}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      {/* Main Catalog grid */}
      <main className="main-content">
        <ProductList
          products={filteredProducts}
          wishlist={wishlist}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPrice={maxPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onWishlistToggle={handleWishlistToggle}
          onAddToCart={handleAddToCart}
          onOpenDetails={(prod) => setActiveProduct(prod)}
          onResetFilters={handleResetFilters}
          showWishlistOnly={showWishlistOnly}
        />
      </main>

      {/* Slide-out Cart Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Immersive Product Details Overlay */}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 3D Payment Simulated Checkout Wizard */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onClearCart={handleClearCart}
      />

      {/* Universal footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-copy">
            <span>© 2026 Aadhii&apos;s   Store Inc. Handcrafted with</span>
            <Heart size={11} fill="#ef4444" stroke="none" />
            <span>using Vanilla CSS.</span>
          </div>

          <div className="footer-links">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleResetFilters();
              }}
            >
              Catalog
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsCartOpen(true);
              }}
            >
              View Cart
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;