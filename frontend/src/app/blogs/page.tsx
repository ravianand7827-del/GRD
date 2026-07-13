import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Travel Blogs',
  description: 'Travel tips, destination guides, visa information and packing guides from GRD Travels.',
};

const blogs = [
  { title: 'Top 10 Places to Visit in Kashmir in 2025', slug: 'top-places-kashmir-2025', category: 'Destination Guide', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80', date: 'Dec 10, 2024', readTime: 8, excerpt: 'Kashmir is truly heaven on earth. From the serene Dal Lake to the snow-capped peaks of Gulmarg, here are the must-visit places in 2025.' },
  { title: 'Complete Packing Guide for Leh Ladakh Trip', slug: 'packing-guide-leh-ladakh', category: 'Packing Guide', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', date: 'Dec 5, 2024', readTime: 6, excerpt: 'Planning a Leh Ladakh trip? Here is everything you need to pack for the high-altitude adventure of a lifetime.' },
  { title: 'Dubai Visa Guide for Indian Travelers 2025', slug: 'dubai-visa-guide-indians', category: 'Visa Info', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', date: 'Nov 28, 2024', readTime: 5, excerpt: 'Complete guide to getting Dubai visa for Indian passport holders. Documents, fees, processing time and tips.' },
  { title: 'Best Time to Visit Goa: A Complete Guide', slug: 'best-time-visit-goa', category: 'Travel Tips', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80', date: 'Nov 20, 2024', readTime: 4, excerpt: 'When is the best time to visit Goa? We break down each season so you can plan the perfect beach holiday.' },
  { title: 'Kerala Backwaters: The Ultimate Houseboat Guide', slug: 'kerala-houseboat-guide', category: 'Destination Guide', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', date: 'Nov 15, 2024', readTime: 7, excerpt: 'Everything you need to know about Kerala houseboat experience - booking, routes, what to expect and more.' },
  { title: 'Rajasthan on a Budget: Tips and Tricks', slug: 'rajasthan-budget-travel', category: 'Travel Tips', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80', date: 'Nov 8, 2024', readTime: 6, excerpt: 'Explore the royal state of Rajasthan without breaking the bank. Budget hotels, cheap eats, and free attractions.' },
];

const categoryColors: Record<string, string> = {
  'Destination Guide': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Packing Guide': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'Visa Info': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'Travel Tips': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
};

export default function BlogsPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-brand-navy-dark">
      <section className="py-16 bg-brand-navy text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Travel <span className="text-brand-gold">Blogs</span>
        </h1>
        <p className="text-white/60">Tips, guides, and inspiration for your next adventure</p>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.slug} className="group card-hover">
              <div className="bg-white dark:bg-brand-navy rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-white/5">
                <div className="relative h-52 overflow-hidden">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width:768px) 100vw, 33vw" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[blog.category] || 'bg-gray-100 text-gray-700'}`}>{blog.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} />{blog.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{blog.readTime} min read</span>
                  </div>
                  <h2 className="font-semibold text-brand-navy dark:text-white mb-2 leading-snug group-hover:text-brand-gold transition-colors">{blog.title}</h2>
                  <p className="text-gray-500 dark:text-white/60 text-sm mb-4 leading-relaxed line-clamp-2">{blog.excerpt}</p>
                  <Link href={`/blogs/${blog.slug}`} className="flex items-center gap-1 text-brand-gold text-sm font-medium hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
