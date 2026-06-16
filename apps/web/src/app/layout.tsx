import type { Metadata } from "next"

import "@workspace/ui/globals.css"

export const metadata: Metadata = {
  title: "Elevate",
  description: "Project ready!",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
