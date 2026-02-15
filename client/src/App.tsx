import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import DashboardLayout from "@/layouts/dashboard-layout";
import Dashboard from "@/pages/dashboard";
import Practice from "@/pages/practice";
import Analysis from "@/pages/analysis";
import History from "@/pages/history";
import Results from "@/pages/results";
import Resources from "@/pages/resources";
import Profile from "@/pages/profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      
      {/* Dashboard Routes wrapped in Layout */}
      <Route path="/dashboard">
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </Route>
      <Route path="/practice">
        <DashboardLayout>
          <Practice />
        </DashboardLayout>
      </Route>
      <Route path="/analysis">
        <DashboardLayout>
          <Analysis />
        </DashboardLayout>
      </Route>
      <Route path="/history">
        <DashboardLayout>
          <History />
        </DashboardLayout>
      </Route>
      <Route path="/results/:id?">
        <DashboardLayout>
          <Results />
        </DashboardLayout>
      </Route>
      <Route path="/resources">
        <DashboardLayout>
          <Resources />
        </DashboardLayout>
      </Route>
      <Route path="/profile">
        <DashboardLayout>
          <Profile />
        </DashboardLayout>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
