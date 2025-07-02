// apps/web/components/launch_pad/LaunchPadPage.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button, buttonVariants } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const LaunchPadPage: React.FC = () => {
  // Hardcoded mock data just for UI
  const agencyId = "12345";
  const agencyDetails = {
    id: agencyId,
    agencyLogo: "/stripelogo.png", // should exist in /public
    address: "123 Street",
    city: "Kathmandu",
    companyEmail: "test@agency.com",
    companyPhone: "+977123456789",
    country: "Nepal",
    name: "Test Agency",
    state: "Bagmati",
    zipCode: "44600",
    connectAccountId: null, // simulate not connected yet
  };

  const isAllDetailsExist = true; // mock: pretend we have all details
  const connectedStripeAccount = false; // mock: pretend Stripe is not connected

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Let's get started!</CardTitle>
            <CardDescription>
              Follow the steps below to set up your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Step 1 */}
            <div className="flex justify-between items-center border p-4 rounded-md gap-2">
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <Image
                  src="/appstore.png"
                  alt="App Logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Save the website as a shortcut on your mobile device.</p>
              </div>
              <Button>Start</Button>
            </div>

            {/* Step 2 */}
            <div className="flex justify-between items-center border p-4 rounded-md gap-2">
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <Image
                  src="/stripelogo.png"
                  alt="Stripe Logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Connect your Stripe account to accept payments.</p>
              </div>
              {agencyDetails.connectAccountId || connectedStripeAccount ? (
                <CheckCircle2
                  className="text-emerald-500 p-2 flex-shrink-0 w-12 h-12"
                  role="status"
                  aria-label="Done"
                />
              ) : (
                <Link href="#" className={buttonVariants()}>
                  Start
                </Link>
              )}
            </div>

            {/* Step 3 */}
            <div className="flex justify-between items-center border p-4 rounded-md gap-2">
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <Image
                  src={agencyDetails.agencyLogo}
                  alt="Agency Logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Fill in all your business details.</p>
              </div>
              {isAllDetailsExist ? (
                <CheckCircle2
                  className="text-emerald-500 p-2 flex-shrink-0 w-12 h-12"
                  role="status"
                  aria-label="Done"
                />
              ) : (
                <Link href="#" className={buttonVariants()}>
                  Start
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaunchPadPage;