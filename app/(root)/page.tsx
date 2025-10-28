"use client";

import Navbar from "@/components/root/Navbar";
import Hero from "@/components/root/Hero";
import Features from "@/components/root/Features";
import HowItWorks from "@/components/root/HowItWorks";
import Testimonials from "@/components/root/Testimonials";
// import Pricing from "@/components/root/Pricing";
import FAQ from "@/components/root/FAQ";
import CTA from "@/components/root/CTA";
import Footer from "@/components/root/Footer";
import ScrollToTop from "@/components/root/ScrollToTop";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const Index = () => {
  // Initialize scroll animations
  useScrollAnimation();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      {/* <Pricing /> */}
      <FAQ />
      <CTA />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
