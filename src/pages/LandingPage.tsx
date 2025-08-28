import FloatingElements from "@/components/FloatingElement";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTA from "@/components/Cta";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <a
        href="https://github.com/Adi4512/runable-on-steroid"
        target="_blank"
        rel="noreferrer"
        className="fixed top-4 right-4 z-50 mt-7"
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Github className="w-4 h-4" />
          Star on GitHub
        </Button>
      </a>
      <FloatingElements />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
