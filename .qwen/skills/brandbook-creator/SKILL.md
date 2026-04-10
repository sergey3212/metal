---
name: brandbook-creator
description: Create a comprehensive brand book (brand style guide) from a website or design files. Generates both a Markdown document (.md) AND an interactive HTML website with live color swatches, typography preview, and export features. Extracts colors, typography, spacing, components, and visual patterns. Use when the user wants to create a brand book, brand style guide, design system documentation, or extract brand identity from an existing website or product.
---

# Brand Book Creator

Generate comprehensive brand books from websites by extracting and documenting all visual identity elements: colors, typography, spacing, components, imagery, and usage guidelines.

## Brand Book Structure

A complete brand book contains these sections:

### 1. Brand Overview
- Brand name, tagline, mission
- Brand personality and values
- Target audience
- Voice and tone guidelines

### 2. Logo Usage
- Primary logo with clear space requirements
- Minimum size specifications
- Acceptable and unacceptable usage
- Logo variations (horizontal, vertical, icon-only)
- Color variants (full color, monochrome, reversed)

### 3. Color Palette
- Primary brand colors with HEX, RGB, CMYK, Pantone values
- Secondary/accent colors
- Neutral colors (grays, whites, blacks)
- Usage ratios (60-30-10 rule)
- Accessibility contrast ratios (WCAG AA/AAA)
- Dark mode equivalents (only if present on source site)

### 4. Typography
- Primary typeface (headings)
- Secondary typeface (body text)
- Font hierarchy (H1-H6, body, caption)
- Font weights, sizes, line heights
- Web font loading strategy
- Fallback fonts

### 5. Spacing & Layout
- Grid system (8pt, 4pt, etc.)
- Spacing scale
- Breakpoints (mobile, tablet, desktop)
- Container widths
- Margin/padding patterns

### 6. Iconography
- Icon style (outlined, filled, duotone)
- Icon sizes
- Icon library used (Iconify, Lucide, Heroicons, Material, etc.) — extract exact library script
- Icon names/identifiers (e.g., `mdi:gear`, `lucide:settings`)
- Custom icon guidelines
- **CRITICAL**: Only use icons from the source site's library — never substitute with emoji or other libraries

### 7. Components
- Buttons (primary, secondary, ghost)
- Cards
- Forms and inputs
- Navigation patterns
- State styles (hover, active, disabled, error, success)

### 8. Imagery
- Photography style
- Illustration style
- Image treatment (filters, overlays, corners)
- Icon and graphic style

### 9. UI Effects
- Shadows and elevation
- Border radius values
- Transitions and animations
- Hover/focus/active states
- Motion principles

### 10. Application Examples
- Real-world usage examples
- Do's and Don'ts
- Brand in context

## Workflow

### Step 1: Extract Visual Identity from Website

Analyze the provided website or design files to extract:

**Colors:**
- Scan all CSS/custom properties for color values
- Identify primary, secondary, neutral palettes
- Note gradient definitions
- Check for dark mode variants (only if present)

**Typography:**
- Extract all font-family declarations
- Document font sizes, weights, line heights
- Map heading hierarchy (H1-H6)
- Note letter-spacing and text transforms

**Spacing:**
- Identify spacing scale (4px, 8px, etc.)
- Document grid gaps, section padding
- Note container max-widths

**Components:**
- Catalog UI elements (buttons, cards, forms, nav)
- Document states (default, hover, active, disabled)
- Note border radius, shadows, transitions

**Icons & Imagery:**
- Identify icon library (Iconify, Lucide, etc.) and copy its `<script>` tag from source
- Record exact icon names/identifiers (e.g., `mdi:gear`, NOT "gear icon")
- Note image treatments, filters, aspect ratios
- **CRITICAL**: Never substitute icons with emoji or different libraries — use only what exists on the source site

### Step 2: Organize Brand Structure

Map extracted elements into the brand book structure above. Fill gaps with reasonable defaults based on:
- Industry standards
- ui-ux-pro-max skill recommendations
- Common design patterns

### Step 3: Generate Brand Book Document

Create a comprehensive markdown document with:

```markdown
# [Brand Name] - Brand Book

## 1. Brand Overview
[Brand description, mission, values, personality]

## 2. Logo
[Logo specifications, usage rules, variants]

## 3. Color Palette

### Primary Colors
| Name | HEX | RGB | Usage |
|------|-----|-----|-------|
| Brand Blue | #1E40AF | 30, 64, 175 | Primary actions, headers |

### Secondary Colors
[Table with secondary palette]

### Neutral Colors
[Table with grays and neutrals]

### Color Usage Guidelines
[60-30-10 rule, accessibility notes]

## 4. Typography

### Typefaces
- **Primary:** [Font name] - Headings
- **Secondary:** [Font name] - Body text

### Type Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 | 48px | 700 | 1.2 | -0.02em |
| H2 | 36px | 600 | 1.3 | -0.01em |

## 5. Spacing & Layout
[Spacing scale, grid system, breakpoints]

## 6. Iconography
[Icon style, sizes, library]

## 7. Components
[Button styles, cards, forms, states]

## 8. Imagery
[Photography and illustration guidelines]

## 9. UI Effects
[Shadows, border radius, transitions]

## 10. Examples
[Do's and Don'ts, application examples]
```

### Step 4: Generate Interactive HTML Site (REQUIRED)

In addition to Markdown, **always generate an interactive HTML brand guidelines site** that includes:

**Structure:**
```
brandbook/
├── brandbook.md              # Master markdown document
├── index.html                # Interactive HTML site
├── css/
│   └── brandbook.css         # Site styles + brand variables
└── js/
    └── brandbook.js          # Interactive features
```

**HTML Site Features:**
- **Live color palette** — clickable color swatches that copy HEX to clipboard
- **Typography preview** — live font samples with size/weight controls
- **Component showcase** — interactive buttons, forms, cards with hover states
- **Spacing visualizer** — visual grid showing spacing scale
- **Dark mode toggle** — only if source site has dark mode
- **Search & navigation** — sticky sidebar with section links
- **Responsive design** — mobile, tablet, desktop previews
- **Export buttons** — download CSS variables, JSON tokens, PDF

**Technology:**
- Pure HTML + CSS + Vanilla JS (no dependencies)
- Tailwind CSS via CDN (if user prefers utility classes)
- Inline SVG for icons and color swatches

### Step 5: Export Additional Formats (Optional)

Generate supplementary formats as needed:
- **PDF** - For print and distribution (via HTML print stylesheet)
- **JSON** - For design token integration (`design-tokens.json`)
- **CSS variables** - For developer handoff (`brand-variables.css`)
- **Figma tokens** - For design team integration

## Resources

- For UI/UX patterns and design system recommendations, use the `ui-ux-pro-max` skill
- See [references/brand-book-template.md](references/brand-book-template.md) for detailed template structure
- See [references/extraction-checklist.md](references/extraction-checklist.md) for systematic website analysis
- See [references/html-site-template.md](references/html-site-template.md) for interactive site structure

## Tips

1. **Be thorough** - Extract every color, font size, and spacing value
2. **Note patterns** - Document recurring design decisions
3. **Include context** - Explain WHY choices were made, not just WHAT
4. **Make it actionable** - Provide exact values developers can use
5. **Add constraints** - Define what NOT to do as clearly as what TO do
6. **Test accessibility** - Verify color contrast meets WCAG standards
7. **Keep it living** - Brand books should evolve with the brand
8. **Make it interactive** - The HTML site should let users test and export
