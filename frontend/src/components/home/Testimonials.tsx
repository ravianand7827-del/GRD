'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Rahul Sharma', location: 'Delhi', rating: 5, text: 'Amazing experience with GRD Travels! Our Kashmir trip was perfectly organized. The driver was professional and the hotels were excellent. Highly recommended!', tour: 'Kashmir Tour' },
  { name: 'Priya Mehta', location: 'Noida', rating: 5, text: 'Booked a 12-seater Tempo Traveller for our family trip to Manali. The vehicle was clean, AC was perfect and driver was very helpful. Will book again!', tour: 'Manali Trip' },
  { name: 'Amit Gupta', location: 'Gurgaon', rating: 5, text: 'GRD Travels made our honeymoon in Kerala absolutely magical. Every detail was taken care of. The houseboat experience was unforgettable!', tour: 'Kerala Honeymoon' },
  { name: 'Sunita Verma', location: 'Faridabad', rating: 4, text: 'Great service for our corporate team outing to Rajasthan. 20 people, everything was smooth. The Urbania was very comfortable for long drives.', tour: 'Rajasthan Corporate' },
  { name: 'Vikram Singh', location: 'Delhi', rating: 5, text: 'Booked Leh Ladakh package and it was the trip of a lifetime. GRD team handled all permits, oxygen cylinders, everything. True professionals!', tour: 'Leh Ladakh' },
  { name: 'Neha Joshi', location: 'Dwarka', rating: 5, text: 'Excellent Goa package at very affordable price. Beach resort was beautiful, all transfers were on time. Customer support was very responsive.', tour: 'Goa Holiday' },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-gradient opacity-80" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-brand-gold font-medium text-sm uppercase tracking-widest">Reviews</span>
          <h2 className="section-title text-white mt-2">
            What Our <span className="text-brand-gold">Travelers Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="text-brand-gold fill-brand-gold" />
            ))}
            <span className="text-white/70 text-sm ml-1">4.9/5 from 500+ reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:bg-white/15 transition-colors"
            >
              <Quote size={28} className="text-brand-gold/40 mb-3" />
              <p className="text-white/80 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={12} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-white/40 text-xs mt-0.5">{t.tour}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
