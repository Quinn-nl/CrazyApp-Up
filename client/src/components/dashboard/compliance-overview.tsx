import { ArrowUpIcon, ArrowDownIcon, BarChart3, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ComplianceOverviewProps {
  overallScore: number;
  pendingTasks: number;
  upcomingDeadlines: number;
}

export default function ComplianceOverview({ 
  overallScore = 0, 
  pendingTasks = 0, 
  upcomingDeadlines = 0 
}: ComplianceOverviewProps) {
  // Logic for determining score change direction
  const scoreChange = 6; // This would typically come from the API
  const scoreChangeDirection = scoreChange >= 0 ? 'up' : 'down';
  
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {/* Overall Compliance Score */}
      <Card>
        <CardContent className="p-0">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Overall Compliance Score
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {overallScore}%
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      {scoreChangeDirection === 'up' ? (
                        <ArrowUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                      )}
                      <span className="sr-only">
                        {scoreChangeDirection === 'up' ? 'Increased by' : 'Decreased by'}
                      </span>
                      {Math.abs(scoreChange)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                View details
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card>
        <CardContent className="p-0">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Tasks
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {pendingTasks}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <ArrowUpIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                      <span className="sr-only">Increased by</span>
                      4
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                View tasks
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardContent className="p-0">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Upcoming Deadlines
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {upcomingDeadlines}
                    </div>
                    {upcomingDeadlines > 0 && (
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-600">
                        Next: GDPR Policy Update (2 days)
                      </div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                View all deadlines
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
