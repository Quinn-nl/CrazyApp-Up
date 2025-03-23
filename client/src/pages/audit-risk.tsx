import { useState } from "react";
import Layout from "@/components/layouts/layout";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ShieldAlert, FileCheck, Activity, AlertTriangle, Download, Bell } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

interface Risk {
  id: number;
  name: string;
  description: string;
  severity: "high" | "medium" | "low";
  status: "mitigated" | "in_progress" | "identified";
  framework: string;
}

export default function AuditRisk() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("risks");

  // Fetch notifications
  const { data: notifications, isLoading: notificationsLoading } = useQuery<Notification[]>({
    queryKey: ['/api/notifications'],
  });

  // Mock risk data
  const risks: Risk[] = [
    {
      id: 1,
      name: "Unsecured Data Transmission",
      description: "Data is being transmitted without proper encryption, violating HIPAA requirements",
      severity: "high",
      status: "identified",
      framework: "HIPAA"
    },
    {
      id: 2,
      name: "Outdated Privacy Policy",
      description: "Privacy policy does not include latest CCPA requirements for data subject rights",
      severity: "high",
      status: "in_progress",
      framework: "CCPA"
    },
    {
      id: 3,
      name: "Incomplete Data Processing Records",
      description: "GDPR Article 30 requires complete records of processing activities",
      severity: "medium",
      status: "in_progress",
      framework: "GDPR"
    },
    {
      id: 4,
      name: "Weak Authentication Mechanisms",
      description: "User authentication does not meet HIPAA security rule requirements",
      severity: "medium",
      status: "identified",
      framework: "HIPAA"
    },
    {
      id: 5,
      name: "Missing Cookie Consent",
      description: "Website does not properly obtain consent for non-essential cookies",
      severity: "medium",
      status: "mitigated",
      framework: "GDPR"
    },
  ];

  const handleExportReport = () => {
    toast({
      title: "Report exported",
      description: "Your audit report has been exported successfully.",
    });
  };

  const handleRunAudit = () => {
    toast({
      title: "Audit initiated",
      description: "A compliance audit is now running. You will be notified when it completes.",
    });
  };

  if (notificationsLoading) {
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

  const unreadNotifications = notifications?.filter(n => !n.read) || [];
  const allNotifications = notifications || [];

  // Filter risks by severity
  const highRisks = risks.filter(risk => risk.severity === "high");
  const mediumRisks = risks.filter(risk => risk.severity === "medium");
  const lowRisks = risks.filter(risk => risk.severity === "low");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-[#f44336]";
      case "medium":
        return "text-[#ff9800]";
      case "low":
        return "text-[#4caf50]";
      default:
        return "text-neutral-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "mitigated":
        return <Badge variant="compliant">Mitigated</Badge>;
      case "in_progress":
        return <Badge variant="warning">In Progress</Badge>;
      case "identified":
        return <Badge variant="attention">Identified</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-700">Audit & Risk Management</h1>
              <p className="mt-1 text-sm text-neutral-500">Monitor and manage compliance risks</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button variant="outline" onClick={handleExportReport}>
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Button onClick={handleRunAudit}>
                <Activity className="mr-2 h-4 w-4" />
                Run Audit
              </Button>
            </div>
          </div>

          {/* Risk Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-[#f44336]">
                  <ShieldAlert className="mr-2 h-5 w-5" />
                  High Risks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="font-bold text-3xl text-[#f44336]">{highRisks.length}</div>
                  <Progress value={highRisks.filter(r => r.status === "mitigated").length / highRisks.length * 100 || 0} className="h-2 w-20" />
                </div>
                <p className="text-sm text-neutral-500 mt-1">
                  {highRisks.filter(r => r.status === "mitigated").length} of {highRisks.length} mitigated
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-[#ff9800]">
                  <ShieldAlert className="mr-2 h-5 w-5" />
                  Medium Risks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="font-bold text-3xl text-[#ff9800]">{mediumRisks.length}</div>
                  <Progress value={mediumRisks.filter(r => r.status === "mitigated").length / mediumRisks.length * 100 || 0} className="h-2 w-20" />
                </div>
                <p className="text-sm text-neutral-500 mt-1">
                  {mediumRisks.filter(r => r.status === "mitigated").length} of {mediumRisks.length} mitigated
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-[#4caf50]">
                  <ShieldAlert className="mr-2 h-5 w-5" />
                  Low Risks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="font-bold text-3xl text-[#4caf50]">{lowRisks.length}</div>
                  <Progress value={lowRisks.filter(r => r.status === "mitigated").length / lowRisks.length * 100 || 0} className="h-2 w-20" />
                </div>
                <p className="text-sm text-neutral-500 mt-1">
                  {lowRisks.filter(r => r.status === "mitigated").length} of {lowRisks.length} mitigated
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="risks" value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="risks">Risks</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="audits">Audit History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="risks">
              <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Risk</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Framework</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Severity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {risks.map((risk) => (
                        <tr key={risk.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-neutral-900">{risk.name}</div>
                            <div className="text-sm text-neutral-500">{risk.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-neutral-100 text-neutral-800">
                              {risk.framework}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${getSeverityColor(risk.severity)}`}>
                              {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(risk.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button size="sm" variant="outline">Manage</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="bg-white rounded-lg shadow mt-6">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-medium">Notifications</h2>
                  <Badge variant="outline">{unreadNotifications.length} unread</Badge>
                </div>
                <div className="divide-y">
                  {allNotifications.length === 0 ? (
                    <div className="p-6 text-center">
                      <Bell className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-neutral-700">No notifications</h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        You're all caught up! No compliance notifications at this time.
                      </p>
                    </div>
                  ) : (
                    allNotifications.map((notification) => (
                      <div key={notification.id} className={`p-4 ${notification.read ? '' : 'bg-primary/5'}`}>
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 rounded-full p-1 ${
                            notification.type === 'warning' ? 'bg-[#ff9800]/10 text-[#ff9800]' :
                            notification.type === 'info' ? 'bg-primary/10 text-primary' : 'bg-[#f44336]/10 text-[#f44336]'
                          }`}>
                            {notification.type === 'warning' ? (
                              <AlertTriangle className="h-5 w-5" />
                            ) : notification.type === 'info' ? (
                              <FileCheck className="h-5 w-5" />
                            ) : (
                              <ShieldAlert className="h-5 w-5" />
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-neutral-900">{notification.title}</p>
                              {!notification.read && (
                                <span className="ml-2 flex-shrink-0 inline-block h-2 w-2 rounded-full bg-[#f44336]"></span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-neutral-500">{notification.message}</p>
                            <p className="mt-1 text-xs text-neutral-400">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audits">
              <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Audit</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Findings</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-neutral-900">GDPR Quarterly Audit</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          May 1, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="compliant">Completed</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          2 issues found
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button size="sm" variant="outline">View Report</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-neutral-900">HIPAA Security Assessment</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          April 15, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="compliant">Completed</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          5 issues found
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button size="sm" variant="outline">View Report</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-neutral-900">CCPA Compliance Review</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          March 20, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="compliant">Completed</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          3 issues found
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button size="sm" variant="outline">View Report</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
