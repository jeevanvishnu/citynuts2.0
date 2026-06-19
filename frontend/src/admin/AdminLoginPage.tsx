import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKey, User, SignIn } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginAdmin } from '../redux/slices/adminAuthSlice';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { loading: isLoading, error } = useAppSelector((state) => state.adminAuth);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // dispatch loginAdmin thunk and wait for it to finish
      const result = await dispatch(loginAdmin({ email, password })).unwrap();
      toast.success(result.message || "Admin logged in successfully!");
      navigate('/admin/dashboard');
    } catch (err: any) {
      toast.error(err || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-blush flex items-center justify-center p-4 font-sans text-dark">
      {/* background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-accent/20 blur-[100px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-md border border-white/50 p-8 rounded-[2rem] shadow-premium">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 mb-4 flex items-center justify-center">
              <img src="/Citynuts-logo.webp" alt="Citynuts Logo" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-dark">Admin Portal</h1>
            <p className="text-dark/60 text-sm mt-2 text-center">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark/80 block">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark/40 group-focus-within:text-primary transition-colors">
                  <User size={20} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-primary/20 text-dark rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                  placeholder="Enter a Email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-dark/80 block">Password</label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark/40 group-focus-within:text-primary transition-colors">
                  <LockKey size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-primary/20 text-dark rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-pink text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-premium transition-all duration-300 flex items-center justify-center gap-2 mt-8 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <SignIn size={20} weight="bold" />
                  Sign In to Dashboard
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
