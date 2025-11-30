
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AI_PERSONALITIES } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth, useUser } from "@/firebase";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { doc } from "firebase/firestore";
import { useFirestore } from "@/firebase";

export default function SettingsPage() {
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [defaultPersonality, setDefaultPersonality] = useState('friend');
  const [voiceStyle, setVoiceStyle] = useState('alloy');

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
      
      const savedPrefs = localStorage.getItem(`userPrefs-${user.uid}`);
      if (savedPrefs) {
        const { personality, voice } = JSON.parse(savedPrefs);
        setDefaultPersonality(personality || 'friend');
        setVoiceStyle(voice || 'alloy');
      }
    }
  }, [user]);

  const handleProfileSave = async () => {
    if (user && auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName: name });
        if (firestore) {
          const userDocRef = doc(firestore, 'users', user.uid);
          setDocumentNonBlocking(userDocRef, { name }, { merge: true });
        }
        toast({ title: "Profile updated successfully!" });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error updating profile",
          description: error.message,
        });
      }
    }
  };

  const handlePreferencesSave = () => {
    if (user && firestore) {
      const prefs = { personality: defaultPersonality, voice: voiceStyle };
      localStorage.setItem(`userPrefs-${user.uid}`, JSON.stringify(prefs));
      const userDocRef = doc(firestore, 'users', user.uid);
      setDocumentNonBlocking(userDocRef, { preferredAiPersonality: defaultPersonality }, { merge: true });
      toast({ title: "Preferences saved!" });
    }
  };

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
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} disabled />
            </div>
             <Button onClick={handleProfileSave}>Save Profile</Button>
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
              <Select value={defaultPersonality} onValueChange={setDefaultPersonality}>
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
               <Select value={voiceStyle} onValueChange={setVoiceStyle}>
                <SelectTrigger className="w-full md:w-1/2" id="voice-style">
                  <SelectValue placeholder="Select a voice" />
                </Trigger>
                <SelectContent className="glass-effect">
                  <SelectItem value="alloy">Alloy (Warm, Natural)</SelectItem>
                  <SelectItem value="echo">Echo (Crisp, Clear)</SelectItem>
                  <SelectItem value="nova">Nova (Energetic, Bright)</SelectItem>
                  <SelectItem value="shimmer">Shimmer (Rich, Deep)</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <Button onClick={handlePreferencesSave}>Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
