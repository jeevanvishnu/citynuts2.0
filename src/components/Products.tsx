import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, ArrowRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import type { CartItem } from './CartDrawer';
import { productsData } from '../data/products';
import type { ProductData } from '../data/products';
import { PromoBanner } from './PromoBanner';
import { InformationBanner } from './InformationBanner';

interface ProductCardProps {
  product: ProductData;
  onAddToCart: (item: CartItem) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isWishlisted, onToggleWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      weight: product.weight,
      quantity: 1,
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl border border-primary/5 shadow-sm hover:shadow-premium shadow-pink-100/50 hover:border-primary/10 transition-all duration-300 flex flex-col group overflow-hidden h-full relative"
    >
      {/* Wishlist Heart Icon */}
      <button
        onClick={(e) => onToggleWishlist(product.id, e)}
        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-primary backdrop-blur-sm border border-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Add to wishlist"
      >
        <Heart
          size={18}
          weight={isWishlisted ? 'fill' : 'regular'}
          className={isWishlisted ? 'text-primary' : 'transition-colors duration-200'}
        />
      </button>

      {/* Product Image Area */}
      <a href="#product-detail" className="w-full aspect-square bg-[#FBFBFB] relative flex items-center justify-center overflow-hidden p-6 block">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="bg-gradient-pink text-white text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
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
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div className="space-y-1.5 flex-1">
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  weight={i < Math.floor(product.rating) ? 'fill' : 'regular'}
                  className="text-primary"
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-gray-400 ml-1">({product.reviewsCount} reviews)</span>
          </div>

          <a href="#product-detail" className="font-bold text-dark text-[15px] leading-snug hover:text-primary transition-colors duration-200 line-clamp-2">
            {product.name}
          </a>

          <span className="inline-block text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-100 rounded-md px-2 py-0.5 mt-1">
            {product.weight}
          </span>
        </div>

        {/* Footer: Price and Add Button */}
        <div className="pt-2 border-t border-primary/5 space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-primary">د.إ{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through font-semibold">د.إ{product.originalPrice}</span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-pink text-white rounded-xl text-sm font-bold shadow-md hover:shadow-premium transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
          >
            <ShoppingCart size={18} weight="bold" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

interface CategorySectionProps {
  title: string;
  description: string;
  categoryName: string;
  products: ProductData[];
  onAddToCart: (item: CartItem) => void;
  wishlist: string[];
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  description,
  categoryName,
  products,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) => {
  // Take top 8 products in this category
  const filteredProducts = products
    .filter((p) => p.category === categoryName)
    .slice(0, 8);

  if (filteredProducts.length === 0) return null;

  return (
    <div className="space-y-10">
      {/* Asymmetric Header Structure: Left Aligned Content with Right Aligned CTA Link */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-primary/10 pb-6">
        <div className="max-w-xl space-y-2">
          <h3 className="text-3xl font-extrabold text-charcoal tracking-tight">
            {title}
          </h3>
          <p className="text-gray-500 text-sm font-light leading-relaxed">
            {description}
          </p>
        </div>
        <motion.a
          href={`#products?category=${categoryName}`}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-primary font-bold hover:text-primary-dark transition-colors text-sm flex items-center gap-1.5 shrink-0"
        >
          Explore All {title}
          <ArrowRight size={16} weight="bold" />
        </motion.a>
      </div>

      {/* Grid Layout - 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
            className="h-full"
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface ProductsProps {
  onAddToCart: (item: CartItem) => void;
  wishlist: string[];
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
}

export const Products: React.FC<ProductsProps> = ({ onAddToCart, wishlist, onToggleWishlist }) => {
  return (
    <section id="products" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Main Section Introduction */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Browse Our Boutique Collections
          </h2>
          <p className="text-gray-500 text-base font-light max-w-2xl leading-relaxed">
            Delight in our exceptional, handpicked selections. From protein-rich nuts and organic sweet dates to artisanal chocolates and superfood seeds.
          </p>
        </div>

        {/* 1. Nuts Section (8 cards) */}
        <CategorySection
          title="Premium Nuts"
          description="Savor our collection of gourmet Californian almonds, Chilean walnuts, and roasted sea salt pistachios."
          categoryName="Nuts"
          products={productsData}
          onAddToCart={onAddToCart}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
        />

        {/* 2. Dates Section (8 cards) */}
        <div className="space-y-12">
          <InformationBanner />
          <CategorySection
            title="Exotic Dates"
          description="Sweet, soft, and premium dates sourced globally, perfect for natural energy and luxury gifting."
          categoryName="Dates"
          products={productsData}
          onAddToCart={onAddToCart}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
        />
        </div>

        {/* 3. Mid-page Promotional Banner */}
        <PromoBanner />

        {/* 4. Chocolates Section (8 cards) */}
        <CategorySection
          title="Artisanal Chocolates"
          description="Decadent chocolate bars, rich truffles, and almond barks crafted by master chocolatiers."
          categoryName="Chocolates"
          products={productsData}
          onAddToCart={onAddToCart}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
        />

        {/* 5. Seeds Section (8 cards) */}
        <CategorySection
          title="Superfood Seeds"
          description="Nutrient-dense raw and roasted seeds packed with fiber, proteins, and minerals for daily wellness."
          categoryName="Seeds"
          products={productsData}
          onAddToCart={onAddToCart}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
        />

      </div>
    </section>
  );
};
