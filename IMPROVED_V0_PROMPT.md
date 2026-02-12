# Enhanced V0.dev Prompt - Production Quality

Use this enhanced prompt for the best results:

---

Build a production-ready, beautiful DeFi application for "Arcium Private Perps" - a private perpetuals trading platform on Solana. This should look like a top-tier Solana DeFi app (think Jupiter, Orca, or Drift quality).

## Design System

**Theme: Dark Mode with Purple Accents**
- Background: Deep gradient from #0f0c29 → #302b63 → #24243e
- Cards: Dark glassmorphism (#1a1a2e with 80% opacity, backdrop blur)
- Primary: Purple gradient (#667eea → #764ba2)
- Accent: Bright purple (#a855f7)
- Text: White (#ffffff) for headings, #e5e7eb for body
- Success: Emerald (#10b981)
- Warning: Amber (#f59e0b)
- Danger: Red (#ef4444)

**Typography:**
- Headings: Inter or Poppins, bold, large
- Body: Inter, regular
- Code/Data: JetBrains Mono or Fira Code

**Spacing:**
- Generous padding (24px+ on mobile, 48px+ on desktop)
- Consistent 8px grid system
- Card spacing: 16px gap

## Component Structure

### 1. Navigation Bar (Fixed Top)
- Logo/Brand: "🔒 Arcium Private Perps" (left)
- Wallet button (right) - styled like Phantom/Solflare buttons
- Smooth scroll behavior
- Glassmorphism effect

### 2. Hero Section (Full Viewport Height)
- Centered content
- Animated gradient background
- Large title with gradient text effect
- Subtitle with opacity animation
- Feature pills/badges in a row
- Connected wallet info card (if connected)
- Smooth fade-in animation

### 3. Main Content Container
- Max width: 1200px
- Centered
- Grid layout (1 column mobile, 2 columns desktop)
- Card-based design

### 4. Open Position Card
**Design:**
- Glassmorphism card with purple border glow
- Icon header (🔒 lock icon)
- Form fields with floating labels
- Input styling: dark background, purple focus ring
- Dropdown with custom styling
- Primary button: Purple gradient, hover scale effect
- Disabled state: Gray, cursor not-allowed

**Functionality:**
- Real-time validation
- Error messages below fields
- Success animation on submit
- Loading state during "encryption"

**Fields:**
- Position Size: Number input, SOL suffix, min 0.1, step 0.1
- Direction: Custom styled dropdown (Long/Short with icons)
- Leverage: Slider or number input (1-100x)
- Entry Price: Number input, USD prefix, 2 decimals

### 5. Position Display Card
**When position opened:**
- Success animation (checkmark icon)
- Encrypted data preview (code block style)
- Two-column layout:
  - Left: "What's Private" (red/gold theme)
  - Right: "What's Public" (green/blue theme)
- Copy-to-clipboard buttons
- Privacy shield icons

### 6. Position Actions Card
- Two large action buttons side-by-side
- Icon + text design
- Hover effects: scale + glow
- Results displayed below in expandable sections

**PnL Display:**
- Large number display
- Color-coded (green profit, red loss)
- Percentage change
- Chart visualization (optional, simple sparkline)
- Privacy indicators

**Liquidation Display:**
- Health ratio gauge/circle progress
- Color-coded status
- Warning messages if at risk
- Privacy explanation

### 7. Info Section
- Accordion-style expandable sections
- Icons for each privacy feature
- Clean, readable typography
- Links to documentation

### 8. Footer
- Links to GitHub, Docs, Twitter
- Copyright notice
- Small, unobtrusive

## Interactions & Animations

**Micro-interactions:**
- Button hover: Scale 1.02, shadow increase
- Input focus: Border glow, scale 1.01
- Card hover: Slight lift (translateY -4px)
- Loading: Skeleton screens or spinners
- Success: Checkmark animation, confetti (optional)

**Page Load:**
- Staggered fade-in for cards
- Smooth scroll animations
- Gradient animation in background

**Form Interactions:**
- Real-time validation feedback
- Error shake animation
- Success checkmark
- Field-by-field reveal animation

## Responsive Breakpoints

- Mobile: < 640px (single column, stacked)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3 columns, full features)

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Color contrast WCAG AA compliant

## Performance

- Lazy load animations
- Optimized images/icons
- Code splitting
- Smooth 60fps animations

## Code Quality Standards

- TypeScript with strict types
- Component composition
- Reusable UI components
- Custom hooks for logic
- Error boundaries
- Loading states everywhere
- Proper error handling

## Example Component Structure

```tsx
<Layout>
  <Navbar>
    <Logo />
    <WalletButton />
  </Navbar>
  
  <Hero>
    <Title />
    <Subtitle />
    <Badges />
    <WalletStatus />
  </Hero>
  
  <Container>
    <OpenPositionCard>
      <Form />
    </OpenPositionCard>
    
    <PositionDisplayCard condition={hasPosition} />
    
    <ActionsCard condition={hasPosition}>
      <PnLButton />
      <LiquidationButton />
    </ActionsCard>
    
    <InfoSection />
  </Container>
  
  <Footer />
</Layout>
```

## Specific UI Details

**Wallet Button:**
- When disconnected: "Connect Wallet" with wallet icon
- When connected: Wallet address (truncated) + disconnect option
- Dropdown menu for wallet selection
- Connection status indicator

**Form Inputs:**
- Floating labels that move up on focus
- Helper text below inputs
- Error states with red border
- Success states with green checkmark
- Icons inside inputs (SOL icon, USD icon)

**Buttons:**
- Primary: Purple gradient, white text, rounded-lg
- Secondary: Transparent with border, purple text
- Disabled: Gray, reduced opacity
- Loading: Spinner inside button

**Cards:**
- Rounded corners (rounded-2xl)
- Shadow: 0 20px 25px -5px rgba(0,0,0,0.3)
- Border: 1px solid rgba(255,255,255,0.1)
- Hover: Border glow effect

**Data Display:**
- Code blocks: Dark background (#0d1117), monospace font
- Numbers: Large, bold, color-coded
- Percentages: With up/down arrows
- Timestamps: Relative time (e.g., "2 minutes ago")

Make this look absolutely stunning - like a $10M+ funded DeFi project. Every detail matters. The user should feel like they're using a premium, professional product.

---

**End of Enhanced Prompt**
