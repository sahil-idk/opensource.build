"use client";

import { useState, useMemo } from "react";
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

export function IssuePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "id", order: "asc" });
  const [filter, setFilter] = useState({
    status: ["open", "in progress", "closed"],
    organization: [],
  });
  const issues = useMemo(
    () =>
      [
        {
          id: "ISS001",
          name: "Broken Signup Flow",
          status: "open",
          organization: "Acme Inc",
          priority: "high",
          assignee: "jdoe",
          created: "2023-06-01",
          updated: "2023-06-05",
        },
        {
          id: "ISS002",
          name: "Slow API Response",
          status: "in progress",
          organization: "Globex Corp",
          priority: "medium",
          assignee: "msmith",
          created: "2023-05-15",
          updated: "2023-06-03",
        },
        {
          id: "ISS003",
          name: "Incorrect Pricing Display",
          status: "closed",
          organization: "Stark Industries",
          priority: "low",
          assignee: "tstark",
          created: "2023-04-20",
          updated: "2023-05-25",
        },
        {
          id: "ISS004",
          name: "Unresponsive Mobile Layout",
          status: "open",
          organization: "Acme Inc",
          priority: "high",
          assignee: "jdoe",
          created: "2023-06-10",
          updated: "2023-06-12",
        },
        {
          id: "ISS005",
          name: "Billing Integration Issue",
          status: "in progress",
          organization: "Globex Corp",
          priority: "medium",
          assignee: "msmith",
          created: "2023-05-30",
          updated: "2023-06-08",
        },
        {
          id: "ISS006",
          name: "Broken Checkout Process",
          status: "closed",
          organization: "Stark Industries",
          priority: "low",
          assignee: "tstark",
          created: "2023-04-28",
          updated: "2023-05-30",
        },
      ]
        .filter((issue) => {
          const searchValue = search.toLowerCase();
          return (
            issue.id.toLowerCase().includes(searchValue) ||
            issue.name.toLowerCase().includes(searchValue) ||
            issue.status.toLowerCase().includes(searchValue) ||
            issue.organization.toLowerCase().includes(searchValue) ||
            issue.priority.toLowerCase().includes(searchValue) ||
            issue.assignee.toLowerCase().includes(searchValue)
          );
        })
        .filter((issue) => filter.status.includes(issue.status))
        .filter(
          (issue) =>
            filter.organization.length === 0 ||
            filter.organization.includes(issue.organization)
        )
        .sort((a, b) => {
          if (sort.order === "asc") {
            return a[sort.key] > b[sort.key] ? 1 : -1;
          } else {
            return a[sort.key] < b[sort.key] ? 1 : -1;
          }
        }),
    [search, sort, filter]
  );
  const handleSearch = (e) => setSearch(e.target.value);
  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ key, order: "asc" });
    }
  };
  const handleFilterStatus = (status) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      status: prevFilter.status.includes(status)
        ? prevFilter.status.filter((s) => s !== status)
        : [...prevFilter.status, status],
    }));
  };
  const handleFilterOrganization = (organization) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      organization: prevFilter.organization.includes(organization)
        ? prevFilter.organization.filter((o) => o !== organization)
        : [...prevFilter.organization, organization],
    }));
  };
  const uniqueOrganizations = useMemo(
    () => Array.from(new Set(issues.map((issue) => issue.organization))),
    [issues]
  );
  return (
    <div className="flex h-full w-full flex-col bg-muted/40">
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
            {uniqueOrganizations.map((org) => (
              <DropdownMenuCheckboxItem
                key={org}
                checked={filter.organization.includes(org)}
                onCheckedChange={() => handleFilterOrganization(org)}
              >
                {org}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" className="shrink-0">
          <div className="h-4 w-4 mr-2" />
          New Issue
        </Button>
      </header>
      <div className="flex flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex-1 overflow-auto">
          <Table>
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
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("organization")}
                >
                  Organization
                  {sort.key === "organization" && (
                    <span className="ml-1">
                      {sort.order === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("priority")}
                >
                  Priority
                  {sort.key === "priority" && (
                    <span className="ml-1">
                      {sort.order === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("assignee")}
                >
                  Assignee
                  {sort.key === "assignee" && (
                    <span className="ml-1">
                      {sort.order === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
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
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.id}</TableCell>
                  <TableCell>{issue.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        issue.status === "open"
                          ? "secondary"
                          : issue.status === "in progress"
                          ? "outline"
                          : "default"
                      }
                    >
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{issue.organization}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{issue.assignee}</TableCell>
                  <TableCell>
                    <time dateTime={issue.created}>
                      {new Date(issue.created).toLocaleDateString()}
                    </time>
                  </TableCell>
                  <TableCell>
                    <time dateTime={issue.updated}>
                      {new Date(issue.updated).toLocaleDateString()}
                    </time>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
              <div className="grid gap-2">
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
