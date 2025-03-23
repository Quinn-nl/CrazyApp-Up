
import Layout from "@/components/layouts/layout";
import { ShieldCheck } from "lucide-react";

interface CaseStudy {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  logo: string;
}

const caseStudies: CaseStudy[] = [
  {
    company: "HealthTech Solutions",
    industry: "Healthcare",
    challenge: "Needed to achieve HIPAA compliance within 3 months",
    solution: "Implemented ComplianceMate's automated HIPAA controls and monitoring",
    results: [
      "Achieved HIPAA compliance in 2 months",
      "Reduced compliance monitoring time by 70%",
      "Successfully passed external audit"
    ],
    logo: "https://placehold.co/100x100"
  },
  {
    company: "FinanceFlow",
    industry: "FinTech",
    challenge: "Complex SOC 2 requirements across multiple products",
    solution: "Utilized ComplianceMate's compliance automation platform",
    results: [
      "SOC 2 Type II certification achieved",
      "50% reduction in compliance costs",
      "Automated 80% of evidence collection"
    ],
    logo: "https://placehold.co/100x100"
  }
];

export default function CaseStudiesPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Case Studies</h1>
        
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <img
                  src={study.logo}
                  alt={`${study.company} logo`}
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h2 className="text-2xl font-semibold">{study.company}</h2>
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
      </div>
    </Layout>
  );
}
