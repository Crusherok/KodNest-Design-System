import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Code2, 
  FileCheck, 
  BookOpen, 
  User, 
  Menu,
  ChevronRight,
  ClipboardList
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/practice", label: "Practice", icon: Code2 },
    { href: "/analysis", label: "JD Analysis", icon: FileCheck },
    { href: "/history", label: "History", icon: ClipboardList },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className={cn("flex flex-col h-full bg-sidebar border-r border-sidebar-border", className)}>
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="font-serif text-xl font-bold text-sidebar-foreground tracking-tight">
          KodNest Premium
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Placement Readiness</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = location === link.href;
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <a className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 group",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}>
                <Icon className={cn("w-4 h-4", isActive ? "text-sidebar-primary-foreground" : "text-muted-foreground group-hover:text-sidebar-accent-foreground")} />
                {link.label}
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent/50 p-4 rounded-md">
           <p className="text-xs font-medium text-sidebar-foreground">Weekly Progress</p>
           <div className="w-full bg-sidebar-border h-1.5 rounded-full mt-2 overflow-hidden">
             <div className="bg-green-600 h-full rounded-full" style={{ width: '60%' }}></div>
           </div>
           <p className="text-[10px] text-muted-foreground mt-1.5">12/20 Problems Solved</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [location] = useLocation();
  
  // Extract page title from location
  const getPageTitle = () => {
    if (location.includes("dashboard")) return "Dashboard";
    if (location.includes("practice")) return "Practice";
    if (location.includes("analysis")) return "JD Analysis";
    if (location.includes("history")) return "Analysis History";
    if (location.includes("results")) return "Analysis Results";
    return "Placement Prep";
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r border-sidebar-border bg-sidebar">
                <Sidebar />
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">KodNest</span>
              <ChevronRight className="w-4 h-4 hidden sm:block" />
              <h2 className="font-serif text-lg font-medium text-foreground">{getPageTitle()}</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-medium">Alex Chen</span>
              <span className="text-xs text-muted-foreground">Premium Member</span>
            </div>
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </main>
        
        {/* Proof Footer - Requirement from Design System */}
        <footer className="border-t border-border p-4 bg-muted/20 text-xs text-muted-foreground">
           <div className="max-w-7xl mx-auto flex flex-wrap gap-6 items-center justify-between">
             <div className="flex items-center gap-4">
               <span className="font-medium text-foreground">System Status:</span>
               <div className="flex items-center gap-2">
                 <input type="checkbox" checked readOnly className="rounded border-gray-300 text-primary focus:ring-primary" />
                 <span>UI Built</span>
               </div>
               <div className="flex items-center gap-2">
                 <input type="checkbox" checked readOnly className="rounded border-gray-300 text-primary focus:ring-primary" />
                 <span>Logic Working</span>
               </div>
               <div className="flex items-center gap-2">
                 <input type="checkbox" checked readOnly className="rounded border-gray-300 text-primary focus:ring-primary" />
                 <span>Test Passed</span>
               </div>
             </div>
             <div>© 2026 KodNest Premium Build System</div>
           </div>
        </footer>
      </div>
    </div>
  );
}
