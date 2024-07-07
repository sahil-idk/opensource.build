"use server";

import { db } from "@/db";
import { issuesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteIssue = async (issueId:string) => {
//   const issueId = formData.get("issueId");
  console.log({ issueId });
  await db.delete(issuesTable).where(eq(issuesTable.id, issueId));
  console.log("Deleted");
  revalidatePath("/dashboard/issues");
};
