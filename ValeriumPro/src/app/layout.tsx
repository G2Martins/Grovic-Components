import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { Providers } from "@/components/providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans-var" })

export const metadata: Metadata = {
  title: {
    default: "ValeriumPro",
    template: "%s | ValeriumPro",
  },
  description: "Premium white-label portal for businesses.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
