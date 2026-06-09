import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const bannerImages = [
  '/banner/banner01.png',
  '/banner/banner02.png',
  '/banner/banner03.png',
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % bannerImages.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
  };

  const slideVariants: any = {
    enter: (direction: number) => ({
      x: direction > 0 ? '10%' : '-10%',
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '10%' : '-10%',
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <section id="home" className="w-full bg-white relative group mt-[76px] lg:mt-[88px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Container sizing dynamically based on image aspect ratio to prevent cropping */}
        <div className="relative w-full bg-gray-50 flex items-center justify-center overflow-hidden shadow-sm rounded-2xl md:rounded-3xl">

        {/* Invisible spacer image to set the container's height to match the banner's natural aspect ratio */}
        <img
          src={bannerImages[0]}
          alt="spacer"
          className="w-full h-auto invisible"
          aria-hidden="true"
        />

        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={current}
            src={bannerImages[current]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            alt={`City Nuts Banner ${current + 1}`}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-6 z-20 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/70 hover:bg-white text-primary shadow-lg backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          aria-label="Previous Slide"
        >
          <CaretLeft size={24} weight="bold" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-6 z-20 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/70 hover:bg-white text-primary shadow-lg backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          aria-label="Next Slide"
        >
          <CaretRight size={24} weight="bold" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-0 w-full flex justify-center gap-2 z-20">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > current ? 1 : -1);
                setCurrent(idx);
              }}
              className="focus:outline-none py-2"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-primary shadow-md' : 'w-2 sm:w-2.5 bg-white/80 hover:bg-white shadow-sm'
                  }`}
              />
            </button>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};
