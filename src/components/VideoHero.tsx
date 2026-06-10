import React from 'react';
import { motion } from 'framer-motion';

export const VideoHero: React.FC = () => {
  return (
    <section id="home" className="relative w-full mt-[76px] lg:mt-[88px] aspect-video lg:aspect-auto lg:h-[calc(100vh-88px)] bg-[#1a0f14] overflow-hidden flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          className="w-full h-full object-cover lg:object-center" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/banner/banner-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlays for Premium Vibe */}
        {/* Very subtle dark overlay */}
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
        {/* Bottom fade for scroll indicator readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11050a]/60 via-transparent to-transparent"></div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-3 sm:pb-10 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="pointer-events-auto scale-[0.65] sm:scale-100 origin-bottom"
        >
          <a 
            href="#products"
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            {/* Minimalist Mouse/Pill Icon */}
            <div className="w-[28px] h-[46px] rounded-full border border-white/30 group-hover:border-[#FFB6C1]/60 flex justify-center p-1.5 bg-black/10 backdrop-blur-sm transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_20px_rgba(255,107,157,0.2)]">
              <motion.div
                animate={{ 
                  y: [0, 16, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.2, 
                  ease: "easeInOut" 
                }}
                className="w-[5px] h-[8px] bg-[#FFB6C1] rounded-full"
              />
            </div>
            
            {/* Elegant Floating Text */}
            <div className="mt-4 overflow-hidden">
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.2 }}
              >
                <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-white/60 group-hover:text-white transition-colors duration-500 block">
                  Explore
                </span>
              </motion.div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

