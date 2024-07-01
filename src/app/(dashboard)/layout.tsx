import { ClerkProvider } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import '../globals.css'
import { redirect } from "next/navigation"
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  auth().protect()


  return (
    <ClerkProvider>
    <html lang="en">
      
      <body>{children}</body>
    </html>
    </ClerkProvider>
  )
}
