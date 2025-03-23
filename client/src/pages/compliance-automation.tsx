import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Loader2, ShieldCheck } from "lucide-react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function ComplianceAutomation() {
  const { toast } = useToast();
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null);
  
  // Fetch compliance data
  const { data: complianceData, isLoading } = useQuery({
    queryKey: ["/api/compliance"],
  });

  // Update compliance status
  const updateComplianceMutation = useMutation({
    mutationFn: async ({ regulationId, status }: { regulationId: number; status: any }) => {
      const res = await apiRequest("PUT", `/api/compliance/${regulationId}`, status);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Compliance Updated",
        description: "Compliance status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/compliance"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update compliance status.",
        variant: "destructive",
      });
    },
  });

  // Find the selected regulation
  const regulation = selectedRegulation 
    ? complianceData?.find((r: any) => r.regulation.name === selectedRegulation) 
    : null;

  // Get requirements for the selected regulation
  const getRequirements = (name: string) => {
    switch (name) {
      case "GDPR":
        return [
          "Data processing registry",
          "Privacy policy",
          "User consent management",
          "Data breach notification procedure",
          "Data protection impact assessment",
          "Right to be forgotten implementation",
          "Data portability support",
          "Data minimization practices"
        ];
      case "CCPA":
        return [
          "Privacy notice",
          "Opt-out mechanism",
          "Data inventory and mapping",
          "Consumer rights processes",
          "Staff training",
          "Vendor management",
          "Data security measures",
          "Record keeping practices"
        ];
      case "HIPAA":
        return [
          "Security risk assessment",
          "Privacy policies and procedures",
          "Security safeguards",
          "Access controls",
          "Audit controls",
          "Integrity controls",
          "Transmission security",
          "Business associate agreements"
        ];
      default:
        return [];
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (index: number, checked: boolean) => {
    if (!regulation) return;
    
    const requirements = getRequirements(regulation.regulation.name);
    const totalRequirements = requirements.length;
    const currentCheckedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
    
    // Calculate new score based on checked items
    const newScore = Math.round((currentCheckedCount / totalRequirements) * 100);
    
    // Determine status based on score
    let newStatus = "critical";
    if (newScore >= 80) newStatus = "compliant";
    else if (newScore >= 50) newStatus = "partial";
    
    // Calculate actions needed
    const newActionsNeeded = totalRequirements - currentCheckedCount;
    
    // Update compliance status
    updateComplianceMutation.mutate({
      regulationId: regulation.regulationId,
      status: {
        userId: regulation.userId,
        regulationId: regulation.regulationId,
        score: newScore,
        status: newStatus,
        actionsNeeded: newActionsNeeded,
      }
    });
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
                <h1 className="text-2xl font-semibold text-gray-900">Compliance Automation</h1>
                <p className="mt-1 text-sm text-gray-500">Track and automate compliance tasks for various regulations</p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading compliance data...</span>
            </div>
          ) : (
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              {/* Regulation Selection */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {complianceData?.map((compliance: any) => (
                  <Card 
                    key={compliance.id}
                    className={`cursor-pointer border-2 ${selectedRegulation === compliance.regulation.name ? "border-blue-500" : "border-gray-200"}`}
                    onClick={() => setSelectedRegulation(compliance.regulation.name)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <ShieldCheck 
                          className={
                            compliance.status === "compliant" 
                              ? "h-8 w-8 text-green-500" 
                              : compliance.status === "partial" 
                                ? "h-8 w-8 text-yellow-500" 
                                : "h-8 w-8 text-red-500"
                          }
                        />
                        <h3 className="text-xl font-medium text-gray-900 ml-3">{compliance.regulation.name}</h3>
                      </div>
                      <div className="mb-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Compliance Score</span>
                          <span className="text-sm font-medium text-gray-900">{compliance.score}%</span>
                        </div>
                        <Progress 
                          value={compliance.score} 
                          className="h-2 bg-gray-200 mt-1" 
                          indicatorClassName={
                            compliance.status === "compliant" 
                              ? "bg-green-500" 
                              : compliance.status === "partial" 
                                ? "bg-yellow-500" 
                                : "bg-red-500"
                          }
                        />
                      </div>
                      <p className="text-sm text-gray-500">{compliance.regulation.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Selected Regulation Requirements */}
              {selectedRegulation && regulation && (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedRegulation} Compliance Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getRequirements(selectedRegulation).map((requirement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Checkbox 
                            id={`requirement-${index}`} 
                            // Start with some random items checked based on compliance score
                            defaultChecked={Math.random() < (regulation.score / 100)}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange(index, checked as boolean)
                            }
                          />
                          <div className="space-y-1 leading-none">
                            <Label
                              htmlFor={`requirement-${index}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {requirement}
                            </Label>
                            <p className="text-xs text-gray-500">
                              Implement and document this requirement for {selectedRegulation} compliance.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Last updated: {new Date(regulation.lastUpdated).toLocaleString()}
                      </span>
                      <Button 
                        variant="outline"
                        disabled={updateComplianceMutation.isPending}
                      >
                        {updateComplianceMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Generate Compliance Report"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!selectedRegulation && (
                <div className="text-center py-10">
                  <ShieldCheck className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Select a Regulation</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose a regulation from above to view and update compliance requirements.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
