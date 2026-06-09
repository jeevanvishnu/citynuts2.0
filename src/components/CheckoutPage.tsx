import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, LockKey, ShieldCheck, CheckCircle,
  CreditCard, Truck, Calendar, User, Envelope, Phone, MapPin,
  Sparkle, CircleNotch, Fingerprint, Receipt, Printer
} from '@phosphor-icons/react';
import type { CartItem } from './CartDrawer';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onOrderSuccess }) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplePayScanning, setIsApplePayScanning] = useState(false);
  const [isFocusedOnCvv, setIsFocusedOnCvv] = useState(false);
  const [completedOrderNum, setCompletedOrderNum] = useState('');
  const [savedOrderDetails, setSavedOrderDetails] = useState<{
    items: CartItem[];
    subtotal: number;
    vat: number;
    total: number;
    shippingAddress: string;
    shippingCity: string;
    shippingEmirate: string;
    fullName: string;
    email: string;
  } | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    emirate: 'Dubai',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calc Totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal * 0.05;
  const total = subtotal + vat;

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      value = parts.join(' ');
    } else {
      value = value.substring(0, 19);
    }

    // Custom length cap for spaces (16 digits + 3 spaces = 19 characters)
    setFormData((prev) => ({ ...prev, cardNumber: value.slice(0, 19) }));
    if (errors.cardNumber) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.cardNumber;
        return next;
      });
    }
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setFormData((prev) => ({ ...prev, cardExpiry: value.slice(0, 5) }));
    if (errors.cardExpiry) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.cardExpiry;
        return next;
      });
    }
  };

  // Validate Shipping Info
  const validateShipping = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City/Area is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Payment Info
  const validatePayment = () => {
    if (paymentMethod !== 'card') return true;

    const newErrors: Record<string, string> = {};
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    const cleanCardNum = formData.cardNumber.replace(/\s+/g, '');
    if (cleanCardNum.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (formData.cardExpiry.length !== 5) {
      newErrors.cardExpiry = 'Expiry must be in MM/YY format';
    } else {
      const [month] = formData.cardExpiry.split('/').map(Number);
      if (!month || month < 1 || month > 12) {
        newErrors.cardExpiry = 'Invalid month';
      }
    }
    if (formData.cardCvv.length < 3 || formData.cardCvv.length > 4) {
      newErrors.cardCvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 'shipping') {
      if (validateShipping()) {
        setStep('payment');
        window.scrollTo(0, 0);
      }
    }
  };

  // Process Checkout Order Submit
  const handlePlaceOrder = () => {
    if (paymentMethod === 'card' && !validatePayment()) {
      return;
    }

    setIsProcessing(true);

    // Simulate secure transaction delay
    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderNum = `CN-${Math.floor(100000 + Math.random() * 900000)}-AE`;
      setCompletedOrderNum(generatedOrderNum);

      // Save details for success screen
      setSavedOrderDetails({
        items: [...cartItems],
        subtotal,
        vat,
        total,
        shippingAddress: formData.address + (formData.address2 ? `, ${formData.address2}` : ''),
        shippingCity: formData.city,
        shippingEmirate: formData.emirate,
        fullName: formData.fullName,
        email: formData.email
      });

      setStep('success');
      onOrderSuccess();
      window.scrollTo(0, 0);
    }, 2500);
  };

  // Simulate Apple Pay Scanning UI
  const handleApplePaySubmit = () => {
    setIsApplePayScanning(true);
    setTimeout(() => {
      setIsApplePayScanning(false);
      // Now trigger immediate order placement
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const generatedOrderNum = `CN-${Math.floor(100000 + Math.random() * 900000)}-AE`;
        setCompletedOrderNum(generatedOrderNum);

        setSavedOrderDetails({
          items: [...cartItems],
          subtotal,
          vat,
          total,
          shippingAddress: formData.address + (formData.address2 ? `, ${formData.address2}` : ''),
          shippingCity: formData.city,
          shippingEmirate: formData.emirate,
          fullName: formData.fullName,
          email: formData.email
        });

        setStep('success');
        onOrderSuccess();
        window.scrollTo(0, 0);
      }, 1500);
    }, 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Stagger entry configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  // Success screen
  if (step === 'success' && savedOrderDetails) {
    // Delivery Dates
    const today = new Date();
    const deliveryMin = new Date(today);
    deliveryMin.setDate(today.getDate() + 1);
    const deliveryMax = new Date(today);
    deliveryMax.setDate(today.getDate() + 2);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
      <div className="min-h-[100dvh] bg-[#fcfcfc] pt-24 pb-20 px-4 font-sans text-dark">
        <div className="max-w-3xl mx-auto">
          {/* Main Success Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-white rounded-[2.5rem] border border-primary/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
          >
            {/* Header Success Section */}
            <div className="bg-gradient-to-r from-[#FFF0F5] to-white px-8 py-12 text-center border-b border-primary/10 relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.2 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-green-500/10 text-white"
              >
                <CheckCircle size={48} weight="fill" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-black font-poppins tracking-tight text-dark"
              >
                Order Confirmed!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-dark/50 font-medium mt-2 text-sm max-w-md mx-auto"
              >
                Thank you for choosing City Nuts. Your premium selection is being vacuum-packed for freshness.
              </motion.p>

              <div className="mt-6 inline-flex bg-white/75 border border-primary/10 px-4 py-2 rounded-full text-xs font-semibold text-primary">
                Order Tracking: {completedOrderNum}
              </div>
            </div>

            {/* Receipt details */}
            <div className="p-8 sm:p-10 space-y-8">
              {/* Delivery info & speed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-dark/40 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck size={14} className="text-primary" weight="bold" />
                    Delivery Address
                  </div>
                  <p className="text-sm font-semibold text-dark leading-snug">{savedOrderDetails.fullName}</p>
                  <p className="text-xs text-dark/70 leading-relaxed font-light">
                    {savedOrderDetails.shippingAddress}<br />
                    {savedOrderDetails.shippingCity}, {savedOrderDetails.shippingEmirate}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-dark/40 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" weight="bold" />
                    Estimated Delivery
                  </div>
                  <p className="text-sm font-bold text-[#00C853] font-poppins">
                    {formatDate(deliveryMin)} - {formatDate(deliveryMax)}
                  </p>
                  <p className="text-[11px] text-dark/40 font-medium leading-relaxed">
                    Orders placed inside Dubai arrive within 24 hours.
                  </p>
                </div>
              </div>

              {/* Order Items List */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-dark uppercase tracking-wider font-poppins flex items-center gap-2">
                  <Receipt size={16} className="text-primary" weight="bold" />
                  Your Selections
                </h3>

                <div className="divide-y divide-slate-100 border-t border-b border-slate-100/50 py-2">
                  {savedOrderDetails.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-3.5 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blush/40 border border-primary/5 rounded-lg flex items-center justify-center p-1.5 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="font-bold text-dark leading-tight">{item.name}</p>
                          <p className="text-xs text-dark/40 font-medium">{item.weight} &times; {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-dark font-mono text-sm">
                        د.إ{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial summary */}
              <div className="space-y-3 pt-2 max-w-sm ml-auto">
                <div className="flex justify-between items-center text-xs font-medium text-dark/50">
                  <span>Subtotal</span>
                  <span className="font-mono text-dark font-semibold">د.إ{savedOrderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium text-dark/50">
                  <span>VAT (5%)</span>
                  <span className="font-mono text-dark font-semibold">د.إ{savedOrderDetails.vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium text-dark/50">
                  <span>Shipping</span>
                  <span className="font-bold text-[#00C853]">Free</span>
                </div>
                <div className="h-px bg-slate-100 w-full my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-dark font-poppins">Total Paid</span>
                  <span className="text-xl font-black text-primary font-poppins">د.إ{savedOrderDetails.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Print Receipt / Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                <button
                  onClick={handlePrint}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary/20 text-primary hover:bg-blush/30 rounded-xl text-sm font-bold transition-all duration-200 active:scale-98"
                >
                  <Printer size={18} weight="bold" />
                  Print Receipt
                </button>

                <a
                  href="#home"
                  className="w-full sm:flex-1 text-center py-3 bg-gradient-pink hover:opacity-90 text-white rounded-xl text-sm font-bold shadow-premium transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  Continue Snacking
                  <ArrowRight size={16} weight="bold" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Normal Checkout View (Details & Payment)
  return (
    <div className="min-h-[100dvh] bg-[#fcfcfc] pt-24 pb-16 font-sans text-dark relative">
      {/* Dynamic Background Mesh Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Navigation link */}
        <div className="mb-8 flex items-center justify-between">
          <a
            href="#cart"
            className="inline-flex items-center gap-2 text-dark/50 hover:text-primary transition-all duration-200 font-semibold text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" weight="bold" />
            Back to Cart
          </a>

          {/* Step Indicators */}
          <div className="flex items-center gap-2.5">
            <div className={`flex items-center gap-1.5 text-xs font-bold ${step === 'shipping' ? 'text-primary' : 'text-dark/40'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'shipping' ? 'bg-primary text-white' : 'bg-slate-200 text-dark/60'}`}>1</span>
              <span>Shipping</span>
            </div>
            <div className="w-8 h-px bg-slate-200"></div>
            <div className={`flex items-center gap-1.5 text-xs font-bold ${step === 'payment' ? 'text-primary' : 'text-dark/40'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-primary text-white' : 'bg-slate-200 text-dark/60'}`}>2</span>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty State fallback
          <div className="bg-white rounded-3xl border border-primary/10 p-12 text-center max-w-xl mx-auto">
            <div className="w-20 h-20 bg-blush rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <LockKey size={36} />
            </div>
            <h2 className="text-xl font-bold font-poppins mb-2">No items to checkout</h2>
            <p className="text-sm text-dark/50 font-medium mb-6">Add products to your cart before proceeding to secure checkout.</p>
            <a href="#products" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-pink text-white rounded-full font-bold shadow-md">
              Browse Products
              <ArrowRight size={16} />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Form details (60% width on large screens) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">

                {/* STEP 1: Shipping Details */}
                {step === 'shipping' && (
                  <motion.div
                    key="shipping"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    className="space-y-8"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-2xl font-black font-poppins tracking-tight text-dark">Delivery details</h2>
                      <p className="text-xs text-dark/40 mt-1 font-semibold uppercase tracking-wider">Please provide shipping address within UAE</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-white rounded-[2rem] border border-primary/10 p-6 sm:p-8 space-y-6 shadow-[0_12px_30px_rgba(255,107,157,0.02)]">
                      {/* Email block */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-bold text-dark/60 uppercase tracking-wider flex items-center gap-1.5">
                          <Envelope size={14} className="text-primary" />
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="e.g., alex.smith@domain.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-slate-50/50 transition-all font-light ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-slate-200'}`}
                        />
                        {errors.email && <span className="text-xs text-red-500 font-bold">{errors.email}</span>}
                      </div>

                      {/* Name block */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" className="text-xs font-bold text-dark/60 uppercase tracking-wider flex items-center gap-1.5">
                          <User size={14} className="text-primary" />
                          Recipient Full Name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          name="fullName"
                          placeholder="First and last name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-slate-50/50 transition-all font-light ${errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-slate-200'}`}
                        />
                        {errors.fullName && <span className="text-xs text-red-500 font-bold">{errors.fullName}</span>}
                      </div>

                      {/* Phone block */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-xs font-bold text-dark/60 uppercase tracking-wider flex items-center gap-1.5">
                          <Phone size={14} className="text-primary" />
                          Mobile Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          placeholder="e.g., +971 50 123 4567"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-slate-50/50 transition-all font-light ${errors.phone ? 'border-red-400 focus:border-red-400' : 'border-slate-200'}`}
                        />
                        {errors.phone && <span className="text-xs text-red-500 font-bold">{errors.phone}</span>}
                      </div>

                      {/* Address Line 1 */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="address" className="text-xs font-bold text-dark/60 uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin size={14} className="text-primary" />
                          Street Address / Building
                        </label>
                        <input
                          id="address"
                          type="text"
                          name="address"
                          placeholder="Villa, Apartment, Street name"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-slate-50/50 transition-all font-light ${errors.address ? 'border-red-400 focus:border-red-400' : 'border-slate-200'}`}
                        />
                        {errors.address && <span className="text-xs text-red-500 font-bold">{errors.address}</span>}
                      </div>

                      {/* Address Line 2 */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="address2" className="text-xs font-bold text-dark/60 uppercase tracking-wider">
                          Apartment, Suite, Unit, etc. (Optional)
                        </label>
                        <input
                          id="address2"
                          type="text"
                          name="address2"
                          placeholder="Flat #, floor, landmarks"
                          value={formData.address2}
                          onChange={handleInputChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-slate-50/50 transition-all font-light"
                        />
                      </div>

                      {/* City & Emirate (asymmetric grid) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="city" className="text-xs font-bold text-dark/60 uppercase tracking-wider">City / Area</label>
                          <input
                            id="city"
                            type="text"
                            name="city"
                            placeholder="e.g., Marina / Downtown"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-slate-50/50 transition-all font-light ${errors.city ? 'border-red-400 focus:border-red-400' : 'border-slate-200'}`}
                          />
                          {errors.city && <span className="text-xs text-red-500 font-bold">{errors.city}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="emirate" className="text-xs font-bold text-dark/60 uppercase tracking-wider">Emirate</label>
                          <select
                            id="emirate"
                            name="emirate"
                            value={formData.emirate}
                            onChange={handleInputChange}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-slate-50/50 transition-all font-medium text-dark cursor-pointer"
                          >
                            <option value="Dubai">Dubai</option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="Ajman">Ajman</option>
                            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                            <option value="Fujairah">Fujairah</option>
                            <option value="Umm Al Quwain">Umm Al Quwain</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>

                    {/* Step CTA */}
                    <motion.div variants={itemVariants} className="pt-2">
                      <motion.button
                        whileHover={{ y: -2, boxShadow: '0 8px 25px -5px rgba(255,107,157,0.5)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNextStep}
                        className="w-full sm:w-auto px-8 h-14 bg-gradient-pink text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-premium font-poppins uppercase tracking-wider text-sm transition-all duration-300 ml-auto"
                      >
                        Continue to Payment
                        <ArrowRight size={16} weight="bold" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}

                {/* STEP 2: Secure Payment Options */}
                {step === 'payment' && (
                  <motion.div
                    key="payment"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                    className="space-y-8"
                  >
                    <motion.div variants={itemVariants} className="flex justify-between items-end">
                      <div>
                        <h2 className="text-2xl font-black font-poppins tracking-tight text-dark">Secure Payment</h2>
                        <p className="text-xs text-dark/40 mt-1 font-semibold uppercase tracking-wider">Select your preferred payment gateway</p>
                      </div>

                      <button
                        onClick={() => {
                          setStep('shipping');
                          setErrors({});
                        }}
                        className="text-xs font-bold text-primary hover:underline hover:text-primary-dark transition-all duration-200"
                      >
                        Edit Shipping Info
                      </button>
                    </motion.div>

                    {/* Payment Mode Toggles */}
                    <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => { setPaymentMethod('card'); setErrors({}); }}
                        className={`flex flex-col items-center justify-center gap-2 py-4 px-2 border rounded-2xl transition-all duration-300 ${paymentMethod === 'card' ? 'border-primary bg-blush/20 text-primary font-semibold shadow-sm' : 'border-slate-200 bg-white text-dark/60 hover:border-primary/40'}`}
                      >
                        <CreditCard size={24} weight={paymentMethod === 'card' ? 'fill' : 'regular'} />
                        <span className="text-xs tracking-tight">Credit Card</span>
                      </button>

                      <button
                        onClick={() => { setPaymentMethod('applepay'); setErrors({}); }}
                        className={`flex flex-col items-center justify-center gap-2 py-4 px-2 border rounded-2xl transition-all duration-300 ${paymentMethod === 'applepay' ? 'border-primary bg-blush/20 text-primary font-semibold shadow-sm' : 'border-slate-200 bg-white text-dark/60 hover:border-primary/40'}`}
                      >
                        <Fingerprint size={24} weight={paymentMethod === 'applepay' ? 'fill' : 'regular'} />
                        <span className="text-xs tracking-tight">Apple Pay</span>
                      </button>

                      <button
                        onClick={() => { setPaymentMethod('cod'); setErrors({}); }}
                        className={`flex flex-col items-center justify-center gap-2 py-4 px-2 border rounded-2xl transition-all duration-300 ${paymentMethod === 'cod' ? 'border-primary bg-blush/20 text-primary font-semibold shadow-sm' : 'border-slate-200 bg-white text-dark/60 hover:border-primary/40'}`}
                      >
                        <Truck size={24} weight={paymentMethod === 'cod' ? 'fill' : 'regular'} />
                        <span className="text-xs tracking-tight">Cash / COD</span>
                      </button>
                    </motion.div>

                    {/* Method Renderers */}
                    <motion.div variants={itemVariants}>
                      {paymentMethod === 'card' && (
                        <div className="space-y-6">
                          {/* 3D Flipping Card Visualizer Container */}
                          <div className="flex justify-center py-4 relative overflow-hidden bg-gradient-to-r from-slate-50 to-white rounded-3xl border border-slate-100 p-6 shadow-inner">
                            {/* The 3D rotating card container */}
                            <motion.div
                              animate={{ rotateY: isFocusedOnCvv ? 180 : 0 }}
                              transition={{ type: "spring", stiffness: 70, damping: 14 }}
                              style={{ transformStyle: "preserve-3d" }}
                              className="w-full max-w-[320px] h-[190px] rounded-[1.25rem] bg-gradient-to-br from-[#1E1E1E] to-[#3A3A3A] text-white p-5 shadow-2xl relative select-none font-mono"
                            >
                              {/* CARD FRONT FACE */}
                              <div
                                style={{ backfaceVisibility: "hidden" }}
                                className="absolute inset-0 p-5 flex flex-col justify-between"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="w-10 h-7 bg-white/10 rounded border border-white/5 flex items-center justify-center font-bold text-[10px] text-white/40 tracking-widest uppercase">
                                    NFC
                                  </div>
                                  <Sparkle size={20} className="text-primary-dark" weight="fill" />
                                </div>

                                <div className="space-y-4">
                                  {/* Card Number display */}
                                  <div className="text-base sm:text-lg tracking-widest font-semibold font-mono text-center truncate select-all text-white/90">
                                    {formData.cardNumber || '•••• •••• •••• ••••'}
                                  </div>

                                  <div className="flex justify-between items-end">
                                    <div className="max-w-[70%]">
                                      <div className="text-[8px] text-white/30 uppercase font-sans font-bold tracking-wider">Cardholder</div>
                                      <div className="text-[11px] font-semibold truncate font-mono uppercase tracking-wide">
                                        {formData.cardName || 'YOUR FULL NAME'}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-[8px] text-white/30 uppercase font-sans font-bold tracking-wider">Expires</div>
                                      <div className="text-[11px] font-semibold font-mono tracking-widest">
                                        {formData.cardExpiry || 'MM/YY'}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* CARD BACK FACE (CVV focus) */}
                              <div
                                style={{
                                  backfaceVisibility: "hidden",
                                  transform: "rotateY(180deg)"
                                }}
                                className="absolute inset-0 py-5 flex flex-col justify-between"
                              >
                                <div className="w-full h-8 bg-black mt-2"></div>
                                <div className="px-5 space-y-3">
                                  <div className="flex items-center justify-end bg-white/10 h-7 rounded border border-white/5 px-2 relative">
                                    <span className="text-[10px] text-white/30 absolute left-2 font-sans font-semibold uppercase tracking-wider">Secure CVV</span>
                                    <span className="text-[12px] font-semibold text-white tracking-widest">
                                      {formData.cardCvv ? formData.cardCvv.replace(/./g, '•') : '•••'}
                                    </span>
                                  </div>
                                  <p className="text-[7px] text-white/25 leading-normal font-sans font-light">
                                    This visual card preview is fully simulated and processed securely using 256-bit SSL encryption.
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          </div>

                          {/* Card Inputs */}
                          <div className="bg-white rounded-[2rem] border border-primary/10 p-6 sm:p-8 space-y-6 shadow-[0_12px_30px_rgba(255,107,157,0.02)]">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="cardName" className="text-xs font-bold text-dark/60 uppercase tracking-wider">
                                Cardholder Name
                              </label>
                              <input
                                id="cardName"
                                type="text"
                                name="cardName"
                                placeholder="Name as printed on card"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-slate-50/50 transition-all font-light ${errors.cardName ? 'border-red-400 focus:border-red-400' : 'border-slate-200'}`}
                              />
                              {errors.cardName && <span className="text-xs text-red-500 font-bold">{errors.cardName}</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                              <label htmlFor="cardNumber" className="text-xs font-bold text-dark/60 uppercase tracking-wider">
                                Card Number
                              </label>
                              <input
                                id="cardNumber"
                                type="text"
                                name="cardNumber"
                                placeholder="0000 0000 0000 0000"
                                value={formData.cardNumber}
                                onChange={handleCardNumberChange}
                                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-slate-50/50 transition-all font-mono font-light ${errors.cardNumber ? 'border-red-400 focus:border-red-400' : 'border-slate-200'}`}
                              />
                              {errors.cardNumber && <span className="text-xs text-red-500 font-bold">{errors.cardNumber}</span>}
                            </div>

                            {/* Expiry & CVV */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col gap-2">
                                <label htmlFor="cardExpiry" className="text-xs font-bold text-dark/60 uppercase tracking-wider">
                                  Expiry Date
                                </label>
                                <input
                                  id="cardExpiry"
                                  type="text"
                                  name="cardExpiry"
                                  placeholder="MM/YY"
                                  value={formData.cardExpiry}
                                  onChange={handleExpiryChange}
                                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-slate-50/50 transition-all font-light ${errors.cardExpiry ? 'border-red-400 focus:border-red-400' : 'border-slate-200'}`}
                                />
                                {errors.cardExpiry && <span className="text-xs text-red-500 font-bold">{errors.cardExpiry}</span>}
                              </div>

                              <div className="flex flex-col gap-2">
                                <label htmlFor="cardCvv" className="text-xs font-bold text-dark/60 uppercase tracking-wider">
                                  Secure CVV
                                </label>
                                <input
                                  id="cardCvv"
                                  type="password"
                                  name="cardCvv"
                                  placeholder="3 or 4 digits"
                                  value={formData.cardCvv}
                                  onChange={handleInputChange}
                                  onFocus={() => setIsFocusedOnCvv(true)}
                                  onBlur={() => setIsFocusedOnCvv(false)}
                                  maxLength={4}
                                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-slate-50/50 transition-all font-light ${errors.cardCvv ? 'border-red-400 focus:border-red-400' : 'border-slate-200'}`}
                                />
                                {errors.cardCvv && <span className="text-xs text-red-500 font-bold">{errors.cardCvv}</span>}
                              </div>
                            </div>
                          </div>

                          {/* Secure Checkout Button */}
                          <div className="pt-2">
                            <motion.button
                              whileHover={{ y: -2, boxShadow: '0 8px 25px -5px rgba(255,107,157,0.5)' }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handlePlaceOrder}
                              disabled={isProcessing}
                              className="w-full px-8 h-14 bg-gradient-pink text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-premium font-poppins uppercase tracking-wider text-sm transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                              {isProcessing ? (
                                <>
                                  <CircleNotch size={18} className="animate-spin text-white" />
                                  <span>Authorizing Transaction...</span>
                                </>
                              ) : (
                                <>
                                  <LockKey size={18} weight="bold" />
                                  <span>Pay د.إ{total.toFixed(2)} Secured</span>
                                </>
                              )}
                            </motion.button>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'applepay' && (
                        <div className="bg-white rounded-[2.5rem] border border-primary/10 p-8 text-center space-y-6 shadow-sm">
                          <div className="w-16 h-16 bg-[#F4F4F5] rounded-full flex items-center justify-center mx-auto text-dark">
                            <Fingerprint size={32} />
                          </div>

                          <div className="space-y-2 max-w-md mx-auto">
                            <h3 className="font-bold text-lg font-poppins">Authorize with Apple Pay</h3>
                            <p className="text-xs text-dark/50 leading-relaxed font-light">
                              Authorize instantly and securely using your Apple Pay wallet. Tap below to prompt biometrics.
                            </p>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleApplePaySubmit}
                            disabled={isProcessing || isApplePayScanning}
                            className="bg-[#1E1E1E] text-white py-4 px-10 rounded-2xl flex items-center justify-center gap-2 mx-auto shadow-md hover:bg-black font-semibold font-sans tracking-wide text-sm w-full max-w-xs transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed active:scale-95"
                          >
                            <Fingerprint size={20} weight="fill" />
                            Apple Pay
                          </motion.button>
                        </div>
                      )}

                      {paymentMethod === 'cod' && (
                        <div className="bg-white rounded-[2.5rem] border border-primary/10 p-8 text-center space-y-6 shadow-sm">
                          <div className="w-16 h-16 bg-[#FFF8F0] rounded-full flex items-center justify-center mx-auto text-[#FF9800]">
                            <Truck size={32} weight="duotone" />
                          </div>

                          <div className="space-y-2 max-w-md mx-auto">
                            <h3 className="font-bold text-lg font-poppins">Cash on Delivery</h3>
                            <p className="text-xs text-dark/50 leading-relaxed font-light">
                              Pay in cash or swipe your credit card using the delivery rider's portable payment terminal when your order arrives.
                            </p>
                          </div>

                          <motion.button
                            whileHover={{ y: -2, boxShadow: '0 8px 25px -5px rgba(255,107,157,0.5)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                            className="w-full max-w-xs mx-auto h-14 bg-gradient-pink text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-premium font-poppins uppercase tracking-wider text-sm transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? (
                              <>
                                <CircleNotch size={18} className="animate-spin text-white" />
                                <span>Confirming Order...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle size={18} weight="bold" />
                                <span>Confirm Delivery Order</span>
                              </>
                            )}
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Dynamic Sticky Order Summary (40% width) */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white rounded-[2.5rem] border border-primary/10 p-6 sm:p-8 space-y-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] sticky top-32">
                <h3 className="text-lg font-bold text-dark font-poppins pb-4 border-b border-primary/10">Order Summary</h3>

                {/* Items preview list */}
                <div className="max-h-60 overflow-y-auto pr-2 divide-y divide-slate-100 no-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-3 text-sm first:pt-0">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blush/40 border border-primary/5 rounded-xl flex items-center justify-center p-1.5 shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-dark leading-tight">{item.name}</p>
                          <p className="text-xs text-dark/40 font-semibold">{item.weight} &times; {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-dark font-poppins">د.إ{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-slate-100 w-full"></div>

                {/* Summary Totals */}
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-dark/60">
                    <span>Subtotal</span>
                    <span className="text-dark font-bold">د.إ{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-semibold text-dark/60">
                    <span>VAT (5%)</span>
                    <span className="text-dark font-bold">د.إ{vat.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-semibold text-dark/60">
                    <span>Shipping</span>
                    <span className="text-[#00C853] font-bold">Free</span>
                  </div>
                </div>

                <div className="h-px bg-slate-100 w-full"></div>

                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-dark font-poppins">Total</span>
                  <div className="text-right">
                    <div className="text-2xl font-black text-primary font-poppins leading-none">د.إ{total.toFixed(2)}</div>
                    <div className="text-[9px] text-dark/40 font-semibold mt-1 font-sans">VAT Included</div>
                  </div>
                </div>

                {/* Bottom Trust Stamp */}
                <div className="bg-[#FFF5F9] rounded-2xl p-4 flex items-start gap-3 border border-primary/5">
                  <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" weight="duotone" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-dark">SSL Security Certified</p>
                    <p className="text-[10px] text-dark/60 leading-normal font-light">
                      Payment info is fully tokenized and never saved locally.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Simulated Apple Pay Scanning Overlay */}
      <AnimatePresence>
        {isApplePayScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="bg-[#1C1C1E] text-white rounded-[2rem] p-8 max-w-sm w-full text-center border border-white/10 space-y-6 shadow-2xl relative"
            >
              <div className="flex justify-center relative">
                {/* Simulated dynamic scanning pulse rings */}
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute w-20 h-20 rounded-full border-2 border-white/20"
                ></motion.div>
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white relative z-10">
                  <Fingerprint size={40} className="text-primary-dark" weight="fill" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold font-poppins tracking-tight">Apple Pay Auth</h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  Hold your finger on the sensor or use Face ID to confirm purchase of <span className="text-white font-bold">د.إ{total.toFixed(2)}</span>.
                </p>
              </div>

              <div className="h-px bg-white/10 w-full"></div>

              <button
                onClick={() => setIsApplePayScanning(false)}
                className="text-xs font-bold text-white/40 hover:text-white transition-all py-1"
              >
                Cancel Authorization
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
