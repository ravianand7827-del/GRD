'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogs = [
  { title: 'Top 10 Places to Visit in Kashmir in 2025', slug: 'top-places-kashmir-2025', category: 'Destination Guide', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&q=80', date: 'Dec 10, 2024', readTime: 8 },
  { title: 'Complete Packing Guide for Leh Ladakh Trip', slug: 'packing-guide-leh-ladakh', category: 'Packing Guide', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', date: 'Dec 5, 2024', readTime: 6 },
  { title: 'Dubai Visa Guide for Indian Travelers 2025', slug: 'dubai-visa-guide-indians', category: 'Visa Info', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', date: 'Nov 28, 2024', readTime: 5 },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-brand-navy">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-brand-gold font-medium text-sm uppercase tracking-widest">Travel Tips</span>
          <h2 className="section-title text-brand-navy dark:text-white mt-2">
            Latest <span className="gold-text">Blogs</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.article
              key={blog.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group card-hover"
            >
              <div className="bg-white dark:bg-brand-navy-light rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-white/5">
                <div className="relative h-52 overflow-hidden">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-3 left-3 bg-brand-gold text-brand-navy text-xs font-bold px-3 py-1 rounded-full">
                    {blog.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} />{blog.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{blog.readTime} min read</span>
                  </div>
                  <h3 className="font-semibold text-brand-navy dark:text-white mb-3 leading-snug group-hover:text-brand-gold transition-colors">
                    {blog.title}
                  </h3>
                  <Link href={`/blogs/${blog.slug}`} className="flex items-center gap-1 text-brand-gold text-sm font-medium hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-10">
          <Link href="/blogs" className="btn-gold inline-flex items-center gap-2">View All Blogs <ArrowRight size={16} /></Link>
        </motion.div>
      </div>
    </section>
  );
}
