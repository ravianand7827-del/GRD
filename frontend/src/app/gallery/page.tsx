import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore our travel gallery - beautiful destinations, vehicles, and customer memories from GRD Travels.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
