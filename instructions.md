# AEM Edge Delivery Services - Universal Editor Migration Instructions

## Overview

This document provides comprehensive instructions and guardrails for migrating any website to AEM Edge Delivery Services (EDS) with Universal Editor (xwalk) authoring support. Follow these rules to ensure content renders correctly in preview AND is fully editable in the Universal Editor.

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│ Universal Editor (Authoring)                     │
│   - Authors edit blocks visually                 │
│   - Properties panel shows model fields          │
│   - Content stored as JCR nodes in AEM Author    │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ Franklin Delivery Servlet                        │
│   - Converts JCR → plain.html                    │
│   - Applies field hinting for cell mapping       │
│   - Serves via *.aem.page / *.aem.live           │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ EDS Frontend (Rendering)                         │
│   - scripts/aem.js decorates blocks              │
│   - blocks/*/block.js + block.css                │
│   - styles/styles.css for global design          │
└─────────────────────────────────────────────────┘
```

---

## Key Configuration Files

| File | Purpose | Location |
|------|---------|----------|
| `component-definition.json` | Registers blocks in UE insert panel | Project root |
| `component-models.json` | Defines editable fields per block | Project root |
| `component-filters.json` | Controls allowed child components | Project root |
| `fstab.yaml` | Mountpoint config (type: markup for xwalk) | Project root |
| `paths.json` | URL path mappings | Project root |
| `content/*.plain.html` | Delivered page content | content/ |
| `content/nav.plain.html` | Navigation fragment | content/ |
| `content/footer.plain.html` | Footer fragment | content/ |
| `blocks/*/block.js` | Block JavaScript decoration | blocks/ |
| `blocks/*/block.css` | Block-specific styling | blocks/ |
| `styles/styles.css` | Global styles and CSS variables | styles/ |

---

## Block Types

### 1. Simple Blocks (Single Content Area)

Examples: Hero, Embed, Quote, Fragment

**HTML Structure:**
```html
<div class="hero-promo">
  <div>
    <div><!-- field:image --><picture><img src="/content/dam/site/hero.jpg" alt="Hero"></picture></div>
  </div>
  <div>
    <div><!-- field:text --><h1>Heading</h1><p>Description text</p><p><a href="/page">CTA Link</a></p></div>
  </div>
</div>
```

**Model Definition:**
```json
{
  "id": "hero-promo",
  "fields": [
    { "component": "reference", "name": "image", "label": "Background Image", "valueType": "string" },
    { "component": "richtext", "name": "text", "label": "Content", "valueType": "string" }
  ]
}
```

**Rules:**
- Each row = one field
- Each row has one cell (or two for key-value blocks)
- Field hints (`<!-- field:xxx -->`) map cells to model fields

---

### 2. Container Blocks (Repeating Items)

Examples: Cards, Carousel, Accordion, Tabs

**HTML Structure:**
```html
<div class="cards-editorial">
  <div>
    <div><!-- field:image --><picture><img src="/content/dam/site/card1.jpg" alt=""></picture></div>
    <div><!-- field:text --><h6>Card Title</h6><p>Description</p><p><a href="/link">Learn more</a></p></div>
  </div>
  <div>
    <div><!-- field:image --><picture><img src="/content/dam/site/card2.jpg" alt=""></picture></div>
    <div><!-- field:text --><h6>Card Title 2</h6><p>Description</p><p><a href="/link">Read more</a></p></div>
  </div>
</div>
```

**Model Definition (for the item, not the container):**
```json
{
  "id": "card",
  "fields": [
    { "component": "reference", "name": "image", "label": "Card Image", "valueType": "string" },
    { "component": "richtext", "name": "text", "label": "Card Content", "valueType": "string" }
  ]
}
```

**Filter Definition:**
```json
{
  "id": "cards-editorial",
  "components": ["card"]
}
```

**Rules:**
- Each row = one item (card, slide, tab)
- Each cell within a row = one field of that item
- The container block uses a `filter` to specify which item component is allowed
- Field hints go inside each cell

---

### 3. Columns Blocks (Side-by-Side Layout)

Examples: Columns, Columns Feature, Columns Badges

**HTML Structure:**
```html
<div class="columns-feature">
  <div>
    <div><h6>Column 1 Title</h6><p>Text</p><p><a href="/link">Link</a></p></div>
    <div><h6>Column 2 Title</h6><p>Text</p><p><a href="/link">Link</a></p></div>
    <div><h6>Column 3 Title</h6><p>Text</p><p><a href="/link">Link</a></p></div>
  </div>
</div>
```

**Component Definition:**
```json
{
  "title": "Columns Feature",
  "id": "columns-feature",
  "plugins": {
    "xwalk": {
      "page": {
        "resourceType": "core/franklin/components/columns/v1/columns",
        "template": {
          "columns": "3",
          "rows": "1"
        }
      }
    }
  }
}
```

**Rules:**
- Columns blocks do NOT use `<!-- field:xxx -->` hints
- They use positional mapping (first div = col 1, second div = col 2, etc.)
- Use `resourceType: "core/franklin/components/columns/v1/columns"`
- Specify column count and row count in the template

---

### 4. Default Content (No Block Wrapper)

Content that lives directly in a section without a block table:

```html
<div>
  <h2>Section Heading</h2>
  <p>Introductory paragraph text.</p>
  <p><picture><img src="/content/dam/site/image.jpg" alt=""></picture></p>
</div>
```

**Rules:**
- No class on the outer `<div>` (it's a plain section)
- Uses standard semantic HTML elements
- Authors edit these with the default text/image/button components
- Registered in component-definition.json under the "Default Content" group

---

## Field Hinting Rules

### When to Use Field Hints

| Block Type | Field Hints Required? |
|------------|----------------------|
| Simple blocks (hero, embed, quote) | YES |
| Container block items (cards, accordion) | YES |
| Columns blocks | NO (positional) |
| Default content | NO (inline editing) |

### Field Hint Syntax

```html
<div><!-- field:fieldName -->Content here</div>
```

- The comment MUST be the first child of the cell `<div>`
- The `fieldName` must match the `"name"` in the model's fields array
- One field hint per cell only
- No spaces around the field name: `<!-- field:image -->` (correct)

### Common Field Mappings

| Model Field Name | Content Type | Example |
|-----------------|--------------|---------|
| `image` | DAM reference | `<!-- field:image --><picture><img src="..."></picture>` |
| `text` | Rich text | `<!-- field:text --><h1>Title</h1><p>Text</p>` |
| `link` | URL | `<!-- field:link --><a href="/page">Link Text</a>` |
| `title` | Plain text | `<!-- field:title -->Heading Text` |

---

## Component Definition Rules

### Block Registration

```json
{
  "title": "Human-Readable Name",
  "id": "kebab-case-id",
  "plugins": {
    "xwalk": {
      "page": {
        "resourceType": "core/franklin/components/block/v1/block",
        "template": {
          "name": "Block Name",
          "model": "model-id",
          "filter": "filter-id"
        }
      }
    }
  }
}
```

### Naming Conventions

| Property | Convention | Example |
|----------|-----------|---------|
| `id` | kebab-case | `cards-product` |
| `title` | Title Case | `Cards Product` |
| `name` (in template) | Title Case with spaces | `Cards Product` |
| CSS class (rendered) | kebab-case | `.cards-product` |

### Critical Rule: Name → Class Mapping

The `"name"` in the template becomes the CSS class on the rendered block:
- `"name": "Hero Promo"` → `<div class="hero-promo">` 
- `"name": "Cards Editorial"` → `<div class="cards-editorial">`
- `"name": "Columns Feature"` → `<div class="columns-feature">`

**NEVER use parentheses, special characters, or spaces in class names.**

---

## Model Field Components Reference

| Component | Description | ValueType | Use Case |
|-----------|-------------|-----------|----------|
| `text` | Single-line input | `string` | Titles, labels |
| `richtext` | Multi-line with formatting | `string` | Body content, descriptions |
| `reference` | DAM asset picker | `string` | Images, documents |
| `aem-content` | AEM page reference | `string` | Internal links |
| `select` | Dropdown | `string` | Options, variants |
| `boolean` | Checkbox/toggle | `boolean` | Show/hide flags |
| `number` | Numeric input | `number` | Counts, dimensions |
| `date` | Date picker | `string` | Dates |
| `aem-tag` | Tag picker | `string` | Categorization |

### Multi-value Fields

Add `"multi": true` for fields that accept multiple values (e.g., multiple images).

---

## HTML Content Rules

### DO

- Use semantic HTML (h1-h6, p, ul/ol, a, strong, em)
- Use `<picture><img>` for images
- Reference images from DAM: `/content/dam/{site-name}/image.jpg`
- Keep block HTML flat (avoid deep nesting)
- Use `<a href="...">` for links (not buttons)
- Include alt text on all images
- End every page with a metadata block

### DO NOT

- Use inline styles (`style="..."`)
- Use custom HTML attributes or data attributes
- Use `<div>` for text content (use `<p>`)
- Nest blocks inside other blocks
- Use external image URLs (always use DAM paths)
- Use parentheses in block class names: `cards (product)` ← WRONG
- Use JavaScript in content HTML
- Include `<script>` or `<link>` tags in content

---

## Page Structure

Every page follows this structure:

```html
<!-- Section 1 -->
<div>
  <div class="block-name">
    <!-- block content -->
  </div>
</div>

<!-- Section 2 -->
<div>
  <h2>Default content heading</h2>
  <p>Default content paragraph</p>
</div>

<!-- Section 3 -->
<div>
  <div class="another-block">
    <!-- block content -->
  </div>
</div>

<!-- Metadata (always last) -->
<div>
  <div class="metadata">
    <div><div>Title</div><div>Page Title Here</div></div>
    <div><div>Description</div><div>Page description here</div></div>
  </div>
</div>
```

### Section Rules

- Each top-level `<div>` = one section
- A section can contain ONE block + optional default content before it
- OR a section can contain only default content (no block)
- The metadata block is always the last section
- Use `section-metadata` block for section styling:
  ```html
  <div class="section-metadata">
    <div><div>style</div><div>highlight</div></div>
  </div>
  ```

---

## Navigation (nav.plain.html)

The standard EDS header block expects exactly 3 sections:

```html
<!-- Section 1: Brand -->
<div>
  <p><a href="/"><picture><img src="/content/dam/site/logo.svg" alt="Site Name" width="184" height="64"></picture></a></p>
</div>

<!-- Section 2: Nav Sections (dropdowns) -->
<div>
  <ul>
    <li>
      <p>Dropdown Label</p>
      <ul>
        <li><a href="/page1">Link 1</a></li>
        <li><a href="/page2">Link 2</a></li>
      </ul>
    </li>
    <li><a href="/simple-link">Simple Link</a></li>
  </ul>
</div>

<!-- Section 3: Tools -->
<div>
  <p><a href="/action1">Action 1</a></p>
  <p><a href="/action2">Action 2</a></p>
</div>
```

### Navigation Rules

- Bold text (`<p>`) without a link = dropdown label (gets `nav-drop` class)
- Nested `<ul>` under a dropdown label = dropdown content
- Simple `<li><a>` = standalone nav link
- Tools section items = utility links (login, search, CTA)

---

## Footer (footer.plain.html)

Footer content structured as sections:

```html
<!-- Link columns -->
<div>
  <div>
    <h6>Column Heading</h6>
    <ul>
      <li><a href="/link1">Link 1</a></li>
      <li><a href="/link2">Link 2</a></li>
    </ul>
  </div>
  <div>
    <h6>Column 2 Heading</h6>
    <ul>
      <li><a href="/link3">Link 3</a></li>
    </ul>
  </div>
</div>

<!-- Social / Legal -->
<div>
  <p><a href="https://facebook.com/page">Facebook</a> <a href="https://twitter.com/page">Twitter</a></p>
</div>

<!-- Copyright -->
<div>
  <p>&copy; Company Name 2026</p>
</div>
```

---

## Image Handling

### DAM Path Convention

```
/content/dam/{site-folder-name}/{image-name}.{ext}
```

Example: `/content/dam/sunaaiunieds/hero-banner.jpg`

### Image in HTML

Always wrap in `<picture>`:
```html
<picture><img src="/content/dam/sunaaiunieds/hero.jpg" alt="Description" width="1920" height="600"></picture>
```

### Image Sizing

- Include `width` and `height` attributes for CLS optimization
- Use descriptive `alt` text
- The EDS framework handles responsive delivery automatically

---

## CSS Variables (Design Tokens)

Define global design tokens in `styles/styles.css`:

```css
:root {
  /* colors */
  --background-color: #fff;
  --text-color: #262626;
  --link-color: #0d59bf;
  --link-hover-color: #09438f;
  --brand-color: #ffd400;
  --light-color: #f2f1ed;
  --dark-color: #595959;
  --border-color: #dad9d5;

  /* fonts */
  --body-font-family: arial, sans-serif;
  --heading-font-family: arial, sans-serif;

  /* sizes */
  --body-font-size-m: 16px;
  --body-font-size-s: 14px;
  --body-font-size-xs: 12px;

  /* layout */
  --nav-height: 64px;
  --header-height: var(--nav-height);
}
```

---

## Migration Workflow Checklist

### Phase 1: Setup
- [ ] Verify project type is xwalk (`fstab.yaml` has `type: "markup"`)
- [ ] Confirm `.migration/project.json` has correct site paths
- [ ] Extract design tokens from source site CSS into `styles/styles.css`

### Phase 2: Content Structure
- [ ] Identify all page sections and block types from source
- [ ] Map source components to EDS block types (hero, cards, columns, etc.)
- [ ] Create block folders (`blocks/{block-name}/`)
- [ ] Write block JS decoration and CSS styling

### Phase 3: Component Configuration
- [ ] Register all blocks in `component-definition.json`
- [ ] Define models in `component-models.json`
- [ ] Define filters in `component-filters.json` (for container blocks)
- [ ] Verify name/id/class consistency across all files

### Phase 4: Content Migration
- [ ] Create `content/nav.plain.html` (3-section structure)
- [ ] Create `content/footer.plain.html`
- [ ] Create page content files (`content/index.plain.html`, etc.)
- [ ] Ensure all images use DAM paths
- [ ] Add field hints to block cells
- [ ] Include metadata block on every page

### Phase 5: Validation
- [ ] Test md2jcr conversion (no null errors)
- [ ] Verify blocks render in local preview
- [ ] Test Universal Editor can open and edit each block
- [ ] Confirm all field types work (text, richtext, reference)
- [ ] Test mobile responsive behavior

---

## Common Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot read properties of null (reading 'name')` | Block class name not in component-definition.json | Register the block or fix the class name (no parentheses) |
| Block invisible after load | JS error prevents `data-block-status="loaded"` | Add null checks in block JS |
| Fields not editable in UE | Missing or mismatched model definition | Ensure model `id` matches component template `model` |
| Images show as broken links | SVG/image not in DAM | Upload assets to `/content/dam/{site}/` |
| Styles not applying | CSS file not loading for block | Ensure `blocks/{name}/{name}.css` exists and matches class |
| Navigation empty | Fragment load fails | Check `content/nav.plain.html` exists and is valid HTML |
| Footer not styled | Section wrappers adding extra nesting | Unwrap `.section > .default-content-wrapper` in footer.js |

