import Layout from "@/components/layouts/layout";
import { Building2, Trophy } from "lucide-react";

const caseStudies = [
  {
    company: "TechCorp Solutions",
    industry: "Software & Technology",
    challenge: "Needed to achieve SOC 2 compliance quickly for enterprise clients.",
    solution: "Implemented ComplianceMate's automated compliance monitoring.",
    results: [
      "Achieved SOC 2 Type II in 4 months",
      "Reduced compliance overhead by 60%",
      "Secured 3 enterprise contracts"
    ]
  },
  {
    company: "HealthTech Innovations",
    industry: "Healthcare",
    challenge: "Complex HIPAA compliance requirements slowing down development.",
    solution: "Deployed ComplianceMate's healthcare compliance framework.",
    results: [
      "Full HIPAA compliance maintained",
      "Development velocity increased by 40%",
      "Passed all external audits"
    ]
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{study.company}</h2>
                  <p className="text-gray-600">{study.industry}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  <Trophy className="h-6 w-6 text-yellow-500" />
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