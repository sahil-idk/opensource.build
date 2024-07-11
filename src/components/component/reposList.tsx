import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { GITHUB_API_BASE_URL } from "@/lib/env";

const ReposList = async ({ orgGithub }: { orgGithub: string }) => {
  function daysAgo(dateString: string): string {
    const date = new Date(dateString).getTime(); // Convert to milliseconds
    const now = new Date().getTime(); // Convert to milliseconds
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
}

  console.log(orgGithub, "orgGithub");
  const repos = await fetch(
    `https://api.github.com/orgs/${orgGithub}/repos?per_page=8 `,
    {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    }
  );
  const reposList = await repos.json();
  console.log(reposList, "reposList");
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {reposList ? (
        reposList.map((repo: any) => {
          return (
            <Link href={`/orgs/${orgGithub}/${repo.name}`} key={repo.id}>
              <Card className="h-56">
                <CardHeader className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpenIcon className="w-6 h-6" />
                    <div className="grid gap-1">
                      <div className="font-medium">{repo.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {repo.full_name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="px-2 py-1 text-xs">
                      {repo.language}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <StarIcon className="w-4 h-4" />
                      <span className="sr-only">Star</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GithubIcon className="w-4 h-4" />
                      <span>{daysAgo(repo.updated_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <StarIcon className="w-4 h-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })
      ) : (
        <div>No Repos</div>
      )}
    </div>
  );
};

export default ReposList;

function GithubIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
function StarIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function BookOpenIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
