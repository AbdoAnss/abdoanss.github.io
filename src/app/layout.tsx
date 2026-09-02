import '@/app/global.css'

import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Footer } from '@/components/layout/footer/Footer'
import { Header } from '@/components/layout/header/Header'
import { TooltipProvider } from '@/components/ui/Tooltip'
import siteMetadata from '@/data/metadata.json'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://abdoanss.github.io'),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: `${siteMetadata.title} — ${siteMetadata.tagline}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: 'https://abdoanss.github.io',
    siteName: siteMetadata.title,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
}

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang="en" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-background font-base text-base text-muted-foreground antialiased selection:bg-primary/20 selection:text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <TooltipProvider>
            <Header />
            <main className="flex-1 pt-8 pb-14 sm:pt-12 sm:pb-20">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
