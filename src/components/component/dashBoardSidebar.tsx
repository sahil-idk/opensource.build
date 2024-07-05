import React from 'react'
import Link from 'next/link'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { GithubIcon,LayersIcon,ListIcon,StarIcon,ActivityIcon,SettingsIcon,HomeIcon } from '../icons/Icons'
type Props = {}

const DashboardSidebar = (props: Props) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <TooltipProvider>
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          prefetch={false}
        >
          <GithubIcon className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              prefetch={false}
            >
              <HomeIcon className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/issues"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              prefetch={false}
            >
              <ListIcon className="h-5 w-5" />
              <span className="sr-only">Issues</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Issues</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/repositories"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              prefetch={false}
            >
              <LayersIcon className="h-5 w-5" />
              <span className="sr-only">Repositories</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Repositories</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              prefetch={false}
            >
              <StarIcon className="h-5 w-5" />
              <span className="sr-only">Starred</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Starred</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              prefetch={false}
            >
              <ActivityIcon className="h-5 w-5" />
              <span className="sr-only">Activity</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Activity</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              prefetch={false}
            >
              <SettingsIcon className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  </aside>
  )
}

export default DashboardSidebar