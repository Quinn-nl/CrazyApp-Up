import { useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Zap, 
  Globe, 
  MessageSquare, 
  Bell, 
  Calendar, 
  Github, 
  FileText, 
  Lock,
  AlertCircle,
  ToggleLeft,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Integration categories and items
const integrationCategories = [
  {
    id: "notifications",
    name: "Notifications & Alerts",
    description: "Integrate with notification platforms to receive compliance alerts",
    items: [
      {
        id: "slack",
        name: "Slack",
        description: "Send compliance alerts and notifications to your Slack workspace",
        icon: MessageSquare,
        enabled: true,
        connected: true
      },
      {
        id: "teams",
        name: "Microsoft Teams",
        description: "Receive notifications and alerts in Microsoft Teams channels",
        icon: MessageSquare,
        enabled: false,
        connected: false
      },
      {
        id: "webhooks",
        name: "Custom Webhooks",
        description: "Send compliance events to any webhook endpoint",
        icon: Globe,
        enabled: false,
        connected: false
      }
    ]
  },
  {
    id: "regulatory",
    name: "Regulatory Updates",
    description: "Connect to regulatory APIs for real-time compliance updates",
    items: [
      {
        id: "eu-gdpr",
        name: "EU GDPR API",
        description: "Connect to the EU GDPR regulatory update API",
        icon: Globe,
        enabled: true,
        connected: true
      },
      {
        id: "us-ccpa",
        name: "US CCPA API",
        description: "Connect to the California Consumer Privacy Act API",
        icon: Globe,
        enabled: false,
        connected: false
      },
      {
        id: "hipaa-updates",
        name: "HIPAA Updates",
        description: "Receive HIPAA regulatory updates and guidance",
        icon: Bell,
        enabled: false,
        connected: false
      }
    ]
  },
  {
    id: "tools",
    name: "Productivity & Documentation",
    description: "Integrate with your existing tools and documentation systems",
    items: [
      {
        id: "calendar",
        name: "Google Calendar",
        description: "Sync compliance deadlines with your Google Calendar",
        icon: Calendar,
        enabled: true,
        connected: true
      },
      {
        id: "github",
        name: "GitHub",
        description: "Store and version compliance documents in GitHub repositories",
        icon: Github,
        enabled: false,
        connected: false
      },
      {
        id: "gdrive",
        name: "Google Drive",
        description: "Store and collaborate on compliance documents in Google Drive",
        icon: FileText,
        enabled: false,
        connected: false
      }
    ]
  },
  {
    id: "security",
    name: "Security & Authentication",
    description: "Enhance compliance with security integrations",
    items: [
      {
        id: "sso",
        name: "Single Sign-On (SSO)",
        description: "Implement SSO for secure compliance platform access",
        icon: Lock,
        enabled: false,
        connected: false,
        enterprise: true
      },
      {
        id: "audit-log",
        name: "Audit Log Export",
        description: "Export compliance audit logs to external systems",
        icon: FileText,
        enabled: false,
        connected: false,
        enterprise: true
      }
    ]
  }
];

export default function Integrations() {
  const { toast } = useToast();
  const [activeIntegration, setActiveIntegration] = useState<any>(null);
  const [integrations, setIntegrations] = useState(integrationCategories);
  
  // Toggle integration enabled state
  const toggleIntegration = (categoryId: string, itemId: string) => {
    setIntegrations(prev => 
      prev.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map(item => {
              if (item.id === itemId) {
                // If already connected, just toggle enabled state
                if (item.connected) {
                  return { ...item, enabled: !item.enabled };
                }
                // If toggling on and not connected, show connection modal
                if (!item.enabled) {
                  setActiveIntegration({ ...item, categoryId });
                  return item;
                }
                return item;
              }
              return item;
            })
          };
        }
        return category;
      })
    );
    
    // If already connected, show toast message
    const category = integrations.find(c => c.id === categoryId);
    const item = category?.items.find(i => i.id === itemId);
    
    if (item?.connected) {
      toast({
        title: item.enabled ? `${item.name} disabled` : `${item.name} enabled`,
        description: item.enabled 
          ? `${item.name} integration has been disabled.` 
          : `${item.name} integration has been enabled.`,
      });
    }
  };
  
  // Connect integration
  const connectIntegration = () => {
    if (!activeIntegration) return;
    
    setIntegrations(prev => 
      prev.map(category => {
        if (category.id === activeIntegration.categoryId) {
          return {
            ...category,
            items: category.items.map(item => {
              if (item.id === activeIntegration.id) {
                return { ...item, connected: true, enabled: true };
              }
              return item;
            })
          };
        }
        return category;
      })
    );
    
    toast({
      title: "Integration Connected",
      description: `${activeIntegration.name} has been successfully connected.`,
    });
    
    setActiveIntegration(null);
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
                <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
                <p className="mt-1 text-sm text-gray-500">Connect ComplianceMate with your existing tools and services</p>
              </div>
              <div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Custom Integration
                </Button>
              </div>
            </div>
          </div>

          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {/* Integration Categories */}
            {integrations.map((category) => (
              <div key={category.id} className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-2">{category.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item) => (
                    <Card key={item.id} className={item.enabled ? "border-blue-200" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-md ${item.enabled ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                              <item.icon className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-lg ml-3">{item.name}</CardTitle>
                          </div>
                          {item.enterprise && (
                            <Badge variant="outline" className="ml-2">Enterprise</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{item.description}</CardDescription>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <div 
                              className={`w-2 h-2 rounded-full mr-2 ${
                                item.connected 
                                  ? (item.enabled ? 'bg-green-500' : 'bg-yellow-500') 
                                  : 'bg-gray-300'
                              }`} 
                            />
                            <span className="text-xs text-gray-500">
                              {item.connected 
                                ? (item.enabled ? 'Connected & Enabled' : 'Connected & Disabled') 
                                : 'Not Connected'}
                            </span>
                          </div>
                          <Switch 
                            checked={item.enabled} 
                            onCheckedChange={() => toggleIntegration(category.id, item.id)}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        {item.connected ? (
                          <Button variant="outline" size="sm" className="w-full">
                            Configure
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => setActiveIntegration({ ...item, categoryId: category.id })}
                          >
                            Connect
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Integration Information */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 text-blue-500 mr-2" />
                  About Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  ComplianceMate integrations allow you to connect with your existing tools and services to streamline your compliance workflow. 
                  Receive real-time alerts, stay updated on regulatory changes, and automate compliance tasks across your organization.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Need a custom integration?</h4>
                      <p className="text-xs text-blue-600 mt-1">
                        If you need to connect ComplianceMate with a tool or service not listed here, 
                        contact our support team or use our API to build a custom integration.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      {/* Integration Connection Modal */}
      {activeIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <activeIntegration.icon className="h-5 w-5 mr-2" />
                Connect {activeIntegration.name}
              </CardTitle>
              <CardDescription>
                Configure your {activeIntegration.name} integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeIntegration.id === "slack" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="workspace">Slack Workspace URL</Label>
                      <Input id="workspace" placeholder="yourworkspace.slack.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="channel">Default Channel</Label>
                      <Input id="channel" placeholder="#compliance-alerts" />
                    </div>
                  </>
                )}
                
                {activeIntegration.id === "eu-gdpr" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input id="api-key" type="password" placeholder="Enter your API key" />
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Switch id="updates" />
                      <Label htmlFor="updates">Receive regulatory updates</Label>
                    </div>
                  </>
                )}
                
                {activeIntegration.id === "calendar" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">Google Account</Label>
                      <Input id="email" type="email" placeholder="your-email@gmail.com" />
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Switch id="deadline-sync" defaultChecked />
                      <Label htmlFor="deadline-sync">Sync deadlines automatically</Label>
                    </div>
                  </>
                )}
                
                {/* Generic form for other integrations */}
                {!["slack", "eu-gdpr", "calendar"].includes(activeIntegration.id) && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key or Access Token</Label>
                      <Input id="api-key" type="password" placeholder="Enter your API key or token" />
                    </div>
                    {activeIntegration.enterprise && (
                      <div className="p-3 bg-yellow-50 rounded-md border border-yellow-100">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-xs text-yellow-700">
                              This is an Enterprise feature. Please contact your account manager to enable it.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveIntegration(null)}>
                Cancel
              </Button>
              <Button onClick={connectIntegration}>
                Connect Integration
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
