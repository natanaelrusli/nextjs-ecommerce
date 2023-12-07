import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'

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
      <body className={`${inter.className} flex min-h-full flex-1 flex-col`}>
        <Navbar />
        <main className="m-auto w-full min-w-[300px] max-w-7xl p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
