---
name: Obsidian Telemetry
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#e7bdb9'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#ad8885'
  outline-variant: '#5d3f3d'
  surface-tint: '#ffb3ae'
  primary: '#ffb3ae'
  on-primary: '#68000b'
  primary-container: '#ff5352'
  on-primary-container: '#5c0009'
  inverse-primary: '#c0001e'
  secondary: '#ffb3b2'
  on-secondary: '#670314'
  secondary-container: '#8a212a'
  on-secondary-container: '#ff9e9d'
  tertiary: '#c8c5cc'
  on-tertiary: '#303035'
  tertiary-container: '#919096'
  on-tertiary-container: '#29292e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ae'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#930014'
  secondary-fixed: '#ffdad9'
  secondary-fixed-dim: '#ffb3b2'
  on-secondary-fixed: '#410008'
  on-secondary-fixed-variant: '#871f28'
  tertiary-fixed: '#e4e1e8'
  tertiary-fixed-dim: '#c8c5cc'
  on-tertiary-fixed: '#1b1b20'
  on-tertiary-fixed-variant: '#47464c'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.04em
  display-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Geist
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-compact: 0.5rem
  margin: 1rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system drives a personal telemetry and daily control center spanning fitness, metabolic performance, sleep hygiene, and focused habit architecture. It operates under a philosophy of extreme functional clarity: the UI acts as a silent, high-precision instrument rather than a gamified consumer playground. 

The aesthetic is precision dark-mode minimalism engineered specifically for high visual endurance and low cognitive friction. Visual weight is concentrated on numerical clarity, vital trends, and disciplined actionable triggers. Monolithic deep-tone surfaces recede completely into OLED mobile displays, allowing vivid signal red to indicate system status, streak continuity, biometric threshold alerts, and primary commitments.

## Colors

The palette establishes an uncompromising dark-environment hierarchy. Grayscale layers handle architectural structure, while targeted reds command focus.

- **Background Canvas (`#0B0B0D`)**: Base canvas tier. Preserves battery and eliminates visual fatigue during early morning check-ins and late-night debriefs.
- **Card Background (`#151518`)**: Primary containment tier for modular widgets, metric overviews, and daily habit slots.
- **Elevated Surface (`#1D1D22`)**: Foreground containers, active bottom sheets, popovers, segmented control trays, and toggle tracks.
- **Borders & Dividers (`#2A2A30`)**: Structural boundary lines, card borders, and chart gridlines. Maintain single-pixel crispness.
- **Primary Accent (`#FF343D`)**: Reserved for live data states, current active habit rings, high-urgency notifications, metric completion peaks, and core interaction triggers.
- **Secondary Accent (`#8F252D`)**: Contextual fill for incomplete progress arcs, historical chart fills, selected toggle surfaces, and inactive streak markers.
- **Primary Text (`#F5F5F7`)**: High-contrast readouts, vital metrics, widget titles, and focal points.
- **Secondary Text (`#96969F`)**: Timestamps, unit labels (`BPM`, `HRS`, `KCAL`), inactive states, and sub-labels.

## Typography

Typography focuses on high-density information architecture. The system combines Inter for natural, neutral narrative readability with Geist for tabular telemetry, metric callouts, and system tracking.

- **Metrics & Numbers**: Always render telemetry counts, timers, heart rates, and quantitative milestones in Geist with tabular figures enabled (`font-variant-numeric: tabular-nums`) to prevent horizontal jitter during real-time data streaming.
- **Labels & Micro-Data**: Use uppercase tracking with `label-sm` for system categories, metric units, and status badges to anchor modules cleanly.
- **Hierarchical Discipline**: Reserve `display-lg` and `display-md` strictly for the primary dashboard focus (e.g., Sleep Score, Recovery Ratio, Total Active Calories).

## Layout & Spacing

Built strictly around an 8pt spatial cadence (with 4pt sub-divisions for tight component padding), the layout accommodates high-density mobile interfaces without visual clutter.

- **Grid Architecture**: Single-column vertical scroll with an internal 2-column or 4-column subdivision for compact split metrics (e.g., Water / Steps side-by-side).
- **Margins & Gutters**: Outer margin is standard `1rem` (16px) to maximize screen area on modern Android handhelds. Component-to-component gutters default to `0.75rem` (12px), reducing vertical scroll fatigue while maintaining container autonomy.
- **Vertical Rhythm**: Related metric groups are grouped within `space-sm` (8px) internal separations, while independent dashboard segments maintain `space-lg` (24px) structural clearance.

