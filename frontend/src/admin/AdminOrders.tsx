import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlass,
  Funnel,
  Eye,
  PencilSimple,
  Trash,
  DownloadSimple,
  CheckCircle,
  Clock,
  XCircle,
  Package
} from '@phosphor-icons/react';

const allOrders = [
  { id: '#ORD-001', customer: 'John Doe', email: 'john@example.com', date: '2026-06-19', total: '$120.00', status: 'Completed', items: 3 },
  { id: '#ORD-002', customer: 'Jane Smith', email: 'jane@example.com', date: '2026-06-18', total: '$45.50', status: 'Pending', items: 1 },
  { id: '#ORD-003', customer: 'Michael Johnson', email: 'mike@example.com', date: '2026-06-18', total: '$210.00', status: 'Processing', items: 5 },
  { id: '#ORD-004', customer: 'Emily Davis', email: 'emily@example.com', date: '2026-06-17', total: '$85.00', status: 'Completed', items: 2 },
  { id: '#ORD-005', customer: 'Chris Wilson', email: 'chris@example.com', date: '2026-06-16', total: '$150.00', status: 'Cancelled', items: 4 },
  { id: '#ORD-006', customer: 'Sarah Brown', email: 'sarah@example.com', date: '2026-06-16', total: '$95.00', status: 'Completed', items: 2 },
  { id: '#ORD-007', customer: 'David Lee', email: 'david@example.com', date: '2026-06-15', total: '$320.00', status: 'Processing', items: 8 },
];

export const AdminOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blush text-primary"><CheckCircle size={14} weight="fill" /> Completed</span>;
      case 'Pending':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-500"><Clock size={14} weight="fill" /> Pending</span>;
      case 'Processing':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-500"><Package size={14} weight="fill" /> Processing</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-500"><XCircle size={14} weight="fill" /> Cancelled</span>;
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
              placeholder="Search orders or customers..." 
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
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <Funnel size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors shadow-sm cursor-pointer">
          <DownloadSimple size={18} weight="bold" />
          Export CSV
        </button>
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-premium border border-primary/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blush border-b border-primary/10">
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-blush/30 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold font-['Fira_Code'] text-primary">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-dark">{order.customer}</span>
                        <span className="text-xs text-dark/50">{order.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-dark/70 font-medium">{order.date}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-dark/70">{order.items} items</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold font-['Fira_Code'] text-dark">{order.total}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-dark/50 hover:text-primary hover:bg-blush rounded-lg transition-colors cursor-pointer" title="View Details">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-dark/50 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer" title="Edit Order">
                          <PencilSimple size={18} />
                        </button>
                        <button className="p-2 text-dark/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete Order">
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
                      <p className="font-medium text-lg text-dark/70">No orders found</p>
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
            Showing <span className="font-bold text-dark">{filteredOrders.length}</span> of <span className="font-bold text-dark">{allOrders.length}</span> orders
          </span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md text-sm font-medium text-dark/40 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 rounded-md text-sm font-bold bg-primary text-white">1</button>
            <button className="px-3 py-1 rounded-md text-sm font-medium text-dark/70 hover:bg-blush transition-colors cursor-pointer">2</button>
            <button className="px-3 py-1 rounded-md text-sm font-medium text-dark/70 hover:bg-blush transition-colors cursor-pointer">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
