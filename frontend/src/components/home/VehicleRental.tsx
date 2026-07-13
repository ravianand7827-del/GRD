'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Users, IndianRupee, ArrowRight, CheckCircle } from 'lucide-react';

const vehicles = [
  {
    name: 'Tempo Traveller 9 Seater',
    slug: 'tempo-traveller-9-seater',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
    capacity: 9,
    pricePerKm: 18,
    features: ['AC', 'Push Back Seats', 'GPS', 'Music System'],
    badge: 'Most Popular',
  },
  {
    name: 'Tempo Traveller 12 Seater',
    slug: 'tempo-traveller-12-seater',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
    capacity: 12,
    pricePerKm: 20,
    features: ['AC', 'Push Back Seats', 'GPS', 'Curtains'],
    badge: null,
  },
  {
    name: 'Luxury Urbania',
    slug: 'luxury-urbania',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80',
    capacity: 17,
    pricePerKm: 28,
    features: ['Luxury AC', 'Captain Seats', 'WiFi', 'LED Lights'],
    badge: 'Premium',
  },
  {
    name: 'Innova Crysta',
    slug: 'innova-crysta',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80',
    capacity: 7,
    pricePerKm: 14,
    features: ['AC', 'Leather Seats', 'GPS', 'Charging Points'],
    badge: 'Best Value',
  },
];

export default function VehicleRental() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-brand-navy-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-brand-gold font-medium text-sm uppercase tracking-widest">Fleet</span>
          <h2 className="section-title text-brand-navy dark:text-white mt-2">
            Vehicle <span className="gold-text">Rental</span>
          </h2>
          <p className="text-gray-500 dark:text-white/60 mt-3 max-w-xl mx-auto">
            Well-maintained, GPS-enabled vehicles with professional drivers for all your travel needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, i) => (
            <motion.div
              key={vehicle.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group card-hover"
            >
              <div className="bg-white dark:bg-brand-navy rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-white/5 relative">
                {vehicle.badge && (
                  <div className="absolute top-3 left-3 z-10 bg-brand-gold text-brand-navy text-xs font-bold px-2.5 py-1 rounded-full">
                    {vehicle.badge}
                  </div>
                )}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-brand-navy dark:text-white mb-2">{vehicle.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-white/60 text-sm mb-3">
                    <Users size={14} />
                    <span>{vehicle.capacity} Seater</span>
                  </div>
                  <div className="space-y-1 mb-4">
                    {vehicle.features.slice(0, 3).map((f) => (
                      <div key={f} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/60">
                        <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xs text-gray-400">Starting</span>
                      <div className="flex items-center gap-0.5 font-bold text-brand-navy dark:text-white">
                        <IndianRupee size={13} />
                        <span>{vehicle.pricePerKm}/km</span>
                      </div>
                    </div>
                    <Link
                      href={`/vehicles/${vehicle.slug}`}
                      className="flex items-center gap-1 text-brand-gold text-sm font-medium hover:gap-2 transition-all"
                    >
                      Details <ArrowRight size={14} />
                    </Link>
                  </div>
                  <Link href={`/booking?vehicle=${vehicle.slug}`} className="btn-navy w-full text-center text-sm py-2 block">
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <Link href="/vehicles" className="btn-gold inline-flex items-center gap-2">
            View All Vehicles <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
