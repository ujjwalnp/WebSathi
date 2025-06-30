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
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { label: "Team", href: "/team", icon: <Users size={20} /> },
  { label: "Sub Accounts", href: "/subaccounts", icon: <Building2 size={20} /> },
  { label: "Launchpad", href: "/launchpad", icon: <Rocket size={20} /> },
  { label: "Billing", href: "/billing", icon: <CreditCard size={20} /> },
  { label: "Settings", href: "/settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 bg-white text-black border-r shadow-sm hidden md:flex flex-col">
      {/* Header */}
      <div className="p-4 font-bold text-xl border-b">WebSathi</div>

      {/* Search */}
      <div className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-gray-50 text-sm">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-black"
          />
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col space-y-1 px-4">
        {navItems.map(({ label, href, icon }) => (
          <Link
            key={label}
            href={href}
            className={clsx(
              "flex items-center gap-2 p-2 rounded-md text-sm hover:bg-gray-100 transition",
              pathname === href && "bg-gray-100 font-semibold"
            )}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto p-4">
        <button className="flex items-center gap-2 text-red-600 hover:bg-red-100 p-2 rounded-md w-full text-sm">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
