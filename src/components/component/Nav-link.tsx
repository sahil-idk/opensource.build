import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
type Props = {}

const NavLink = ({href,children}:{
    href:string,
    children:React.ReactNode
}) => {
    const path = usePathname();
    // console.log(`Current path: ${path}, href: ${href}`);

    const isActive = path === href;
  
  return (
    <Link 
    href={href}
    className={isActive ? 'flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-accent' : 'flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8 text-muted-foreground'}
    >
        {children}
    </Link>
  )
}

export default NavLink