'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const images = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', alt: 'Ladakh Mountains', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80', alt: 'Goa Beach', span: '' },
  { src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80', alt: 'Kerala Backwaters', span: '' },
  { src: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80', alt: 'Rajasthan Fort', span: '' },
  { src: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=400&q=80', alt: 'Kashmir', span: '' },
  { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80', alt: 'Andaman', span: '' },
];

export default function TravelGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-brand-navy-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-brand-gold font-medium text-sm uppercase tracking-widest">Memories</span>
          <h2 className="section-title text-brand-navy dark:text-white mt-2">
            Travel <span className="gold-text">Gallery</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[500px]">
          {images.map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <Link href="/gallery" className="btn-gold inline-flex items-center gap-2">
            View Full Gallery
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
