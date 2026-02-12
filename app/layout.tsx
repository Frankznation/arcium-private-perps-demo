import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arcium Private Perps - Interactive Demo',
  description: 'Private Perpetuals Trading Platform using Arcium on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
