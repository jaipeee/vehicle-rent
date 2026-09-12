"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { NavItem } from "./navbar.config";
import { PhoneBadge, CtaButton } from "./navbar-actions";

interface MobileNavProps {
  items: NavItem[];
  triggerClassName?: string;
}

export function MobileNav({ items, triggerClassName }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className={cn(triggerClassName)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav className="mt-6 flex flex-col gap-1">
            {items.map((item) => {
              const Icon = item.icon;
              return item.children?.length ? (
                <Collapsible key={item.href}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium">
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="flex flex-col gap-1 pl-8">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2 text-sm text-muted-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 flex flex-col gap-3 border-t pt-6">
            <PhoneBadge />
            <CtaButton className="w-full justify-center" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}