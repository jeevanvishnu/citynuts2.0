import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKey, User, SignIn, ShieldCheck } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin-dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[100dvh] bg-[#020617] text-[#F8FAFC] flex items-center justify-center p-4 font-['Fira_Sans',sans-serif]">
      {/* background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-[#22C55E]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-50%] right-[-50%] w-full h-full bg-[#0F172A]/50 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#1E293B] rounded-2xl flex items-center justify-center mb-4 border border-[#22C55E]/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
              <ShieldCheck size={32} className="text-[#22C55E]" weight="duotone" />
            </div>
            <h1 className="text-2xl font-bold font-['Fira_Code',monospace] tracking-tight text-[#F8FAFC]">Admin Portal</h1>
            <p className="text-[#94A3B8] text-sm mt-2 text-center">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#CBD5E1] block">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B] group-focus-within:text-[#22C55E] transition-colors">
                  <User size={20} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all"
                  placeholder="admin@citynutss.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[#CBD5E1] block">Password</label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B] group-focus-within:text-[#22C55E] transition-colors">
                  <LockKey size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#22C55E] hover:bg-[#16a34a] text-[#020617] font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#020617]/30 border-t-[#020617] rounded-full animate-spin"></div>
              ) : (
                <>
                  <SignIn size={20} weight="bold" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center text-xs text-[#64748B] font-['Fira_Code',monospace]">
          <p>Citynutss Admin Framework v1.0</p>
          <p className="mt-1 flex items-center justify-center gap-1">
            <LockKey size={12} /> Secure connection established
          </p>
        </div>
      </motion.div>
    </div>
  );
};
