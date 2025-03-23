import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layouts/layout";
import { ComplianceScoreCard } from "@/components/dashboard/compliance-score-card";
import { ComplianceStatusCard } from "@/components/dashboard/compliance-status-card";
import { FrameworkCard } from "@/components/dashboard/framework-card";
import { AIInsights } from "@/components/dashboard/ai-insights";
import { ActivityLog } from "@/components/dashboard/activity-log";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, FileText, CalendarCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { apiRequest } from "@/lib/queryClient";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['/api/dashboard'],
    enabled: !!user,
  });

  // Handle export report
  const handleExportReport = async () => {
    try {
      setIsExporting(true);
      await apiRequest('GET', '/api/reports/export');
      toast({
        title: "Report exported",
        description: "Your compliance report has been successfully exported.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Process AI insights
  const aiInsights = [
    {
      id: 1,
      title: "GDPR Improvement Opportunity",
      description: "Your Privacy Policy needs to be updated to include the latest EU cookie consent requirements adopted last month."
    },
    {
      id: 2,
      title: "CCPA Automation Potential",
      description: "You could automate your \"Do Not Sell My Info\" request processing to save approximately 5 hours per week based on your current volume."
    },
    {
      id: 3,
      title: "HIPAA Risk Alert",
      description: "Based on your data storage patterns, implementing encryption at rest for your database would improve your HIPAA compliance score by 20%."
    }
  ];

  // Process sample activities if real data not yet available
  const getActivities = () => {
    if (dashboardData?.activities && dashboardData.activities.length > 0) {
      return dashboardData.activities.map(activity => ({
        id: activity.id,
        type: activity.entityType === 'document' ? 'document_update' : 
              activity.entityType === 'task' && activity.action === 'complete' ? 'task_completed' : 
              activity.entityType === 'framework' ? 'compliance_update' : 'upload',
        title: activity.details || 'Activity',
        description: activity.details || '',
        timestamp: new Date(activity.createdAt),
      }));
    }
    
    // Sample data for initial rendering
    return [
      {
        id: 1,
        type: "document_update" as const,
        title: "Privacy Policy",
        description: "Updated GDPR requirements and cookie policy section",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        user: "Alex Johnson"
      },
      {
        id: 2,
        type: "task_completed" as const,
        title: "GDPR Data Processing",
        description: "All data processing activities have been documented and reviewed",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        user: "Sam Wilson"
      },
      {
        id: 3,
        type: "compliance_update" as const,
        title: "Compliance Update",
        description: "California Consumer Privacy Act has new requirements for data deletion requests",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        id: 4,
        type: "upload" as const,
        title: "HIPAA Training Certificates",
        description: "Added 5 new documents to the compliance repository",
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
        user: "Taylor Kim"
      }
    ];
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-700">Dashboard</h1>
              <p className="mt-1 text-sm text-neutral-500">Overview of your compliance status and upcoming tasks</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                onClick={handleExportReport}
                disabled={isExporting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? "Exporting..." : "Export Report"}
              </Button>
            </div>
          </div>

          {/* Compliance Score Summary */}
          <ComplianceScoreCard 
            overallScore={dashboardData?.overallScore || 78}
            frameworkScores={[
              { name: "GDPR", score: 85, status: "compliant" },
              { name: "CCPA", score: 67, status: "warning" },
              { name: "HIPAA", score: 55, status: "attention" }
            ]}
            criticalIssues={2}
            targetScore={90}
            changeFromPrevious={{ value: 5, isPositive: true }}
          />

          {/* Compliance Status Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ComplianceStatusCard
              title="Critical Alerts"
              subtitle="2 items need your immediate attention"
              icon={<AlertCircle className="h-5 w-5 text-[#f44336]" />}
              iconContainerClass="bg-[#f44336] bg-opacity-10"
              items={[
                { 
                  id: 1, 
                  title: "HIPAA Data Encryption Requirements",
                  subtitle: "Due in 3 days",
                  indicator: <span className="w-2 h-2 bg-[#f44336] rounded-full inline-block mt-1.5"></span>
                },
                { 
                  id: 2, 
                  title: "CCPA Privacy Policy Update Required",
                  subtitle: "Due in 7 days",
                  indicator: <span className="w-2 h-2 bg-[#f44336] rounded-full inline-block mt-1.5"></span>
                }
              ]}
              actionLink={{ label: "View all alerts", href: "/audit" }}
            />

            <ComplianceStatusCard
              title="Recent Documents"
              subtitle="3 documents updated in the last week"
              icon={<FileText className="h-5 w-5 text-primary" />}
              iconContainerClass="bg-primary bg-opacity-10"
              items={dashboardData?.recentDocuments?.slice(0, 2).map(doc => ({
                id: doc.id,
                title: doc.title,
                subtitle: `Updated ${formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true })}`,
                indicator: <FileText className="h-4 w-4 text-primary" />
              })) || [
                { 
                  id: 1, 
                  title: "Privacy Policy v2.3",
                  subtitle: "Updated 2 days ago",
                  indicator: <FileText className="h-4 w-4 text-[#f44336]" />
                },
                { 
                  id: 2, 
                  title: "GDPR Compliance Checklist",
                  subtitle: "Updated 5 days ago",
                  indicator: <FileText className="h-4 w-4 text-primary" />
                }
              ]}
              actionLink={{ label: "Manage documents", href: "/documents" }}
            />

            <ComplianceStatusCard
              title="Upcoming Deadlines"
              subtitle="5 compliance tasks due soon"
              icon={<CalendarCheck className="h-5 w-5 text-[#26a69a]" />}
              iconContainerClass="bg-[#26a69a] bg-opacity-10"
              items={[
                { 
                  id: 1, 
                  title: "Quarterly GDPR Review",
                  subtitle: "May 15, 2023",
                  indicator: <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#ff9800] bg-opacity-20 text-[#ff9800] text-xs">15</span>
                },
                { 
                  id: 2, 
                  title: "CCPA Opt-Out Implementation",
                  subtitle: "May 7, 2023",
                  indicator: <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#f44336] bg-opacity-20 text-[#f44336] text-xs">7</span>
                }
              ]}
              actionLink={{ label: "View calendar", href: "/compliance" }}
            />
          </div>

          {/* Compliance Frameworks */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-neutral-700">Compliance Frameworks</h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {(dashboardData?.frameworks || []).map((framework) => (
                <FrameworkCard
                  key={framework.id}
                  id={framework.id}
                  name={framework.name}
                  complianceScore={framework.complianceScore}
                  requirements={[
                    { name: "Data Processing", status: "complete" },
                    { name: "User Consent", status: "complete" },
                    { name: "Privacy Policy", status: "in_progress" },
                    { name: "Data Portability", status: "complete" },
                    { name: "Breach Notification", status: "in_progress" }
                  ].filter((_, idx) => idx < 5)}
                />
              ))}
            </div>
          </div>

          {/* AI Insights Section */}
          <AIInsights 
            insights={aiInsights} 
            onGenerateAnalysis={() => {
              toast({
                title: "Analysis requested",
                description: "Generating comprehensive compliance analysis...",
              });
            }}
          />

          {/* Recent Activity Section */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-neutral-700">Recent Activity</h2>
            <div className="mt-4 bg-white shadow rounded-lg overflow-hidden">
              <ActivityLog 
                activities={getActivities()}
                onViewAll={() => window.location.href = '/audit'}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
