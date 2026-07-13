'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Users, Star, CheckCircle, XCircle, IndianRupee, Phone, MessageCircle, Calendar, MapPin } from 'lucide-react';
import api from '@/lib/api';

interface Tour {
  _id: string;
  title: string;
  description: string;
  destination: string;
  duration: { days: number; nights: number };
  price: { adult: number; child: number };
  coverImage: { url: string };
  images: { url: string; alt: string }[];
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  rating: number;
  reviewCount: number;
  category: string;
}

// Static fallback data
const staticTours: Record<string, Partial<Tour>> = {
  'kashmir-paradise-tour': {
    title: 'Kashmir Paradise Tour', destination: 'Kashmir', description: 'Experience the heaven on earth with our premium Kashmir tour package.',
    duration: { days: 7, nights: 6 }, price: { adult: 18999, child: 12999 },
    coverImage: { url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&q=80' },
    highlights: ['Shikara ride on Dal Lake', 'Gulmarg Gondola ride', 'Pahalgam valley visit', 'Mughal Gardens tour'],
    inclusions: ['Accommodation in 3-star hotels', 'Daily breakfast & dinner', 'AC vehicle transfers', 'Experienced guide'],
    exclusions: ['Airfare', 'Personal expenses', 'Adventure activities', 'Lunch'],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar', description: 'Arrive at Srinagar airport, transfer to houseboat on Dal Lake. Evening Shikara ride.' },
      { day: 2, title: 'Srinagar Sightseeing', description: 'Visit Mughal Gardens - Shalimar Bagh, Nishat Bagh, Chashme Shahi. Evening at Dal Lake.' },
      { day: 3, title: 'Gulmarg Excursion', description: 'Day trip to Gulmarg. Gondola ride to Kongdori. Snow activities in winter.' },
      { day: 4, title: 'Pahalgam', description: 'Drive to Pahalgam - Valley of Shepherds. Visit Betaab Valley, Aru Valley.' },
      { day: 5, title: 'Sonamarg', description: 'Excursion to Sonamarg - Meadow of Gold. Thajiwas Glacier visit.' },
      { day: 6, title: 'Srinagar Local', description: 'Visit Shankaracharya Temple, local markets, handicraft shopping.' },
      { day: 7, title: 'Departure', description: 'Transfer to Srinagar airport for departure. Tour ends.' },
    ],
    rating: 4.9, reviewCount: 124,
  },
};

export default function TourDetailClient({ slug }: { slug: string }) {
  const [tour, setTour] = useState<Partial<Tour> | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await api.get(`/tours/${slug}`);
        setTour(data.tour);
      } catch {
        setTour(staticTours[slug] || null);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [slug]);

  if (loading) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!tour) return (
    <div className="pt-20 min-h-screen flex items-center justify-center text-center">
      <div>
        <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-4">Tour not found</h2>
        <Link href="/tours" className="btn-gold">Browse All Tours</Link>
      </div>
    </div>
  );

  const totalPrice = (tour.price?.adult || 0) * adults + (tour.price?.child || 0) * children;

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image src={tour.coverImage?.url || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200'} alt={tour.title || ''} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <span className="text-brand-gold text-sm font-medium capitalize bg-brand-gold/20 px-3 py-1 rounded-full">{tour.category}</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mt-3 mb-2">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1"><MapPin size={14} />{tour.destination}</span>
              <span className="flex items-center gap-1"><Clock size={14} />{tour.duration?.days}D/{tour.duration?.nights}N</span>
              <span className="flex items-center gap-1"><Star size={14} className="text-brand-gold fill-brand-gold" />{tour.rating} ({tour.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-brand-navy p-1 rounded-xl mb-6 overflow-x-auto">
              {['overview', 'itinerary', 'inclusions'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium capitalize transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white dark:bg-brand-navy-light text-brand-navy dark:text-white shadow-sm' : 'text-gray-500 dark:text-white/60'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6">{tour.description}</p>
                {tour.highlights && (
                  <div>
                    <h3 className="font-semibold text-brand-navy dark:text-white mb-3">Tour Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tour.highlights.map(h => (
                        <div key={h} className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                          <CheckCircle size={14} className="text-brand-gold flex-shrink-0" />{h}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'itinerary' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {tour.itinerary?.map(day => (
                  <div key={day.day} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center">
                      <span className="text-brand-gold font-bold text-sm">D{day.day}</span>
                    </div>
                    <div className="flex-1 pb-4 border-b border-gray-100 dark:border-white/5">
                      <h4 className="font-semibold text-brand-navy dark:text-white mb-1">{day.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-white/60">{day.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'inclusions' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-600 mb-3 flex items-center gap-2"><CheckCircle size={16} />Inclusions</h3>
                  <ul className="space-y-2">
                    {tour.inclusions?.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/70">
                        <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-500 mb-3 flex items-center gap-2"><XCircle size={16} />Exclusions</h3>
                  <ul className="space-y-2">
                    {tour.exclusions?.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/70">
                        <XCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-brand-navy rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 overflow-hidden">
              <div className="bg-brand-navy p-5">
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-sm">Starting from</span>
                </div>
                <div className="flex items-center gap-1 text-brand-gold">
                  <IndianRupee size={20} />
                  <span className="font-display text-3xl font-bold">{tour.price?.adult?.toLocaleString()}</span>
                  <span className="text-white/60 text-sm">/person</span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Travel Date</label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="date" className="w-full pl-9 pr-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:border-brand-gold" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Adults</label>
                    <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 text-sm">-</button>
                      <span className="flex-1 text-center text-sm font-medium">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 text-sm">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Children</label>
                    <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 text-sm">-</button>
                      <span className="flex-1 text-center text-sm font-medium">{children}</span>
                      <button onClick={() => setChildren(children + 1)} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 text-sm">+</button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-white/10 pt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-white/60">Adults ({adults} × ₹{tour.price?.adult?.toLocaleString()})</span>
                    <span className="font-medium">₹{((tour.price?.adult || 0) * adults).toLocaleString()}</span>
                  </div>
                  {children > 0 && (
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500 dark:text-white/60">Children ({children} × ₹{tour.price?.child?.toLocaleString()})</span>
                      <span className="font-medium">₹{((tour.price?.child || 0) * children).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-brand-navy dark:text-white mt-2 pt-2 border-t border-gray-100 dark:border-white/10">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <Link href={`/booking?tour=${slug}&adults=${adults}&children=${children}`} className="btn-gold w-full text-center block">
                  Book Now
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <a href="tel:+918595995437" className="flex items-center justify-center gap-1.5 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-sm hover:border-brand-gold transition-colors">
                    <Phone size={14} className="text-brand-gold" /> Call Us
                  </a>
                  <a href={`https://wa.me/918595995437?text=I'm interested in ${tour.title}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-sm hover:border-green-500 transition-colors">
                    <MessageCircle size={14} className="text-green-500" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
