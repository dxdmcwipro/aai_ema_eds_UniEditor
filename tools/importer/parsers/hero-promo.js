/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-promo
 * Base block: hero
 * Source: https://www.aainsurance.co.nz/
 * Generated: 2026-05-19
 *
 * UE Model fields: image (reference), imageAlt (collapsed), text (richtext)
 * Structure: Simple block - 2 rows (image, text)
 *
 * Source DOM structure:
 *   .hero-abl > .hero-abl-backdrop > picture (background image)
 *   .hero-abl > .hero-abl-main > .hero-abl-header-container > ... > h1 (heading)
 *   .hero-abl > .hero-abl-main > .hero-abl-card-container > .hero-abl-card > .hero-abl-card-links (CTA buttons)
 *   .hero-abl > .hero-abl-main > .hero-abl-card-container > .hero-abl-card > .hero-abl-card-main (promo text)
 */
export default function parse(element, { document }) {
  // Row 1: Background image
  const picture = element.querySelector('.hero-abl-backdrop picture, .hero-abl-backdrop img');

  // Row 2: Text content (heading + CTAs + promo text)
  // Extract heading
  const heading = element.querySelector('.hero-abl-header h1, .hero-abl-header-container h1, h1');

  // Extract CTA buttons - only direct card-link buttons, not modal content
  const ctaLinks = Array.from(
    element.querySelectorAll('.hero-abl-card-links > .hero-abl-card-link > a.button')
  );

  // Extract promo text content
  const promoContent = element.querySelector('.hero-abl-card-main .hero-abl-card-content, .hero-abl-card-main');

  // Build text cell content with field hint
  const textFragment = document.createDocumentFragment();
  textFragment.appendChild(document.createComment(' field:text '));

  if (heading) {
    const h1 = document.createElement('h1');
    h1.textContent = heading.textContent.trim();
    textFragment.appendChild(h1);
  }

  // Add CTA buttons as paragraph with links
  if (ctaLinks.length > 0) {
    const ctaParagraph = document.createElement('p');
    ctaLinks.forEach((link) => {
      const a = document.createElement('a');
      a.href = link.href || link.getAttribute('href');
      const labelEl = link.querySelector('.button--label__text');
      a.textContent = labelEl ? labelEl.textContent.trim() : link.textContent.trim();
      ctaParagraph.appendChild(a);
      ctaParagraph.appendChild(document.createTextNode(' '));
    });
    textFragment.appendChild(ctaParagraph);
  }

  // Add promo text paragraphs (may be direct children or nested in .hero-abl-card-content)
  if (promoContent) {
    const paragraphs = promoContent.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (p.textContent.trim()) {
        const newP = document.createElement('p');
        // Preserve links and formatting within the paragraph
        newP.innerHTML = p.innerHTML;
        textFragment.appendChild(newP);
      }
    });
  }

  // Build image cell with field hint
  const imageFragment = document.createDocumentFragment();
  imageFragment.appendChild(document.createComment(' field:image '));
  if (picture) {
    imageFragment.appendChild(picture.cloneNode(true));
  }

  // Build cells array: simple block with 2 rows (image, text)
  const cells = [
    [imageFragment],
    [textFragment],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-promo', cells });
  element.replaceWith(block);
}
