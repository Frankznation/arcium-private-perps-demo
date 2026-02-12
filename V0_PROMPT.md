# V0.dev Prompt for Arcium Private Perps Demo

Copy this entire prompt into V0.dev to generate a beautiful, fully functional website:

---

Create a modern, professional, and highly polished web application for "Arcium Private Perps" - a private perpetuals trading platform demo built on Solana with Arcium privacy-preserving computation.

## Design Requirements

**Visual Style:**
- Modern, sleek design with a dark theme (dark purple/indigo gradient background)
- Clean, professional UI with smooth animations and transitions
- Glassmorphism effects for cards
- Purple/indigo color scheme (#6366f1, #8b5cf6, #a855f7)
- Professional typography with clear hierarchy
- Responsive design that works perfectly on mobile, tablet, and desktop
- Smooth hover effects and micro-interactions

**Layout:**
- Full-screen hero section with gradient background
- Wallet connection button prominently displayed in top-right corner
- Main content area with cards/sections
- Footer with links and information

## Core Features

### 1. Wallet Connection (Top Priority)
- Integrate Solana wallet adapter (@solana/wallet-adapter-react)
- WalletMultiButton in top-right corner with custom styling
- Show connected wallet address when connected
- Display connection status badge
- Auto-connect on page load
- Support Phantom and Solflare wallets

### 2. Hero Section
- Large, bold title: "🔒 Arcium Private Perps"
- Subtitle: "Private Perpetuals Trading Platform"
- Tagline: "Built with Arcium Privacy-Preserving Computation on Solana"
- Feature badges: "✅ Live Demo", "🔐 Privacy Enabled", "⚡ Interactive", "🔗 Wallet Connected" (when connected)
- Connected wallet address display (if connected)

### 3. Open Private Position Card
- Beautiful card with purple border accent
- Form with fields:
  - Position Size (SOL) - number input with validation
  - Direction - dropdown (Long/Short)
  - Leverage - number input (1-100)
  - Entry Price (USD) - number input with decimals
- "🔒 Open Private Position" button (disabled if wallet not connected)
- Show wallet connection prompt if not connected
- Real-time form validation
- Smooth form animations

### 4. Position Status Display
After opening a position, show:
- Success message with encrypted data preview
- Position hash (first 16 chars)
- What's Private section (position size, direction, leverage, entry price)
- What's Public section (hash, status, timestamp)
- Privacy protection indicators

### 5. Check Position Status Section
- Two action buttons:
  - "📊 Check PnL" - Calculate profit/loss
  - "⚠️ Check Liquidation Risk" - Check health ratio
- Results displayed in dark code-style boxes
- Color-coded results (green for profit, red for loss)
- Clear privacy indicators showing what's hidden vs revealed

### 6. Privacy Information Section
- Yellow info box explaining how Arcium provides privacy
- Bullet points about private positions, orders, liquidation checks
- Clear, educational content

### 7. Repository Link Section
- Link to GitHub repository
- Clean, centered design

## Technical Requirements

**Framework:**
- Next.js 14+ with App Router
- React 18+
- TypeScript
- Tailwind CSS for styling

**Dependencies:**
- @solana/wallet-adapter-react
- @solana/wallet-adapter-react-ui
- @solana/wallet-adapter-wallets (Phantom, Solflare)
- @solana/web3.js

**Functionality:**
- Wallet connection state management
- Form state management with React hooks
- Position data encryption simulation (btoa for demo)
- Hash generation for position verification
- PnL calculation logic (long/short with leverage)
- Liquidation risk calculation
- All calculations should be realistic and properly formatted

**Code Quality:**
- Clean, well-structured components
- Proper TypeScript types
- Error handling
- Loading states
- Responsive design
- Accessible (ARIA labels, keyboard navigation)

## User Experience Flow

1. User lands on page → sees hero section and wallet connection button
2. User clicks "Select Wallet" → wallet modal appears
3. User connects wallet → wallet address appears, badges update
4. User fills position form → real-time validation
5. User clicks "Open Private Position" → position created, encrypted data shown
6. User clicks "Check PnL" → profit/loss calculated and displayed
7. User clicks "Check Liquidation Risk" → health ratio calculated

## Visual Details

- Smooth transitions between states
- Loading spinners for async operations
- Success/error toast notifications (optional)
- Hover effects on all interactive elements
- Focus states for accessibility
- Mobile-friendly touch targets
- Professional spacing and padding

## Example Data Structure

```typescript
Position {
  wallet: string (Solana address)
  size: number (SOL)
  direction: 'long' | 'short'
  leverage: number
  entryPrice: number (USD)
  encryptedData: string (base64)
  positionHash: string (hex)
  openedAt: Date
}
```

## Color Palette

- Primary Purple: #6366f1
- Secondary Purple: #8b5cf6
- Accent Purple: #a855f7
- Dark Background: #1e1b4b (gradient to #312e81)
- Card Background: white with subtle shadow
- Success Green: #10b981
- Warning Yellow: #f59e0b
- Error Red: #ef4444
- Text Dark: #1f2937
- Text Light: #6b7280

## Animation Requirements

- Fade-in animations for cards
- Smooth button hover effects
- Form field focus animations
- Result display slide-in effects
- Wallet connection status transitions

Make it look like a production-ready, professional DeFi application that you'd see from top Solana projects. The design should inspire trust and demonstrate the power of privacy-preserving computation.

---

**End of Prompt**
