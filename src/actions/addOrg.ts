"use server";

import { db } from "@/db";
import { orgsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const addOrg = async ({
  title,
  content,
  link,
}: {
  title: string;
  content: string;
  link: string;
}) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be signed in to add an item to your orgs ");
  }

  const Post = {
    title,
    content,
    link,
    userId: userId ?? "default_id",
  };
  await db.insert(orgsTable).values(Post);
  revalidatePath("/orgs");
};
