import { useState } from "react";
import { useParams, Link as WouterLink } from "wouter";
import { Layout } from "@/components/layouts/layout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Plus,
  Calendar,
  ListTodo,
  FileText
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Requirement {
  id: number;
  name: string;
  description: string;
  status: "complete" | "in_progress" | "not_started";
}

interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
}

export default function FrameworkDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    priority: "medium"
  });
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

  // Fetch framework
  const { data: framework, isLoading } = useQuery({
    queryKey: [`/api/frameworks/${id}`],
  });

  // Update requirement status
  const updateRequirementMutation = useMutation({
    mutationFn: async ({ requirementId, status }: { requirementId: number, status: string }) => {
      const res = await apiRequest("PATCH", `/api/requirements/${requirementId}`, { status });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/frameworks/${id}`] });
      toast({
        title: "Requirement updated",
        description: "The requirement status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update requirement status.",
        variant: "destructive"
      });
    }
  });

  // Create task
  const createTaskMutation = useMutation({
    mutationFn: async (taskData: any) => {
      const res = await apiRequest("POST", "/api/tasks", {
        ...taskData,
        frameworkId: parseInt(id as string),
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/frameworks/${id}`] });
      setIsTaskDialogOpen(false);
      setNewTask({
        name: "",
        description: "",
        dueDate: "",
        priority: "medium"
      });
      toast({
        title: "Task created",
        description: "New compliance task has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Task creation failed",
        description: error.message || "Failed to create new task.",
        variant: "destructive"
      });
    }
  });

  const handleRequirementStatusChange = (requirementId: number, status: string) => {
    updateRequirementMutation.mutate({ requirementId, status });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTaskMutation.mutate(newTask);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-5 w-5 text-[#4caf50]" />;
      case "in_progress":
        return <Clock className="h-5 w-5 text-[#ff9800]" />;
      case "not_started":
        return <XCircle className="h-5 w-5 text-[#f44336]" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-neutral-500" />;
    }
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

  // Calculate completion percentage
  const completedRequirements = framework?.requirements?.filter((req: Requirement) => req.status === "complete").length || 0;
  const totalRequirements = framework?.requirements?.length || 0;
  const completionPercentage = totalRequirements > 0 ? Math.round((completedRequirements / totalRequirements) * 100) : 0;

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center mb-6">
            <WouterLink href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </WouterLink>
            <h1 className="text-2xl font-semibold text-neutral-700">{framework?.name} Compliance</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Compliance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-3xl font-bold text-primary">{completionPercentage}%</span>
                  <Badge variant={
                    completionPercentage >= 80 ? "compliant" :
                    completionPercentage >= 60 ? "warning" : "attention"
                  }>
                    {completionPercentage >= 80 ? "Compliant" :
                     completionPercentage >= 60 ? "Needs Attention" : "At Risk"}
                  </Badge>
                </div>
                <Progress value={completionPercentage} className="h-2" />
                <p className="text-sm text-neutral-500 mt-2">
                  {completedRequirements} of {totalRequirements} requirements complete
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-primary">{framework?.tasks?.length || 0}</span>
                  <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogDescription>
                          Add a new compliance task for the {framework?.name} framework.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleCreateTask}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Task Name
                            </Label>
                            <Input
                              id="name"
                              value={newTask.name}
                              onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              value={newTask.description}
                              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dueDate" className="text-right">
                              Due Date
                            </Label>
                            <Input
                              id="dueDate"
                              type="date"
                              value={newTask.dueDate}
                              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="priority" className="text-right">
                              Priority
                            </Label>
                            <Select
                              value={newTask.priority}
                              onValueChange={(value) => setNewTask({...newTask, priority: value})}
                            >
                              <SelectTrigger id="priority" className="col-span-3">
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" disabled={createTaskMutation.isPending}>
                            {createTaskMutation.isPending ? "Creating..." : "Create Task"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="text-sm text-neutral-500 mt-2">
                  {framework?.tasks?.filter((t: Task) => t.status !== "complete").length || 0} active tasks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Last Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  <Calendar className="h-6 w-6 inline-block mr-2" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-neutral-500 mt-2">
                  Framework updated today
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>{framework?.name} Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-700 mb-4">
                        {framework?.description || `The ${framework?.name} is a comprehensive data protection regulation that impacts how organizations handle personal data.`}
                      </p>
                      
                      <h3 className="font-medium text-lg mb-2">Key Requirements</h3>
                      <ul className="space-y-2">
                        {framework?.requirements?.slice(0, 5).map((req: Requirement) => (
                          <li key={req.id} className="flex items-start">
                            {getStatusIcon(req.status)}
                            <span className="ml-2">{req.name}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h3 className="font-medium text-lg mt-6 mb-2">Compliance Tips</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-[#ff9800] mr-2" />
                          <span>Regularly review and update your compliance documentation</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-[#ff9800] mr-2" />
                          <span>Train employees on compliance requirements</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-[#ff9800] mr-2" />
                          <span>Keep audit logs of all compliance activities</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ListTodo className="h-5 w-5 mr-2" />
                        Compliance Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Documentation</span>
                            <span className="text-sm">75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </li>
                        <li>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Processes</span>
                            <span className="text-sm">60%</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </li>
                        <li>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Technical Controls</span>
                            <span className="text-sm">40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </li>
                        <li>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Training</span>
                            <span className="text-sm">80%</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </li>
                      </ul>
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-2">Related Documents</h4>
                        <ul className="space-y-2">
                          <li>
                            <WouterLink href="/documents" className="flex items-center text-sm text-primary hover:underline">
                              <FileText className="h-4 w-4 mr-2" />
                              Privacy Policy
                            </WouterLink>
                          </li>
                          <li>
                            <WouterLink href="/documents" className="flex items-center text-sm text-primary hover:underline">
                              <FileText className="h-4 w-4 mr-2" />
                              Data Processing Agreement
                            </WouterLink>
                          </li>
                          <li>
                            <WouterLink href="/documents" className="flex items-center text-sm text-primary hover:underline">
                              <FileText className="h-4 w-4 mr-2" />
                              Data Breach Response Plan
                            </WouterLink>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="requirements">
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Compliance Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-3 font-medium">Requirement</th>
                          <th className="text-left pb-3 font-medium">Description</th>
                          <th className="text-center pb-3 font-medium">Status</th>
                          <th className="text-right pb-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {framework?.requirements?.map((req: Requirement) => (
                          <tr key={req.id}>
                            <td className="py-4 pr-4">
                              <div className="font-medium">{req.name}</div>
                            </td>
                            <td className="py-4 pr-4 text-neutral-600">{req.description}</td>
                            <td className="py-4 text-center">
                              <Badge variant={
                                req.status === "complete" ? "compliant" :
                                req.status === "in_progress" ? "warning" : "attention"
                              }>
                                {req.status === "complete" ? "Complete" :
                                 req.status === "in_progress" ? "In Progress" : "Not Started"}
                              </Badge>
                            </td>
                            <td className="py-4 text-right">
                              <Select
                                value={req.status}
                                onValueChange={(value) => handleRequirementStatusChange(req.id, value)}
                              >
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue placeholder="Change status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="not_started">Not Started</SelectItem>
                                  <SelectItem value="in_progress">In Progress</SelectItem>
                                  <SelectItem value="complete">Complete</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks">
              <Card className="mt-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Compliance Tasks</CardTitle>
                  <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {framework?.tasks?.length === 0 ? (
                    <div className="text-center py-8">
                      <ListTodo className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-neutral-700">No tasks yet</h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        Create tasks to track your compliance activities
                      </p>
                      <Button className="mt-4" onClick={() => setIsTaskDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Task
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {framework?.tasks?.map((task: Task) => (
                        <div key={task.id} className="border rounded-md p-4">
                          <div className="flex items-start">
                            <Checkbox id={`task-${task.id}`} className="mt-1" />
                            <div className="ml-3 flex-1">
                              <div className="flex justify-between">
                                <label htmlFor={`task-${task.id}`} className="font-medium cursor-pointer">
                                  {task.name}
                                </label>
                                <Badge variant={
                                  task.priority === "high" ? "attention" :
                                  task.priority === "medium" ? "warning" : "outline"
                                }>
                                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm text-neutral-600 mt-1">{task.description}</p>
                              <div className="flex justify-between mt-2">
                                <span className="text-xs text-neutral-500">
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-neutral-500">
                                  Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace("_", " ")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
