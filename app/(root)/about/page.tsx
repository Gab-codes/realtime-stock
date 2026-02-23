"use client";

import AboutUs from "@/components/root/AboutUs";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const About = () => {
  useScrollAnimation();

  return <AboutUs />;
};

export default About;
