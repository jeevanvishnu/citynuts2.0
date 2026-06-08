import React, { useState } from 'react';
import { Star, ShoppingCart } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import type { CartItem } from './CartDrawer';

interface ProductData {
  id: string;
  name: string;
  image: string;
  basePrice: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  weightLabel: string;
}

const productsData: ProductData[] = [
  {
    id: 'prod-almonds',
    name: 'Premium Californian Almonds',
    image: '/productimages/imgi_24_almond3.png.webp',
    basePrice: 650,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Bestseller',
    weightLabel: '500g',
  },
  {
    id: 'prod-walnuts',
    name: 'Royal Chilean Walnuts',
    image: '/productimages/imgi_26_1-4.png.webp',
    basePrice: 850,
    rating: 4.8,
    reviewsCount: 96,
    weightLabel: '500g',
  },
  {
    id: 'prod-pistachios',
    name: 'Roasted Sea Salt Pistachios',
    image: '/productimages/imgi_481_web-2.png',
    basePrice: 950,
    rating: 4.9,
    reviewsCount: 188,
    badge: 'Trending',
    weightLabel: '500g',
  },
  {
    id: 'prod-dates',
    name: 'Premium Medjool Dates',
    image: '/productimages/imgi_18_AJWA-DATES-LARGE.png',
    basePrice: 550,
    rating: 4.7,
    reviewsCount: 84,
    weightLabel: '500g',
  },
  {
    id: 'prod-cashews',
    name: 'Jumbo Roasted Cashews',
    image: '/productimages/imgi_480_web-1.png',
    basePrice: 850,
    rating: 4.9,
    reviewsCount: 210,
    badge: 'New',
    weightLabel: '500g',
  },
  {
    id: 'prod-raisins',
    name: 'Golden Afghan Raisins',
    image: '/productimages/imgi_18_AJWA-DATES-LARGE.png',
    basePrice: 400,
    rating: 4.6,
    reviewsCount: 56,
    weightLabel: '500g',
  },
  {
    id: 'prod-figs',
    name: 'Dried Anjeer (Figs)',
    image: '/productimages/imgi_26_1-4.png.webp',
    basePrice: 900,
    rating: 4.8,
    reviewsCount: 112,
    weightLabel: '500g',
  },
  {
    id: 'prod-mixed',
    name: 'Deluxe Mixed Nuts',
    image: '/productimages/imgi_90_premium-nuts-2048x2048.png',
    basePrice: 1200,
    rating: 4.9,
    reviewsCount: 304,
    badge: 'Popular',
    weightLabel: '500g',
  },
];

interface ProductCardProps {
  product: ProductData;
  onAddToCart: (item: CartItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.basePrice,
      weight: '500g',
      quantity: 1,
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden h-full"
    >
      {/* Product Image Area */}
      <a href="#product-detail" className="w-full aspect-square bg-[#F8F9FA] relative flex items-center justify-center overflow-hidden p-6 block">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-primary text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        <motion.img
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm select-none"
          draggable="false"
        />
      </a>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                weight={i < Math.floor(product.rating) ? 'fill' : 'regular'}
                className="text-amber-400"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewsCount})</span>
        </div>

        <a href="#product-detail" className="font-semibold text-gray-900 text-[15px] leading-snug hover:text-primary transition-colors duration-200 line-clamp-2">
          {product.name}
        </a>

        <span className="text-sm text-gray-500 mt-1 mb-4 block">
          {product.weightLabel}
        </span>

        {/* Footer: Price and Add Button */}
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">{product.basePrice}</span>
          </div>

          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-pink-600 transition-colors duration-300 shadow-sm active:scale-[0.98]"
          >
            <ShoppingCart size={18} weight="bold" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProductsProps {
  onAddToCart: (item: CartItem) => void;
}

export const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  return (
    <section id="products" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Standard E-commerce Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-2">
              Explore our premium collection of handpicked dry fruits.
            </p>
          </div>
          <a href="#products" className="text-primary font-semibold hover:text-pink-600 transition-colors text-sm">
            View All Products &rarr;
          </a>
        </div>

        {/* Grid layout - 4 cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="h-full"
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
