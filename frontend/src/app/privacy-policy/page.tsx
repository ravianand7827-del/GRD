import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Privacy Policy of GRD Travels.' };

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-brand-navy-dark">
      <section className="py-16 bg-brand-navy text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-3">Privacy <span className="text-brand-gold">Policy</span></h1>
        <p className="text-white/60">Last updated: January 2025</p>
      </section>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/5 prose dark:prose-invert max-w-none">
          {[
            { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as your name, email address, phone number, and payment information when you make a booking. We also collect information automatically when you use our website, including IP address, browser type, and pages visited.' },
            { title: '2. How We Use Your Information', content: 'We use the information we collect to process bookings, send confirmation emails and WhatsApp messages, provide customer support, send promotional communications (with your consent), improve our services, and comply with legal obligations.' },
            { title: '3. Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.' },
            { title: '4. Data Security', content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology.' },
            { title: '5. Cookies', content: 'We use cookies to enhance your experience on our website. You can choose to disable cookies through your browser settings, but this may affect the functionality of our website.' },
            { title: '6. Your Rights', content: 'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by contacting us at info@grdtravels.com.' },
            { title: '7. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at: GRD Travels, A36 Chander Vihar, Vikaspuri, Delhi - 110041. Email: info@grdtravels.com. Phone: +91 8595995437.' },
          ].map((section) => (
            <div key={section.title} className="mb-6">
              <h2 className="text-lg font-semibold text-brand-navy dark:text-white mb-2">{section.title}</h2>
              <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
