"use server";

import { db } from "@/db";
import { orgsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteOrg = async (formData: any) => {
  const orgId = formData.get("orgId");
  await db.delete(orgsTable).where(eq(orgsTable.id, orgId));
  revalidatePath("/orgs");
};
