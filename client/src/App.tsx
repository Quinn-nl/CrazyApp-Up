import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import { AuthLayout } from "@/components/layout/auth-layout";

function App() {
  return (
    <>
      <Switch>
        <Route path="/auth">
          <AuthLayout requireAuth={false}>
            <AuthPage />
          </AuthLayout>
        </Route>
        <Route path="/">
          <AuthLayout requireAuth={true}>
            <HomePage />
          </AuthLayout>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
