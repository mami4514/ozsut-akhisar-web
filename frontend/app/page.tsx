import CareerSection from "@/components/landing/CareerSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FooterSection from "@/components/landing/FooterSection";
import HeroSection from "@/components/landing/HeroSection";
import StorySection from "@/components/landing/StorySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#141210] text-white">
      <HeroSection />
      <StorySection />
      <FeaturesSection />
      <CareerSection />
      <FooterSection />
    </main>
  );
}