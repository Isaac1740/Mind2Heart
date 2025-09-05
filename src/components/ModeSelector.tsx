import { Brain, Heart } from "lucide-react";

interface ModeSelectorProps {
  selectedMode: 'logical' | 'emotional';
  onModeChange: (mode: 'logical' | 'emotional') => void;
}

export const ModeSelector = ({ selectedMode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
      <button
        onClick={() => onModeChange('logical')}
        className={`mode-button logical ${selectedMode === 'logical' ? 'active' : ''}`}
      >
        <div className="flex flex-col items-center space-y-2">
          <Brain className="w-8 h-8" />
          <span className="text-lg font-semibold">Logical Mode</span>
          <span className="text-sm opacity-80">Clear & Rational</span>
        </div>
      </button>

      <button
        onClick={() => onModeChange('emotional')}
        className={`mode-button emotional ${selectedMode === 'emotional' ? 'active' : ''}`}
      >
        <div className="flex flex-col items-center space-y-2">
          <Heart className="w-8 h-8" />
          <span className="text-lg font-semibold">Emotional Mode</span>
          <span className="text-sm opacity-80">Warm & Empathetic</span>
        </div>
      </button>
    </div>
  );
};