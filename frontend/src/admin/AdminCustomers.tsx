import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlass,
  Funnel,
  DownloadSimple,
  Eye,
  PencilSimple,
  Trash,
  User,
  EnvelopeSimple,
  Phone
} from '@phosphor-icons/react';

const allCustomers = [
  { id: 'CUST-001', name: 'John Doe', email: 'john.doe@example.com', phone: '+1 (555) 123-4567', totalOrders: 12, totalSpent: '$1,245.00', joinDate: '2025-01-15', status: 'Active' },
  { id: 'CUST-002', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 (555) 987-6543', totalOrders: 5, totalSpent: '$340.50', joinDate: '2025-03-22', status: 'Active' },
  { id: 'CUST-003', name: 'Michael Johnson', email: 'michael.j@example.com', phone: '+1 (555) 456-7890', totalOrders: 1, totalSpent: '$85.00', joinDate: '2026-05-10', status: 'Inactive' },
  { id: 'CUST-004', name: 'Emily Davis', email: 'emily.davis@example.com', phone: '+1 (555) 234-5678', totalOrders: 24, totalSpent: '$3,120.00', joinDate: '2024-11-05', status: 'Active' },
  { id: 'CUST-005', name: 'Chris Wilson', email: 'chris.w@example.com', phone: '+1 (555) 876-5432', totalOrders: 0, totalSpent: '$0.00', joinDate: '2026-06-18', status: 'New' },
  { id: 'CUST-006', name: 'Sarah Brown', email: 'sarah.b@example.com', phone: '+1 (555) 345-6789', totalOrders: 8, totalSpent: '$675.25', joinDate: '2025-08-30', status: 'Active' },
];

export const AdminCustomers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredCustomers = allCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-500">{status}</span>;
      case 'Inactive':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-500">{status}</span>;
      case 'New':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-500">{status}</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
              placeholder="Search customers by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-primary/20 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm text-dark placeholder:text-dark/40"
            />
          </div>
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2.5 rounded-xl border border-primary/20 bg-white focus:outline-none focus:border-primary transition-all text-sm text-dark cursor-pointer font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="New">New</option>
            </select>
            <Funnel size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors shadow-sm cursor-pointer">
          <DownloadSimple size={18} weight="bold" />
          Export CSV
        </button>
      </div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-premium border border-primary/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blush border-b border-primary/10">
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-blush/30 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 shrink-0">
                          {getInitials(customer.name)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-dark">{customer.name}</span>
                          <span className="text-xs font-bold font-['Fira_Code'] text-primary/70">{customer.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-sm text-dark/70">
                          <EnvelopeSimple size={14} className="text-dark/40" />
                          {customer.email}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-dark/50">
                          <Phone size={14} className="text-dark/40" />
                          {customer.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-dark">{customer.totalOrders}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold font-['Fira_Code'] text-primary">{customer.totalSpent}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-dark/70 font-medium">{customer.joinDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-dark/50 hover:text-primary hover:bg-blush rounded-lg transition-colors cursor-pointer" title="View Details">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-dark/50 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer" title="Edit Customer">
                          <PencilSimple size={18} />
                        </button>
                        <button className="p-2 text-dark/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete Customer">
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
                      <User size={48} className="text-primary/20" />
                      <p className="font-medium text-lg text-dark/70">No customers found</p>
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
            Showing <span className="font-bold text-dark">{filteredCustomers.length}</span> of <span className="font-bold text-dark">{allCustomers.length}</span> customers
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
