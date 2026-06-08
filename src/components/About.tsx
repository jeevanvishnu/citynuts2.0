import React from 'react';
import { Leaf, ShieldCheck, Truck, Sparkle } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const usps = [
    {
      icon: <Leaf size={24} weight="fill" className="text-primary" />,
      title: '100% Natural',
      desc: 'Sourced directly from organic farms with zero artificial additives, preservatives, or colors.',
    },
    {
      icon: <ShieldCheck size={24} weight="fill" className="text-primary" />,
      title: 'Premium Quality',
      desc: 'Rigorous 5-step sorting process ensures only the largest, blemish-free nuts reach your pack.',
    },
    {
      icon: <Truck size={24} weight="fill" className="text-primary" />,
      title: 'Fast Delivery',
      desc: 'Vacuum-sealed packaging shipped in climate-controlled transport to preserve absolute freshness.',
    },
  ];

  return (
    <section id="about" className="relative bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story & USPs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-left"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-wider uppercase">
                <Sparkle size={12} weight="fill" /> About Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-dark leading-tight">
                We Always Provide <span className="text-primary">Quality Nuts</span> For You
              </h2>
            </div>

            <p className="text-base sm:text-lg text-dark/70 leading-relaxed font-light">
              Nuts and seeds are good sources of protein, healthy fats, fibres, vitamins and minerals. Nuts and seeds regulate body weight as their fats are not fully absorbed and they regulate food intake. Nuts and seeds are good sources of protein, healthy fats, fibres, vitamins and minerals. Nuts and seeds regulate body weight as their fats are not fully absorbed and they regulate food intake.
            </p>

            {/* USP Points */}
            <div className="space-y-6">
              {usps.map((usp, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={usp.title}
                  className="flex gap-4 items-start group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {usp.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark text-base sm:text-lg group-hover:text-primary transition-colors duration-200">
                      {usp.title}
                    </h3>
                    <p className="text-sm text-dark/60 mt-1 max-w-[450px]">
                      {usp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-gradient-pink text-white rounded-full font-semibold shadow-premium hover:shadow-premium-hover transition-all duration-300"
              >
                Read Our Full Story
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Styled image with decorative border/frame accent */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center items-center"
          >
            {/* Background Glows */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-accent/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* The Image Container with Frame Offset */}
            <div className="relative w-full max-w-[440px] sm:max-w-[500px]">
              {/* Outer Decorative Pink Wireframe Border */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/30 rounded-3xl pointer-events-none" />
              
              {/* Secondary Accent Offset Border (solid blush background color) */}
              <div className="absolute top-4 left-4 w-full h-full bg-primary/10 rounded-3xl -z-10 pointer-events-none" />

              {/* Main Image */}
              <img
                src="/home/about.webp"
                alt="Quality nuts and seeds"
                className="relative w-full h-auto block rounded-3xl shadow-premium z-10 border border-primary/10 bg-white"
              />
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
};
