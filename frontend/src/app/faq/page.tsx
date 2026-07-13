import type { Metadata } from 'next';
import FaqSection from '@/components/home/FaqSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about GRD Travels tour packages, vehicle rental, booking, and payments.',
};

export default function FaqPage() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-16 bg-brand-navy text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Frequently Asked <span className="text-brand-gold">Questions</span>
        </h1>
        <p className="text-white/60">Everything you need to know about GRD Travels</p>
      </section>
      <FaqSection />
      <section className="py-12 bg-white dark:bg-brand-navy text-center">
        <p className="text-gray-500 dark:text-white/60 mb-4">Still have questions? We are here to help.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:+918595995437" className="btn-gold">Call Us Now</a>
          <Link href="/contact" className="btn-navy border border-gray-200 dark:border-white/20">Send Message</Link>
        </div>
      </section>
    </div>
  );
}
