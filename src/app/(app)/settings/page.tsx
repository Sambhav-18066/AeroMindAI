import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AI_PERSONALITIES } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold">Settings</h1>

      <div className="grid gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Alex Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex@example.com" />
            </div>
             <Button>Save Profile</Button>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your application experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">Select your preferred color scheme.</p>
              </div>
              <ThemeToggle />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="default-personality">Default AI Personality</Label>
              <Select defaultValue="friend">
                <SelectTrigger className="w-full md:w-1/2" id="default-personality">
                  <SelectValue placeholder="Select a personality" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  {AI_PERSONALITIES.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voice-style">AI Voice Style</Label>
               <Select defaultValue="alloy">
                <SelectTrigger className="w-full md:w-1/2" id="voice-style">
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  <SelectItem value="alloy">Alloy (Warm, Natural)</SelectItem>
                  <SelectItem value="echo">Echo (Crisp, Clear)</SelectItem>
                  <SelectItem value="nova">Nova (Energetic, Bright)</SelectItem>
                  <SelectItem value="shimmer">Shimmer (Rich, Deep)</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <Button>Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
