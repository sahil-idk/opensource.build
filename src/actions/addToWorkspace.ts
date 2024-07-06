"use server";

import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/db";
import { issuesTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export const addToWorkspace = async (formData: any) => {
  const id = uuidv4();
  const number = formData.get("number");
  const title = formData.get("title");
  const state = formData.get("state");

  const issueLink = formData.get("issueLink");

  console.log({
    id,
    number,
    title,
    state,
    issueLink,
  });

  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be signed in to add an item to your cart");
  }

  const Issue = {
    id,
    number,
    title,
    state,
    issueLink,
    userId: userId ?? "default_id",
  };

  await db.insert(issuesTable).values(Issue);
  redirect("/orgs");
};
