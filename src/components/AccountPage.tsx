import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  User as UserIcon,
  Package,
  MapPin,
  Heart,
  CreditCard,
  SignOut,
  BellRinging,
  CheckCircle,
  ArrowRight,
  Clock,
  Sparkle,
  X
} from '@phosphor-icons/react';

// ==========================================
// 1. High-Performance Spotlight Border Card
// ==========================================
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative group overflow-hidden ${className}`}
    >
      {/* Spotlight highlight radial gradient */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 107, 157, 0.08), transparent 85%)`
          )
        }}
      />
      {/* Glass Inner Reflection Border (Liquid Glass) */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-dark/5 group-hover:border-primary/20 pointer-events-none z-10 transition-colors duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]" />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

// ==========================================
// 2. Main AccountPage Component
// ==========================================
interface AccountPageProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onNavigate: (hash: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ user, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'settings'>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+971 50 123 4567'
  });

  const [ordersPage, setOrdersPage] = useState(1);
  const itemsPerPage = 3;

  // Dummy Data for Orders
  const recentOrders = [
    { id: '#CN-9482', date: 'Oct 24, 2026', total: 'د.إ1,299', status: 'Delivered', items: 'Royal Hamper', additionalItems: 2, img: '/productimages/imgi_90_premium-nuts-2048x2048.png' },
    { id: '#CN-9451', date: 'Sep 12, 2026', total: 'د.إ499', status: 'Processing', items: 'Afghan Figs', additionalItems: 0, img: '/productimages/imgi_19_dryfruit.png.webp' },
    { id: '#CN-9310', date: 'Aug 05, 2026', total: 'د.إ899', status: 'Delivered', items: 'Medjool Dates', additionalItems: 1, img: '/productimages/imgi_18_AJWA-DATES-LARGE.png' },
    { id: '#CN-9120', date: 'Jul 18, 2026', total: 'د.إ350', status: 'Delivered', items: 'Premium Almonds', additionalItems: 0, img: '/productimages/imgi_90_premium-nuts-2048x2048.png' },
    { id: '#CN-8902', date: 'Jun 02, 2026', total: 'د.إ720', status: 'Delivered', items: 'Pistachio Box', additionalItems: 1, img: '/productimages/imgi_19_dryfruit.png.webp' },
  ];

  const paginatedOrders = recentOrders.slice((ordersPage - 1) * itemsPerPage, ordersPage * itemsPerPage);
  const totalPages = Math.ceil(recentOrders.length / itemsPerPage);

  // Motion Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  if (!user) {
    return (
      <div className="min-h-[90dvh] flex items-center justify-center pt-28 pb-20">
        <p>Please login to view your account.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[90dvh] bg-[#f9fafb] pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-poppins selection:bg-primary/20">
      
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full filter blur-[100px] opacity-30 bg-primary/10"
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] rounded-full filter blur-[100px] opacity-30 bg-accent/20"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10 lg:mb-14"
        >
          <h1 className="text-4xl lg:text-5xl font-black text-dark tracking-tighter mb-3">
            Personal Information
          </h1>
          <p className="text-dark/50 text-sm max-w-xl font-light">
            Manage your boutique preferences, track recent harvests, and update your personal connoisseur profile.
          </p>
        </motion.div>

        {/* Layout Grid (Bento Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR (3 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 lg:col-span-3 space-y-6"
          >
            {/* User Profile Summary */}
            <SpotlightCard className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-200/50">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-pink p-1 mb-4 relative shadow-lg shadow-primary/20">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white">
                    <UserIcon size={40} className="text-primary/40" weight="fill" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-dark tracking-tight">{user.name}</h2>
                <p className="text-xs text-dark/50 mb-6">{user.email}</p>
                
                <button 
                  onClick={onLogout}
                  className="w-full py-3 rounded-xl bg-blush text-primary text-xs font-bold hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <SignOut size={16} weight="bold" />
                  Secure Logout
                </button>
              </div>
            </SpotlightCard>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {[
                { id: 'overview', icon: <UserIcon size={18} />, label: 'My Profile' },
                { id: 'orders', icon: <Package size={18} />, label: 'Order History' },
                { id: 'addresses', icon: <MapPin size={18} />, label: 'Shipping Addresses' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    activeTab === item.id 
                    ? 'bg-white text-primary shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] font-bold scale-[1.02]' 
                    : 'text-dark/60 hover:bg-white/60 hover:text-dark hover:scale-[1.01]'
                  }`}
                >
                  <span className={`${activeTab === item.id ? 'text-primary' : 'text-dark/40'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                  {activeTab === item.id && (
                    <motion.div layoutId="nav-indicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* RIGHT MAIN CONTENT (9 cols) */}
          <div className="col-span-1 lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="space-y-6"
                >
                  {/* Personal Information */}
                  <motion.div variants={staggerItem}>
                    <SpotlightCard className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-200/50">
                      <h2 className="text-2xl font-black text-dark tracking-tight mb-8">Personal Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <label className="text-[10px] font-bold text-dark/40 uppercase tracking-wider mb-1 block">Full Name</label>
                          <p className="text-sm font-semibold text-dark">{user.name}</p>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-dark/40 uppercase tracking-wider mb-1 block">Email Address</label>
                          <p className="text-sm font-semibold text-dark">{user.email}</p>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-dark/40 uppercase tracking-wider mb-1 block">Phone Number</label>
                          <p className="text-sm font-semibold text-dark">+971 50 123 4567</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="px-6 py-3 bg-blush text-primary rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-colors duration-300"
                      >
                        Edit Details
                      </button>
                    </SpotlightCard>
                  </motion.div>

                  {/* Security Settings */}
                  <motion.div variants={staggerItem}>
                    <SpotlightCard className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-200/50">
                      <h2 className="text-2xl font-black text-dark tracking-tight mb-6">Password Change</h2>
                      <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
                        <div>
                          <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase mb-1.5 block">Current Password</label>
                          <input type="password" placeholder="••••••••" className="w-full border border-dark/5 bg-white/40 focus:border-primary rounded-xl px-4 py-3 text-xs text-dark placeholder:text-dark/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase mb-1.5 block">New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full border border-dark/5 bg-white/40 focus:border-primary rounded-xl px-4 py-3 text-xs text-dark placeholder:text-dark/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase mb-1.5 block">Confirm New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full border border-dark/5 bg-white/40 focus:border-primary rounded-xl px-4 py-3 text-xs text-dark placeholder:text-dark/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200" />
                        </div>
                        <div className="pt-2">
                          <button type="submit" className="px-6 py-3 bg-gradient-pink text-white rounded-xl text-xs font-bold hover:shadow-premium transition-all duration-300 flex items-center gap-2">
                            Update Password
                          </button>
                        </div>
                      </form>
                    </SpotlightCard>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="space-y-6"
                >
                  <SpotlightCard className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-200/50">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-black text-dark tracking-tight">Order History</h2>
                      <div className="text-xs font-bold text-dark/40 uppercase tracking-wider">{recentOrders.length} Orders</div>
                    </div>
                    
                    <div className="space-y-6">
                      {paginatedOrders.map((order, i) => (
                        <motion.div 
                          key={order.id}
                          variants={staggerItem}
                          className="group relative flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border border-dark/5 hover:border-primary/20 bg-white hover:bg-blush/10 transition-all duration-300 gap-4 sm:gap-6"
                        >
                          <div className="flex flex-row sm:items-center gap-4 sm:gap-6">
                            {/* Image Thumbnail */}
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#f9fafb] flex items-center justify-center p-2 shrink-0 border border-dark/5 overflow-hidden">
                              <img src={order.img} alt={order.items} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                              {order.additionalItems > 0 && (
                                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-dark/10 shadow-sm flex items-center justify-center text-[10px] font-bold text-primary">
                                  +{order.additionalItems}
                                </div>
                              )}
                            </div>

                            {/* Order Info */}
                            <div className="flex flex-col justify-center">
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                                <h4 className="text-sm sm:text-base font-bold text-dark leading-none">{order.id}</h4>
                                <span className="text-[10px] text-dark/40 font-medium">• {order.date}</span>
                              </div>
                              <p className="text-xs sm:text-sm font-semibold text-dark/80 mb-2 sm:mb-3 line-clamp-1">{order.items}</p>
                              
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold px-2 py-1 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg uppercase tracking-wider flex items-center gap-1.5 ${
                                  order.status === 'Processing' ? 'bg-blush text-primary border border-primary/20' : 'bg-[#e6f4ea] text-[#1e8e3e] border border-[#1e8e3e]/20'
                                }`}>
                                  {order.status === 'Processing' ? <Clock size={12} weight="bold" /> : <CheckCircle size={12} weight="fill" />}
                                  {order.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Price & Action */}
                          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 sm:gap-4 border-t md:border-t-0 border-dark/5 pt-3 sm:pt-4 md:pt-0 mt-2 sm:mt-0">
                            <p className="text-base sm:text-lg font-black text-dark tracking-tight">{order.total}</p>
                            <button 
                              onClick={() => { window.location.hash = '#order-details'; }}
                              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-pink text-white rounded-xl text-[10px] sm:text-xs font-bold hover:shadow-premium transition-all duration-300 shadow-sm group-hover:shadow-md cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                            >
                              View Details <ArrowRight size={12} weight="bold" className="hidden sm:block" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-dark/5">
                        <button 
                          onClick={() => setOrdersPage(p => Math.max(1, p - 1))}
                          disabled={ordersPage === 1}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-dark/5 text-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-dark/10 transition-colors"
                        >
                          &lt;
                        </button>
                        {[...Array(totalPages)].map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setOrdersPage(idx + 1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${ordersPage === idx + 1 ? 'bg-primary text-white shadow-md' : 'bg-transparent text-dark/60 hover:bg-dark/5'}`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                        <button 
                          onClick={() => setOrdersPage(p => Math.min(totalPages, p + 1))}
                          disabled={ordersPage === totalPages}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-dark/5 text-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-dark/10 transition-colors"
                        >
                          &gt;
                        </button>
                      </div>
                    )}
                  </SpotlightCard>
                </motion.div>
              )}

              {/* Placeholder for Addresses */}
              {activeTab === 'addresses' && (
                <motion.div
                  key="addresses"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  <SpotlightCard className="bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-200/50 flex flex-col items-center justify-center text-center min-h-[400px]">

                    <h2 className="text-2xl font-black text-dark tracking-tight mb-3 capitalize">
                      Addresses Management
                    </h2>
                    <p className="text-sm text-dark/50 max-w-md mx-auto mb-8 font-light">
                      This section is currently being polished for our premium connoisseurs. It will be available shortly.
                    </p>
                    <button 
                      onClick={() => setIsAddressModalOpen(true)}
                      className="px-6 py-3 bg-gradient-pink text-white rounded-xl text-xs font-bold hover:shadow-premium transition-all duration-300 cursor-pointer"
                    >
                      Add New Address
                    </button>
                  </SpotlightCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Edit Details Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-dark/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-dark/5 z-10"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-dark tracking-tight">Edit Details</h3>
                  <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark/60 transition-colors"
                  >
                    <X size={16} weight="bold" />
                  </button>
                </div>
                
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsEditModalOpen(false); }}>
                  <div>
                    <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase mb-1.5 block">Full Name</label>
                    <input 
                      type="text" 
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                      className="w-full border border-dark/5 bg-white focus:border-primary rounded-xl px-4 py-3 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase mb-1.5 block">Email Address</label>
                    <input 
                      type="email" 
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                      className="w-full border border-dark/5 bg-white focus:border-primary rounded-xl px-4 py-3 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase mb-1.5 block">Phone Number</label>
                    <input 
                      type="tel" 
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                      className="w-full border border-dark/5 bg-white focus:border-primary rounded-xl px-4 py-3 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200" 
                    />
                  </div>
                  <div className="pt-4 flex items-center justify-end gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-dark/60 hover:text-dark hover:bg-dark/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-pink text-white rounded-xl text-xs font-bold hover:shadow-premium transition-all duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Address Modal */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddressModalOpen(false)}
              className="absolute inset-0 bg-dark/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-dark/5 z-10"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-dark tracking-tight">Add New Address</h3>
                  <button 
                    onClick={() => setIsAddressModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark/60 transition-colors"
                  >
                    <X size={16} weight="bold" />
                  </button>
                </div>
                
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddressModalOpen(false); }}>
                  <div>
                    <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase mb-1.5 block">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      className="w-full border border-dark/5 bg-white focus:border-primary rounded-xl px-4 py-3 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase mb-1.5 block">Street Address</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 123 Main St, Apt 4B"
                      className="w-full border border-dark/5 bg-white focus:border-primary rounded-xl px-4 py-3 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase mb-1.5 block">City</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Dubai"
                        className="w-full border border-dark/5 bg-white focus:border-primary rounded-xl px-4 py-3 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase mb-1.5 block">Postal Code</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 00000"
                        className="w-full border border-dark/5 bg-white focus:border-primary rounded-xl px-4 py-3 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200" 
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex items-center justify-end gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsAddressModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-dark/60 hover:text-dark hover:bg-dark/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-pink text-white rounded-xl text-xs font-bold hover:shadow-premium transition-all duration-300"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
