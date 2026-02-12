# Arcium Private Perps - Interactive Demo

Standalone Next.js demo application for Arcium Private Perps platform with Solana wallet connection and Anchor program.

## Prerequisites

- **Rust** (latest stable)
- **Solana CLI** v2.3.0+
- **Anchor** 0.32.1
- **Arcium CLI** (for private computation)
- **Node.js** 18+

See [SETUP_SOLANA.md](./SETUP_SOLANA.md) for detailed installation instructions.

## Quick Start

### Frontend Only (Demo Mode)

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Full Stack (With Solana Program)

```bash
# Install Rust dependencies
anchor build

# Start local Solana validator
solana-test-validator

# In another terminal, deploy program
anchor deploy

# Start frontend
npm install
npm run dev
```

## Features

- ✅ **Solana Program** - Anchor 0.32.1 program for private perpetuals
- ✅ **Solana Wallet Connection** - Connect with Phantom, Solflare, or other Solana wallets
- ✅ Interactive position opening
- ✅ Privacy encryption simulation
- ✅ PnL calculator
- ✅ Liquidation risk checker
- ✅ On-chain position storage (encrypted data)
- ✅ Hash verification for data integrity

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
