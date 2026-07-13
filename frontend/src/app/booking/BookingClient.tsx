'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Users, Tag, CreditCard, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  address: z.string().optional(),
  startDate: z.string().min(1, 'Start date required'),
  endDate: z.string().min(1, 'End date required'),
  adults: z.number().min(1),
  children: z.number().min(0),
  pickupLocation: z.string().optional(),
  dropLocation: z.string().optional(),
  hotelCategory: z.string().optional(),
  mealPlan: z.string().optional(),
  specialRequests: z.string().optional(),
  couponCode: z.string().optional(),
  paymentMethod: z.enum(['razorpay', 'stripe']),
});

type FormData = z.infer<typeof schema>;

const steps = ['Personal Details', 'Travel Details', 'Payment'];

export default function BookingClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [step, setStep] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const tourSlug = searchParams.get('tour');
  const vehicleSlug = searchParams.get('vehicle');
  const bookingType = tourSlug ? 'tour' : 'vehicle';

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      adults: Number(searchParams.get('adults')) || 2,
      children: Number(searchParams.get('children')) || 0,
      paymentMethod: 'razorpay',
    },
  });

  const applyCoupon = async () => {
    const code = watch('couponCode');
    if (!code) return;
    try {
      const { data } = await api.post('/coupons/validate', { code, amount: 20000, type: bookingType });
      setDiscount(data.coupon.discount);
      setCouponApplied(true);
      toast.success(`Coupon applied! You save ₹${data.coupon.discount}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid coupon');
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!isAuthenticated) {
      toast.error('Please login to complete booking');
      return;
    }
    try {
      const bookingData = {
        bookingType,
        tourId: tourSlug ? undefined : undefined, // would resolve from slug
        vehicleId: vehicleSlug ? undefined : undefined,
        travelDates: { startDate: data.startDate, endDate: data.endDate },
        passengers: { adults: data.adults, children: data.children },
        hotelCategory: data.hotelCategory,
        mealPlan: data.mealPlan,
        pickupLocation: data.pickupLocation,
        dropLocation: data.dropLocation,
        specialRequests: data.specialRequests,
        couponCode: data.couponCode,
        paymentMethod: data.paymentMethod,
        customerDetails: { name: data.name, email: data.email, phone: data.phone, address: data.address },
      };
      const { data: booking } = await api.post('/bookings', bookingData);

      if (data.paymentMethod === 'razorpay') {
        const { data: order } = await api.post('/payments/razorpay/order', { bookingId: booking.booking.bookingId });
        // Load Razorpay
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        document.body.appendChild(script);
        script.onload = () => {
          const rzp = new (window as any).Razorpay({
            key: order.key,
            amount: order.order.amount,
            currency: 'INR',
            name: 'GRD Travels',
            description: `Booking ${booking.booking.bookingId}`,
            order_id: order.order.id,
            handler: async (response: any) => {
              await api.post('/payments/razorpay/verify', { ...response, paymentId: order.payment });
              toast.success('Payment successful! Booking confirmed.');
              router.push(`/booking/confirmation?id=${booking.booking.bookingId}`);
            },
            prefill: { name: data.name, email: data.email, contact: data.phone },
            theme: { color: '#D4AF37' },
          });
          rzp.open();
        };
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-brand-navy-dark">
        <div className="text-center p-8 bg-white dark:bg-brand-navy rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={28} className="text-brand-gold" />
          </div>
          <h2 className="font-display text-2xl font-bold text-brand-navy dark:text-white mb-2">Login Required</h2>
          <p className="text-gray-500 dark:text-white/60 mb-6">Please login or create an account to complete your booking.</p>
          <div className="flex gap-3">
            <Link href="/auth/login" className="flex-1 btn-gold text-center">Login</Link>
            <Link href="/auth/register" className="flex-1 btn-navy text-center border border-brand-navy">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-brand-navy-dark">
      <section className="py-12 bg-brand-navy text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
          Complete Your <span className="text-brand-gold">Booking</span>
        </h1>
        <p className="text-white/60 text-sm">{bookingType === 'tour' ? `Tour: ${tourSlug?.replace(/-/g, ' ')}` : `Vehicle: ${vehicleSlug?.replace(/-/g, ' ')}`}</p>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {/* Steps */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-brand-gold' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${i < step ? 'bg-brand-gold border-brand-gold text-brand-navy' : i === step ? 'border-brand-gold text-brand-gold' : 'border-gray-300 dark:border-white/20'}`}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className="hidden sm:block text-sm font-medium">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-12 h-px mx-3 ${i < step ? 'bg-brand-gold' : 'bg-gray-300 dark:bg-white/20'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white dark:bg-brand-navy rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 p-6 md:p-8">
            {/* Step 1: Personal Details */}
            {step === 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h2 className="font-semibold text-brand-navy dark:text-white text-lg mb-4">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { name: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Your full name' },
                    { name: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'your@email.com' },
                    { name: 'phone', label: 'Phone', icon: Phone, type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                    { name: 'address', label: 'Address', icon: MapPin, type: 'text', placeholder: 'Your address' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">{field.label}</label>
                      <div className="relative">
                        <field.icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input {...register(field.name as keyof FormData)} type={field.type} placeholder={field.placeholder}
                          className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
                      </div>
                      {errors[field.name as keyof FormData] && <p className="text-red-500 text-xs mt-1">{errors[field.name as keyof FormData]?.message as string}</p>}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Travel Details */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h2 className="font-semibold text-brand-navy dark:text-white text-lg mb-4">Travel Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Start Date *</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register('startDate')} type="date" className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
                    </div>
                    {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">End Date *</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register('endDate')} type="date" className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Adults</label>
                    <div className="relative">
                      <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register('adults', { valueAsNumber: true })} type="number" min={1} className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Children</label>
                    <div className="relative">
                      <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register('children', { valueAsNumber: true })} type="number" min={0} className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Pickup Location</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register('pickupLocation')} placeholder="Pickup address" className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Drop Location</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register('dropLocation')} placeholder="Drop address" className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm" />
                    </div>
                  </div>
                  {bookingType === 'tour' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Hotel Category</label>
                        <select {...register('hotelCategory')} className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm">
                          <option value="">Select hotel category</option>
                          <option value="budget">Budget (2 Star)</option>
                          <option value="standard">Standard (3 Star)</option>
                          <option value="deluxe">Deluxe (4 Star)</option>
                          <option value="luxury">Luxury (5 Star)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Meal Plan</label>
                        <select {...register('mealPlan')} className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm">
                          <option value="">Select meal plan</option>
                          <option value="EP">EP - Room Only</option>
                          <option value="CP">CP - Breakfast Only</option>
                          <option value="MAP">MAP - Breakfast + Dinner</option>
                          <option value="AP">AP - All Meals</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Special Requests</label>
                  <textarea {...register('specialRequests')} rows={3} placeholder="Any special requirements, dietary needs, accessibility needs..." className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm resize-none" />
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h2 className="font-semibold text-brand-navy dark:text-white text-lg mb-4">Payment</h2>
                {/* Coupon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1.5">Coupon Code</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register('couponCode')} placeholder="Enter coupon code" className="w-full pl-9 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 focus:outline-none focus:border-brand-gold text-sm uppercase" />
                    </div>
                    <button type="button" onClick={applyCoupon} className="px-5 py-3 bg-brand-gold text-brand-navy rounded-xl text-sm font-semibold hover:bg-brand-gold-light transition-colors">
                      Apply
                    </button>
                  </div>
                  {couponApplied && <p className="text-green-500 text-xs mt-1">✓ Coupon applied! Saving ₹{discount}</p>}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-3">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'razorpay', label: 'Razorpay', desc: 'UPI, Cards, Net Banking' },
                      { value: 'stripe', label: 'Stripe', desc: 'International Cards' },
                    ].map(method => (
                      <label key={method.value} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${watch('paymentMethod') === method.value ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-200 dark:border-white/10'}`}>
                        <input {...register('paymentMethod')} type="radio" value={method.value} className="hidden" />
                        <CreditCard size={20} className={watch('paymentMethod') === method.value ? 'text-brand-gold' : 'text-gray-400'} />
                        <div>
                          <div className="font-medium text-sm text-brand-navy dark:text-white">{method.label}</div>
                          <div className="text-xs text-gray-400">{method.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 space-y-2">
                  <h3 className="font-semibold text-brand-navy dark:text-white text-sm mb-3">Booking Summary</h3>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-white/60">
                    <span>Base Price</span><span>As per selection</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-500">
                      <span>Coupon Discount</span><span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-500 dark:text-white/60">
                    <span>GST (5%)</span><span>Included</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-white/10 pt-2 flex justify-between font-bold text-brand-navy dark:text-white">
                    <span>Total Amount</span><span>As per selection</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  By proceeding, you agree to our <Link href="/terms" className="text-brand-gold hover:underline">Terms & Conditions</Link> and <Link href="/refund-policy" className="text-brand-gold hover:underline">Refund Policy</Link>
                </p>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium hover:border-brand-gold transition-colors">
                ← Back
              </button>
            ) : <div />}
            {step < steps.length - 1 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="btn-gold">
                Continue →
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="btn-gold flex items-center gap-2">
                <CreditCard size={16} />
                {isSubmitting ? 'Processing...' : 'Pay & Confirm Booking'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
