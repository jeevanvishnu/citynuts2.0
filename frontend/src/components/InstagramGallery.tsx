import React from 'react';
import { motion } from 'framer-motion';
import { InstagramLogo, Heart, ChatCircle } from '@phosphor-icons/react';

const galleryImages = [
  '/gallery/gallery01.webp',
  '/gallery/gallery02.webp',
  '/gallery/gallery04.webp',
  '/gallery/gallery05.webp',
  '/gallery/gallery06.webp',
  '/gallery/gallery08.webp',
  '/gallery/gallery09.webp',
  '/gallery/gallery10.webp',
];

export const InstagramGallery: React.FC = () => {
  return (
    <section className="bg-white py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Simple Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center text-white shadow-md">
              <InstagramLogo size={32} weight="fill" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-dark mb-3">
            @citynutsonline
          </h2>
          <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
            Follow us on Instagram for the freshest nuts, premium chocolates, and daily updates.
          </p>
          <a
            href="https://www.instagram.com/citynutsonline/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-pink text-white rounded-full font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-300"
          >
            Follow on Instagram
          </a>
        </div>

        {/* Simple Clean Instagram Grid (4 Columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((src, index) => (
            <motion.a
              key={index}
              href="https://www.instagram.com/citynutsonline/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="relative aspect-square overflow-hidden group bg-gray-100 rounded-lg cursor-pointer block"
            >
              {/* Image */}
              <img
                src={src}
                alt={`Instagram photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Instagram Hover Overlay (Dark fade with likes/comments) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <Heart size={20} weight="fill" />
                  <span>{Math.floor(Math.random() * 200) + 50}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <ChatCircle size={20} weight="fill" />
                  <span>{Math.floor(Math.random() * 20) + 2}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
