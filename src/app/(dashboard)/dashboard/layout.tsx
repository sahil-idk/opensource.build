import DashboardSidebar from "@/components/component/dashBoardSidebar";
import React from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  PanelLeftIcon,
  HomeIcon,
  ListIcon,
  ActivityIcon,
  LayersIcon,
  StarIcon,
  GithubIcon,
} from "@/components/icons/Icons";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <DashboardSidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeftIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    prefetch={false}
                  >
                    <GithubIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <HomeIcon className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                    prefetch={false}
                  >
                    <ListIcon className="h-5 w-5" />
                    Issues
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <LayersIcon className="h-5 w-5" />
                    Repositories
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <StarIcon className="h-5 w-5" />
                    Starred
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <ActivityIcon className="h-5 w-5" />
                    Activity
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            {children}
          </header>
        </div>
      </div>
    </section>
  );
}
