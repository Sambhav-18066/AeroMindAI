import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Bot, BarChart, Voicemail } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <Voicemail className="h-8 w-8 text-primary" />,
      title: 'Natural Voice Conversations',
      description: 'Engage in fluid, human-like dialogue with our advanced voice-based AI.',
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'Selectable AI Personalities',
      description: 'Choose from various AI modes like Mentor, Friend, or Analyst to tailor your experience.',
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: 'Deep Conversation Analytics',
      description: 'Get insights into your speaking fluency, lexical richness, emotional depth, and more.',
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <main className="container mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 pb-2">
            AeroMind AI
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
            Unlock your potential through reflective conversation. Your personal voice-based AI partner for growth and discovery.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="font-bold text-lg">
              <Link href="/chat">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold text-lg bg-background/50 backdrop-blur-sm">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>

        <div className="relative z-10 mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="glass-effect text-left">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative z-10 mt-24">
          <Card className="glass-effect p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <ol className="text-left space-y-4 text-muted-foreground">
              <li className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                <span><span className="font-semibold text-foreground">Speak Naturally:</span> Use your microphone to talk to your AI partner about your day, ideas, or challenges.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                <span><span className="font-semibold text-foreground">Receive Insights:</span> Our AI provides thoughtful responses and generates a detailed analysis of your conversation.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1 shrink-0" />
                <span><span className="font-semibold text-foreground">Track Your Growth:</span> Review your session summaries and track your progress over time in your personal dashboard.</span>
              </li>
            </ol>
          </Card>
        </div>
      </main>
    </div>
  );
}
