'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Heart, Mountain, Church, Crown, Users, Briefcase, Sunrise, Baby } from 'lucide-react';

const categories = [
  { icon: Baby, label: 'Family Tour', href: '/tours?category=family', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { icon: Heart, label: 'Honeymoon', href: '/tours?category=honeymoon', color: 'from-pink-500 to-rose-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
  { icon: Mountain, label: 'Adventure', href: '/tours?category=adventure', color: 'from-green-500 to-emerald-600', bg: 'bg-green-50 dark:bg-green-900/20' },
  { icon: Church, label: 'Pilgrimage', href: '/tours?category=pilgrimage', color: 'from-orange-500 to-amber-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { icon: Crown, label: 'Luxury', href: '/tours?category=luxury', color: 'from-yellow-500 to-brand-gold', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { icon: Users, label: 'Group Tour', href: '/tours?category=group', color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { icon: Briefcase, label: 'Corporate', href: '/tours?category=corporate', color: 'from-slate-500 to-gray-600', bg: 'bg-slate-50 dark:bg-slate-900/20' },
  { icon: Sunrise, label: 'Weekend Trips', href: '/tours?category=weekend', color: 'from-cyan-500 to-teal-600', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
];

export default function TourCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-brand-navy">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-brand-gold font-medium text-sm uppercase tracking-widest">What We Offer</span>
          <h2 className="section-title text-brand-navy dark:text-white mt-2">
            Tour <span className="gold-text">Categories</span>
          </h2>
          <p className="text-gray-500 dark:text-white/60 mt-3 max-w-xl mx-auto">
            Choose from our wide range of specially curated tour categories
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                href={cat.href}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl ${cat.bg} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <cat.icon size={22} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-center text-gray-700 dark:text-white/80 leading-tight">{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