## Elevation & Depth

This system intentionally rejects diffused shadows, heavy skeuomorphism, and ambient colored glows. Depth is achieved exclusively through tonal stratification and precise surface containment.

- **Level 0 (Base)**: `#0B0B0D` canvas. The foundational viewport.
- **Level 1 (Card Resting)**: `#151518` bounded by a 1px solid stroke of `#2A2A30`. All metric tiles, habit lists, and performance rings exist on this tier.
- **Level 2 (Elevated & Floating)**: `#1D1D22` bounded by a 1px solid stroke of `#2A2A30`. Used for sticky action headers, floating navigation bars, and drag-to-dismiss bottom sheets.
- **Interactive Focus & Active State**: Tonal brightening combined with subtle edge ignition. When a tile or action triggers, the border transitions from `#2A2A30` to `#8F252D` or `#FF343D`.
- **Zero Blur Shadows**: No blur shadows are permitted except for a subtle, high-opacity directional occlusion (`0px 4px 12px rgba(0, 0, 0, 0.6)`) applied exclusively under elevated bottom sheets and popovers.

## Shapes

The geometry uses controlled architectural radii to present a serious, calibrated industrial feel.

- **Base Radius (`0.5rem` / 8px)**: Applied to input elements, small action chips, habit check markers, buttons, and segmented control segments.
- **Card Radius (`rounded-lg` / 1rem / 16px)**: Applied uniformly to all data cards, telemetry modules, and performance widgets.
- **Sheet Radius (`rounded-xl` / 1.5rem / 24px)**: Applied strictly to top corners of modal bottom sheets.
- **Metric Rings & Avatars**: Geometric circles (`50%` radius) reserved strictly for progress arcs, circular timers, habit completion wheels, and biometric dials.

## Components

### Buttons
- **Primary Action**: Solid `#FF343D` background, `#0B0B0D` typography (high contrast bold weight), 8px border radius, height 48px. Zero elevation shadow; transforms to `#8F252D` on touch press.
- **Secondary / Utility**: Surface `#1D1D22`, border 1px solid `#2A2A30`, text `#F5F5F7`. Pressed state darkens to `#151518` with stroke shifting to `#96969F`.
- **Destructive / Alert**: Surface transparent, border 1px solid `#8F252D`, text `#FF343D`.

### Metric & Habit Cards
- **Structure**: Surface `#151518`, border 1px solid `#2A2A30`, 16px padding, 16px corner radius.
- **Data Headers**: Metric title in `label-md` (`#96969F`), primary value in `display-md` (`#F5F5F7`), unit attached inline in `label-sm` (`#96969F`).
- **Telemetry Indicators**: Micro-sparklines and mini progress bars use track `#1D1D22` and active bar `#FF343D`.

### Checkboxes & Habit Nodes
- **Unchecked / Pending**: 24x24px rounded square (6px radius), background `#151518`, border 1px solid `#2A2A30`.
- **Active / Completed**: Background `#FF343D`, border `#FF343D`, interior glyph icon (1.5px stroke width) in `#0B0B0D`.
- **Streak Marker**: Micro-dots (6px circle) placed under habit labels. Active days `#FF343D`, missed days `#2A2A30`, current day hollow stroke.

### Input Fields
- **Container**: Surface `#151518`, border 1px solid `#2A2A30`, height 48px, horizontal padding 16px, corner radius 8px.
- **Typography**: Text input rendered in `body-md` (`#F5F5F7`), placeholder in `#96969F`.
- **Focus State**: Border shifts directly to `#FF343D`. No exterior halo or shadow.

### Chips & Filters
- **Default**: Surface `#151518`, border 1px solid `#2A2A30`, text `#96969F`, height 32px, corner radius 8px, font `label-md`.
- **Selected**: Surface `#8F252D` with low-opacity alpha tint or solid `#1D1D22` with border `#FF343D`, text `#F5F5F7`.

### Segmented Telemetry Pickers
- **Tray**: Background `#151518`, border 1px solid `#2A2A30`, padding 4px, corner radius 8px.
- **Active Segment**: Background `#1D1D22`, border 1px solid `#2A2A30`, text `#F5F5F7`, corner radius 6px.