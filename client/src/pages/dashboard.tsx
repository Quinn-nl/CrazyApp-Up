import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import ComplianceOverview from "@/components/dashboard/compliance-overview";
import ComplianceRegulationCards from "@/components/dashboard/compliance-regulation-cards";
import RecentDocuments from "@/components/dashboard/recent-documents";
import UpcomingDeadlines from "@/components/dashboard/upcoming-deadlines";
import RecentActivity from "@/components/dashboard/recent-activity";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Dashboard() {
  const { toast } = useToast();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/dashboard"],
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleGenerateReport = async () => {
    try {
      const response = await apiRequest("POST", "/api/generate-report");
      const report = await response.json();
      
      toast({
        title: "Report Generated",
        description: "Your compliance report has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-slate-50">
          {/* Page Header */}
          <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">Monitor your compliance status at a glance</p>
              </div>
              <div>
                <Button onClick={handleGenerateReport}>
                  Generate Report
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-full py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading dashboard data...</span>
            </div>
          ) : data ? (
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              <ComplianceOverview 
                overallScore={data.overallScore} 
                pendingTasks={data.pendingTasks} 
                upcomingDeadlines={data.upcomingDeadlines?.length || 0} 
              />
              
              <div className="mt-8">
                <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Compliance Status by Regulation</h2>
                <ComplianceRegulationCards complianceStatus={data.complianceStatus} />
              </div>
              
              <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <RecentDocuments documents={data.recentDocuments} />
                <UpcomingDeadlines deadlines={data.upcomingDeadlines} />
              </div>
              
              <div className="mt-8">
                <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h2>
                <RecentActivity activities={data.recentActivities} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <p className="text-gray-500">No data available</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Refresh Dashboard
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
