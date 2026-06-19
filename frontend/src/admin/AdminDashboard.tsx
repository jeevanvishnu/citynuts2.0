import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../redux/hooks';
import { logoutAdmin } from '../redux/slices/adminAuthSlice';
import {
  ChartLineUp,
  Users,
  ShoppingCart,
  CurrencyDollar,
  List,
  SignOut,
  Bell,
  Package,
  TrendUp,
  TrendDown,
  Tag
} from '@phosphor-icons/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { AdminOrders } from './AdminOrders';
import { AdminCategory } from './AdminCategory';
import { AdminProducts } from './AdminProducts';
import { AdminCustomers } from './AdminCustomers';

const revenueData = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 2000, orders: 12 },
  { name: 'Thu', revenue: 2780, orders: 20 },
  { name: 'Fri', revenue: 1890, orders: 10 },
  { name: 'Sat', revenue: 2390, orders: 15 },
  { name: 'Sun', revenue: 3490, orders: 22 },
];

const categoryData = [
  { name: 'Almonds', sales: 4000 },
  { name: 'Cashews', sales: 3000 },
  { name: 'Pistachios', sales: 2000 },
  { name: 'Dates', sales: 2780 },
  { name: 'Walnuts', sales: 1890 },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', date: '2026-06-19', total: '$120.00', status: 'Completed' },
  { id: '#ORD-002', customer: 'Jane Smith', date: '2026-06-18', total: '$45.50', status: 'Pending' },
  { id: '#ORD-003', customer: 'Michael Johnson', date: '2026-06-18', total: '$210.00', status: 'Processing' },
  { id: '#ORD-004', customer: 'Emily Davis', date: '2026-06-17', total: '$85.00', status: 'Completed' },
];

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await dispatch(logoutAdmin()).unwrap();
      toast.success("Admin logged out successfully!");
      navigate('/admin-login');
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  const menuItems = [
    { name: 'Overview', icon: ChartLineUp },
    { name: 'Category', icon: Tag },
    { name: 'Products', icon: Package },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Customers', icon: Users },
  ];

  return (
    <div className="flex h-screen w-full bg-blush font-sans overflow-hidden text-dark">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-white border-r border-primary/20 h-full flex flex-col shadow-sm z-20 shrink-0"
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-primary/20">
          {isSidebarOpen && (
            <span className="font-bold text-xl text-primary tracking-tight truncate">
              Admin<span className="text-dark">Panel</span>
            </span>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-dark/50 hover:text-primary transition-colors p-1 cursor-pointer"
          >
            <List size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === item.name
                  ? 'bg-primary text-white shadow-md'
                  : 'text-dark/70 hover:bg-blush hover:text-primary'
              }`}
            >
              <item.icon size={22} weight={activeTab === item.name ? 'fill' : 'regular'} />
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-primary/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-dark/70 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
          >
            <SignOut size={22} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-primary/20 flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
          <h1 className="text-xl font-bold text-primary">{activeTab}</h1>
          <div className="flex items-center gap-6">
            <button className="relative text-dark/60 hover:text-primary transition-colors cursor-pointer p-2">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-primary/20 pl-6">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-dark">Admin User</p>
                <p className="text-xs text-dark/50">Superadmin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {activeTab === 'Overview' && (
              <>
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Revenue', value: '$45,231.89', icon: CurrencyDollar, trend: '+20.1%', isUp: true, color: 'bg-blush text-primary' },
                { title: 'Orders', value: '3,204', icon: ShoppingCart, trend: '+12.5%', isUp: true, color: 'bg-blue-50 text-blue-500' },
                { title: 'Customers', value: '12,402', icon: Users, trend: '+4.3%', isUp: true, color: 'bg-purple-50 text-purple-500' },
                { title: 'Conversion Rate', value: '3.8%', icon: ChartLineUp, trend: '-1.2%', isUp: false, color: 'bg-amber-50 text-amber-500' },
              ].map((kpi, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-premium border border-primary/10 flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-dark/60 font-medium mb-1">{kpi.title}</p>
                      <h3 className="text-2xl font-bold font-['Fira_Code'] text-dark">{kpi.value}</h3>
                    </div>
                    <div className={`p-3 rounded-xl ${kpi.color}`}>
                      <kpi.icon size={24} weight="duotone" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`flex items-center gap-1 text-sm font-bold ${kpi.isUp ? 'text-primary' : 'text-red-500'}`}>
                      {kpi.isUp ? <TrendUp size={16} /> : <TrendDown size={16} />}
                      {kpi.trend}
                    </span>
                    <span className="text-xs text-dark/40">vs last month</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Line Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-2xl shadow-premium border border-primary/10 lg:col-span-2"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-dark">Revenue Trend</h3>
                  <select className="bg-blush border border-primary/20 text-dark text-sm rounded-lg px-3 py-1.5 outline-none focus:border-primary">
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                  </select>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FFB6C1" opacity={0.3} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#2D2D2D', fontSize: 12, opacity: 0.6 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#2D2D2D', fontSize: 12, opacity: 0.6 }} dx={-10} tickFormatter={(val) => `$${val}`} />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,107,157,0.2)', backgroundColor: '#ffffff', color: '#2D2D2D', boxShadow: '0 8px 30px rgba(255,182,193,0.2)' }}
                        itemStyle={{ fontFamily: 'Fira Code' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                      <Line type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#FF6B9D" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#ffffff' }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="orders" name="Orders" stroke="#2D2D2D" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#ffffff' }} opacity={0.8} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Bar Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-premium border border-primary/10"
              >
                <h3 className="text-lg font-bold text-dark mb-6">Sales by Category</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#FFB6C1" opacity={0.3} />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#2D2D2D', fontSize: 12, opacity: 0.6 }} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#2D2D2D', fontSize: 12, fontWeight: 600 }} />
                      <Tooltip cursor={{ fill: '#FFF0F5' }} contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,107,157,0.2)', backgroundColor: '#ffffff', color: '#2D2D2D', boxShadow: '0 8px 30px rgba(255,182,193,0.2)' }} />
                      <Bar dataKey="sales" fill="#FF6B9D" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Recent Orders Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-premium border border-primary/10 overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-primary/10 flex justify-between items-center bg-white">
                <h3 className="text-lg font-bold text-dark">Recent Orders</h3>
                <button className="text-sm font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blush">
                      <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-4 text-xs font-bold text-dark/70 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-blush/50 transition-colors cursor-pointer group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-bold font-['Fira_Code'] text-dark">{order.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-dark/80">{order.customer}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-dark/60">{order.date}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-bold font-['Fira_Code'] text-primary">{order.total}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            order.status === 'Completed' ? 'bg-blush text-primary' :
                            order.status === 'Pending' ? 'bg-amber-50 text-amber-500' :
                            'bg-blue-50 text-blue-500'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
              </>
            )}

            {activeTab === 'Orders' && (
              <AdminOrders />
            )}

            {activeTab === 'Category' && (
              <AdminCategory />
            )}

            {activeTab === 'Products' && (
              <AdminProducts />
            )}

            {activeTab === 'Customers' && (
              <AdminCustomers />
            )}

          </div>
        </div>
      </main>
    </div>
  );
};
