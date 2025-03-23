
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export default function CaseStudiesPage() {
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
        <h1 className="text-4xl font-bold mb-8">Case Studies</h1>
        
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{study.company}</h2>
                  <p className="text-gray-600">{study.industry}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Challenge</h3>
                  <p className="text-gray-600">{study.challenge}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Solution</h3>
                  <p className="text-gray-600">{study.solution}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Results</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {study.results.map((result, i) => (
                      <li key={i}>{result}</li>
                    ))}
                  </ul>
                </div>
              </div>
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

const caseStudies = [
  {
    company: "TechCorp Solutions",
    industry: "Enterprise SaaS",
    challenge: "Needed to achieve SOC 2 compliance quickly to close enterprise deals",
    solution: "Implemented ComplianceMate's automated compliance monitoring and documentation system",
    results: [
      "Achieved SOC 2 Type 1 in 3 months",
      "Closed 5 enterprise deals worth $2M",
      "Reduced compliance maintenance by 70%"
    ]
  },
  {
    company: "HealthTech Pro",
    industry: "Healthcare Technology",
    challenge: "Complex HIPAA compliance requirements slowing down product development",
    solution: "Used ComplianceMate's healthcare compliance templates and automated monitoring",
    results: [
      "Maintained continuous HIPAA compliance",
      "Reduced compliance overhead by 60%",
      "Accelerated release cycles by 40%"
    ]
  }
];
