import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://grdtravels.com';
  const tours = [
    'kashmir-paradise-tour', 'goa-beach-holiday', 'kerala-backwaters-escape',
    'manali-adventure-tour', 'rajasthan-royal-heritage', 'leh-ladakh-expedition',
    'andaman-island-paradise', 'dubai-luxury-experience', 'thailand-tropical-escape',
    'shimla-kullu-manali',
  ];
  const vehicles = [
    'tempo-traveller-9-seater', 'tempo-traveller-12-seater', 'tempo-traveller-16-seater',
    'luxury-urbania', 'innova-crysta', 'luxury-sedan',
  ];

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tours`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/vehicles`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...tours.map(slug => ({ url: `${baseUrl}/tours/${slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...vehicles.map(slug => ({ url: `${baseUrl}/vehicles/${slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 })),
  ];
}
