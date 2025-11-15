import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { DemoCTASection } from '../components/DemoCTASection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PricingSection } from '../components/PricingSection';
import { IntegrationSection } from '../components/IntegrationSection';
import { FAQSection } from '../components/FAQSection';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DemoCTASection />
      <TestimonialsSection />
      <IntegrationSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
