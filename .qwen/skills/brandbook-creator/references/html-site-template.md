# HTML Interactive Site Template

## Overview

The brand book HTML site should be a single-page interactive application with these features.

## File Structure

```
brandbook/
├── brandbook.md              # Master markdown document
├── index.html                # Main interactive site (single file or split)
├── css/
│   ├── brandbook.css         # Custom styles + print stylesheet
│   └── tokens.css            # Generated CSS variables
└── js/
    ├── brandbook.js          # Main interactive logic
    └── export.js             # Export utilities (PDF, JSON, CSS)
```

## Site Layout

```
┌─────────────────────────────────────────────────┐
│  HEADER: Brand Logo + Dark Mode Toggle          │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ SIDEBAR  │         MAIN CONTENT                 │
│ (sticky) │                                      │
│          │  ┌─────────────────────────────┐     │
│ • Colors │  │  Section: Color Palette     │     │
│ • Type   │  │  [Interactive swatches]     │     │
│ • Layout │  └─────────────────────────────┘     │
│ • Icons  │                                      │
│ • UI     │  ┌─────────────────────────────┐     │
│ • Export │  │  Section: Typography        │     │
│          │  │  [Live font preview]        │     │
│          │  └─────────────────────────────┘     │
│          │                                      │
│          │  [More sections...]                  │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

## HTML Structure (index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Brand Name] - Brand Guidelines</title>
    <link rel="stylesheet" href="css/brandbook.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <!-- Brand fonts loaded here -->
</head>
<body>
    <!-- Header -->
    <header class="brandbook-header">
        <div class="brand-logo">
            <img src="logo.svg" alt="[Brand Name]">
        </div>
        <div class="header-actions">
            <!-- Dark mode toggle: ONLY include if source site has dark mode -->
            <!--
            <button id="darkModeToggle" class="btn-icon">
                🌙 Dark
            </button>
            -->
            <button id="mobileMenuToggle" class="btn-icon mobile-only">
                ☰ Menu
            </button>
        </div>
    </header>

    <div class="layout">
        <!-- Sidebar Navigation -->
        <nav class="sidebar" id="sidebar">
            <div class="sidebar-search">
                <input type="text" placeholder="Search..." id="searchInput">
            </div>
            <ul class="nav-links">
                <li><a href="#overview">Brand Overview</a></li>
                <li><a href="#logo">Logo Usage</a></li>
                <li><a href="#colors">Color Palette</a></li>
                <li><a href="#typography">Typography</a></li>
                <li><a href="#spacing">Spacing & Layout</a></li>
                <li><a href="#iconography">Iconography</a></li>
                <li><a href="#components">Components</a></li>
                <li><a href="#imagery">Imagery</a></li>
                <li><a href="#effects">UI Effects</a></li>
                <li><a href="#export">Export</a></li>
            </ul>
        </nav>

        <!-- Main Content -->
        <main class="content">
            <!-- Section: Brand Overview -->
            <section id="overview" class="section">
                <h1>[Brand Name]</h1>
                <p class="brand-tagline">[Tagline]</p>
                <div class="brand-values">
                    <!-- Brand values cards -->
                </div>
            </section>

            <!-- Section: Color Palette -->
            <section id="colors" class="section">
                <h2>Color Palette</h2>
                
                <div class="color-group">
                    <h3>Primary Colors</h3>
                    <div class="color-grid">
                        <div class="color-swatch" data-color="#3B82F6" style="background: #3B82F6;">
                            <div class="swatch-info">
                                <span class="swatch-name">Brand Blue</span>
                                <span class="swatch-hex">#3B82F6</span>
                                <span class="swatch-rgb">59, 130, 246</span>
                                <span class="contrast-badge AA">AA ✓</span>
                            </div>
                        </div>
                        <!-- More swatches... -->
                    </div>
                </div>

                <div class="color-group">
                    <h3>Neutral Colors</h3>
                    <div class="color-grid color-grid-neutral">
                        <!-- Neutral swatches... -->
                    </div>
                </div>

                <div class="color-group">
                    <h3>Semantic Colors</h3>
                    <div class="color-grid">
                        <!-- Success, Warning, Error, Info swatches... -->
                    </div>
                </div>
            </section>

            <!-- Section: Typography -->
            <section id="typography" class="section">
                <h2>Typography</h2>
                
                <div class="type-specimen">
                    <div class="specimen-header">
                        <h3>[Primary Font Name]</h3>
                        <span class="specimen-badge">Headings</span>
                    </div>
                    <div class="type-scale">
                        <div class="type-sample">
                            <h1>Heading 1 - 60px</h1>
                            <span class="type-meta">60px / 700 / 1.1</span>
                        </div>
                        <div class="type-sample">
                            <h2>Heading 2 - 48px</h2>
                            <span class="type-meta">48px / 700 / 1.2</span>
                        </div>
                        <!-- More type samples... -->
                    </div>
                </div>
            </section>

            <!-- Section: Spacing -->
            <section id="spacing" class="section">
                <h2>Spacing & Layout</h2>
                <div class="spacing-visualizer">
                    <!-- Visual spacing scale with bars -->
                </div>
            </section>

            <!-- Section: Components -->
            <section id="components" class="section">
                <h2>Components</h2>
                
                <div class="component-showcase">
                    <h3>Buttons</h3>
                    <div class="component-row">
                        <button class="btn btn-primary">Primary Button</button>
                        <button class="btn btn-secondary">Secondary</button>
                        <button class="btn btn-ghost">Ghost</button>
                        <button class="btn btn-danger">Danger</button>
                    </div>
                </div>

                <div class="component-showcase">
                    <h3>Form Elements</h3>
                    <!-- Interactive form examples -->
                </div>
            </section>

            <!-- Section: Export -->
            <section id="export" class="section">
                <h2>Export Assets</h2>
                <div class="export-buttons">
                    <button class="export-btn" id="exportCSS">
                        📥 Download CSS Variables
                    </button>
                    <button class="export-btn" id="exportJSON">
                        📥 Download Design Tokens (JSON)
                    </button>
                    <button class="export-btn" id="exportPDF">
                        📥 Print as PDF
                    </button>
                </div>
            </section>
        </main>
    </div>

    <!-- Toast notification for copy actions -->
    <div id="toast" class="toast hidden">
        Copied to clipboard!
    </div>

    <script src="js/brandbook.js"></script>
    <script src="js/export.js"></script>
</body>
</html>
```

