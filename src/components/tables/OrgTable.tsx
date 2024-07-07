import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { deleteOrg } from "@/actions/deleteOrg";
import { GITHUB_BASE_URL } from "@/lib/env";

type OrgTableProps = {
  orgId: number;
  orgName: string;
  orgGithub: string;
  orgDescription: string;
};

const OrgTable = ({
  orgId,
  orgName,
  orgGithub,
  orgDescription,
}: OrgTableProps) => {
  return (
    <TableBody>
      <TableRow className=" ">
        <TableCell className="font-medium hover:text-orange-500">
          <Link href={`/orgs/${orgId}`}>{orgName}</Link>
        </TableCell>
        <TableCell>
          <Link href={`${GITHUB_BASE_URL}${orgGithub}`}>{orgGithub}</Link>
        </TableCell>
        <TableCell>{orgDescription}</TableCell>
        <TableCell>
          <form action={deleteOrg}>
            <input type="text" name="orgId" value={orgId} hidden />
            <Button
              type="submit"
              variant="outline"
              className="hover:bg-orange-600"
            >
              Remove Org
            </Button>
          </form>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default OrgTable;
