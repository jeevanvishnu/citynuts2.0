import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Sparkle, GlobeHemisphereWest, Heartbeat, TreeEvergreen, HandHeart, ShieldCheck, Truck, Package } from '@phosphor-icons/react';

export const AboutPage: React.FC = () => {
  // Parallax setup for the hero image
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.2], ['0%', '10%']);

  const springTransition = { type: 'spring' as const, stiffness: 100, damping: 20 };

  return (
    <div className="pt-24 pb-20 bg-white min-h-[100dvh] overflow-hidden">
      
      {/* 1. Hero / Welcome / Who We Are (Asymmetric Split) */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Soft floating background blobs for premium aesthetic */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-blush rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={springTransition}
            className="lg:col-span-5 space-y-8 z-10"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-wider uppercase border border-primary/20">
                <Sparkle size={12} weight="fill" /> Welcome to City Nuts
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-dark">
                Premium Natural Snacks for Your <span className="text-primary italic font-light pr-2">Healthy</span> Lifestyle.
              </h1>
            </div>
            
            <div className="space-y-6 text-base text-dark/70 leading-relaxed max-w-[65ch]">
              <p>
                We offer delicious dry fruits, nuts, dates, and seeds, carefully sourced for quality and flavor. It delivers exceptional flavor and essential nutrients to support your well-being. Experience the difference of our commitment to natural goodness.
              </p>
              <div>
                <h3 className="font-bold text-dark text-lg mb-2">Who We Are</h3>
                <p>
                  At City Nuts, we’re not just a bunch of folks selling nuts and dried fruit. We’re a tribe of passionate individuals who believe that real food is the foundation of a vibrant life. We’re adventurers who scour the globe, seeking out the most delicious and nourishing ingredients nature has to offer. We’re storytellers, sharing the tales of the farmers and artisans who cultivate these treasures with love and care. And we’re dreamers, envisioning a world where healthy choices are both delicious and accessible to all.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="lg:col-span-7 relative h-[500px] lg:h-[700px] rounded-[2.5rem] overflow-hidden shadow-premium border border-primary/10"
          >
            <motion.img 
              style={{ y: heroImageY, scale: 1.1 }}
              src="/home/about.webp" 
              alt="Assortment of premium nuts" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Liquid Glass Refraction Overlay */}
            <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-inset ring-white/20 pointer-events-none rounded-[2.5rem]" />
          </motion.div>

        </div>
      </section>

      {/* 2. Our Journey */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springTransition}
          className="bg-gradient-pink-soft rounded-[2.5rem] p-8 md:p-16 shadow-premium border border-primary/20 relative overflow-hidden"
        >
          {/* Decorative background blob */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-dark mb-6">Our Journey</h2>
              <div className="space-y-4 text-base text-dark/70 leading-relaxed">
                <p>
                  It all started with a simple, yet powerful, belief: that healthy eating shouldn’t feel like a chore. It should be a celebration of nature’s bounty, a source of joy and energy.
                </p>
                <p>
                  From a humble local shop, we embarked on a journey to share this passion with the world. Today, we’re a trusted online haven for those who seek the best natural snacks, connecting with customers across the country. But through it all, our core values remain steadfast: quality, integrity, and the unwavering commitment to exceeding your expectations.
                </p>
              </div>
            </div>
            
            <div className="relative flex justify-center">
               <div className="w-full max-w-[400px] aspect-square rounded-[2rem] bg-white border border-primary/20 flex items-center justify-center p-2 relative shadow-premium-hover hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] rounded-[2rem] z-0" />
                  <img src="/our_journey.png" alt="Our Journey" className="w-full h-full object-cover rounded-[1.6rem] relative z-10" />
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. What We Offer (Bento Grid) */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-dark mb-4">What We Offer</h2>
          <p className="text-base text-dark/70 leading-relaxed">
            At City Nuts, we believe in the power of nature’s bounty to nourish both body and soul. We’ve curated a collection of premium dry fruits, nuts, dates, and seeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Dry Fruits - Spans 2 cols */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="md:col-span-2 bg-blush rounded-[2rem] p-8 shadow-premium border border-primary/20 flex flex-col justify-end relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 text-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/20">
              <TreeEvergreen size={120} weight="duotone" />
            </div>
            <div className="relative z-10 max-w-md">
              <h3 className="text-2xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">Dry Fruits</h3>
              <p className="text-sm text-dark/70 leading-relaxed line-clamp-3">
                Imagine a sun-drenched orchard, bursting with the sweet scent of ripe fruit. We hand-select each piece, ensuring it’s bursting with natural sweetness and essential nutrients.
              </p>
            </div>
          </motion.div>

          {/* Nuts - Tall */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="md:row-span-2 bg-gradient-pink rounded-[2rem] p-8 shadow-premium-hover border border-primary/20 flex flex-col justify-between relative overflow-hidden group text-white"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <Package size={48} weight="duotone" className="mb-4" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Nuts</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                We journey to the finest orchards around the world to source our nuts. From the satisfying crunch of almonds to exotic macadamias, they’re a symphony of textures and flavors.
              </p>
            </div>
          </motion.div>

          {/* Dates */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white rounded-[2rem] p-8 shadow-premium border border-primary/20 relative overflow-hidden group"
          >
            <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">Dates</h3>
            <p className="text-sm text-dark/70 leading-relaxed">
              Handpicked and packed to ensure the freshest varieties. Rich in fiber and vitamins, a taste of the Middle East.
            </p>
          </motion.div>

          {/* Seeds */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-accent/20 text-dark rounded-[2rem] p-8 shadow-premium border border-primary/20 relative overflow-hidden group"
          >
             <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Seeds</h3>
             <p className="text-sm text-dark/70 leading-relaxed">
               Discover the power of seeds. Chia, flax, pumpkin, and sunflower. Tiny nutritional powerhouses for smoothies and salads.
             </p>
          </motion.div>

        </div>
      </section>

      {/* 4. Our Commitments */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-dark mb-12 text-center">Our Commitments</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "100% Natural",
              icon: <Leaf size={32} weight="duotone" />,
              desc1: "We believe in the simple beauty of nature’s flavors. Our products are a symphony of pure, unadulterated goodness.",
              desc2: "We source our ingredients from nature’s bounty, free from artificial flavors, colors, or preservatives."
            },
            {
              title: "Fresh & Flavorful",
              icon: <Heartbeat size={32} weight="duotone" />,
              desc1: "We go to great lengths to ensure that every bite is a burst of freshness. Careful packaging preserves natural goodness.",
              desc2: "Our commitment to freshness means every bite is a celebration of nature's bounty."
            },
            {
              title: "Sustainably Sourced",
              icon: <HandHeart size={32} weight="duotone" />,
              desc1: "We work with suppliers who share our commitment to sustainable farming and ethical harvesting.",
              desc2: "Together, we’re creating a future where healthy choices are good for you and good for the planet."
            }
          ].map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springTransition, delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-premium border border-primary/10 flex flex-col gap-6 group hover:border-primary transition-all duration-300 hover:shadow-premium-hover"
            >
              <div className="w-16 h-16 rounded-full bg-blush text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-pink group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-dark/70 mb-2 leading-relaxed">{item.desc1}</p>
                <p className="text-sm text-dark/70 leading-relaxed opacity-80">{item.desc2}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose City Nuts? */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-12">
        <div className="bg-blush/60 rounded-[3rem] p-8 md:p-16 shadow-premium border border-primary/20 relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dark mb-6">Why Choose <span className="text-primary">City Nuts?</span></h2>
            <p className="text-base md:text-lg text-dark/70 leading-relaxed">
              We believe in making healthy living simple and delicious. We're more than just a snack provider; we're your partner in a healthier, happier you.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Always Fresh & Premium",
                icon: <Sparkle size={28} weight="fill" className="text-white" />,
                desc: "We carefully source from trusted farms to ensure superior taste, freshness, and nutritional value in every pack."
              },
              {
                title: "Naturally Healthy Choices",
                icon: <ShieldCheck size={28} weight="fill" className="text-white" />,
                desc: "Rich in essential nutrients, free from unnecessary additives, and perfect for a healthy lifestyle."
              },
              {
                title: "Fast & Reliable Delivery",
                icon: <Truck size={28} weight="fill" className="text-white" />,
                desc: "Enjoy quick, reliable delivery across the UAE, bringing fresh and healthy snacks straight to your doorstep."
              }
            ].map((reason) => (
              <motion.div 
                key={reason.title}
                whileHover={{ y: -5 }}
                className="bg-white border border-primary/20 rounded-[2rem] p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-pink flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-bold text-dark mb-3 group-hover:text-primary transition-colors">{reason.title}</h3>
                <p className="text-sm text-dark/70 leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
