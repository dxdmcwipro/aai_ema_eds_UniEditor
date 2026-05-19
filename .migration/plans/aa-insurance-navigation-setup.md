# Navigation Setup Plan for AA Insurance NZ

## Overview

Set up the navigation structure for the AA Insurance NZ site (https://www.aainsurance.co.nz/) in this AEM Edge Delivery Services xwalk project.

## Current State

- **Project type**: xwalk (AEM author-based, markup delivery)
- **Header block**: Already exists (`blocks/header/header.js` + `header.css`) with standard EDS nav pattern (brand, sections, tools)
- **Nav content**: No `nav.html` file exists yet in `/content/`
- **Source site**: https://www.aainsurance.co.nz/

## Approach

Use the `excat:excat-navigation-expert` skill to:
1. Analyze the AA Insurance NZ site's navigation structure (top-level items, dropdowns, mega-menus)
2. Create a `nav.html` file in the content directory matching EDS conventions (brand section, nav sections with links, tools section)
3. Verify the navigation renders correctly in the local preview server

## Key Considerations

- The header block expects a fragment at `/nav` with 3 sections: brand, sections (main nav links), and tools
- The xwalk project serves content from AEM author — the nav.html needs proper EDS structure
- Need to capture the AA Insurance NZ primary navigation items and any dropdown/mega-menu hierarchies
- Logo/brand asset needs to be downloaded and placed in the content DAM folder

## Checklist

- [ ] Analyze the AA Insurance NZ website navigation (top bar, main nav items, dropdowns, CTAs)
- [ ] Download and place the AA Insurance NZ logo/brand asset
- [ ] Create `nav.html` with proper EDS structure (brand, sections, tools)
- [ ] Populate navigation links matching the source site's menu structure
- [ ] Verify navigation renders in the local preview server
- [ ] Confirm mobile hamburger menu works correctly
- [ ] Style adjustments if needed to match the AA Insurance brand

## Execution

This plan requires **Execute mode** to implement. Switch to Execute mode to proceed with the navigation setup using the navigation expert skill.
