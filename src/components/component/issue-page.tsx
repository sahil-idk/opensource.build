
"use client";

import { useState, useMemo, useEffect, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { fetchIssues } from "@/actions/fetchIssues";
import { useAuth } from "@clerk/nextjs";
import { GithubIcon } from "../icons/Icons";
import Link from "next/link";

interface Issue {
  number: string | null;
  id: string;
  userId: string | null;
  title: string | null;
  state: string | null;
  issueLink: string | null;
}
export function IssuePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "id", order: "asc" });
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState({
    status: ["open", "in progress", "closed"],
    organization: [],
  });
  const [issues, setIssues] = useState<Issue[]>([]);
  const {userId}= useAuth();
  useEffect(() => {
    async function loadIssues() {
      setLoading(true);
      const fetchedIssues = await fetchIssues(userId!);
      console.log(fetchedIssues);
      setIssues(fetchedIssues);
      setLoading(false);
    }
    loadIssues();
  }, []);
  
 
  const filteredIssues = useMemo(() => {
    const searchValue = search.toLowerCase();
    return issues.filter((issue) => {
      return (
        issue.number!.toLowerCase().includes(searchValue) ||
        issue.title!.toLowerCase().includes(searchValue) ||
        issue.state!.toLowerCase().includes(searchValue) 
    
      );
    });
  }, [search, issues]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleSort = (key: string) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ key, order: "asc" });
    }
  };
  const handleFilterStatus = (status: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      status: prevFilter.status.includes(status)
        ? prevFilter.status.filter((s) => s !== status)
        : [...prevFilter.status, status],
    }));
  };
  // const handleFilterOrganization = (organization: any) => {
  //   setFilter((prevFilter) => ({
  //     ...prevFilter,
  //     organization: prevFilter.organization.includes(organization)
  //       ? prevFilter.organization.filter((o) => o !== organization)
  //       : [...prevFilter.organization, organization],
  //   }));
  // };
  // const uniqueOrganizations = useMemo(
  //   () => Array.from(new Set(issues.map((issue) => issue.organization))),
  //   [issues]
  // );
  return (
    <div className="flex h-full w-full flex-col bg-muted/40 p-5">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="relative flex-1">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search issues..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <div className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filter.status.includes("open")}
              onCheckedChange={() => handleFilterStatus("open")}
            >
              Open
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter.status.includes("in progress")}
              onCheckedChange={() => handleFilterStatus("in progress")}
            >
              In Progress
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter.status.includes("closed")}
              onCheckedChange={() => handleFilterStatus("closed")}
            >
              Closed
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            {/* {uniqueOrganizations.map((org) => (
              <DropdownMenuCheckboxItem
                key={org}
                checked={filter.organization.includes(org)}
                onCheckedChange={() => handleFilterOrganization(org)}
              >
                {org}
              </DropdownMenuCheckboxItem>
            ))} */}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" className="shrink-0">
          <div className="h-4 w-4 mr-2" />
          New Issue
        </Button>
      </header>
      <div className="flex flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-[85rem]">
        <div className="flex-1 overflow-auto">
          {loading ? (
        <div>Loading...</div>
      ) : (<Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  Issue ID
                  {sort.key === "id" && (
                    <span className="ml-1">
                      {sort.order === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name
                  {sort.key === "name" && (
                    <span className="ml-1">
                      {sort.order === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status
                  {sort.key === "status" && (
                    <span className="ml-1">
                      {sort.order === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                {/* <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("organization")}
                >
                  Organization
                  {sort.key === "organization" && (
                    <span className="ml-1">
                      {sort.order === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead> */}
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("priority")}
                >
                  Github
                  {sort.key === "priority" && (
                    <span className="ml-1">
                      {sort.order === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                {/* <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("assignee")}
                >
                  Assignee
                  {sort.key === "assignee" && (
                    <span className="ml-1">
                      {sort.order === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead> */}
                {/* <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("created")}
                >
                  Created
                  {sort.key === "created" && (
                    <span className="ml-1">
                      {sort.order === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("updated")}
                >
                  Updated
                  {sort.key === "updated" && (
                    <span className="ml-1">
                      {sort.order === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.number}</TableCell>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        issue.state === "open"
                          ? "secondary"
                          : issue.state === "in progress"
                          ? "outline"
                          : "default"
                      }
                    >
                      {issue.state}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={issue.issueLink!} className="hover:text-orange-600">
                   
                    <GithubIcon className="w-5 h-5"/>
                    </Link>
                  </TableCell>
                  {/* <TableCell>
                    <Badge
                      variant={
                        issue.priority === "high"
                          ? "danger"
                          : issue.priority === "medium"
                          ? "warning"
                          : "default"
                      }
                    >
                      {issue.priority}
                    </Badge>
                  </TableCell> */}
                  {/* <TableCell>{issue.assignee}</TableCell>
                  <TableCell>
                    <time dateTime={issue.created}>
                      {new Date(issue.created).toLocaleDateString()}
                    </time>
                  </TableCell>
                  <TableCell>
                    <time dateTime={issue.updated}>
                      {new Date(issue.updated).toLocaleDateString()}
                    </time>
                  </TableCell> */}
                </TableRow> 
               
              )) 
              }

            </TableBody>
          </Table>)}
        </div>
        <div className="hidden w-64 flex-col gap-4 lg:flex">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Issues</CardTitle>
              <CardDescription>
                View the issues assigned to you at a glance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div>Open</div>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>In Progress</div>
                  <Badge variant="outline">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>Closed</div>
                  <Badge variant="default">1</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>My Priorities</CardTitle>
              <CardDescription>
                Issues that need your immediate attention.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div>High</div>
                  <Badge variant="danger">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>Medium</div>
                  <Badge variant="warning">1</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>Low</div>
                  <Badge variant="default">1</Badge>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
