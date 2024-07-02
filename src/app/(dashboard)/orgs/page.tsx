import { OrgList } from '@/components/component/org-list'
import CreateOrgForm from '@/components/forms/CreateOrgForm'
import OrgTable from '@/components/tables/OrgTable'
import { Button } from '@/components/ui/button'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { db } from '@/db'
import { orgsTable } from '@/db/schema'
import { SignedOut, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import React, { Suspense } from 'react'

type Props = {}


const OrgListItem = async () => {
  const user = await currentUser();
  const orgs = await db.select().from(orgsTable).where(eq(orgsTable.userId,user?.id ?? 'default_id'));
  // console.log(orgs)
  return (
    <div>
        <Table>
                
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">OrgName</TableHead>
                        <TableHead>Org Github</TableHead>
                        <TableHead>Org description</TableHead>
                        {/* <TableHead className="text-right">Amount</TableHead> */}
                    </TableRow>
                </TableHeader>
      
      {orgs.map((org) => 
      
      
        <OrgTable
        key={org.id}
        orgId={org.id}
        orgName={org.title}
        orgGithub={org.link}
        orgDescription={org.content}
        />
       
      )}
      </Table>
    </div>
  )

}
const OrgsPage = async (props: Props) => {
  const user = await currentUser();
  return (
    <div>
      {/* <div>
        
      <UserButton
      
      />
      
      </div>
       this is authorised dashboard
     <Link href='/orgs/create'>
      <Button>Create Org</Button>
     </Link>
     <Suspense fallback={<div>Loading...</div>}>
        <OrgList/>
      </Suspense> */}
      <OrgList OrgListItem={OrgListItem} username={user?.fullName}/>
      </div>
  )
}

export default OrgsPage