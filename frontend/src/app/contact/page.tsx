import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact GRD Travels for tour bookings, vehicle rental, and travel enquiries. Call +91 8595995437.',
};

const contactInfo = [
  { icon: Phone, title: 'Phone', lines: ['+91 8595995437', '+91 9810709148'], href: 'tel:+918595995437' },
  { icon: Mail, title: 'Email', lines: ['info@grdtravels.com', 'booking@grdtravels.com'], href: 'mailto:info@grdtravels.com' },
  { icon: MapPin, title: 'Address', lines: ['A36 Chander Vihar,', 'Vikaspuri, Delhi - 110041'], href: 'https://maps.google.com' },
  { icon: Clock, title: 'Working Hours', lines: ['Mon - Sat: 9AM - 8PM', 'Sun: 10AM - 6PM'], href: null },
];

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-brand-navy text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Get In <span className="text-brand-gold">Touch</span>
        </h1>
        <p className="text-white/60 max-w-xl mx-auto">
          Have a question or ready to book? Our team is here to help you plan the perfect trip.
        </p>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-brand-navy-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, title, lines, href }) => (
                <div key={title} className="bg-white dark:bg-brand-navy p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-brand-gold/10">
                      <Icon size={20} className="text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-navy dark:text-white mb-1">{title}</h3>
                      {lines.map((line, i) => (
                        href && i === 0 ? (
                          <a key={i} href={href} className="block text-sm text-gray-500 dark:text-white/60 hover:text-brand-gold transition-colors">{line}</a>
                        ) : (
                          <p key={i} className="text-sm text-gray-500 dark:text-white/60">{line}</p>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-48 bg-gray-200 dark:bg-brand-navy border border-gray-100 dark:border-white/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5!2d77.0!3d28.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="GRD Travels Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
