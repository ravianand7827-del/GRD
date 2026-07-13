'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Send } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  enquiryType: z.string().min(1, 'Please select enquiry type'),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/contact', data);
      toast.success('Message sent! We\'ll get back to you within 24 hours.');
      reset();
    } catch {
      toast.error('Failed to send message. Please try again or call us directly.');
    }
  };

  return (
    <div className="bg-white dark:bg-brand-navy p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
      <h2 className="font-display text-2xl font-bold text-brand-navy dark:text-white mb-6">Send Us a Message</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Full Name *</label>
            <input {...register('name')} placeholder="Your full name" className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Email Address *</label>
            <input {...register('email')} type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Phone Number *</label>
            <input {...register('phone')} type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Enquiry Type *</label>
            <select {...register('enquiryType')} className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm">
              <option value="">Select type</option>
              <option value="Tour Package">Tour Package</option>
              <option value="Vehicle Rental">Vehicle Rental</option>
              <option value="Corporate Travel">Corporate Travel</option>
              <option value="Wedding Transport">Wedding Transport</option>
              <option value="Custom Package">Custom Package</option>
              <option value="General">General Enquiry</option>
            </select>
            {errors.enquiryType && <p className="text-red-500 text-xs mt-1">{errors.enquiryType.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Subject *</label>
          <input {...register('subject')} placeholder="How can we help you?" className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Message *</label>
          <textarea {...register('message')} rows={5} placeholder="Tell us about your travel plans, dates, group size, and any special requirements..." className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm resize-none" />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-gold w-full flex items-center justify-center gap-2">
          <Send size={16} />
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
