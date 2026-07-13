import type { Metadata } from 'next';
import { Suspense } from 'react';
import VehiclesClient from './VehiclesClient';

export const metadata: Metadata = {
  title: 'Vehicle Rental',
  description: 'Rent Tempo Traveller, Luxury Urbania, Innova Crysta, SUV, Sedan in Delhi.',
};

export default function VehiclesPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" /></div>}>
      <VehiclesClient />
    </Suspense>
  );
}
