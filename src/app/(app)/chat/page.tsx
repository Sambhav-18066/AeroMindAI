
"use client";

import { useState, useEffect, useRef } from 'react';
import { ChatLayout } from '@/components/chat/chat-layout';
import { AI_PERSONALITIES } from '@/lib/data';
import { generateChatResponse } from '@/ai/flows/generate-chat-response';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

type Message = { id: string; role: 'user' | 'ai'; content: string };
type ChatHistories = Record<string, Message[]>;

const initialMessages: ChatHistories = AI_PERSONALITIES.reduce((acc, p) => {
  acc[p.id] = [
    { id: `${p.id}-1`, role: 'user', content: 'Hey, how are you today?' },
    { id: `${p.id}-2`, role: 'ai', content: `I am doing great! I'm your ${p.name}. How can I help you reflect today?` },
  ];
  return acc;
}, {} as ChatHistories);


export default function ChatPage() {
  const { toast } = useToast();
  const [allMessages, setAllMessages] = useState<ChatHistories>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState(AI_PERSONALITIES[0].id);
  const [awaitingAnswerLength, setAwaitingAnswerLength] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('chatHistories');
      if (savedMessages) {
        setAllMessages(JSON.parse(savedMessages));
      } else {
        setAllMessages(initialMessages);
      }
    } catch (error) {
      console.error("Failed to load messages from localStorage", error);
      setAllMessages(initialMessages);
    }
  }, []);

  useEffect(() => {
    try {
      if (Object.keys(allMessages).length > 0) {
        localStorage.setItem('chatHistories', JSON.stringify(allMessages));
      }
    } catch (error) {
      console.error("Failed to save messages to localStorage", error);
    }
  }, [allMessages]);

  const messages = allMessages[selectedPersonality] || [];

  const playAudio = (audioDataUri: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioDataUri;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  const handleSendMessage = async (content: string) => {
    if (content.trim() && !isGenerating && !awaitingAnswerLength) {
      const currentMessages = allMessages[selectedPersonality] || [];
      const newMessage = { id: `${selectedPersonality}-${currentMessages.length + 1}`, role: 'user' as const, content };
      const newMessagesForPersonality = [...currentMessages, newMessage];
      
      setAllMessages(prev => ({
        ...prev,
        [selectedPersonality]: newMessagesForPersonality
      }));
      setAwaitingAnswerLength(true);
    }
  };
  
  const handleAnswerLengthSelection = async (answerLength: 'short' | 'long') => {
    setAwaitingAnswerLength(false);
    setIsGenerating(true);

    const currentMessages = allMessages[selectedPersonality] || [];

    try {
      const aiResponseContent = await generateChatResponse({
        history: currentMessages.map(m => ({role: m.role, content: m.content})),
        personalityId: selectedPersonality,
        answerLength,
      });
      const aiResponse = { id: `${selectedPersonality}-${currentMessages.length + 1}`, role: 'ai' as const, content: aiResponseContent };
      
      setAllMessages(prev => ({
          ...prev,
          [selectedPersonality]: [...currentMessages, aiResponse]
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
      // Do not remove the user's message, just indicate failure.
    } finally {
      setIsGenerating(false);
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
    setAwaitingAnswerLength(false);
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
        awaitingAnswerLength={awaitingAnswerLength}
      />
      {awaitingAnswerLength && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-2 rounded-lg glass-effect">
            <Button onClick={() => handleAnswerLengthSelection('short')}>Short Answer</Button>
            <Button onClick={() => handleAnswerLengthSelection('long')}>Long Answer</Button>
        </div>
      )}
      <audio ref={audioRef} className="hidden" />
    </>
  );
}
