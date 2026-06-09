import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

const categories = [
  {
    title: 'Dates',
    image: '/home/category02.webp',
    link: '#products?category=Nuts',
  },
  {
    title: 'Nuts',
    image: '/home/category01.webp',
    link: '#products?category=Dates',
  },
  {
    title: 'Dry fruits',
    image: '/home/category03.webp',
    link: '#products?category=Nuts',
  },
  {
    title: 'Chocolate',
    image: '/home/category04.webp',
    link: '#products?category=Nuts',
  },
];

export const HomeFeatures: React.FC = () => {
  return (
    <section className="bg-white pt-16 pb-20 relative z-20 border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-charcoal tracking-tight"
          >
            Shop by Category
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-base mt-4 max-w-2xl mx-auto"
          >
            Discover our premium selection of dry fruits and nuts. Each piece is carefully selected for the highest quality and taste.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category, idx) => (
            <motion.a
              href={category.link}
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col items-center p-8 rounded-[2rem] bg-[#FDFCFB] border border-gray-100 shadow-sm hover:shadow-premium hover:border-primary/20 transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              {/* Subtle accent glow behind the image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>

              <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-3 transition-transform duration-500 ease-out"
                />
              </div>
              
              <div className="text-center z-10 w-full">
                <h3 className="text-xl font-bold text-charcoal group-hover:text-primary transition-colors duration-300">
                  {category.title}
                </h3>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-primary transition-colors duration-300">
                  <span>Explore Collection</span>
                  <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
