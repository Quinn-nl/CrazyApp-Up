import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

interface ComplianceScoreProps {
  overallScore: number;
  frameworkScores: {
    name: string;
    score: number;
    status: "compliant" | "warning" | "attention";
  }[];
  criticalIssues: number;
  targetScore: number;
  changeFromPrevious?: {
    value: number;
    isPositive: boolean;
  };
}

export function ComplianceScoreCard({
  overallScore,
  frameworkScores,
  criticalIssues,
  targetScore,
  changeFromPrevious
}: ComplianceScoreProps) {
  return (
    <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg leading-6 font-medium text-neutral-700">Overall Compliance Score</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-3xl font-semibold text-primary">{overallScore}%</p>
              {changeFromPrevious && (
                <p className={`ml-2 text-sm ${changeFromPrevious.isPositive ? 'text-[#4caf50]' : 'text-[#f44336]'}`}>
                  <ArrowRight className={`inline mr-1 ${changeFromPrevious.isPositive ? 'rotate-45' : 'rotate-135'}`} size={14} />
                  {changeFromPrevious.isPositive ? '+' : ''}{changeFromPrevious.value}% from last month
                </p>
              )}
            </div>
            <div className="mt-4">
              <div className="relative pt-1">
                <Progress value={overallScore} className="h-2 rounded" />
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>Critical Issues: {criticalIssues}</span>
                  <span>Target Score: {targetScore}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:ml-6 grid grid-cols-3 gap-3">
            {frameworkScores.map((framework) => (
              <div key={framework.name} className="bg-[#f5f7fa] p-3 rounded-md text-center">
                <div className={`text-xl font-semibold ${
                  framework.status === "compliant" ? "text-[#4caf50]" : 
                  framework.status === "warning" ? "text-[#ff9800]" : 
                  "text-[#f44336]"
                }`}>
                  {framework.score}%
                </div>
                <div className="text-xs text-neutral-500">{framework.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
