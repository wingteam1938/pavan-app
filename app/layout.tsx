import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/app/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WebDev Pro - We Build Digital Excellence',
  description: 'Professional web development services - responsive websites, e-commerce, and custom web applications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0D1117] text-[#E6EDF3]`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
