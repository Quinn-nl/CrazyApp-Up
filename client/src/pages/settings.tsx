import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  User,
  Building,
  Bell,
  Shield,
  KeyRound,
  Mail,
  Save,
  Loader2,
  UserCog,
  UserPlus,
  Settings as SettingsIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Profile form schema
const profileFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  companyName: z.string().min(2, "Company name must be at least 2 characters."),
  jobTitle: z.string().optional(),
});

// Notification settings schema
const notificationSchema = z.object({
  emailAlerts: z.boolean().default(true),
  complianceUpdates: z.boolean().default(true),
  deadlineReminders: z.boolean().default(true),
  weeklyDigest: z.boolean().default(false),
  slackNotifications: z.boolean().default(false),
});

// Security settings schema
const securitySchema = z.object({
  twoFactorAuth: z.boolean().default(false),
  passwordChangeInterval: z.enum(["never", "30days", "60days", "90days"]).default("never"),
  sessionTimeout: z.enum(["30min", "1hour", "4hours", "8hours", "1day"]).default("4hours"),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationValues = z.infer<typeof notificationSchema>;
type SecurityValues = z.infer<typeof securitySchema>;

export default function Settings() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      companyName: user?.companyName || "",
      jobTitle: "",
    },
  });
  
  // Initialize notification form
  const notificationForm = useForm<NotificationValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailAlerts: true,
      complianceUpdates: true,
      deadlineReminders: true,
      weeklyDigest: false,
      slackNotifications: false,
    },
  });
  
  // Initialize security form
  const securityForm = useForm<SecurityValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      twoFactorAuth: false,
      passwordChangeInterval: "never",
      sessionTimeout: "4hours",
    },
  });
  
  // Handle profile form submission
  const onProfileSubmit = (data: ProfileFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };
  
  // Handle notification form submission
  const onNotificationSubmit = (data: NotificationValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Notification Settings Updated",
        description: "Your notification preferences have been saved.",
      });
    }, 1000);
  };
  
  // Handle security form submission
  const onSecuritySubmit = (data: SecurityValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Security Settings Updated",
        description: "Your security settings have been updated successfully.",
      });
    }, 1000);
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
                <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                <p className="mt-1 text-sm text-gray-500">Manage your account and application preferences</p>
              </div>
            </div>
          </div>

          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Profile Settings */}
              <TabsContent value="profile">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>User Profile</CardTitle>
                        <CardDescription>
                          Update your personal and company information
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Form {...profileForm}>
                          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                            <FormField
                              control={profileForm.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                        <User className="h-4 w-4" />
                                      </span>
                                      <Input className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={profileForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                        <Mail className="h-4 w-4" />
                                      </span>
                                      <Input className="pl-10" type="email" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={profileForm.control}
                              name="companyName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company Name</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                        <Building className="h-4 w-4" />
                                      </span>
                                      <Input className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={profileForm.control}
                              name="jobTitle"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Job Title</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <Button 
                              type="submit" 
                              className="w-full"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <Save className="mr-2 h-4 w-4" />
                                  Save Profile
                                </>
                              )}
                            </Button>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Company Settings</CardTitle>
                        <CardDescription>
                          Manage your company-wide compliance settings
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="company-id">Company ID</Label>
                          <Input id="company-id" value="CM-12345678" readOnly />
                          <p className="text-xs text-gray-500 mt-1">This is your unique company identifier in the system</p>
                        </div>
                        
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <Label className="text-base">Compliance Templates</Label>
                            <p className="text-sm text-gray-500">
                              Use industry-specific compliance templates
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <Label className="text-base">Multi-user Access</Label>
                            <p className="text-sm text-gray-500">
                              Allow multiple users to access your company account
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add Users
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Plan</CardTitle>
                        <CardDescription>
                          Your current subscription and plan details
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">Business Plan</p>
                            <p className="text-sm text-gray-500">$49/month (billed annually)</p>
                          </div>
                          <Badge>Active</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <CheckItem checked>Unlimited documents</CheckItem>
                          </div>
                          <div className="flex items-center">
                            <CheckItem checked>All compliance regulations</CheckItem>
                          </div>
                          <div className="flex items-center">
                            <CheckItem checked>Up to 10 team members</CheckItem>
                          </div>
                          <div className="flex items-center">
                            <CheckItem>AI-powered risk analysis</CheckItem>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Upgrade Plan</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Notification Settings */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...notificationForm}>
                      <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium leading-none">Email Notifications</h3>
                          
                          <FormField
                            control={notificationForm.control}
                            name="emailAlerts"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Email Alerts</FormLabel>
                                  <FormDescription>
                                    Receive critical compliance alerts via email
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={notificationForm.control}
                            name="complianceUpdates"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Regulatory Updates</FormLabel>
                                  <FormDescription>
                                    Notifications when regulations change
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={notificationForm.control}
                            name="deadlineReminders"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Deadline Reminders</FormLabel>
                                  <FormDescription>
                                    Reminders for upcoming compliance deadlines
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={notificationForm.control}
                            name="weeklyDigest"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Weekly Digest</FormLabel>
                                  <FormDescription>
                                    Weekly summary of compliance activities
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium leading-none">Integration Notifications</h3>
                          
                          <FormField
                            control={notificationForm.control}
                            name="slackNotifications"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Slack Notifications</FormLabel>
                                  <FormDescription>
                                    Send compliance notifications to Slack
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Notification Settings
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Security Settings */}
              <TabsContent value="security">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your account security preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...securityForm}>
                        <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                          <FormField
                            control={securityForm.control}
                            name="twoFactorAuth"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                                  <FormDescription>
                                    Add an extra layer of security to your account
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="password">Change Password</Label>
                              <div className="grid gap-2 mt-2">
                                <Input 
                                  id="current-password" 
                                  type="password" 
                                  placeholder="Current password" 
                                />
                                <Input 
                                  id="new-password" 
                                  type="password" 
                                  placeholder="New password" 
                                />
                                <Input 
                                  id="confirm-password" 
                                  type="password" 
                                  placeholder="Confirm new password" 
                                />
                                <Button type="button" variant="outline" size="sm">
                                  <KeyRound className="h-4 w-4 mr-2" />
                                  Update Password
                                </Button>
                              </div>
                            </div>
                            
                            <FormField
                              control={securityForm.control}
                              name="passwordChangeInterval"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password Change Interval</FormLabel>
                                  <div className="grid grid-cols-2 gap-2 mt-2">
                                    <Button
                                      type="button"
                                      variant={field.value === "never" ? "default" : "outline"}
                                      onClick={() => field.onChange("never")}
                                      className="w-full"
                                    >
                                      Never
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={field.value === "30days" ? "default" : "outline"}
                                      onClick={() => field.onChange("30days")}
                                      className="w-full"
                                    >
                                      30 Days
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={field.value === "60days" ? "default" : "outline"}
                                      onClick={() => field.onChange("60days")}
                                      className="w-full"
                                    >
                                      60 Days
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={field.value === "90days" ? "default" : "outline"}
                                      onClick={() => field.onChange("90days")}
                                      className="w-full"
                                    >
                                      90 Days
                                    </Button>
                                  </div>
                                  <FormDescription>
                                    How often you'll be prompted to change your password
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={securityForm.control}
                              name="sessionTimeout"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Session Timeout</FormLabel>
                                  <div className="grid grid-cols-3 gap-2 mt-2">
                                    <Button
                                      type="button"
                                      variant={field.value === "30min" ? "default" : "outline"}
                                      onClick={() => field.onChange("30min")}
                                      className="w-full"
                                    >
                                      30 Min
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={field.value === "1hour" ? "default" : "outline"}
                                      onClick={() => field.onChange("1hour")}
                                      className="w-full"
                                    >
                                      1 Hour
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={field.value === "4hours" ? "default" : "outline"}
                                      onClick={() => field.onChange("4hours")}
                                      className="w-full"
                                    >
                                      4 Hours
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={field.value === "8hours" ? "default" : "outline"}
                                      onClick={() => field.onChange("8hours")}
                                      className="w-full"
                                    >
                                      8 Hours
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={field.value === "1day" ? "default" : "outline"}
                                      onClick={() => field.onChange("1day")}
                                      className="w-full col-span-2"
                                    >
                                      1 Day
                                    </Button>
                                  </div>
                                  <FormDescription>
                                    How long until your session expires due to inactivity
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Security Settings
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Session Management</CardTitle>
                        <CardDescription>
                          View and manage your active sessions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-md">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-500 rounded-full">
                                <UserCog className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Current Session</p>
                                <p className="text-xs text-gray-500">Chrome on Windows • {new Date().toLocaleString()}</p>
                              </div>
                            </div>
                            <Badge>Active</Badge>
                          </div>
                          
                          <div className="p-3 border rounded-md">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 rounded-full">
                                  <UserCog className="h-4 w-4 text-gray-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Mobile App</p>
                                  <p className="text-xs text-gray-500">iPhone • 2 days ago</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">Log out</Button>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-md">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 rounded-full">
                                  <UserCog className="h-4 w-4 text-gray-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Safari</p>
                                  <p className="text-xs text-gray-500">Mac • 5 days ago</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">Log out</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="destructive" className="w-full">Log Out of All Sessions</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Advanced Security</CardTitle>
                        <CardDescription>
                          Additional security settings and preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="login-notification" />
                          <Label htmlFor="login-notification">
                            Email notification for new logins
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox id="suspicious-activity" defaultChecked />
                          <Label htmlFor="suspicious-activity">
                            Alert on suspicious account activity
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox id="ip-restrictions" />
                          <Label htmlFor="ip-restrictions">
                            Enable IP address restrictions
                          </Label>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 mt-2 bg-yellow-50 border border-yellow-100 rounded-md">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-yellow-800">Export Personal Data</p>
                            <p className="text-xs text-yellow-700 mt-1">Download all your personal data in a machine-readable format</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Export
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper component for checkmarks in the plan details
function CheckItem({ children, checked = false }: { children: React.ReactNode; checked?: boolean }) {
  return (
    <div className={`flex items-center ${checked ? 'text-gray-900' : 'text-gray-400'}`}>
      {checked ? (
        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
      ) : (
        <SettingsIcon className="h-4 w-4 mr-2 text-gray-300" />
      )}
      {children}
    </div>
  );
}
