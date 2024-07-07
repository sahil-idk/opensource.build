import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { db } from "@/db";
import { issuesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { FileIcon, ListFilterIcon, SearchIcon } from "../icons/Icons";

export async function UserDashboard({ user }: { user: any }) {
  const issuesTodo = await db
    .select()
    .from(issuesTable)
    .where(eq(issuesTable.userId, user?.id ?? "default_id"));
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-1">
      <div className="flex gap-2">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#" prefetch={false}>
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#" prefetch={false}>
                  GitHub
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Open Source Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Image
                src={user?.imageUrl ?? "/placeholder-user.jpg"}
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Your Organizations</CardTitle>
                <CardDescription className="max-w-lg text-balance flex flex-col gap-6  leading-relaxed">
                  Explore your open source contributions and impact.
                  <Link href={"/orgs"} className={buttonVariants()}>
                    View Organizations
                  </Link>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <BarChart className="aspect-[9/4]" /> */}
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Open Issues</CardDescription>
                <CardTitle className="text-4xl">24</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +5 from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Pull Requests</CardDescription>
                <CardTitle className="text-4xl">12</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +2 from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={12} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="todo">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="todo">Todo</TabsTrigger>
                <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilterIcon className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Open
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Closed</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Assigned to me
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <FileIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>
            <TabsContent value="todo">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Todo Issues</CardTitle>
                  <CardDescription>
                    Issues that need your attention.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Issue</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Link
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created
                        </TableHead>
                        <TableHead className="text-right">Assignee</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {issuesTodo &&
                        issuesTodo.slice(0,5).map((todo) => {
                          return (
                            <TableRow className="bg-accent" key={todo.id}>
                              <TableCell>
                                <div className="font-medium">
                                  #{todo.number} - {todo.title}
                                </div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                  Reported by @johndoe
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Link href={todo.issueLink!}>github link</Link>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                  {todo.state}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                2023-06-23
                              </TableCell>
                              <TableCell className="text-right">
                                <Avatar className="w-6 h-6 border">
                                  <AvatarImage src="/placeholder-user.jpg" />
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                   
                  </Table>
                  <div className="text-right text-slate-400 my-2">
                    <Link className={buttonVariants()} href="/dashboard/issues">View More</Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
