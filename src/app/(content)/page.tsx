import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Landing page</h1>
        <p className="text-xl">Welcome to the landing page</p>
      </div>
      <Button><Link href={`/${user?.fullName}`}>Go to dashboard</Link></Button>

    </main>
  );
}
