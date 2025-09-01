import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { useState, useEffect } from "react";

import { ArrowRight, Sparkles, Eye, Zap, Code2 } from "lucide-react";
import { Link } from "react-router-dom";


const heroImage = "/img1.jpg";


const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
  return img;
};


preloadImage(heroImage);

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 aurora-bg" />
      

      <img
        src={heroImage}
        alt="Hero Background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          filter: 'brightness(0.9) contrast(1) saturate(1.2)'
        }}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onLoad={() => setImageLoaded(true)}
      />
      

      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
      )}
      

      <div className="absolute inset-0 bg-black/40" />
      

      <div className="absolute top-20 left-10 w-3 h-3 bg-accent rounded-full animate-float shadow-lg shadow-accent/50" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-primary rounded-full animate-float shadow-lg shadow-primary/50" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-20 w-2.5 h-2.5 bg-accent rounded-full animate-float shadow-lg shadow-accent/50" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-primary rounded-full animate-drift" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-drift" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full">

          <div className="space-y-8 animate-fade-in text-left ml-20">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-white drop-shadow-lg">
                <Sparkles className="w-4 h-4 text-accent" />
                AI-Powered Component Editor
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold font-inter leading-none tracking-tight drop-shadow-lg">
                <span className="aurora-text">Build  React</span>
                <span className="bg-gradient-primary bg-clip-text "> Components</span>
                <br className="hidden md:block" />
                <LineShadowText shadowColor="hsl(var(--accent))" className="italic text-white">Visually</LineShadowText>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
                Create, edit, and analyze React components with AI insights. The modern way to build beautiful UIs with visual editing and intelligent code analysis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/preview">
                <Button variant="default" size="lg" className="group">
                  Build Something Amazing
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a 
          href="https://www.producthunt.com/products/runreact-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-runreact&#0045;ai" 
          target="_blank"
          rel="noopener noreferrer"
          className="ml-[-10px]"
        >
          <img 
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1011082&theme=neutral&t=1756589973283" 
            alt="RunReact AI - Visual react component editor with in built AI analysis | Product Hunt" 
            style={{width: '240px', height: '44px'}}
            width="240"
            height="44"
            className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </a>
            </div>


            <div className="grid grid-cols-3 gap-4 pt-8 max-w-md">
              <div className="text-center">
                <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Code2 className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm font-medium text-white drop-shadow-md">Visual Editor</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-white drop-shadow-md">AI Analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm font-medium text-white drop-shadow-md">Live Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;