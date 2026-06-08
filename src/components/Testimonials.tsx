import React from 'react';
import { Star, Quotes, Sparkle } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
    name: 'Shahid Khan Pathan',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Shahid',
    rating: 5,
    text: 'Nice place to buy dry fruits and chocolates. Staff is friendly and supportive. They opened just recently and have good prices.',
  },
  {
    id: 'test-2',
    name: 'Afsal Hussain',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Afsal',
    rating: 5,
    text: 'Best choice for Premium Chocolate and Dry fruits',
  },
  {
    id: 'test-3',
    name: 'Abdul Saleem',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Abdul',
    rating: 5,
    text: 'Best shoping experience in dry fruits and dubai chocolate 👍',
  },
  {
    id: 'test-4',
    name: 'Nihal Halu',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Nihal',
    rating: 5,
    text: 'Fresh, crunchy, and top-quality nuts! Wide variety, neat packaging, and great customer service. Best nut shop in town – highly recommend!',
  },
  {
    id: 'test-5',
    name: 'Sahad C P',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sahad',
    rating: 5,
    text: 'highly recommended.. very nice shop... Absolutely fresh and crunchy! The best quality nuts I’ve had in a long time.',
  },
  {
    id: 'test-6',
    name: 'Muhammed Farzin',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Muhammed',
    rating: 5,
    text: 'One of the best shops in Dubai with a wide variety of nuts, chocolates, and dry fruits. Excellent quality and great collection — highly recommended for everyone.',
  },
  {
    id: 'test-7',
    name: 'Vân Nguyễn',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Van',
    rating: 5,
    text: 'I had a good experience shopping here. The staff is very nice, I forgot my bag when shopping here. When I returned to the hotel it was already midnight. and the distance to my hotel is quite far, about 13 km.',
  },
  {
    id: 'test-8',
    name: 'Muhammad Zamankpk',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Zamankpk',
    rating: 5,
    text: 'Good quality chocolates,nuts dry fruits for all type of customers.highly recommended',
  },
  {
    id: 'test-9',
    name: 'Sahad Palathayi',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=SahadP',
    rating: 5,
    text: 'Every type of dry fruits and chocolates are available good experience with this shop',
  },
  {
    id: 'test-10',
    name: 'Simón Altgelt',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Simon',
    rating: 5,
    text: 'Nihal great service gave to us. Very good place and attention',
  },
  {
    id: 'test-11',
    name: 'Jshi Jshi',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jshi',
    rating: 5,
    text: 'Best quality and lot of verities of nuts and chocolate have and friendly staff',
  },
  {
    id: 'test-12',
    name: 'Ajmal Hussain P P',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ajmal',
    rating: 5,
    text: 'Happy to shop. Lots of different chocolate...World of dry fruits...',
  },
  {
    id: 'test-13',
    name: 'Thammi Razi',
    location: 'Verified Customer',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Thammi',
    rating: 5,
    text: 'Great place for premium nuts and chocolates. Always fresh, always tasty!',
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

        {/* Testimonial Cards Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="!pb-16"
          style={{ '--swiper-pagination-color': '#e83e8c', '--swiper-pagination-bullet-inactive-color': '#999' } as React.CSSProperties}
        >
          {testimonials.map((test) => (
            <SwiperSlide key={test.id} className="h-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="relative group bg-white rounded-3xl p-8 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-primary/5 hover:border-primary/20 hover:shadow-premium transition-all duration-300 h-full flex flex-col"
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
