import AssignedIssueTable from '@/components/component/AssignedIssueTable'
import React, { Suspense } from 'react'

type Props = {}

const AssignedIssuePage = (props: Props) => {
  return (
    <div className='p-10 flex flex-col gap-2'>
        <h1 className='text-3xl font-bold '>
            Assigned Issues
        </h1>

      
<Suspense fallback={<div>Loading...</div>}>
        <AssignedIssueTable/>
              </Suspense>


    </div>
  )
}

export default AssignedIssuePage