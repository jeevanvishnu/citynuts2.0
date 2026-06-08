import React, { useState, useEffect, useMemo } from 'react';
import {
  Star,
  ShoppingCart,
  Heart,
  MagnifyingGlass,
  GridFour,
  List,
  Funnel,
  X,
  CaretLeft,
  CaretRight,
  Trash
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CartItem } from './CartDrawer';

// Interfaces
export interface ProductData {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  weight: string;
  badge?: string;
  description: string;
  dateAdded: string; // ISO date for newest sorting
  popularity: number; // For sorting
}

export interface ProductListingPageProps {
  onAddToCart: (item: CartItem) => void;
  wishlist: string[];
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
}

// 24 Premium Dry Fruits dataset
export const productsData: ProductData[] = [
  {
    id: 'prod-almonds-1',
    name: 'Premium Californian Almonds',
    category: 'Nuts',
    image: '/productimages/imgi_24_almond3.png.webp',
    price: 650,
    originalPrice: 850,
    rating: 4.9,
    reviewsCount: 142,
    weight: '500g',
    badge: 'Best Seller',
    description: 'Crisp, extra-large premium almonds sourced directly from California. Packed with Vitamin E, fibers, and antioxidants.',
    dateAdded: '2026-05-10',
    popularity: 98,
  },
  {
    id: 'prod-walnuts-1',
    name: 'Royal Chilean Walnuts halves',
    category: 'Nuts',
    image: '/productimages/imgi_26_1-4.png.webp',
    price: 850,
    originalPrice: 1100,
    rating: 4.8,
    reviewsCount: 96,
    weight: '500g',
    badge: 'New',
    description: 'Handpicked light halves Chilean walnuts. High in omega-3 fatty acids, promoting heart and brain health.',
    dateAdded: '2026-06-01',
    popularity: 85,
  },
  {
    id: 'prod-pistachios-1',
    name: 'Roasted Sea Salt Pistachios',
    category: 'Nuts',
    image: '/productimages/imgi_481_web-2.png',
    price: 950,
    originalPrice: 1250,
    rating: 4.9,
    reviewsCount: 188,
    weight: '500g',
    badge: '20% Off',
    description: 'Dry roasted jumbo pistachios in their shells, lightly salted with sea salt. Irresistible crunch and rich flavor.',
    dateAdded: '2026-04-15',
    popularity: 95,
  },
  {
    id: 'prod-dates-1',
    name: 'Premium Medjool Dates',
    category: 'Dates',
    image: '/productimages/imgi_18_AJWA-DATES-LARGE.png',
    price: 550,
    originalPrice: 750,
    rating: 4.7,
    reviewsCount: 84,
    weight: '500g',
    badge: 'Organic',
    description: 'Large, soft, and extremely sweet Medjool dates. Known as the king of dates, full of natural dietary fibers.',
    dateAdded: '2026-05-20',
    popularity: 78,
  },
  {
    id: 'prod-cashews-1',
    name: 'Jumbo Roasted Cashews',
    category: 'Nuts',
    image: '/productimages/imgi_480_web-1.png',
    price: 850,
    originalPrice: 1050,
    rating: 4.9,
    reviewsCount: 210,
    weight: '500g',
    badge: 'Trending',
    description: 'Gourmet whole jumbo cashews. Slow-roasted to preserve their naturally sweet, buttery taste and crunchy texture.',
    dateAdded: '2026-05-02',
    popularity: 99,
  },
  {
    id: 'prod-raisins-1',
    name: 'Golden Afghan Raisins',
    category: 'Dry Fruits',
    image: '/productimages/imgi_18_AJWA-DATES-LARGE.png',
    price: 400,
    originalPrice: 500,
    rating: 4.6,
    reviewsCount: 56,
    weight: '500g',
    badge: 'Popular',
    description: 'Delightfully sweet, plump golden raisins from the fertile valleys of Afghanistan. Excellent quick energy booster.',
    dateAdded: '2026-03-10',
    popularity: 64,
  },
  {
    id: 'prod-mixed-1',
    name: 'Deluxe Mixed Nuts',
    category: 'Nuts',
    image: '/productimages/imgi_90_premium-nuts-2048x2048.png',
    price: 1200,
    originalPrice: 1500,
    rating: 4.9,
    reviewsCount: 304,
    weight: '500g',
    badge: 'Best Seller',
    description: 'Premium curation of almonds, cashews, pistachios, walnuts, and dried berries. A healthy, high-nutrition snack.',
    dateAdded: '2026-05-15',
    popularity: 100,
  },
  {
    id: 'prod-almonds-2',
    name: 'Organic Mamra Almonds',
    category: 'Nuts',
    image: '/productimages/imgi_24_almond3.png.webp',
    price: 1800,
    originalPrice: 2200,
    rating: 5.0,
    reviewsCount: 45,
    weight: '500g',
    badge: 'Premium',
    description: 'Exquisite Mamra almonds containing higher oil content. Sourced from organic farms in Iran, crisp and highly nutritive.',
    dateAdded: '2026-06-03',
    popularity: 92,
  },
  {
    id: 'prod-cashews-2',
    name: 'Spicy Peri-Peri Cashews',
    category: 'Nuts',
    image: '/productimages/imgi_480_web-1.png',
    price: 550,
    originalPrice: 700,
    rating: 4.6,
    reviewsCount: 82,
    weight: '250g',
    badge: 'New',
    description: 'Premium cashews roasted and seasoned with hot peri-peri spices. Perfect for parties and bold snack lovers.',
    dateAdded: '2026-05-28',
    popularity: 88,
  },
  {
    id: 'prod-pistachios-2',
    name: 'Iranian Long Pistachios',
    category: 'Nuts',
    image: '/productimages/imgi_481_web-2.png',
    price: 1900,
    originalPrice: 2400,
    rating: 4.9,
    reviewsCount: 120,
    weight: '1kg',
    badge: 'Premium',
    description: 'Authentic Akbari pistachios from Iran. Long-grain shape, beautiful shell separation, and rich pistachio oil content.',
    dateAdded: '2026-04-20',
    popularity: 90,
  },
  {
    id: 'prod-walnuts-2',
    name: 'Kashmiri Walnut Kernels',
    category: 'Nuts',
    image: '/productimages/imgi_26_1-4.png.webp',
    price: 450,
    originalPrice: 580,
    rating: 4.7,
    reviewsCount: 92,
    weight: '250g',
    badge: 'Best Seller',
    description: 'Light, crisp walnut kernels harvested from organic orchards in Kashmir. Rich in plant-based Omega-3 fats.',
    dateAdded: '2026-05-18',
    popularity: 94,
  },
  {
    id: 'prod-raisins-2',
    name: 'Black Seedless Raisins',
    category: 'Dry Fruits',
    image: '/productimages/imgi_18_AJWA-DATES-LARGE.png',
    price: 250,
    originalPrice: 350,
    rating: 4.5,
    reviewsCount: 48,
    weight: '250g',
    badge: 'Organic',
    description: 'Naturally sun-dried sweet black raisins. Great source of iron, calcium, and digestion-promoting dietary fibers.',
    dateAdded: '2026-02-25',
    popularity: 58,
  },
  {
    id: 'prod-dates-2',
    name: 'Royal Ajwa Dates Madinah',
    category: 'Dates',
    image: '/productimages/imgi_18_AJWA-DATES-LARGE.png',
    price: 1200,
    originalPrice: 1550,
    rating: 5.0,
    reviewsCount: 150,
    weight: '500g',
    badge: 'Best Seller',
    description: 'Sacred Ajwa dates, imported directly from Madinah. Soft, dark skin, subtle sweetness, and rich health benefits.',
    dateAdded: '2026-05-08',
    popularity: 97,
  },
  {
    id: 'prod-dates-3',
    name: 'Premium Kalmi Dates',
    category: 'Dates',
    image: '/productimages/imgi_18_AJWA-DATES-LARGE.png',
    price: 380,
    originalPrice: 480,
    rating: 4.3,
    reviewsCount: 42,
    weight: '250g',
    badge: 'New',
    description: 'High-quality Safawi Kalmi dates. Moderately sweet with a pleasant chew, rich in iron, potassium, and magnesium.',
    dateAdded: '2026-05-30',
    popularity: 70,
  },
  {
    id: 'prod-mixed-2',
    name: 'Berry Nut Trail Mix',
    category: 'Nuts',
    image: '/productimages/imgi_90_premium-nuts-2048x2048.png',
    price: 350,
    originalPrice: 450,
    rating: 4.6,
    reviewsCount: 73,
    weight: '250g',
    badge: 'Organic',
    description: 'Balanced mix of whole raw almonds, cashews, walnuts, pumpkin seeds, cranberries, and blueberries.',
    dateAdded: '2026-04-10',
    popularity: 82,
  },
  {
    id: 'prod-almonds-3',
    name: 'Honey Glazed Roasted Almonds',
    category: 'Nuts',
    image: '/productimages/imgi_24_almond3.png.webp',
    price: 280,
    originalPrice: 380,
    rating: 4.7,
    reviewsCount: 39,
    weight: '100g',
    badge: '20% Off',
    description: 'California almonds roasted and coated in pure organic honey and a touch of salt. Sweet-savory crunchy bite.',
    dateAdded: '2026-05-22',
    popularity: 79,
  },
  {
    id: 'prod-almonds-4',
    name: 'Saffron & Cardamom Almonds',
    category: 'Nuts',
    image: '/productimages/imgi_24_almond3.png.webp',
    price: 999,
    originalPrice: 1299,
    rating: 4.8,
    reviewsCount: 66,
    weight: '500g',
    badge: 'Premium',
    description: 'Luxurious treat. Almonds slow-roasted with genuine saffron threads and powdered cardamom spice.',
    dateAdded: '2026-05-25',
    popularity: 86,
  },
  {
    id: 'prod-pistachios-3',
    name: 'Raw Shelled Pistachio Kernels',
    category: 'Nuts',
    image: '/productimages/imgi_481_web-2.png',
    price: 500,
    originalPrice: 650,
    rating: 4.6,
    reviewsCount: 54,
    weight: '250g',
    badge: 'Organic',
    description: 'Raw green pistachio kernels without shells. Highly aromatic, ideal for garnishing desserts or healthy baking.',
    dateAdded: '2026-03-20',
    popularity: 72,
  },
  {
    id: 'prod-mixed-3',
    name: 'Dates & Walnut Energy Bar Pack',
    category: 'Nuts',
    image: '/productimages/imgi_90_premium-nuts-2048x2048.png',
    price: 600,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 110,
    weight: '1kg',
    badge: 'Trending',
    description: '100% natural, refined-sugar-free energy chunks made with mashed Medjool dates, Kashmiri walnuts, and sesame.',
    dateAdded: '2026-05-12',
    popularity: 89,
  },
  {
    id: 'prod-almonds-5',
    name: 'Salted Snack Almonds',
    category: 'Nuts',
    image: '/productimages/imgi_24_almond3.png.webp',
    price: 180,
    originalPrice: 220,
    rating: 4.2,
    reviewsCount: 28,
    weight: '100g',
    badge: 'New',
    description: 'Perfect companion for travel. Perfectly dry roasted whole almonds with light table salt in a zip-lock pouch.',
    dateAdded: '2026-06-02',
    popularity: 60,
  },
  {
    id: 'prod-cashews-3',
    name: 'Roasted Black Pepper Cashews',
    category: 'Nuts',
    image: '/productimages/imgi_480_web-1.png',
    price: 220,
    originalPrice: 280,
    rating: 4.4,
    reviewsCount: 32,
    weight: '100g',
    badge: 'Popular',
    description: 'Cashews toasted to crispiness and blended with ground black peppercorns and salt. Tangy, aromatic flavor.',
    dateAdded: '2026-04-05',
    popularity: 76,
  },
  {
    id: 'prod-dates-4',
    name: 'Stuffed Almond Medjool Dates',
    category: 'Dates',
    image: '/productimages/imgi_18_AJWA-DATES-LARGE.png',
    price: 750,
    originalPrice: 950,
    rating: 4.9,
    reviewsCount: 89,
    weight: '250g',
    badge: 'Best Seller',
    description: 'Succulent large Medjool dates stuffed with premium dry-roasted Californian almonds. High-energy gourmet bite.',
    dateAdded: '2026-05-14',
    popularity: 91,
  },
  {
    id: 'prod-raisins-3',
    name: 'Organic Green Raisins Kishmish',
    category: 'Dry Fruits',
    image: '/productimages/imgi_18_AJWA-DATES-LARGE.png',
    price: 195,
    originalPrice: 260,
    rating: 4.4,
    reviewsCount: 37,
    weight: '250g',
    badge: 'Organic',
    description: 'Deliciously sweet and tangy green raisins, sun-cured. Perfect sweet addition to oatmeal, salads, and pilafs.',
    dateAdded: '2026-02-15',
    popularity: 68,
  },
  {
    id: 'prod-cashews-4',
    name: 'Raw White Cashew Kernels Kaju',
    category: 'Nuts',
    image: '/productimages/imgi_480_web-1.png',
    price: 490,
    originalPrice: 620,
    rating: 4.7,
    reviewsCount: 55,
    weight: '250g',
    badge: 'Trending',
    description: 'Raw, creamy, clean whole cashew kernels. Ideal for premium cooking, kaju katli sweets, or raw nutritional diet.',
    dateAdded: '2026-05-19',
    popularity: 87,
  },
  // Chocolates
  {
    id: 'prod-chocolates-1',
    name: 'Luxury Almond Dark Chocolate Truffles',
    category: 'Chocolates',
    image: '/productimages/imgi_480_web-1.png',
    price: 1250,
    originalPrice: 1600,
    rating: 4.9,
    reviewsCount: 78,
    weight: '250g',
    badge: 'Signature',
    description: 'Decadent dark chocolate truffles filled with premium roasted almond pieces. Handcrafted by master chocolatiers.',
    dateAdded: '2026-06-05',
    popularity: 93,
  },
  {
    id: 'prod-chocolates-2',
    name: 'Gourmet Pistachio Milk Chocolate Bar',
    category: 'Chocolates',
    image: '/productimages/imgi_481_web-2.png',
    price: 650,
    originalPrice: 800,
    rating: 4.8,
    reviewsCount: 45,
    weight: '150g',
    badge: 'Trending',
    description: 'Rich and velvety Belgian milk chocolate infused with crushed roasted pistachios. A perfect balance of sweet and nutty.',
    dateAdded: '2026-06-06',
    popularity: 89,
  },
  // Seeds
  {
    id: 'prod-seeds-1',
    name: 'Organic Roasted Pumpkin Seeds',
    category: 'Seeds',
    image: '/productimages/imgi_24_almond3.png.webp',
    price: 320,
    originalPrice: 420,
    rating: 4.6,
    reviewsCount: 92,
    weight: '250g',
    badge: 'Organic',
    description: 'Premium organic pumpkin seeds, dry-roasted and lightly seasoned. High in magnesium, zinc, and healthy fats.',
    dateAdded: '2026-05-24',
    popularity: 81,
  },
  {
    id: 'prod-seeds-2',
    name: 'Premium Chia & Flax Seed Mix',
    category: 'Seeds',
    image: '/productimages/imgi_26_1-4.png.webp',
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviewsCount: 64,
    weight: '500g',
    badge: 'New',
    description: 'Nutrient-rich superfood blend of organic black chia seeds and brown flax seeds. Excellent for smoothies, oatmeal, and baking.',
    dateAdded: '2026-06-02',
    popularity: 74,
  },
  // Spices
  {
    id: 'prod-spices-1',
    name: 'Kashmiri Kesar (Saffron) Thread',
    category: 'Spices',
    image: '/productimages/imgi_18_AJWA-DATES-LARGE.png',
    price: 1500,
    originalPrice: 1900,
    rating: 5.0,
    reviewsCount: 104,
    weight: '1g',
    badge: 'Premium',
    description: '100% pure, hand-picked Grade A+ Kashmiri saffron. Known for its intense aroma, vivid red color, and therapeutic properties.',
    dateAdded: '2026-05-15',
    popularity: 96,
  },
  {
    id: 'prod-spices-2',
    name: 'Organic Green Cardamom Pods',
    category: 'Spices',
    image: '/productimages/imgi_26_1-4.png.webp',
    price: 580,
    originalPrice: 750,
    rating: 4.8,
    reviewsCount: 52,
    weight: '100g',
    badge: 'Organic',
    description: 'Aromatic, hand-graded green cardamom pods sourced from organic plantations. Essential spice for rich desserts and beverages.',
    dateAdded: '2026-05-27',
    popularity: 79,
  },
  // Gifts
  {
    id: 'prod-gifts-1',
    name: 'Royal Festive Dry Fruit Gift Box',
    category: 'Gifts',
    image: '/productimages/imgi_90_premium-nuts-2048x2048.png',
    price: 2450,
    originalPrice: 3200,
    rating: 5.0,
    reviewsCount: 128,
    weight: '1kg',
    badge: 'Bestseller',
    description: 'A luxurious wooden gift tray packed with our premium almonds, jumbo cashews, salted pistachios, and Medjool dates.',
    dateAdded: '2026-06-04',
    popularity: 99,
  },
  {
    id: 'prod-gifts-2',
    name: 'Signature Celebration Hamper',
    category: 'Gifts',
    image: '/productimages/imgi_480_web-1.png',
    price: 3800,
    originalPrice: 4800,
    rating: 4.9,
    reviewsCount: 67,
    weight: '1.5kg',
    badge: 'Premium',
    description: 'The ultimate luxury bundle featuring assortments of premium nuts, Medjool dates, dark chocolate truffles, and organic honey.',
    dateAdded: '2026-06-07',
    popularity: 95,
  }
];

