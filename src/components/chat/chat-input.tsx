"use client";

import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CornerDownLeft, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isGenerating?: boolean;
  isTtsEnabled: boolean;
  onTtsToggle: () => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, isGenerating, isTtsEnabled, onTtsToggle, disabled }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setInputValue(finalTranscript + interimTranscript);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.abort();
    };
  }, []);
  
  const handleSend = () => {
    if (inputValue.trim() && !isGenerating && !disabled) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setInputValue('');
      recognitionRef.current.start();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="relative p-4">
        <div className="absolute inset-x-0 bottom-full h-16 bg-gradient-to-t from-background to-transparent" />
        <div className="relative">
            <Textarea
                placeholder={isRecording ? "Listening..." : "Talk about your day or ask a question..."}
                className="min-h-[60px] w-full rounded-2xl border-2 border-primary/20 bg-background/50 p-4 pr-32 shadow-lg backdrop-blur-sm focus-visible:ring-primary"
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isGenerating || isRecording || disabled}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type="submit" size="icon" variant="ghost" className="h-9 w-9 text-primary hover:text-primary hover:bg-primary/10" onClick={handleSend} disabled={!inputValue.trim() || isGenerating || isRecording || disabled}>
                                <CornerDownLeft className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="glass-effect">
                            <p>Send Message</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type="button" size="icon" variant="ghost" className={cn("h-9 w-9 text-primary hover:text-primary hover:bg-primary/10", isRecording && "bg-primary/20")} onClick={toggleRecording} disabled={isGenerating || disabled}>
                                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                            </Button>
                        </TooltipTrigger>
                         <TooltipContent className="glass-effect">
                            <p>{isRecording ? "Stop Listening" : "Use Microphone"}</p>
                        </TooltipContent>
                    </Tooltip>
                     <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type="button" size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10" onClick={onTtsToggle} disabled={isGenerating || disabled}>
                                {isTtsEnabled ? <Volume2 className="h-5 w-5 text-primary" /> : <VolumeX className="h-5 w-5" />}
                            </Button>
                        </TooltipTrigger>
                         <TooltipContent className="glass-effect">
                            <p>Toggle TTS</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    </div>
  );
}
