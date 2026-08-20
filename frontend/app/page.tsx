import LightCareerSection from "@/components/landing-light/LightCareerSection";
import LightExperienceSection from "@/components/landing-light/LightExperienceSection";
import LightFooterSection from "@/components/landing-light/LightFooterSection";
import LightHeroSection from "@/components/landing-light/LightHeroSection";
import LightMissionVisionSection from "@/components/landing-light/LightMissionVisionSection";
import LightSignatureSection from "@/components/landing-light/LightSignatureSection";
import LightStorySection from "@/components/landing-light/LightStorySection";
import OpeningProgress from "@/components/landing-light/OpeningProgress";
import ScrollProgress from "@/components/landing-light/ScrollProgress";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      <ScrollProgress />

      <LightHeroSection />
      <OpeningProgress />
      <LightStorySection />
      <LightExperienceSection />
      <LightSignatureSection />
      <LightMissionVisionSection />
      <LightCareerSection />
      <LightFooterSection />
    </main>
  );
}