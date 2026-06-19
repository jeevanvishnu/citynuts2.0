import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlass,
  Plus,
  PencilSimple,
  Trash,
  Tag,
  Image as ImageIcon
} from '@phosphor-icons/react';

const initialCategories = [
  { id: 'CAT-001', name: 'Almonds', description: 'Premium quality raw and roasted almonds', count: 24, status: 'Active' },
  { id: 'CAT-002', name: 'Cashews', description: 'Whole, split, and flavored cashews', count: 18, status: 'Active' },
  { id: 'CAT-003', name: 'Pistachios', description: 'Roasted and salted Iranian pistachios', count: 12, status: 'Active' },
  { id: 'CAT-004', name: 'Walnuts', description: 'Shelled and unshelled premium walnuts', count: 8, status: 'Inactive' },
  { id: 'CAT-005', name: 'Dates', description: 'Medjool, Ajwa, and other premium dates', count: 35, status: 'Active' },
];

export const AdminCategory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories] = useState(initialCategories);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary/20 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm text-dark placeholder:text-dark/40"
            />
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors shadow-sm cursor-pointer">
          <Plus size={18} weight="bold" />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-premium border border-primary/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blush border-b border-primary/10">
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Category Details</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Products</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-blush/30 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-lg bg-blush flex items-center justify-center text-primary/50 border border-primary/20">
                        <ImageIcon size={24} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-dark">{category.name}</span>
                        <span className="text-xs text-dark/50 truncate max-w-xs">{category.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-500">
                        {category.count} Items
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        category.status === 'Active' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                      }`}>
                        {category.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-dark/50 hover:text-primary hover:bg-blush rounded-lg transition-colors cursor-pointer" title="Edit Category">
                          <PencilSimple size={18} />
                        </button>
                        <button className="p-2 text-dark/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete Category">
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-dark/50">
                    <div className="flex flex-col items-center gap-3">
                      <Tag size={48} className="text-primary/20" />
                      <p className="font-medium text-lg text-dark/70">No categories found</p>
                      <p className="text-sm text-dark/40">Try adjusting your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-primary/10 flex items-center justify-between bg-white">
          <span className="text-sm text-dark/60 font-medium">
            Showing <span className="font-bold text-dark">{filteredCategories.length}</span> of <span className="font-bold text-dark">{categories.length}</span> categories
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
