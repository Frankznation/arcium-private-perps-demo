# Deploy Now - Quick Guide

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Step 1: Push to GitHub
```bash
cd /Users/frankchinonso/arcium-private-perps-standalone
git add -A
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import from GitHub: `arcium-private-perps-demo`
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./` (root)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. Click "Deploy"
6. Your app will be live at: `https://arcium-private-perps-demo.vercel.app`

### Step 3: Update Environment Variables (Optional)
In Vercel dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_SOLANA_NETWORK=devnet` (or mainnet-beta)

## Option 2: Deploy to Netlify

1. Push to GitHub (same as above)
2. Go to https://netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select `arcium-private-perps-demo`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

## Option 3: Build and Test Locally First

```bash
cd /Users/frankchinonso/arcium-private-perps-standalone

# Install dependencies
npm install

# Build the project
npm run build

# Start production server
npm start

# Or run dev server
npm run dev
```

Then open http://localhost:3000

## What's Included

✅ Next.js app with wallet connection
✅ Solana wallet adapter (Phantom, Solflare)
✅ Interactive position opening
✅ PnL calculator
✅ Liquidation risk checker
✅ Privacy encryption simulation
✅ Responsive design
✅ Production-ready build

## After Deployment

1. Test wallet connection
2. Open a test position
3. Check PnL
4. Check liquidation risk
5. Share the demo link!

## Troubleshooting

**Build fails:**
- Make sure Node.js 18+ is installed
- Run `npm install` again
- Check for TypeScript errors

**Wallet not connecting:**
- Make sure you're using HTTPS (Vercel provides this)
- Check browser console for errors
- Try different wallet (Phantom vs Solflare)

**404 errors:**
- Make sure you deployed the correct branch
- Check Vercel build logs
- Verify `vercel.json` is correct
