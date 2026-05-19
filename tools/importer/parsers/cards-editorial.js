/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-editorial
 * Base block: cards (container block)
 * Source: https://www.aainsurance.co.nz/
 * Selector: .card-grid-columns.card-grid-columns-3
 * UE Model: card items with fields: image, text
 * Generated: 2026-05-19
 *
 * Source structure:
 * - .card-grid-columns-3 > .card-grid-cell (repeated 3x)
 * - Each .card-grid-cell > .grid-card > .grid-card-hero > picture > img
 * - Each .grid-card > .grid-card-content > h6.grid-card-title
 * - Each .grid-card > .grid-card-content > .grid-card-description > p
 * - Each .grid-card > .grid-card-footer > a.button (CTA link)
 *
 * Target: Container block - each card = 1 row with 2 columns [image, text]
 * Field hints: image, text (xwalk)
 */
export default function parse(element, { document }) {
  // Find all card cells within the grid
  const cardCells = element.querySelectorAll('.card-grid-cell, [class*="card-grid-cell"]');

  const cells = [];

  cardCells.forEach((cardCell) => {
    const card = cardCell.querySelector('.grid-card') || cardCell;

    // Extract image (field: image)
    const picture = card.querySelector('.grid-card-hero picture, picture');
    const img = card.querySelector('.grid-card-hero img, img');

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    if (picture) {
      imageCell.appendChild(picture);
    } else if (img) {
      imageCell.appendChild(img);
    }

    // Extract text content: title, description, CTA (field: text)
    const title = card.querySelector('h6.grid-card-title, .grid-card-title, h6, [class*="card-title"]');
    const descriptionContainer = card.querySelector('.grid-card-description, [class*="card-description"]');
    const descriptions = descriptionContainer
      ? descriptionContainer.querySelectorAll('p')
      : card.querySelectorAll('.grid-card-content p');
    const ctaLink = card.querySelector('.grid-card-footer a.button, .grid-card-footer a, a.button');

    // Build text cell with field hint
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));

    if (title) {
      textCell.appendChild(title);
    }

    if (descriptions && descriptions.length > 0) {
      descriptions.forEach((p) => {
        textCell.appendChild(p);
      });
    }

    if (ctaLink) {
      // Wrap CTA in a paragraph for proper block rendering
      const ctaParagraph = document.createElement('p');
      ctaParagraph.appendChild(ctaLink);
      textCell.appendChild(ctaParagraph);
    }

    // Each card is one row with two columns: [image, text]
    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-editorial', cells });
  element.replaceWith(block);
}
