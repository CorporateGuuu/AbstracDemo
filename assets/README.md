# Assets Directory

## Logo Placement

**White Arrow Logo:**
- **Filename:** `logo-white.png`
- **Location:** `MyFirstApp/assets/logo-white.png`
- **Usage:** Header logo in achievements screen
- **Dimensions:** Recommended 120x120px (scales to 30x30 in UI)
- **Color:** White arrow design on transparent background

## Adding Your Logo

1. Save your logo design as a PNG file
2. Name it `logo-white.png`
3. Place it in this `assets/` directory
4. The app will automatically load it in the achievements header

The logo is already configured in `app/(app)/achievements.tsx`:

```tsx
<Image
  source={require('../../assets/logo-white.png')}
  style={styles.logo}
  resizeMode="contain"
/>
