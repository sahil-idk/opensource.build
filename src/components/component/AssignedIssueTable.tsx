/* eslint-disable react/no-unescaped-entities */

import { currentUser } from "@clerk/nextjs/server"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { GaugeIcon, GithubIcon } from "../icons/Icons"
import Link from "next/link"

type Props = {}

const AssignedIssueTable = async (props: Props) => {
    const user = await currentUser();
if(!user){
    return <div>user cant be found </div>
}
    const issueData = await fetch(`https://api.github.com/search/issues?q=assignee:${user?.username!}`,{
        headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
    }).then((response) => response.json());
    
    if(issueData.items.length === 0){
        return <div> No issues assigned to you</div>
    }
    
    // console.log(issueData.items[0].labels,"issueData");
  return (
    <div className="w-full">
      <p className="text-lg text-slate-400">Hi {user?.username} , you  have {issueData.total_count} issues assigned to you</p> 

         {
            issueData.items.map((issue: any) => {
                return (
                    <Card key={issue.id} className="w-full my-3">
                    <CardHeader className="flex  justify-between">
                      <div className="space-y-1">
                        <CardTitle>Issue {issue.number} - {issue.title}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Status:</span> {issue.state}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center space-x-5 rounded-md px-3 py-1 text-sm ">
                          {issue.labels.map((label:{
                                id: number,
                                name: string,
                                color: string,
                                url: string,
                                description: string,
                                default: boolean,
                                node_id: string,
                            
                          }) => {
                            return (
                                <>
                            
                          <span className={`font-semibold px-2 py-1 rounded-full bg-orange-600 text-black text-bold`}>{label.name}</span>
                          </>
                          )})}
                          
                        </div>
                        {/* <Progress value={60} className="w-24" /> */}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h1 className="text-muted-foreground">
                        <Link className="hover:text-orange-600" href={issue.html_url}><GithubIcon/></Link>
                      </h1>
                    </CardContent>
                  </Card>
                )
            })
         }

 
    </div>
  )
}

export default AssignedIssueTable