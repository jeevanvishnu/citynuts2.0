import React from 'react';
import { motion } from 'framer-motion';
import { Gift, ArrowRight, ShieldCheck, Sparkle } from '@phosphor-icons/react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetric 50/50 Split Grid - Light Theme */}
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-gradient-pink-soft rounded-[2.5rem] overflow-hidden shadow-premium border border-primary/10 relative min-h-[420px]">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/20 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Premium Text Content (Asymmetric Left-Aligned) */}
          <div className="p-10 sm:p-14 flex flex-col justify-center relative z-10 space-y-6 lg:max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider w-fit">
              <Sparkle size={14} weight="fill" className="text-primary animate-pulse" />
              Bespoke Gifting Collection
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight leading-tight">
              Share the Warmth of Premium Health
            </h3>

            <p className="text-dark/70 text-sm sm:text-base font-medium leading-relaxed">
              Curated dry fruit and dark chocolate gift hampers handpicked for your loved ones. Sealed in elegant wooden boxes.
            </p>

            {/* Micro details list with Phosphor Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 text-dark/80">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-primary/10 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck size={16} weight="duotone" />
                </div>
                <span className="text-xs font-semibold tracking-wide">100% Organic Certified</span>
              </div>
              <div className="flex items-center gap-3 text-dark/80">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Gift size={16} weight="duotone" />
                </div>
                <span className="text-xs font-semibold tracking-wide">Elegant Wooden Box Packaging</span>
              </div>
            </div>

            {/* Action CTA with spring & active physics */}
            <div className="pt-4">
              <motion.a
                href="#products?category=Gifts"
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2.5 px-6.5 py-3.5 bg-gradient-pink text-white rounded-full text-sm font-bold shadow-premium hover:shadow-premium-hover transition-all duration-300 w-fit"
              >
                Explore Gift Hampers
                <ArrowRight size={16} weight="bold" />
              </motion.a>
            </div>
          </div>

          {/* Right Column: Image only */}
          <div className="relative min-h-[300px] lg:min-h-full bg-blush/30 overflow-hidden flex items-center justify-center">
            {/* Background Image with elegant fade */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/about_dryfruits.png" 
                alt="Premium curated dry fruits" 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#FFF0F5] via-transparent to-transparent z-10" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
