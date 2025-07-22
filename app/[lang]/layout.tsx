import type React from "react"
import "../globals.css" // Ensure your global CSS is imported
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

// Define supported locales for static generation
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }, { lang: "es" }, { lang: "fr" }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  return (
    <html lang={params.lang} className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
