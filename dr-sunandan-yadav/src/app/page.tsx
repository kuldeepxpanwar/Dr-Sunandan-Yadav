import HeroSection from "@/components/HeroSection";
import ServicesBento from "@/components/MedicalServices";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <MedicalServices />
    </main>
  );
}
