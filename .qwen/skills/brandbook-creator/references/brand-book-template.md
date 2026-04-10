# Brand Book Template - Detailed Structure

## Front Matter

```yaml
---
brand_name: [Brand Name]
version: 1.0
last_updated: YYYY-MM-DD
status: Draft | Approved
---
```

## 1. Brand Overview

### 1.1 Brand Story
- Company background
- Mission statement
- Vision statement
- Core values (3-5 key principles)

### 1.2 Brand Personality
Describe brand as a person:
- Tone of voice (formal, casual, playful, authoritative)
- Character traits (innovative, trustworthy, approachable)
- Brand archetype (creator, hero, sage, explorer, etc.)

### 1.3 Target Audience
- Primary demographics
- Psychographics
- User personas (brief)

### 1.4 Voice & Tone
- Writing style guidelines
- Vocabulary preferences
- Examples of brand voice in action

## 2. Logo

### 2.1 Primary Logo
- Full-color logo on white background
- Clear space requirements (usually x-height of logo)
- Minimum size (print: mm, digital: px)
- File formats: SVG, PNG, EPS

### 2.2 Logo Variations
- Horizontal lockup
- Vertical/stacked lockup
- Icon/favicon only
- Wordmark only

### 2.3 Color Variants
- Full color
- One-color (black)
- One-color (white)
- Reversed (light on dark)

### 2.4 Logo Misuse
❌ Don't stretch or distort
❌ Don't change colors
❌ Don't add effects (shadows, outlines)
❌ Don't rotate or flip
❌ Don't place on busy backgrounds
❌ Don't crop or modify elements

## 3. Color Palette

### 3.1 Primary Colors (2-4 colors)

| Name | HEX | RGB | CMYK | Pantone | Usage |
|------|-----|-----|------|---------|-------|
| Primary Blue | #1E40AF | 30, 64, 175 | 83, 63, 0, 31 | PMS 2728 C | Primary CTAs, headers |

### 3.2 Secondary Colors (3-6 colors)

| Name | HEX | RGB | Usage |
|------|-----|-----|-------|
| Accent Green | #10B981 | 16, 185, 129 | Success states, positive indicators |

### 3.3 Neutral Colors

| Name | HEX | Usage |
|------|-----|-------|
| Gray 900 | #111827 | Primary text |
| Gray 600 | #4B5563 | Secondary text |
| Gray 300 | #D1D5DB | Borders, dividers |
| Gray 100 | #F3F4F6 | Backgrounds |
| White | #FFFFFF | Page background |

### 3.4 Semantic Colors

| Type | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| Success | #10B981 | #34D399 | Positive feedback |
| Warning | #F59E0B | #FBBF24 | Caution messages |
| Error | #EF4444 | #F87171 | Errors, destructive actions |
| Info | #3B82F6 | #60A5FA | Informational content |

### 3.5 Color Usage Guidelines
- **60-30-10 Rule:** 60% neutral, 30% primary, 10% accent
- **Contrast Ratios:** Minimum 4.5:1 for normal text (WCAG AA)
- **Dark Mode:** Provide inverted palette with adjusted contrast

### 3.6 Gradients (if applicable)

| Name | Definition | Usage |
|------|------------|-------|
| Brand Gradient | `linear-gradient(135deg, #667EEA 0%, #764BA2 100%)` | Hero sections, CTAs |

## 4. Typography

### 4.1 Typefaces

**Primary Typeface (Headings)**
- Font family: [Name]
- Source: Google Fonts | Adobe Fonts | Custom
- Weights used: 400, 600, 700
- Loading strategy: `display=swap`

**Secondary Typeface (Body)**
- Font family: [Name]
- Source: Google Fonts | System fonts
- Weights used: 400, 500
- Loading strategy: `display=swap`

**Fallback Stack**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### 4.2 Type Scale

| Element | Desktop | Tablet | Mobile | Weight | Line Height | Letter Spacing |
|---------|---------|--------|--------|--------|-------------|----------------|
| H1 | 60px | 48px | 36px | 700 | 1.1 | -0.02em |
| H2 | 48px | 40px | 32px | 700 | 1.2 | -0.01em |
| H3 | 36px | 32px | 28px | 600 | 1.3 | 0 |
| H4 | 30px | 28px | 24px | 600 | 1.4 | 0 |
| H5 | 24px | 22px | 20px | 600 | 1.4 | 0.01em |
| H6 | 20px | 18px | 18px | 600 | 1.5 | 0.01em |
| Body LG | 18px | 16px | 16px | 400 | 1.7 | 0 |
| Body | 16px | 16px | 14px | 400 | 1.6 | 0 |
| Small | 14px | 14px | 13px | 400 | 1.5 | 0.01em |
| Caption | 12px | 12px | 12px | 400 | 1.4 | 0.02em |

### 4.3 Text Styles

| Style | Definition | Usage |
|-------|------------|-------|
| Link | `color: primary; text-decoration: underline` | Hyperlinks |
| Overline | `font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em` | Section labels |
| Quote | `font-style: italic; font-size: 20px; border-left: 4px solid primary` | Testimonials |

## 5. Spacing & Layout

### 5.1 Spacing Scale (8pt base)

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Tight padding, icon gaps |
| space-2 | 8px | Default padding |
| space-3 | 12px | Element spacing |
| space-4 | 16px | Card padding, section gaps |
| space-6 | 24px | Component spacing |
| space-8 | 32px | Section padding |
| space-12 | 48px | Large section gaps |
| space-16 | 64px | Page sections |
| space-24 | 96px | Hero sections |

