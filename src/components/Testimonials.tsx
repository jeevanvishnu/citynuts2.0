import React from 'react';
import { Star, Quotes, Sparkle } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Clarissa Sterling',
    location: 'Boston, MA',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Clarissa',
    rating: 5,
    text: 'The freshness is absolutely unmatched! I bought the California almonds, and they are incredibly crunchy and sweet. You can tell they were sorted with great care. Even the elegant pink packaging is a gorgeous touch.',
  },
  {
    id: 'test-2',
    name: 'Alastair Vance',
    location: 'Austin, TX',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alastair',
    rating: 5,
    text: "I've tried dry fruits from many luxury brands, but City Nuts' cashews are in a league of their own. So buttery, rich, and perfectly raw. Shipped vacuum-sealed, they tasted fresh off the harvest.",
  },
  {
    id: 'test-3',
    name: 'Genevieve Moreau',
    location: 'Seattle, WA',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Genevieve',
    rating: 5,
    text: 'The Medjool dates are like healthy caramel candies—extremely soft and juicy! And the roasted sea-salt pistachios are perfectly seasoned, not overly salty. This is my new go-to store for snacking.',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="bg-white py-24 relative overflow-hidden z-10">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase shadow-sm"
          >
            <Sparkle size={14} weight="fill" /> Happy Customers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-dark"
          >
            What Our Food Lovers Say
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-1.5 bg-gradient-pink mx-auto rounded-full mt-4"
          />
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="relative group bg-white rounded-3xl p-8 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-primary/5 hover:border-primary/20 hover:shadow-premium transition-all duration-300"
            >
              {/* Giant Background Quote */}
              <div className="absolute top-6 right-6 text-primary/5 group-hover:text-primary/10 transition-colors duration-300 pointer-events-none transform -rotate-6">
                <Quotes size={100} weight="fill" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    weight={i < test.rating ? 'fill' : 'regular'}
                    className="text-primary"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-dark/70 font-light text-base leading-relaxed mb-8 relative z-10 min-h-[120px]">
                "{test.text}"
              </p>

              {/* Customer Profile */}
              <div className="flex items-center gap-4 mt-auto relative z-10 pt-6 border-t border-dark/5">
                <div className="w-14 h-14 rounded-full p-1 bg-gradient-pink shrink-0 overflow-hidden shadow-sm">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-dark group-hover:text-primary transition-colors">
                    {test.name}
                  </h3>
                  <p className="text-sm font-medium text-dark/40 uppercase tracking-wider">
                    {test.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
