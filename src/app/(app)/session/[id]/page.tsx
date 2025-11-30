import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Calendar, Check, Clock, Lightbulb, MessageSquare, Star, Target, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChatMessages } from "@/components/chat/chat-messages";

const mockSession = {
  id: "1",
  date: "2024-07-28",
  duration: "15m 42s",
  personality: "Mentor",
  summary: {
    title: "Deep Dive on Career Goals",
    keyPoints: [
      "User expressed uncertainty about their current career path.",
      "Explored the difference between a 'job' and a 'calling'.",
      "Identified user's passion for creative problem-solving."
    ],
    strengths: ["High level of self-awareness", "Willingness to be vulnerable", "Articulate in expressing feelings"],
    weaknesses: ["Tendency towards self-criticism", "Hesitation in decision-making"],
    suggestions: [
      "Try journaling for 10 minutes each day about what activities brought energy.",
      "Reach out to one person in a field of interest for an informational interview.",
    ],
    confidenceRating: 0.92,
  },
  messages: [
    { id: '1', role: 'user', content: 'I feel a bit lost in my career right now.' },
    { id: '2', role: 'ai', content: "That's a very common feeling. Can you tell me more about what 'lost' feels like to you?" },
    { id: '3', role: 'user', content: 'Like I\'m just going through the motions, without a real purpose.' },
    { id: '4', role: 'ai', content: "I hear that. It sounds like you're searching for a deeper sense of purpose in your work. Let's explore that. What's one activity, inside or outside of work, that made you feel truly alive recently?" },
  ]
};

export default function SessionSummaryPage({ params }: { params: { id: string } }) {
  const session = mockSession; // In a real app, fetch session by params.id

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-2xl">{session.summary.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {session.date}</div>
                <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {session.duration}</div>
                <div className="flex items-center gap-1.5"><Bot className="h-4 w-4" /> <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">{session.personality}</Badge></div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-effect">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg"><Star className="h-5 w-5 text-primary"/> Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm">
                        {session.summary.strengths.map(item => <li key={item} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-green-400 shrink-0"/>{item}</li>)}
                    </ul>
                </CardContent>
            </Card>
            <Card className="glass-effect">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg"><Target className="h-5 w-5 text-destructive/70"/> Areas for Growth</CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-2 text-sm">
                        {session.summary.weaknesses.map(item => <li key={item} className="flex items-start gap-2"><Zap className="h-4 w-4 mt-0.5 text-amber-400 shrink-0"/>{item}</li>)}
                    </ul>
                </CardContent>
            </Card>
        </div>

        <Card className="glass-effect">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><MessageSquare className="h-5 w-5 text-primary"/> Key Discussion Points</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 list-disc list-inside text-sm">
                    {session.summary.keyPoints.map(item => <li key={item}>{item}</li>)}
                </ul>
            </CardContent>
        </Card>

         <Card className="glass-effect">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Lightbulb className="h-5 w-5 text-accent"/> Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-2 text-sm">
                    {session.summary.suggestions.map(item => <li key={item} className="flex items-start gap-2"><Lightbulb className="h-4 w-4 mt-0.5 text-accent shrink-0"/>{item}</li>)}
                </ul>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="glass-effect h-full">
            <CardHeader>
                <CardTitle>Conversation Transcript</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)] p-0">
                <ChatMessages messages={session.messages} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
