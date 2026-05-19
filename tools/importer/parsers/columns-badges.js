/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-badges
 * Base block: columns
 * Source: https://www.aainsurance.co.nz/
 * Selector: .columns.text__align-center
 * Description: Trust/certification badges displayed in 3 columns with image, title, and link each.
 * Generated: 2026-05-19
 */
export default function parse(element, { document }) {
  // Each badge column lives inside a .col-12.col-md-4 or similar col-* div
  // Structure: .columns.text__align-center > .container > .row.row__content > .col-*
  const columns = element.querySelectorAll('.row__content > [class*="col-12"]');

  const cells = [];
  // Columns block: one row with N cells (one per column)
  const row = [];

  columns.forEach((col) => {
    const cellContent = [];

    // Badge image
    const img = col.querySelector('.image-wrapper img, img.image-wrapped');
    if (img) {
      cellContent.push(img);
    }

    // Title (h6)
    const title = col.querySelector('h6.content-block__title, h6');
    if (title) {
      cellContent.push(title);
    }

    // Link inside content-block__content
    const link = col.querySelector('.content-block__content a, .content-block__content p a');
    if (link) {
      const p = document.createElement('p');
      p.appendChild(link.cloneNode(true));
      cellContent.push(p);
    }

    row.push(cellContent);
  });

  if (row.length > 0) {
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-badges', cells });
  element.replaceWith(block);
}
