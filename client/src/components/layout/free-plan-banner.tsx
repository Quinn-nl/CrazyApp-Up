import { useState } from "react";
import { Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FreePlanBannerProps {
  className?: string;
}

export function FreePlanBanner({ className }: FreePlanBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={cn("fixed bottom-0 inset-x-0 pb-2 sm:pb-5", className)}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-primary-600 shadow-lg sm:p-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-primary-800">
                <Info className="h-5 w-5 text-white" />
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">You are using 3/3 document slots in your free plan.</span>
                <span className="hidden md:inline">You are using all available document slots in your free plan. Upgrade for unlimited documents.</span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-primary-50">
                Upgrade Plan
              </a>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button 
                type="button" 
                className="-mr-1 flex p-2 rounded-md hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setIsVisible(false)}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
