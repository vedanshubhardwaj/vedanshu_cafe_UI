# Valley Grain & Roast — Specialty Coffee & Heritage Bakehouse UI

> **Theme**: Sun-drenched vineyard at golden hour. Warm cream paper, walnut ink, terracotta warmth — a wine label breathed into an artisanal specialty coffee and bakery interface.

Designed strictly following the **Fallen Grape Design Reference System** for [vedanshubhardwaj/vedanshu_cafe_UI](https://github.com/vedanshubhardwaj/vedanshu_cafe_UI).

---

## ☕ Problem Statement & Brand Concept

**Valley Grain & Roast** is a fictional specialty micro-roastery and 72-hour sourdough viennoiserie situated in a sun-drenched vineyard valley. The website interface showcases:
- **Signature Offerings**: Single-origin filter & espresso coffees, 72-hour wild levain pastries, and woodfired sourdough tartines.
- **The Craft & Sourcing Story**: Direct trade single origins (Panama Geisha, Ethiopia Sidama), 2018 heritage sourdough starter, and cast-iron roasting philosophy.
- **Atmospheric Gallery**: Curated golden-hour photography capturing steam, morning light, brass portafilters, hand-thrown ceramics, and outdoor courtyard seating.
- **Interactive Table Reservation**: Clean 4-step booking flow with party size selection, date/time pickers, atmosphere preferences (*Sunlit Courtyard Patio*, *Hearth & Fireplace Room*, *Barista Counter*), and instant booking confirmation.
- **Pre-Order Morning Tray**: Interactive slide-over cart drawer for pickup orders.

---

## 🎨 Design Tokens & System Reference (Fallen Grape)

### 1. Color Palette

| Token | Hex | Name | Role |
| :--- | :--- | :--- | :--- |
| `--color-vintage-cream` | `#ece0d2` | Vintage Cream | Base page canvas, section backgrounds, footer surface |
| `--color-bone-white` | `#f3f3f3` | Bone White | Card surfaces, navigation bar, elevated content blocks |
| `--color-walnut-ink` | `#573d21` | Walnut Ink | Primary typography, headlines, body copy, ink-on-paper feel |
| `--color-saddle-brown` | `#7c664d` | Saddle Brown | Hairline 1px borders, dividers, secondary text, muted lines |
| `--color-peach-sand` | `#e1c6ab` | Peach Sand | Primary action button fill, soft interaction states |
| `--color-terracotta-glow` | `#e3a36e` | Terracotta Glow | Saturated accent button, link highlights, badges |
| `--color-apricot-whisper` | `#efa164` | Apricot Whisper | Top announcement bar, urgency badges, hover states |
| `--color-vine-sage` | `#d8deb7` | Vine Sage | Botanical accents, decorative tags, organic harvest badges |

### 2. Strict Geometric & Elevation Rules

- **Border Radius**: `0px` everywhere (cards, buttons, inputs, badges, modals).
- **Elevation / Shadows**: **Zero shadows**. Elevation is achieved solely through hairline Saddle Brown (`#7c664d`) borders and the soft contrast between Bone White (`#f3f3f3`) cards and the Vintage Cream (`#ece0d2`) canvas.
- **Density**: Comfortable, with 80px section vertical gaps and max-width 1200px.

### 3. Typography Two-Voice System

- **Editorial Serif (`Fraunces` / substitute for `Romie`)**:
  - Used for the brand wordmark, hero display headlines (48px–64px), editorial section headings, and brand storytelling.
  - Generous line-height (1.20–1.70) with 0.0300em tracking.
- **Condensed Utilitarian Sans (`Barlow Condensed` / substitute for `Arial Narrow`)**:
  - Used for navigation, product titles, button labels, category filter tabs, utility text.
  - Formatted in uppercase with widened letter-spacing (0.0430em–0.0630em) evoking a hand-pressed vintage wine or coffee bag label.
- **Metadata Monospace (`DM Mono`)**:
  - Used for tasting notes, origin elevations, timestamps, and ticket codes.

---

## 📂 Project Architecture

```
vedanshu_cafe_UI/
├── index.html        # Complete interactive single-page UI (Announcement, Nav, Hero, Story, Menu, Gallery, Reservation, Tray, Modals)
├── styles.css        # Fallen Grape CSS Custom Properties and design token classes
└── README.md         # Design documentation, token specs, and usage guide
```

---

## 🚀 How to Run & Preview

### Option 1: Direct File Preview
Simply double-click `index.html` or open it with any web browser (Chrome, Edge, Safari, Firefox). No build step required.

### Option 2: Local HTTP Server (Python / Node)
```bash
# Using Python
python -m http.server 3000

# Using Node (npx serve)
npx serve .
```
Then visit `http://localhost:3000` in your browser.

---

## 🛠️ Interactive Features Built-In

1. **Category Filtering**: Filter signature items by *All*, *Specialty Coffees*, *Viennoiserie & Pastries*, *Hearth Sourdough*, or *Autumn Harvest*.
2. **Morning Tray Drawer**: Add pastries and pour overs to your interactive slide-over order drawer with real-time quantity adjustments and subtotal calculation.
3. **Table Reservation Flow**: Choose party size (1–6+), select date and time, pick your desired atmosphere (*Patio*, *Hearth Room*, *Barista Counter*), and submit to see an instant reservation ticket modal.
4. **Curated Ambiance Lightbox**: Click any gallery photo to open a focused, unhurried lightbox with atmosphere captions and timestamps.
5. **Responsive & Mobile Ready**: Clean hamburger drawer on mobile viewports while preserving the wine-label paper aesthetic.
