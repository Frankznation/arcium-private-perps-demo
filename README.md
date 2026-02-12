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

### Quick Deploy to Vercel

**Option 1: Via GitHub (Recommended)**
1. Push to GitHub: `git push origin main`
2. Go to https://vercel.com
3. Click "Add New Project"
4. Import `arcium-private-perps-demo` repository
5. Click "Deploy" (no configuration needed!)

**Option 2: Via Vercel CLI**
```bash
npm install -g vercel
cd /Users/frankchinonso/arcium-private-perps-standalone
vercel --prod
```

**Option 3: Use Deploy Script**
```bash
./QUICK_DEPLOY.sh
```

Your app will be live at: `https://arcium-private-perps-demo.vercel.app`

### Deploy to Netlify
1. Push to GitHub
2. Go to https://netlify.com
3. Import repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Deploy!

## Repository

Source code: https://github.com/Frankznation/arcium-private-perps-demo
