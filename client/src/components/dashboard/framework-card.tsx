import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

type Status = "complete" | "in_progress" | "not_started";

interface Requirement {
  name: string;
  status: Status;
}

interface FrameworkCardProps {
  id: number | string;
  name: string;
  requirements: Requirement[];
  complianceScore: number;
}

export function FrameworkCard({ id, name, requirements, complianceScore }: FrameworkCardProps) {
  // Determine badge type based on score
  const badgeVariant = complianceScore >= 80 
    ? "compliant" 
    : complianceScore >= 60 
      ? "warning" 
      : "attention";

  // Helper to get status text display
  const getStatusDisplay = (status: Status) => {
    switch (status) {
      case "complete":
        return { text: "Complete", className: "text-[#4caf50] font-medium" };
      case "in_progress":
        return { text: "In Progress", className: "text-[#ff9800] font-medium" };
      case "not_started":
        return { text: "Not Started", className: "text-[#f44336] font-medium" };
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:translate-y-[-4px] transition-all duration-300">
      <div className="px-4 py-5 sm:px-6 border-b border-neutral-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-neutral-700">{name}</h3>
        <Badge variant={badgeVariant}>
          {complianceScore}% Compliant
        </Badge>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="space-y-4">
          {requirements.map((req) => (
            <div key={req.name} className="flex justify-between">
              <span className="text-sm text-neutral-500">{req.name}</span>
              <span className={`text-sm ${getStatusDisplay(req.status).className}`}>
                {getStatusDisplay(req.status).text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 bg-[#f5f7fa]">
        <Link 
          href={`/frameworks/${id}`} 
          className="text-sm font-medium text-primary hover:text-primary-dark"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
