import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { ProtectedRoute } from "./lib/protected-route";
import Dashboard from "@/pages/dashboard";
import AuthPage from "@/pages/auth-page";
import DocumentManagement from "@/pages/document-management";
import ComplianceAutomation from "@/pages/compliance-automation";
import AuditRiskManagement from "@/pages/audit-risk-management";
import Integrations from "@/pages/integrations";
import Settings from "@/pages/settings";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/documents" component={DocumentManagement} />
      <ProtectedRoute path="/compliance" component={ComplianceAutomation} />
      <ProtectedRoute path="/audit" component={AuditRiskManagement} />
      <ProtectedRoute path="/integrations" component={Integrations} />
      <ProtectedRoute path="/settings" component={Settings} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
