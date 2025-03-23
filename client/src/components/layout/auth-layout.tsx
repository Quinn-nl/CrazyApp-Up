import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";

interface AuthLayoutProps {
  children: ReactNode;
  requireAuth: boolean;
}

export function AuthLayout({ children, requireAuth }: AuthLayoutProps) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  // If the page requires authentication and user is not logged in, redirect to auth page
  if (requireAuth && !isLoading && !user) {
    setLocation("/auth");
    return null;
  }

  // If we're on the auth page and user is logged in, redirect to home
  if (!requireAuth && !isLoading && user) {
    setLocation("/");
    return null;
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Authentication check is complete, render the children
  return <>{children}</>;
}