# Deployment Guide

## Quick Deploy to Vercel

1. **Create GitHub Repository:**
   ```bash
   cd /Users/frankchinonso/arcium-private-perps-standalone
   gh repo create arcium-private-perps-demo --public --source=. --remote=origin --push
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select `arcium-private-perps-demo` repository
   - **Important:** No environment variables needed!
   - Click "Deploy"
   - Your demo will be live at: `https://arcium-private-perps-demo.vercel.app`

## Local Development

```bash
cd /Users/frankchinonso/arcium-private-perps-standalone
npm install
npm run dev
```

Open http://localhost:3000

## Features

✅ **No backend required** - Pure frontend demo
✅ **No environment variables** - Works out of the box
✅ **Interactive UI** - Open positions, check PnL, liquidation risk
✅ **Privacy simulation** - Shows how Arcium encryption works

## Project Structure

```
arcium-private-perps-standalone/
├── app/
│   ├── page.tsx      # Main demo component
│   └── layout.tsx    # Next.js layout
├── package.json      # Dependencies
├── next.config.js    # Next.js config (static export)
└── README.md         # Project docs
```

This is a **completely standalone project** - no conflicts with crab-trader-agent!
