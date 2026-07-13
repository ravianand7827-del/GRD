'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Shield, MapPin, Sparkles, Sofa, IndianRupee, Package, Users } from 'lucide-react';

const features = [
  { icon: Clock, title: '24x7 Support', desc: 'Round-the-clock customer support for all your travel needs', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { icon: Shield, title: 'Professional Drivers', desc: 'Verified, experienced drivers with clean track records', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  { icon: MapPin, title: 'GPS Enabled', desc: 'All vehicles equipped with real-time GPS tracking', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { icon: Sparkles, title: 'Sanitized Vehicles', desc: 'Thoroughly cleaned and sanitized before every trip', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
  { icon: Sofa, title: 'Luxury Interiors', desc: 'Premium seating and interiors for maximum comfort', color: 'text-brand-gold', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { icon: IndianRupee, title: 'Affordable Prices', desc: 'Best prices guaranteed with no hidden charges', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: Package, title: 'Custom Packages', desc: 'Tailor-made packages to suit your budget and preferences', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { icon: Users, title: 'Experienced Team', desc: '15+ years of expertise in travel and tourism', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-brand-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-navy/5 dark:bg-brand-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-brand-gold font-medium text-sm uppercase tracking-widest">Our Promise</span>
          <h2 className="section-title text-brand-navy dark:text-white mt-2">
            Why Choose <span className="gold-text">GRD Travels</span>
          </h2>
          <p className="text-gray-500 dark:text-white/60 mt-3 max-w-xl mx-auto">
            We go above and beyond to ensure your journey is safe, comfortable, and memorable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`p-6 rounded-2xl ${feature.bg} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-white dark:bg-brand-navy shadow-sm mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon size={24} />
              </div>
              <h3 className="font-semibold text-brand-navy dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 dark:text-white/60 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