### 5.2 Grid System
- Base: 12-column grid
- Gutter: 24px (desktop), 16px (mobile)
- Margin: 32px (desktop), 16px (mobile)

### 5.3 Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| Mobile | < 640px | Single column layout |
| Tablet | 640px - 1024px | 2-column layout |
| Desktop | 1024px - 1440px | Full layout |
| Wide | > 1440px | Centered, max-width container |

### 5.4 Container Widths

| Container | Max Width | Usage |
|-----------|-----------|-------|
| Narrow | 640px | Text content, forms |
| Default | 1024px | Standard pages |
| Wide | 1280px | Dashboards, catalogs |
| Full | 100% | Hero sections, footers |

## 6. Iconography

### 6.1 Icon Library
- Primary: [Lucide | Heroicons | Material Icons | Custom]
- Style: [Outlined | Filled | Duotone | Line]
- Stroke width: 1.5px (default), 2px (bold)

### 6.2 Icon Sizes

| Size | Value | Usage |
|------|-------|-------|
| xs | 16px | Inline with small text |
| sm | 20px | Inline with body text |
| md | 24px | Default, buttons, nav |
| lg | 32px | Feature icons |
| xl | 48px | Hero icons, empty states |

### 6.3 Icon Guidelines
- Use consistent stroke width across all icons
- Maintain visual weight balance
- Don't mix icon styles (outlined + filled)
- Use SVG format for scalability
- Provide accessible labels for decorative icons

## 7. Components

### 7.1 Buttons

| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| Primary | Primary color | White | None | Main CTAs |
| Secondary | Transparent | Primary color | 1px primary | Secondary actions |
| Ghost | Transparent | Gray 700 | None | Tertiary actions |
| Danger | Error color | White | None | Destructive actions |

**Button States:**
- Default: as defined above
- Hover: darken 10% or add shadow
- Active: darken 15% or scale 0.98
- Disabled: 50% opacity, cursor: not-allowed
- Focus: 2px outline, 2px offset

**Button Sizes:**
- Small: 32px height, 12px 16px padding
- Medium: 40px height, 16px 24px padding (default)
- Large: 48px height, 20px 32px padding

### 7.2 Cards

- Background: White or Gray 100
- Border radius: 8px or 12px
- Shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Padding: 24px
- Hover: elevate shadow `0 10px 15px rgba(0,0,0,0.1)`

### 7.3 Forms

**Input Fields:**
- Height: 40px (default), 48px (large)
- Border: 1px solid Gray 300
- Border radius: 6px or 8px
- Padding: 8px 12px
- Focus: 2px primary border, subtle glow
- Error: 2px error border, error message below
- Placeholder: Gray 500

### 7.4 Navigation

- **Top Nav:** Height 64px, sticky, backdrop blur
- **Sidebar:** Width 240px or 280px, collapsible
- **Mobile:** Hamburger menu, slide-in drawer

## 8. Imagery

### 8.1 Photography Style
- Mood: [authentic, bright, lifestyle, product-focused]
- Lighting: [natural, studio, warm]
- Composition: [people in context, product close-ups]
- Color treatment: [consistent with brand palette]

### 8.2 Illustration Style
- Style: [flat, isometric, hand-drawn, geometric]
- Color usage: [brand colors, limited palette]
- Complexity: [simple, detailed]

### 8.3 Image Treatments
- Border radius: 8px or 12px
- Overlays: Dark overlay (40% black) for text legibility
- Aspect ratios: 16:9 (hero), 4:3 (content), 1:1 (avatars)
- Shadows: Consistent with card elevation

## 9. UI Effects

### 9.1 Shadows / Elevation

| Level | Value | Usage |
|-------|-------|-------|
| 1 (sm) | `0 1px 2px rgba(0,0,0,0.05)` | Subtle cards |
| 2 (md) | `0 4px 6px rgba(0,0,0,0.1)` | Default cards |
| 3 (lg) | `0 10px 15px rgba(0,0,0,0.1)` | Hover states, dropdowns |
| 4 (xl) | `0 20px 25px rgba(0,0,0,0.15)` | Modals, popovers |
| 5 (2xl) | `0 25px 50px rgba(0,0,0,0.25)` | Full-screen overlays |

### 9.2 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Inputs, tags, badges |
| md | 8px | Cards, buttons (default) |
| lg | 12px | Large cards, modals |
| xl | 16px | Hero sections, feature cards |
| full | 9999px | Pills, avatars, toggles |

### 9.3 Transitions

| Property | Duration | Easing | Usage |
|----------|----------|--------|-------|
| Default | 200ms | ease-in-out | Hover states, colors |
| Slow | 300ms | ease-in-out | Expand/collapse, transforms |
| Fast | 150ms | ease | Focus states, micro-interactions |

### 9.4 Animation Principles
- **Duration:** 150-300ms for UI, 500-800ms for page transitions
- **Easing:** ease-in-out for most, ease-out for entrances, ease-in for exits
- **Reduced motion:** Respect `prefers-reduced-motion: reduce`
- **Purposeful:** Animate to communicate state changes, not for decoration

## 10. Application Examples

### 10.1 Do's and Don'ts

**✅ DO:**
- Use brand colors consistently
- Maintain logo clear space
- Follow type hierarchy
- Keep spacing consistent
- Test in both light and dark mode

**❌ DON'T:**
- Modify logo proportions
- Use unapproved colors
- Mix too many font families
- Ignore accessibility contrast
- Overuse animations

### 10.2 Real-World Applications
- Website homepage
- Mobile app screens
- Marketing materials
- Social media templates
- Email templates
- Presentation decks
