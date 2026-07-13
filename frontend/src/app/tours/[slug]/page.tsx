import type { Metadata } from 'next';
import TourDetailClient from './TourDetailClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title,
    description: `Book ${title} tour package with GRD Travels. Best prices guaranteed.`,
  };
}

export default function TourDetailPage({ params }: { params: { slug: string } }) {
  return <TourDetailClient slug={params.slug} />;
}
