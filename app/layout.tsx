import type { Metadata } from 'next'
import { WalletProviders } from './providers'
import './globals.css'

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
      <body>
        <WalletProviders>{children}</WalletProviders>
      </body>
    </html>
  )
}
