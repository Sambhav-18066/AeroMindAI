import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BarChart, Clock, Hash, LineChart } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Line, LineChart as RechartsLineChart, ResponsiveContainer } from "recharts"

const chartData = [
  { month: "January", wpm: 125, richness: 0.45 },
  { month: "February", wpm: 130, richness: 0.48 },
  { month: "March", wpm: 128, richness: 0.47 },
  { month: "April", wpm: 135, richness: 0.52 },
  { month: "May", wpm: 140, richness: 0.55 },
  { month: "June", wpm: 138, richness: 0.53 },
]

const chartConfig = {
  wpm: {
    label: "WPM",
    color: "hsl(var(--primary))",
  },
  richness: {
    label: "Richness",
    color: "hsl(var(--accent))",
  },
}

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="glass-effect xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-lg bg-primary/10">
                        <Hash className="h-6 w-6 text-primary mb-2"/>
                        <p className="text-xs text-primary/80">Total Sessions</p>
                        <p className="text-2xl font-bold">42</p>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/10">
                        <Clock className="h-6 w-6 text-accent mb-2"/>
                        <p className="text-xs text-accent/80">Avg. Session</p>
                        <p className="text-2xl font-bold">12m 34s</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="glass-effect">
            <CardHeader>
                <CardTitle>Fluency (WPM)</CardTitle>
                <CardDescription>Your words per minute over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="h-[150px] w-full">
                    <RechartsBarChart accessibilityLayer data={chartData}>
                         <CartesianGrid vertical={false} />
                         <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                         <YAxis hide/>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="wpm" fill="var(--color-wpm)" radius={4} />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card className="glass-effect xl:col-span-3">
            <CardHeader>
                <CardTitle>Lexical Richness & Identity Depth</CardTitle>
                <CardDescription>Your conversational richness and depth over time.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <RechartsLineChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                         <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" hide/>
                        <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" hide/>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="richness" stroke="hsl(var(--accent))" strokeWidth={2} yAxisId="right" dot={false} />
                        <Line type="monotone" dataKey="wpm" stroke="hsl(var(--primary))" strokeWidth={2} yAxisId="left" dot={false} />
                    </RechartsLineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}
