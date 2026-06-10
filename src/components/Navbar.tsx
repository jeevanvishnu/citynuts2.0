import React, { useState, useEffect } from 'react';
import { ShoppingCart, MagnifyingGlass, List, X, Heart, User, CaretDown } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
  onWishlistClick: () => void;
  currentPage: 'home' | 'products' | 'about' | 'contact' | 'product-detail' | 'cart' | 'wishlist' | 'checkout' | 'login' | 'account' | 'order-details';
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
}

const categoriesList = [
  { name: 'Dates', path: '#products?category=Dates' },
  { name: 'Nuts', path: '#products?category=Nuts' },
  { name: 'Dry Fruits', path: '#products?category=Dry%20Fruits' },
  { name: 'Chocolates', path: '#products?category=Chocolates' },
  { name: 'Seeds', path: '#products?category=Seeds' },
  { name: 'Spices', path: '#products?category=Spices' },
  { name: 'Gifts', path: '#products?category=Gifts' }
];

interface MegaMenuData {
  title: string;
  subs: string[];
  featured: {
    name: string;
    weight: string;
    rating: string;
    reviews: string;
    price: string;
    oldPrice: string;
    img: string;
  };
  promo: {
    title1: string;
    title2: string;
    subtitle: string;
  };
}

const megaMenuData: Record<string, MegaMenuData> = {
  'Dates': {
    title: 'Explore Dates',
    subs: ['Medjool Dates', 'Ajwa Dates', 'Safawi Dates', 'Kimia Dates', 'Pitted Dates', 'Date Rolls', 'Stuffed Dates', 'Date Syrup'],
    featured: { name: 'Medjool Dates', weight: '500g', rating: '4.9', reviews: '2.1k', price: 'د.إ599', oldPrice: 'د.إ799', img: '/productimages/dryfruits/dryfruit04.png' },
    promo: { title1: '12+', title2: 'varieties', subtitle: 'Sourced from Oman & Saudi Arabia' }
  },
  'Nuts': {
    title: 'Explore Nuts',
    subs: ['Almonds', 'Cashews', 'Walnuts', 'Pistachios', 'Macadamia', 'Pecans', 'Brazil Nuts', 'Pine Nuts'],
    featured: { name: 'Cashew W180', weight: '500g', rating: '4.8', reviews: '1.5k', price: 'د.إ699', oldPrice: 'د.إ899', img: '/productimages/nuts/nuts01.png' },
    promo: { title1: '100%', title2: 'Organic', subtitle: 'Premium imported quality nuts' }
  },
  'Dry Fruits': {
    title: 'Explore Dry Fruits',
    subs: ['Dried Figs', 'Apricots', 'Raisins', 'Dried Mango', 'Prunes', 'Dried Kiwi', 'Dried Berries', 'Mixed Dry Fruits'],
    featured: { name: 'Afghan Figs', weight: '250g', rating: '4.7', reviews: '850', price: 'د.إ499', oldPrice: 'د.إ599', img: '/productimages/dryfruits/dryfruit01.webp' },
    promo: { title1: 'No', title2: 'Sugar', subtitle: 'Naturally sweet and nutritious' }
  },
  'Chocolates': {
    title: 'Explore Chocolates',
    subs: ['Dark Chocolate', 'Milk Chocolate', 'White Chocolate', 'Nutty Chocolates', 'Fruit Chocolates', 'Truffles', 'Vegan Chocolates', 'Gift Boxes'],
    featured: { name: 'Snickers 50g', weight: '200g', rating: '4.9', reviews: '1.2k', price: 'د.إ399', oldPrice: 'د.إ499', img: '/productimages/chocolates/chocolate01.webp' },
    promo: { title1: 'Rich', title2: 'Cocoa', subtitle: 'Handcrafted luxury chocolates' }
  },
  'Seeds': {
    title: 'Explore Seeds',
    subs: ['Chia Seeds', 'Pumpkin Seeds', 'Sunflower Seeds', 'Flax Seeds', 'Watermelon Seeds', 'Melon Seeds', 'Quinoa', 'Mixed Seeds'],
    featured: { name: 'Mix Chocolates Turkey', weight: '250g', rating: '4.6', reviews: '900', price: 'د.إ299', oldPrice: 'د.إ399', img: '/productimages/seeds/seed01.webp' },
    promo: { title1: 'Super', title2: 'Foods', subtitle: 'Packed with daily essential nutrients' }
  },
  'Spices': {
    title: 'Explore Spices',
    subs: ['Saffron', 'Cardamom', 'Cinnamon', 'Cloves', 'Black Pepper', 'Nutmeg', 'Star Anise', 'Mace'],
    featured: { name: 'Kashmiri Saffron', weight: '5g', rating: '5.0', reviews: '3.4k', price: 'د.إ1499', oldPrice: 'د.إ1899', img: '/productimages/dryfruits/dryfruit04.png' },
    promo: { title1: 'Pure', title2: 'Aroma', subtitle: 'Authentic spices sourced locally' }
  },
  'Gifts': {
    title: 'Explore Gifts',
    subs: ['Corporate Gifts', 'Wedding Favors', 'Festive Hampers', 'Birthday Boxes', 'Anniversary Gifts', 'Custom Hampers', 'Luxury Boxes', 'Budget Friendly'],
    featured: { name: 'Royal Hamper', weight: '1kg', rating: '4.9', reviews: '500', price: 'د.إ2499', oldPrice: 'د.إ2999', img: '/productimages/dryfruits/dryfruit06.webp' },
    promo: { title1: 'Premium', title2: 'Gifting', subtitle: 'Make every occasion memorable' }
  }
};