## Key JavaScript Features (brandbook.js)

```javascript
// 1. Dark Mode Toggle - ONLY implement if source site has dark mode
// If the source website doesn't have dark mode, skip this entirely
/*
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});
*/

// 2. Color Swatch Copy on Click
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        const color = swatch.dataset.color;
        navigator.clipboard.writeText(color);
        showToast(`Copied ${color} to clipboard!`);
    });
});

// 3. Sidebar Active State on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 4. Search Filter
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        section.style.display = text.includes(query) ? 'block' : 'none';
    });
});

// 5. Smooth Scroll for Nav Links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// 6. Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
}

// 7. Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
mobileMenuToggle.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
});
```

## Export JavaScript (export.js)

```javascript
// Export CSS Variables
document.getElementById('exportCSS').addEventListener('click', () => {
    const cssContent = `:root {
  /* Primary Colors */
  --brand-blue: #3B82F6;
  --brand-green: #10B981;
  
  /* Neutral Colors */
  --gray-100: #F3F4F6;
  --gray-900: #111827;
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  
  /* Spacing */
  --space-4: 16px;
  --space-8: 32px;
}`;
    
    downloadFile('brand-variables.css', cssContent, 'text/css');
});

// Export JSON Design Tokens
document.getElementById('exportJSON').addEventListener('click', () => {
    const tokens = {
        colors: {
            primary: { blue: { value: '#3B82F6' } },
            neutral: { gray100: { value: '#F3F4F6' } }
        },
        typography: {
            fontPrimary: { value: 'Inter' },
            scale: {
                h1: { value: '60px' },
                body: { value: '16px' }
            }
        },
        spacing: {
            scale: { value: '8px' },
            md: { value: '16px' }
        }
    };
    
    downloadFile('design-tokens.json', JSON.stringify(tokens, null, 2), 'application/json');
});

// Export PDF (via print)
document.getElementById('exportPDF').addEventListener('click', () => {
    window.print();
});

// Helper: Download File
function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
}
```

