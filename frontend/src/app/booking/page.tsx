import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingClient from './BookingClient';

export const metadata: Metadata = {
  title: 'Book Now',
  description: 'Book your tour package or vehicle rental with GRD Travels.',
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" /></div>}>
      <BookingClient />
    </Suspense>
  );
}
