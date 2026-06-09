import React from 'react';
import { motion } from 'framer-motion';
import { Gift, ArrowRight, ShieldCheck, Sparkle } from '@phosphor-icons/react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetric 50/50 Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-charcoal to-[#181818] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 relative min-h-[420px]">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Premium Text Content (Asymmetric Left-Aligned) */}
          <div className="p-10 sm:p-14 flex flex-col justify-center relative z-10 space-y-6 lg:max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-accent uppercase tracking-wider w-fit">
              <Sparkle size={14} weight="fill" className="text-primary animate-pulse" />
              Bespoke Gifting Collection
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tighter leading-tight">
              Share the Warmth of Premium Health
            </h3>

            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
              Curated dry fruit and dark chocolate gift hampers handpicked for your loved ones. Sealed in wooden boxes wrapped in elegance.
            </p>

            {/* Micro details list with Phosphor Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck size={16} weight="duotone" />
                </div>
                <span className="text-xs font-medium tracking-wide">100% Organic Certified</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <Gift size={16} weight="duotone" />
                </div>
                <span className="text-xs font-medium tracking-wide">Elegant Wooden Box Packaging</span>
              </div>
            </div>

            {/* Action CTA with spring & active physics */}
            <div className="pt-4">
              <motion.a
                href="#products?category=Gifts"
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2.5 px-6.5 py-3.5 bg-gradient-pink text-white rounded-full text-sm font-bold shadow-premium hover:shadow-premium-hover transition-all duration-300"
              >
                Explore Gift Hampers
                <ArrowRight size={16} weight="bold" />
              </motion.a>
            </div>
          </div>

          {/* Right Column: Layered Liquid Glass Cards over image */}
          <div className="relative min-h-[300px] lg:min-h-full bg-black/20 overflow-hidden flex items-center justify-center p-8">
            {/* Background Image with elegant fade */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://picsum.photos/seed/giftboxbanner/1200/800" 
                alt="Premium curation gift box" 
                className="w-full h-full object-cover opacity-65 mix-blend-luminosity filter saturate-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-charcoal via-transparent to-transparent z-10" />
            </div>

            {/* Overlapping "Liquid Glass" Refraction Cards */}
            <div className="relative z-20 w-full max-w-sm space-y-4">
              
              {/* Card 1: Liquid Glass overlay */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] shadow-2xl relative"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-pink flex items-center justify-center text-white shrink-0">
                    <Gift size={20} weight="bold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Festival Premium Box</h4>
                    <p className="text-[11px] text-white/70 mt-1 font-light">Cashews, Mamra Almonds, Medjool Dates & Walnut Halves.</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-extrabold text-primary">₹2,450</span>
                      <span className="text-[10px] text-white/50 line-through">₹3,200</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Offsetting glass card */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.4 }}
                className="p-5 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] shadow-xl relative -mt-4 ml-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Free Shipping</span>
                  </div>
                  <span className="text-[10px] font-semibold text-accent bg-white/5 px-2 py-0.5 rounded border border-white/10">ON ALL GIFT BOXES</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
