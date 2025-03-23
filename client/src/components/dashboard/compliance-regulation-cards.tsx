import { Check, AlertTriangle, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ComplianceStatusProps {
  complianceStatus: Array<{
    id: number;
    regulationId: number;
    score: number;
    status: string;
    actionsNeeded: number;
    lastUpdated: string;
    regulation: {
      id: number;
      name: string;
      description: string;
    };
  }>;
}

export default function ComplianceRegulationCards({ complianceStatus = [] }: ComplianceStatusProps) {
  if (!complianceStatus.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No compliance data available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-3">
      {complianceStatus.map((status) => {
        // Determine the border color and icon based on status
        let borderColor = "border-green-500";
        let StatusIcon = Check;
        let iconColor = "text-green-500";
        let badgeColor = "bg-green-100 text-green-800";
        let statusText = "Compliant";

        if (status.status === "partial") {
          borderColor = "border-yellow-500";
          StatusIcon = AlertTriangle;
          iconColor = "text-yellow-500";
          badgeColor = "bg-yellow-100 text-yellow-800";
          statusText = "Partial";
        } else if (status.status === "critical") {
          borderColor = "border-red-500";
          StatusIcon = X;
          iconColor = "text-red-500";
          badgeColor = "bg-red-100 text-red-800";
          statusText = "Critical";
        }

        return (
          <Card key={status.id} className={`border-l-4 ${borderColor} overflow-hidden`}>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <StatusIcon className={`h-8 w-8 ${iconColor}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-lg font-medium text-gray-900">
                      {status.regulation.name}
                    </dt>
                    <dd className="mt-1">
                      <div className="flex items-center">
                        <Progress 
                          value={status.score} 
                          className="w-full h-2.5 bg-gray-200" 
                          indicatorClassName={
                            status.status === "compliant" 
                              ? "bg-green-500" 
                              : status.status === "partial" 
                                ? "bg-yellow-500" 
                                : "bg-red-500"
                          }
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">{status.score}%</span>
                      </div>
                    </dd>
                    <dd className="mt-2 text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
                        {statusText}
                      </span>
                      {status.actionsNeeded > 0 ? (
                        <span className="ml-2">{status.actionsNeeded} actions needed</span>
                      ) : (
                        <span className="ml-2">Last updated: {new Date(status.lastUpdated).toLocaleDateString()}</span>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-4 py-4">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">View details</a>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
