import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms & Conditions', description: 'Terms and conditions of GRD Travels.' };

export default function TermsPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-brand-navy-dark">
      <section className="py-16 bg-brand-navy text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-3">Terms & <span className="text-brand-gold">Conditions</span></h1>
        <p className="text-white/60">Last updated: January 2025</p>
      </section>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/5 space-y-6">
          {[
            { title: '1. Acceptance of Terms', content: 'By accessing and using GRD Travels website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.' },
            { title: '2. Booking & Payment', content: 'All bookings are subject to availability and confirmation. A booking is confirmed only upon receipt of full or partial payment as specified. Prices are subject to change without notice until booking is confirmed.' },
            { title: '3. Travel Documents', content: 'It is the responsibility of the traveler to ensure they have valid travel documents including passport, visa, and any required permits. GRD Travels is not responsible for denied entry due to improper documentation.' },
            { title: '4. Health & Safety', content: 'Travelers are responsible for their own health and safety. We recommend purchasing comprehensive travel insurance. GRD Travels is not liable for any medical expenses incurred during travel.' },
            { title: '5. Itinerary Changes', content: 'GRD Travels reserves the right to modify itineraries due to weather, safety concerns, or other unforeseen circumstances. We will make every effort to provide suitable alternatives.' },
            { title: '6. Liability', content: 'GRD Travels acts as an agent for hotels, transport companies, and other service providers. We are not liable for any loss, damage, injury, or expense arising from services provided by third parties.' },
            { title: '7. Governing Law', content: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Delhi, India.' },
            { title: '8. Contact', content: 'For any queries regarding these terms, contact us at info@grdtravels.com or call +91 8595995437.' },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="font-semibold text-brand-navy dark:text-white mb-2">{section.title}</h2>
              <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
