import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, IndianRupee, Send } from 'lucide-react';

export const metadata: Metadata = { title: 'Careers', description: 'Join the GRD Travels team. Current job openings in Delhi.' };

const openings = [
  { title: 'Tour Manager', type: 'Full Time', location: 'Delhi', experience: '2-4 years', desc: 'Plan and execute tour packages, coordinate with hotels and transport vendors, handle customer queries.' },
  { title: 'Sales Executive', type: 'Full Time', location: 'Delhi', experience: '1-3 years', desc: 'Generate leads, convert enquiries to bookings, maintain customer relationships, achieve monthly targets.' },
  { title: 'Driver (Tempo Traveller)', type: 'Full Time', location: 'Delhi NCR', experience: '3+ years', desc: 'Drive Tempo Traveller for tour groups. Must have valid commercial license and clean driving record.' },
  { title: 'Digital Marketing Executive', type: 'Full Time', location: 'Delhi / Remote', experience: '1-2 years', desc: 'Manage social media, run paid campaigns, create content, handle SEO and online reputation.' },
  { title: 'Customer Support Executive', type: 'Full Time', location: 'Delhi', experience: '0-2 years', desc: 'Handle customer calls, WhatsApp enquiries, booking support, and post-trip feedback collection.' },
];

export default function CareersPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-brand-navy-dark">
      <section className="py-16 bg-brand-navy text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Join Our <span className="text-brand-gold">Team</span>
        </h1>
        <p className="text-white/60 max-w-xl mx-auto">Be part of a passionate team that helps thousands of people explore the world</p>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-4 mb-12">
          {openings.map((job) => (
            <div key={job.title} className="bg-white dark:bg-brand-navy rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 hover:border-brand-gold/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="font-semibold text-brand-navy dark:text-white text-lg">{job.title}</h2>
                    <span className="text-xs bg-brand-gold/10 text-brand-gold px-2.5 py-1 rounded-full font-medium">{job.type}</span>
                  </div>
                  <p className="text-gray-500 dark:text-white/60 text-sm mb-3">{job.desc}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{job.experience}</span>
                    <span className="flex items-center gap-1"><IndianRupee size={12} />Competitive Salary</span>
                  </div>
                </div>
                <a href={`mailto:hr@grdtravels.com?subject=Application for ${job.title}`}
                  className="btn-gold flex items-center gap-2 whitespace-nowrap text-sm">
                  <Send size={14} /> Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brand-navy rounded-2xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-2">Do not see a suitable role?</h2>
          <p className="text-white/60 mb-5 text-sm">Send us your resume and we will keep you in mind for future openings.</p>
          <a href="mailto:hr@grdtravels.com?subject=General Application" className="btn-gold inline-flex items-center gap-2">
            <Send size={16} /> Send Resume
          </a>
        </div>
      </div>
    </div>
  );
}
