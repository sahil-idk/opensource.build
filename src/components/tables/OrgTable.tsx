import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from 'next/link'

  
type Props = {}

const OrgTable = (
    {   
        orgId,
        orgName,
        orgGithub,
        orgDescription
    }: {
        orgId: number,
        orgName: string,
        orgGithub: string,
        orgDescription: string
    }) => {
  return (
  
    
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">
      <Link href={`/orgs/${orgId}`}>
        {orgName}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`https://github.com/${orgGithub}`}>
        {orgGithub}
        </Link>
        
        </TableCell>
      <TableCell>{orgDescription}</TableCell>
      {/* <TableCell className="text-right">$250.00</TableCell> */}
    </TableRow>
  </TableBody>


  )
}

export default OrgTable