"use server";

import { db } from "@/db";
import { orgsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteOrg = async (formData: any) => {
  try {
    const orgId = formData.get("orgId");

    if (!orgId) {
      throw new Error("Organization ID is required.");
    }

    await db.delete(orgsTable).where(eq(orgsTable.id, orgId));
    revalidatePath("/orgs");
  } catch (error) {
    console.error("Error deleting organization:", error);
    // Optionally, you can throw an error to propagate it up or handle it as needed.
    throw new Error("Failed to delete organization.");
  }
};
