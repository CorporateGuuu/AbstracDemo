# Frames Assets

This directory should contain your frame PNG/SVG files:

**Expected Frame Files:**
- `gold.png` - Golden frame design
- `silver.png` - Silver frame alternative
- `fire.svg` - Fire-themed frame (SVG format)
- `red.png` - Red flame frame
- `crystal.png` - Crystal/clear frame
- `diamond.svg` - Diamond/luxury frame

**Frame Specifications:**
- PNG: Static frame images
- SVG: Vector frames for scaling
- Size: 300x300px recommended (scales to message size)
- Transparent background
- Aspect ratio: Square frames (1:1)

**Usage:**
```tsx
<Image
  source={require('./frames/gold.png')}
  style={{ width: 100, height: 100 }}
/>
```

**Note:** These frame files would typically be:
- Downloaded from your design team
- Generated programmatically
- Purchased from frame marketplaces
- Created using vector tools like Figma

For now, add your actual frame files when ready. The code is prepared to load them automatically.
