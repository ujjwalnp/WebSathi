import React from "react";
import Link from "next/link";

import MaxWidthWrapper from "@components/ui/max-width-wrapper";
import { cn, constructMetadata } from "@lib/utils";
import { buttonVariants } from "@components/ui/button";
import Navbar from "@components/navigation/navbar";

import {
  HoverPriceCard,
  HeroContainerScroll,
  InfiniteMovingCards,
  StickyScroll,
  BackgroundBeams,
} from "@components/modules/landing/DummyLandingComponents";

const HomePage: React.FC = () => {
  return (
    <div className="h-full">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ All content wrapped with padding if Navbar is fixed */}
      <div className="pt-16">
        <section className="w-full relative">
          <MaxWidthWrapper>
            <HeroContainerScroll />
          </MaxWidthWrapper>
          <BackgroundBeams />
        </section>

        <section>
          <MaxWidthWrapper className="flex items-center flex-col gap-4 md:mt-20">
            <h2 className="text-4xl text-center font-medium">
              Choose what fits you right
            </h2>
            <p className="text-muted-foreground text-center">
              Our straightforward pricing plans are tailored to meet your needs.
              If you&apos;re not ready to commit you can get started for free.
            </p>
            <HoverPriceCard />
          </MaxWidthWrapper>
        </section>

        <section className="w-full mt-10 md:mt-20">
          <InfiniteMovingCards pauseOnHover={false} speed="slow" />
        </section>

        <section className="w-full mt-10 md:mt-20">
          <MaxWidthWrapper>
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-4xl text-center font-medium">
                Explore new features
              </h2>
              <div className="text-muted-foreground text-center">
                <p>
                  WebSathi does everything possible to provide you with a
                  convenient tool for managing your agency.
                </p>
                <p>Here are just a few tools that may interest you.</p>
              </div>
            </div>
          </MaxWidthWrapper>
          <div className="py-10">
            <StickyScroll />
          </div>
        </section>

        <div className="h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
              Join WebSathi
            </h1>
            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
              Discover the power of seamless agency management with WebSathi Agency
              CRM. Experience the difference today and revolutionize the way you
              manage your agency with WebSathi.
            </p>
            <div className="flex flex-col items-center justify-center mt-8 space-y-4">
              <Link
                href="/agency/sign-up"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-32 h-12 text-lg font-medium rounded-lg",
                  "transition-all hover:scale-105 hover:shadow-lg",
                  "flex items-center justify-center"
                )}
              >
                Join Now
              </Link>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Start your agency management journey today
              </p>
            </div>
          </div>
          <BackgroundBeams />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// ✅ Static metadata for SEO
export const metadata = constructMetadata();
