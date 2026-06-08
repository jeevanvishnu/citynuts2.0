import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Gift, ShieldCheck, Truck } from '@phosphor-icons/react';

const features = [
  {
    icon: <Leaf weight="duotone" className="text-primary w-8 h-8" />,
    title: 'Natural Goodness',
    description: 'Nuts and seeds are good sources of protein, healthy fats, and fibres.',
  },
  {
    icon: <ShieldCheck weight="duotone" className="text-primary w-8 h-8" />,
    title: 'Premium Quality',
    description: 'Indulge in the finest selection of premium dates, dry fruits, and nuts.',
  },
  {
    icon: <Gift weight="duotone" className="text-primary w-8 h-8" />,
    title: 'Perfect for Gifting',
    description: 'Our high-quality products make the perfect gift for any special occasion.',
  },
  {
    icon: <Truck weight="duotone" className="text-primary w-8 h-8" />,
    title: 'Fast Delivery',
    description: 'Freshness delivered right to your doorstep, quickly and safely.',
  },
];

export const HomeFeatures: React.FC = () => {
  return (
    <section className="bg-white py-16 relative z-20 border-b border-primary/10 -mt-8 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Marquee Banner */}
        <div className="mb-16 overflow-hidden flex bg-blush/30 py-3 rounded-full border border-primary/10 relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 rounded-l-full"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 rounded-r-full"></div>
            <motion.div 
              animate={{ x: [0, -1035] }} 
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex whitespace-nowrap gap-12 text-dark/70 font-medium tracking-wide text-sm items-center"
            >
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-12">
                   <span>✨ Nuts and seeds are good sources of protein, healthy fats, fibres, vitamins and minerals.</span>
                   <span>✨ Regulate body weight with healthy, natural fats.</span>
                   <span>✨ Shop now for a healthy, delicious treat!</span>
                </div>
              ))}
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group cursor-default"
            >
              <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-dark/60 text-sm leading-relaxed font-light px-2">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
