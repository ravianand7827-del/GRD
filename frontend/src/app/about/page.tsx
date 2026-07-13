import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, MapPin, Heart, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about GRD Travels - Delhi\'s premier travel company with 15+ years of experience in tour packages and vehicle rental.',
};

const milestones = [
  { year: '2009', event: 'GRD Travels founded in Delhi' },
  { year: '2012', event: 'Expanded fleet to 20+ vehicles' },
  { year: '2015', event: 'Launched international tour packages' },
  { year: '2018', event: 'Crossed 5,000 happy customers' },
  { year: '2021', event: 'Launched online booking platform' },
  { year: '2024', event: '10,000+ travelers served' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80" alt="About GRD Travels" fill className="object-cover opacity-20" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            About <span className="text-brand-gold">GRD Travels</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            15+ years of creating unforgettable travel experiences across India and the world
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-gold font-medium text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="section-title text-brand-navy dark:text-white mt-2 mb-6">
                Turning Dreams Into <span className="gold-text">Journeys</span>
              </h2>
              <p className="text-gray-600 dark:text-white/70 mb-4 leading-relaxed">
                Founded in 2009 in Delhi, GRD Travels started with a simple mission: to provide safe, comfortable, and affordable travel experiences to every Indian family. What began as a small vehicle rental service has grown into a full-fledged travel company serving thousands of customers annually.
              </p>
              <p className="text-gray-600 dark:text-white/70 mb-6 leading-relaxed">
                Today, we offer comprehensive tour packages to 50+ destinations across India and internationally, along with a premium fleet of vehicles for all travel needs. Our tagline "Safe Journey, Our Priority" isn't just words — it's our commitment to every traveler.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: '10,000+ Happy Travelers' },
                  { icon: MapPin, label: '50+ Destinations' },
                  { icon: Award, label: '15+ Years Experience' },
                  { icon: Heart, label: '4.9/5 Customer Rating' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                    <CheckCircle size={16} className="text-brand-gold flex-shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80" alt="Travel" width={600} height={450} className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-brand-gold text-brand-navy p-5 rounded-2xl shadow-xl">
                <div className="font-display text-3xl font-bold">15+</div>
                <div className="text-sm font-medium">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-gray-50 dark:bg-brand-navy-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title text-brand-navy dark:text-white">Our <span className="gold-text">Journey</span></h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-gold/30 -translate-x-1/2" />
            {milestones.map((m, i) => (
              <div key={m.year} className={`flex items-center gap-6 mb-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-white dark:bg-brand-navy p-4 rounded-xl shadow-md inline-block">
                    <div className="text-brand-gold font-bold text-lg">{m.year}</div>
                    <div className="text-gray-600 dark:text-white/70 text-sm">{m.event}</div>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-brand-gold border-4 border-white dark:border-brand-navy-dark flex-shrink-0 z-10" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-navy text-center">
        <h2 className="section-title text-white mb-4">Ready to <span className="text-brand-gold">Travel?</span></h2>
        <p className="text-white/60 mb-8">Let us plan your perfect journey</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/tours" className="btn-gold">Explore Tours</Link>
          <Link href="/contact" className="btn-navy border border-white/20">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
