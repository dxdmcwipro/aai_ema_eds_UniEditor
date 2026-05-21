# Debug Footer CSS Not Applied

## Problem

The footer block's CSS (`blocks/footer/footer.css`) is not being applied. The footer HTML content loads but appears unstyled.

## Root Cause Analysis

The CSS selectors target `footer .footer > div` which expects the footer content divs to be direct children of the `.footer` element. However, the actual rendered DOM has an extra nesting level because:

1. **footer.js** creates a wrapper `<div>` and appends fragment children to it
2. **loadFragment()** calls `decorateMain()` which wraps content in `.section` divs with `.default-content-wrapper` inside
3. The dev server also injects `<meta>`, `<script>`, `<link>` elements into the fragment response (same issue fixed in header.js)

**Expected DOM structure (what CSS targets):**
```
footer > .footer.block > div > [4 link columns]
footer > .footer.block > div > [social links]  
footer > .footer.block > div > [legal links]
```

**Actual DOM structure:**
```
footer > .footer.block > div(wrapper) > meta/script (injected) > .section > .default-content-wrapper > [content]
```

The CSS selector `footer .footer > div` matches the wrapper div but `footer .footer > div:first-child` doesn't match the content sections because the actual link column divs are inside `.section > .default-content-wrapper`, not direct children of `.footer`.

## Fix Strategy

Update `blocks/footer/footer.js` to:
1. Filter out non-DIV elements (meta/script/link) from the fragment — same fix applied to header.js
2. Properly unwrap section containers so footer content divs become direct children of the block

## Checklist

- [ ] Update `blocks/footer/footer.js` to filter fragment children (skip injected meta/script/link elements from dev server)
- [ ] Ensure the footer content sections are unwrapped from `.section` wrappers so the 3 top-level divs become direct children
- [ ] Verify CSS selectors `footer .footer > div`, `footer .footer > div:first-child`, `footer .footer > div:nth-child(2)`, `footer .footer > div:last-child` all match correctly
- [ ] Test the footer renders with yellow background, 4-column layout, social links centered, and legal links at bottom

## Execution

This plan requires **Execute mode** to implement the footer.js fix.
