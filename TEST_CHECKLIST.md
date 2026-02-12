# Testing Checklist

## ✅ Pre-Test Setup

1. **Install Dependencies**
   ```bash
   cd /Users/frankchinonso/arcium-private-perps-standalone
   npm install
   ```

2. **Start Dev Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   - Go to: http://localhost:3000

## 🧪 Test Checklist

### Visual Design Tests

- [ ] **Dark Background**: Page has black background (#000000)
- [ ] **Circuit Pattern**: Horizontal circuit board pattern visible at top
- [ ] **Purple Badge**: "RETROACTIVE TOKEN GRANTS" badge visible above title
- [ ] **Main Title**: "The <Encrypted> Future is built for you" displayed correctly
- [ ] **Encrypted Styling**: `<Encrypted>` has gradient/purple styling
- [ ] **Subtitle**: Gray subtitle text below title
- [ ] **Buttons**: 
  - "SEE OPPORTUNITIES >>" button (purple gradient)
  - "READ ABOUT RTGS" button (outlined)
- [ ] **Glowing Orbs**: Purple-blue orbs visible on left side
- [ ] **Right Orb**: Partial orb visible on right side
- [ ] **Wallet Button**: Top-right corner, styled like ">> PORTAL"

### Functionality Tests

- [ ] **Wallet Connection**:
  - Click wallet button
  - Select Phantom or Solflare
  - Wallet connects successfully
  - Wallet address displays (truncated)

- [ ] **Position Form** (appears after wallet connection):
  - Form fields visible
  - Position Size input works
  - Direction dropdown works (Long/Short)
  - Leverage input works
  - Entry Price input works
  - Submit button works

- [ ] **Open Position**:
  - Fill form and submit
  - Position opens successfully
  - Encrypted data displays
  - Position hash displays
  - Privacy indicator shows

- [ ] **Check PnL**:
  - Click "Check PnL" button
  - PnL calculates correctly
  - Profit shows in green
  - Loss shows in red
  - Percentage displays

- [ ] **Check Liquidation**:
  - Click "Check Liquidation Risk" button
  - Health ratio displays
  - Status shows (Healthy/At Risk)
  - Color coding correct (green/red)

### Responsive Tests

- [ ] **Mobile** (< 640px):
  - Layout stacks vertically
  - Buttons stack
  - Text readable
  - Orbs positioned correctly

- [ ] **Tablet** (640px - 1024px):
  - Layout adapts
  - Buttons side-by-side
  - Content readable

- [ ] **Desktop** (> 1024px):
  - Full layout displayed
  - All elements visible
  - Proper spacing

### Browser Compatibility

- [ ] **Chrome**: Works correctly
- [ ] **Firefox**: Works correctly
- [ ] **Safari**: Works correctly
- [ ] **Edge**: Works correctly

### Performance Tests

- [ ] **Page Load**: Loads quickly (< 3 seconds)
- [ ] **Animations**: Smooth, no jank
- [ ] **Wallet Connection**: Fast (< 2 seconds)
- [ ] **Form Submission**: Instant feedback
- [ ] **Calculations**: Fast (< 100ms)

## 🐛 Common Issues & Fixes

### Issue: Wallet not connecting
**Fix**: 
- Check browser console for errors
- Ensure HTTPS (Vercel provides this)
- Try different wallet (Phantom vs Solflare)

### Issue: Styles not loading
**Fix**:
- Check Tailwind CSS is configured
- Verify `globals.css` imports Tailwind
- Check `postcss.config.js` exists

### Issue: Build errors
**Fix**:
- Run `npm install` again
- Check Node.js version (18+)
- Clear `.next` folder: `rm -rf .next`

### Issue: Orbs not visible
**Fix**:
- Check z-index values
- Verify gradient colors
- Check opacity values

## 📝 Test Results Template

```
Date: ___________
Tester: ___________

Visual Design: ✅ / ❌
Functionality: ✅ / ❌
Responsive: ✅ / ❌
Performance: ✅ / ❌

Issues Found:
1. ___________
2. ___________

Notes:
___________
```

## 🚀 After Testing

1. **Fix any issues** found
2. **Commit changes**: `git add -A && git commit -m "Fix: [issue]"`
3. **Push to GitHub**: `git push origin main`
4. **Deploy to Vercel**: Auto-deploys from GitHub

## ✅ Success Criteria

- ✅ All visual elements match Arcium RTG design
- ✅ Wallet connection works
- ✅ Position opening works
- ✅ PnL calculation works
- ✅ Liquidation check works
- ✅ Responsive on all devices
- ✅ No console errors
- ✅ Fast performance

---

**Ready to test!** Run `npm install` then `npm run dev` and open http://localhost:3000
