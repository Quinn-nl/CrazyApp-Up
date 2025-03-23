import { useState } from "react";
import { Layout } from "@/components/layouts/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Slack, 
  MessageSquare, 
  Link, 
  PlusCircle, 
  Lock, 
  Check, 
  Webhook,
  Database,
  FileJson,
  LayoutGrid,
  PlugZap
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

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected";
  category: "communication" | "api" | "storage";
}

export default function Integrations() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  // List of integrations
  const integrations: Integration[] = [
    {
      id: "slack",
      name: "Slack",
      description: "Receive compliance alerts and notifications in your Slack workspace",
      icon: <Slack className="h-6 w-6" />,
      status: "connected",
      category: "communication"
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "Send compliance updates and alerts to Microsoft Teams channels",
      icon: <MessageSquare className="h-6 w-6" />,
      status: "disconnected",
      category: "communication"
    },
    {
      id: "eu-api",
      name: "EU Regulation API",
      description: "Connect to EU legislation API for real-time regulatory updates",
      icon: <FileJson className="h-6 w-6" />,
      status: "connected",
      category: "api"
    },
    {
      id: "us-api",
      name: "US Regulation API",
      description: "Connect to US legislation API for real-time regulatory updates",
      icon: <FileJson className="h-6 w-6" />,
      status: "disconnected",
      category: "api"
    },
    {
      id: "webhooks",
      name: "Webhooks",
      description: "Configure webhooks to trigger actions in external systems",
      icon: <Webhook className="h-6 w-6" />,
      status: "connected",
      category: "api"
    },
    {
      id: "aws-s3",
      name: "AWS S3",
      description: "Store compliance documents securely in Amazon S3",
      icon: <Database className="h-6 w-6" />,
      status: "connected",
      category: "storage"
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Automate compliance workflows across your tools",
      icon: <LayoutGrid className="h-6 w-6" />,
      status: "disconnected",
      category: "api"
    }
  ];

  const connectIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setDialogOpen(true);
  };

  const handleConnectConfirm = () => {
    setDialogOpen(false);
    
    if (selectedIntegration) {
      toast({
        title: "Integration connected",
        description: `${selectedIntegration.name} has been successfully connected.`,
      });
    }
  };

  const handleDisconnect = (integrationId: string) => {
    toast({
      title: "Integration disconnected",
      description: `The integration has been successfully disconnected.`,
    });
  };

  const handleWebhookSave = () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid webhook URL",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Webhook added",
      description: "Your webhook has been successfully configured.",
    });
    setWebhookUrl("");
  };

  // Filter integrations based on active tab
  const filteredIntegrations = activeTab === "all" 
    ? integrations 
    : integrations.filter(integration => integration.category === activeTab);

  // Count connected integrations
  const connectedCount = integrations.filter(i => i.status === "connected").length;
  
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-700">Integrations</h1>
              <p className="mt-1 text-sm text-neutral-500">Connect ComplianceMate with your existing tools</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge variant="outline" className="text-sm py-1">
                {connectedCount} of {integrations.length} Connected
              </Badge>
            </div>
          </div>

          {/* Integration Categories */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full md:w-auto grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="api">APIs & Services</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredIntegrations.map((integration) => (
                  <Card key={integration.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="p-2 bg-primary/10 rounded-md text-primary mr-2">
                            {integration.icon}
                          </div>
                          <div>
                            <CardTitle>{integration.name}</CardTitle>
                            <CardDescription className="text-xs mt-1">
                              {integration.status === "connected" ? (
                                <span className="flex items-center text-[#4caf50]">
                                  <Check className="h-3 w-3 mr-1" /> Connected
                                </span>
                              ) : (
                                <span className="flex items-center text-neutral-500">
                                  Not connected
                                </span>
                              )}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-neutral-600">
                        {integration.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end border-t pt-4">
                      {integration.status === "connected" ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDisconnect(integration.id)}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => connectIntegration(integration)}
                        >
                          Connect
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}

                {/* Add New Integration Card */}
                <Card className="border-dashed hover:border-primary hover:cursor-pointer hover:shadow-md transition-all duration-300">
                  <CardContent className="flex flex-col items-center justify-center h-full py-10">
                    <PlusCircle className="h-12 w-12 text-neutral-300 mb-3" />
                    <p className="text-sm font-medium text-neutral-700">Add New Integration</p>
                    <p className="text-xs text-neutral-500 text-center mt-1">
                      Connect with other services to enhance your compliance
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Webhook Configuration Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-neutral-700 mb-4">Webhook Configuration</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Link className="mr-2 h-5 w-5" />
                  Webhooks
                </CardTitle>
                <CardDescription>
                  Configure webhooks to receive real-time notifications about compliance events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <div className="flex mt-1">
                        <Input
                          id="webhook-url"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          placeholder="https://example.com/webhook"
                          className="flex-1"
                        />
                        <Button className="ml-2" onClick={handleWebhookSave}>Add</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border overflow-hidden">
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            URL
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Events
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-neutral-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                            https://example.com/compliance-webhook
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            All events
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="compliant">Active</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-[#f44336]">Delete</Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                            https://api.company.com/notifications
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            Compliance changes only
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="compliant">Active</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-[#f44336]">Delete</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API Keys Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-neutral-700 mb-4">API Access</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PlugZap className="mr-2 h-5 w-5" />
                  API Keys
                </CardTitle>
                <CardDescription>
                  Manage API keys for accessing ComplianceMate programmatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Key Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          Production API Key
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          May 1, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Switch id="prod-api" defaultChecked />
                            <Label htmlFor="prod-api" className="ml-2">Active</Label>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="outline" size="sm" className="ml-2">
                            <Lock className="h-4 w-4 mr-2" />
                            View Key
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                          Development API Key
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          April 15, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Switch id="dev-api" />
                            <Label htmlFor="dev-api" className="ml-2">Inactive</Label>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="outline" size="sm" className="ml-2">
                            <Lock className="h-4 w-4 mr-2" />
                            View Key
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New API Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Connection Dialog */}
      {selectedIntegration && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect to {selectedIntegration.name}</DialogTitle>
              <DialogDescription>
                Connect your {selectedIntegration.name} account to enable compliance integration.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" placeholder="Enter your API key" />
                </div>
                {selectedIntegration.id === "slack" && (
                  <div>
                    <Label htmlFor="workspace">Workspace URL</Label>
                    <Input id="workspace" placeholder="your-workspace.slack.com" />
                  </div>
                )}
                {selectedIntegration.id === "teams" && (
                  <div>
                    <Label htmlFor="teams-webhook">Teams Webhook URL</Label>
                    <Input id="teams-webhook" placeholder="https://outlook.office.com/webhook/..." />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleConnectConfirm}>Connect</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
}
