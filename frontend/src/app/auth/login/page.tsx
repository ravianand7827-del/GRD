'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Plane } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

const schema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const router = useRouter();
  const { login } = useAuthStore();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      router.push('/');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const sendOtp = async () => {
    if (!otpEmail) return toast.error('Enter your email');
    try {
      const api = (await import('@/lib/api')).default;
      await api.post('/auth/send-otp', { email: otpEmail });
      setOtpSent(true);
      toast.success('OTP sent to your email');
    } catch {
      toast.error('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const api = (await import('@/lib/api')).default;
      const { data } = await api.post('/auth/verify-otp', { email: otpEmail, otp });
      const { useAuthStore: store } = await import('@/store/authStore');
      store.getState().setUser(data.user, data.token);
      toast.success('Login successful!');
      router.push('/');
    } catch {
      toast.error('Invalid or expired OTP');
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-gradient opacity-90" />
      {[...Array(15)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 bg-brand-gold/30 rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }} />
      ))}

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white dark:bg-brand-navy-light rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-brand-navy p-8 text-center">
          <div className="w-14 h-14 bg-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plane size={24} className="text-brand-navy rotate-45" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-white/60 text-sm mt-1">Sign in to your GRD Travels account</p>
        </div>

        <div className="p-8">
          {/* Toggle */}
          <div className="flex bg-gray-100 dark:bg-white/10 rounded-xl p-1 mb-6">
            <button onClick={() => setOtpMode(false)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!otpMode ? 'bg-white dark:bg-brand-navy shadow text-brand-navy dark:text-white' : 'text-gray-500 dark:text-white/60'}`}>
              Password
            </button>
            <button onClick={() => setOtpMode(true)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${otpMode ? 'bg-white dark:bg-brand-navy shadow text-brand-navy dark:text-white' : 'text-gray-500 dark:text-white/60'}`}>
              OTP Login
            </button>
          </div>

          {!otpMode ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input {...register('email')} type="email" placeholder="your@email.com"
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-3">
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Email Address</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" value={otpEmail} onChange={e => setOtpEmail(e.target.value)} placeholder="your@email.com"
                      className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
                  </div>
                  <button onClick={sendOtp} className="px-4 py-3 bg-brand-gold text-brand-navy rounded-xl text-sm font-semibold whitespace-nowrap">
                    {otpSent ? 'Resend' : 'Send OTP'}
                  </button>
                </div>
              </div>
              {otpSent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Enter OTP</label>
                  <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit OTP" maxLength={6}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm text-center tracking-widest text-lg" />
                  <button onClick={verifyOtp} className="btn-gold w-full py-3 mt-3">Verify & Login</button>
                </div>
              )}
            </div>
          )}

          <p className="text-center text-sm text-gray-500 dark:text-white/60 mt-6">
            Do not have an account?{' '}
            <Link href="/auth/register" className="text-brand-gold font-medium hover:underline">Register here</Link>
          </p>
          <p className="text-center mt-2">
            <Link href="/" className="text-xs text-gray-400 hover:text-brand-gold">← Back to Home</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
