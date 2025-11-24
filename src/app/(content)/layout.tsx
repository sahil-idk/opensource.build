import type { Metadata } from "next";
import "../globals.css";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/component/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { getCurrentUserFromSession } from "@/lib/auth-middleware";

export const metadata: Metadata = {
  title: "opensource.build - Codeforces for Open Source",
  description: "The ultimate showdown for open-source devs! Track issues, compete on leaderboards, and show off your contributions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUserFromSession();
  if (user) {
    redirect(`/dashboard`);
  }

  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
