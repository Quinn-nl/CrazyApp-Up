import { ArrowRight, Calendar, AlertTriangle, ClipboardCheck, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Deadline {
  id: number;
  title: string;
  due: string;
  status: 'upcoming' | 'overdue' | 'normal';
  type: 'event' | 'priority' | 'assignment' | 'security';
}

const deadlines: Deadline[] = [
  {
    id: 1,
    title: 'GDPR Cookie Policy Update',
    due: 'Due in 5 days (May 15, 2023)',
    status: 'upcoming',
    type: 'event'
  },
  {
    id: 2,
    title: 'CCPA Annual Data Audit',
    due: 'Overdue by 2 days',
    status: 'overdue',
    type: 'priority'
  },
  {
    id: 3,
    title: 'HIPAA Security Risk Assessment',
    due: 'Due in 14 days (May 24, 2023)',
    status: 'normal',
    type: 'assignment'
  },
  {
    id: 4,
    title: 'Quarterly Compliance Review',
    due: 'Due in 21 days (May 31, 2023)',
    status: 'normal',
    type: 'security'
  }
];

export function DeadlinesCard() {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-yellow-100 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 border-red-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  const getIconStyles = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-yellow-500 text-white';
      case 'overdue':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-5 w-5" />;
      case 'priority':
        return <AlertTriangle className="h-5 w-5" />;
      case 'assignment':
        return <ClipboardCheck className="h-5 w-5" />;
      case 'security':
        return <ShieldCheck className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  return (
    <Card className="bg-white px-5 py-6 sm:px-6">
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h2>
          <Button variant="link" className="text-sm text-primary-600 hover:text-primary-700 p-0">
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div key={deadline.id} className={`flex items-center p-3 rounded-lg border ${getStatusStyles(deadline.status)}`}>
              <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center ${getIconStyles(deadline.status)} rounded-md`}>
                {getIcon(deadline.type)}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                <p className="text-xs text-gray-500">{deadline.due}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2 flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span className="sr-only">View details</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
