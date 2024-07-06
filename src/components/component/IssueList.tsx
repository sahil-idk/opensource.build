import React from "react";
import Link from "next/link";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { addToWorkspace } from "@/actions/addToWorkspace";
import Image from "next/image";

const IssueList = async ({
  orgName,
  repoName,
}: {
  orgName: string;
  repoName: string;
}) => {
  const issueData = await fetch(
    `https://api.github.com/repos/${orgName}/${repoName}/issues?page=1&&per_page=5`,
    {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    }
  ).then((response) => response.json());

  return (
    <TabsContent value="issues">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Repository Issues</CardTitle>
          <CardDescription>
            View and manage the issues for this repository.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Add</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issueData &&
                issueData.map(
                  (issue: {
                    id: number;
                    state: string;
                    number: number;
                    title: string;
                    assignee: {
                      login: string | null;
                    };
                    assignees:
                      | [
                          {
                            login: string;
                          }
                        ]
                      | null;
                    created_at: string;
                    updated_at: string;
                    comments: number;
                    html_url: string;
                  }) => {
                    return (
                      <TableRow key={issue.id}>
                        <TableCell className="w-44">
                          <Link
                            href={issue.html_url}
                            className="font-medium "
                            prefetch={false}
                          >
                            #{issue.number} - {issue.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge>{issue.state}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Image
                              src="/placeholder.svg"
                              alt="Avatar"
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <span>
                              {issue.assignee === null ? (
                                <>No assignee</>
                              ) : (
                                <>{issue.assignee.login}</>
                              )}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>2 days ago</TableCell>
                        <TableCell>
                          <form action={addToWorkspace}>
                            <input type="hidden" name="id" value={issue.id} />
                            <input
                              type="hidden"
                              name="number"
                              value={issue.number}
                            />
                            <input
                              type="hidden"
                              name="title"
                              value={issue.title}
                            />
                            <input
                              type="hidden"
                              name="state"
                              value={issue.state}
                            />
                            <input
                              type="hidden"
                              name="issueLink"
                              value={issue.html_url}
                            />
                            <Button type="submit">Add to workspace</Button>
                          </form>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default IssueList;
