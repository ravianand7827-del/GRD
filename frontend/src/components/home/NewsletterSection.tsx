'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Subscribed! You\'ll receive our best travel deals.');
    setEmail('');
    setLoading(false);
  };

  return (
    <section ref={ref} className="py-20 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-gradient opacity-5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
          <div className="inline-flex p-4 rounded-2xl bg-brand-gold/10 mb-6">
            <Mail size={32} className="text-brand-gold" />
          </div>
          <h2 className="section-title text-white mb-3">
            Get Exclusive <span className="text-brand-gold">Travel Deals</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Subscribe to our newsletter and get early access to special offers, new packages, and travel tips.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-brand-gold"
              required
            />
            <button type="submit" disabled={loading} className="btn-gold flex items-center justify-center gap-2 whitespace-nowrap">
              <Send size={16} />
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          <p className="text-white/30 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
