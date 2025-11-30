
"use client";

import { useState, useEffect, useRef } from 'react';
import { ChatLayout } from '@/components/chat/chat-layout';
import { AI_PERSONALITIES } from '@/lib/data';
import { generateChatResponse } from '@/ai/flows/generate-chat-response';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';

type Message = { id: string; role: 'user' | 'ai'; content: string };
type ChatHistories = Record<string, Message[]>;

const initialMessages: ChatHistories = AI_PERSONALITIES.reduce((acc, p) => {
  acc[p.id] = [
    { id: `${p.id}-1`, role: 'user', content: 'Hey, how are you today?' },
    { id: `${p.id}-2`, role: 'ai', content: `I am doing great! Thanks for asking. I'm your ${p.name}. How can I help you reflect today?` },
  ];
  return acc;
}, {} as ChatHistories);


export default function ChatPage() {
  const { toast } = useToast();
  const [allMessages, setAllMessages] = useState<ChatHistories>(initialMessages);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState(AI_PERSONALITIES[0].id);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const messages = allMessages[selectedPersonality] || [];

  const playAudio = (audioDataUri: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioDataUri;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  const handleSendMessage = async (content: string) => {
    if (content.trim() && !isGenerating) {
      const currentMessages = allMessages[selectedPersonality] || [];
      const newMessage = { id: (currentMessages.length + 1).toString(), role: 'user' as const, content };
      const newMessagesForPersonality = [...currentMessages, newMessage];
      
      setAllMessages(prev => ({
        ...prev,
        [selectedPersonality]: newMessagesForPersonality
      }));
      setIsGenerating(true);

      try {
        const aiResponseContent = await generateChatResponse({
          history: newMessagesForPersonality.map(m => ({role: m.role, content: m.content})),
          personalityId: selectedPersonality
        });
        const aiResponse = { id: (newMessagesForPersonality.length + 1).toString(), role: 'ai' as const, content: aiResponseContent };
        
        setAllMessages(prev => ({
            ...prev,
            [selectedPersonality]: [...newMessagesForPersonality, aiResponse]
        }));

        if (isTtsEnabled) {
          const { media } = await textToSpeech(aiResponseContent);
          playAudio(media);
        }

      } catch (error) {
        console.error("Error generating AI response:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem generating the AI response.",
        });
        // Optional: remove the user's message if the AI fails to respond
        setAllMessages(prev => ({
            ...prev,
            [selectedPersonality]: currentMessages
        }));
      } finally {
        setIsGenerating(false);
      }
    }
  };
  
  const handlePersonalityChange = (id: string) => {
    if (!allMessages[id]) {
      const personality = AI_PERSONALITIES.find(p => p.id === id);
      setAllMessages(prev => ({
        ...prev,
        [id]: [
          { id: `${id}-1`, role: 'user', content: 'Hey, how are you today?' },
          { id: `${id}-2`, role: 'ai', content: `I am doing great! I'm your ${personality?.name || 'AI assistant'}. How can I help?` },
        ]
      }));
    }
    setSelectedPersonality(id);
  }

  return (
    <>
      <ChatLayout 
        messages={messages} 
        personalities={AI_PERSONALITIES} 
        onSendMessage={handleSendMessage} 
        isGenerating={isGenerating}
        isTtsEnabled={isTtsEnabled}
        onTtsToggle={() => setIsTtsEnabled(prev => !prev)}
        selectedPersonality={selectedPersonality}
        onPersonalityChange={handlePersonalityChange}
      />
      <audio ref={audioRef} className="hidden" />
    </>
  );
}
