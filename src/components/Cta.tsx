import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Github, Star } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <Card className="glass-card p-12 text-center animate-fade-in hover-glow">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-bold font-inter">
                Ready to build the
                <span className="bg-gradient-primary bg-clip-text"> future </span>
                of React components?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of developers who are already creating amazing components with ReactRun AI.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/preview">
                <Button variant="default" size="lg" className="group">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <a 
                href="https://github.com/Adi4512/runable-on-steroid"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  <Github className="w-4 h-4" />
                  View on GitHub
                </Button>
              </a>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                Free to use
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                Open source
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                No sign-up required
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;