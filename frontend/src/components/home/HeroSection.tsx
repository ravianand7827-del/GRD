'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, ChevronDown, Plane, Car, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

const tabs = [
  { id: 'tours', label: 'Tour Packages', icon: Package },
  { id: 'vehicles', label: 'Vehicle Rental', icon: Car },
  { id: 'flights', label: 'Destinations', icon: Plane },
];

const heroImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=80',
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=80',
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('tours');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('2');
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (date) params.set('date', date);
    if (passengers) params.set('passengers', passengers);
    router.push(`/${activeTab === 'tours' ? 'tours' : 'vehicles'}?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImages[0]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/60 to-brand-navy/90" />
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-gold/40 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [-20, 20, -20], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-brand-gold text-sm font-medium mb-6"
        >
          <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
          India's Premium Travel Partner
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
        >
          Discover the World
          <br />
          <span className="text-brand-gold">Your Way</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Premium tour packages & vehicle rentals across India and beyond.
          <br className="hidden md:block" /> Safe Journey, Our Priority.
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/30'
                    : 'glass text-white hover:bg-white/20'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="glass rounded-2xl p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Destination */}
              <div className="md:col-span-1 relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold" />
                <input
                  type="text"
                  placeholder={activeTab === 'vehicles' ? 'Pickup Location' : 'Destination'}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-brand-gold text-sm"
                />
              </div>

              {/* Date */}
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-brand-gold text-sm [color-scheme:dark]"
                />
              </div>

              {/* Passengers */}
              <div className="relative">
                <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-brand-gold text-sm appearance-none [color-scheme:dark]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'].map((n) => (
                    <option key={n} value={n} className="bg-brand-navy">{n} {Number(n) === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="btn-gold flex items-center justify-center gap-2 py-3 text-sm font-semibold"
              >
                <Search size={16} />
                Search Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {[
            { value: '10,000+', label: 'Happy Travelers' },
            { value: '500+', label: 'Tour Packages' },
            { value: '50+', label: 'Destinations' },
            { value: '15+', label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-brand-gold font-display">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
