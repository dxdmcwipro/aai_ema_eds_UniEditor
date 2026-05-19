/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-product
 * Base block: cards
 * Source: https://www.aainsurance.co.nz/
 * Selector: .columns.mobile-lower-50
 * Generated: 2026-05-19
 *
 * Extracts product navigation grid with 12 insurance product tiles.
 * Each tile has an icon image, product name link, and optional dropdown sub-items.
 * Maps to Cards container block where each card row = [image, text].
 * UE Model: card { image (reference), text (richtext) }
 */
export default function parse(element, { document }) {
  // Find all product icon containers within the grid
  const productIcons = element.querySelectorAll('.product-icon');
  const cells = [];

  productIcons.forEach((product) => {
    // Extract the icon image from the icon link (a or div with class product-icon__icon-link)
    const iconLink = product.querySelector('.product-icon__icon-link, .product-icon-wrapper__fa');
    const iconImg = iconLink ? iconLink.querySelector('img') : null;

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    if (iconImg) {
      imageCell.appendChild(document.createComment(' field:image '));
      const img = document.createElement('img');
      img.src = iconImg.src;
      imageCell.appendChild(img);
    }

    // Extract product name and link - two patterns:
    // 1. Dropdown pattern: .button-dropdown__button-text for label, icon link href for URL
    // 2. Heading pattern: .product-icon__heading > a.product-icon__heading-link
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));

    const dropdownText = product.querySelector('.button-dropdown__button-text');
    const headingLink = product.querySelector('.product-icon__heading-link');

    if (dropdownText) {
      // Dropdown pattern: create a link with the product name
      // Note: Recreation uses a <div> not <a>, so href may be null - fall back to first dropdown link
      let href = iconLink && iconLink.tagName === 'A' ? iconLink.getAttribute('href') : null;
      if (!href) {
        const firstDropdownLink = product.querySelector('.button-dropdown__dropdown li a');
        href = firstDropdownLink ? firstDropdownLink.getAttribute('href') : '#';
      }
      const productName = dropdownText.textContent.trim();
      const link = document.createElement('a');
      link.href = href;
      link.textContent = productName;
      const p = document.createElement('p');
      p.appendChild(link);
      textCell.appendChild(p);

      // Add dropdown sub-items as a list
      const dropdownItems = product.querySelectorAll('.button-dropdown__dropdown li a');
      if (dropdownItems.length > 0) {
        const ul = document.createElement('ul');
        dropdownItems.forEach((item) => {
          const li = document.createElement('li');
          const subLink = document.createElement('a');
          subLink.href = item.getAttribute('href');
          const labelSpan = item.querySelector('.product-icon__label');
          subLink.textContent = labelSpan ? labelSpan.textContent.trim() : item.textContent.trim();
          li.appendChild(subLink);
          ul.appendChild(li);
        });
        textCell.appendChild(ul);
      }
    } else if (headingLink) {
      // Simple heading pattern: product name as link
      const link = document.createElement('a');
      link.href = headingLink.getAttribute('href');
      link.textContent = headingLink.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(link);
      textCell.appendChild(p);

      // Check for subheading (e.g., "Partner product")
      const subheading = product.querySelector('.product-icon__subheading');
      if (subheading) {
        const sub = document.createElement('p');
        sub.textContent = subheading.textContent.trim();
        textCell.appendChild(sub);
      }
    }

    // Each card row has two columns: image | text
    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
