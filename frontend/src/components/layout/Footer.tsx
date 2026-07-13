import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Logo from './Logo';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Tour Packages', href: '/tours' },
  { label: 'Vehicle Rental', href: '/vehicles' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/careers' },
];

const tourLinks = [
  { label: 'Kashmir Tour', href: '/tours/kashmir-paradise-tour' },
  { label: 'Goa Holiday', href: '/tours/goa-beach-holiday' },
  { label: 'Kerala Backwaters', href: '/tours/kerala-backwaters-escape' },
  { label: 'Manali Adventure', href: '/tours/manali-adventure-tour' },
  { label: 'Rajasthan Heritage', href: '/tours/rajasthan-royal-heritage' },
  { label: 'Leh Ladakh', href: '/tours/leh-ladakh-expedition' },
  { label: 'Dubai Tour', href: '/tours/dubai-luxury-experience' },
];

const vehicleLinks = [
  { label: 'Tempo Traveller 9 Seater', href: '/vehicles/tempo-traveller-9-seater' },
  { label: 'Tempo Traveller 12 Seater', href: '/vehicles/tempo-traveller-12-seater' },
  { label: 'Luxury Urbania', href: '/vehicles/luxury-urbania' },
  { label: 'Innova Crysta', href: '/vehicles/innova-crysta' },
  { label: 'Luxury Sedan', href: '/vehicles/luxury-sedan' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'FAQ', href: '/faq' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy-dark text-white">
      <div className="border-t border-brand-gold/20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Logo />
              <p className="text-white/60 text-sm mt-4 leading-relaxed max-w-xs">
                GRD Travels is Delhi's premier travel company offering premium tour packages and vehicle rental services across India and internationally.
              </p>
              <div className="mt-5 space-y-2">
                <a href="tel:+918595995437" className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors text-sm">
                  <Phone size={14} className="text-brand-gold" /> +91 8595995437
                </a>
                <a href="tel:+919810709148" className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors text-sm">
                  <Phone size={14} className="text-brand-gold" /> +91 9810709148
                </a>
                <a href="mailto:info@grdtravels.com" className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors text-sm">
                  <Mail size={14} className="text-brand-gold" /> info@grdtravels.com
                </a>
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <MapPin size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
                  <span>A36 Chander Vihar, Vikaspuri, Delhi - 110041</span>
                </div>
              </div>
              {/* Social */}
              <div className="flex gap-3 mt-5">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Youtube, href: '#', label: 'YouTube' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-gold hover:text-brand-navy flex items-center justify-center transition-all">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/60 hover:text-brand-gold transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tours */}
            <div>
              <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wider">Tour Packages</h4>
              <ul className="space-y-2">
                {tourLinks.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/60 hover:text-brand-gold transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vehicles & Legal */}
            <div>
              <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wider">Vehicle Rental</h4>
              <ul className="space-y-2 mb-6">
                {vehicleLinks.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/60 hover:text-brand-gold transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <h4 className="font-semibold text-brand-gold mb-3 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2">
                {legalLinks.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/60 hover:text-brand-gold transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-5">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-white/40">
            <p>© {new Date().getFullYear()} GRD Travels. All rights reserved.</p>
            <p>Designed with ❤️ for safe journeys across India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
