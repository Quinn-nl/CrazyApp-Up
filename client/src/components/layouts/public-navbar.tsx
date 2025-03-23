
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PublicNavbar() {
  return (
    <nav className="bg-white border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <ShieldCheck className="text-primary text-2xl mr-2" />
              <span className="text-xl font-semibold text-primary">ComplianceMate</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/pricing" className="text-neutral-600 hover:text-neutral-900">Pricing</Link>
            <Link href="/case-studies" className="text-neutral-600 hover:text-neutral-900">Case Studies</Link>
            <Link href="/docs" className="text-neutral-600 hover:text-neutral-900">Documentation</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/auth?mode=signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
