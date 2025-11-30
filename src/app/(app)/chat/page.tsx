"use client";

import { useState, useEffect, useRef } from 'react';
import { ChatLayout } from '@/components/chat/chat-layout';
import { AI_PERSONALITIES } from '@/lib/data';
import { generateChatResponse } from '@/ai/flows/generate-chat-response';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';

export default function ChatPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState([
    { id: '1', role: 'user' as const, content: 'Hey, how are you today?' },
    { id: '2', role: 'ai' as const, content: 'I am doing great! Thanks for asking. How can I help you reflect today?' },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState(AI_PERSONALITIES[0].id);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (audioDataUri: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioDataUri;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  const handleSendMessage = async (content: string) => {
    if (content.trim() && !isGenerating) {
      const newMessage = { id: (messages.length + 1).toString(), role: 'user' as const, content };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setIsGenerating(true);

      try {
        const aiResponseContent = await generateChatResponse({
          history: newMessages.map(m => ({role: m.role, content: m.content})),
          personalityId: selectedPersonality
        });
        const aiResponse = { id: (newMessages.length + 1).toString(), role: 'ai' as const, content: aiResponseContent };
        setMessages(prevMessages => [...prevMessages, aiResponse]);

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
        setMessages(messages);
      } finally {
        setIsGenerating(false);
      }
    }
  };

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
        onPersonalityChange={setSelectedPersonality}
      />
      <audio ref={audioRef} className="hidden" />
    </>
  );
}
