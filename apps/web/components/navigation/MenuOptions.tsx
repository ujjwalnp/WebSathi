"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsUpDown,
  Compass,
  Menu,
  PlusCircle,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@ui/sheet";
import { Button } from "@ui/button";
import { AspectRatio } from "@ui/aspect-ratio";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "@ui/separator";
import { cn } from "@lib/utils";

// Fake Role Enum for frontend only
const Role = {
  AGENCY_OWNER: "AGENCY_OWNER",
  AGENCY_ADMIN: "AGENCY_ADMIN",
};

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "dashboard":
      return <LayoutDashboard className="w-4 h-4" />;
    case "settings":
      return <Settings className="w-4 h-4" />;
    default:
      return <Menu className="w-4 h-4" />;
  }
};

const MenuOptions = ({
  details,
  id,
  sideBarLogo,
  sideBarOptions,
  subAccount,
  user,
  defaultOpen,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isOwnerOrAdmin =
    user.role === Role.AGENCY_ADMIN || user.role === Role.AGENCY_OWNER;

  return (
    <Sheet modal={false} open={defaultOpen ? true : undefined}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:hidden flex"
      >
        <Button size="icon" variant="outline">
          <Menu aria-label="Open Menu" />
        </Button>
      </SheetTrigger>

      <SheetContent
        showClose={!defaultOpen}
        side="left"
        className={cn(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r p-6",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <AspectRatio ratio={16 / 5}>
          <Image
            src={sideBarLogo}
            alt="Sidebar logo"
            fill
            className="rounded-md object-contain"
          />
        </AspectRatio>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-full my-4 flex items-center justify-between py-8" variant="ghost">
              <div className="flex items-center text-left gap-2">
                <Compass aria-hidden />
                <div className="flex flex-col">
                  {details.name}
                  <span className="text-muted-foreground">{details.address}</span>
                </div>
              </div>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="h-80 overflow-y-hidden mt-4 z-[200]">
            <Command>
              <CommandInput placeholder="Search Accounts..." />
              <ScrollArea className="rounded-md">
                <CommandList className="pb-16 overflow-y-hidden">
                  <CommandEmpty>No results found.</CommandEmpty>

                  {isOwnerOrAdmin && user.agency && (
                    <CommandGroup heading="Agency">
                      <CommandItem className="bg-transparent my-2 text-primary border border-border p-2 rounded-md hover:bg-muted transition-all">
                        <Link href={`/agency/${user.agency.id}`} className="flex gap-4 w-full h-full">
                          <div className="relative w-10">
                            <Image
                              src={user.agency.agencyLogo}
                              alt="Agency Logo"
                              fill
                              className="rounded-md object-contain"
                            />
                          </div>
                          <div className="flex flex-col flex-1">
                            {user.agency.name}
                            <span className="text-muted-foreground">{user.agency.address}</span>
                          </div>
                        </Link>
                      </CommandItem>
                    </CommandGroup>
                  )}

                  <CommandGroup heading="Accounts">
                    {subAccount.length > 0 ? (
                      subAccount.map((sub) => (
                        <CommandItem key={sub.id}>
                          <Link href={`/subaccount/${sub.id}`} className="flex gap-4 w-full h-full">
                            <div className="relative w-10">
                              <Image
                                src={sub.subAccountLogo}
                                alt="Subaccount Logo"
                                fill
                                className="rounded-md object-contain"
                              />
                            </div>
                            <div className="flex flex-col flex-1">
                              {sub.name}
                              <span className="text-muted-foreground">{sub.address}</span>
                            </div>
                          </Link>
                        </CommandItem>
                      ))
                    ) : (
                      <div className="text-muted-foreground text-xs text-center w-full">
                        No accounts found.
                      </div>
                    )}
                  </CommandGroup>
                </CommandList>
              </ScrollArea>

              {isOwnerOrAdmin && (
                <Button
                  onClick={() => alert("Simulated: Open 'Create Subaccount' Modal")}
                  className="w-full flex items-center gap-2 mt-4"
                >
                  <PlusCircle className="w-4 h-4" />
                  Create Sub Account
                </Button>
              )}
            </Command>
          </PopoverContent>
        </Popover>

        <p className="text-muted-foreground text-xs mb-2">Menu Links</p>
        <Separator className="mb-4" />
        <nav className="relative">
          <Command className="bg-transparent">
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {sideBarOptions.map((option) => {
                  const icon = getIconComponent(option.icon);
                  return (
                    <CommandItem
                      key={option.id}
                      className={cn("w-full", {
                        "bg-primary text-white font-bold": pathname === option.link,
                      })}
                    >
                      <Link href={option.link} className="flex items-center gap-2 w-full">
                        {icon}
                        <span>{option.name}</span>
                      </Link>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
