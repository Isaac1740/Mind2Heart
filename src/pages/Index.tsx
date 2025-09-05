import { useState } from "react";
import { AppLogo } from "@/components/AppLogo";
import { ModeSelector } from "@/components/ModeSelector";
import { MessageConverter } from "@/components/MessageConverter";
import { QuickTips } from "@/components/QuickTips";

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<'logical' | 'emotional'>('logical');

  return (
    <main className={`min-h-screen px-4 py-8 transition-colors duration-500 ${
      selectedMode === 'logical' 
        ? 'bg-black' 
        : 'bg-red-600'
    }`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <header className="text-center mb-12">
          <AppLogo />
        </header>

        {/* Mode Selection */}
        <section className="mb-12" aria-label="Communication mode selection">
          <h2 className="text-2xl font-semibold text-center mb-8 text-foreground">
            Choose Your Communication Style
          </h2>
          <ModeSelector selectedMode={selectedMode} onModeChange={setSelectedMode} />
        </section>

        {/* Message Conversion */}
        <section className="mb-12" aria-label="Message conversion tool">
          <MessageConverter mode={selectedMode} />
        </section>

        {/* Quick Tips */}
        <section aria-label="Communication tips">
          <QuickTips />
        </section>

        {/* Footer */}
        <footer className="text-center mt-16 text-muted-foreground text-sm">
          <p>Made with ❤️ to improve human connections</p>
        </footer>
      </div>
    </main>
  );
};

export default Index;