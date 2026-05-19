# AA Insurance Homepage Migration Plan

## Overview

Migrate the AA Insurance homepage (https://www.aainsurance.co.nz/) to AEM Edge Delivery Services. This is a xwalk project with content served from AEM author.

## Source Page

- **URL**: https://www.aainsurance.co.nz/
- **Type**: Homepage with hero banner, product grid, trust badges, and promotional cards

## Current Project State

- **Project type**: xwalk (AEM author-based, markup delivery)
- **Navigation**: Already set up with AA Insurance brand styling
- **Available blocks**: accordion, cards, carousel, columns, embed, footer, form, fragment, header, hero, modal, quote, search, table, tabs, video
- **Import infrastructure**: Not yet created (no parsers/transformers in tools/)

## Approach

Use the `excat:excat-site-migration` skill to orchestrate the full migration workflow:

1. **Page Analysis** — Analyze the homepage structure (hero, sections, blocks, content)
2. **Block Mapping** — Map source page elements to available EDS blocks
3. **Import Infrastructure** — Generate parsers and transformers for the content
4. **Content Import** — Execute the import to produce the homepage HTML
5. **Verification** — Preview the migrated page and validate rendering

## Key Content Sections Identified

Based on analysis of the source site:
1. **Notification banner** — Alert/info bar at top
2. **Hero section** — Promotional banner with heading, CTA buttons, and promo code
3. **Product grid** — Insurance product tiles (Car, Home, Contents, Landlord, etc.)
4. **Awards section** — Trust badges and award recognition
5. **Promotional cards** — Scam alert, Home Buyer's Guide, Sustainability
6. **Why choose AA Insurance** — Three feature cards (trust, customer-first, claims)
7. **Trust footer** — Fair Insurance Code, Writemark, Financial Strength Rating

## Block Mapping (Preliminary)

| Source Section | EDS Block | Notes |
|---|---|---|
| Hero banner | `hero` | Image + heading + CTAs |
| Product grid | `cards` | Product tiles with icons |
| Awards | `columns` or default content | Badge images |
| Promo cards | `cards` or `carousel` | Multiple feature cards |
| Why choose us | `columns` | Icon + heading + text columns |
| Trust badges | `columns` | Three items in a row |

## Checklist

- [ ] Analyze the AA Insurance homepage structure and content
- [ ] Create page template skeleton for the homepage
- [ ] Map DOM selectors to block variants
- [ ] Generate import parsers for each block variant
- [ ] Generate page transformers (cleanup + sections)
- [ ] Build and execute the import script
- [ ] Verify imported HTML renders correctly in preview
- [ ] Fix any rendering issues or missing content
- [ ] Confirm visual parity with the source page

## Execution

This plan requires **Execute mode** to implement. Switch to Execute mode to proceed with the homepage migration using the site migration skill.
