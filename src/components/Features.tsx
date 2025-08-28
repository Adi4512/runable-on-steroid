import { Sparkles, Code2, Eye, Palette, Zap, Brain } from "lucide-react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const features = [
    {
      icon: Code2,
      title: "Visual Component Editor",
      description: "Edit React components visually with an intuitive drag-and-drop interface. See changes in real-time without writing code.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Analysis",
      description: "Get intelligent insights about your components. Optimize performance, accessibility, and code quality with AI recommendations.",
    },
    {
      icon: Eye,
      title: "Live Preview",
      description: "See your components come to life instantly. Test different states, props, and interactions in real-time.",
    },
    {
      icon: Palette,
      title: "Design System Integration",
      description: "Seamlessly integrate with your design system. Maintain consistency across all your components effortlessly.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built for speed and performance. Edit, preview, and export components in milliseconds, not minutes.",
    },
    {
      icon: Brain,
      title: "Smart Code Generation",
      description: "Generate clean, optimized React code automatically. Export to TypeScript, JavaScript, or your preferred format.",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            Powerful Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-inter mb-6">
            Everything you need to build
            <span className="bg-gradient-primary bg-clip-text"> amazing components</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From visual editing to AI analysis, we provide all the tools you need to create stunning React components faster than ever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={`${index * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;