'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Tour Packages',
    href: '/tours',
    children: [
      { label: 'Domestic Tours', href: '/tours?category=domestic' },
      { label: 'International Tours', href: '/tours?category=international' },
      { label: 'Honeymoon Tours', href: '/tours?category=honeymoon' },
      { label: 'Adventure Tours', href: '/tours?category=adventure' },
      { label: 'Pilgrimage Tours', href: '/tours?category=pilgrimage' },
      { label: 'Corporate Travel', href: '/tours?category=corporate' },
    ],
  },
  {
    label: 'Vehicle Rental',
    href: '/vehicles',
    children: [
      { label: 'Tempo Traveller', href: '/vehicles?type=tempo-traveller' },
      { label: 'Luxury Urbania', href: '/vehicles?type=urbania' },
      { label: 'Mini Bus', href: '/vehicles?type=mini-bus' },
      { label: 'Volvo Bus', href: '/vehicles?type=volvo' },
      { label: 'SUV / Innova', href: '/vehicles?type=suv' },
      { label: 'Sedan', href: '/vehicles?type=sedan' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-brand-navy/95 backdrop-blur-md shadow-lg shadow-brand-navy/20'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div className="hidden lg:block bg-brand-gold/10 border-b border-brand-gold/20">
        <div className="container mx-auto px-4 py-1.5 flex justify-between items-center text-sm">
          <span className="text-white/70">Safe Journey, Our Priority</span>
          <div className="flex items-center gap-4 text-white/80">
            <a href="tel:+918595995437" className="flex items-center gap-1 hover:text-brand-gold transition-colors">
              <Phone size={12} /> +91 8595995437
            </a>
            <a href="tel:+919810709148" className="flex items-center gap-1 hover:text-brand-gold transition-colors">
              <Phone size={12} /> +91 9810709148
            </a>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-brand-gold'
                      : 'text-white/90 hover:text-brand-gold'
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-brand-navy border border-brand-gold/20 rounded-xl shadow-2xl overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-white/80 hover:text-brand-gold hover:bg-brand-gold/10 transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-white/80 hover:text-brand-gold transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              href="/booking"
              className="hidden lg:flex btn-gold text-sm py-2 px-5"
            >
              Book Now
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-white/10"
            >
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2.5 px-2 text-white/90 hover:text-brand-gold font-medium"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-4 border-l border-brand-gold/20 ml-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-sm text-white/70 hover:text-brand-gold"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/booking" onClick={() => setIsOpen(false)} className="btn-gold mt-4 inline-block text-sm">
                Book Now
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
