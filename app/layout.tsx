import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Instagram Auto DM Agent',
  description: 'Automated Instagram DM message management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
