'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, MapPin, Star, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Travelers', color: 'text-blue-400' },
  { icon: MapPin, value: 50, suffix: '+', label: 'Destinations', color: 'text-green-400' },
  { icon: Star, value: 4.9, suffix: '/5', label: 'Average Rating', color: 'text-brand-gold' },
  { icon: Award, value: 15, suffix: '+', label: 'Years Experience', color: 'text-purple-400' },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="font-display text-3xl md:text-4xl font-bold text-white">
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value.toLocaleString()}{suffix}
        </motion.span>
      ) : '0'}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark via-brand-navy to-brand-navy-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className={`inline-flex p-3 rounded-2xl bg-white/5 mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon size={28} />
              </div>
              <CountUp value={stat.value} suffix={stat.suffix} />
              <p className="text-white/60 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
