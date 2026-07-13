require('dotenv').config({ path: '../../../.env' });
const mongoose = require('mongoose');
const Tour = require('../models/Tour');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grd_travels');
  console.log('MongoDB connected for seeding');
};

const tours = [
  {
    title: 'Kashmir Paradise Tour',
    slug: 'kashmir-paradise-tour',
    description: 'Experience the heaven on earth with our premium Kashmir tour package. Explore Dal Lake, Gulmarg, Pahalgam and more.',
    shortDescription: 'Heaven on Earth - Dal Lake, Gulmarg, Pahalgam',
    category: 'domestic',
    duration: { days: 7, nights: 6 },
    destination: 'Kashmir',
    highlights: ['Shikara ride on Dal Lake', 'Gulmarg Gondola ride', 'Pahalgam valley visit', 'Mughal Gardens tour'],
    inclusions: ['Accommodation in 3-star hotels', 'Daily breakfast & dinner', 'AC vehicle transfers', 'Experienced guide'],
    exclusions: ['Airfare', 'Personal expenses', 'Adventure activities', 'Lunch'],
    isFeatured: true,
    isActive: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800', publicId: 'kashmir' },
    tags: ['kashmir', 'himalaya', 'nature', 'snow'],
    seo: { metaTitle: 'Kashmir Tour Package - GRD Travels', metaDescription: 'Book the best Kashmir tour packages. Explore Dal Lake, Gulmarg, Pahalgam and more.' },
  },
  {
    title: 'Goa Beach Holiday',
    slug: 'goa-beach-holiday',
    description: 'Sun, sand and sea! Enjoy the vibrant beaches, nightlife and Portuguese heritage of Goa.',
    shortDescription: 'Sun, Sand & Sea - North & South Goa',
    category: 'domestic',
    duration: { days: 5, nights: 4 },
    destination: 'Goa',
    highlights: ['North Goa beaches', 'South Goa heritage', 'Water sports', 'Sunset cruise'],
    inclusions: ['Beach resort stay', 'Daily breakfast', 'Airport transfers', 'Sightseeing'],
    exclusions: ['Airfare', 'Water sports', 'Personal expenses'],
    isFeatured: true,
    isActive: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', publicId: 'goa' },
    tags: ['goa', 'beach', 'party', 'water-sports'],
    seo: { metaTitle: 'Goa Tour Package - GRD Travels', metaDescription: 'Book the best Goa tour packages. Enjoy the vibrant beaches, nightlife and Portuguese heritage.' },
  },
  {
    title: 'Kerala Backwaters Escape',
    slug: 'kerala-backwaters-escape',
    description: 'God\'s Own Country awaits! Cruise through serene backwaters, explore spice plantations and pristine beaches.',
    shortDescription: "God's Own Country - Backwaters & Beaches",
    category: 'domestic',
    destination: 'Kerala',
    duration: { days: 6, nights: 5 },
    highlights: ['Alleppey houseboat stay', 'Munnar tea gardens', 'Thekkady wildlife', 'Kovalam beach'],
    inclusions: ['Houseboat stay', 'All meals on houseboat', 'AC vehicle', 'Guide'],
    exclusions: ['Airfare', 'Personal expenses', 'Ayurvedic treatments'],
    isFeatured: true,
    isActive: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', publicId: 'kerala' },
    tags: ['kerala', 'backwaters', 'houseboat', 'nature'],
    seo: { metaTitle: 'Kerala Tour Package - GRD Travels', metaDescription: 'Book the best Kerala backwater tour packages. Cruise through serene backwaters and explore pristine beaches.' },
  },
  {
    title: 'Manali Adventure Tour',
    slug: 'manali-adventure-tour',
    description: 'Adventure awaits in the mountains! Rohtang Pass, Solang Valley, river rafting and more.',
    shortDescription: 'Mountain Adventure - Rohtang, Solang Valley',
    category: 'adventure',
    destination: 'Manali',
    duration: { days: 5, nights: 4 },
    highlights: ['Rohtang Pass excursion', 'Solang Valley snow activities', 'River rafting', 'Old Manali exploration'],
    inclusions: ['Hotel stay', 'Daily breakfast', 'Volvo bus transfers', 'Sightseeing'],
    exclusions: ['Adventure activities', 'Personal expenses', 'Lunch & dinner'],
    isFeatured: true,
    isActive: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', publicId: 'manali' },
    tags: ['manali', 'adventure', 'snow', 'mountains'],
    seo: { metaTitle: 'Manali Tour Package - GRD Travels', metaDescription: 'Book the best Manali adventure tour packages. Experience Rohtang Pass, Solang Valley, and more.' },
  },
  {
    title: 'Rajasthan Royal Heritage',
    slug: 'rajasthan-royal-heritage',
    description: 'Explore the land of kings! Majestic forts, palaces, desert safaris and vibrant culture.',
    shortDescription: 'Land of Kings - Forts, Palaces & Desert',
    category: 'domestic',
    destination: 'Rajasthan',
    duration: { days: 8, nights: 7 },
    highlights: ['Jaipur Pink City', 'Udaipur Lake Palace', 'Jodhpur Blue City', 'Jaisalmer Desert Safari'],
    inclusions: ['Heritage hotel stay', 'Daily breakfast', 'AC vehicle', 'Guide', 'Camel safari'],
    exclusions: ['Airfare', 'Personal expenses', 'Lunch & dinner'],
    isFeatured: true,
    isActive: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800', publicId: 'rajasthan' },
    tags: ['rajasthan', 'heritage', 'desert', 'forts'],
    seo: { metaTitle: 'Rajasthan Tour Package - GRD Travels', metaDescription: 'Book the best Rajasthan heritage tour packages. Explore majestic forts, palaces, and desert safaris.' },
  },
  {
    title: 'Leh Ladakh Expedition',
    slug: 'leh-ladakh-expedition',
    description: 'The ultimate high-altitude adventure! Pangong Lake, Nubra Valley, monasteries and mountain passes.',
    shortDescription: 'High Altitude Adventure - Pangong, Nubra Valley',
    category: 'adventure',
    destination: 'Leh Ladakh',
    duration: { days: 8, nights: 7 },
    highlights: ['Pangong Tso Lake', 'Nubra Valley camel safari', 'Khardung La Pass', 'Hemis Monastery'],
    inclusions: ['Guesthouse/hotel stay', 'All meals', 'Inner line permits', 'Oxygen cylinders', 'Guide'],
    exclusions: ['Airfare to Leh', 'Personal expenses', 'Travel insurance'],
    isFeatured: true,
    isActive: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', publicId: 'ladakh' },
    tags: ['ladakh', 'adventure', 'mountains', 'pangong'],
    seo: { metaTitle: 'Leh Ladakh Tour Package - GRD Travels', metaDescription: 'Book the ultimate Leh Ladakh expedition packages. Visit Pangong Lake, Nubra Valley, and more.' },
  },
  {
    title: 'Andaman Island Paradise',
    slug: 'andaman-island-paradise',
    description: 'Crystal clear waters, pristine beaches and vibrant coral reefs. The perfect tropical getaway.',
    shortDescription: 'Tropical Paradise - Beaches & Coral Reefs',
    category: 'domestic',
    destination: 'Andaman',
    duration: { days: 6, nights: 5 },
    highlights: ['Radhanagar Beach', 'Scuba diving', 'Cellular Jail', 'Ross Island'],
    inclusions: ['Beach resort stay', 'Daily breakfast', 'Ferry transfers', 'Sightseeing'],
    exclusions: ['Airfare', 'Water sports', 'Personal expenses'],
    isFeatured: true,
    isActive: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', publicId: 'andaman' },
    tags: ['andaman', 'beach', 'island', 'scuba'],
    seo: { metaTitle: 'Andaman Tour Package - GRD Travels', metaDescription: 'Book the best Andaman island tour packages. Discover crystal clear waters and pristine beaches.' },
  },
  {
    title: 'Dubai Luxury Experience',
    slug: 'dubai-luxury-experience',
    description: 'Experience the glitz and glamour of Dubai! Burj Khalifa, desert safari, luxury shopping and more.',
    shortDescription: 'City of Gold - Burj Khalifa & Desert Safari',
    category: 'international',
    destination: 'Dubai',
    duration: { days: 5, nights: 4 },
    highlights: ['Burj Khalifa visit', 'Desert safari with BBQ', 'Dubai Mall', 'Dhow cruise dinner'],
    inclusions: ['4-star hotel', 'Daily breakfast', 'Airport transfers', 'Visa assistance', 'Sightseeing'],
    exclusions: ['Airfare', 'Visa fees', 'Personal expenses'],
    isFeatured: true,
    isActive: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', publicId: 'dubai' },
    tags: ['dubai', 'international', 'luxury', 'desert'],
    seo: { metaTitle: 'Dubai Tour Package - GRD Travels', metaDescription: 'Book Dubai luxury tour packages. Experience the glitz and glamour of Dubai.' },
  },
  {
    title: 'Thailand Tropical Escape',
    slug: 'thailand-tropical-escape',
    description: 'Explore the Land of Smiles! Bangkok temples, Phuket beaches, Chiang Mai culture.',
    shortDescription: 'Land of Smiles - Bangkok, Phuket, Chiang Mai',
    category: 'international',
    destination: 'Thailand',
    duration: { days: 7, nights: 6 },
    highlights: ['Grand Palace Bangkok', 'Phi Phi Islands', 'Elephant sanctuary', 'Floating market'],
    inclusions: ['3-star hotels', 'Daily breakfast', 'Airport transfers', 'Sightseeing tours'],
    exclusions: ['Airfare', 'Visa fees', 'Personal expenses'],
    isFeatured: false,
    isActive: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800', publicId: 'thailand' },
    tags: ['thailand', 'international', 'beach', 'temples'],
    seo: { metaTitle: 'Thailand Tour Package - GRD Travels', metaDescription: 'Book the best Thailand tour packages. Explore Bangkok temples, Phuket beaches, and more.' },
  },
  {
    title: 'Shimla Kullu Manali',
    slug: 'shimla-kullu-manali',
    description: 'The classic Himachal Pradesh circuit! Colonial Shimla, scenic Kullu valley and adventurous Manali.',
    shortDescription: 'Himachal Circuit - Shimla, Kullu & Manali',
    category: 'domestic',
    destination: 'Shimla',
    duration: { days: 7, nights: 6 },
    highlights: ['Mall Road Shimla', 'Kufri snow point', 'Kullu Manikaran', 'Rohtang Pass'],
    inclusions: ['Hotel stay', 'Daily breakfast', 'Volvo transfers', 'Sightseeing'],
    exclusions: ['Personal expenses', 'Adventure activities'],
    isFeatured: false,
    isActive: true,
    coverImage: { url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800', publicId: 'shimla' },
    tags: ['shimla', 'himachal', 'mountains', 'snow'],
    seo: { metaTitle: 'Shimla Manali Tour Package - GRD Travels', metaDescription: 'Book the classic Shimla Manali tour package. Visit colonial Shimla, Kullu valley and adventurous Manali.' },
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Tour.deleteMany({});

    await Tour.insertMany(tours);
    console.log(`✅ ${tours.length} tours seeded`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
