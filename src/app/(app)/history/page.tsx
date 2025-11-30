import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Bot, Clock, Calendar } from "lucide-react";

const sessionHistory = [
  { id: "1", date: "2024-07-28", duration: "15m 42s", personality: "Mentor", summary: "Discussed career goals and potential next steps." },
  { id: "2", date: "2024-07-27", duration: "8m 12s", personality: "Friend", summary: "Talked about a stressful day at work." },
  { id: "3", date: "2024-07-25", duration: "22m 05s", personality: "Future Self", summary: "Explored long-term aspirations and fears." },
  { id: "4", date: "2024-07-24", duration: "12m 30s", personality: "Analyst", summary: "Broke down a complex problem logically." },
  { id: "5", date: "2024-07-22", duration: "18m 55s", personality: "Storyteller", summary: "Co-created a short sci-fi story." },
];

export default function HistoryPage() {
  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle>Session History</CardTitle>
        <CardDescription>Review your past conversations and summaries.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessionHistory.map((session) => (
            <Link href={`/session/${session.id}`} key={session.id} className="block">
              <Card className="glass-effect hover:border-primary/50 transition-colors">
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{session.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-muted-foreground" />
                     <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">{session.personality}</Badge>
                  </div>
                  <p className="md:col-span-3 text-muted-foreground truncate">{session.summary}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
