import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import IssueList from "./IssueList";
import { JSX, SVGProps, Suspense } from "react";

type RepoDashboardProps = {
  orgName: string;
  repoName: string;
};

export function RepoDashboard({ orgName, repoName }: RepoDashboardProps) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <div className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">{orgName}</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <div className="h-5 w-5" />
                  <span className="sr-only">Repository</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Repository</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <div className="h-5 w-5" />
                  <span className="sr-only">Issues</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Issues</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {orgName}/{repoName}
            </h1>
            <p className="text-sm text-muted-foreground">{orgName}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <MoveHorizontalIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Repository</DropdownMenuItem>
              <DropdownMenuItem>View Issues</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="details">
            <TabsList className="flex items-center gap-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Repository Details</CardTitle>
                  <CardDescription>
                    Beautifully designed components that you can copy and paste
                    into your apps.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-[1fr_1fr] gap-4">
                      <div>
                        <Label>Repository Name</Label>
                        <p>shadcn/ui</p>
                      </div>
                      <div>
                        <Label>Organization</Label>
                        <p>Acme Inc</p>
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <p>
                        Beautifully designed components that you can copy and
                        paste into your apps.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-[1fr_1fr] gap-4">
                      <div>
                        <Label>Language</Label>
                        <p>TypeScript</p>
                      </div>
                      <div>
                        <Label>Stars</Label>
                        <p>20k</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[1fr_1fr] gap-4">
                      <div>
                        <Label>Forks</Label>
                        <p>2.5k</p>
                      </div>
                      <div>
                        <Label>Open Issues</Label>
                        <p>125</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <Suspense fallback={<div>Loading...</div>}>
              <IssueList orgName={orgName} repoName={repoName} />
            </Suspense>
            {/* <TabsContent value="issues">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Repository Issues</CardTitle>
                  <CardDescription>View and manage the issues for this repository.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Issue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Link href="#" className="font-medium" prefetch={false}>
                            Improve documentation for Dropdown component
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Open</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img src="/placeholder.svg" alt="Avatar" width={24} height={24} className="rounded-full" />
                            <span>@olivia</span>
                          </div>
                        </TableCell>
                        <TableCell>2 days ago</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Link href="#" className="font-medium" prefetch={false}>
                            Add support for dark mode
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Open</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img src="/placeholder.svg" alt="Avatar" width={24} height={24} className="rounded-full" />
                            <span>@michael</span>
                          </div>
                        </TableCell>
                        <TableCell>5 days ago</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Link href="#" className="font-medium" prefetch={false}>
                            Fix issue with Button component
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Closed</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img src="/placeholder.svg" alt="Avatar" width={24} height={24} className="rounded-full" />
                            <span>@ava</span>
                          </div>
                        </TableCell>
                        <TableCell>2 weeks ago</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Link href="#" className="font-medium" prefetch={false}>
                            Improve performance of Table component
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Open</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img src="/placeholder.svg" alt="Avatar" width={24} height={24} className="rounded-full" />
                            <span>@daniel</span>
                          </div>
                        </TableCell>
                        <TableCell>1 month ago</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent> */}
          </Tabs>
        </main>
      </div>
    </div>
  );
}

function MoveHorizontalIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}
