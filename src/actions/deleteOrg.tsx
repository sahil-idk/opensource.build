'use server'

import { db } from "@/db";
import { orgsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteOrg = async (formData:any) => {
    const orgId = formData.get("orgId")
   
 console.log(orgId,"delete this org")

 await db.delete(orgsTable).where(eq(orgsTable.id,orgId))
 console.log('org deleted successfully.');
 revalidatePath('/orgs');
 
}
