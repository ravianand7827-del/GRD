'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  message: z.string().min(10, 'Message required'),
});

type FormData = z.infer<typeof schema>;

export default function QuickEnquiry() {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/contact', { ...data, enquiryType: 'Quick Enquiry' });
      toast.success('Enquiry sent! We\'ll contact you soon.');
      reset();
      setIsOpen(false);
    } catch {
      toast.error('Failed to send. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-28 right-6 z-50 w-80 bg-white dark:bg-brand-navy rounded-2xl shadow-2xl border border-brand-gold/20 overflow-hidden"
        >
          <div className="bg-brand-navy p-4 flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold">Quick Enquiry</h3>
              <p className="text-white/60 text-xs">We'll call you back in 30 mins!</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-3">
            {[
              { name: 'name', placeholder: 'Your Name', type: 'text' },
              { name: 'email', placeholder: 'Email Address', type: 'email' },
              { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
            ].map((field) => (
              <div key={field.name}>
                <input
                  {...register(field.name as keyof FormData)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold"
                />
                {errors[field.name as keyof FormData] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field.name as keyof FormData]?.message}</p>
                )}
              </div>
            ))}
            <textarea
              {...register('message')}
              placeholder="Your message..."
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold resize-none"
            />
            {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
            <button type="submit" disabled={isSubmitting} className="btn-gold w-full flex items-center justify-center gap-2 text-sm py-2.5">
              <Send size={14} />
              {isSubmitting ? 'Sending...' : 'Send Enquiry'}
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
