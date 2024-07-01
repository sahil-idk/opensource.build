import { UserDashboard } from '@/components/component/user-dashboard'
import { RedirectToSignIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

type Props = {}

const UserPage = async  ({params}: {
    params: {
        user: string
    }
    
 
}) => {
    const user = await currentUser();
    console.log(user)
    if(params.user !== user?.fullName){
    return <div>This workspace does not exist</div>
    }

  return (

  
        <UserDashboard user={user} />
        
   
  )
}

export default UserPage