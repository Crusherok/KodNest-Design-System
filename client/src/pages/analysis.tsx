import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight } from "lucide-react";
import { analyzeJobDescription } from "@/lib/analysis-utils";

export default function Analysis() {
  const [jdText, setJdText] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!jdText.trim()) {
      toast({
        title: "Input Required",
        description: "Please paste a job description to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate processing delay for "premium" feel
    setTimeout(() => {
      try {
        const result = analyzeJobDescription(jdText, company, role);
        
        // Store in localStorage
        const history = JSON.parse(localStorage.getItem("analysisHistory") || "[]");
        history.unshift(result);
        localStorage.setItem("analysisHistory", JSON.stringify(history));
        
        // Navigate to results
        setLocation(`/results/${result.id}`);
      } catch (error) {
        console.error(error);
        toast({
          title: "Analysis Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        setIsAnalyzing(false);
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-serif text-3xl font-medium text-foreground mb-2">Job Analysis</h1>
        <p className="text-muted-foreground text-lg">
          Paste a job description to generate a tailored preparation plan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Primary Workspace - Input */}
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif">Job Details</CardTitle>
            <CardDescription>Enter the position details below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name (Optional)</Label>
                <Input 
                  id="company" 
                  placeholder="e.g. Google, Amazon" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role Title (Optional)</Label>
                <Input 
                  id="role" 
                  placeholder="e.g. Frontend Engineer" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jd">Job Description / Requirements <span className="text-red-500">*</span></Label>
              <Textarea 
                id="jd" 
                placeholder="Paste the full job description here..." 
                className="min-h-[300px] font-mono text-sm leading-relaxed p-4 bg-muted/10 resize-none focus-visible:ring-primary"
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground text-right">
                {jdText.length} characters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Panel - Context & Actions */}
        <div className="space-y-6">
          <Card className="border-border shadow-sm bg-muted/20">
            <CardHeader>
              <CardTitle className="text-lg font-serif">How it works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Our system uses heuristic analysis to extract key technical skills, requirements, and soft skills from the job description.
              </p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Skill extraction & categorization</li>
                <li>Readiness score calculation</li>
                <li>7-day tailored study plan</li>
                <li>Predicted interview questions</li>
              </ul>
            </CardContent>
          </Card>

          <Button 
            size="lg" 
            className="w-full h-14 text-base shadow-md transition-all hover:scale-[1.02]"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !jdText.trim()}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Generate Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
