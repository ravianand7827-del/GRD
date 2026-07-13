'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Clock, Star } from 'lucide-react';

const destinations = [
  { name: 'Kashmir', slug: 'kashmir-paradise-tour', image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80', duration: '7D/6N', rating: 4.9 },
  { name: 'Manali', slug: 'manali-adventure-tour', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80', duration: '5D/4N', rating: 4.8 },
  { name: 'Goa', slug: 'goa-beach-holiday', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80', duration: '5D/4N', rating: 4.7 },
  { name: 'Kerala', slug: 'kerala-backwaters-escape', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80', duration: '6D/5N', rating: 4.9 },
  { name: 'Rajasthan', slug: 'rajasthan-royal-heritage', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80', duration: '8D/7N', rating: 4.8 },
  { name: 'Leh Ladakh', slug: 'leh-ladakh-expedition', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', duration: '8D/7N', rating: 5.0 },
  { name: 'Andaman', slug: 'andaman-island-paradise', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80', duration: '6D/5N', rating: 4.9 },
  { name: 'Dubai', slug: 'dubai-luxury-experience', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', duration: '5D/4N', rating: 4.8 },
  { name: 'Thailand', slug: 'thailand-tropical-escape', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', duration: '7D/6N', rating: 4.7 },
  { name: 'Shimla', slug: 'shimla-kullu-manali', image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600&q=80', duration: '7D/6N', rating: 4.6 },
];

export default function PopularDestinations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-brand-navy-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-brand-navy dark:text-white mt-2">
            Popular <span className="gold-text">Destinations</span>
          </h2>
          <p className="text-gray-500 dark:text-white/60 mt-3 max-w-xl mx-auto">
            Handpicked destinations with curated experiences for every type of traveler
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group card-hover"
            >
              <div className="bg-white dark:bg-brand-navy rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-white/5">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star size={12} className="text-brand-gold fill-brand-gold" />
                    <span className="text-white text-xs font-medium">{dest.rating}</span>
                  </div>
                  {/* Name overlay */}
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-white font-display font-bold text-xl">{dest.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center gap-1 text-gray-500 dark:text-white/60 text-sm">
                      <Clock size={14} />
                      <span>{dest.duration}</span>
                    </div>
                  </div>


                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
