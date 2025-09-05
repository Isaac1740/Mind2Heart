import { useState } from "react";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MessageConverterProps {
  mode: 'logical' | 'emotional';
}

export const MessageConverter = ({ mode }: MessageConverterProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const convertMessageWithAI = async (message: string, conversionMode: 'logical' | 'emotional'): Promise<string> => {
    const { data, error } = await supabase.functions.invoke('convert-message', {
      body: { message, mode: conversionMode },
    });

    if (error) {
      throw new Error(error.message || 'Failed to convert message');
    }

    if (!data?.convertedMessage) {
      throw new Error('No converted message received');
    }

    return data.convertedMessage;
  };

  const convertMessage = async () => {
    if (!inputMessage.trim()) {
      toast({
        title: "Please enter a message",
        description: "Type something in the message box to convert it.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    
    try {
      const convertedMessage = await convertMessageWithAI(inputMessage, mode);
      setOutputMessage(convertedMessage);
      
      toast({
        title: "Message converted!",
        description: `Successfully converted to ${mode} style.`,
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  const copyToClipboard = async () => {
    if (!outputMessage) return;
    
    try {
      await navigator.clipboard.writeText(outputMessage);
      toast({
        title: "Copied!",
        description: "Message copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Couldn't copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const placeholderText = mode === 'logical' 
    ? "Type your emotional message here to make it more logical and clear..."
    : "Type your logical message here to make it more empathetic and warm...";

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Input Area */}
      <div className="space-y-3">
        <label className="text-lg font-semibold text-foreground">
          Your Message
        </label>
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={placeholderText}
          className="message-area min-h-[120px]"
          rows={4}
        />
      </div>

      {/* Convert Button */}
      <div className="flex justify-center">
        <button
          onClick={convertMessage}
          disabled={isConverting || !inputMessage.trim()}
          className="convert-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConverting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Convert to {mode === 'logical' ? 'Logical' : 'Emotional'}
            </>
          )}
        </button>
      </div>

      {/* Output Area */}
      {outputMessage && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-foreground">
              Converted Message
            </label>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </Button>
          </div>
          <div className="output-area glow-pulse">
            <p className="text-foreground leading-relaxed">
              {outputMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};