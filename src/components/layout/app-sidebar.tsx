import Link from "next/link";
import { Bot, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AppSidebarNav } from "./app-sidebar-nav";

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background/50 backdrop-blur-xl sm:flex">
       <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
            <Bot className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">AeroMind AI</span>
            </Link>
            <AppSidebarNav />
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
            <TooltipTrigger asChild>
                <Link
                href="/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
        </nav>
       </TooltipProvider>
    </aside>
  );
}
