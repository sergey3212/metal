# Website Extraction Checklist

Use this checklist to systematically extract brand identity elements from a website.

## 1. Colors

### CSS Custom Properties
- [ ] Search for `:root` or `[data-theme]` variables
- [ ] Extract all `--color-*` variables
- [ ] Note light/dark mode variants

### Color Values Found
- [ ] Primary brand color(s) - from CTAs, links, active states
- [ ] Secondary/accent colors - from highlights, badges, tags
- [ ] Neutral palette - all grays from text to backgrounds
- [ ] Semantic colors - success (green), warning (yellow/orange), error (red), info (blue)
- [ ] Background colors - page, card, overlay
- [ ] Border colors - subtle dividers, input borders
- [ ] Gradient definitions - linear/radial gradients

### Color Documentation
For each color, record:
- [ ] Name (descriptive: "Brand Blue", "Success Green")
- [ ] HEX value
- [ ] RGB value
- [ ] Usage context (where it's used)
- [ ] Contrast ratio against white/black (WCAG compliance)

### Tools & Techniques
```css
/* Look for patterns like: */
--primary: #3B82F6;
--color-brand: #8B5CF6;
--bg-surface: #FFFFFF;
--border-default: #E5E7EB;
```

## 2. Typography

### Font Families
- [ ] Extract all `font-family` declarations
- [ ] Identify primary typeface (headings)
- [ ] Identify secondary typeface (body)
- [ ] Note font loading method (Google Fonts, self-hosted, system)
- [ ] Document fallback stacks

### Font Sizes
- [ ] All heading sizes (H1-H6)
- [ ] Body text sizes (regular, large, small)
- [ ] Caption/label sizes
- [ ] Any special text styles (overline, quote, code)

### Font Weights
- [ ] All weights used (300, 400, 500, 600, 700)
- [ ] Weight mapping (which weight for which element)

### Line Heights
- [ ] Heading line heights (usually 1.1-1.3)
- [ ] Body line heights (usually 1.5-1.7)
- [ ] Any special cases

### Letter Spacing
- [ ] Tight letter spacing (headings, usually negative)
- [ ] Normal letter spacing (body)
- [ ] Wide letter spacing (uppercase labels, usually positive)

### Text Transforms
- [ ] Uppercase usage (labels, navigation)
- [ ] Capitalize usage (titles, names)
- [ ] Normal case usage

### Documentation Format
```
Element | Size | Weight | Line Height | Letter Spacing | Transform
H1      | 60px | 700    | 1.1         | -0.02em        | none
Body    | 16px | 400    | 1.6         | 0              | none
```

## 3. Spacing

### Spacing Scale
- [ ] Identify base unit (4px, 8px, etc.)
- [ ] Document all spacing values used
- [ ] Note if consistent scale or ad-hoc

### Common Spacing Values
- [ ] Section padding (top/bottom)
- [ ] Container margins (left/right)
- [ ] Between elements (gaps)
- [ ] Card/internal padding
- [ ] Grid gaps

### Documentation
Create a spacing scale table:
```
Token | Value | Usage
------|-------|------
xs    | 4px   | Tight gaps
sm    | 8px   | Small padding
md    | 16px  | Default padding
lg    | 24px  | Card padding
xl    | 32px  | Section spacing
2xl   | 48px  | Large gaps
3xl   | 64px  | Hero spacing
```

## 4. Layout

### Breakpoints
- [ ] Find `@media` queries
- [ ] Document all breakpoint values
- [ ] Map to device types (mobile, tablet, desktop)

### Container Widths
- [ ] Max-width of main content
- [ ] Sidebar width (if applicable)
- [ ] Grid column configuration

### Grid System
- [ ] Number of columns
- [ ] Gutter width
- [ ] Margin width

## 5. Components

### Buttons
- [ ] Variants (primary, secondary, ghost, danger)
- [ ] Sizes (sm, md, lg)
- [ ] Padding values
- [ ] Border radius
- [ ] Background colors
- [ ] Text colors
- [ ] Border styles
- [ ] Hover states
- [ ] Focus states
- [ ] Disabled states

### Cards
- [ ] Background color
- [ ] Border radius
- [ ] Padding
- [ ] Shadow values
- [ ] Hover effects
- [ ] Border styles

### Forms/Inputs
- [ ] Height
- [ ] Padding
- [ ] Border radius
- [ ] Border color (default)
- [ ] Border color (focus)
- [ ] Border color (error)
- [ ] Placeholder color
- [ ] Label styles
- [ ] Error message styles

### Navigation
- [ ] Height (top nav)
- [ ] Width (sidebar)
- [ ] Background color
- [ ] Active state styling
- [ ] Hover state styling

### Badges/Tags
- [ ] Sizes
- [ ] Colors (background, text)
- [ ] Border radius
- [ ] Padding

### Alerts/Notifications
- [ ] Variants (info, success, warning, error)
- [ ] Colors per variant
- [ ] Border styles
- [ ] Icons used

## 6. Icons

### Icon Library
- [ ] Identify library (Lucide, Heroicons, Material, Iconify, Feather, custom)
- [ ] Check `<script>` tags in HTML for CDN links
- [ ] Check package.json for icon packages
- [ ] Search HTML for `data-icon="..."` (Iconify), `data-lucide="..."` (Lucide)
- [ ] **CRITICAL: Copy the EXACT library script tag from source site**

### Icon Styles
- [ ] Outlined or filled
- [ ] Stroke width (if outlined)
- [ ] Default size
- [ ] Size variations

### Icon Usage
- [ ] Navigation icons
- [ ] Action icons (buttons)
- [ ] Status icons (alerts)
- [ ] Feature/section icons
- [ ] **Record exact icon names/identifiers (e.g., `mdi:gear`, NOT "gear icon")**

### ⚠️ Important
- **DO NOT** substitute icons with emoji or different libraries
- **DO NOT** use generic placeholders — use the real library from the source
- When generating HTML brandbook, include the same `<script>` tag as the source site

## 7. Effects

### Shadows
- [ ] All `box-shadow` values
- [ ] Categorize by elevation (sm, md, lg, xl)
- [ ] Document usage context

### Border Radius
- [ ] All `border-radius` values
- [ ] Categorize (sm, md, lg, xl, full)
- [ ] Map to components

### Transitions
- [ ] Default transition duration
- [ ] Easing functions
- [ ] What properties transition (color, background, transform)

### Animations
- [ ] Keyframe animations
- [ ] Entrance/exit animations
- [ ] Hover micro-interactions
- [ ] Loading states (spinners, skeletons)

## 8. Imagery

### Photos
- [ ] Photography style (candid, staged, product, lifestyle)
- [ ] Color treatment (warm, cool, desaturated, vibrant)
- [ ] Common aspect ratios
- [ ] Overlay usage

### Illustrations
- [ ] Illustration style (flat, isometric, hand-drawn, geometric)
- [ ] Color palette used in illustrations
- [ ] Level of detail
- [ ] Custom or stock (undraw, humaaans, etc.)

### Avatars/User Images
- [ ] Shape (circle, rounded square, square)
- [ ] Size variants
- [ ] Fallback/placeholder style

## 9. Patterns & Conventions

### CSS Methodology
- [ ] BEM classes
- [ ] Utility-first (Tailwind)
- [ ] CSS-in-JS
- [ ] Custom properties heavily used

### Naming Conventions
- [ ] Component class naming
- [ ] Color variable naming
- [ ] Spacing variable naming

### Design Decisions
- [ ] Note any unique patterns or conventions
- [ ] Document decisions that differ from standard practices
- [ ] Identify brand-specific choices

## 10. Accessibility

### Color Contrast
- [ ] Test primary text on background (minimum 4.5:1)
- [ ] Test secondary text on background
- [ ] Test button text
- [ ] Test link text

### Focus States
- [ ] Are focus states visible?
- [ ] What do focus states look like?

### Semantic HTML
- [ ] Proper heading hierarchy (H1 → H6)
- [ ] Alt text on images
- [ ] ARIA labels where needed

## Extraction Commands

### Find all colors
```bash
# Search for hex colors
grep -roh '#[0-9a-fA-F]\{3,8\}' *.css | sort -u

# Search for rgb/rgba
grep -roh 'rgba\?([^)]*)' *.css | sort -u

# Search for CSS variables
grep -roh '--[a-zA-Z0-9_-]*' *.css | sort -u
```

### Find all font sizes
```bash
grep -roh 'font-size:[^;]*' *.css | sort -u
```

### Find all spacing values
```bash
grep -roh '\(padding\|margin\|gap\):[^;]*' *.css | sort -u
```

### Find all shadows
```bash
grep -roh 'box-shadow:[^;]*' *.css | sort -u
```

### Find all border radius
```bash
grep -roh 'border-radius:[^;]*' *.css | sort -u
```

### Find all transitions
```bash
grep -roh 'transition:[^;]*' *.css | sort -u
```

## Post-Extraction

After extraction:
1. [ ] Consolidate duplicate values (e.g., `#3B82F6` and `rgb(59, 130, 246)`)
2. [ ] Group related values (colors, spacing, etc.)
3. [ ] Identify the design token structure
4. [ ] Fill gaps with industry-standard defaults if needed
5. [ ] Validate accessibility (contrast ratios)
6. [ ] Document everything in the brand book format
