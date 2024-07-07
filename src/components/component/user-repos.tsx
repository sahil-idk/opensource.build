import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  StarIcon,
  GithubIcon,
  DoorOpenIcon,
  GitBranchIcon,
} from "../icons/Icons";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export async function UserRepos() {
  const user = await currentUser();
  console.log(user?.username);
  const userRepos = await fetch(
    `https://api.github.com/users/${user?.username}/repos?per_page=6&page=1&sort=updated`,
    {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  console.log(userRepos);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {userRepos ? (
        userRepos.map(
          (repo: {
            id: number;
            html_url: string;
            name: string;
            stargazers_count: number;
            description: string;
            default_branch: string;
            updated_at: number;
            open_issues_count: number;
          }) => {
            return (
              <Card
                key={repo.id}
                className="bg-background shadow-lg rounded-lg overflow-hidden"
              >
                <CardHeader className="px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-lg">{repo.name}</div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <StarIcon className="w-4 h-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground h-32">
                    {repo.description}
                  </p>
                  <Link href={repo.html_url} className="hover:text-orange-600">
                    View Source code
                  </Link>
                  <div className="flex items-center gap-4 mt-4  text-sm">
                    <div className="flex items-center gap-1">
                      <GitBranchIcon className="w-4 h-4" />
                      <span className="text-muted-foreground">
                        {repo.default_branch}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GithubIcon className="w-4 h-4" />
                      <span className="text-muted-foreground">
                        Updated {repo.updated_at} days ago
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DoorOpenIcon className="w-4 h-4" />
                      <span className="text-muted-foreground">
                        {repo.open_issues_count} open issues
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }
        )
      ) : (
        <>No repos found</>
      )}
    </div>
  );
}
