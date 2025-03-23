
import { Shield, Users, BarChart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About ComplianceMate</h1>
        <p className="text-xl text-neutral-600 mb-12">
          We're on a mission to make compliance simple and accessible for SaaS companies of all sizes.
        </p>

        <div className="grid gap-8 mb-12">
          <div className="flex items-start">
            <Shield className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-neutral-600">
                To simplify compliance management and help businesses build trust with their customers through transparent security practices.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Users className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Team</h3>
              <p className="text-neutral-600">
                We're a diverse team of compliance experts, engineers, and customer success professionals dedicated to your success.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <BarChart className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Impact</h3>
              <p className="text-neutral-600">
                Helping over 1,000 companies achieve and maintain compliance with various regulatory frameworks.
              </p>
            </div>
          </div>
        </div>

        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
          Get Started with ComplianceMate
        </button>
      </div>
    </div>
  );
}
