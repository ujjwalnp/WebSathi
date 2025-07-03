"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Pricing configuration with dynamic calculation
const PRICING = (userSelections: any) => [
  {
    title: "Starter",
    description: "Perfect for small teams getting started",
    price: calculateStarterPrice(userSelections),
    features: [
      `${userSelections.users || 1} user${userSelections.users > 1 ? 's' : ''}`,
      `${userSelections.projects || 3} projects`,
      "Basic analytics",
      "Email support"
    ],
    isPopular: false,
  },
  {
    title: "Unlimited SaaS",
    description: "For growing businesses with unlimited needs",
    price: calculateUltimatePrice(userSelections),
    features: [
      "Unlimited users",
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations"
    ],
    isPopular: true,
  }
];

// Price calculation logic
const calculateStarterPrice = (selections: any) => {
  const basePrice = 29;
  const perUserPrice = 5;
  return `$${basePrice + (perUserPrice * (selections.users || 1))}`;
};

const calculateUltimatePrice = (selections: any) => {
  const basePrice = 99;
  const discount = selections.annualBilling ? 0.2 : 0; // 20% discount for annual
  return `$${Math.round(basePrice * (1 - discount))}`;
};

const HoverPriceCard: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [userSelections, setUserSelections] = useState({
    users: 1,
    projects: 3,
    annualBilling: false
  });

  // Get dynamic pricing based on user selections
  const dynamicPricing = PRICING(userSelections);

  return (
    <div className="flex flex-col gap-8">
      {/* User selection controls */}
      <div className="flex flex-col gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Team Size</label>
          <select 
            className="p-2 border rounded"
            value={userSelections.users}
            onChange={(e) => setUserSelections({...userSelections, users: parseInt(e.target.value)})}
          >
            {[1, 2, 5, 10].map(num => (
              <option key={num} value={num}>{num} user{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="annualBilling"
            checked={userSelections.annualBilling}
            onChange={(e) => setUserSelections({...userSelections, annualBilling: e.target.checked})}
          />
          <label htmlFor="annualBilling">Annual billing (20% discount)</label>
        </div>
      </div>

      {/* Pricing cards */}
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4")}>
        {dynamicPricing.map((price, idx) => (
          <div
            key={idx}
            className="relative group block p-2 h-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-muted/[0.8] -z-[1] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <Card
              className={cn("w-full flex flex-col justify-between z-30 h-full", {
                "border-2 border-primary": price.isPopular,
                "ring-2 ring-primary": price.isPopular,
              })}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{price.title}</CardTitle>
                    <CardDescription>{price.description}</CardDescription>
                  </div>
                  {price.isPopular && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      POPULAR
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{price.price}</span>
                <span className="text-muted-foreground">
                  {price.title === "Starter" ? '' : '/month'}
                  {userSelections.annualBilling && price.title !== "Starter" && (
                    <span className="block text-sm text-green-600">2 months free</span>
                  )}
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-2">
                  {price.features.map((feature, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <CheckCircle2 className="text-emerald-500 h-5 w-5" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/agency?plan=${price.title.toLowerCase()}`}
                  className={cn(
                    "w-full mt-4",
                    buttonVariants({
                      variant: price.isPopular ? "default" : "secondary",
                      size: "lg"
                    })
                  )}
                >
                  Get {price.title}
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoverPriceCard;