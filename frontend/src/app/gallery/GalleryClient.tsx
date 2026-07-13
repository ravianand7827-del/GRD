'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

const categories = ['All', 'Destinations', 'Vehicles', 'Customers', 'Events'];

const images = [
  { src: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80', alt: 'Kashmir', category: 'Destinations' },
  { src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80', alt: 'Goa Beach', category: 'Destinations' },
  { src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', alt: 'Kerala', category: 'Destinations' },
  { src: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80', alt: 'Rajasthan', category: 'Destinations' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Ladakh', category: 'Destinations' },
  { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', alt: 'Andaman', category: 'Destinations' },
  { src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', alt: 'Dubai', category: 'Destinations' },
  { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', alt: 'Thailand', category: 'Destinations' },
  { src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80', alt: 'Tempo Traveller', category: 'Vehicles' },
  { src: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80', alt: 'Luxury Bus', category: 'Vehicles' },
  { src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80', alt: 'Innova Crysta', category: 'Vehicles' },
  { src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80', alt: 'Sedan', category: 'Vehicles' },
];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === 'All' ? images : images.filter(img => img.category === activeCategory);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-brand-navy-dark">
      <section className="py-16 bg-brand-navy text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Travel <span className="text-brand-gold">Gallery</span>
        </h1>
        <p className="text-white/60">Memories from our journeys across India and the world</p>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* Filter */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-brand-gold text-brand-navy' : 'bg-white dark:bg-brand-navy text-gray-600 dark:text-white/70 hover:bg-brand-gold/20 shadow-sm'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div key={img.src} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setLightbox(img.src)}>
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="25vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}>
            <button className="absolute top-4 right-4 text-white hover:text-brand-gold"><X size={28} /></button>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
              onClick={e => e.stopPropagation()}>
              <Image src={lightbox} alt="Gallery" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
