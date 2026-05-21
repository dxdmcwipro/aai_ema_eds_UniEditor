# Debug Header CSS Not Applied

## Problem

The header/navigation CSS styles are not being applied on both local preview and AEM author environments.

## Root Cause

The header block JavaScript (`blocks/header/header.js`) crashes during decoration at line 196:

```javascript
const brandLink = navBrand.querySelector('.button');
if (brandLink) {
  brandLink.className = '';
  brandLink.closest('.button-container').className = '';  // <-- crashes here
}
```

When `brandLink` exists but its parent doesn't have the `.button-container` class, `.closest('.button-container')` returns `null`, and calling `.className` on `null` throws a TypeError.

**Why it affects visibility:** In `styles/styles.css` (lines 82-89):
```css
header .header,
footer .footer {
  visibility: hidden;
}

header .header[data-block-status="loaded"],
footer .footer[data-block-status="loaded"] {
  visibility: visible;
}
```

When the JS throws an error, the block never reaches `data-block-status="loaded"`, so the header stays `visibility: hidden`.

**Secondary issue on AEM author:** The nav fragment response from AEM doesn't wrap links in `.button-container` divs like the DA editor does, so the querySelector finds a `.button` element but `.closest('.button-container')` returns null.

## Fix Strategy

Add null checks in `header.js` to prevent the crash when `.button-container` doesn't exist, ensuring the block decoration completes and `data-block-status="loaded"` is set.

## Checklist

- [ ] Fix `header.js` line 196-199: Add null check for `.closest('.button-container')` to prevent TypeError
- [ ] Verify the header block completes decoration (reaches `data-block-status="loaded"`)
- [ ] Confirm yellow background and navigation items are visible after fix
- [ ] Test on both local dev server and confirm no JS errors in console

## Execution

This plan requires **Execute mode** to implement the fix.
