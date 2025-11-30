"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { AIPersonality } from "@/lib/data";
import { CheckCircle, icons } from 'lucide-react';
import type { LucideProps } from "lucide-react";

interface AISelectorProps {
  personalities: AIPersonality[];
  selectedPersonality: string;
  onPersonalityChange: (id: string) => void;
}

const DynamicIcon = ({ name, ...props }: { name: keyof typeof icons } & LucideProps) => {
  const Icon = icons[name];
  if (!Icon) return null;
  return <Icon {...props} />;
};


export function AISelector({ personalities, selectedPersonality, onPersonalityChange }: AISelectorProps) {

  return (
    <Card className="glass-effect h-full">
      <CardHeader>
        <CardTitle>Select AI Mode</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)] p-0">
        <ScrollArea className="h-full p-4 pt-0">
          <div className="space-y-2">
            {personalities.map((p) => (
              <button
                key={p.id}
                onClick={() => onPersonalityChange(p.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg border transition-colors relative",
                  selectedPersonality === p.id
                    ? "border-primary/50 bg-primary/10"
                    : "border-transparent hover:bg-muted/50"
                )}
              >
                {selectedPersonality === p.id && (
                  <CheckCircle className="h-5 w-5 text-primary absolute top-2 right-2"/>
                )}
                <div className="flex items-center gap-3">
                  <DynamicIcon name={p.icon} className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