## CSS Essentials (brandbook.css)

```css
/* Brand Variables */
:root {
    --brand-blue: #3B82F6;
    --brand-green: #10B981;
    --gray-100: #F3F4F6;
    --gray-900: #111827;
    
    --bg-primary: #FFFFFF;
    --bg-secondary: #F9FAFB;
    --text-primary: #111827;
    --text-secondary: #6B7280;
    --border-color: #E5E7EB;
}

/* Dark mode variables: ONLY add these if source site has dark mode */
/*
.dark {
    --bg-primary: #111827;
    --bg-secondary: #1F2937;
    --text-primary: #F9FAFB;
    --text-secondary: #9CA3AF;
    --border-color: #374151;
}
*/

/* Layout */
body {
    font-family: var(--font-body);
    background: var(--bg-primary);
    color: var(--text-primary);
    margin: 0;
}

.layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    min-height: 100vh;
}

/* Sidebar */
.sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    padding: 24px;
    border-right: 1px solid var(--border-color);
    overflow-y: auto;
}

/* Color Swatches */
.color-swatch {
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.color-swatch:hover {
    transform: scale(1.05);
}

/* Print Styles */
@media print {
    .sidebar, .header-actions, .export-buttons {
        display: none !important;
    }
    .content {
        margin-left: 0 !important;
    }
    .color-swatch {
        break-inside: avoid;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .layout {
        grid-template-columns: 1fr;
    }
    .sidebar {
        display: none;
    }
    .sidebar.open {
        display: block;
    }
}
```

## Interactive Features Checklist

- [ ] Color swatch click → copy HEX to clipboard
- [ ] Dark mode toggle with localStorage persistence (ONLY if source has dark mode)
- [ ] Sidebar highlights section in viewport
- [ ] Search filters content in real-time
- [ ] Smooth scroll on navigation
- [ ] Toast notifications for copy/export
- [ ] Mobile responsive (hamburger menu)
- [ ] Export CSS variables
- [ ] Export JSON design tokens
- [ ] Print to PDF (print stylesheet)
- [ ] Font size slider (optional)
- [ ] Contrast checker (optional)
- [ ] Icons from source site library ONLY (no emoji, no substitutions)

## Performance Guidelines

- Keep total site size under 500KB
- Use SVG for icons and color swatches
- Lazy load font previews
- No external JS dependencies (except icon library from source site)
- Use CSS custom properties for theming
- Minimize reflows on interactions

## Icon Guidelines

**CRITICAL: Use ONLY icons that exist on the source website.**

- Do NOT substitute icons with emoji or different icon libraries
- Extract the exact icon library used on the source site (Iconify, Lucide, Heroicons, Material, etc.)
- Use the exact icon names/identifiers found on the source
- Load the same CDN/script as the source site uses
- If the source uses `mdi:gear`, do NOT replace it with `⚙️` or `heroicons:cog`

**How to detect icon library on source site:**
1. Check `<script>` tags in HTML for icon library CDN (e.g., `code.iconify.design`, `unpkg.com/lucide`)
2. Check `package.json` for icon packages (`@iconify`, `lucide-react`, `@heroicons/react`)
3. Search HTML for `data-icon="..."` (Iconify), `data-lucide="..."` (Lucide), or `<svg>` inline icons
4. Copy the exact `<script>` tag from the source site into the brandbook HTML

**Example — Source uses Iconify:**
```html
<!-- Copy this script from source site -->
<script src="https://code.iconify.design/2/2.2.1/iconify.min.js"></script>

<!-- Use exact icon names from source -->
<span class="iconify" data-icon="mdi:gear"></span>
<span class="iconify" data-icon="mdi:factory"></span>
```

**Example — Source uses Lucide:**
```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>

<i data-lucide="settings"></i>
<i data-lucide="factory"></i>
```

**WRONG — never do this:**
```html
<!-- WRONG: Emoji instead of real icons -->
<span>⚙️</span>
<span>🏭</span>
<span>📐</span>

<!-- WRONG: Different icon library than source -->
<i class="fa fa-gear"></i>
<span class="iconify" data-icon="heroicons:cog"></span>
```
