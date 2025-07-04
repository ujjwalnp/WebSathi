"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Contact2, Goal, ShoppingCart } from "lucide-react";

import { AreaChart } from "@components/ui/area-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { Progress } from "@components/ui/progress";
import { CircleProgress } from "@components/ui/circle-progress";
import BlurPage from "@components/common/BlurPage";

interface AgencyDashboardProps {
  agencyId: string;
}

const AgencyDashboard = ({ agencyId }: AgencyDashboardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [agencyDetails, setAgencyDetails] = useState<any>(null);
  const [subAccounts, setSubAccounts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    const fetchData = async () => {
      if (!agencyId) {
        router.push("/agency/unauthorized");
        return;
      }

      // Fake API simulation
      const agencyData = { goal: 10 };
      const subAccountsData = [
        { id: 1, name: "Client A" },
        { id: 2, name: "Client B" },
      ];

      setAgencyDetails(agencyData);
      setSubAccounts(subAccountsData);
    };

    fetchData();
  }, [agencyId, router]);

  if (!isMounted || !agencyDetails) return null;

  const currencySymbol = "रू";
  const mockTransactions = [
    { created: "2023-01-01", amount_total: 100000 },
    { created: "2023-02-01", amount_total: 150000 },
    { created: "2023-03-01", amount_total: 120000 },
    { created: "2023-04-01", amount_total: 180000 },
  ];

  const net = mockTransactions.reduce((total, t) => total + t.amount_total, 0);
  const potentialIncome = Math.floor(net * 1.2);
  const closingRate = 75;

  const formatCurrency = (amount: number) => {
    return `${currencySymbol} ${amount.toLocaleString("en-US")}`;
  };

  return (
    <BlurPage>
      <div className="ml-0 lg:ml-64 p-6"> {/* Adjusted for sidebar */}
        <div className="max-w-7xl mx-auto"> {/* Container for better max-width */}
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <Separator className="mt-2 mb-6" />
          
          <div className="flex flex-col gap-4 pb-6">
            {/* Top Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardDescription>Income</CardDescription>
                  <CardTitle className="text-4xl">
                    {formatCurrency(net)}
                  </CardTitle>
                  <small className="text-xs text-muted-foreground">
                    For the year {format(new Date(), "yyyy")}
                  </small>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Total revenue generated (demo data)
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>Potential Income</CardDescription>
                  <CardTitle className="text-4xl">
                    {formatCurrency(potentialIncome)}
                  </CardTitle>
                  <small className="text-xs text-muted-foreground">
                    For the year {format(new Date(), "yyyy")}
                  </small>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Estimated potential revenue (demo data)
                </CardContent>
              </Card>

              <Card className="relative">
                <CardHeader>
                  <CardDescription>Active Clients</CardDescription>
                  <CardTitle className="text-4xl">
                    {subAccounts.length}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Reflects the number of sub accounts you own and manage.
                </CardContent>
                <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
              </Card>

              <Card className="relative">
                <CardHeader>
                  <CardTitle>Agency Goal</CardTitle>
                  <CardDescription>
                    <div className="mt-2">
                      Reflects the number of sub accounts you want to own and
                      manage.
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">
                        Current: {subAccounts.length}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        Goal: {agencyDetails.goal}
                      </span>
                    </div>
                    <Progress
                      value={(subAccounts.length / agencyDetails.goal) * 100}
                    />
                  </div>
                </CardFooter>
                <Goal className="absolute right-4 top-4 text-muted-foreground" />
              </Card>
            </div>

            {/* Bottom Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2 p-4">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <AreaChart
                  className="text-sm stroke-primary"
                  data={mockTransactions.map((t) => ({
                    ...t,
                    amount_total: t.amount_total / 100,
                  }))}
                  index="created"
                  categories={["amount_total"]}
                  colors={["primary"]}
                  yAxisWidth={30}
                  showAnimation
                />
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CircleProgress
                    value={closingRate}
                    description={
                      <>
                        <div className="flex flex-col">
                          Abandoned
                          <div className="flex gap-2">
                            <ShoppingCart className="text-rose-700" />
                            {Math.floor((100 - closingRate) / 10)}
                          </div>
                        </div>
                        <div className="flex flex-col mt-2">
                          Successful
                          <div className="flex gap-2">
                            <ShoppingCart className="text-emerald-700" />
                            {Math.floor(closingRate / 10)}
                          </div>
                        </div>
                      </>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </BlurPage>
  );
};

const DashboardPage = () => {
  const dummyAgencyId = "test-agency-id";
  return <AgencyDashboard agencyId={dummyAgencyId} />;
};

export default DashboardPage;