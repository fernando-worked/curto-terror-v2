import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const inter = Roboto({
  subsets: ['latin'],
  weight: '100'
})

export const metadata: Metadata = {
  title: 'Camadas do Medo',
  description: 'Uma horrível Antologia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
