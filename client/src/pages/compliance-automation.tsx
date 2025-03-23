import { useState } from "react";
import { Layout } from "@/components/layouts/layout";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Clipboard, AlertTriangle, Cpu, Calendar, CalendarDays, CheckCircle2 } from "lucide-react";

interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
  frameworkId: number;
}

export default function ComplianceAutomation() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("tasks");

  // Fetch tasks
  const { data: tasks, isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
  });

  // Fetch frameworks 
  const { data: frameworks, isLoading: frameworksLoading } = useQuery({
    queryKey: ['/api/frameworks'],
  });

  const handleRunAutomation = () => {
    toast({
      title: "Automation started",
      description: "Running compliance checks and generating documentation...",
    });
  };

  const handleGeneratePolicy = () => {
    toast({
      title: "Policy generator started",
      description: "AI is now generating your policy document based on your business needs.",
    });
  };

  if (tasksLoading || frameworksLoading) {
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

  // Organize tasks by priority
  const highPriorityTasks = tasks?.filter(task => task.priority === "high") || [];
  const mediumPriorityTasks = tasks?.filter(task => task.priority === "medium") || [];
  const lowPriorityTasks = tasks?.filter(task => task.priority === "low") || [];

  // Get tasks by framework
  const getTasksByFramework = (frameworkId: number) => {
    return tasks?.filter(task => task.frameworkId === frameworkId) || [];
  };

  // Get task status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-[#4caf50]";
      case "in_progress":
        return "text-[#ff9800]";
      case "not_started":
        return "text-[#f44336]";
      default:
        return "text-neutral-500";
    }
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-700">Compliance Automation</h1>
              <p className="mt-1 text-sm text-neutral-500">Automate your compliance processes and tasks</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button variant="outline" onClick={handleGeneratePolicy}>
                <Cpu className="mr-2 h-4 w-4" />
                Generate Policy
              </Button>
              <Button onClick={handleRunAutomation}>
                <Cpu className="mr-2 h-4 w-4" />
                Run Automation
              </Button>
            </div>
          </div>

          <Alert className="mt-6 border-[#ff9800] bg-[#ff9800]/10">
            <AlertTriangle className="h-4 w-4 text-[#ff9800]" />
            <AlertTitle className="text-[#ff9800]">Compliance Update Detected</AlertTitle>
            <AlertDescription>
              California Consumer Privacy Act has new requirements for data deletion requests. Click to learn more.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="tasks" value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="automation">Automation Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <Card>
                  <CardHeader className="pb-3 bg-[#f44336]/10">
                    <CardTitle className="text-lg flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-[#f44336]" />
                      High Priority
                    </CardTitle>
                    <CardDescription>Tasks that need immediate attention</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {highPriorityTasks.length === 0 ? (
                      <p className="text-center text-sm text-neutral-500">No high priority tasks</p>
                    ) : (
                      <div className="space-y-4">
                        {highPriorityTasks.map(task => (
                          <div key={task.id} className="flex items-start space-x-3">
                            <Checkbox id={`task-${task.id}`} />
                            <div>
                              <label 
                                htmlFor={`task-${task.id}`} 
                                className="text-sm font-medium cursor-pointer"
                              >
                                {task.name}
                              </label>
                              <p className="text-xs text-neutral-500 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3 bg-[#ff9800]/10">
                    <CardTitle className="text-lg flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-[#ff9800]" />
                      Medium Priority
                    </CardTitle>
                    <CardDescription>Tasks that need attention soon</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {mediumPriorityTasks.length === 0 ? (
                      <p className="text-center text-sm text-neutral-500">No medium priority tasks</p>
                    ) : (
                      <div className="space-y-4">
                        {mediumPriorityTasks.map(task => (
                          <div key={task.id} className="flex items-start space-x-3">
                            <Checkbox id={`task-${task.id}`} />
                            <div>
                              <label 
                                htmlFor={`task-${task.id}`} 
                                className="text-sm font-medium cursor-pointer"
                              >
                                {task.name}
                              </label>
                              <p className="text-xs text-neutral-500 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3 bg-[#4caf50]/10">
                    <CardTitle className="text-lg flex items-center">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#4caf50]" />
                      Low Priority
                    </CardTitle>
                    <CardDescription>Tasks that need attention eventually</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {lowPriorityTasks.length === 0 ? (
                      <p className="text-center text-sm text-neutral-500">No low priority tasks</p>
                    ) : (
                      <div className="space-y-4">
                        {lowPriorityTasks.map(task => (
                          <div key={task.id} className="flex items-start space-x-3">
                            <Checkbox id={`task-${task.id}`} />
                            <div>
                              <label 
                                htmlFor={`task-${task.id}`} 
                                className="text-sm font-medium cursor-pointer"
                              >
                                {task.name}
                              </label>
                              <p className="text-xs text-neutral-500 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-xl font-semibold text-neutral-700 mt-8 mb-4">Framework Tasks</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {frameworks?.map(framework => (
                  <Card key={framework.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{framework.name}</CardTitle>
                        <Badge variant={
                          framework.complianceScore >= 80 ? "compliant" :
                          framework.complianceScore >= 60 ? "warning" : "attention"
                        }>
                          {framework.complianceScore}% Complete
                        </Badge>
                      </div>
                      <CardDescription>{framework.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <Progress value={framework.complianceScore} className="h-2 mb-4" />
                      <div className="space-y-4">
                        {getTasksByFramework(framework.id).map(task => (
                          <div key={task.id} className="flex items-start space-x-3">
                            <Checkbox id={`fw-task-${task.id}`} />
                            <div>
                              <label 
                                htmlFor={`fw-task-${task.id}`} 
                                className="text-sm font-medium cursor-pointer"
                              >
                                {task.name}
                              </label>
                              <p className="text-xs text-neutral-500 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="link" className="px-0">View all tasks</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar">
              <div className="bg-white rounded-lg shadow mt-6 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-neutral-700">May 2023</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Today
                    </Button>
                    <Button variant="outline" size="sm">&lt;</Button>
                    <Button variant="outline" size="sm">&gt;</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-sm font-medium text-neutral-600 py-2">{day}</div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center">
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const isToday = day === 3;
                    const hasTask = [7, 15].includes(day);
                    const isUrgent = day === 7;
                    
                    return (
                      <div 
                        key={day} 
                        className={`p-2 min-h-16 border rounded-md flex flex-col ${
                          isToday ? 'bg-primary/10 border-primary' : 'hover:bg-neutral-50'
                        }`}
                      >
                        <span className={`text-sm ${isToday ? 'font-bold text-primary' : ''}`}>{day}</span>
                        {hasTask && (
                          <div className={`mt-1 text-xs p-1 rounded ${
                            isUrgent ? 'bg-[#f44336]/10 text-[#f44336]' : 'bg-[#ff9800]/10 text-[#ff9800]'
                          }`}>
                            {isUrgent ? 'CCPA Opt-Out' : 'GDPR Review'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="automation">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Cpu className="mr-2 h-5 w-5 text-primary" />
                      AI-Powered Document Generation
                    </CardTitle>
                    <CardDescription>
                      Generate compliance documents automatically based on your business profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                        <div className="flex items-center">
                          <Clipboard className="h-5 w-5 text-primary mr-2" />
                          <span className="font-medium">Privacy Policy</span>
                        </div>
                        <Button size="sm">Generate</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                        <div className="flex items-center">
                          <Clipboard className="h-5 w-5 text-primary mr-2" />
                          <span className="font-medium">Data Processing Agreement</span>
                        </div>
                        <Button size="sm">Generate</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                        <div className="flex items-center">
                          <Clipboard className="h-5 w-5 text-primary mr-2" />
                          <span className="font-medium">Cookie Consent Banner</span>
                        </div>
                        <Button size="sm">Generate</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                      Automated Compliance Scans
                    </CardTitle>
                    <CardDescription>
                      Schedule automated scans to verify your compliance status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                        <div className="flex items-center">
                          <span className="font-medium">Weekly GDPR Scan</span>
                        </div>
                        <Badge variant="compliant">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                        <div className="flex items-center">
                          <span className="font-medium">Monthly CCPA Compliance Check</span>
                        </div>
                        <Badge variant="compliant">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                        <div className="flex items-center">
                          <span className="font-medium">HIPAA Data Security Scan</span>
                        </div>
                        <Badge variant="outline">Not Active</Badge>
                      </div>
                      <Button className="w-full">Configure Scans</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
