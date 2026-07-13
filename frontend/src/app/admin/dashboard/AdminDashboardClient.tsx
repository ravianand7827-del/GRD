'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, Car, BookOpen, IndianRupee, Star, TrendingUp, Clock } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Stats {
  users: number;
  tours: number;
  vehicles: number;
  bookings: number;
  totalRevenue: number;
  pendingReviews: number;
}

const adminNavLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: TrendingUp },
  { label: 'Tours', href: '/admin/tours', icon: Package },
  { label: 'Vehicles', href: '/admin/vehicles', icon: Car },
  { label: 'Bookings', href: '/admin/bookings', icon: BookOpen },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Blogs', href: '/admin/blogs', icon: BookOpen },
  { label: 'Coupons', href: '/admin/coupons', icon: IndianRupee },
  { label: 'Gallery', href: '/admin/gallery', icon: Package },
  { label: 'Reports', href: '/admin/reports', icon: TrendingUp },
];

export default function AdminDashboardClient() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchStats();
  }, [isAuthenticated, user]);

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admin/dashboard');
      setStats(data.stats);
      setRecentBookings(data.recentBookings);
    } catch {
      setStats({ users: 0, tours: 0, vehicles: 0, bookings: 0, totalRevenue: 0, pendingReviews: 0 });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Users', value: stats?.users || 0, icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Active Tours', value: stats?.tours || 0, icon: Package, color: 'bg-green-500', change: '+5%' },
    { label: 'Vehicles', value: stats?.vehicles || 0, icon: Car, color: 'bg-purple-500', change: '0%' },
    { label: 'Total Bookings', value: stats?.bookings || 0, icon: BookOpen, color: 'bg-orange-500', change: '+18%' },
    { label: 'Revenue', value: `₹${((stats?.totalRevenue || 0) / 100000).toFixed(1)}L`, icon: IndianRupee, color: 'bg-brand-gold', change: '+24%' },
    { label: 'Pending Reviews', value: stats?.pendingReviews || 0, icon: Star, color: 'bg-red-500', change: '' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-navy-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-navy min-h-screen fixed left-0 top-0 z-40 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="font-display font-bold text-xl text-white">GRD <span className="text-brand-gold">Admin</span></div>
          <p className="text-white/40 text-xs mt-1">Management Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminNavLinks.map(link => (
            <Link key={link.label} href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-sm font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{user?.name}</p>
              <p className="text-white/40 text-xs">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-brand-navy dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-white/60 text-sm mt-1">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {statCards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-brand-navy rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${card.color}`}>
                  <card.icon size={20} className="text-white" />
                </div>
                {card.change && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${card.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {card.change}
                  </span>
                )}
              </div>
              <div className="font-display text-2xl font-bold text-brand-navy dark:text-white">{loading ? '...' : card.value}</div>
              <div className="text-gray-500 dark:text-white/60 text-sm mt-1">{card.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white dark:bg-brand-navy rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
            <h2 className="font-semibold text-brand-navy dark:text-white">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-brand-gold text-sm hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-white/5">
                <tr>
                  {['Booking ID', 'Customer', 'Type', 'Amount', 'Status', 'Date'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-white/50 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {recentBookings.length === 0 ? (
                  <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400 text-sm">No bookings yet</td></tr>
                ) : (
                  recentBookings.map((booking: any) => (
                    <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                      <td className="px-5 py-3 text-sm font-medium text-brand-gold">{booking.bookingId}</td>
                      <td className="px-5 py-3 text-sm text-gray-700 dark:text-white/70">{booking.user?.name}</td>
                      <td className="px-5 py-3 text-sm capitalize text-gray-500 dark:text-white/50">{booking.bookingType}</td>
                      <td className="px-5 py-3 text-sm font-medium text-brand-navy dark:text-white">₹{booking.pricing?.totalAmount?.toLocaleString()}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>{booking.status}</span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-500 dark:text-white/50 flex items-center gap-1">
                        <Clock size={12} />{new Date(booking.createdAt).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
