import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Calendar, Play, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const data = [
  { subject: 'DSA', A: 75, fullMark: 100 },
  { subject: 'System Design', A: 60, fullMark: 100 },
  { subject: 'Communication', A: 80, fullMark: 100 },
  { subject: 'Resume', A: 85, fullMark: 100 },
  { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const assessments = [
  { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", type: "Technical" },
  { title: "System Design Review", time: "Wed, 2:00 PM", type: "Architecture" },
  { title: "HR Interview Prep", time: "Friday, 11:00 AM", type: "Behavioral" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">Welcome back, Alex</h1>
          <p className="text-muted-foreground text-lg">Your placement preparation journey is on track.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-muted-foreground mb-1">Current Streak</p>
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            12 Days
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overall Readiness */}
        <Card className="col-span-1 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* SVG Circle Progress */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="transparent"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="transparent"
                  stroke="hsl(var(--primary))"
                  strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 88}
                  strokeDashoffset={2 * Math.PI * 88 * (1 - 72 / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-bold font-serif text-foreground">72</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Score</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-[200px]">
              You're in the top 15% of candidates. Keep pushing!
            </p>
          </CardContent>
        </Card>



        {/* Skill Breakdown - Radar Chart */}
        <Card className="card-premium lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-xl">Skill Breakdown</CardTitle>
            <CardDescription>Detailed analysis of your competencies</CardDescription>
          </CardHeader>
          <CardContent className="h-[340px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid
                  stroke="hsl(var(--border))"
                  strokeWidth={0.5}
                  strokeOpacity={0.5}
                />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{
                    fill: 'hsl(var(--muted-foreground))',
                    fontSize: 13,
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Skill Level"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  fill="hsl(var(--primary))"
                  fillOpacity={0.15}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Continue Practice */}
        <Card className="col-span-1 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Continue Practice</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-foreground">Dynamic Programming</h4>
                  <p className="text-xs text-muted-foreground mt-1">Hard • 45 mins est.</p>
                </div>
                <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                  In Progress
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>3/10 problems</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
            <Button className="w-full group">
              Continue Session
              <Play className="w-4 h-4 ml-2 fill-current group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card className="col-span-1 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-muted-foreground">Problems Solved</span>
                <span className="text-xl font-bold font-serif">12<span className="text-muted-foreground text-sm font-sans font-normal">/20</span></span>
              </div>
              <Progress value={60} className="h-2" />
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">Activity Log</p>
              <div className="flex justify-between items-center">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition-colors",
                      [0, 1, 3, 4].includes(i)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border"
                    )}>
                      {day}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Assessments */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessments.map((assessment, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-border">
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center flex-shrink-0 text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{assessment.title}</h4>
                    <p className="text-xs text-primary font-medium mt-0.5">{assessment.time}</p>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-1 rounded">
                    {assessment.type}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 text-muted-foreground hover:text-foreground">
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
