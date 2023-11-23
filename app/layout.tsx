import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { StoreProvider } from '@/contexts/store'
import { inter } from '@/components/fonts'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import Container from '@/components/container'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: {
    template: '%s | Snapshop',
    default: 'Home | Snapshop'
  },
  description: 'Snapshop - Your Ultimate E-commerce Destination',
  keywords:
    'Snapshop, e-commerce, online shopping, fashion, electronics, clothing'
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={cn('antialiased', inter.className)}>
        <ThemeProvider
          disableTransitionOnChange
          attribute='class'
          defaultTheme='system'
          enableSystem
        >
          <StoreProvider>
            <Container>
              <Header />
              <main className='pt-32 md:pt-40 pb-10'>{children}</main>
            </Container>
            <Toaster />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
