import React from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import Link from "next/link"
import Image from "next/image"
import ReposList from "./reposList"

export async  function OrgDashboard({orgName, orgGithub, orgDescription}:{
  orgName: string,
  orgGithub: string,
  orgDescription: string

}) {

  const orgInfo = await fetch(`https://api.github.com/orgs/${orgGithub}`,
  {
    headers: {
      'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    }
  }
  );
  const orgData = await orgInfo.json();
  console.log(orgData)
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src={orgData.avatar_url} alt="Organization Logo" width={40} height={40} className="rounded-full" />
          <h1 className="text-2xl font-bold">{orgName}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <PlusIcon className="w-4 h-4 mr-2" />
            <Link href={`https://github.com/${orgGithub}`}>Visit Github </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SettingsIcon className="w-4 h-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Organization Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>General</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Members</DropdownMenuItem>
              <DropdownMenuItem>Repositories</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 bg-muted/40 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-background rounded-full px-3 py-1 text-sm font-medium">Total Repositories: {orgData.public_repos}</div>
              {/* <div className="bg-background rounded-full px-3 py-1 text-sm font-medium">Total Contributors: 125</div> */}
              <div className="bg-background rounded-full px-3 py-1 text-sm font-medium">Total Followers: {orgData.followers}</div>
            </div>
            <div className="flex items-center gap-2">
              <Input type="search" placeholder="Search repositories..." className="bg-background" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FilterIcon className="w-4 h-4" />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Language</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Stars</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Last Updated</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ListOrderedIcon className="w-4 h-4" />
                    <span>Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Name</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Stars</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Last Updated</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div >
            <ReposList orgGithub={orgGithub}/>
            {/* <Card>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpenIcon className="w-6 h-6" />
                  <div className="grid gap-1">
                    <div className="font-medium">acme-docs</div>
                    <div className="text-sm text-muted-foreground">Documentation</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-1 text-xs">
                    JavaScript
                  </Badge>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <StarIcon className="w-4 h-4" />
                    <span className="sr-only">Star</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GithubIcon className="w-4 h-4" />
                    <span>2 days ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <StarIcon className="w-4 h-4" />
                    <span>125</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CodeIcon className="w-6 h-6" />
                  <div className="grid gap-1">
                    <div className="font-medium">acme-api</div>
                    <div className="text-sm text-muted-foreground">API Server</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-1 text-xs">
                    TypeScript
                  </Badge>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <StarIcon className="w-4 h-4" />
                    <span className="sr-only">Star</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GithubIcon className="w-4 h-4" />
                    <span>1 week ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <StarIcon className="w-4 h-4" />
                    <span>250</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LayoutPanelLeftIcon className="w-6 h-6" />
                  <div className="grid gap-1">
                    <div className="font-medium">acme-web</div>
                    <div className="text-sm text-muted-foreground">Website</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-1 text-xs">
                    React
                  </Badge>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <StarIcon className="w-4 h-4" />
                    <span className="sr-only">Star</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GithubIcon className="w-4 h-4" />
                    <span>3 weeks ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <StarIcon className="w-4 h-4" />
                    <span>350</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LayersIcon className="w-6 h-6" />
                  <div className="grid gap-1">
                    <div className="font-medium">acme-cli</div>
                    <div className="text-sm text-muted-foreground">Command Line Tool</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-1 text-xs">
                    Go
                  </Badge>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <StarIcon className="w-4 h-4" />
                    <span className="sr-only">Star</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GithubIcon className="w-4 h-4" />
                    <span>1 month ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <StarIcon className="w-4 h-4" />
                    <span>75</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CpuIcon className="w-6 h-6" />
                  <div className="grid gap-1">
                    <div className="font-medium">acme-services</div>
                    <div className="text-sm text-muted-foreground">Microservices</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-1 text-xs">
                    Rust
                  </Badge>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <StarIcon className="w-4 h-4" />
                    <span className="sr-only">Star</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GithubIcon className="w-4 h-4" />
                    <span>2 months ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <StarIcon className="w-4 h-4" />
                    <span>100</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DatabaseIcon className="w-6 h-6" />
                  <div className="grid gap-1">
                    <div className="font-medium">acme-db</div>
                    <div className="text-sm text-muted-foreground">Database</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-1 text-xs">
                    PostgreSQL
                  </Badge>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <StarIcon className="w-4 h-4" />
                    <span className="sr-only">Star</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GithubIcon className="w-4 h-4" />
                    <span>3 months ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <StarIcon className="w-4 h-4" />
                    <span>50</span>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </main>
    </div>
  )
}

function BookOpenIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}


function CodeIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}


function CpuIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  )
}


function DatabaseIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  )
}


function FilterIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function GithubIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}


function LayersIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  )
}


function LayoutPanelLeftIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="18" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
    </svg>
  )
}


function ListOrderedIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}


function PlusIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SettingsIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function StarIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
