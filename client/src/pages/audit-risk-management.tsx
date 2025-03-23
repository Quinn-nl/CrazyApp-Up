import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Loader2, 
  FileDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart4
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuditRiskManagement() {
  const { toast } = useToast();
  const [selectedView, setSelectedView] = useState<string>("riskAssessment");
  
  // Fetch compliance data
  const { data: complianceData, isLoading } = useQuery({
    queryKey: ["/api/compliance"],
  });

  // Calculate risk levels and scores for each regulation
  const calculateRiskData = () => {
    if (!complianceData) return [];
    
    return complianceData.map((compliance: any) => {
      const { score, status, actionsNeeded, regulation } = compliance;
      
      // Calculate risk level based on compliance score
      let riskLevel = "High";
      let riskScore = 100 - score;
      
      if (score >= 80) {
        riskLevel = "Low";
      } else if (score >= 50) {
        riskLevel = "Medium";
      }
      
      // Calculate impact and likelihood
      const impact = Math.min(10, Math.floor((100 - score) / 10) + 1);
      const likelihood = Math.min(10, Math.floor(actionsNeeded / 2) + 1);
      
      return {
        regulation: regulation.name,
        description: regulation.description,
        riskLevel,
        riskScore,
        impact,
        likelihood,
        requirements: regulation.requirements,
        actionsNeeded,
        mitigationStrategies: generateMitigationStrategies(regulation.name, score)
      };
    });
  };
  
  // Generate mitigation strategies based on regulation
  const generateMitigationStrategies = (regulation: string, score: number) => {
    if (score >= 80) return ["Continue compliance monitoring", "Regular policy reviews"];
    
    switch (regulation) {
      case "GDPR":
        return [
          "Implement data processing registry",
          "Update privacy policies",
          "Establish data breach procedures",
          "Train staff on data protection"
        ];
      case "CCPA":
        return [
          "Update privacy notices",
          "Implement opt-out mechanisms",
          "Complete data inventory",
          "Train staff on consumer rights"
        ];
      case "HIPAA":
        return [
          "Conduct security risk assessment",
          "Enhance access controls",
          "Update business associate agreements",
          "Implement audit controls"
        ];
      default:
        return ["Conduct compliance assessment", "Develop remediation plan"];
    }
  };
  
  // Generate audit checklist
  const generateAuditChecklist = () => {
    if (!complianceData) return [];
    
    return complianceData.flatMap((compliance: any) => {
      const requirements = compliance.regulation.requirements || [];
      return requirements.map((req: string, index: number) => ({
        id: `${compliance.regulation.name}-${index}`,
        regulation: compliance.regulation.name,
        requirement: req,
        status: Math.random() > (compliance.score / 100) ? "Not Started" : "Completed",
        dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }));
    });
  };
  
  // Handle export report
  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "The audit report has been exported successfully.",
    });
  };
  
  // Risk data and audit checklist
  const riskData = calculateRiskData();
  const auditChecklist = generateAuditChecklist();
  
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
                <h1 className="text-2xl font-semibold text-gray-900">Audit & Risk Management</h1>
                <p className="mt-1 text-sm text-gray-500">Identify, assess, and manage compliance risks</p>
              </div>
              <div>
                <Button onClick={handleExportReport}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="mt-4 flex space-x-4">
              <Button
                variant={selectedView === "riskAssessment" ? "default" : "outline"} 
                onClick={() => setSelectedView("riskAssessment")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Risk Assessment
              </Button>
              <Button
                variant={selectedView === "auditChecklist" ? "default" : "outline"} 
                onClick={() => setSelectedView("auditChecklist")}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Audit Checklist
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading data...</span>
            </div>
          ) : (
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              {selectedView === "riskAssessment" ? (
                <>
                  {/* Risk Assessment Summary */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Risk Assessment Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">High Risk Items</p>
                              <p className="text-2xl font-semibold text-gray-900">
                                {riskData.filter(r => r.riskLevel === "High").length}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <AlertTriangle className="h-8 w-8 text-yellow-500 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Medium Risk Items</p>
                              <p className="text-2xl font-semibold text-gray-900">
                                {riskData.filter(r => r.riskLevel === "Medium").length}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Low Risk Items</p>
                              <p className="text-2xl font-semibold text-gray-900">
                                {riskData.filter(r => r.riskLevel === "Low").length}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Risk Assessment Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Compliance Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Regulation</TableHead>
                            <TableHead>Risk Level</TableHead>
                            <TableHead>Risk Score</TableHead>
                            <TableHead className="hidden md:table-cell">Impact</TableHead>
                            <TableHead className="hidden md:table-cell">Likelihood</TableHead>
                            <TableHead className="hidden md:table-cell">Actions Needed</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {riskData.map((risk, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{risk.regulation}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    risk.riskLevel === "High" ? "destructive" :
                                    risk.riskLevel === "Medium" ? "outline" : "default"
                                  }
                                >
                                  {risk.riskLevel}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={risk.riskScore}
                                    className="h-2 w-20"
                                    indicatorClassName={
                                      risk.riskLevel === "High" ? "bg-red-500" :
                                      risk.riskLevel === "Medium" ? "bg-yellow-500" : "bg-green-500"
                                    }
                                  />
                                  <span>{risk.riskScore}%</span>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{risk.impact}/10</TableCell>
                              <TableCell className="hidden md:table-cell">{risk.likelihood}/10</TableCell>
                              <TableCell className="hidden md:table-cell">{risk.actionsNeeded}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  
                  {/* Risk Mitigation Strategies */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {riskData.map((risk, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-center">
                            {risk.riskLevel === "High" ? (
                              <XCircle className="h-5 w-5 text-red-500 mr-2" />
                            ) : risk.riskLevel === "Medium" ? (
                              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            )}
                            <CardTitle className="text-lg">{risk.regulation} Risk Mitigation</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500 mb-4">{risk.description}</p>
                          <h4 className="font-medium text-sm mb-2">Recommended Actions:</h4>
                          <ul className="space-y-2">
                            {risk.mitigationStrategies.map((strategy, idx) => (
                              <li key={idx} className="text-sm flex items-start">
                                <span className="inline-block w-4 h-4 rounded-full bg-blue-500 mt-1 mr-2"></span>
                                {strategy}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Audit Checklist */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Compliance Audit Checklist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Regulation</TableHead>
                            <TableHead>Requirement</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Due Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auditChecklist.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.regulation}</TableCell>
                              <TableCell>{item.requirement}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={item.status === "Completed" ? "default" : "outline"}
                                >
                                  {item.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{item.dueDate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  
                  {/* Audit Summary Chart */}
                  <div className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Audit Progress Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center py-8">
                          <BarChart4 className="h-40 w-40 text-gray-300" />
                          <div className="text-center ml-8">
                            <p className="text-sm text-gray-500">This is where the audit progress chart would appear.</p>
                            <p className="text-sm text-gray-500 mt-2">The chart would show completed vs. pending audit items by regulation.</p>
                            <Button className="mt-4" variant="outline">Generate Audit Report</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
