import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from '@/components/NavigationBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flowmazon',
  description: 'We make your wallet cry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body className={`${inter.className} min-h-full`}>
        <NavigationBar />
        <main className="m-auto min-w-[300px] max-w-7xl px-4 pt-4">
          {children}
        </main>
      </body>
    </html>
  )
}
