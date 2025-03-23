import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

// Pages
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import AuthPage from "@/pages/auth-page";
import DocumentManagement from "@/pages/document-management";
import ComplianceAutomation from "@/pages/compliance-automation";
import AuditRisk from "@/pages/audit-risk";
import Integrations from "@/pages/integrations";
import Settings from "@/pages/settings";
import FrameworkDetails from "@/pages/framework-details";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/documents" component={DocumentManagement} />
      <ProtectedRoute path="/compliance" component={ComplianceAutomation} />
      <ProtectedRoute path="/audit" component={AuditRisk} />
      <ProtectedRoute path="/integrations" component={Integrations} />
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute path="/frameworks/:id" component={FrameworkDetails} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
