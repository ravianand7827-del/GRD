import type { Metadata } from 'next';
import { Suspense } from 'react';
import ToursClient from './ToursClient';

export const metadata: Metadata = {
  title: 'Tour Packages',
  description: 'Explore 500+ tour packages across India and internationally.',
};

export default function ToursPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" /></div>}>
      <ToursClient />
    </Suspense>
  );
}
