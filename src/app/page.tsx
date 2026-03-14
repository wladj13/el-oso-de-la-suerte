import HeroSection from '@/components/HeroSection';
import FeaturedRifas from '@/components/FeaturedRifas';
import HowItWorks from '@/components/HowItWorks';
import PricingSection from '@/components/PricingSection';
import Testimonials from '@/components/Testimonials';
import CTABanner from '@/components/CTABanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedRifas />
      <HowItWorks />
      <PricingSection />
      <Testimonials />
      <CTABanner />
    </>
  );
}
