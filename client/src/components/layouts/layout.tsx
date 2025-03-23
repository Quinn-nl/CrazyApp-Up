import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { useState } from "react";
import { Navbar } from "@/components/layouts/navbar";


interface LayoutProps {
  children?: ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className={cn("pl-64", className)}>
        {children}
      </main>
    </div>
  );
}