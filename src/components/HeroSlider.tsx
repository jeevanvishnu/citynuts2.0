import React, { useState, useEffect, useCallback } from 'react';
import { CaretLeft, CaretRight, Sparkle } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  badge: string;
  headline: string;
  subtext: string;
  buttonText: string;
  image: string;
  targetId: string;
}

const slides: Slide[] = [
  {
    badge: '100% Organic & Handpicked',
    headline: 'Crunchy Premium California Almonds',
    subtext: 'Nourish your body with gourmet California almonds. Loaded with nutrients, vitamin E, and healthy fats, selected for maximum crunch.',
    buttonText: 'Shop Almonds Now',
    image: '/images/hero_almonds.png',
    targetId: '#products',
  },
  {
    badge: 'Premium Selection',
    headline: 'Creamy Buttery Royal Cashews',
    subtext: 'Indulge in extra-large, creamy organic cashews. Harvested sustainably and packed with minerals, ideal for premium daily snacking.',
    buttonText: 'Explore Cashews',
    image: '/images/hero_cashews.png',
    targetId: '#products',
  },
  {
    badge: 'Lightly Roasted & Salted',
    headline: 'Gourmet Handpicked Salted Pistachios',
    subtext: 'Crack open the freshness! Perfectly dry-roasted green pistachios with a touch of sea salt, containing rich fiber and antioxidants.',
    buttonText: 'Shop Pistachios',
    image: '/images/hero_pistachios.png',
    targetId: '#products',
  },
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Framer Motion slide transitions
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 200, damping: 26 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 200, damping: 26 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section id="home" className="relative w-full min-h-[90dvh] pt-[80px] bg-gradient-pink-soft overflow-hidden flex items-center">
      {/* Dynamic Background Blob Accents */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float pointer-events-none" />

      {/* Main Slide Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
        <div className="relative h-[650px] md:h-[500px] flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full absolute"
            >
              {/* Left Column: Copy Content */}
              <div className="space-y-6 text-left max-w-xl">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-wider uppercase border border-primary/20"
                >
                  <Sparkle size={14} weight="fill" />
                  {slides[current].badge}
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-dark leading-[1.1]"
                >
                  {slides[current].headline.split(' ').map((word, idx) => {
                    const isHighlight = idx >= slides[current].headline.split(' ').length - 2;
                    return (
                      <span key={idx} className={isHighlight ? 'text-primary block sm:inline' : ''}>
                        {word}{' '}
                      </span>
                    );
                  })}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg text-dark/70 leading-relaxed font-light"
                >
                  {slides[current].subtext}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-2"
                >
                  <motion.a
                    href={slides[current].targetId}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-pink text-white rounded-full font-semibold shadow-premium hover:shadow-premium-hover transition-all duration-300 gap-2 border border-transparent hover:border-primary/20"
                  >
                    {slides[current].buttonText}
                  </motion.a>
                </motion.div>
              </div>

              {/* Right Column: High Quality Product Image */}
              <div className="flex justify-center md:justify-end items-center relative">
                {/* Visual decorative ring background */}
                <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-dashed border-primary/20 animate-spin-slow pointer-events-none" />
                <div className="absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] rounded-full bg-gradient-to-tr from-primary/5 to-accent/10 pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 80,
                    damping: 15,
                    delay: 0.3,
                  }}
                  className="relative z-10 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] flex items-center justify-center animate-float"
                >
                  <img
                    src={slides[current].image}
                    alt={slides[current].headline}
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(255,107,157,0.25)] select-none"
                    draggable="false"
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Custom Pink Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary shadow-md hover:bg-primary hover:text-white transition-all duration-300 active:scale-90"
        aria-label="Previous Slide"
      >
        <CaretLeft size={22} weight="bold" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary shadow-md hover:bg-primary hover:text-white transition-all duration-300 active:scale-90"
        aria-label="Next Slide"
      >
        <CaretRight size={22} weight="bold" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
            className="group focus:outline-none"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div className="relative h-3 rounded-full transition-all duration-300">
              {idx === current ? (
                <motion.div
                  layoutId="activeDot"
                  className="w-8 h-3 bg-gradient-pink rounded-full"
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />
              ) : (
                <div className="w-3 h-3 bg-primary/30 group-hover:bg-primary/60 rounded-full transition-colors duration-300" />
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
