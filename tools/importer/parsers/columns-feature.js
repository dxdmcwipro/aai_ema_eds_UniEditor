/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-feature
 * Base block: columns
 * Source: https://www.aainsurance.co.nz/
 * Selector: .columns.why-choose-aai-footer
 * Generated: 2026-05-19
 *
 * Extracts 3 feature columns with icon, title, description, and text link.
 * The h2 heading "Why choose AA Insurance?" is default content and excluded.
 * xwalk: Columns blocks do NOT require field hint comments.
 */
export default function parse(element, { document }) {
  // Select the column containers within the content row
  const columns = element.querySelectorAll('.row.row__content .col-12, .row.row__content .col-md-4');

  // Deduplicate: each column has both .col-12 and .col-md-4, use unique parent elements
  const columnContainers = element.querySelectorAll('.row.row__content > [class*="col-"]');

  const cells = [];
  const row = [];

  columnContainers.forEach((col) => {
    const cellContent = [];

    // Extract icon image (SVG in circular wrapper)
    const icon = col.querySelector('.icon-wrapper img, .icon-wrapper__single img');
    if (icon) {
      cellContent.push(icon);
    }

    // Extract title (h6.content-block__title)
    const title = col.querySelector('h6.content-block__title, .content-block__title');
    if (title) {
      cellContent.push(title);
    }

    // Extract description paragraph(s) and link
    const contentDiv = col.querySelector('.content-block__content > div, .content-block__content');
    if (contentDiv) {
      const paragraphs = contentDiv.querySelectorAll('p.paragraph, p');
      paragraphs.forEach((p) => {
        cellContent.push(p);
      });
    }

    row.push(cellContent);
  });

  if (row.length > 0) {
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
