import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlass,
  Funnel,
  Plus,
  PencilSimple,
  Trash,
  Package,
  Image as ImageIcon
} from '@phosphor-icons/react';

const allProducts = [
  { id: 'PROD-001', name: 'Premium Roasted Almonds', sku: 'ALM-RST-500', category: 'Almonds', price: '$15.99', stock: 145, status: 'In Stock' },
  { id: 'PROD-002', name: 'Raw Whole Cashews', sku: 'CSH-RAW-250', category: 'Cashews', price: '$12.50', stock: 89, status: 'In Stock' },
  { id: 'PROD-003', name: 'Salted Pistachios', sku: 'PIS-SLT-500', category: 'Pistachios', price: '$18.99', stock: 12, status: 'Low Stock' },
  { id: 'PROD-004', name: 'California Walnuts', sku: 'WAL-CAL-500', category: 'Walnuts', price: '$14.00', stock: 0, status: 'Out of Stock' },
  { id: 'PROD-005', name: 'Medjool Dates', sku: 'DAT-MED-1000', category: 'Dates', price: '$22.50', stock: 210, status: 'In Stock' },
  { id: 'PROD-006', name: 'Mixed Nuts Delight', sku: 'MIX-DEL-500', category: 'Mixed', price: '$19.99', stock: 54, status: 'In Stock' },
];

export const AdminProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-500">{status}</span>;
      case 'Low Stock':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-500">{status}</span>;
      case 'Out of Stock':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-500">{status}</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40" />
            <input 
              type="text" 
              placeholder="Search products or SKUs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary/20 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm text-dark placeholder:text-dark/40"
            />
          </div>
          <div className="relative">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2.5 rounded-xl border border-primary/20 bg-white focus:outline-none focus:border-primary transition-all text-sm text-dark cursor-pointer font-medium"
            >
              <option value="All">All Categories</option>
              <option value="Almonds">Almonds</option>
              <option value="Cashews">Cashews</option>
              <option value="Pistachios">Pistachios</option>
              <option value="Walnuts">Walnuts</option>
              <option value="Dates">Dates</option>
              <option value="Mixed">Mixed</option>
            </select>
            <Funnel size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors shadow-sm cursor-pointer">
          <Plus size={18} weight="bold" />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-premium border border-primary/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blush border-b border-primary/10">
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-blush/30 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blush flex items-center justify-center text-primary/50 border border-primary/20 shrink-0">
                          <ImageIcon size={20} />
                        </div>
                        <span className="text-sm font-bold text-dark">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold font-['Fira_Code'] text-primary/70">{product.sku}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-dark/70 font-medium">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold font-['Fira_Code'] text-dark">{product.price}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-dark/70">{product.stock} units</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStockBadge(product.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-dark/50 hover:text-primary hover:bg-blush rounded-lg transition-colors cursor-pointer" title="Edit Product">
                          <PencilSimple size={18} />
                        </button>
                        <button className="p-2 text-dark/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete Product">
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-dark/50">
                    <div className="flex flex-col items-center gap-3">
                      <Package size={48} className="text-primary/20" />
                      <p className="font-medium text-lg text-dark/70">No products found</p>
                      <p className="text-sm text-dark/40">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-primary/10 flex items-center justify-between bg-white">
          <span className="text-sm text-dark/60 font-medium">
            Showing <span className="font-bold text-dark">{filteredProducts.length}</span> of <span className="font-bold text-dark">{allProducts.length}</span> products
          </span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md text-sm font-medium text-dark/40 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 rounded-md text-sm font-bold bg-primary text-white">1</button>
            <button className="px-3 py-1 rounded-md text-sm font-medium text-dark/70 hover:bg-blush transition-colors cursor-pointer">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
