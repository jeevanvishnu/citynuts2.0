import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import "./App.css"
import { Navbar } from './components/Navbar';
import { VideoHero } from './components/VideoHero';
import { About } from './components/About';
import { Products } from './components/Products';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { HomeFeatures } from './components/HomeFeatures';
import { InstagramGallery } from './components/InstagramGallery';
import type { CartItem } from './components/CartDrawer';
import { ProductListingPage } from './components/ProductListingPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { WishlistPage } from './components/WishlistPage';
import { CheckoutPage } from './components/CheckoutPage';
import { LoginPage } from './components/LoginPage';
import { AccountPage } from './components/AccountPage';
import { OrderDetailsPage } from './components/OrderDetailsPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './components/TermsAndConditionsPage';
import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { MagnifyingGlass, X, Check } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from './redux/hooks';
import { checkAuthAdmin } from './redux/slices/adminAuthSlice';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('citynuts_user');
    return saved ? JSON.parse(saved) : null;
  });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Check Admin Auth on Initial Load
  useEffect(() => {
    dispatch(checkAuthAdmin());
  }, [dispatch]);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });

    // Notify user with a toast
    setToastMessage(`Added ${item.name} to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    if (item) {
      setToastMessage(`Removed ${item.name} from cart.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  const handleWishlistToggle = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setWishlist((prev) => {
      const isWishlisted = prev.includes(id);
      if (isWishlisted) {
        setToastMessage('Removed from wishlist.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        return prev.filter((item) => item !== id);
      } else {
        setToastMessage('Added to wishlist!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        return [...prev, id];
      }
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setToastMessage(`Searching for "${searchQuery}"...`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      navigate('/products');
    }
  };

  const popularSearches = ['Almonds', 'Cashews', 'Pistachios', 'Dates', 'Organic'];

  // Helper to map current pathname to the expected 'currentPage' prop for Navbar compatibility
  const getCurrentPageForNavbar = () => {
    const path = location.pathname.replace('/', '');
    return path || 'home';
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-white">
      {/* 1. Sticky Navigation Bar */}
      {!location.pathname.startsWith('/admin') && (
        <Navbar
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          wishlistCount={wishlist.length}
          onCartClick={() => navigate('/cart')}
          onWishlistClick={() => navigate('/wishlist')}
          onSearchClick={() => setIsSearchOpen(true)}
          currentPage={getCurrentPageForNavbar() as any}
          user={user}
          onLogout={() => {
            setUser(null);
            localStorage.removeItem('citynuts_user');
            setToastMessage('Successfully logged out.');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
            navigate('/');
          }}
        />
      )}

      {/* Main content elements in strict order */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <>
              {/* 1. Video Hero Section */}
              <VideoHero />

              {/* 2b. Home Features & Marquee */}
              <HomeFeatures />

              {/* 3. About Section */}
              <About />

              {/* 4. Product Cards Section */}
              <Products
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                onToggleWishlist={handleWishlistToggle}
              />

              {/* 5. Instagram Gallery */}
              <InstagramGallery />

              {/* 6. Customer Feedback / Testimonials */}
              <Testimonials />
            </>
          } />

          <Route path="/products" element={
            <ProductListingPage onAddToCart={handleAddToCart} wishlist={wishlist} onToggleWishlist={handleWishlistToggle} />
          } />

          <Route path="/about" element={
            <AboutPage />
          } />

          <Route path="/contact" element={
            <ContactPage />
          } />

          <Route path="/product-detail" element={
            <ProductDetailPage onAddToCart={handleAddToCart} />
          } />

          <Route path="/cart" element={
            <CartPage
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={() => navigate('/checkout')}
            />
          } />

          <Route path="/checkout" element={
            <CheckoutPage
              cartItems={cartItems}
              onOrderSuccess={() => {
                setCartItems([]);
                setToastMessage('Order placed successfully!');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 4000);
              }}
            />
          } />

          <Route path="/wishlist" element={
            <WishlistPage
              wishlist={wishlist}
              onToggleWishlist={handleWishlistToggle}
              onAddToCart={handleAddToCart}
            />
          } />

          <Route path="/login" element={
            <LoginPage
              onLoginSuccess={(userData) => {
                setUser(userData);
                localStorage.setItem('citynuts_user', JSON.stringify(userData));
                setToastMessage(`Welcome back, ${userData.name}!`);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 4000);
                navigate('/');
              }}
            />
          } />

          <Route path="/account" element={
            <AccountPage
              user={user}
              onLogout={() => {
                setUser(null);
                localStorage.removeItem('citynuts_user');
                setToastMessage('Successfully logged out.');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
                navigate('/');
              }}
              onNavigate={(path) => navigate(path.startsWith('#') ? path.replace('#', '/') : path)}
            />
          } />

          <Route path="/order-details" element={
            <OrderDetailsPage />
          } />

          <Route path="/privacy" element={
            <PrivacyPolicyPage />
          } />

          <Route path="/terms" element={
            <TermsAndConditionsPage />
          } />

          <Route path="/admin-login" element={
            <AdminLoginPage />
          } />

          <Route path="/admin/dashboard" element={
            <AdminDashboard />
          } />
        </Routes>
      </main>

      {/* 6. Footer Section */}
      {!location.pathname.startsWith('/admin') && <Footer />}

      {/* Premium Glassmorphic Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-200"
              aria-label="Close search"
            >
              <X size={24} weight="bold" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-white rounded-[2rem] p-8 shadow-2xl border border-primary/20 space-y-6"
            >
              <h3 className="text-xl font-bold text-dark flex items-center gap-2">
                <MagnifyingGlass size={22} className="text-primary font-bold" />
                Search
              </h3>

              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input
                  type="text"
                  autoFocus
                  placeholder="What are you craving today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-blush/40 border border-primary/20 rounded-full px-6 py-4 text-dark focus:outline-none focus:border-primary text-base font-light"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-4 bg-gradient-pink text-white rounded-full font-semibold shadow-md flex items-center gap-1.5 hover:shadow-premium"
                >
                  Search
                </motion.button>
              </form>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-dark/40 uppercase tracking-wider">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                      }}
                      className="px-4 py-2 bg-blush text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-full text-sm font-medium border border-primary/5"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Notifications (Toasts) */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 min-w-[280px] bg-dark text-white rounded-2xl px-5 py-3.5 shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <Check size={14} weight="bold" />
            </div>
            <p className="text-sm font-medium text-white/95">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;