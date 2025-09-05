import { Brain, Heart } from "lucide-react";

export const AppLogo = () => {
  return (
    <div className="logo-container">
      <div className="relative">
        <Brain className="w-10 h-10 text-logical-primary brain-heart-icon" />
        <Heart className="w-8 h-8 text-emotional-primary absolute -bottom-2 -right-2 brain-heart-icon" />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-logical-primary to-emotional-primary bg-clip-text text-transparent">
          Mind2Heart
        </h1>
        <p className="text-sm text-muted-foreground italic">
          Bridging hearts and minds — one message at a time
        </p>
      </div>
    </div>
  );
};