import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  StarHalf,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  FacebookLogo,
  WhatsappLogo,
  Copy,
  Leaf,
  ShieldCheck,
  Package,
  Thermometer,
  LockKey,
  CalendarBlank,
  ThumbsUp,
  Trophy,
  ArrowCounterClockwise,
  Truck,
  Lock,
  CaretRight,
  CaretLeft,
  ShareNetwork,
} from '@phosphor-icons/react';
import type { CartItem } from './CartDrawer';

interface ProductDetailPageProps {
  onAddToCart: (item: CartItem) => void;
}

const IMAGES = [
  '/productimages/imgi_18_AJWA-DATES-LARGE.png',
  '/productimages/imgi_477_5.png',
  '/productimages/imgi_90_premium-nuts-2048x2048.png',
  '/productimages/imgi_480_web-1.png',
];

const WEIGHTS = [
  { label: '250g', price: 34, oldPrice: 42 },
  { label: '500g', price: 68, oldPrice: 85 },
  { label: '1kg', price: 130, oldPrice: 165 },
  { label: '2kg', price: 250, oldPrice: 320 },
];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(1); // Default to 500g
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'storage' | 'reviews'>('description');
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Sarah M.', date: 'May 12, 2026', rating: 5, title: 'Absolute perfection!', body: 'These are the freshest, crunchiest almonds I have ever purchased. The packaging kept them perfectly vacuum sealed. Will definitely be subscribing for monthly deliveries.' },
    { id: 2, name: 'Ahmed K.', date: 'April 28, 2026', rating: 5, title: 'Premium quality as promised', body: 'You can really tell the difference between these California almonds and the generic supermarket ones. Larger size and a beautiful sweet flavor.' },
    { id: 3, name: 'Priya R.', date: 'April 15, 2026', rating: 4, title: 'Great but slightly pricey', body: 'The quality is undeniable, they make amazing homemade almond milk. Giving 4 stars only because the price is a bit high, but I guess you pay for the premium quality.' },
  ]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', title: '', body: '', rating: 5 });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.title || !newReview.body) return;

    const review = {
      id: Date.now(),
      name: newReview.name,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      rating: newReview.rating,
      title: newReview.title,
      body: newReview.body,
    };

    setReviews([review, ...reviews]);
    setShowReviewForm(false);
    setNewReview({ name: '', title: '', body: '', rating: 5 });
  };

  // Magnifier State
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const elem = imgRef.current;
    if (!elem) return;
    const { top, left, width, height } = elem.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    // Calculate percentage position
    setXY([(x / width) * 100, (y / height) * 100]);
  };

  const currentPrice = WEIGHTS[selectedWeight].price;
  const currentOldPrice = WEIGHTS[selectedWeight].oldPrice;
  const savings = currentOldPrice - currentPrice;
  const savingsPercent = Math.round((savings / currentOldPrice) * 100);

  const handleAddToCart = () => {
    onAddToCart({
      id: `prod-almonds-${WEIGHTS[selectedWeight].label}`,
      name: `Premium California Almonds - ${WEIGHTS[selectedWeight].label}`,
      price: currentPrice,
      quantity: quantity,
      image: IMAGES[selectedImage],
      weight: WEIGHTS[selectedWeight].label,
    });
  };

  return (
    <div className="bg-[#FFFFFF] min-h-[100dvh] pt-[80px] pb-20 font-sans tracking-tight">

      {/* 1. Sticky Navigation Breadcrumb Bar */}
      <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm font-medium">
            <a href="#home" className="text-zinc-400 hover:text-zinc-900 transition-colors">Home</a>
            <span className="text-zinc-300">/</span>
            <a href="#products" className="text-zinc-400 hover:text-zinc-900 transition-colors">Products</a>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-400">Dates</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-900 font-bold">Sukkarey Dates</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">

        {/* 2. Main Product Section — Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT SIDE — Product Image Gallery */}
          <div className="space-y-6">
            {/* Main Image Viewer */}
            <div
              className="relative aspect-square bg-white rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(255,107,157,0.15)] border border-[#FFB6C1]/30 overflow-hidden flex items-center justify-center cursor-crosshair group"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 20px 40px -15px rgba(255,107,157,0.15)' }}
              onMouseEnter={() => setShowMagnifier(true)}
              onMouseLeave={() => setShowMagnifier(false)}
              onMouseMove={handleMouseMove}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  ref={imgRef}
                  src={IMAGES[selectedImage]}
                  alt="Product"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-[80%] h-[80%] object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </AnimatePresence>

              {/* Floating Wishlist & Share Panel */}
              <div
                className="absolute top-6 right-6 flex flex-col gap-3 z-30 pointer-events-auto"
                onMouseMove={(e) => e.stopPropagation()}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setShowMagnifier(false);
                }}
              >
                {/* Wishlist Button */}
                <motion.button
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsWishlisted(!isWishlisted);
                  }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted
                      ? 'bg-[#FF6B9D] text-white shadow-[0_8px_20px_rgba(255,107,157,0.4)] border border-[#FF6B9D]'
                      : 'bg-white/95 backdrop-blur-md text-zinc-500 hover:text-[#FF6B9D] shadow-[0_6px_16px_rgba(255,107,157,0.1)] border border-[#FFB6C1]/20 hover:border-[#FF6B9D]/30'
                    }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart size={20} weight={isWishlisted ? "fill" : "bold"} />
                </motion.button>

                {/* Share Button */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowShareTooltip(!showShareTooltip);
                    }}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${showShareTooltip
                        ? 'bg-[#FF6B9D] text-white shadow-[0_8px_20px_rgba(255,107,157,0.4)] border border-[#FF6B9D]'
                        : 'bg-white/95 backdrop-blur-md text-zinc-500 hover:text-[#FF6B9D] shadow-[0_6px_16px_rgba(255,107,157,0.1)] border border-[#FFB6C1]/20 hover:border-[#FF6B9D]/30'
                      }`}
                    aria-label="Share Product"
                  >
                    <ShareNetwork size={20} weight="bold" />
                  </motion.button>

                  <AnimatePresence>
                    {showShareTooltip && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 12, y: -12 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 12, y: -12 }}
                        className="absolute right-14 top-0 bg-white/95 backdrop-blur-xl border border-[#FFB6C1]/30 shadow-[0_12px_30px_-5px_rgba(255,107,157,0.25)] rounded-[20px] p-1.5 flex flex-col gap-0.5 z-40 min-w-[140px]"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`);
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-[#FFF0F5] hover:text-[#FF6B9D] rounded-[12px] transition-all text-left"
                        >
                          <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
                          WhatsApp
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-[#FFF0F5] hover:text-[#FF6B9D] rounded-[12px] transition-all text-left"
                        >
                          <FacebookLogo size={16} weight="fill" className="text-[#1877F2]" />
                          Facebook
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(window.location.href);
                            setShareCopied(true);
                            setTimeout(() => setShareCopied(false), 2000);
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-[#FFF0F5] hover:text-[#FF6B9D] rounded-[12px] transition-all text-left"
                        >
                          <Copy size={16} weight="bold" className="text-zinc-500" />
                          {shareCopied ? "Copied!" : "Copy Link"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>



              {/* Magnifier Lens Feature */}
              {showMagnifier && (
                <div
                  className="absolute top-4 left-4 w-48 h-48 bg-white rounded-2xl shadow-2xl border border-primary/20 pointer-events-none overflow-hidden z-20"
                  style={{
                    backgroundImage: `url(${IMAGES[selectedImage]})`,
                    backgroundPosition: `${x}% ${y}%`,
                    backgroundSize: '300%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-4">
              {IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative flex-1 aspect-square rounded-[20px] overflow-hidden bg-white transition-all duration-300 ${selectedImage === idx ? 'border-[2px] border-[#FF6B9D] shadow-md' : 'border border-[#FFB6C1]/50 hover:border-[#FF6B9D]'
                    }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE — Product Info Panel */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="inline-block border border-[#FFB6C1]/50 bg-[#FFF0F5] text-[#FF6B9D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Dates
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-extrabold text-[#2D2D2D] tracking-tighter leading-none mb-6 font-poppins"
            >
              Sukkarey Dates
            </motion.h1>

            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-1 text-[#FF6B9D]">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {i === 4 ? (
                      <StarHalf size={20} weight="fill" />
                    ) : (
                      <Star size={20} weight={i < 4 ? "fill" : "regular"} />
                    )}
                  </motion.div>
                ))}
              </div>
              <span className="font-bold text-[#FF6B9D] text-lg">4.8</span>
              <button
                onClick={() => setActiveTab('reviews')}
                className="text-gray-400 text-sm hover:text-[#FF6B9D] underline decoration-dotted transition-colors"
              >
                (2,847 reviews)
              </button>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 text-sm font-light leading-relaxed mb-6">
              Sukkarey Dates 3kg offers you the ultimate indulgence in the world of premium fruits. With their naturally sweet taste, soft texture, and nutrient-rich profile, these dates are a wholesome addition to your kitchen. Perfect for snacking, cooking, or even gifting, Sukkarey Dates bring a blend of unparalleled flavor and quality to the table, ensuring you…
            </p>

            {/* Availability */}
            <div className="flex items-center mb-6">
              <span className="text-xs font-bold text-gray-400 mr-3 uppercase tracking-wider">Availability:</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full">
                <CheckCircle size={14} weight="fill" className="text-green-500" /> In Stock
              </span>
            </div>

            {/* Price Block */}
            <div className="flex flex-col gap-1 mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-[#FF6B9D] font-poppins leading-none">
                  {currentPrice}
                </span>
                <span className="text-xl text-gray-300 font-medium line-through">
                  {currentOldPrice}
                </span>
              </div>
              <div>
                <span className="inline-block bg-[#FFF0F5] text-[#FF6B9D] border border-[#FFB6C1]/50 text-xs font-bold px-2.5 py-1 rounded-full mt-2">
                  You Save {savings} ({savingsPercent}%)
                </span>
              </div>
            </div>

            <hr className="border-t border-[#FFB6C1]/30 my-6" />

            {/* Weight / Size Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#2D2D2D] uppercase tracking-wider mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {WEIGHTS.map((w, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedWeight(idx)}
                    className={`relative px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden ${selectedWeight === idx
                      ? 'bg-[#FF6B9D] text-white shadow-md border-transparent'
                      : 'bg-white text-gray-600 border border-[#FFB6C1]/50 hover:border-[#FF6B9D] hover:text-[#FF6B9D]'
                      }`}
                  >
                    <span className="relative z-10">{w.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Freshness Badge Row */}
            <div className="flex flex-wrap items-center gap-5 mb-10 text-sm font-bold text-[#2D2D2D]">
              <span className="flex items-center gap-2"><Leaf size={18} className="text-[#FF6B9D]" /> 100% Natural</span>
              <span className="text-gray-200">|</span>
              <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-[#FF6B9D]" /> Lab Tested</span>
              <span className="text-gray-200">|</span>
              <span className="flex items-center gap-2"><Package size={18} className="text-[#FF6B9D]" /> Vacuum Packed</span>
            </div>

            {/* Actions Area */}
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quantity</label>
                <div className="flex items-stretch gap-4 h-[56px]">
                  {/* Quantity Selector */}
                  <div className="flex items-center bg-white border border-[#FFB6C1] rounded-full px-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-[#FF6B9D] hover:bg-[#FFF0F5] rounded-full transition-colors"
                    >
                      <Minus size={16} weight="bold" />
                    </button>
                    <div className="w-12 text-center font-bold text-lg text-[#2D2D2D] overflow-hidden">
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={quantity}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                        >
                          {quantity}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-[#FF6B9D] hover:bg-[#FFF0F5] rounded-full transition-colors"
                    >
                      <Plus size={16} weight="bold" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-[#FF6B9D] to-[#FF3E78] text-white font-bold rounded-full shadow-[0_8px_20px_-8px_rgba(255,107,157,0.6)] flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingCart size={22} weight="fill" />
                    Add to Cart
                  </motion.button>


                </div>
              </div>

              {/* Buy Now */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full h-[56px] bg-[#FFF0F5] text-[#FF6B9D] font-bold rounded-full flex items-center justify-center gap-2 group relative overflow-hidden border border-[#FFB6C1]/50 hover:bg-[#FFB6C1]/20 transition-colors"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Buy it Now <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </div>

            {/* Delivery Info Box */}
            <div className="bg-white border border-zinc-100 rounded-[16px] p-5 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={24} weight="fill" className="text-green-500" />
                <span className="text-sm font-semibold text-[#2D2D2D]">Free Delivery on orders above 100</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={24} weight="fill" className="text-[#FF6B9D]" />
                <span className="text-sm font-semibold text-[#2D2D2D]">Delivery in 2-4 Business Days</span>
              </div>
            </div>



          </div>
        </div>
      </div>

      {/* 3. Product Detail Tabs Section */}
      <div className="w-full bg-[#FAFAFA] border-t border-gray-100 pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab Headers */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-8 border-b border-gray-200 mb-10 relative">
            {(['description', 'storage', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-base lg:text-lg font-bold capitalize transition-colors relative ${activeTab === tab ? 'text-[#FF6B9D]' : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {tab === 'storage' ? 'How to Store' : tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF6B9D] rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                >
                  <div className="space-y-6 text-gray-600 leading-relaxed font-light">
                    <h3 className="text-2xl font-bold text-[#2D2D2D] font-poppins">The King of Nuts</h3>
                    <p>
                      Our Premium California Almonds are sourced directly from the finest sun-drenched orchards of the San Joaquin Valley. Carefully harvested at peak ripeness, these almonds represent the highest grade of Nonpareil variety, known for their smooth, light-colored skin, elongated shape, and unparalleled sweet, buttery flavor.
                    </p>
                    <p>
                      Whether you're crafting gourmet desserts, powering up your morning smoothie, or simply craving a wholesome, crunchy snack straight from the bag, these almonds deliver an exceptional culinary experience packed with natural protein, Vitamin E, and essential dietary fibers.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-[#FFB6C1]/20 flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 bg-[#FFF0F5] text-[#FF6B9D] rounded-full flex items-center justify-center"><Leaf size={24} weight="fill" /></div>
                      <h4 className="font-bold text-[#2D2D2D]">Origin</h4>
                      <p className="text-xs text-gray-500">California, USA</p>
                    </div>
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-[#FFB6C1]/20 flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 bg-[#FFF0F5] text-[#FF6B9D] rounded-full flex items-center justify-center"><CalendarBlank size={24} weight="fill" /></div>
                      <h4 className="font-bold text-[#2D2D2D]">Harvest</h4>
                      <p className="text-xs text-gray-500">Current Year Crop</p>
                    </div>
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-[#FFB6C1]/20 flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 bg-[#FFF0F5] text-[#FF6B9D] rounded-full flex items-center justify-center"><Thermometer size={24} weight="fill" /></div>
                      <h4 className="font-bold text-[#2D2D2D]">Processing</h4>
                      <p className="text-xs text-gray-500">Raw / Unroasted</p>
                    </div>
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-[#FFB6C1]/20 flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 bg-[#FFF0F5] text-[#FF6B9D] rounded-full flex items-center justify-center"><ShieldCheck size={24} weight="fill" /></div>
                      <h4 className="font-bold text-[#2D2D2D]">Certifications</h4>
                      <p className="text-xs text-gray-500">Non-GMO, ISO 22000</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'storage' && (
                <motion.div
                  key="storage"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="bg-white p-8 rounded-[20px] shadow-sm border-t-4 border-[#FF6B9D] text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-[#FFF0F5] text-[#FF6B9D] rounded-full flex items-center justify-center">
                      <Thermometer size={32} weight="fill" />
                    </div>
                    <h3 className="font-bold text-lg text-[#2D2D2D]">Store Cool & Dry</h3>
                    <p className="text-sm text-gray-500 font-light">
                      Keep your almonds in a cool, dark, and dry place. Optimal temperature is below 20°C (68°F) to prevent oils from turning rancid.
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-[20px] shadow-sm border-t-4 border-[#FF6B9D] text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-[#FFF0F5] text-[#FF6B9D] rounded-full flex items-center justify-center">
                      <LockKey size={32} weight="fill" />
                    </div>
                    <h3 className="font-bold text-lg text-[#2D2D2D]">Keep Airtight</h3>
                    <p className="text-sm text-gray-500 font-light">
                      Once opened, transfer to an airtight container. Almonds easily absorb odors from other foods if left exposed.
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-[20px] shadow-sm border-t-4 border-[#FF6B9D] text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-[#FFF0F5] text-[#FF6B9D] rounded-full flex items-center justify-center">
                      <CalendarBlank size={32} weight="fill" />
                    </div>
                    <h3 className="font-bold text-lg text-[#2D2D2D]">Best Before</h3>
                    <p className="text-sm text-gray-500 font-light">
                      When stored properly in a pantry, they last up to 6 months. Refrigeration extends shelf life to 12 months, and freezing up to 2 years.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                >
                  {/* Left: Summary */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[20px] shadow-sm border border-[#FFB6C1]/20 text-center">
                      <h2 className="text-5xl font-black text-[#FF6B9D] font-poppins mb-2">4.8</h2>
                      <div className="flex justify-center gap-1 text-[#FF6B9D] mb-2">
                        {[...Array(5)].map((_, i) => (
                          i === 4 ? <StarHalf key={i} size={24} weight="fill" /> : <Star key={i} size={24} weight={i < 4 ? "fill" : "regular"} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 font-medium mb-6">Based on 2,847 reviews</p>

                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((star, idx) => {
                          const pct = star === 5 ? 85 : star === 4 ? 10 : star === 3 ? 3 : star === 2 ? 1 : 1;
                          return (
                            <div key={star} className="flex items-center gap-3 text-sm">
                              <span className="w-8 text-right font-medium text-gray-600">{star} ★</span>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 1, delay: idx * 0.1 }}
                                  className="h-full bg-[#FF6B9D]"
                                />
                              </div>
                              <span className="w-10 text-right text-gray-400">{pct}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right: Individual Reviews */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
                      <h3 className="text-xl font-bold text-[#2D2D2D]">Customer Reviews</h3>
                      <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="bg-gradient-to-r from-[#FF6B9D] to-[#FF3E78] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all"
                      >
                        {showReviewForm ? 'Cancel' : 'Write a Review'}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showReviewForm && (
                        <motion.form
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          onSubmit={handleSubmitReview}
                          className="bg-[#FFF0F5] p-6 rounded-[20px] border border-[#FFB6C1]/50 space-y-4 overflow-hidden"
                        >
                          <h4 className="font-bold text-[#2D2D2D] mb-2">Write Your Review</h4>

                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm font-semibold text-gray-600">Your Rating:</span>
                            <div className="flex gap-1 cursor-pointer">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={24}
                                  weight={star <= newReview.rating ? "fill" : "regular"}
                                  className={star <= newReview.rating ? "text-[#FF6B9D]" : "text-gray-300"}
                                  onClick={() => setNewReview({ ...newReview, rating: star })}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Your Name"
                              value={newReview.name}
                              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-[#FFB6C1]/50 focus:outline-none focus:border-[#FF6B9D]"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Review Title"
                              value={newReview.title}
                              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-[#FFB6C1]/50 focus:outline-none focus:border-[#FF6B9D]"
                              required
                            />
                          </div>

                          <textarea
                            placeholder="Write your review here..."
                            rows={4}
                            value={newReview.body}
                            onChange={(e) => setNewReview({ ...newReview, body: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#FFB6C1]/50 focus:outline-none focus:border-[#FF6B9D] resize-none"
                            required
                          />

                          <div className="flex justify-end mt-4">
                            <button
                              type="submit"
                              className="bg-[#1a1a2e] text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all"
                            >
                              Submit Review
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>

                    {reviews.map((review) => (
                      <div key={review.id} className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-[#2D2D2D]">{review.name}</h4>
                              <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                <CheckCircle size={12} weight="fill" /> Verified
                              </span>
                            </div>
                            <div className="flex gap-1 text-[#FF6B9D]">
                              {[...Array(5)].map((_, i) => <Star key={i} size={14} weight={i < review.rating ? "fill" : "regular"} />)}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <h5 className="font-bold text-[#2D2D2D] mb-2">{review.title}</h5>
                        <p className="text-gray-600 text-sm font-light leading-relaxed mb-4">{review.body}</p>
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1.5 text-xs font-semibold text-[#FF6B9D] border border-[#FFB6C1] px-3 py-1.5 rounded-full hover:bg-[#FFF0F5] transition-colors">
                            <ThumbsUp size={14} weight="bold" /> Helpful
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-center pt-4">
                      <button className="border-2 border-[#FF6B9D] text-[#FF6B9D] font-bold px-8 py-3 rounded-full hover:bg-[#FF6B9D] hover:text-white transition-colors">
                        Load More Reviews
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 4. Recommended Products Section */}
      <ProductSwiperSection title="You Might Also Like" background="bg-[#FFF0F5]" />

      {/* 5. Recently Viewed Section */}
      <ProductSwiperSection title="Recently Viewed" background="bg-white" />

      {/* 6. Trust & Guarantee Banner */}
      <div className="w-full bg-[#FFF0F5] py-12 border-y border-[#FFB6C1]/30 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#FFB6C1]/50">
            {[
              { icon: Trophy, title: 'Premium Quality Guaranteed', desc: 'Sourced from the best farms globally.' },
              { icon: ArrowCounterClockwise, title: 'Easy 7-Day Returns', desc: 'Not satisfied? Get a full refund.' },
              { icon: Truck, title: 'Free Delivery', desc: 'On all orders above 100.' },
              { icon: Lock, title: '100% Secure Payments', desc: 'Encrypted & safe checkout.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center px-4 pt-6 md:pt-0 group cursor-default"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FF6B9D] mb-4 group-hover:shadow-[0_0_20px_rgba(255,107,157,0.3)] transition-all">
                  <item.icon size={32} weight="light" />
                </div>
                <h4 className="font-bold text-[#2D2D2D] mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

// Sub-component for Swiper Sections
const ProductSwiperSection = ({ title, background }: { title: string, background: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const dummyProducts = [
    { name: 'Jumbo Roasted Cashews', price: 85, old: 105, img: '/productimages/imgi_480_web-1.png', badge: 'Hot' },
    { name: 'Roasted Pistachios', price: 95, old: 125, img: '/productimages/imgi_481_web-2.png', badge: 'Sale' },
    { name: 'Premium Medjool Dates', price: 55, old: 75, img: '/productimages/imgi_18_AJWA-DATES-LARGE.png', badge: 'New' },
    { name: 'Royal Chilean Walnuts', price: 85, old: 110, img: '/productimages/imgi_26_1-4.png.webp', badge: '' },
    { name: 'Deluxe Mixed Nuts', price: 120, old: 150, img: '/productimages/imgi_90_premium-nuts-2048x2048.png', badge: '' },
  ];

  return (
    <div className={`w-full ${background} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-end mb-10 border-b border-[#FFB6C1]/30 pb-4">
          <div className="relative inline-block">
            <h2 className="text-2xl font-extrabold text-[#2D2D2D] font-poppins">{title}</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-4 left-0 h-1 bg-[#FF6B9D] rounded-full"
            />
          </div>

          <div className="flex gap-2">
            <button onClick={scrollLeft} className="w-10 h-10 rounded-full bg-white border border-[#FFB6C1] text-[#FF6B9D] flex items-center justify-center hover:bg-[#FF6B9D] hover:text-white transition-colors shadow-sm">
              <CaretLeft size={20} weight="bold" />
            </button>
            <button onClick={scrollRight} className="w-10 h-10 rounded-full bg-white border border-[#FFB6C1] text-[#FF6B9D] flex items-center justify-center hover:bg-[#FF6B9D] hover:text-white transition-colors shadow-sm">
              <CaretRight size={20} weight="bold" />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {dummyProducts.map((p, idx) => (
            <motion.div
              key={idx}
              className="snap-start shrink-0 w-[260px] bg-white rounded-[20px] shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-10px_rgba(255,107,157,0.2)] border border-gray-100 transition-all duration-300 group relative overflow-hidden flex flex-col"
            >
              {p.badge && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FF6B9D] to-[#FF3E78] text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
                  {p.badge}
                </div>
              )}
              <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF6B9D] transition-colors">
                <Heart size={18} weight="bold" />
              </button>

              <div className="relative aspect-square p-6 bg-gray-50/50 flex items-center justify-center overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">500g</span>
                <h4 className="font-bold text-[#2D2D2D] leading-tight mb-2 line-clamp-2">{p.name}</h4>

                <div className="flex gap-0.5 text-[#FF6B9D] mb-3">
                  {[...Array(5)].map((_, i) => (
                    i === 4 ? <StarHalf key={i} size={12} weight="fill" /> : <Star key={i} size={12} weight={i < 4 ? "fill" : "regular"} />
                  ))}
                </div>

                <div className="mt-auto flex items-baseline gap-2 mb-4">
                  <span className="text-lg font-bold text-[#FF6B9D] font-poppins">{p.price}</span>
                  <span className="text-xs text-gray-400 line-through">{p.old}</span>
                </div>

                <button className="w-full py-2.5 bg-[#FF6B9D] text-white font-bold text-sm rounded-full shadow-md flex items-center justify-center gap-2 hover:bg-[#FF3E78] hover:shadow-lg transition-all">
                  <ShoppingCart size={16} weight="bold" />
                  Quick Add
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
