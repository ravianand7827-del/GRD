'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Users, IndianRupee, CheckCircle, ArrowRight, Filter } from 'lucide-react';
import api from '@/lib/api';

const vehicleTypes = [
  { value: '', label: 'All Vehicles' },
  { value: 'tempo-traveller', label: 'Tempo Traveller' },
  { value: 'urbania', label: 'Luxury Urbania' },
  { value: 'mini-bus', label: 'Mini Bus' },
  { value: 'volvo', label: 'Volvo Bus' },
  { value: 'suv', label: 'SUV / Innova' },
  { value: 'sedan', label: 'Sedan' },
];

const staticVehicles = [
  { _id: '1', name: 'Tempo Traveller 9 Seater', slug: 'tempo-traveller-9-seater', type: 'tempo-traveller', capacity: 9, pricing: { perKm: 18, perDay: 3500 }, features: ['AC', 'Push Back Seats', 'GPS', 'Music System'], coverImage: { url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80' }, isFeatured: true },
  { _id: '2', name: 'Tempo Traveller 12 Seater', slug: 'tempo-traveller-12-seater', type: 'tempo-traveller', capacity: 12, pricing: { perKm: 20, perDay: 4000 }, features: ['AC', 'Push Back Seats', 'GPS', 'Curtains'], coverImage: { url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80' }, isFeatured: true },
  { _id: '3', name: 'Tempo Traveller 16 Seater', slug: 'tempo-traveller-16-seater', type: 'tempo-traveller', capacity: 16, pricing: { perKm: 22, perDay: 4500 }, features: ['AC', 'Push Back Seats', 'LCD Screen', 'GPS'], coverImage: { url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80' }, isFeatured: false },
  { _id: '4', name: 'Luxury Urbania', slug: 'luxury-urbania', type: 'urbania', capacity: 17, pricing: { perKm: 28, perDay: 6000 }, features: ['Luxury AC', 'Captain Seats', 'WiFi', 'LED Lights'], coverImage: { url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80' }, isFeatured: true },
  { _id: '5', name: 'Innova Crysta', slug: 'innova-crysta', type: 'suv', capacity: 7, pricing: { perKm: 14, perDay: 2800 }, features: ['AC', 'Leather Seats', 'GPS', 'Charging Points'], coverImage: { url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80' }, isFeatured: true },
  { _id: '6', name: 'Luxury Sedan', slug: 'luxury-sedan', type: 'sedan', capacity: 4, pricing: { perKm: 10, perDay: 2000 }, features: ['AC', 'Music System', 'GPS', 'Charging Points'], coverImage: { url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80' }, isFeatured: false },
];

export default function VehiclesClient() {
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState(staticVehicles);
  const [type, setType] = useState(searchParams.get('type') || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (type) params.set('type', type);
        const { data } = await api.get(`/vehicles?${params}`);
        if (data.vehicles?.length) setVehicles(data.vehicles);
      } catch {
        // use static data
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [type]);

  const filtered = type ? vehicles.filter(v => v.type === type) : vehicles;

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-brand-navy-dark">
      <section className="py-16 bg-brand-navy text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Vehicle <span className="text-brand-gold">Rental</span>
        </h1>
        <p className="text-white/60">Premium fleet with professional drivers for all your travel needs</p>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* Filters */}
        <div className="bg-white dark:bg-brand-navy rounded-2xl p-5 mb-8 shadow-sm border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter size={16} className="text-gray-400" />
            {vehicleTypes.map(vt => (
              <button key={vt.value} onClick={() => setType(vt.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${type === vt.value ? 'bg-brand-gold text-brand-navy' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/70 hover:bg-brand-gold/20'}`}>
                {vt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((vehicle, i) => (
            <motion.div key={vehicle._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="group card-hover">
              <div className="bg-white dark:bg-brand-navy rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-white/5">
                {vehicle.isFeatured && (
                  <div className="bg-brand-gold text-brand-navy text-xs font-bold text-center py-1.5">⭐ Featured Vehicle</div>
                )}
                <div className="relative h-52 overflow-hidden">
                  <Image src={vehicle.coverImage?.url} alt={vehicle.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Users size={12} className="text-white" />
                    <span className="text-white text-xs font-medium">{vehicle.capacity} Seater</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-brand-navy dark:text-white mb-3">{vehicle.name}</h3>
                  <div className="grid grid-cols-2 gap-1.5 mb-4">
                    {vehicle.features.slice(0, 4).map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/60">
                        <CheckCircle size={11} className="text-green-500 flex-shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                    <div className="text-center">
                      <div className="flex items-center gap-0.5 font-bold text-brand-navy dark:text-white text-sm">
                        <IndianRupee size={12} />{vehicle.pricing.perKm}/km
                      </div>
                      <div className="text-xs text-gray-400">Per KM</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
                    <div className="text-center">
                      <div className="flex items-center gap-0.5 font-bold text-brand-navy dark:text-white text-sm">
                        <IndianRupee size={12} />{vehicle.pricing.perDay.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">Per Day</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/booking?vehicle=${vehicle.slug}`} className="flex-1 btn-gold text-center text-sm py-2.5">Book Now</Link>
                    <Link href={`/vehicles/${vehicle.slug}`} className="flex items-center gap-1 px-3 py-2.5 border border-brand-gold text-brand-gold rounded-full text-sm hover:bg-brand-gold hover:text-brand-navy transition-all">
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