---

## File Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Block folder | kebab-case | `blocks/hero-promo/` |
| Block JS | Same as folder | `blocks/hero-promo/hero-promo.js` |
| Block CSS | Same as folder | `blocks/hero-promo/hero-promo.css` |
| Content pages | kebab-case | `content/about-us.plain.html` |
| DAM images | kebab-case | `/content/dam/site/hero-banner.jpg` |
| Component IDs | kebab-case | `hero-promo`, `cards-editorial` |

---

## Quick Reference: Block Table to HTML

**What authors see in Word/Sheets (conceptual):**

| Hero Promo | |
|---|---|
| ![image](/content/dam/site/hero.jpg) | |
| # Heading<br>Description<br>[CTA Link](/page) | |

**What gets delivered as HTML:**

```html
<div class="hero-promo">
  <div><div><!-- field:image --><picture><img src="/content/dam/site/hero.jpg" alt=""></picture></div></div>
  <div><div><!-- field:text --><h1>Heading</h1><p>Description</p><p><a href="/page">CTA Link</a></p></div></div>
</div>
```

**What the block JS transforms it into (for rendering):**

Depends on `blocks/hero-promo/hero-promo.js` — this is where you add classes, restructure DOM, add interactivity.

---

## Summary of Critical Guardrails

1. **Block names must be kebab-case** — no parentheses, no spaces in CSS classes
2. **Every block needs a component-definition entry** — or md2jcr fails
3. **Field hints are required for simple/container blocks** — except columns
4. **Images must use DAM paths** — not external URLs
5. **One block per section maximum** — plus optional default content
6. **Metadata block always last** — on every page
7. **Null-safe JS** — always check elements exist before accessing properties
8. **No inline styles** — use CSS files only
9. **Test md2jcr before publishing** — catch null errors early
10. **Keep HTML semantic and flat** — the simpler the structure, the better UE handles it
