import HeroSection from "@/components/HeroSection";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import {
  AboutSection,
  AppointmentSection,
  AwarenessSection,
  ContactSection,
  Footer,
  Header,
  ServicesSection,
  TreatmentsSection,
  TrustBar,
} from "@/components/ClinicSections";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <AboutSection />
        <TreatmentsSection />
        <ReviewsMarquee />
        <AwarenessSection />
        <AppointmentSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
