import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface ChatMessagesProps {
  messages: { id: string; role: 'user' | 'ai'; content: string }[];
  isGenerating?: boolean;
}

export function ChatMessages({ messages, isGenerating }: ChatMessagesProps) {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-6">
        {messages.map((message, index) => (
          <div
            key={`${message.id}-${index}`}
            className={cn(
              "flex items-start gap-4",
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'ai' && (
              <Avatar className="h-8 w-8 border-2 border-primary/50">
                 <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary">
                    <Bot className="h-5 w-5" />
                 </div>
              </Avatar>
            )}

            <div
              className={cn(
                "max-w-[75%] rounded-2xl p-3 px-4 shadow-md text-sm",
                message.role === 'user'
                  ? 'bg-primary/20 rounded-br-none'
                  : 'bg-accent/10 rounded-bl-none'
              )}
            >
              <p>{message.content}</p>
            </div>

             {message.role === 'user' && (
              <Avatar className="h-8 w-8">
                 {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                <AvatarFallback>
                  <User className="h-5 w-5"/>
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
         {isGenerating && (
          <div className="flex items-start gap-4 justify-start">
            <Avatar className="h-8 w-8 border-2 border-primary/50">
              <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary">
                <Bot className="h-5 w-5" />
              </div>
            </Avatar>
            <div className="max-w-[75%] rounded-2xl p-3 px-4 shadow-md text-sm bg-accent/10 rounded-bl-none">
              <div className="flex items-center gap-2">
                <Skeleton className="w-2 h-2 rounded-full animate-pulse" />
                <Skeleton className="w-2 h-2 rounded-full animate-pulse delay-150" />
                <Skeleton className="w-2 h-2 rounded-full animate-pulse delay-300" />
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
