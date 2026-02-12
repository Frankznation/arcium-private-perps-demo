# Arcium Private Perps - Interactive Demo

Standalone Next.js demo application for Arcium Private Perps platform with Solana wallet connection.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Features

- ✅ **Solana Wallet Connection** - Connect with Phantom, Solflare, or other Solana wallets
- ✅ Interactive position opening
- ✅ Privacy encryption simulation
- ✅ PnL calculator
- ✅ Liquidation risk checker
- ✅ No backend needed
- ✅ No environment variables needed

## Wallet Connection

The app includes full Solana wallet adapter integration:
- **Phantom Wallet** - Most popular Solana wallet
- **Solflare Wallet** - Alternative Solana wallet
- **Auto-connect** - Automatically reconnects on page reload
- **Wallet status** - Shows connected wallet address

Click the "Select Wallet" button in the top-right corner to connect.

## Deploy

### Vercel
```bash
vercel
```

The app works as a static export, so no special configuration needed.

### Netlify
Connect GitHub repository and deploy.

## Repository

Source code: https://github.com/Frankznation/arcium-private-perps-demo
