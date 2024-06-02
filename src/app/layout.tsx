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
        className={`${libreBaskerville.variable} ${lato.variable} bg-gradient-to-r from-fuchsia-200 to-cyan-100 font-sans flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
