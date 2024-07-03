"use server"
import { redirect } from "next/navigation";
import { db } from "@/db";
import { orgsTable } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
export const addOrg = async ({ title, content, link }: { title: string, content: string, link: string }) => {
  console.log({ title, content, link })
  const { userId } = auth();
  if (!userId) {
    throw new Error('You must be signed in to add an item to your orgs ');
  }
    
    const Post = {
      title,
      content,
      link,
      userId: userId ?? 'default_id'
    }
    console.log(Post)
    await db.insert(orgsTable).values(Post);
    console.log('post inserted successfully.');
    // redirect('/orgs')
    revalidatePath('/orgs')
  }