import { ArrowUp, ArrowDown, Minus, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ScoreCardProps {
  title: string;
  score: number;
  change: number;
  issues: number;
  metRequirements: number;
  totalRequirements: number;
  status: 'good' | 'warning' | 'danger';
}

function ScoreCard({ title, score, change, issues, metRequirements, totalRequirements, status }: ScoreCardProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'good':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          progressColor: 'bg-green-500',
          icon: 'gpp_good'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-700',
          progressColor: 'bg-yellow-500',
          icon: 'gpp_maybe'
        };
      case 'danger':
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          progressColor: 'bg-red-500',
          icon: 'gpp_bad'
        };
    }
  };

  const statusColors = getStatusColor(status);

  const ChangeIndicator = () => {
    if (change > 0) {
      return (
        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-500">
          <ArrowUp className="h-4 w-4" />
          <span className="sr-only">Increased by</span>
          {Math.abs(change)}%
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="ml-2 flex items-baseline text-sm font-semibold text-red-500">
          <ArrowDown className="h-4 w-4" />
          <span className="sr-only">Decreased by</span>
          {Math.abs(change)}%
        </div>
      );
    } else {
      return (
        <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500">
          <Minus className="h-4 w-4" />
          <span className="sr-only">No change</span>
          0%
        </div>
      );
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${statusColors.bg} rounded-md p-3`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${statusColors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">{title} Compliance</dt>
            <dd>
              <div className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{score}%</div>
                <ChangeIndicator />
              </div>
            </dd>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium text-gray-700">{issues} issues need attention</span>
            <span className="text-xs font-medium text-gray-700">{metRequirements}/{totalRequirements} requirements met</span>
          </div>
          <Progress value={score} className="h-2 bg-gray-200" indicatorColor={statusColors.progressColor} />
        </div>
      </div>
    </div>
  );
}

export function ComplianceScoreCard() {
  const handleExportReport = () => {
    // In a real implementation, this would generate and download a PDF report
    alert("Export report functionality would be implemented here");
  };

  return (
    <Card className="bg-white px-5 py-6 sm:px-6 mb-6">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-medium text-gray-900">Overall Compliance Score</h2>
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={handleExportReport}
            >
              <Download className="mr-1 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ScoreCard
            title="GDPR"
            score={85}
            change={12}
            issues={4}
            metRequirements={17}
            totalRequirements={20}
            status="good"
          />
          
          <ScoreCard
            title="CCPA"
            score={65}
            change={5}
            issues={7}
            metRequirements={13}
            totalRequirements={20}
            status="warning"
          />
          
          <ScoreCard
            title="HIPAA"
            score={40}
            change={0}
            issues={12}
            metRequirements={8}
            totalRequirements={20}
            status="danger"
          />
        </div>
      </CardContent>
    </Card>
  );
}
