import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  pageName: string;
}

export default function PlaceholderPage({ title, description, pageName }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <ShieldCheck className="h-8 w-8 text-primary mr-2" />
              <span className="font-bold text-xl">ComplianceMate</span>
            </div>
          </Link>
          <div className="flex space-x-4">
            <Link href="/auth">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/auth?tab=register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
          <p className="text-lg text-gray-600 mb-8">{description}</p>
          
          <div className="prose max-w-none">
            <p className="text-neutral-500">
              This is a placeholder page for <strong>{pageName}</strong>. In a production environment, 
              this page would contain detailed information about {pageName.toLowerCase()}.
            </p>
            
            <p className="mt-4 text-neutral-500">
              For now, you can <Link href="/" className="text-primary hover:underline">return to the homepage</Link> or 
              <Link href="/auth" className="text-primary hover:underline ml-1">log in to your account</Link>.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ShieldCheck className="h-6 w-6 text-primary mr-2" />
              <span className="text-white font-bold">ComplianceMate</span>
            </div>
            <p>© {new Date().getFullYear()} ComplianceMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}