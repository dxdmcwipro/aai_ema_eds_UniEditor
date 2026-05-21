# Migrate Navigation Structure from AA Insurance NZ

## Overview

The navigation from the AA Insurance NZ site (https://www.aainsurance.co.nz/) has already been migrated to `content/nav.plain.html` with the EDS 3-section structure. However, the current nav is a simplified version that flattens the source site's multi-level mega-menu into a single dropdown per category. The original site has a deeper hierarchy with sub-menus (Car & Vehicle, Home & Contents, Small Business, More Insurance) inside "Our Insurance", plus grouped claim types under "Claim".

## Current State

The `content/nav.plain.html` already exists with:
- **Brand**: AA Insurance SVG logo
- **Sections**: 3 top-level items (Our Insurance, Manage Policy, Claim) with flat dropdown lists
- **Tools**: Help & Contact, Login, Get a Quote

The header block (`blocks/header/header.js`) has been fixed to handle dev server quirks and null checks.

## What Needs To Be Done

The navigation is already migrated and functional. No further action is required unless the structure needs to be reorganized to better match the source site's mega-menu hierarchy (which isn't supported by the standard EDS header block without custom JS).

## Checklist

- [x] Analyze the AA Insurance NZ source navigation structure
- [x] Create `content/nav.plain.html` with EDS 3-section format (brand, sections, tools)
- [x] Populate brand section with AA Insurance logo
- [x] Populate nav sections with Our Insurance, Manage Policy, Claim dropdowns
- [x] Populate tools section with Help & Contact, Login, Get a Quote
- [x] Fix header.js to handle dev server element injection (DIV filter)
- [x] Fix header.js null check for `.button-container` crash
- [x] Update header.css with AA Insurance brand styling (yellow background, 96px desktop height, responsive padding)
- [ ] (Optional) Enhance header.js with mega-menu support for multi-level sub-navigation
- [ ] (Optional) Add search icon and phone icon to tools section to match source header image

## Status

Navigation migration is **complete**. The nav renders with yellow background, logo, 3 dropdown menus, and utility links. Optional enhancements (mega-menu, icon buttons) would require custom JavaScript beyond the standard EDS header block.
