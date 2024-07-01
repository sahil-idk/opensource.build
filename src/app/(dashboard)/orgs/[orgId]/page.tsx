import React, { Suspense } from 'react'
import { useRouter } from 'next/router'
import { OrgDashboard } from '@/components/component/org-dashboard'
import { orgsTable } from '@/db/schema'
import { db } from '@/db'
import { eq } from 'drizzle-orm'

type Props = {}

const OrgPage = async ({
    params
}: {
    params: {
        orgId: string
    }
}) => {
    const orgId = Number(params.orgId);
    const orgDetails = await db.select().from(orgsTable).where(eq(orgsTable.id, orgId));
    console.log(orgDetails)
  return (
    
        <Suspense fallback={<div>Loading...</div>}>
        <OrgDashboard
        orgName={orgDetails[0].title}
        orgGithub={orgDetails[0].link}
        orgDescription={orgDetails[0].content}

        />
        </Suspense>
    
  )
}

export default OrgPage