export const ProductListingPage: React.FC<ProductListingPageProps> = ({ onAddToCart, wishlist, onToggleWishlist }) => {
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 2000]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Layout states
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('Default');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 9;

  // Sync scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handle URL hash changes to pre-select category
  useEffect(() => {
    const handleHashCategory = () => {
      const hash = window.location.hash;
      if (hash.includes('?category=')) {
        const queryIndex = hash.indexOf('?category=');
        const catParam = decodeURIComponent(hash.substring(queryIndex + '?category='.length));
        const matchedCat = ['Dates', 'Nuts', 'Dry Fruits', 'Chocolates', 'Seeds', 'Spices', 'Gifts'].find(
          c => c.toLowerCase() === catParam.toLowerCase()
        );
        if (matchedCat) {
          setSelectedCategories([matchedCat]);
          triggerSkeleton();
          setCurrentPage(1);
        }
      } else if (hash === '#products') {
        setSelectedCategories([]);
      }
    };

    handleHashCategory();
    window.addEventListener('hashchange', handleHashCategory);
    return () => window.removeEventListener('hashchange', handleHashCategory);
  }, []);

  // Simulate skeleton load on filter changes
  const triggerSkeleton = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  };

  const handleCategoryChange = (category: string) => {
    triggerSkeleton();
    setCurrentPage(1);
    if (category === 'All') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  const handleWeightChange = (weight: string) => {
    triggerSkeleton();
    setCurrentPage(1);
    setSelectedWeights(prev =>
      prev.includes(weight)
        ? prev.filter(w => w !== weight)
        : [...prev, weight]
    );
  };

  const handleRatingChange = (rating: number) => {
    triggerSkeleton();
    setCurrentPage(1);
    setSelectedRating(prev => prev === rating ? null : rating);
  };

  const handlePriceChange = (index: number, val: number) => {
    triggerSkeleton();
    setCurrentPage(1);
    setPriceRange(prev => {
      const next = [...prev] as [number, number];
      next[index] = val;
      // Ensure min is below max and max is above min
      if (index === 0 && next[0] > next[1] - 50) {
        next[0] = next[1] - 50;
      } else if (index === 1 && next[1] < next[0] + 50) {
        next[1] = next[0] + 50;
      }
      return next;
    });
  };

  const handleClearFilters = () => {
    triggerSkeleton();
    setCurrentPage(1);
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange([100, 2000]);
    setSelectedWeights([]);
    setSelectedRating(null);
  };

  const handleWishlistToggle = (id: string, e: React.MouseEvent) => {
    onToggleWishlist(id, e);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    triggerSkeleton();
    setCurrentPage(1);
  };

  // Filtered & Sorted products computation
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      // Search check
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }

      // Category check
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) return false;
      }

      // Weight check
      if (selectedWeights.length > 0) {
        if (!selectedWeights.includes(product.weight)) return false;
      }

      // Rating check
      if (selectedRating !== null) {
        if (product.rating < selectedRating) return false;
      }

      // Price check
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;

      return true;
    }).sort((a, b) => {
      // Sorting
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Newest First':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'Most Popular':
          return b.popularity - a.popularity;
        case 'Top Rated':
          return b.rating - a.rating;
        default:
          return 0; // Default ordering as in data
      }
    });
  }, [searchQuery, selectedCategories, selectedWeights, selectedRating, priceRange, sortBy]);

  // Paginated products list
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const categories = ['Dates', 'Nuts', 'Dry Fruits', 'Chocolates', 'Seeds', 'Spices', 'Gifts'];
  const weights = ['100g', '250g', '500g', '1kg'];

  // Inside Sidebar Content
  const sidebarContent = (
    <div className="space-y-8 pr-2">
      {/* Search Bar */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-dark uppercase tracking-wider">Search</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search dry fruits..."
            value={searchQuery}
            onChange={handleSearchInput}
            className="w-full bg-[#FBFBFB] border border-primary/20 rounded-xl py-3 pl-11 pr-4 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70 font-bold" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-dark uppercase tracking-wider">Category</h3>
        <div className="space-y-2.5">
          <label className="flex items-center gap-3 cursor-pointer group py-0.5">
            <input
              type="checkbox"
              checked={selectedCategories.length === 0}
              onChange={() => handleCategoryChange('All')}
              className="w-4.5 h-4.5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
            />
            <span className={`text-sm select-none transition-colors duration-200 ${selectedCategories.length === 0 ? 'text-primary font-semibold' : 'text-dark/70 group-hover:text-primary'}`}>
              All Products
            </span>
          </label>

          {categories.map(cat => {
            const isChecked = selectedCategories.includes(cat);
            return (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group py-0.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCategoryChange(cat)}
                  className="w-4.5 h-4.5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                />
                <span className={`text-sm select-none transition-colors duration-200 ${isChecked ? 'text-primary font-semibold' : 'text-dark/70 group-hover:text-primary'}`}>
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-dark uppercase tracking-wider">Price Range</h3>
        <div className="relative pt-6 pb-2 px-1">
          <div className="h-1 bg-gray-200 rounded-full relative">
            <div
              className="absolute h-full bg-primary rounded-full"
              style={{
                left: `${((priceRange[0] - 100) / 1900) * 100}%`,
                right: `${100 - ((priceRange[1] - 100) / 1900) * 100}%`
              }}
            />
            <input
              type="range"
              min={100}
              max={2000}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none cursor-pointer accent-primary top-0 left-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
              style={{ zIndex: priceRange[0] > 1800 ? 5 : 3 }}
            />
            <input
              type="range"
              min={100}
              max={2000}
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none cursor-pointer accent-primary top-0 left-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
              style={{ zIndex: 4 }}
            />
          </div>
          <div className="flex justify-between items-center mt-5 text-xs font-semibold text-dark/70">
            <span className="bg-blush px-2.5 py-1 rounded-lg border border-primary/15 text-primary">{priceRange[0]}</span>
            <span>to</span>
            <span className="bg-blush px-2.5 py-1 rounded-lg border border-primary/15 text-primary">{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Weight Filter */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-dark uppercase tracking-wider">Weight</h3>
        <div className="space-y-2.5">
          {weights.map(weight => {
            const isChecked = selectedWeights.includes(weight);
            return (
              <label key={weight} className="flex items-center gap-3 cursor-pointer group py-0.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleWeightChange(weight)}
                  className="w-4.5 h-4.5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                />
                <span className={`text-sm select-none transition-colors duration-200 ${isChecked ? 'text-primary font-semibold' : 'text-dark/70 group-hover:text-primary'}`}>
                  {weight}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-dark uppercase tracking-wider">Rating</h3>
        <div className="space-y-2">
          {[4, 3].map(rating => {
            const isChecked = selectedRating === rating;
            return (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`w-full flex items-center justify-between p-2 rounded-xl transition-all duration-300 text-left border ${isChecked
                  ? 'bg-blush border-primary/20 text-primary font-semibold shadow-sm'
                  : 'border-transparent text-dark/70 hover:bg-blush/30 hover:text-primary'
                  }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        weight={i < rating ? 'fill' : 'regular'}
                        className={i < rating ? 'text-primary' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm ml-1">{rating}★ & above</span>
                </div>
                {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-full text-sm font-bold active:scale-[0.98] cursor-pointer"
      >
        <Trash size={16} weight="bold" />
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-20 pt-[80px] font-sans">

      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-primary/5 py-4.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 font-medium">
            <a href="#home" className="hover:text-primary transition-colors duration-200">Home</a>
            <CaretRight size={12} weight="bold" />
            <span className="text-primary font-semibold">Products</span>
          </nav>
        </div>
      </div>

      {/* 2. Page Header */}
      <div className="bg-blush py-16 relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 bg-radial-pattern opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

        {/* Glowing Blobs */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl px-4 space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight flex flex-col items-center gap-3">
            Our Premium Dry Fruits
            <span className="w-20 h-1 bg-gradient-pink rounded-full" />
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Delve into our boutique collection of hand-picked, exceptionally sourced organic nuts, premium dates, and dried fruits roasted to crisp perfection.
          </p>
        </div>
      </div>

      {/* 3. Main Layout: Two Column */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Left Sidebar Filter Panel (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1 border-r border-primary/10 pr-6 sticky top-24 self-start max-h-[85vh] overflow-y-auto no-scrollbar">
            {sidebarContent}
          </aside>

          {/* Right Product Grid Area */}
          <section className="lg:col-span-3 space-y-8">

            {/* Grid Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-primary/10 rounded-2xl p-4 gap-4 shadow-sm">
              <span className="text-sm font-semibold text-gray-500">
                Showing {filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} Products
              </span>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      triggerSkeleton();
                      setSortBy(e.target.value);
                    }}
                    className="bg-white border border-primary/20 hover:border-primary text-sm font-semibold text-dark rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  >
                    <option>Default</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Most Popular</option>
                    <option>Top Rated</option>
                  </select>
                </div>

                {/* View Switcher Toggle */}
                <div className="flex items-center gap-1 border border-primary/10 rounded-xl p-1 bg-[#FBFBFB]">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-primary text-white shadow-sm' : 'text-primary/70 hover:bg-blush'}`}
                    aria-label="Grid View"
                  >
                    <GridFour size={18} weight="bold" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-primary text-white shadow-sm' : 'text-primary/70 hover:bg-blush'}`}
                    aria-label="List View"
                  >
                    <List size={18} weight="bold" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Cards Container */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                // Skeleton loading cards
                <motion.div
                  key="skeleton-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-6'
                  }
                >
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 animate-pulse ${viewMode === 'list' ? 'flex flex-col sm:flex-row gap-6 items-center' : ''
                        }`}
                    >
                      {/* Image Placeholder */}
                      <div className={`bg-gray-100 rounded-xl aspect-square shrink-0 ${viewMode === 'list' ? 'w-48 h-48' : 'w-full'}`} />
                      {/* Content Placeholders */}
                      <div className="flex-1 w-full space-y-3">
                        <div className="h-4 bg-gray-100 rounded w-1/4" />
                        <div className="h-6 bg-gray-100 rounded w-3/4" />
                        <div className="h-4 bg-gray-100 rounded w-1/2" />
                        <div className="h-8 bg-gray-100 rounded w-full pt-4" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : filteredProducts.length === 0 ? (
                // 5. Empty State
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-20 px-4 border border-dashed border-primary/20 rounded-3xl bg-blush/10 space-y-6"
                >
                  <div className="w-32 h-32 rounded-full bg-blush flex items-center justify-center border border-primary/10 text-primary/40">
                    <Funnel size={56} weight="light" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-dark">No products found</h3>
                    <p className="text-gray-500 text-sm max-w-sm">
                      We couldn't find any dry fruits matching your filter selection. Try widening your price range or clearing search criteria.
                    </p>
                  </div>
                  <button
                    onClick={handleClearFilters}
                    className="px-8 py-3 bg-gradient-pink text-white rounded-full font-bold text-sm shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : viewMode === 'grid' ? (
                // Product Cards (Grid View) - 3 cards per row
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {paginatedProducts.map(product => {
                    const isWishlisted = wishlist.includes(product.id);
                    return (
                      <motion.div
                        key={product.id}
                        layoutId={`card-wrapper-${product.id}`}
                        className="bg-white rounded-2xl border border-primary/5 shadow-sm hover:shadow-premium shadow-pink-100/50 hover:border-primary/10 transition-all duration-300 flex flex-col group overflow-hidden h-full relative"
                      >
                        {/* Wishlist Heart Icon */}
                        <button
                          onClick={(e) => handleWishlistToggle(product.id, e)}
                          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-primary backdrop-blur-sm border border-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                          aria-label="Add to wishlist"
                        >
                          <Heart
                            size={18}
                            weight={isWishlisted ? 'fill' : 'regular'}
                            className={isWishlisted ? 'text-primary' : 'transition-colors duration-200'}
                          />
                        </button>

                        {/* Product Image Container */}
                        <a href="#product-detail" className="w-full aspect-square bg-[#FBFBFB] relative flex items-center justify-center overflow-hidden p-6 block">
                          {/* Badge */}
                          {product.badge && (
                            <div className="absolute top-3.5 left-3.5 z-10">
                              <span className="bg-gradient-pink text-white text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                                {product.badge}
                              </span>
                            </div>
                          )}

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 select-none mix-blend-multiply drop-shadow-sm"
                            draggable="false"
                          />
                        </a>

                        {/* Product Details */}
                        <div className="flex flex-col flex-1 p-5 space-y-4">
                          <div className="space-y-1.5 flex-1">
                            {/* Stars rating */}
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

                            {/* Name & weight */}
                            <a href="#product-detail" className="font-bold text-dark text-[15px] sm:text-base leading-snug hover:text-primary transition-colors duration-200 line-clamp-2">
                              {product.name}
                            </a>
                            <span className="inline-block text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-100 rounded-md px-2 py-0.5 mt-1">
                              {product.weight}
                            </span>
                          </div>

                          {/* Footer: Price and Add Button */}
                          <div className="pt-2 border-t border-primary/5 space-y-3">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-extrabold text-primary">{product.price}</span>
                              <span className="text-xs text-gray-400 line-through font-semibold">{product.originalPrice}</span>
                            </div>

                            <button
                              onClick={() => onAddToCart({
                                id: product.id,
                                name: product.name,
                                image: product.image,
                                price: product.price,
                                weight: product.weight,
                                quantity: 1
                              })}
                              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-pink text-white rounded-xl text-sm font-bold shadow-md hover:shadow-premium transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                            >
                              <ShoppingCart size={18} weight="bold" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                // Product Cards (List View) - Full-width horizontal card
                <motion.div
                  key="list-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="space-y-6"
                >
                  {paginatedProducts.map(product => {
                    const isWishlisted = wishlist.includes(product.id);
                    return (
                      <motion.div
                        key={product.id}
                        layoutId={`card-wrapper-${product.id}`}
                        className="bg-white rounded-2xl border border-primary/5 shadow-sm hover:shadow-premium shadow-pink-100/50 hover:border-primary/10 transition-all duration-300 flex flex-col md:flex-row group overflow-hidden relative"
                      >
                        {/* Wishlist Heart Icon */}
                        <button
                          onClick={(e) => handleWishlistToggle(product.id, e)}
                          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-primary backdrop-blur-sm border border-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                          aria-label="Add to wishlist"
                        >
                          <Heart
                            size={18}
                            weight={isWishlisted ? 'fill' : 'regular'}
                            className={isWishlisted ? 'text-primary' : ''}
                          />
                        </button>

                        {/* Product Image (Left) */}
                        <a href="#product-detail" className="w-full md:w-56 shrink-0 aspect-square bg-[#FBFBFB] relative flex items-center justify-center p-6 md:p-8 block">
                          {product.badge && (
                            <div className="absolute top-4 left-4 z-10">
                              <span className="bg-gradient-pink text-white text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                                {product.badge}
                              </span>
                            </div>
                          )}

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 select-none mix-blend-multiply drop-shadow-sm"
                            draggable="false"
                          />
                        </a>

                        {/* Product Details (Center) */}
                        <div className="flex-1 p-6 flex flex-col justify-between space-y-4 md:space-y-0">
                          <div className="space-y-2 max-w-xl">
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

                            <a href="#product-detail" className="font-bold text-dark text-lg md:text-xl hover:text-primary transition-colors duration-200 leading-snug">
                              {product.name}
                            </a>

                            <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-2">
                              {product.description}
                            </p>

                            <div className="flex items-center gap-2 pt-1.5">
                              <span className="inline-block text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-100 rounded-md px-2 py-0.5">
                                {product.weight}
                              </span>
                              <span className="text-xs font-semibold text-gray-400">• High Quality Dry Fruit</span>
                            </div>
                          </div>

                          {/* Details right sidebar in list view or integrated footer details */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-primary/5 gap-4">
                            <div className="flex items-baseline gap-2.5">
                              <span className="text-2xl font-black text-primary">{product.price}</span>
                              <span className="text-sm text-gray-400 line-through font-semibold">{product.originalPrice}</span>
                            </div>

                            <button
                              onClick={() => onAddToCart({
                                id: product.id,
                                name: product.name,
                                image: product.image,
                                price: product.price,
                                weight: product.weight,
                                quantity: 1
                              })}
                              className="w-full sm:w-auto px-8 py-3 bg-gradient-pink text-white rounded-xl text-sm font-bold shadow-md hover:shadow-premium transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <ShoppingCart size={18} weight="bold" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="w-10 h-10 rounded-full border border-primary/10 text-primary bg-white hover:bg-blush disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary transition-all duration-300 flex items-center justify-center cursor-pointer"
                  aria-label="Previous Page"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  const isActive = currentPage === pageNumber;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center border cursor-pointer ${isActive
                        ? 'bg-gradient-pink border-transparent text-white shadow-md'
                        : 'bg-white border-primary/10 text-dark/75 hover:bg-blush hover:text-primary'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="w-10 h-10 rounded-full border border-primary/10 text-primary bg-white hover:bg-blush disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary transition-all duration-300 flex items-center justify-center cursor-pointer"
                  aria-label="Next Page"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Floating Bottom Filters Toggle (Mobile) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 lg:hidden">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 px-6 py-3.5 bg-gradient-pink text-white rounded-full font-bold shadow-premium shadow-pink-200/50 text-sm border border-white/10"
        >
          <Funnel size={18} weight="bold" />
          Filters
          {/* Active filters badge count */}
          {((selectedCategories.length > 0 ? 1 : 0) + (selectedWeights.length > 0 ? 1 : 0) + (selectedRating ? 1 : 0) + (searchQuery !== '' ? 1 : 0) + (priceRange[0] > 100 || priceRange[1] < 2000 ? 1 : 0)) > 0 && (
            <span className="w-5 h-5 bg-white text-primary text-[10px] font-extrabold rounded-full flex items-center justify-center">
              {(selectedCategories.length > 0 ? 1 : 0) + (selectedWeights.length > 0 ? 1 : 0) + (selectedRating ? 1 : 0) + (searchQuery !== '' ? 1 : 0) + (priceRange[0] > 100 || priceRange[1] < 2000 ? 1 : 0)}
            </span>
          )}
        </motion.button>
      </div>

      {/* Mobile Drawer (Bottom Sheet) */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-[2.5rem] shadow-2xl p-6 pb-10 max-h-[85vh] overflow-y-auto no-scrollbar lg:hidden border-t border-primary/10"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-4 border-b border-primary/5 mb-6">
                <div className="flex items-center gap-2">
                  <Funnel size={20} className="text-primary" weight="bold" />
                  <h2 className="text-lg font-bold text-dark">Filter Products</h2>
                </div>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 rounded-full hover:bg-blush text-dark/70 hover:text-primary transition-all duration-200"
                  aria-label="Close filters"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* Sidebar Content inside Bottom Sheet */}
              <div className="pb-8">
                {sidebarContent}
              </div>

              {/* Apply Filters Floating Button */}
              <div className="sticky bottom-0 left-0 w-full pt-4 bg-white border-t border-primary/5 flex gap-4">
                <button
                  onClick={() => {
                    handleClearFilters();
                    setIsMobileFiltersOpen(false);
                  }}
                  className="flex-1 py-3 border border-primary/25 rounded-xl text-primary font-bold text-sm text-center"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-2 py-3 bg-gradient-pink text-white rounded-xl font-bold text-sm text-center shadow-md shadow-pink-100"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
