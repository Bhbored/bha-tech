import { PageMeta } from "@/app/shared/components/PageMeta";
import { HeroSection } from "../sections/HeroSection";
import { AboutSection } from "../sections/AboutSection";
import { ProductSection } from "../sections/ProductSection";
import { ServicesSection } from "../sections/ServicesSection";
import { ProcessSection } from "../sections/ProcessSection";
import { TeamSection } from "../sections/TeamSection";
import { ContactSection } from "../sections/ContactSection";

export function HomePage() {
  return (
    <>
      <PageMeta
        title="BHA Tech | Ideas into working software"
        description="We build SaaS products, custom business systems, web and mobile applications. An independent software team, built in Lebanon."
      />
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <ServicesSection />
      <ProcessSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
