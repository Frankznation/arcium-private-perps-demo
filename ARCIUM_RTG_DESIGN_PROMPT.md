# V0.dev Prompt - Arcium RTG Design

Copy this entire prompt into V0.dev to match the exact Arcium RTG design:

---

Create a Next.js page that matches the exact design of Arcium RTG website (arcium.com/rtg).

## Exact Design Requirements

### Layout & Background
- **Dark background** - Deep black/dark gray (#000000 or #0a0a0a)
- **Full viewport** - Full screen height
- **Centered content** - Main content centered vertically and horizontally

### Header/Navigation (Top Right)
- **Portal Button**: `>> PORTAL` button in top right corner
- **Username/Account**: Display username (e.g., "neryn") next to portal button
- **Styling**: Small text, subtle, top-right alignment

### Main Content Area

**1. Label Badge (Top Center-Right)**
- Rectangular badge with purple background
- Text: `RETROACTIVE TOKEN GRANTS`
- Positioned above main title, slightly to the right
- Purple color: #8b5cf6 or similar

**2. Main Title**
- Large, bold title centered
- Text: `The <Encrypted> Future is built for you`
- The word "Encrypted" should be visually distinct:
  - Enclosed in angle brackets: `<Encrypted>`
  - Different styling (maybe italic, different color, or special font)
  - Could be purple/blue gradient or highlighted
- Font: Large, bold, white or light gray (#ffffff or #e5e7eb)
- Centered horizontally

**3. Subtitle**
- Smaller text below title
- Text: `Contribute to activities under consideration for RTGs and grow alongside Arcium and its`
- Color: Gray (#9ca3af or similar)
- Centered

**4. Call-to-Action Buttons**
- Two buttons below subtitle:
  - **Left Button**: `SEE OPPORTUNITIES >>`
    - Prominent, larger
    - Rectangular shape
    - Purple/blue gradient or solid purple
    - White text
    - Arrow `>>` at the end
  - **Right Button**: `READ ABOUT RTGS`
    - Less prominent, smaller
    - Possibly outlined or transparent
    - White or light text

**5. Visual Elements**
- **Purple-Blue Glowing Orbs**:
  - Two circular orbs on the left side, stacked vertically
  - Each orb enclosed in a subtle square outline
  - Glowing purple-blue gradient (#667eea, #8b5cf6, #a855f7)
  - One orb above the other
  - Partially visible orb on right side
  
- **Circuit Board Pattern**:
  - Horizontal textured line pattern at top
  - Resembles scan lines or circuit board
  - Subtle, not overwhelming
  - Dark gray/black with subtle lines

### Color Palette
- **Background**: #000000 or #0a0a0a (deep black)
- **Primary Purple**: #8b5cf6, #667eea
- **Accent Blue**: #3b82f6
- **Text Primary**: #ffffff (white)
- **Text Secondary**: #9ca3af (gray)
- **Orb Glow**: Purple-blue gradient (#667eea → #8b5cf6 → #a855f7)

### Typography
- **Title**: Large, bold, sans-serif (Inter, Poppins, or similar)
- **Subtitle**: Medium, regular weight
- **Buttons**: Medium, bold
- **Badge**: Small, uppercase

### Animations (Optional but Recommended)
- Subtle glow animation on orbs
- Fade-in animation for content
- Hover effects on buttons (scale, glow)
- Smooth transitions

### Responsive Design
- Mobile: Stack buttons vertically, adjust orb positions
- Tablet: Maintain layout, adjust spacing
- Desktop: Full layout as described

## Technical Requirements

- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Use `'use client'` directive
- Responsive design
- Dark theme only

## Component Structure

```tsx
<div className="min-h-screen bg-black">
  {/* Header */}
  <header className="absolute top-0 right-0 p-6">
    <button>> PORTAL</button>
    <span>neryn</span>
  </header>

  {/* Circuit board pattern */}
  <div className="circuit-pattern" />

  {/* Main content */}
  <main className="centered-content">
    {/* Purple badge */}
    <div className="purple-badge">RETROACTIVE TOKEN GRANTS</div>
    
    {/* Title */}
    <h1>The <span className="encrypted">&lt;Encrypted&gt;</span> Future is built for you</h1>
    
    {/* Subtitle */}
    <p>Contribute to activities under consideration for RTGs and grow alongside Arcium and its</p>
    
    {/* Buttons */}
    <div className="buttons">
      <button className="primary-btn">SEE OPPORTUNITIES >></button>
      <button className="secondary-btn">READ ABOUT RTGS</button>
    </div>
  </main>

  {/* Glowing orbs */}
  <div className="orbs">
    <div className="orb orb-1" />
    <div className="orb orb-2" />
  </div>
</div>
```

Make it look EXACTLY like the Arcium RTG website - dark, futuristic, with purple accents and glowing orbs.

---
