"use client";

import {
  Home,
  Users,
  Settings,
  LogOut,
  Search,
  Rocket,
  CreditCard,
  LayoutDashboard,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "@components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/agency/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Team", href: "/agency/team", icon: <Users size={18} /> },
  { label: "Sub Accounts", href: "/agency/subaccounts", icon: <Building2 size={18} /> },
  { label: "Launchpad", href: "/agency/launchpad", icon: <Rocket size={18} /> },
  { label: "Billing", href: "/agency/billing", icon: <CreditCard size={18} /> },
  { label: "Settings", href: "/agency/settings", icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Add your logout logic here
    router.push("/sign-in");
  };

  return (
    <aside className="h-full w-64 bg-background text-foreground border-r hidden md:flex flex-col fixed z-50">
      {/* Header */}
      <div className="p-4 font-bold text-xl border-b flex items-center gap-2">
        <Rocket className="text-primary" size={20} />
        <span>WebSathi</span>
      </div>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/50 text-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col space-y-1 p-4 flex-grow">
        {navItems.map(({ label, href, icon }) => (
          <Link
            key={label}
            href={href}
            className={clsx(
              "flex items-center gap-3 p-2 rounded-md text-sm transition-all",
              "hover:bg-muted/50 hover:text-primary",
              pathname.startsWith(href) 
                ? "bg-muted/50 text-primary font-medium" 
                : "text-muted-foreground"
            )}
          >
            <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}