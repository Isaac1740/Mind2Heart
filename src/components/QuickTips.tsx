import { Lightbulb, Target, Heart } from "lucide-react";

export const QuickTips = () => {
  const tips = [
    {
      icon: Target,
      title: "Logical Communication",
      description: "Focus on facts, solutions, and clear outcomes",
      color: "text-logical-primary"
    },
    {
      icon: Heart,
      title: "Emotional Communication", 
      description: "Express feelings, show empathy, and validate emotions",
      color: "text-emotional-primary"
    },
    {
      icon: Lightbulb,
      title: "Best Practice",
      description: "Use both styles depending on the situation and audience",
      color: "text-accent"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <h3 className="text-xl font-semibold text-center mb-6 text-foreground">
        Quick Tips for Effective Communication
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-border hover:shadow-lg transition-all duration-300"
          >
            <tip.icon className={`w-6 h-6 ${tip.color} mb-2`} />
            <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
            <p className="text-sm text-muted-foreground">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};