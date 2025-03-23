import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Bell, HelpCircle, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

export function Navbar({ onMobileMenuToggle }: NavbarProps) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: notifications } = useQuery({
    queryKey: ['/api/notifications'],
    enabled: !!user,
  });
  
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-neutral-200">
      <button 
        type="button" 
        className="md:hidden px-4 text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
        onClick={onMobileMenuToggle}
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <form onSubmit={handleSearch} className="w-full max-w-2xl">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <Input
                id="search"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search compliance docs, regulations..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
          <div className="relative ml-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#f44336] text-white text-xs flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
              <Bell className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
