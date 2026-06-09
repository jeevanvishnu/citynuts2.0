import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Trash, ArrowRight, ArrowUUpLeft, Star } from '@phosphor-icons/react';
import { productsData } from '../data/products';
import type { CartItem } from './CartDrawer';

interface WishlistPageProps {
  wishlist: string[];
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
  onAddToCart: (item: CartItem) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ wishlist, onToggleWishlist, onAddToCart }) => {
  const wishlistedProducts = productsData.filter(product => wishlist.includes(product.id));

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-24 font-sans text-dark pb-16">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-[#FFF0F5] to-white border-b border-primary/10 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Heart size={36} className="text-primary" weight="duotone" />
              <h1 className="text-4xl font-black text-dark font-poppins tracking-tight">Your Wishlist</h1>
            </div>
            <p className="text-dark/50 font-medium">Save your favorite premium treats for later.</p>
          </div>
          <div className="text-sm text-dark/60 font-medium bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-primary/10">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-primary font-bold">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlist.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(255,107,157,0.06)] p-16 text-center relative overflow-hidden border border-primary/10 max-w-2xl mx-auto mt-10"
          >
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-20"
              animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: 'radial-gradient(circle at center, #FF6B9D 2px, transparent 2px)',
                backgroundSize: '40px 40px'
              }}
            />
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-40 h-40 mx-auto bg-gradient-to-br from-blush to-white rounded-full flex items-center justify-center mb-8 shadow-inner border border-primary/10"
            >
              <Heart size={80} className="text-primary/40" weight="light" />
            </motion.div>
            <h2 className="text-3xl font-bold font-poppins text-dark mb-4">Your Wishlist is Empty</h2>
            <p className="text-dark/50 font-medium mb-10 text-lg">You haven't saved any items yet. Discover our premium selections!</p>
            <a href="#products" className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-pink text-white rounded-full font-bold text-lg shadow-premium hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1 group">
              Browse Products
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" weight="bold" />
            </a>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-primary/10">
              <h2 className="text-xl font-bold text-dark font-poppins">Saved Items ({wishlist.length})</h2>
              <a href="#products" className="flex items-center gap-2 text-primary font-semibold hover:text-[#FF3E78] transition-colors group text-sm">
                <ArrowUUpLeft size={16} className="group-hover:-translate-x-1 transition-transform" weight="bold" />
                Continue Shopping
              </a>
            </div>

            <div className="flex flex-col gap-5">
              <AnimatePresence>
                {wishlistedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="group bg-white rounded-3xl border border-primary/10 shadow-[0_4px_20px_rgba(255,107,157,0.05)] hover:shadow-[0_8px_30px_rgba(255,107,157,0.12)] transition-all duration-300 flex flex-col sm:flex-row overflow-hidden relative p-4 gap-6 items-center"
                  >
                    {/* Remove from Wishlist Icon (Absolute on Mobile, Relative on Desktop via flow, wait let's put it top-right on mobile, far-right on desktop) */}
                    <button
                      onClick={(e) => onToggleWishlist(product.id, e)}
                      className="absolute top-4 right-4 sm:static sm:top-auto sm:right-auto sm:order-last p-2.5 rounded-full bg-red-50 hover:bg-red-500 text-red-400 hover:text-white border border-red-100 hover:border-red-500 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm shrink-0"
                      title="Remove from wishlist"
                    >
                      <Trash size={20} weight="fill" />
                    </button>

                    {/* Image Area - Very clean and prominent */}
                    <a href="#product-detail" className="w-full sm:w-40 shrink-0 aspect-square sm:aspect-auto sm:h-36 bg-gradient-to-br from-[#FFF5F9] to-[#ffffff] rounded-2xl relative flex items-center justify-center p-4 border border-primary/5">
                      {product.badge && (
                        <div className="absolute top-2 left-2 z-10">
                          <span className="bg-gradient-pink text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                            {product.badge}
                          </span>
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 select-none mix-blend-multiply drop-shadow-sm"
                        draggable="false"
                      />
                    </a>

                    {/* Content Area */}
                    <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-2">
                      {/* Product Details */}
                      <div className="space-y-2.5 max-w-lg">
                        <div className="flex items-center gap-1.5">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                weight={i < Math.floor(product.rating) ? 'fill' : 'regular'}
                                className="text-primary"
                              />
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-dark/40">({product.reviewsCount} Reviews)</span>
                        </div>

                        <a href="#product-detail" className="font-bold text-dark text-lg sm:text-xl leading-snug hover:text-primary transition-colors duration-200">
                          {product.name}
                        </a>
                        
                        <div className="flex items-center gap-2">
                          <span className="inline-block text-xs font-bold text-dark/60 bg-dark/5 border border-dark/5 rounded-md px-2.5 py-1">
                            {product.weight}
                          </span>
                          <span className="text-xs font-medium text-[#00C853] bg-[#00C853]/10 px-2.5 py-1 rounded-md border border-[#00C853]/20">
                            In Stock
                          </span>
                        </div>
                      </div>

                      {/* Pricing & Add to Cart (Desktop: Right Aligned, Mobile: Bottom Aligned) */}
                      <div className="flex flex-col sm:items-end gap-4 sm:gap-3 shrink-0 sm:min-w-[180px]">
                        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-0">
                          <span className="text-2xl font-black text-primary font-poppins">AED {product.price}</span>
                          <span className="text-sm text-dark/30 line-through font-semibold">AED {product.originalPrice}</span>
                        </div>

                        <button
                          onClick={() => onAddToCart({
                            id: product.id,
                            name: product.name,
                            image: product.image,
                            price: product.price,
                            weight: product.weight,
                            quantity: 1
                          })}
                          className="w-full sm:w-auto px-6 py-3 bg-gradient-pink hover:opacity-90 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-premium transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group/btn"
                        >
                          <ShoppingCart size={18} weight="bold" className="group-hover/btn:-rotate-12 transition-transform" />
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
