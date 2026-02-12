# 🎮 Demo Instructions - Arcium Private Perps

## For Users Testing the App

### Step 1: Access the App
Visit: `https://v0-arcium-private-perps-demo.vercel.app` (or your custom Vercel URL)

### Step 2: Connect Your Wallet
1. Click the **"Select Wallet"** button in the top-right corner
2. Choose **Phantom** or **Solflare**
3. Approve the connection in your wallet
4. ✅ You should see your wallet address displayed

### Step 3: Open a Position
Fill out the form:
- **Size**: `1.5` (or any number)
- **Direction**: `Long` or `Short`
- **Leverage**: `3` (or 2-10x)
- **Entry Price**: `100` (or any price)

Click **"Open Private Position"**

**What happens:**
- Your position data gets encrypted
- A position hash is generated
- You'll see a success message with encrypted data

### Step 4: Check Your PnL
1. Click **"📊 Check PnL"** button
2. View your profit/loss (simulated based on current market price)
3. See price change percentage

### Step 5: Check Liquidation Risk
1. Click **"⚠️ Check Liquidation Risk"** button
2. View your health ratio
3. See if you're at risk of liquidation

---

## 🔍 What to Test

### ✅ Functionality Tests
- [ ] Wallet connects successfully
- [ ] Can open a position
- [ ] Position shows encrypted data
- [ ] PnL calculation works
- [ ] Liquidation check works
- [ ] Multiple positions can be opened

### ✅ UI/UX Tests
- [ ] Page loads quickly
- [ ] Buttons are clickable
- [ ] Forms work correctly
- [ ] Mobile view looks good
- [ ] Animations work smoothly
- [ ] No console errors

### ✅ Privacy Features
- [ ] Position data is encrypted
- [ ] Hash is displayed for verification
- [ ] Only final results are revealed
- [ ] Position details remain private

---

## 🐛 Reporting Issues

If you find any issues:
1. Take a screenshot
2. Note what you were doing
3. Check browser console (F12) for errors
4. Report via GitHub Issues or contact the developer

---

## 💡 Tips

- Use **Solana Devnet** for testing (free SOL available)
- Try different position sizes and leverage
- Test both Long and Short positions
- Check the privacy badges to understand what's encrypted

---

## 🎯 What Makes This Special

1. **Privacy-Preserving**: Your position details are encrypted
2. **On-Chain**: Uses Solana blockchain for transparency
3. **Verifiable**: Position hashes allow verification without revealing data
4. **Real-Time**: PnL and liquidation checks update instantly

---

Enjoy testing! 🚀
