import { Libre_Baskerville, Lato } from 'next/font/google'
import './globals.css'
import { AnalyticsScript } from '@/components/AnalyticsScript'
import { defaultMetadata } from '@/lib/constants'

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-libre-baskerville',
})

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato',
})

export const metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <AnalyticsScript />
      <body
        className={`${libreBaskerville.variable} ${lato.variable} flex min-h-screen flex-col bg-gradient-to-r from-fuchsia-200 to-cyan-100 font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
