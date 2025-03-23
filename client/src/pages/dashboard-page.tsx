import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { TopNavbar } from "@/components/layout/top-navbar";
import { ComplianceScoreCard } from "@/components/dashboard/compliance-score-card";
import { DeadlinesCard } from "@/components/dashboard/deadlines-card";
import { RecentDocumentsCard } from "@/components/dashboard/recent-documents-card";
import { ComplianceIssuesCard } from "@/components/dashboard/compliance-issues-card";
import { FreePlanBanner } from "@/components/layout/free-plan-banner";

export default function DashboardPage() {
  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none">
      <div className="py-6">
        <PageHeader 
          title="Dashboard" 
          description="Overview of your compliance status and upcoming tasks" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-4">
          <ComplianceScoreCard />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DeadlinesCard />
            <RecentDocumentsCard />
          </div>

          <div className="mt-6">
            <ComplianceIssuesCard />
          </div>
        </div>
      </div>
      <FreePlanBanner />
    </main>
  );
}
