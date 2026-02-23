"use client";

import Hero from "@/components/root/Hero";
import Features from "@/components/root/Features";
import HowItWorks from "@/components/root/HowItWorks";
import Testimonials from "@/components/root/Testimonials";
// import Pricing from "@/components/root/Pricing";
import FAQ from "@/components/root/FAQ";
import CTA from "@/components/root/CTA";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const Index = () => {
  // Initialize scroll animations
  useScrollAnimation();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      {/* <Pricing /> */}
      <FAQ />
      <CTA />
    </div>
  );
};

export default Index;
