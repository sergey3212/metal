#!/usr/bin/env python3
"""
Extract color palette from CSS files or URL.
Outputs a structured color table with HEX, RGB, and suggested usage.

Usage:
    python extract_colors.py <path_to_css_file_or_directory>
    python extract_colors.py https://example.com/styles.css
"""

import re
import sys
import os
from collections import Counter
from urllib.request import urlopen


def extract_colors_from_text(css_text):
    """Extract all color values from CSS text."""
    colors = []
    
    # Match hex colors: #RGB, #RGBA, #RRGGBB, #RRGGBBAA
    hex_pattern = r'#[0-9a-fA-F]{3,8}\b'
    hex_matches = re.findall(hex_pattern, css_text)
    colors.extend(hex_matches)
    
    # Match rgb/rgba colors
    rgb_pattern = r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+\s*)?\)'
    rgb_matches = re.findall(rgb_pattern, css_text)
    for r, g, b in rgb_matches:
        colors.append(f'#{int(r):02X}{int(g):02X}{int(b):02X}')
    
    # Match hsl/hsla colors (basic conversion)
    hsl_pattern = r'hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%'
    hsl_matches = re.findall(hsl_pattern, css_text)
    for h, s, l in hsl_matches:
        r, g, b = hsl_to_rgb(int(h), int(s)/100, int(l)/100)
        colors.append(f'#{r:02X}{g:02X}{b:02X}')
    
    return colors


def hsl_to_rgb(h, s, l):
    """Convert HSL to RGB."""
    if s == 0:
        r = g = b = l
    else:
        def hue2rgb(p, q, t):
            if t < 0: t += 1
            if t > 1: t -= 1
            if t < 1/6: return p + (q - p) * 6 * t
            if t < 1/2: return q
            if t < 2/3: return p + (q - p) * (2/3 - t) * 6
            return p
        
        q = l * (1 + s) if l < 0.5 else l + s - l * s
        p = 2 * l - q
        r = hue2rgb(p, q, h/360 + 1/3)
        g = hue2rgb(p, q, h/360)
        b = hue2rgb(p, q, h/360 - 1/3)
    
    return round(r * 255), round(g * 255), round(b * 255)


def normalize_color(hex_color):
    """Normalize hex color to uppercase 6-digit."""
    hex_color = hex_color.lstrip('#').upper()
    if len(hex_color) == 3:
        hex_color = ''.join([c*2 for c in hex_color])
    elif len(hex_color) == 4:
        hex_color = ''.join([c*2 for c in hex_color[:3]])
    elif len(hex_color) == 8:
        hex_color = hex_color[:6]  # Remove alpha
    return f'#{hex_color}'


def get_brightness(hex_color):
    """Calculate relative brightness of a color."""
    hex_color = hex_color.lstrip('#')
    r, g, b = int(hex_color[0:2], 16), int(hex_color[2:4], 16), int(hex_color[4:6], 16)
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255


def is_grayscale(hex_color, threshold=10):
    """Check if color is essentially gray."""
    hex_color = hex_color.lstrip('#')
    r, g, b = int(hex_color[0:2], 16), int(hex_color[2:4], 16), int(hex_color[4:6], 16)
    return abs(r - g) < threshold and abs(g - b) < threshold and abs(r - b) < threshold


def suggest_usage(hex_color, all_colors):
    """Suggest usage based on color properties and frequency."""
    brightness = get_brightness(hex_color)
    gray = is_grayscale(hex_color)
    
    if gray:
        if brightness > 0.95:
            return "Page background"
        elif brightness > 0.85:
            return "Card/section background"
        elif brightness > 0.7:
            return "Borders, dividers"
        elif brightness > 0.5:
            return "Secondary text, placeholders"
        elif brightness > 0.3:
            return "Body text"
        else:
            return "Primary text, headings"
    elif brightness > 0.6:
        return "Accent, highlights"
    elif brightness > 0.4:
        return "Primary actions, CTAs"
    else:
        return "Dark accents, overlays"


def read_css_source(source):
    """Read CSS from file, directory, or URL."""
    css_text = ""
    
    if source.startswith('http'):
        # URL
        try:
            response = urlopen(source)
            css_text = response.read().decode('utf-8')
        except Exception as e:
            print(f"Error fetching URL: {e}", file=sys.stderr)
            sys.exit(1)
    elif os.path.isfile(source):
        # Single file
        with open(source, 'r', encoding='utf-8') as f:
            css_text = f.read()
    elif os.path.isdir(source):
        # Directory - read all CSS files
        for root, dirs, files in os.walk(source):
            for file in files:
                if file.endswith(('.css', '.scss', '.less')):
                    filepath = os.path.join(root, file)
                    try:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            css_text += f.read() + "\n"
                    except:
                        pass
    else:
        print(f"Error: Source not found: {source}", file=sys.stderr)
        sys.exit(1)
    
    return css_text


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    
    source = sys.argv[1]
    css_text = read_css_source(source)
    
    if not css_text:
        print("No CSS content found.", file=sys.stderr)
        sys.exit(1)
    
    # Extract and process colors
    raw_colors = extract_colors_from_text(css_text)
    normalized = [normalize_color(c) for c in raw_colors if len(c.replace('#', '')) in [3, 4, 6, 8]]
    
    # Count frequency and deduplicate
    color_counts = Counter(normalized)
    unique_colors = sorted(color_counts.keys(), key=lambda c: (-color_counts[c], c))
    
    # Generate output
    print(f"\n# Extracted Color Palette\n")
    print(f"Total unique colors: {len(unique_colors)}\n")
    print(f"## Color Table\n")
    print(f"| Name | HEX | RGB | Brightness | Suggested Usage |")
    print(f"|------|-----|-----|------------|-----------------|")
    
    for i, color in enumerate(unique_colors[:50], 1):  # Limit to top 50
        hex_val = color
        rgb = f"{int(color[1:3], 16)}, {int(color[3:5], 16)}, {int(color[5:7], 16)}"
        brightness = get_brightness(color)
        usage = suggest_usage(color, unique_colors)
        name = f"Color {i}"
        
        print(f"| {name} | {hex_val} | {rgb} | {brightness:.2f} | {usage} |")
    
    print(f"\n## Next Steps\n")
    print(f"1. Review the table above and identify your brand colors")
    print(f"2. Group colors into: Primary, Secondary, Neutral, Semantic")
    print(f"3. Assign meaningful names (e.g., 'Brand Blue' instead of 'Color 3')")
    print(f"4. Document usage guidelines for each color")
    print(f"5. Test contrast ratios for accessibility (minimum 4.5:1 for text)")


if __name__ == '__main__':
    main()
