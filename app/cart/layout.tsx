import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cart'
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return children
}
