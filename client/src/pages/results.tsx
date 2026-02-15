import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ArrowLeft, Download, Share2, Calendar, Target, BrainCircuit, ListChecks } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Results() {
  const [match, params] = useRoute("/results/:id?");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("analysisHistory");
    if (saved) {
      const history = JSON.parse(saved);
      if (params?.id) {
        const found = history.find((item: any) => item.id === params.id);
        setData(found || history[0]);
      } else if (history.length > 0) {
        setData(history[0]);
      }
    }
  }, [params?.id]);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-medium mb-4">No analysis found</h2>
        <Link href="/analysis">
          <Button>Start New Analysis</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-border pb-6">
        <div>
          <Link href="/history">
            <Button variant="ghost" size="sm" className="pl-0 text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to History
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-serif text-3xl font-medium text-foreground">
              {data.role || "Analysis Results"}
            </h1>
            {data.company && (
              <Badge variant="secondary" className="font-normal text-sm">
                @ {data.company}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            Analyzed on {format(new Date(data.createdAt), "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 bg-primary text-primary-foreground border-none shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="relative w-24 h-24 flex items-center justify-center mb-4">
               <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="44" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="transparent"
                  stroke="white"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 44}
                  strokeDashoffset={2 * Math.PI * 44 * (1 - data.readinessScore / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-3xl font-bold font-serif">{data.readinessScore}</span>
            </div>
            <p className="font-medium text-center opacity-90">Readiness Score</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-serif">Extracted Skills Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.extractedSkills.length > 0 ? (
                data.extractedSkills.map((skill: any, i: number) => (
                  <Badge 
                    key={i} 
                    variant="secondary" 
                    className="px-3 py-1 text-sm font-normal bg-muted/50 border-border"
                  >
                    {skill.category}: <span className="font-medium ml-1 text-foreground">{skill.name}</span>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No specific skills detected. Standard fresher profile applied.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Plan Tabs */}
      <Tabs defaultValue="plan" className="w-full">
        <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 h-auto rounded-none mb-6">
          <TabsTrigger 
            value="plan" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 font-medium"
          >
            <Calendar className="w-4 h-4 mr-2" />
            7-Day Plan
          </TabsTrigger>
          <TabsTrigger 
            value="checklist" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 font-medium"
          >
            <ListChecks className="w-4 h-4 mr-2" />
            Round Checklist
          </TabsTrigger>
          <TabsTrigger 
            value="questions" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 font-medium"
          >
            <BrainCircuit className="w-4 h-4 mr-2" />
            Interview Questions
          </TabsTrigger>
        </TabsList>

        {/* 7-Day Plan Content */}
        <TabsContent value="plan" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.plan.map((day: any, i: number) => (
              <Card key={i} className="border-border hover:shadow-md transition-shadow">
                <CardHeader className="bg-muted/30 pb-3 border-b border-border">
                  <div className="flex justify-between items-center">
                    <Badge className="bg-primary text-white hover:bg-primary/90">Day {day.day}</Badge>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {i < 2 ? "Phase 1: Foundation" : i < 5 ? "Phase 2: Deep Dive" : "Phase 3: Polish"}
                    </span>
                  </div>
                  <CardTitle className="font-serif text-lg mt-2">{day.focus}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {day.tasks.map((task: string, j: number) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Circle className="w-4 h-4 mt-0.5 text-primary/40 shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Round Checklist Content */}
        <TabsContent value="checklist" className="mt-0">
          <div className="grid gap-6">
            {data.checklist.map((round: any, i: number) => (
              <Card key={i} className="border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    {round.round}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {round.items.map((item: string, j: number) => (
                      <div key={j} className="flex items-center gap-3 p-3 rounded bg-muted/10 border border-muted/20">
                         <div className="w-5 h-5 rounded border border-muted-foreground/30 flex items-center justify-center shrink-0 cursor-pointer hover:border-primary">
                           <CheckCircle2 className="w-4 h-4 text-transparent hover:text-primary/20" />
                         </div>
                         <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Interview Questions Content */}
        <TabsContent value="questions" className="mt-0">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif">Likely Interview Questions</CardTitle>
              <CardDescription>Based on the extracted skills and role requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.questions.map((q: any, i: number) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/10 border border-muted/20 hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="text-primary font-bold font-serif text-xl opacity-50">Q{i + 1}.</span>
                      <div>
                        <p className="font-medium text-foreground text-lg mb-2">{q.question}</p>
                        <Badge variant="outline" className="text-xs font-normal">
                          {q.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