export const Navbar: React.FC<NavbarProps> = ({ cartCount, wishlistCount, onCartClick, onSearchClick, onWishlistClick, currentPage, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Dates');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
      setIsUserMenuOpen(false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const isLinkActive = (link: { name: string; href: string }) => {
    if (link.name === 'Products') {
      return currentPage === 'products' || activeHash === '#products';
    }
    if (link.name === 'About') {
      return currentPage === 'about' || activeHash === '#about';
    }
    if (link.name === 'Home') {
      return currentPage === 'home' && (activeHash === '' || activeHash === '#home' || activeHash === '#');
    }
    return currentPage === 'home' && activeHash === link.href;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white py-5'
          } border-b border-primary/20`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <img
              src="/Citynuts-logo.webp"
              alt="City Nuts Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              if (link.name === 'Products') {
                return (
                  <div
                    key={link.name}
                    onMouseEnter={() => setIsProductsHovered(true)}
                    onMouseLeave={() => setIsProductsHovered(false)}
                    className="py-2 group cursor-pointer"
                  >
                    <a
                      href={link.href}
                      className={`relative font-medium text-sm transition-colors duration-200 flex items-center gap-1.5 ${active ? 'text-primary font-bold' : 'text-dark/80 hover:text-primary'
                        }`}
                    >
                      <span>{link.name}</span>
                      <CaretDown size={14} className={`transition-transform duration-300 ${isProductsHovered ? 'rotate-180 text-primary' : 'text-dark/50 group-hover:text-primary'}`} weight="bold" />
                      <span className={`absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </a>

                    <AnimatePresence>
                      {isProductsHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className="absolute top-full left-0 w-full bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border-y border-primary/10 z-50 text-left cursor-default"
                        >
                          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
                            {/* CATEGORIES */}
                            <div className="w-[220px] flex flex-col shrink-0">
                              <h3 className="text-[10px] font-bold text-dark/40 uppercase tracking-widest mb-3 px-3">Categories</h3>
                              <div className="flex flex-col gap-1">
                                {categoriesList.map((cat) => {
                                  const isActive = cat.name === activeCategory;
                                  return (
                                    <a
                                      key={cat.name}
                                      href={cat.path}
                                      onMouseEnter={() => setActiveCategory(cat.name)}
                                      onClick={() => setIsProductsHovered(false)}
                                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${isActive
                                        ? 'bg-blush text-primary'
                                        : 'text-dark/70 hover:bg-blush/50 hover:text-primary'
                                        }`}
                                    >
                                      <span className="tracking-wide uppercase">{cat.name}</span>
                                      {isActive && <span className="text-primary font-bold">&rsaquo;</span>}
                                    </a>
                                  );
                                })}
                              </div>
                            </div>

                            {/* EXPLORE DATES */}
                            <div className="flex-1 flex flex-col px-6 border-l border-primary/10">
                              <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">{megaMenuData[activeCategory]?.title}</h3>
                              </div>
                              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {megaMenuData[activeCategory]?.subs.map((sub: string) => (
                                  <a
                                    key={sub}
                                    href={`#products?category=${activeCategory}&type=${sub.replace(' ', '')}`}
                                    onClick={() => setIsProductsHovered(false)}
                                    className="border border-primary/20 rounded-full px-4 py-2 text-[11px] font-medium text-dark/70 hover:border-primary hover:text-primary hover:bg-blush/30 transition-colors text-center truncate"
                                  >
                                    {sub}
                                  </a>
                                ))}
                              </div>
                              <div className="mt-auto pt-6">
                                <a href={`#products?category=${activeCategory}`} onClick={() => setIsProductsHovered(false)} className="text-[11px] font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors uppercase">
                                  View All {activeCategory} <span className="text-[14px]">&rarr;</span>
                                </a>
                              </div>
                            </div>

                            {/* FEATURED */}
                            <div className="w-[260px] shrink-0 flex flex-col">
                              <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">Featured</h3>
                              <div className="bg-white rounded-2xl border border-primary/10 overflow-hidden group cursor-pointer h-full flex flex-col relative">
                                <button className="absolute top-2 right-2 text-dark/30 hover:text-primary transition-colors z-10">
                                  <Heart size={16} weight="regular" />
                                </button>
                                <div className="h-32 bg-gradient-to-br from-[#B58253] to-[#D5A069] flex items-center justify-center p-2">
                                  <img src={megaMenuData[activeCategory]?.featured.img} alt={megaMenuData[activeCategory]?.featured.name} className="w-28 h-28 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-4 flex flex-col flex-1 bg-white">
                                  <h4 className="text-xs font-bold text-dark truncate">{megaMenuData[activeCategory]?.featured.name} <span className="text-[10px] text-dark/50 font-normal">&bull; {megaMenuData[activeCategory]?.featured.weight}</span></h4>
                                  <div className="flex items-center gap-1 mt-1 mb-3">
                                    <div className="flex text-primary text-[10px]">
                                      {[1, 2, 3, 4, 5].map(star => <span key={star}>★</span>)}
                                    </div>
                                    <span className="text-[9px] text-dark/50">{megaMenuData[activeCategory]?.featured.rating} ({megaMenuData[activeCategory]?.featured.reviews})</span>
                                  </div>
                                  <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-sm font-bold text-dark">{megaMenuData[activeCategory]?.featured.price}</span>
                                      <span className="text-[10px] text-dark/40 line-through">{megaMenuData[activeCategory]?.featured.oldPrice}</span>
                                    </div>
                                    <button className="px-3 py-1.5 bg-blush text-primary text-[10px] font-bold rounded hover:bg-primary hover:text-white transition-colors">
                                      Add to Cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* PROMO */}
                            <div className="w-[200px] shrink-0">
                              <h3 className="text-[10px] font-bold opacity-0 mb-3">.</h3>
                              <div className="bg-blush rounded-2xl p-6 h-full flex flex-col justify-center relative overflow-hidden">
                                <div>
                                  <div className="text-3xl font-black text-primary leading-[1.1] tracking-tight">{megaMenuData[activeCategory]?.promo.title1}</div>
                                  <div className="text-2xl font-black text-primary leading-[1.1] tracking-tight mb-4">{megaMenuData[activeCategory]?.promo.title2}</div>
                                  <p className="text-[10px] text-dark/50 font-medium leading-tight">
                                    {megaMenuData[activeCategory]?.promo.subtitle}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative font-medium text-sm transition-colors duration-200 py-2 group ${active ? 'text-primary font-bold' : 'text-dark/80 hover:text-primary'
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </a>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Input (Desktop) */}
            <div className="hidden lg:flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-40 pl-9 pr-3 py-1.5 rounded-full border border-primary/20 bg-white/50 focus:bg-white focus:outline-none focus:border-primary text-sm shadow-sm transition-all duration-300 focus:w-56"
              />
              <MagnifyingGlass size={16} className="absolute left-3 text-dark/50" weight="bold" />
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={onSearchClick}
              className="lg:hidden p-2 rounded-full hover:bg-primary/10 text-dark/80 hover:text-primary transition-all duration-200 active:scale-95"
              aria-label="Search"
            >
              <MagnifyingGlass size={22} weight="bold" />
            </button>

            {/* Like */}
            <button
              onClick={onWishlistClick}
              className="relative p-2 rounded-full hover:bg-primary/10 text-dark/80 hover:text-primary transition-all duration-200 active:scale-95"
              aria-label="Wishlist"
            >
              <Heart size={22} weight="bold" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gradient-pink text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </button>

            {/* Shop (Cart) */}
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-primary/10 text-dark/80 hover:text-primary transition-all duration-200 active:scale-95"
              aria-label="Open Cart"
            >
              <ShoppingCart size={22} weight="bold" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-blush text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-sm cursor-pointer"
                >
                  <User size={18} weight="bold" />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="sm:hidden p-2 rounded-full bg-blush text-primary transition-all duration-200 active:scale-95 cursor-pointer"
                  aria-label="User Menu"
                >
                  <User size={22} weight="bold" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-premium border border-primary/10 py-2 z-50 text-left"
                    >
                      <div className="px-4 py-2 border-b border-primary/5">
                        <p className="text-[10px] font-bold text-dark/40 uppercase tracking-wider">Signed in as</p>
                        <p className="text-xs font-semibold text-dark truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          window.location.hash = '#account';
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-dark hover:bg-primary/5 hover:text-primary transition-colors font-medium cursor-pointer"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          window.location.hash = '#wishlist';
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-dark hover:bg-primary/5 hover:text-primary transition-colors font-medium cursor-pointer"
                      >
                        My Wishlist ({wishlistCount})
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-primary hover:bg-primary/5 hover:text-primary-dark transition-colors font-bold border-t border-primary/5 mt-1 cursor-pointer"
                      >
                        Logout session
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={() => { window.location.hash = '#login'; }}
                  className={`hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium text-sm cursor-pointer ${currentPage === 'login' ? 'bg-primary text-white border-primary' : ''}`}
                >
                  <User size={18} weight="bold" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => { window.location.hash = '#login'; }}
                  className={`sm:hidden p-2 rounded-full hover:bg-primary/10 text-dark/80 hover:text-primary transition-all duration-200 active:scale-95 cursor-pointer ${currentPage === 'login' ? 'bg-blush text-primary' : ''}`}
                  aria-label="Login"
                >
                  <User size={22} weight="bold" />
                </button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-primary/10 text-dark/80 hover:text-primary transition-all duration-200"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 w-full bg-white z-30 shadow-lg border-b border-primary/20 md:hidden py-6 px-4"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, idx) => {
                const active = isLinkActive(link);
                if (link.name === 'Products') {
                  return (
                    <div key={link.name} className="flex flex-col gap-2">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`flex items-center justify-between font-medium text-lg border-l-2 pl-3 py-1 transition-all duration-200 ${active
                          ? 'text-primary border-primary bg-blush/40 font-bold'
                          : 'text-dark border-transparent hover:border-primary'
                          }`}
                      >
                        <a
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex-1"
                        >
                          {link.name}
                        </a>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsMobileProductsOpen(!isMobileProductsOpen);
                          }}
                          className="p-2 text-dark/70 hover:text-primary transition-colors cursor-pointer"
                          aria-label="Toggle products categories"
                        >
                          <CaretDown size={18} className={`transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180 text-primary' : 'text-dark/50'}`} weight="bold" />
                        </button>
                      </motion.div>

                      <AnimatePresence>
                        {isMobileProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden flex flex-col gap-2.5 pl-6 border-l border-primary/20 text-sm font-medium"
                          >
                            <a
                              href="#products"
                              onClick={() => {
                                setIsOpen(false);
                              }}
                              className="py-1 text-dark/70 hover:text-primary transition-colors uppercase tracking-wider text-xs"
                            >
                              All Products
                            </a>
                            {categoriesList.map((cat) => (
                              <a
                                key={cat.name}
                                href={cat.path}
                                onClick={() => {
                                  setIsOpen(false);
                                }}
                                className="py-1 text-dark/70 hover:text-primary transition-colors uppercase tracking-wider text-xs"
                              >
                                {cat.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium text-lg border-l-2 pl-3 py-1 transition-all duration-200 ${active
                      ? 'text-primary border-primary bg-blush/40 font-bold'
                      : 'text-dark border-transparent hover:border-primary hover:text-primary'
                      }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
