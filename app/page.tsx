import HeroSlider from "@/components/HomePage/HeroSlider";
import Features from "@/components/HomePage/WhyChooseUsSection";
import ServiceSlider from "@/components/HomePage/ProductsSlider";
import Blogs from "@/components/Testimonials/TestimonialsSection";
import Blogs2 from "@/components/Testimonials/TestimonialsSectionSimple";
import WhyTrust from "@/components/HomePage/WhyTrustSection";
import FAQ from "@/components/FAQ/FAQSection";
import GetStarted from "@/components/HomePage/GetStartedSection";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <Features />
      <ServiceSlider />
      <Blogs />
      <WhyTrust />
      <FAQ />
      <GetStarted />
    </main>
  );
}
