"use server";

import { db } from "@/db";
import { issuesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function fetchIssues(userId: string) {
  //   const { state, assignedToMe } = filters;
  //
  let query = db
    .select()
    .from(issuesTable)
    .where(eq(issuesTable.userId, userId));

  return await query;
}
