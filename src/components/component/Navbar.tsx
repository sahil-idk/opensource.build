import { useAuth } from '@clerk/clerk-react';
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import { ModeToggle } from "@/components/component/ModeToggle"
import { cn } from '@/lib/utils';


export default function Navbar() {

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Link href="#" className="text-2xl  mr-5" prefetch={false}>
    
           <h1 className='bg-gradient-to-br from-white  to-slate-400 inline-block text-transparent bg-clip-text'>opensource.build</h1>
           
      </Link>

    
   
    
      <div className="ml-auto flex gap-6 items-center">
        {/* <HeaderActions/> */}
        <ModeToggle/>

      </div>
    </header>
  )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}