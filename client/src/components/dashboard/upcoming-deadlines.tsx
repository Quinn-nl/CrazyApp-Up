import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

interface Deadline {
  id: number;
  title: string;
  dueDate: string;
  priority: string;
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export default function UpcomingDeadlines({ deadlines = [] }: UpcomingDeadlinesProps) {
  const getPriorityStyles = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          badge: 'bg-red-100 text-red-800'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-600',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      case 'low':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-800'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const calculateTimeRemaining = (dueDate: string) => {
    const now = new Date();
    const deadline = new Date(dueDate);
    const diffTime = Math.abs(deadline.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week(s)`;
    return `${Math.floor(diffDays / 30)} month(s)`;
  };

  return (
    <Card>
      <CardHeader className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <CardTitle className="text-lg leading-6 font-medium text-gray-900">
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white px-4 py-5 sm:p-6">
        {deadlines.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">No upcoming deadlines</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {deadlines.map((deadline) => {
              const styles = getPriorityStyles(deadline.priority);
              const timeRemaining = calculateTimeRemaining(deadline.dueDate);
              
              return (
                <li key={deadline.id} className="py-4">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className={`h-10 w-10 rounded-md ${styles.bg} flex items-center justify-center`}>
                          <Clock className={`h-6 w-6 ${styles.text}`} />
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          {deadline.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {timeRemaining} remaining
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles.badge}`}>
                        {deadline.priority}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 px-4 py-4">
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            View all deadlines <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
