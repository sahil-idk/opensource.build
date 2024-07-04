import { UserDashboard } from '@/components/component/user-dashboard'
import { RedirectToSignIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import React, { Suspense } from 'react'

type Props = {}

const UserPage = async  ({params}: {
    params: {
        user: string
    }
    
 
}) => {
    const user = await currentUser();
   
 
      
  return (

        <Suspense fallback={<div>Loading...</div>}>
        <UserDashboard user={user} />
        </Suspense>
        
   
  )
}

export default UserPage