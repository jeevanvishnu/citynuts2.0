import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Envelope, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeSlash, 
  GoogleLogo, 
  AppleLogo, 
  Sparkle, 
  CheckCircle,
  Warning,
  Phone,
  ArrowRight
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
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 107, 157, 0.12), transparent 85%)`
          )
        }}
      />
      {/* Glass Inner Reflection Border (Liquid Glass) */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
      
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

// ==========================================
// 2. Magnetic Interactive Button (Spring Physics)
// ==========================================
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className, onClick, type = 'button', disabled }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft spring config for luxury feel
  const springConfig = { damping: 14, stiffness: 140, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Limit displacement to max 10px
    x.set((clientX - centerX) * 0.22);
    y.set((clientY - centerY) * 0.22);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// ==========================================
// 3. Main LoginPage Component
// ==========================================
interface LoginPageProps {
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [signInData, setSignInData] = useState({ email: '', password: '', rememberMe: false });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '', phone: '', agreeToTerms: false });
  const [forgotData, setForgotData] = useState({ email: '' });

  // Error States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Email helper validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!signInData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(signInData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!signInData.password) {
      newErrors.password = 'Password is required';
    } else if (signInData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const mockName = signInData.email.split('@')[0];
      const formattedName = mockName.charAt(0).toUpperCase() + mockName.slice(1);
      
      onLoginSuccess({
        name: formattedName || 'Eleanor Vance',
        email: signInData.email
      });
    }, 1800);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!signUpData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!signUpData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(signUpData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!signUpData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    if (!signUpData.password) {
      newErrors.password = 'Password is required';
    } else if (signUpData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (!signUpData.agreeToTerms) {
      newErrors.agree = 'You must agree to the membership terms';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: signUpData.name,
        email: signUpData.email
      });
    }, 1800);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!forgotData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(forgotData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setForgotSuccess(true);
    }, 1200);
  };

  // Motion Variants for Staggered Orchestration
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 12 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring' as const, 
        stiffness: 120, 
        damping: 18 
      } 
    }
  };

  return (
    <div className="min-h-[90dvh] bg-white flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-poppins selection:bg-primary/20">
      
      {/* Background decoration blur blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[20%] w-72 h-72 rounded-full filter blur-3xl opacity-40 bg-primary/20"
        />
        <motion.div
          animate={{ x: [0, -25, 40, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[20%] right-[25%] w-96 h-96 rounded-full filter blur-3xl opacity-40 bg-accent/20"
        />
      </div>

      <div className="w-full max-w-6xl bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-premium border border-primary/10 overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Column: Asymmetric Brand Showcase (Desktop only, LAYOUT_VARIANCE = 8) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-pink p-12 flex-col justify-between relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-xl -translate-y-12 translate-x-12" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-dark/20 rounded-full filter blur-2xl translate-y-20 -translate-x-20" />

          {/* Sparkle Header */}
          <div className="relative z-10 flex items-center gap-2">
            <Sparkle size={24} weight="fill" className="text-white animate-pulse-slow" />
            <span className="text-white font-bold tracking-[0.2em] text-[10px] uppercase font-poppins">City Nuts Boutique</span>
          </div>

          {/* Decorative Rotating Mandala Graphic */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
              className="w-80 h-80 text-white/5"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            >
              <circle cx="50" cy="50" r="45" strokeDasharray="2 3" />
              <circle cx="50" cy="50" r="35" strokeDasharray="4 2" />
              <circle cx="50" cy="50" r="25" />
              <path d="M 50 0 L 50 100 M 0 50 L 100 50 M 15 15 L 85 85 M 15 85 L 85 15" />
            </motion.svg>
          </div>

          {/* Display copy */}
          <div className="relative z-10 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tighter"
            >
              Curators <br />
              of Organic <br />
              Luxury
            </motion.h2>
            
            <div className="h-[1px] w-12 bg-white/40" />

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/80 text-xs leading-relaxed max-w-[34ch] font-light"
            >
              Enter the gateway to pristine harvests, bespoke packaging, and gourmet organic selections tailored for true connoisseurs.
            </motion.p>
          </div>

          {/* Perks list */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-3"
          >
            <p className="text-[10px] font-bold text-white uppercase tracking-wider">Connoisseur Club Perks</p>
            <ul className="text-xs text-white/90 space-y-2 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle size={14} weight="fill" className="text-white/70" /> Priority allocations on prime harvests
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={14} weight="fill" className="text-white/70" /> Bespoke gift tailors & packaging customisation
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Right Column: Liquid Frosted Glass Form wrapped inside SpotlightCard */}
        <SpotlightCard className="col-span-1 lg:col-span-7 bg-white/50 backdrop-blur-lg flex flex-col justify-center p-8 sm:p-12 lg:p-16 relative">
          
          {/* Shimmer Loader */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0 right-0 h-1 bg-primary/10 overflow-hidden"
              >
                <motion.div 
                  className="h-full bg-gradient-pink w-1/3 rounded-full"
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* 1. SIGN IN FORM */}
            {mode === 'signin' && (
              <motion.div
                key="signin"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="space-y-6"
              >
                <motion.div variants={staggerItem} className="space-y-1.5">
                  <h1 className="text-3xl font-black tracking-tight text-dark">Welcome back</h1>
                  <p className="text-xs text-dark/50 font-light">
                    Access your boutique portfolio and orders.
                  </p>
                </motion.div>

                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  {/* Email */}
                  <motion.div variants={staggerItem} className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        disabled={isLoading}
                        placeholder="e.g. eleanor.vance@boutique.com"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        className={`w-full border ${errors.email ? 'border-primary bg-primary/5' : 'border-dark/5 bg-white/40 focus:border-primary focus:ring-primary/10'} rounded-xl pl-11 pr-5 py-3.5 text-xs text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 transition-all duration-200`}
                      />
                      <Envelope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" />
                    </div>
                    {errors.email && (
                      <span className="text-[11px] text-primary font-medium flex items-center gap-1 mt-0.5">
                        <Warning size={14} weight="bold" /> {errors.email}
                      </span>
                    )}
                  </motion.div>

                  {/* Password */}
                  <motion.div variants={staggerItem} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase">Password</label>
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] font-bold text-primary hover:text-primary-dark transition-colors duration-200 cursor-pointer"
                      >
                        Forgot credentials?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        disabled={isLoading}
                        placeholder="••••••••"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        className={`w-full border ${errors.password ? 'border-primary bg-primary/5' : 'border-dark/5 bg-white/40 focus:border-primary focus:ring-primary/10'} rounded-xl pl-11 pr-11 py-3.5 text-xs text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 transition-all duration-200`}
                      />
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/30 hover:text-dark transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-[11px] text-primary font-medium flex items-center gap-1 mt-0.5">
                        <Warning size={14} weight="bold" /> {errors.password}
                      </span>
                    )}
                  </motion.div>

                  {/* Remember Me */}
                  <motion.div variants={staggerItem} className="flex items-center gap-2 py-0.5 select-none">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      disabled={isLoading}
                      checked={signInData.rememberMe}
                      onChange={(e) => setSignInData({ ...signInData, rememberMe: e.target.checked })}
                      className="w-4 h-4 accent-primary border-dark/10 rounded focus:ring-primary/10 focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="rememberMe" className="text-xs font-medium text-dark/50 cursor-pointer hover:text-dark transition-colors">
                      Keep me signed in on this client
                    </label>
                  </motion.div>

                  {/* Submit Action wrapped in MagneticButton */}
                  <motion.div variants={staggerItem} className="pt-2">
                    <MagneticButton
                      disabled={isLoading}
                      type="submit"
                      className="w-full bg-gradient-pink text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-primary/15 cursor-pointer text-xs uppercase tracking-wider"
                    >
                      {isLoading ? 'Connecting...' : 'Sign in to Account'}
                      <ArrowRight size={14} weight="bold" />
                    </MagneticButton>
                  </motion.div>
                </form>

                {/* Social logins */}
                <motion.div variants={staggerItem} className="space-y-4">
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-dark/5"></div>
                    <span className="flex-shrink mx-4 text-dark/30 text-[9px] font-bold tracking-widest uppercase">Or connect via</span>
                    <div className="flex-grow border-t border-dark/5"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <MagneticButton
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 py-3 border border-dark/5 hover:border-dark/15 rounded-xl bg-white/30 text-xs font-bold text-dark transition-all duration-200 cursor-pointer"
                    >
                      <GoogleLogo size={16} weight="bold" className="text-dark/70" />
                      <span>Google</span>
                    </MagneticButton>
                    <MagneticButton
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 py-3 border border-dark/5 hover:border-dark/15 rounded-xl bg-white/30 text-xs font-bold text-dark transition-all duration-200 cursor-pointer"
                    >
                      <AppleLogo size={16} weight="fill" className="text-dark/90" />
                      <span>Apple ID</span>
                    </MagneticButton>
                  </div>
                </motion.div>

                {/* Toggle sign up */}
                <motion.div variants={staggerItem} className="pt-2 text-center">
                  <p className="text-xs text-dark/50">
                    New to City Nuts?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setErrors({});
                      }}
                      className="font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer"
                    >
                      Create boutique account
                    </button>
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* 2. SIGN UP FORM */}
            {mode === 'signup' && (
              <motion.div
                key="signup"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="space-y-5"
              >
                <motion.div variants={staggerItem} className="space-y-1">
                  <h1 className="text-3xl font-black tracking-tight text-dark">Create Profile</h1>
                  <p className="text-xs text-dark/50 font-light">
                    Join the boutique connoisseur club.
                  </p>
                </motion.div>

                <form onSubmit={handleSignUpSubmit} className="space-y-3">
                  {/* Name */}
                  <motion.div variants={staggerItem} className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-dark/70 tracking-wide uppercase">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled={isLoading}
                        placeholder="e.g. Eleanor Vance"
                        value={signUpData.name}
                        onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                        className={`w-full border ${errors.name ? 'border-primary bg-primary/5' : 'border-dark/5 bg-white/40 focus:border-primary'} rounded-xl pl-11 pr-5 py-3 text-xs text-dark placeholder:text-dark/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200`}
                      />
                      <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" />
                    </div>
                    {errors.name && (
                      <span className="text-[11px] text-primary font-medium flex items-center gap-1">
                        <Warning size={12} weight="bold" /> {errors.name}
                      </span>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={staggerItem} className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-dark/70 tracking-wide uppercase">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        disabled={isLoading}
                        placeholder="e.g. eleanor.vance@boutique.com"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        className={`w-full border ${errors.email ? 'border-primary bg-primary/5' : 'border-dark/5 bg-white/40 focus:border-primary'} rounded-xl pl-11 pr-5 py-3 text-xs text-dark placeholder:text-dark/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200`}
                      />
                      <Envelope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" />
                    </div>
                    {errors.email && (
                      <span className="text-[11px] text-primary font-medium flex items-center gap-1">
                        <Warning size={12} weight="bold" /> {errors.email}
                      </span>
                    )}
                  </motion.div>

                  {/* Phone */}
                  <motion.div variants={staggerItem} className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-dark/70 tracking-wide uppercase">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        disabled={isLoading}
                        placeholder="e.g. +971 52 303 2577"
                        value={signUpData.phone}
                        onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                        className={`w-full border ${errors.phone ? 'border-primary bg-primary/5' : 'border-dark/5 bg-white/40 focus:border-primary'} rounded-xl pl-11 pr-5 py-3 text-xs text-dark placeholder:text-dark/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200`}
                      />
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" />
                    </div>
                    {errors.phone && (
                      <span className="text-[11px] text-primary font-medium flex items-center gap-1">
                        <Warning size={12} weight="bold" /> {errors.phone}
                      </span>
                    )}
                  </motion.div>

                  {/* Password */}
                  <motion.div variants={staggerItem} className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-dark/70 tracking-wide uppercase">Create Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        disabled={isLoading}
                        placeholder="•••••••• (Min. 6 chars)"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className={`w-full border ${errors.password ? 'border-primary bg-primary/5' : 'border-dark/5 bg-white/40 focus:border-primary'} rounded-xl pl-11 pr-11 py-3 text-xs text-dark placeholder:text-dark/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200`}
                      />
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/30 hover:text-dark transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-[11px] text-primary font-medium flex items-center gap-1">
                        <Warning size={12} weight="bold" /> {errors.password}
                      </span>
                    )}
                  </motion.div>

                  {/* Terms */}
                  <motion.div variants={staggerItem} className="flex items-start gap-2 py-1 select-none">
                    <input
                      type="checkbox"
                      id="agree"
                      disabled={isLoading}
                      checked={signUpData.agreeToTerms}
                      onChange={(e) => setSignUpData({ ...signUpData, agreeToTerms: e.target.checked })}
                      className="w-4 h-4 mt-0.5 accent-primary border-dark/10 rounded focus:ring-primary/10 cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <label htmlFor="agree" className="text-[11px] font-medium text-dark/50 cursor-pointer hover:text-dark transition-colors leading-normal">
                        I agree to the connoisseur terms and wish list allocations.
                      </label>
                      {errors.agree && (
                        <span className="text-[11px] text-primary font-medium flex items-center gap-1 mt-0.5">
                          <Warning size={12} weight="bold" /> {errors.agree}
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={staggerItem} className="pt-1">
                    <MagneticButton
                      disabled={isLoading}
                      type="submit"
                      className="w-full bg-gradient-pink text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-primary/15 cursor-pointer text-xs uppercase tracking-wider"
                    >
                      {isLoading ? 'Creating...' : 'Register Profile'}
                      <ArrowRight size={14} weight="bold" />
                    </MagneticButton>
                  </motion.div>
                </form>

                {/* Back to sign in */}
                <motion.div variants={staggerItem} className="text-center">
                  <p className="text-xs text-dark/50">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signin');
                        setErrors({});
                      }}
                      className="font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer"
                    >
                      Sign In to account
                    </button>
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* 3. FORGOT PASSWORD FORM */}
            {mode === 'forgot' && (
              <motion.div
                key="forgot"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="space-y-6"
              >
                <motion.div variants={staggerItem} className="space-y-1.5">
                  <h1 className="text-3xl font-black tracking-tight text-dark">Recover Pass</h1>
                  <p className="text-xs text-dark/50 font-light">
                    Enter email to dispatch recovery tokens.
                  </p>
                </motion.div>

                {forgotSuccess ? (
                  <motion.div
                    variants={staggerItem}
                    className="bg-primary/5 border border-primary/10 rounded-2xl p-6 space-y-4 text-center"
                  >
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle size={20} weight="fill" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-dark text-sm">Dispatched Recovery</h3>
                      <p className="text-xs text-dark/50 leading-relaxed max-w-[28ch] mx-auto">
                        A verification link was sent to <strong>{forgotData.email}</strong>.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signin');
                        setForgotSuccess(false);
                        setForgotData({ email: '' });
                      }}
                      className="px-5 py-2 bg-gradient-pink text-white rounded-full text-xs font-bold shadow-sm cursor-pointer"
                    >
                      Return to Sign In
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-5">
                    {/* Email */}
                    <motion.div variants={staggerItem} className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-dark/70 tracking-wide uppercase">Recovery Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          disabled={isLoading}
                          placeholder="e.g. eleanor.vance@boutique.com"
                          value={forgotData.email}
                          onChange={(e) => setForgotData({ email: e.target.value })}
                          className={`w-full border ${errors.email ? 'border-primary bg-primary/5' : 'border-dark/5 bg-white/40 focus:border-primary'} rounded-xl pl-11 pr-5 py-3.5 text-xs text-dark placeholder:text-dark/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200`}
                        />
                        <Envelope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" />
                      </div>
                      {errors.email && (
                        <span className="text-[11px] text-primary font-medium flex items-center gap-1 mt-0.5">
                          <Warning size={14} weight="bold" /> {errors.email}
                        </span>
                      )}
                    </motion.div>

                    {/* Submit */}
                    <motion.div variants={staggerItem}>
                      <MagneticButton
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-gradient-pink text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-primary/15 cursor-pointer text-xs uppercase tracking-wider"
                      >
                        {isLoading ? 'Searching...' : 'Send Recovery Token'}
                        <ArrowRight size={14} weight="bold" />
                      </MagneticButton>
                    </motion.div>

                    <motion.div variants={staggerItem} className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setMode('signin');
                          setErrors({});
                        }}
                        className="text-xs font-bold text-dark/40 hover:text-primary transition-colors cursor-pointer"
                      >
                        ← Back to Sign In
                      </button>
                    </motion.div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </SpotlightCard>
      </div>
    </div>
  );
};
