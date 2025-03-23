import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  CheckSquare, 
  Settings, 
  FileText, 
  PuzzleIcon, 
  ArrowUpRight 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  active?: boolean;
}

function SidebarItem({ href, icon: Icon, children, active }: SidebarItemProps) {
  return (
    <Link href={href}>
      <a className={cn(
        "flex items-center px-2 py-2 text-sm font-medium rounded-md",
        active 
          ? "bg-gray-900 text-white" 
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      )}>
        <Icon className="mr-3 h-5 w-5" />
        {children}
      </a>
    </Link>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  
  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-gray-800">
        <div className="flex items-center h-16 px-4 bg-gray-900">
          <span className="text-white font-semibold text-lg">ComplianceMate</span>
        </div>
        <div className="h-0 flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <SidebarItem href="/" icon={LayoutDashboard} active={location === "/"}>
              Dashboard
            </SidebarItem>
            <SidebarItem href="/automation" icon={FileSpreadsheet} active={location === "/automation"}>
              Compliance Automation
            </SidebarItem>
            <SidebarItem href="/documents" icon={FileText} active={location === "/documents"}>
              Document Management
            </SidebarItem>
            <SidebarItem href="/audit" icon={CheckSquare} active={location === "/audit"}>
              Audit & Risk
            </SidebarItem>
            <SidebarItem href="/integrations" icon={PuzzleIcon} active={location === "/integrations"}>
              Integrations
            </SidebarItem>
            <SidebarItem href="/settings" icon={Settings} active={location === "/settings"}>
              Settings
            </SidebarItem>
          </nav>
          <div className="px-2 py-4 space-y-1">
            <div className="flex flex-col px-3 py-3 bg-gray-700 rounded-md">
              <p className="text-xs font-medium text-gray-300">Free Plan</p>
              <p className="text-xs text-gray-400 mt-1">3/3 compliance documents used</p>
              <Progress value={100} className="h-2 mt-2 bg-gray-600" />
              <a href="#" className="mt-2 text-xs text-primary-100 hover:text-white text-center flex items-center justify-center">
                Upgrade Plan
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
