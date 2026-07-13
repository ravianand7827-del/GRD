'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, IndianRupee, Star, Filter, Search, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

const categories = [
  { value: '', label: 'All Tours' },
  { value: 'domestic', label: 'Domestic' },
  { value: 'international', label: 'International' },
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'pilgrimage', label: 'Pilgrimage' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'weekend', label: 'Weekend' },
];

interface Tour {
  _id: string;
  title: string;
  slug: string;
  destination: string;
  duration: { days: number; nights: number };
  price: { adult: number };
  coverImage: { url: string };
  rating: number;
  reviewCount: number;
  category: string;
  isFeatured: boolean;
}

export default function ToursClient() {
  const searchParams = useSearchParams();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [search, setSearch] = useState(searchParams.get('destination') || '');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTours();
  }, [category, page]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '12' });
      if (category) params.set('category', category);
      if (search) params.set('destination', search);
      const { data } = await api.get(`/tours?${params}`);
      setTours(data.tours);
      setTotalPages(data.pages);
    } catch {
      // Use static data as fallback
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-brand-navy-dark">
      {/* Header */}
      <section className="py-16 bg-brand-navy text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Tour <span className="text-brand-gold">Packages</span>
        </h1>
        <p className="text-white/60">Discover handpicked tours for every type of traveler</p>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* Filters */}
        <div className="bg-white dark:bg-brand-navy rounded-2xl p-5 mb-8 shadow-sm border border-gray-100 dark:border-white/5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchTours()}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={16} className="text-gray-400" />
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => { setCategory(cat.value); setPage(1); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat.value
                      ? 'bg-brand-gold text-brand-navy'
                      : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/70 hover:bg-brand-gold/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-brand-navy rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-200 dark:bg-white/10" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded" />
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-white/50 text-lg">No tours found. Try different filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tours.map((tour, i) => (
              <motion.div
                key={tour._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group card-hover"
              >
                <div className="bg-white dark:bg-brand-navy rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-white/5">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={tour.coverImage?.url || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600'} alt={tour.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {tour.isFeatured && (
                      <div className="absolute top-3 left-3 bg-brand-gold text-brand-navy text-xs font-bold px-2.5 py-1 rounded-full">Featured</div>
                    )}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star size={11} className="text-brand-gold fill-brand-gold" />
                      <span className="text-white text-xs">{tour.rating || '4.8'}</span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white/80 text-xs bg-black/30 px-2 py-0.5 rounded-full capitalize">{tour.category}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-brand-navy dark:text-white mb-1 text-sm leading-snug">{tour.title}</h3>
                    <p className="text-gray-400 text-xs mb-3">{tour.destination}</p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-gray-500 dark:text-white/60 text-xs">
                        <Clock size={12} />
                        <span>{tour.duration?.days}D/{tour.duration?.nights}N</span>
                      </div>
                      <div className="flex items-center gap-0.5 font-bold text-brand-navy dark:text-white text-sm">
                        <IndianRupee size={12} />
                        <span>{tour.price?.adult?.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/tours/${tour.slug}`} className="flex-1 btn-navy text-center text-xs py-2">Book Now</Link>
                      <Link href={`/tours/${tour.slug}`} className="flex items-center gap-1 px-3 py-2 border border-brand-gold text-brand-gold rounded-full text-xs hover:bg-brand-gold hover:text-brand-navy transition-all">
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                  page === i + 1 ? 'bg-brand-gold text-brand-navy' : 'bg-white dark:bg-brand-navy text-gray-600 dark:text-white/70 hover:bg-brand-gold/20'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
