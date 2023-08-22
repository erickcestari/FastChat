import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MuiTheme from './theme'
import { Roboto_Slab } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const roboto = Roboto_Slab({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-slab'
})

export const metadata: Metadata = {
  title: 'EasyChat',
  description: 'A simple chat app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <MuiTheme>
        <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-slate-800 to-slate-700 p-24">
          {children}
        </main>
        </MuiTheme>
      </body>
    </html>
  )
}
