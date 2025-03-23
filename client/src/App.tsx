import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

// Main Pages
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import AuthPage from "@/pages/auth-page";
import DocumentManagement from "@/pages/document-management";
import ComplianceAutomation from "@/pages/compliance-automation";
import AuditRisk from "@/pages/audit-risk";
import Integrations from "@/pages/integrations";
import Settings from "@/pages/settings";
import FrameworkDetails from "@/pages/framework-details";
import HomePage from "@/pages/home-page";

// Product Pages
import PricingPage from "@/pages/pricing";
import CaseStudiesPage from "@/pages/case-studies";
import DocsPage from "@/pages/docs";

// Company Pages
import AboutPage from "@/pages/about";
import CareersPage from "@/pages/careers";
import BlogPage from "@/pages/blog";
import ContactPage from "@/pages/contact";

// Resources Pages
import HelpCenterPage from "@/pages/help";
import GuidesPage from "@/pages/guides";
import WebinarsPage from "@/pages/webinars";
import CommunityPage from "@/pages/community";

// Legal Pages
import PrivacyPolicyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import SecurityPage from "@/pages/security";
import GDPRPage from "@/pages/gdpr";

function Router() {
  return (
    <Switch>
      {/* Main Application Routes */}
      <Route path="/" component={HomePage} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/documents" component={DocumentManagement} />
      <ProtectedRoute path="/compliance" component={ComplianceAutomation} />
      <ProtectedRoute path="/audit" component={AuditRisk} />
      <ProtectedRoute path="/integrations" component={Integrations} />
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute path="/frameworks/:id" component={FrameworkDetails} />
      <Route path="/auth" component={AuthPage} />
      
      {/* Product Pages */}
      <Route path="/pricing" component={PricingPage} />
      <Route path="/case-studies" component={CaseStudiesPage} />
      <Route path="/docs" component={DocsPage} />
      
      {/* Company Pages */}
      <Route path="/about" component={AboutPage} />
      <Route path="/careers" component={CareersPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/contact" component={ContactPage} />
      
      {/* Resources Pages */}
      <Route path="/help" component={HelpCenterPage} />
      <Route path="/guides" component={GuidesPage} />
      <Route path="/webinars" component={WebinarsPage} />
      <Route path="/community" component={CommunityPage} />
      
      {/* Legal Pages */}
      <Route path="/privacy" component={PrivacyPolicyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/security" component={SecurityPage} />
      <Route path="/gdpr" component={GDPRPage} />
      
      {/* 404 Page */}
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
