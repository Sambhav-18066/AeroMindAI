"use client";

import { useState } from 'react';
import { ChatLayout } from '@/components/chat/chat-layout';
import { AI_PERSONALITIES } from '@/lib/data';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: '1', role: 'user', content: 'Hey, how are you today?' },
    { id: '2', role: 'ai', content: 'I am doing great! Thanks for asking. How can I help you reflect today?' },
    { id: '3', role: 'user', content: 'I had a long day at work, feeling a bit stressed.' },
    { id: '4', role: 'ai', content: "I understand. Long days can be tough. What was one thing that made you feel proud today, no matter how small?" },
  ]);

  const handleSendMessage = (content: string) => {
    if (content.trim()) {
      const newMessage = { id: (messages.length + 1).toString(), role: 'user' as const, content };
      setMessages(prevMessages => [...prevMessages, newMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = { id: (messages.length + 2).toString(), role: 'ai' as const, content: "That's interesting, tell me more." };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  return <ChatLayout messages={messages} personalities={AI_PERSONALITIES} onSendMessage={handleSendMessage} />;
}
