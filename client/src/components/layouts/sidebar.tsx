import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Folder, 
  ClipboardList, 
  Link2, 
  Settings,
  ShieldCheck
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();

  if (!user) return null;

  const initials = user.companyName
    .split(' ')
    .map(name => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/compliance", label: "Compliance Automation", icon: FileText },
    { href: "/documents", label: "Document Management", icon: Folder },
    { href: "/audit", label: "Audit & Risk Management", icon: ClipboardList },
    { href: "/integrations", label: "Integrations", icon: Link2 },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const frameworks = [
    { name: "GDPR", status: "compliant" },
    { name: "CCPA", status: "warning" },
    { name: "HIPAA", status: "attention" },
  ];

  return (
    <div className={cn("hidden md:flex md:flex-shrink-0", className)}>
      <div className="flex flex-col w-64 border-r border-neutral-200 bg-white">
        <div className="flex items-center justify-center h-16 border-b border-neutral-200">
          <div className="flex items-center">
            <ShieldCheck className="text-primary text-2xl mr-2" />
            <span className="text-xl font-semibold text-primary">ComplianceMate</span>
          </div>
        </div>
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <nav className="flex-1 px-2 pb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 mt-1 text-sm font-medium rounded-md",
                    location === item.href 
                      ? "bg-primary bg-opacity-10 text-primary" 
                      : "text-neutral-700 hover:bg-neutral-100"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            
            <div className="mt-8 px-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Compliance Frameworks
              </h3>
              <div className="mt-2">
                {frameworks.map((framework) => (
                  <Link 
                    key={framework.name}
                    href={`/frameworks/${framework.name.toLowerCase()}`}
                    className="flex items-center px-4 py-2 text-sm text-neutral-700 rounded-md hover:bg-neutral-100"
                  >
                    <span 
                      className={cn(
                        "w-2 h-2 mr-2 rounded-full",
                        framework.status === "compliant" && "bg-[#4caf50]",
                        framework.status === "warning" && "bg-[#ff9800]",
                        framework.status === "attention" && "bg-[#f44336]"
                      )}
                    />
                    {framework.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div className="inline-block h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center">
                <span>{initials}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-700">{user.companyName}</p>
                <button 
                  onClick={() => logoutMutation.mutate()} 
                  className="text-xs font-medium text-neutral-500 hover:text-neutral-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
