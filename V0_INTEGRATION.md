# Using V0.dev to Generate UI

## Quick Steps

1. **Go to V0.dev**: https://v0.dev
2. **Copy the prompt below** (from QUICK_V0_PROMPT.txt or IMPROVED_V0_PROMPT.md)
3. **Paste into V0.dev**
4. **Generate the component**
5. **Copy the generated code**
6. **Replace `app/page.tsx`** with the V0-generated code

## Option 1: Quick Prompt (Fast)

Copy this entire prompt:

```
Create a stunning, production-ready DeFi app for "Arcium Private Perps" - private perpetuals trading on Solana.

DESIGN: Dark theme with purple gradients (#667eea → #764ba2), glassmorphism cards, smooth animations. Think Jupiter/Orca quality.

FEATURES:
1. Top nav: Logo left, Solana wallet connection button right (Phantom/Solflare support)
2. Hero: Full-height section, animated gradient bg, title "🔒 Arcium Private Perps", subtitle, feature badges, connected wallet display
3. Open Position Card: Form with Position Size (SOL), Direction (Long/Short dropdown), Leverage (1-100x), Entry Price (USD). Purple gradient submit button. Disabled if wallet not connected.
4. Position Display: After opening, show encrypted data preview, position hash, "What's Private" vs "What's Public" sections
5. Actions Card: "Check PnL" and "Check Liquidation Risk" buttons. Results in dark code-style boxes with color coding
6. Info Section: Privacy explanation with icons

TECH: Next.js 14, React, TypeScript, Tailwind CSS, @solana/wallet-adapter-react

UX: Smooth transitions, hover effects, loading states, error handling, mobile responsive, accessible.

Make it look like a $10M+ funded Solana DeFi project. Premium quality, every pixel perfect.
```

## Option 2: Detailed Prompt (Better Results)

Use the full prompt from `IMPROVED_V0_PROMPT.md` - it has more details.

## After V0 Generates Code

### Step 1: Copy Generated Code
Copy the entire component code from V0.dev

### Step 2: Update app/page.tsx

Replace the entire `app/page.tsx` file with the V0-generated code, BUT:

**Important**: Keep these imports and wallet functionality:

```typescript
'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
```

### Step 3: Add Wallet Logic

Make sure the V0 component includes:
- `const { publicKey, connected } = useWallet();`
- `<WalletMultiButton />` in the UI
- Wallet connection check before opening positions
- Use `publicKey?.toBase58()` for wallet address

### Step 4: Add Position Logic

Ensure these functions exist:
- `handleOpenPosition` - encrypts and stores position
- `handleCheckPnL` - calculates profit/loss
- `handleCheckLiquidation` - checks health ratio
- `encryptData` - simulates encryption
- `generateHash` - creates position hash

### Step 5: Test Locally

```bash
cd /Users/frankchinonso/arcium-private-perps-standalone
npm install
npm run dev
```

Open http://localhost:3000 and test:
- Wallet connection
- Position opening
- PnL calculation
- Liquidation check

### Step 6: Push and Deploy

```bash
git add app/page.tsx
git commit -m "Update UI with V0-generated component"
git push origin main
```

Then deploy to Vercel (auto-deploys from GitHub).

## V0 Component Requirements Checklist

Make sure V0 generates a component with:

- [ ] `'use client'` directive
- [ ] Wallet adapter imports
- [ ] `useWallet` hook
- [ ] `WalletMultiButton` component
- [ ] Position form with validation
- [ ] Encryption simulation
- [ ] PnL calculation logic
- [ ] Liquidation check logic
- [ ] Responsive design
- [ ] Dark theme with purple accents
- [ ] Smooth animations
- [ ] Error handling

## Tips for Better V0 Results

1. **Be specific** - Include exact colors, spacing, animations
2. **Mention Solana** - V0 knows Solana wallet patterns
3. **Request Tailwind** - V0 generates better Tailwind code
4. **Ask for TypeScript** - Better type safety
5. **Request accessibility** - ARIA labels, keyboard nav

## Example V0 Prompt Enhancement

Add this to your prompt for better results:

```
- Use shadcn/ui components if available
- Include loading states with skeleton loaders
- Add toast notifications for success/error
- Use framer-motion for animations
- Ensure WCAG AA accessibility compliance
- Mobile-first responsive design
- Include dark mode (already dark theme)
```

## Troubleshooting

**V0 code doesn't compile?**
- Check imports match your package.json
- Ensure 'use client' is at the top
- Verify wallet adapter imports are correct

**Wallet not working?**
- Make sure `WalletProviders` wraps the component in layout.tsx
- Check `providers.tsx` is correctly configured
- Verify wallet adapter CSS is imported

**Styling broken?**
- Ensure Tailwind is configured (tailwind.config.js exists)
- Check globals.css includes Tailwind directives
- Verify postcss.config.js is correct

## Next Steps After V0

1. Generate component in V0.dev
2. Copy code
3. Replace app/page.tsx
4. Test locally
5. Push to GitHub
6. Deploy to Vercel
7. Share your beautiful demo!
