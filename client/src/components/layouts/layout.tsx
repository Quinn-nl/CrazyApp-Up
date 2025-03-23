import { useState } from "react";
import { Sidebar } from "@/components/layouts/sidebar";
import { Navbar } from "@/components/layouts/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fa]">
      {/* Mobile sidebar */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-neutral-600 bg-opacity-75 transition-opacity" 
            onClick={toggleMobileMenu}
          />
          <div className="fixed inset-y-0 left-0 flex flex-col z-40 w-64">
            <Sidebar />
          </div>
        </div>
      )}
      
      {/* Desktop sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Navbar onMobileMenuToggle={toggleMobileMenu} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
