import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Building2, Briefcase } from "lucide-react";
import { format } from "date-fns";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("analysisHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-medium text-foreground mb-2">Analysis History</h1>
          <p className="text-muted-foreground text-lg">
            Review your past job analyses and preparation plans.
          </p>
        </div>
        <Link href="/analysis">
          <Button>New Analysis</Button>
        </Link>
      </div>

      {history.length === 0 ? (
        <Card className="border-dashed border-2 border-muted bg-muted/10">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No analyses yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Start by pasting a job description to generate your first tailored preparation plan.
            </p>
            <Link href="/analysis">
              <Button>Start Analysis</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <Link key={item.id} href={`/results/${item.id}`}>
              <a className="block group">
                <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="rounded-sm font-normal text-muted-foreground">
                          {format(new Date(item.createdAt), "MMM d, yyyy")}
                        </Badge>
                        {item.company && (
                          <span className="flex items-center text-sm font-medium text-primary">
                            <Building2 className="w-3.5 h-3.5 mr-1.5" />
                            {item.company}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl font-medium mb-1 group-hover:text-primary transition-colors">
                        {item.role || "General Role Analysis"}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.extractedSkills.slice(0, 5).map((skill: any, i: number) => (
                          <span key={i} className="text-xs bg-muted/50 px-2 py-1 rounded text-muted-foreground">
                            {skill.name}
                          </span>
                        ))}
                        {item.extractedSkills.length > 5 && (
                          <span className="text-xs bg-muted/50 px-2 py-1 rounded text-muted-foreground">
                            +{item.extractedSkills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8 pl-6 border-l border-border">
                      <div className="text-center">
                        <span className="block text-2xl font-bold font-serif text-primary">
                          {item.readinessScore}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Score</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
