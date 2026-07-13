import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
        <Plane size={20} className="text-brand-navy rotate-45" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-brand-gold" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-bold text-xl text-white tracking-wide">
          GRD <span className="text-brand-gold">Travels</span>
        </span>
        <span className="text-[10px] text-white/60 tracking-widest uppercase">Safe Journey, Our Priority</span>
      </div>
    </Link>
  );
}
