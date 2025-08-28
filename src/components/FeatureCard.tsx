import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard = ({ icon: Icon, title, description, delay = "0s" }: FeatureCardProps) => {
  return (
    <Card 
      className="bento-card p-6 animate-fade-in group"
      style={{ animationDelay: delay }}
    >
      <div className="space-y-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold font-inter group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default FeatureCard;