import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  CreditCard, 
  CheckCircle,
  Truck
} from '@phosphor-icons/react';

// Reusable Spotlight Card from our design system
const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div onMouseMove={handleMouseMove} className={`relative group overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 107, 157, 0.08), transparent 85%)`
          )
        }}
      />
      <div className="absolute inset-0 rounded-[2.5rem] border border-dark/5 group-hover:border-primary/20 pointer-events-none z-10 transition-colors duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export const OrderDetailsPage: React.FC = () => {
  // Dummy order data
  const order = {
    id: '#CN-9482',
    date: 'Oct 24, 2026',
    status: 'Delivered',
    paymentMethod: 'Visa ending in 4242',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St, Apt 4B',
      city: 'Dubai',
      zip: '00000',
      country: 'United Arab Emirates'
    },
    items: [
      { id: 1, name: 'Royal Hamper Box', price: 'د.إ899', quantity: 1, img: '/productimages/imgi_90_premium-nuts-2048x2048.png' },
      { id: 2, name: 'Premium Afghan Figs', price: 'د.إ200', quantity: 2, img: '/productimages/imgi_19_dryfruit.png.webp' },
    ],
    subtotal: 'د.إ1,299',
    shipping: 'د.إ0',
    tax: 'د.إ65',
    total: 'د.إ1,364'
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  return (
    <div className="min-h-[90dvh] bg-[#f9fafb] pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-poppins selection:bg-primary/20">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ x: [0, 40, -20, 0], y: [0, -30, 40, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full filter blur-[100px] opacity-30 bg-primary/10" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header & Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
          <button 
            onClick={() => { window.location.hash = '#account'; }}
            className="flex items-center gap-2 text-dark/60 hover:text-primary transition-colors text-sm font-bold mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Orders
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-dark tracking-tighter mb-2">Order Details</h1>
              <p className="text-dark/50 text-sm font-light">
                Order {order.id} • Placed on {order.date}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="bg-[#e6f4ea] text-[#1e8e3e] border border-[#1e8e3e]/20 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle size={14} weight="fill" />
                {order.status}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Items List */}
          <motion.div variants={staggerItem} className="lg:col-span-2 space-y-6">
            <SpotlightCard className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-200/50">
              <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                <Package size={20} className="text-primary" /> Items in your Order
              </h2>
              
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-6 pb-6 border-b border-dark/5 last:border-0 last:pb-0">
                    <div className="w-20 h-20 rounded-2xl bg-[#f9fafb] p-2 border border-dark/5 shrink-0 flex items-center justify-center overflow-hidden">
                      <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-dark">{item.name}</h4>
                      <p className="text-xs text-dark/50 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-dark">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
            
            <SpotlightCard className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-200/50">
              <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                <Truck size={20} className="text-primary" /> Delivery Status
              </h2>
              <div className="relative pl-6 border-l-2 border-primary/20 space-y-8 ml-2">
                
                {/* Step 1: Delivered */}
                <div className="relative">
                  <div className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm ring-1 ring-primary/20" />
                  <p className="text-sm font-bold text-dark leading-none">Delivered successfully</p>
                  <p className="text-xs text-dark/50 mt-1.5">{order.date}, 2:30 PM</p>
                </div>

                {/* Step 2: Out for Delivery */}
                <div className="relative">
                  <div className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm ring-1 ring-primary/20" />
                  <p className="text-sm font-bold text-dark leading-none">Out for delivery</p>
                  <p className="text-xs text-dark/50 mt-1.5">Oct 24, 2026, 9:15 AM</p>
                </div>

                {/* Step 3: Shipped */}
                <div className="relative">
                  <div className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm ring-1 ring-primary/20" />
                  <p className="text-sm font-bold text-dark leading-none">Shipped</p>
                  <p className="text-xs text-dark/50 mt-1.5">Oct 23, 2026, 4:45 PM</p>
                </div>

                {/* Step 4: Order Confirmed */}
                <div className="relative">
                  <div className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm ring-1 ring-primary/20" />
                  <p className="text-sm font-bold text-dark leading-none">Order Confirmed</p>
                  <p className="text-xs text-dark/50 mt-1.5">Oct 22, 2026, 11:20 AM</p>
                </div>

              </div>
            </SpotlightCard>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div variants={staggerItem} className="space-y-6">
            <SpotlightCard className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-200/50">
              <h3 className="text-sm font-bold text-dark/40 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CreditCard size={16} /> Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-dark/70">
                  <span>Subtotal</span>
                  <span className="font-semibold text-dark">{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-dark/70">
                  <span>Shipping</span>
                  <span className="font-semibold text-dark">{order.shipping}</span>
                </div>
                <div className="flex justify-between text-dark/70 pb-3 border-b border-dark/5">
                  <span>Tax</span>
                  <span className="font-semibold text-dark">{order.tax}</span>
                </div>
                <div className="flex justify-between font-black text-lg text-dark pt-2">
                  <span>Total</span>
                  <span>{order.total}</span>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-200/50">
              <h3 className="text-sm font-bold text-dark/40 uppercase tracking-wider mb-4 flex items-center gap-2">
                <MapPin size={16} /> Shipping Details
              </h3>
              <div className="text-sm text-dark/80 space-y-1">
                <p className="font-bold text-dark">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </SpotlightCard>
            
            <SpotlightCard className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-200/50">
              <h3 className="text-sm font-bold text-dark/40 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CreditCard size={16} /> Payment Method
              </h3>
              <div className="text-sm text-dark/80">
                <p className="font-medium">{order.paymentMethod}</p>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};
