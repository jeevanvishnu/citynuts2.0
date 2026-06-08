import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Trash, Plus, Minus,
  ArrowRight, LockKey,
  Sparkle, ShieldCheck, ArrowUUpLeft
} from '@phosphor-icons/react';
import type { CartItem } from './CartDrawer';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal * 0.05;
  const total = subtotal + vat;

  const handleQuantity = (id: string, current: number, delta: number) => {
    const newQty = current + delta;
    if (newQty > 0) {
      onUpdateQuantity(id, newQty);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      onCheckout();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-24 font-sans text-dark pb-16">
      {/* 1. Page Hero Bar */}
      <div className="w-full bg-gradient-to-r from-[#FFF0F5] to-white border-b border-primary/10 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart size={36} className="text-primary" weight="duotone" />
              <h1 className="text-4xl font-black text-dark font-poppins tracking-tight">Your Cart</h1>
            </div>
            <p className="text-dark/50 font-medium">Review your premium selections before checkout.</p>
          </div>
          <div className="text-sm text-dark/60 font-medium bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-primary/10">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-primary font-bold">Cart</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {items.length === 0 ? (
          // Empty Cart State
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
              <ShoppingCart size={80} className="text-primary/40" weight="light" />
            </motion.div>
            <h2 className="text-3xl font-bold font-poppins text-dark mb-4">Your Cart is Empty</h2>
            <p className="text-dark/50 font-medium mb-10 text-lg">Looks like you haven't added anything yet. Start your premium snacking journey!</p>
            <a href="#products" className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-pink text-white rounded-full font-bold text-lg shadow-premium hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1 group">
              Start Shopping
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" weight="bold" />
            </a>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column: Cart Items List */}
            <div className="flex-1 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-primary/10">
                <h2 className="text-xl font-bold text-dark font-poppins">Items ({items.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                <a href="#products" className="flex items-center gap-2 text-primary font-semibold hover:text-[#FF3E78] transition-colors group text-sm">
                  <ArrowUUpLeft size={16} className="group-hover:-translate-x-1 transition-transform" weight="bold" />
                  Continue Shopping
                </a>
              </div>

              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.95, transition: { duration: 0.3 } }}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgba(255,107,157,0.12)] transition-all duration-300 border border-primary/5 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-stretch relative"
                  >
                    {/* Item Image */}
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 bg-[#FFF5F9] rounded-xl flex items-center justify-center p-3 overflow-hidden">
                      <img
                        src={item.image || '/productimages/imgi_24_almond3.png.webp'}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md mix-blend-multiply"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 w-full flex flex-col justify-between py-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-dark font-poppins leading-tight group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="px-2.5 py-1 bg-dark/5 text-dark/70 rounded-md text-xs font-bold">{item.weight}</span>
                            <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-bold flex items-center gap-1">
                              <Sparkle size={12} weight="fill" /> Vacuum Packed
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary font-poppins">AED {item.price.toFixed(2)}</div>
                          <div className="text-xs text-dark/40 line-through font-medium">AED {(item.price * 1.2).toFixed(2)}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6 border-t border-primary/5 pt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-3 px-2 py-1 rounded-full border border-primary/20 bg-[#FFF5F9]">
                          <button
                            onClick={() => handleQuantity(item.id, item.quantity, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-200"
                          >
                            <Minus size={14} weight="bold" />
                          </button>
                          <motion.span
                            key={item.quantity}
                            initial={{ y: -5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-6 text-center font-bold text-dark text-sm font-poppins"
                          >
                            {item.quantity}
                          </motion.span>
                          <button
                            onClick={() => handleQuantity(item.id, item.quantity, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-200"
                          >
                            <Plus size={14} weight="bold" />
                          </button>
                        </div>

                        {/* Total Price & Remove */}
                        <div className="flex items-center gap-6">
                          <motion.div
                            key={item.quantity * item.price}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="text-lg font-black font-poppins text-dark"
                          >
                            <span className="text-xs font-semibold text-dark/50 mr-1 uppercase">Total:</span>
                            AED {(item.price * item.quantity).toFixed(2)}
                          </motion.div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                            title="Remove"
                          >
                            <Trash size={20} weight="fill" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Column: Order Summary (Sticky) */}
            <div className="w-full lg:w-[400px] shrink-0">
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(255,107,157,0.08)] border border-primary/10 p-6 sm:p-8 sticky top-32">
                <h3 className="text-xl font-bold text-dark font-poppins mb-6 pb-4 border-b border-primary/10">Order Summary</h3>

                {/* Pricing Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm text-dark/70 font-medium">
                    <span>Subtotal</span>
                    <span className="text-dark font-bold text-base">AED {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-dark/70 font-medium">
                    <span>VAT (5%)</span>
                    <span className="text-dark font-bold text-base">AED {vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-dark/70 font-medium">
                    <span>Shipping</span>
                    <span className="text-[#00C853] font-bold">Free</span>
                  </div>
                </div>

                <div className="h-px bg-primary/20 w-full mb-6"></div>

                {/* Total */}
                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-bold text-dark font-poppins">Total</span>
                  <div className="text-right">
                    <div className="text-3xl font-black text-primary font-poppins leading-none">AED {total.toFixed(2)}</div>
                    <div className="text-[10px] text-dark/40 font-semibold mt-1">Includes all applicable taxes</div>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ y: -2, boxShadow: '0 8px 25px -5px rgba(255,107,157,0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  disabled={isCheckingOut}
                  className="w-full h-14 rounded-2xl bg-gradient-pink text-white font-bold font-poppins uppercase tracking-wide shadow-premium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden mb-6"
                >
                  <LockKey size={20} weight="bold" />
                  <span className="relative z-10 text-base">
                    {isCheckingOut ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      "Secure Checkout"
                    )}
                  </span>
                  <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Trust Badges */}
                <div className="space-y-4">
                  <div className="bg-[#FFF5F9] rounded-xl p-4 flex items-center gap-3 border border-primary/5">
                    <ShieldCheck size={24} className="text-primary shrink-0" weight="duotone" />
                    <p className="text-xs text-dark/70 font-medium leading-tight">
                      <strong>100% Secure Payment.</strong> Your data is encrypted and protected.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <span className="text-[10px] font-bold text-dark/40 uppercase tracking-wider mr-1">We Accept</span>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white text-[9px] font-extrabold rounded shadow-sm text-dark/60 border border-primary/10">VISA</span>
                      <span className="px-2 py-1 bg-white text-[9px] font-extrabold rounded shadow-sm text-dark/60 border border-primary/10">MC</span>
                      <span className="px-2 py-1 bg-white text-[9px] font-extrabold rounded shadow-sm text-dark/60 border border-primary/10">APPLE PAY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

