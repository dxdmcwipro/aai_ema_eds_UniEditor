# Claims Page Migration Plan

## Overview

Migrate the AA Insurance Claims page (https://www.aainsurance.co.nz/claims) to AEM Edge Delivery Services with Universal Editor (xwalk) authoring support.

## Source Page

- **URL**: https://www.aainsurance.co.nz/claims
- **Title**: "Making a claim? Get started now | AA Insurance"
- **Type**: Claims landing page with hero, informational cards, and supporting content blocks

## Current Project State

- **Project type**: xwalk (Universal Editor)
- **Available blocks**: accordion, cards, cards-editorial, cards-product, carousel, columns, columns-badges, columns-feature, embed, footer, form, fragment, header, hero, hero-promo, modal, quote, search, table, tabs, video
- **Existing pages**: index.plain.html (homepage), nav.plain.html, footer.plain.html
- **Design tokens**: Fully extracted in styles.css

## Page Structure Analysis

### Section 1: Hero
- **Heading**: "Making a claim with us"
- **Description**: "Whether you've been in a car accident, lost your belongings or had your home damaged, we're here to help."
- **Body text**: "Simply report your claim now, and a member of our team will be in touch as soon as possible."
- **CTA Button**: "Start a claim"
- **Image**: Couple with mobile device
- **Block mapping**: `hero` or `hero-promo` (reuse existing)

### Section 2: Claim Info Cards (3 cards)
- **Car claims** — Details about repair guarantees → `/claims/car-insurance-claims`
- **Contents claims** — Item assessment and replacement → `/claims/contents-insurance-claims`
- **Home claims** — Temporary accommodation provisions → `/claims/home-insurance-claims`
- **Block mapping**: `cards-editorial` (reuse existing — image + title + description + CTA link)

### Section 3: Supporting Information (3 columns)
- **Excesses** — Pay an excess info → `/claims/insurance-excesses`
- **Centre & Repairer Locator** — Find service centers → `/contact/centre-repairer-locator`
- **Fair Insurance Code** — Insurance Council membership → `/about-us/fair-insurance-code`
- **Block mapping**: `columns-feature` (reuse existing — icon/title + description + link)

### Section 4: Metadata
- **Title**: Making a claim? Get started now | AA Insurance
- **Description**: Claims page meta description

## Block Reuse Assessment

| Section | Existing Block | New Variant Needed? |
|---------|---------------|---------------------|
| Hero | `hero-promo` | No — reuse as-is |
| Claim cards | `cards-editorial` | No — same structure (image + text + CTA) |
| Supporting info | `columns-feature` | No — same structure (title + text + link) |
| Metadata | `metadata` | No — standard |

**All sections can be mapped to existing blocks. No new block variants required.**

## Checklist

- [ ] Fetch full page content and identify exact DOM selectors
- [ ] Create `content/claims.plain.html` using existing block classes (`hero-promo`, `cards-editorial`, `columns-feature`)
- [ ] Download and place hero image in DAM folder
- [ ] Download and place card images in DAM folder
- [ ] Structure HTML with proper EDS sections and field hints
- [ ] Add metadata block with correct title and description
- [ ] Verify page renders correctly in local preview
- [ ] Confirm all block class names exist in `component-definition.json`
- [ ] Test mobile responsive layout

## Execution

This plan requires **Execute mode** to implement. Switch to Execute mode to proceed with the claims page migration.
