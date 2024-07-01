"use server"
import { redirect } from "next/navigation";
import { db } from "@/db";
import { orgsTable } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
export const addOrg = async (formData:any) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('You must be signed in to add an item to your cart');
  }
    const title = formData.get('title');
    const content = formData.get('content');
    const link = formData.get('link').replace(/\s+/g, '');
    const Post = {
      title,
      content,
      link,
      userId: userId ?? 'default_id'
    }
    console.log(Post)
    await db.insert(orgsTable).values(Post);
    console.log('post inserted successfully.');
    redirect('/orgs')
  }