import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  CheckCheck, 
  ShieldCheck, 
  FileText, 
  BarChart3, 
  Clock, 
  Cpu,
  LucideIcon,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-start p-6 bg-white rounded-lg shadow-sm border border-neutral-100">
      <div className="rounded-full bg-primary/10 p-3 mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
}

export default function HomePage() {
  const { user } = useAuth();
  
  // Redirect to dashboard if user is logged in
  if (user) {
    window.location.href = "/dashboard";
    return null;
  }
  
  return (
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <ShieldCheck className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">ComplianceMate</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link href="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Compliance management <span className="text-primary">made easy</span> for SaaS companies
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Automate your compliance with regulations like GDPR, CCPA, and HIPAA, saving time and reducing risk.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Schedule Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-neutral-${i * 100}`} />
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Join 1,000+ companies already using ComplianceMate</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-primary/10 rounded-full z-0"></div>
                <div className="relative z-10 bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden">
                  <div className="p-6 bg-neutral-50 border-b border-neutral-100">
                    <div className="flex items-center">
                      <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Compliance Dashboard</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="text-sm font-medium mb-2">Overall Compliance Score</h4>
                      <div className="flex items-center">
                        <div className="w-20 h-20 rounded-full border-8 border-primary flex items-center justify-center text-2xl font-bold">
                          89%
                        </div>
                        <div className="ml-4">
                          <div className="text-sm text-green-600 font-medium flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-1"></span>
                            9% increase
                          </div>
                          <p className="text-xs text-neutral-500">from last month</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Framework Status</h4>
                      <div className="space-y-3">
                        {[
                          { name: "GDPR", progress: 92 },
                          { name: "CCPA", progress: 78 },
                          { name: "HIPAA", progress: 65 },
                        ].map((framework) => (
                          <div key={framework.name}>
                            <div className="flex justify-between text-xs mb-1">
                              <span>{framework.name}</span>
                              <span>{framework.progress}%</span>
                            </div>
                            <div className="w-full bg-neutral-100 rounded-full h-2">
                              <div
                                className="bg-primary rounded-full h-2"
                                style={{ width: `${framework.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful features to simplify compliance</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our platform provides everything you need to manage compliance requirements efficiently and effectively.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature 
              icon={Cpu}
              title="AI-Powered Insights"
              description="Leverage artificial intelligence to identify compliance gaps and receive actionable recommendations."
            />
            <Feature 
              icon={FileText}
              title="Document Management"
              description="Centralize and organize all your compliance documents in one secure, searchable repository."
            />
            <Feature 
              icon={CheckCheck}
              title="Automated Compliance"
              description="Automate repetitive compliance tasks and workflows to save time and reduce errors."
            />
            <Feature 
              icon={ShieldCheck}
              title="Risk Assessment"
              description="Identify, assess, and mitigate compliance risks with comprehensive risk management tools."
            />
            <Feature 
              icon={BarChart3}
              title="Real-time Reporting"
              description="Generate detailed compliance reports and track progress with customizable dashboards."
            />
            <Feature 
              icon={Clock}
              title="Deadline Tracking"
              description="Never miss a compliance deadline with automated reminders and task management."
            />
          </div>
        </div>
      </section>
      
      {/* Compliance Frameworks Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Supporting all major compliance frameworks</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              ComplianceMate helps you stay compliant with a wide range of regulations and standards.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {["GDPR", "CCPA", "HIPAA", "SOC 2", "ISO 27001", "PCI DSS"].map((framework) => (
              <div key={framework} className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm border border-neutral-100">
                <ShieldCheck className="h-10 w-10 text-primary mb-3" />
                <span className="font-medium">{framework}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to simplify compliance management?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Join thousands of SaaS companies using ComplianceMate to streamline their compliance processes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Start Your Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Compliance Guides</Link></li>
                <li><Link href="/webinars" className="hover:text-white transition-colors">Webinars</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/gdpr" className="hover:text-white transition-colors">GDPR Compliance</Link></li>
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