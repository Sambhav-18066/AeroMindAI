import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CornerDownLeft, Mic, Volume2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export function ChatInput() {
  return (
    <div className="relative p-4">
        <div className="absolute inset-x-0 bottom-full h-16 bg-gradient-to-t from-background to-transparent" />
        <div className="relative">
            <Textarea
                placeholder="Talk about your day or ask a question..."
                className="min-h-[60px] w-full rounded-2xl border-2 border-primary/20 bg-background/50 p-4 pr-24 shadow-lg backdrop-blur-sm focus-visible:ring-primary"
                rows={1}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type="submit" size="icon" variant="ghost" className="h-9 w-9 text-primary hover:text-primary hover:bg-primary/10">
                                <CornerDownLeft className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="glass-effect">
                            <p>Send Message</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type="button" size="icon" variant="ghost" className="h-9 w-9 text-primary hover:text-primary hover:bg-primary/10">
                                <Mic className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                         <TooltipContent className="glass-effect">
                            <p>Use Microphone</p>
                        </TooltipContent>
                    </Tooltip>
                     <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type="button" size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10">
                                <Volume2 className="h-5 w-5" />
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
