import HeroSection from '@/components/home/HeroSection';
import PopularDestinations from '@/components/home/PopularDestinations';
import TourCategories from '@/components/home/TourCategories';
import VehicleRental from '@/components/home/VehicleRental';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TravelGallery from '@/components/home/TravelGallery';
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import FaqSection from '@/components/home/FaqSection';
import StatsSection from '@/components/home/StatsSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PopularDestinations />
      <TourCategories />
      <VehicleRental />
      <WhyChooseUs />
      <TravelGallery />
      <Testimonials />
      <BlogSection />
      <FaqSection />
      <NewsletterSection />
    </>
  );
}
