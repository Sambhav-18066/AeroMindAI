import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AISelector } from "./ai-selector";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import type { AIPersonality } from "@/lib/data";

interface ChatLayoutProps {
  messages: { id: string; role: 'user' | 'ai'; content: string }[];
  personalities: AIPersonality[];
}

export function ChatLayout({ messages, personalities }: ChatLayoutProps) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-8rem)] items-stretch">
      <ResizablePanel defaultSize={25} minSize={20} maxSize={30} className="hidden md:block">
        <div className="p-4 h-full">
          <AISelector personalities={personalities} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="hidden md:flex" />
      <ResizablePanel defaultSize={75}>
        <div className="flex flex-col h-full">
          <ChatMessages messages={messages} />
          <ChatInput />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
