import { useState } from "react";
import { Layout } from "@/components/layouts/layout";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  User, 
  Shield, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard, 
  Users, 
  Save,
  UserPlus,
  CheckCheck as Check
} from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    companyName: user?.companyName || "",
    email: user?.email || "",
    phone: "555-123-4567",
    address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    website: "https://example.com"
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    complianceUpdates: true,
    taskReminders: true,
    securityAlerts: true,
    marketingEmails: false
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiration: "90"
  });

  // Team members
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Admin" },
    { id: 2, name: "Sam Wilson", email: "sam@example.com", role: "Compliance Manager" },
    { id: 3, name: "Taylor Kim", email: "taylor@example.com", role: "User" }
  ]);

  // Billing settings
  const [billingPlan, setBillingPlan] = useState("standard");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: ""
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: typeof profileData) => {
      const res = await apiRequest("PATCH", "/api/user", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message || "There was an error updating your profile.",
        variant: "destructive",
      });
    }
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(profileData);
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated successfully.",
    });
  };

  const handleSecurityUpdate = () => {
    toast({
      title: "Security settings saved",
      description: "Your security settings have been updated successfully.",
    });
  };

  const handleTeamMemberAdd = () => {
    toast({
      title: "Invitation sent",
      description: "An invitation has been sent to the new team member.",
    });
  };

  const handleTeamMemberRemove = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast({
      title: "Team member removed",
      description: "The team member has been removed successfully.",
    });
  };

  const handleBillingUpdate = () => {
    toast({
      title: "Billing plan updated",
      description: `Your plan has been updated to ${billingPlan.charAt(0).toUpperCase() + billingPlan.slice(1)}.`,
    });
  };
  
  const handleAddPayment = () => {
    setEditingPayment(false);
    setPaymentData({
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvc: ""
    });
    setPaymentDialogOpen(true);
  };
  
  const handleEditPayment = () => {
    setEditingPayment(true);
    setPaymentData({
      cardNumber: "4242424242424242",
      cardName: "Your Name",
      expiryDate: "12/25",
      cvc: "123"
    });
    setPaymentDialogOpen(true);
  };
  
  const handlePaymentSubmit = () => {
    // Validate payment info
    if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvc) {
      toast({
        title: "Missing information",
        description: "Please fill in all payment fields",
        variant: "destructive"
      });
      return;
    }
    
    // Basic validation
    if (paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
      toast({
        title: "Invalid card number",
        description: "Please enter a valid 16-digit card number",
        variant: "destructive"
      });
      return;
    }
    
    setPaymentDialogOpen(false);
    
    toast({
      title: editingPayment ? "Payment method updated" : "Payment method added",
      description: editingPayment 
        ? "Your payment method has been updated successfully." 
        : "Your new payment method has been added successfully.",
    });
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-700">Settings</h1>
              <p className="mt-1 text-sm text-neutral-500">Manage your account settings and preferences</p>
            </div>
          </div>

          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full md:w-auto grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Company Profile
                  </CardTitle>
                  <CardDescription>
                    Update your company information and contact details
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleProfileUpdate}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input 
                          id="companyName" 
                          value={profileData.companyName}
                          onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input 
                          id="website" 
                          value={profileData.website}
                          onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address</Label>
                      <Textarea 
                        id="address" 
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      disabled={updateProfileMutation.isPending}
                      className="ml-auto"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Manage how you receive notifications and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Email Alerts</Label>
                        <p className="text-sm text-neutral-500">Receive compliance alerts via email</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Compliance Updates</Label>
                        <p className="text-sm text-neutral-500">Get notified about new regulations and updates</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.complianceUpdates}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, complianceUpdates: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Task Reminders</Label>
                        <p className="text-sm text-neutral-500">Receive reminders about upcoming tasks and deadlines</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.taskReminders}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, taskReminders: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Security Alerts</Label>
                        <p className="text-sm text-neutral-500">Get notified about security events and potential issues</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.securityAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Marketing Emails</Label>
                        <p className="text-sm text-neutral-500">Receive news, updates, and promotional materials</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleNotificationUpdate} 
                    className="ml-auto"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and authentication options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Two-Factor Authentication</Label>
                      <p className="text-sm text-neutral-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                    />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Password Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button className="w-full md:w-auto">
                        <Lock className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Session Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <Input 
                          id="session-timeout" 
                          type="number" 
                          min="5" 
                          max="120" 
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-expiration">Password Expiration (days)</Label>
                        <Input 
                          id="password-expiration" 
                          type="number" 
                          min="30" 
                          value={securitySettings.passwordExpiration}
                          onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiration: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSecurityUpdate} 
                    className="ml-auto"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Team Members
                  </CardTitle>
                  <CardDescription>
                    Manage your team and their permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                      <div className="w-full md:w-1/3">
                        <Label htmlFor="invite-email">Email Address</Label>
                        <Input id="invite-email" type="email" placeholder="colleague@example.com" />
                      </div>
                      <div className="w-full md:w-1/3">
                        <Label htmlFor="invite-role">Role</Label>
                        <Select defaultValue="user">
                          <SelectTrigger id="invite-role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Compliance Manager</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        onClick={handleTeamMemberAdd}
                        className="w-full md:w-auto mt-4 md:mt-0"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Invite Team Member
                      </Button>
                    </div>
                    
                    <div className="rounded-md border overflow-hidden mt-6">
                      <table className="min-w-full divide-y divide-neutral-200">
                        <thead className="bg-neutral-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-200">
                          {teamMembers.map((member) => (
                            <tr key={member.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-700">
                                {member.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                {member.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                {member.role}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-[#f44336]"
                                  onClick={() => handleTeamMemberRemove(member.id)}
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Billing & Subscription
                  </CardTitle>
                  <CardDescription>
                    Manage your subscription plan and payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Current Plan</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className={`border rounded-md p-4 ${billingPlan === 'starter' ? 'border-primary bg-primary/5' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Starter</h4>
                              <p className="text-sm text-neutral-500">Basic compliance features</p>
                            </div>
                            <div className="text-lg font-bold">$29</div>
                          </div>
                          <p className="text-sm text-neutral-500 mt-2">Per month</p>
                          <ul className="mt-4 space-y-2 text-sm">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              Basic compliance checklists
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              Document storage
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              Email notifications
                            </li>
                          </ul>
                          <Button 
                            variant={billingPlan === 'starter' ? 'outline' : 'secondary'} 
                            className="w-full mt-4"
                            onClick={() => setBillingPlan('starter')}
                            disabled={billingPlan === 'starter'}
                          >
                            {billingPlan === 'starter' ? 'Current Plan' : 'Choose Plan'}
                          </Button>
                        </div>
                        
                        <div className={`border rounded-md p-4 ${billingPlan === 'standard' ? 'border-primary bg-primary/5' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Standard</h4>
                              <p className="text-sm text-neutral-500">Advanced compliance tools</p>
                            </div>
                            <div className="text-lg font-bold">$79</div>
                          </div>
                          <p className="text-sm text-neutral-500 mt-2">Per month</p>
                          <ul className="mt-4 space-y-2 text-sm">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              All Starter features
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              Advanced compliance automation
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              Risk assessment tools
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              5 team members
                            </li>
                          </ul>
                          <Button 
                            variant={billingPlan === 'standard' ? 'outline' : 'secondary'} 
                            className="w-full mt-4"
                            onClick={() => setBillingPlan('standard')}
                            disabled={billingPlan === 'standard'}
                          >
                            {billingPlan === 'standard' ? 'Current Plan' : 'Choose Plan'}
                          </Button>
                        </div>
                        
                        <div className={`border rounded-md p-4 ${billingPlan === 'premium' ? 'border-primary bg-primary/5' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Premium</h4>
                              <p className="text-sm text-neutral-500">Enterprise-grade compliance</p>
                            </div>
                            <div className="text-lg font-bold">$199</div>
                          </div>
                          <p className="text-sm text-neutral-500 mt-2">Per month</p>
                          <ul className="mt-4 space-y-2 text-sm">
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              All Standard features
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              AI-powered compliance insights
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              Custom integrations
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              Unlimited team members
                            </li>
                            <li className="flex items-center">
                              <Check className="h-4 w-4 text-[#4caf50] mr-2" />
                              Dedicated support
                            </li>
                          </ul>
                          <Button 
                            variant={billingPlan === 'premium' ? 'outline' : 'secondary'} 
                            className="w-full mt-4"
                            onClick={() => setBillingPlan('premium')}
                            disabled={billingPlan === 'premium'}
                          >
                            {billingPlan === 'premium' ? 'Current Plan' : 'Choose Plan'}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <h3 className="font-medium mb-4">Payment Method</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-md p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="rounded bg-neutral-100 p-2 mr-3">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">Visa ending in 4242</p>
                              <p className="text-sm text-neutral-500">Expires 12/25</p>
                            </div>
                          </div>
                          <div>
                            <Button variant="outline" size="sm" onClick={handleEditPayment}>Edit</Button>
                          </div>
                        </div>
                        <div className="border border-dashed rounded-md p-4 flex items-center justify-center">
                          <Button variant="outline" onClick={handleAddPayment}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Add Payment Method
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleBillingUpdate} 
                    className="ml-auto"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Billing Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Payment Method Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingPayment ? "Edit Payment Method" : "Add Payment Method"}</DialogTitle>
            <DialogDescription>
              {editingPayment 
                ? "Update your payment information below" 
                : "Enter your payment card details below"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input 
                id="cardName" 
                placeholder="John Smith" 
                value={paymentData.cardName}
                onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber" 
                placeholder="4242 4242 4242 4242" 
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate" 
                  placeholder="MM/YY" 
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc" 
                  placeholder="123" 
                  value={paymentData.cvc}
                  onChange={(e) => setPaymentData({...paymentData, cvc: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePaymentSubmit}>
              {editingPayment ? "Update Payment Method" : "Add Payment Method"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
