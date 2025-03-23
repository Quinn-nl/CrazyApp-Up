import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Issue {
  id: number;
  title: string;
  description: string;
  regulation: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'not-started';
  action: string;
  actionLink: string;
}

const issues: Issue[] = [
  {
    id: 1,
    title: 'Missing consent mechanism for cookies',
    description: 'Cookie banner needs implementation',
    regulation: 'GDPR',
    severity: 'critical',
    status: 'pending',
    action: 'Fix',
    actionLink: '#'
  },
  {
    id: 2,
    title: 'Incomplete data inventory',
    description: 'Missing 40% of system data mapping',
    regulation: 'CCPA',
    severity: 'high',
    status: 'in-progress',
    action: 'Continue',
    actionLink: '#'
  },
  {
    id: 3,
    title: 'No data breach response plan',
    description: 'Required for HIPAA compliance',
    regulation: 'HIPAA',
    severity: 'critical',
    status: 'not-started',
    action: 'Start',
    actionLink: '#'
  },
  {
    id: 4,
    title: 'Privacy notice out of date',
    description: 'Last updated 11 months ago',
    regulation: 'GDPR',
    severity: 'medium',
    status: 'pending',
    action: 'Fix',
    actionLink: '#'
  }
];

export function ComplianceIssuesCard() {
  const getRegulationBadge = (regulation: string) => {
    switch (regulation) {
      case 'GDPR':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">{regulation}</Badge>;
      case 'CCPA':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{regulation}</Badge>;
      case 'HIPAA':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">{regulation}</Badge>;
      default:
        return <Badge variant="outline">{regulation}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pending</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>;
      case 'not-started':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Not Started</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white px-5 py-6 sm:px-6">
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Top Compliance Issues</h2>
          <Button variant="link" className="text-sm text-primary-600 hover:text-primary-700 p-0">
            View All Issues
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Regulation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                    <div className="text-xs text-gray-500">{issue.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRegulationBadge(issue.regulation)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSeverityBadge(issue.severity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(issue.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href={issue.actionLink} className="text-primary-600 hover:text-primary-900">{issue.action}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
