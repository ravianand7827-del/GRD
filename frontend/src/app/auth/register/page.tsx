'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, Plane } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuthStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.name, data.email, data.password, data.phone);
      toast.success('Account created! Welcome to GRD Travels.');
      router.push('/');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const fields = [
    { name: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Your full name' },
    { name: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'your@email.com' },
    { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+91 XXXXX XXXXX' },
    { name: 'password', label: 'Password', icon: Lock, type: 'password', placeholder: 'Min 6 characters' },
    { name: 'confirmPassword', label: 'Confirm Password', icon: Lock, type: 'password', placeholder: 'Repeat password' },
  ];

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-gradient opacity-90" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white dark:bg-brand-navy-light rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-brand-navy p-8 text-center">
          <div className="w-14 h-14 bg-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plane size={24} className="text-brand-navy rotate-45" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Create Account</h1>
          <p className="text-white/60 text-sm mt-1">Join GRD Travels today</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">{field.label}</label>
                <div className="relative">
                  <field.icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input {...register(field.name as keyof FormData)} type={field.type} placeholder={field.placeholder}
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
                </div>
                {errors[field.name as keyof FormData] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field.name as keyof FormData]?.message}</p>
                )}
              </div>
            ))}
            <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-3 mt-2">
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-white/60 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-gold font-medium hover:underline">Sign in</Link>
          </p>
          <p className="text-center mt-2">
            <Link href="/" className="text-xs text-gray-400 hover:text-brand-gold">← Back to Home</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
