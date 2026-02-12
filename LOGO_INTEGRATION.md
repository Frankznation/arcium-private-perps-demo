# Logo Integration Guide

## Logo Added

The Arcium logo has been added to the site header (top-left corner).

## Logo File Location

- **Path**: `/public/arcium-logo.png`
- **Usage**: `<img src="/arcium-logo.png" alt="Arcium Logo" />`

## Current Implementation

The logo appears in the top-left of the header with:
- Purple background container (matches logo's background)
- Logo image inside
- "Arcium" text next to it (hidden on mobile)
- Wallet button on the right

## Logo Styling

The logo is wrapped in a container with:
- `w-10 h-10` - 40px × 40px size
- `rounded-lg` - Rounded corners
- `bg-purple-600` - Purple background (matches logo)
- `p-2` - Padding around logo
- Responsive: Text hidden on mobile (`hidden sm:block`)

## Making Logo Background Transparent (Optional)

If you want to remove the purple background and make it transparent:

### Option 1: Use Image Editor
1. Open the logo in an image editor (Photoshop, GIMP, etc.)
2. Remove/make purple background transparent
3. Save as PNG with transparency
4. Replace `/public/arcium-logo.png`

### Option 2: Use CSS (if logo has white "A" only)
If the logo is just the white "A" shape, you can:
- Remove the purple background container
- Use CSS filter or mix-blend-mode
- Or recreate the logo with SVG

### Option 3: Use Online Tool
- Use remove.bg or similar to make background transparent
- Download transparent PNG
- Replace the file

## Current Code

```tsx
<div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-lg bg-purple-600 p-2 flex items-center justify-center">
    <img 
      src="/arcium-logo.png" 
      alt="Arcium Logo" 
      className="w-full h-full object-contain"
    />
  </div>
  <span className="text-white font-bold text-xl hidden sm:block">Arcium</span>
</div>
```

## Customization Options

### Change Logo Size
```tsx
// Larger logo
<div className="w-12 h-12 ...">  // 48px
<div className="w-16 h-16 ...">  // 64px
```

### Change Logo Position
- Currently: Top-left
- To center: Change header to `justify-center`
- To right: Change to `justify-end`

### Remove Text
Remove the `<span>` element if you don't want "Arcium" text.

### Make Logo Clickable
```tsx
<a href="/" className="flex items-center gap-3">
  <img src="/arcium-logo.png" ... />
</a>
```

## Testing

1. Run `npm run dev`
2. Check logo appears in top-left
3. Verify it looks good on mobile (text should hide)
4. Check logo scales properly

## Notes

- Logo file must be in `/public/` folder
- Next.js serves files from `/public/` at root URL (`/arcium-logo.png`)
- Logo will work in production after deployment
