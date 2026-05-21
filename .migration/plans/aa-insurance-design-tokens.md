# Extract Design Tokens from AA Insurance NZ

## Overview

Extract comprehensive design tokens (colors, typography, spacing, breakpoints, shadows, border-radii) from the AA Insurance NZ source site CSS and compare against what's already configured in `styles/styles.css`. Identify any missing tokens from the source site's CSS (`styles.20be096a360666d95849.css`).

## Current State

The project's `styles/styles.css` already has design tokens partially extracted:
- **Colors**: brand (#ffd400), text (#262626), link (#0d59bf), hover (#09438f), light (#f2f1ed), dark (#595959), border (#dad9d5)
- **Fonts**: Arial, sans-serif (body + headings)
- **Body sizes**: 16px / 14px / 12px
- **Heading sizes**: 40px down to 16px (with 48px at desktop)
- **Nav heights**: 64px mobile, 96px desktop

## Missing Tokens from Source CSS

Based on the source site's CSS analysis, these tokens are NOT yet captured:

### Colors Missing
| Token | Value | Usage |
|-------|-------|-------|
| Brand blue light | `#bdd9ff` | Highlight backgrounds, selected states |
| Info blue | `#e9f2ff` | Notification backgrounds, blue tints |
| Yellow light | `#fff4bf` | Highlighted table cells |
| Yellow warm | `#ffe97f` | Active highlights |
| Gray subtle | `#faf9f5` | Alternating row backgrounds |
| Gray mid | `#9b9a96` | Disabled text, placeholders |
| Gray border light | `#c0bfbb` | Input borders |
| Error red | `#ee6363` | Error states, alerts |
| Success green | `#56bc6a` | Live/active indicators |

### Typography Missing
| Token | Value | Usage |
|-------|-------|-------|
| Heading font (H1 only) | `fs_lola_web, fs_lola_arial_fallback, sans-serif` | H1 headings use custom bold font |
| H1 mobile size | `2.5rem` (40px) | H1 on mobile |
| H1 desktop size | `3rem` (48px) | H1 on desktop |
| H2 mobile size | `1.75rem` (28px) | H2 on mobile |
| H2 desktop size | `2rem` (32px) | H2 on desktop |
| H3 size | `1.5rem` (24px) | H3 all viewports |
| H4 size | `1.25rem` (20px) | H4 all viewports |
| H5 size | `1.125rem` (18px) | H5 all viewports |
| H6 size | `1rem` (16px) | H6 all viewports |
| Line height body | `1.5rem` | Body text |
| Line height headings | `1.2` | All headings |

### Spacing Missing
| Token | Value | Usage |
|-------|-------|-------|
| Padding mobile | `16px` | Content padding on mobile |
| Padding tablet/desktop | `24px` | Content padding 576px+ |
| Section gap mobile | `40px` | Spacing between content sections |
| Section gap desktop | `80px` | Spacing between content sections on desktop |
| Max width | `1200px` | Container max-width |
| Max width xl | `1152px` | Container at 1200px+ breakpoint |
| Card gap | `24px` | Grid gap for card layouts |
| Button padding | `12px 24px` | Standard button padding |
| Button border-radius | `8px` | Rounded button corners |
| Icon circle size | `64px` | Product icon circle diameter |

### Breakpoints Missing
| Token | Value | Usage |
|-------|-------|-------|
| SM | `576px` | Small devices |
| MD | `769px` | Tablets |
| MDLG | `896px` | Large tablets |
| LG | `992px` | Desktop (nav breakpoint) |
| XL | `1200px` | Large desktop |

### Shadows Missing
| Token | Value | Usage |
|-------|-------|-------|
| Card shadow | `0 3px 3px -2px rgba(0,0,0,0.2), 0 3px 4px rgba(0,0,0,0.1), 0 1px 8px rgba(0,0,0,0.1)` | Card elevated state |
| Icon circle shadow | `0 0 2px rgba(0,0,0,0.1), 0 2px 10px rgba(34,43,56,0.25)` | Product icon circles |
| Dropdown shadow | `0 2px 5px rgba(0,0,0,0.2)` | Dropdown menus |
| Nav mega-menu shadow | `-2px 3px 5px rgba(0,0,0,0.2)` | Desktop mega menu |

### Border Radii Missing
| Token | Value | Usage |
|-------|-------|-------|
| Button radius | `8px` | Buttons |
| Card radius | `16px` | Cards with shadow |
| Input radius | `4px` | Form inputs, tooltips |
| Hero card radius | `16px 16px 0 0` | Hero content card |
| Circle | `50%` | Icons, avatars |

## Checklist

- [ ] Add missing color variables to `:root` in styles.css
- [ ] Add H1 custom font-family (`fs_lola_web`) with @font-face declaration
- [ ] Add missing typography variables (line-heights, responsive heading sizes)
- [ ] Add spacing/layout variables (padding, max-width, gaps)
- [ ] Add breakpoint reference comments
- [ ] Add shadow variables
- [ ] Add border-radius variables
- [ ] Verify button styles match source (8px radius, 12px 24px padding, #0d59bf blue)
- [ ] Update heading styles to use source's exact font sizes and line heights
- [ ] Test that existing blocks still render correctly after token updates

## Execution

This plan requires **Execute mode** to update `styles/styles.css` with the complete design token set.
