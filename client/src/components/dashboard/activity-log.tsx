import { formatDistanceToNow } from "date-fns";
import { 
  FileEdit, 
  CheckCircle, 
  AlertTriangle, 
  Upload 
} from "lucide-react";

type ActivityType = "document_update" | "task_completed" | "compliance_update" | "upload";

interface Activity {
  id: number | string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
}

interface ActivityLogProps {
  activities: Activity[];
  onViewAll?: () => void;
}

export function ActivityLog({ activities, onViewAll }: ActivityLogProps) {
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "document_update":
        return (
          <div className="h-8 w-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center ring-8 ring-white">
            <FileEdit className="h-4 w-4 text-primary" />
          </div>
        );
      case "task_completed":
        return (
          <div className="h-8 w-8 bg-[#4caf50] bg-opacity-10 rounded-full flex items-center justify-center ring-8 ring-white">
            <CheckCircle className="h-4 w-4 text-[#4caf50]" />
          </div>
        );
      case "compliance_update":
        return (
          <div className="h-8 w-8 bg-[#ff9800] bg-opacity-10 rounded-full flex items-center justify-center ring-8 ring-white">
            <AlertTriangle className="h-4 w-4 text-[#ff9800]" />
          </div>
        );
      case "upload":
        return (
          <div className="h-8 w-8 bg-[#f5f7fa] rounded-full flex items-center justify-center ring-8 ring-white">
            <Upload className="h-4 w-4 text-neutral-500" />
          </div>
        );
    }
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-neutral-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative px-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="min-w-0 flex-1 py-1.5">
                  <div className="text-sm text-neutral-700">
                    <span className="font-medium">{activity.title}</span>
                    {activity.user && (
                      <span> was updated by <span className="font-medium">{activity.user}</span></span>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-neutral-500">
                    {activity.description}
                  </div>
                </div>
                <div className="whitespace-nowrap text-right text-sm text-neutral-500">
                  <time dateTime={activity.timestamp.toISOString()}>
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </time>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {onViewAll && (
        <div className="px-4 py-4 sm:px-6 border-t border-neutral-200 bg-[#f5f7fa]">
          <button 
            onClick={onViewAll}
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            View all activity
          </button>
        </div>
      )}
    </div>
  );
}
