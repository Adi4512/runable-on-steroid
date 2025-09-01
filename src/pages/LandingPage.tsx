import FloatingElements from "@/components/FloatingElement";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTA from "@/components/Cta";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <div className="fixed top-4 right-4 z-50 mt-7 flex items-center gap-3">

        
        

        <Link to="/preview">
          <Button variant="default" size="sm" className="gap-2 group">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            Try It Now
          </Button>
        </Link>
        
        <a
          href="https://github.com/Adi4512/runable-on-steroid"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline" size="sm" className="gap-2">
            <Github className="w-4 h-4" />
            Star on GitHub
          </Button>
        </a>
      </div>
      
      <FloatingElements />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
