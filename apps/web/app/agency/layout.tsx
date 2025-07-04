// apps/web/app/agency/layout.tsx
"use client";

import React from "react";
import Sidebar from "@components/navigation/sidebar";

const AgencyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AgencyLayout;