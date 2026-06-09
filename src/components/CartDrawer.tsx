import React from 'react';
import { X, Trash, Plus, Minus, ShoppingCart, Sparkle } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  weight: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-primary/10 flex items-center justify-between bg-blush/20">
              <div className="flex items-center gap-2">
                <ShoppingCart size={24} className="text-primary" weight="bold" />
                <h2 className="text-xl font-bold text-dark">Your Cart</h2>
                {items.length > 0 && (
                  <span className="bg-primary/20 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-primary/10 text-dark/70 hover:text-primary transition-all duration-200"
                aria-label="Close Cart"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary/40">
                    <ShoppingCart size={40} weight="light" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark">Your cart is empty</h3>
                  <p className="text-sm text-dark/60 max-w-[280px]">
                    Looks like you haven't added any products to your cart yet. Let's start shopping!
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-6 py-2.5 bg-gradient-pink text-white rounded-full font-medium text-sm hover:shadow-premium transition-all duration-300"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 border-b border-primary/5 pb-4 last:border-0 last:pb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover border border-primary/10 bg-blush/10"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-dark text-sm sm:text-base leading-tight">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-dark/40 hover:text-red-500 p-1 transition-colors duration-150"
                            aria-label="Remove item"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                        <p className="text-xs text-dark/50 mt-1">Weight: {item.weight}</p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-primary/20 rounded-full bg-white px-2 py-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-primary transition-colors text-dark/60"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} weight="bold" />
                          </button>
                          <span className="px-3 text-sm font-semibold text-dark select-none min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-primary transition-colors text-dark/60"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} weight="bold" />
                          </button>
                        </div>
                        <span className="font-bold text-primary text-sm sm:text-base">
                          د.إ{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-primary/10 bg-blush/10 space-y-4">
                <div className="flex justify-between items-center text-dark font-medium">
                  <span>Subtotal</span>
                  <span className="text-xl font-bold text-gradient-pink">
                    د.إ{subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-dark/50">
                  Shipping, taxes, and discounts calculated at checkout.
                </p>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full py-4 bg-gradient-pink text-white rounded-full font-semibold text-center shadow-premium hover:shadow-premium-hover transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <Sparkle size={18} weight="fill" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
