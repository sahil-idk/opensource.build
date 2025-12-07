import "../globals.css";
import { ThemeProvider } from "@/components/component/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { requireAuth } from "@/lib/auth-middleware";

export const metadata = {
  title: "Dashboard - opensource.build",
  description: "Track your open source contributions and compete on the leaderboard",
};

// Force dynamic rendering for auth checks
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require authentication for dashboard routes
  await requireAuth();

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
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
