import { Badge } from "@/components/ui/badge";
import { LightbulbIcon } from "lucide-react";

interface Insight {
  id: number | string;
  title: string;
  description: string;
}

interface AIInsightsProps {
  insights: Insight[];
  onGenerateAnalysis?: () => void;
}

export function AIInsights({ insights, onGenerateAnalysis }: AIInsightsProps) {
  return (
    <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-neutral-200">
        <h3 className="text-lg font-medium text-neutral-700">AI-Generated Insights</h3>
        <Badge variant="secondary">
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 mr-1" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
            </svg>
            Powered by AI
          </span>
        </Badge>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="space-y-5">
          {insights.map((insight) => (
            <div key={insight.id} className="flex">
              <div className="flex-shrink-0">
                <LightbulbIcon className="h-5 w-5 text-[#26a69a]" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-neutral-700">{insight.title}</h4>
                <p className="mt-1 text-sm text-neutral-500">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 bg-[#f5f7fa]">
        <button 
          onClick={onGenerateAnalysis}
          className="text-sm font-medium text-primary hover:text-primary-dark"
        >
          Generate comprehensive analysis
        </button>
      </div>
    </div>
  );
}
