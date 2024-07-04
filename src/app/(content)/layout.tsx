import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/component/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codeforces.build",
  description: "Codeforces for Open source devs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  if(user){
    redirect(`/dashboard`)
  }

  return (
    <ClerkProvider>
    
    <html lang="en">
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
       
        <main>
          {children}
        </main>
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
  );
}
