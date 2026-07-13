'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How do I book a tour package with GRD Travels?', a: 'You can book online through our website by selecting your desired package, choosing dates, and completing payment. You can also call us at +91 8595995437 or WhatsApp us for assistance.' },
  { q: 'What vehicles are available for rental?', a: 'We offer Tempo Travellers (9, 12, 16, 17 seater), Luxury Urbania, Mini Bus, Volvo Bus, Luxury Coach, Innova Crysta, SUVs, and Sedans. All vehicles are AC-equipped with GPS tracking.' },
  { q: 'Are your drivers verified and professional?', a: 'Yes, all our drivers are police-verified, licensed professionals with 5+ years of experience. They are trained in first aid and customer service.' },
  { q: 'What is your cancellation and refund policy?', a: 'Cancellations made 15+ days before travel get 90% refund. 7-14 days: 70% refund. 3-6 days: 50% refund. Less than 3 days: no refund. Refunds are processed within 7 working days.' },
  { q: 'Do you provide customized tour packages?', a: 'Absolutely! We specialize in custom packages tailored to your budget, preferences, and group size. Contact us with your requirements and we\'ll create a perfect itinerary.' },
  { q: 'Is GST included in the tour price?', a: 'Tour prices shown are exclusive of GST. 5% GST is applicable on tour packages. The final amount including GST is shown at checkout before payment.' },
  { q: 'Do you arrange visa assistance for international tours?', a: 'Yes, we provide visa assistance and documentation guidance for all international destinations. Visa fees are charged separately as per actual government fees.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major payment methods including Credit/Debit Cards, Net Banking, UPI, Razorpay, and Stripe. EMI options are also available on select packages.' },
];

export default function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-brand-navy-dark">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <span className="text-brand-gold font-medium text-sm uppercase tracking-widest">Help Center</span>
          <h2 className="section-title text-brand-navy dark:text-white mt-2">
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              className="bg-white dark:bg-brand-navy rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-brand-navy dark:text-white pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`text-brand-gold flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-5 pb-5 text-gray-500 dark:text-white/60 text-sm leading-relaxed border-t border-gray-100 dark:border-white/5 pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
