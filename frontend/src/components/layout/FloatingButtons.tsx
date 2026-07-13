'use client';

import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingButtons() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918595995437';
  const phone = process.env.NEXT_PUBLIC_PHONE_1 || '8595995437';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=Hello! I'm interested in booking a tour with GRD Travels.`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 hover:shadow-green-500/60 transition-shadow animate-pulse-gold"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
      </motion.a>

      {/* Call */}
      <motion.a
        href={`tel:+91${phone}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center shadow-lg shadow-brand-gold/40 hover:shadow-brand-gold/60 transition-shadow"
        aria-label="Call us"
      >
        <Phone size={22} className="text-brand-navy" />
      </motion.a>
    </div>
  );
}
