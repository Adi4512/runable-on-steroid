import { Heart, ExternalLink } from "lucide-react";



const Footer = () => {
const getYear=new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-gradient-card backdrop-blur-xl">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Crafted with</span>
            💜
            <span>by</span>
            <a 
              href="https://adisharma.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors font-medium hover:underline"
            >
              Aditya Sharma
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          <div className="text-xs text-muted-foreground/70">
            © {getYear} Run React AI. Built with passion for the developer community.
          </div>
        </div>
      </div>
      

      <div className="absolute inset-0 bg-gradient-primary opacity-[0.02] pointer-events-none" />
    </footer>
  );
};

export default Footer;