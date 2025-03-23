
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export default function GuidesPage() {
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Compliance Guides</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{guide.title}</h2>
              <p className="text-gray-600 mb-4">{guide.description}</p>
              <Link href={guide.link}>
                <Button variant="outline" className="w-full">Read More</Button>
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="/webinars" className="hover:text-white transition-colors">Webinars</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
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

const guides = [
  {
    title: "Getting Started with Compliance",
    description: "Learn the basics of compliance and how to get started with ComplianceMate.",
    link: "/guides/getting-started"
  },
  {
    title: "ISO 27001 Compliance",
    description: "A comprehensive guide to achieving ISO 27001 certification.",
    link: "/guides/iso-27001"
  },
  {
    title: "GDPR Compliance",
    description: "Everything you need to know about GDPR compliance.",
    link: "/guides/gdpr"
  }
];
