import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ApolloWrapper } from '@/components/ApolloWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Employee Directory',
  description: 'Employee Directory Application with GraphQL and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}