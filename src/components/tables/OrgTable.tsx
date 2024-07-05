import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { deleteOrg } from "@/actions/deleteOrg";

type Props = {};

const OrgTable = ({
  orgId,
  orgName,
  orgGithub,
  orgDescription,
}: {
  orgId: number;
  orgName: string;
  orgGithub: string;
  orgDescription: string;
}) => {
  return (
    <TableBody>
      <TableRow className=" ">
        <TableCell className="font-medium hover:text-orange-500">
          <Link href={`/orgs/${orgId}`}>{orgName}</Link>
        </TableCell>
        <TableCell>
          <Link href={`https://github.com/${orgGithub}`}>{orgGithub}</Link>
        </TableCell>
        <TableCell>{orgDescription}</TableCell>
        <TableCell>
          <form action={deleteOrg}>
            <input type="text" name="orgId" value={orgId} hidden />
          <Button type="submit" variant="outline" className="hover:bg-orange-600">
            Remove Org
          </Button>
          </form>
        </TableCell>
        {/* <TableCell className="text-right">$250.00</TableCell> */}
      </TableRow>
    </TableBody>
  );
};

export default OrgTable;
