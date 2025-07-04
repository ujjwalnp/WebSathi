"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@lib/utils";
import { buttonVariants } from "@components/ui/button";

import logoImage from "@public/websathi-logo.svg";

const Navigation: React.FC = () => {
  // Simulate login state
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    // Simulate logged-in user (true/false)
    setUser(true); // Set to false to simulate guest
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
      <aside className="flex items-center gap-2">
        <Image src={logoImage} width={40} height={40} alt="WebSathi Logo" />
        <span className="text-xl font-bold z-10">WebSathi.</span>
      </aside>

      <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ul className="flex items-center gap-8">
          {["Pricing", "About", "Documentation", "Features"].map((item) => (
            <li key={item}>
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-inherit p-0 underline-offset-8"
                )}
                href="#"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <aside className="flex items-center gap-2">
        <Link href="/agency" className={cn(buttonVariants())}>
          {user ? "Dashboard" : "Get Started"}
        </Link>
        {user && (
          <button
            onClick={() => setUser(false)}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Sign Out
          </button>
        )}
      </aside>
    </header>
  );
};

export default Navigation;
