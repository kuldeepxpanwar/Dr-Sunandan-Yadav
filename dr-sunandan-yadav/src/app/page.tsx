import HeroSection from "@/components/HeroSection";
import ServicesBento from "@/components/services-bento";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <ServicesBento />
    </main>
  );
}
