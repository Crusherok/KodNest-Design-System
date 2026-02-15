import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Code2, Video, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-serif font-bold text-xl">
              K
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">KodNest Premium</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign In</a>
            </Link>
            <Link href="/dashboard">
              <Button className="font-medium">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 md:py-32 px-6 flex-1 flex flex-col items-center justify-center text-center bg-muted/30">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Premium Placement Readiness System
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-foreground leading-[1.1]">
            Ace Your Placement
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Practice, assess, and prepare for your dream job with a coherent, confident, and intentional platform designed for serious candidates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-2xl">Practice Problems</CardTitle>
                <CardDescription className="text-base">
                  Master Data Structures and Algorithms with our curated list of problems tailored for interviews.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-background border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-2xl">Mock Interviews</CardTitle>
                <CardDescription className="text-base">
                  Simulate real interview scenarios with AI-driven mock interviews and get instant feedback.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-background border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-2xl">Track Progress</CardTitle>
                <CardDescription className="text-base">
                  Visualize your growth with detailed analytics and readiness scores to know exactly where you stand.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-serif font-bold text-sm">
              K
            </div>
            <span className="font-serif text-lg font-bold">KodNest</span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; 2026 KodNest Premium Build System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
