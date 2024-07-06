import { OrgList } from "@/components/component/org-list";
import OrgTable from "@/components/tables/OrgTable";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db";
import { orgsTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import React from "react";

const OrgListItem = async () => {
  const user = await currentUser();
  const orgs = await db
    .select()
    .from(orgsTable)
    .where(eq(orgsTable.userId, user?.id ?? "default_id"));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OrgName</TableHead>
            <TableHead>Org Github</TableHead>
            <TableHead>Org description</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>

        {orgs.map((org) => (
          <OrgTable
            key={org.id}
            orgId={org.id}
            orgName={org.title}
            orgGithub={org.link}
            orgDescription={org.content}
          />
        ))}
      </Table>
    </div>
  );
};
const OrgsPage = async () => {
  const user = await currentUser();
  return (
    <div>
      <OrgList OrgListItem={OrgListItem} username={user?.fullName!} />
    </div>
  );
};

export default OrgsPage;
