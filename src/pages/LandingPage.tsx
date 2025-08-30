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
        {/* Product Hunt Badge */}
        <a 
          href="https://www.producthunt.com/products/runreact-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-runreact&#0045;ai" 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-105 transition-transform duration-300"
        >
          <img 
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1011082&theme=neutral&t=1756589973283" 
            alt="RunReact AI - Visual react component editor with in built AI analysis | Product Hunt" 
            style={{width: '150px', height: '32px'}}
            width="150"
            height="32"
            className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </a>
        
        {/* Action Buttons */}
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
