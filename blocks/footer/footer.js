import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  if (fragment) {
    const sections = [...fragment.querySelectorAll(':scope .section')];
    sections.forEach((section) => {
      const wrapper = section.querySelector(':scope > .default-content-wrapper');
      const source = wrapper || section;
      block.append(...source.children);
    });
  }

  // Group h6 + ul pairs into column divs for the 4-column layout
  const children = [...block.children];
  const linksRow = document.createElement('div');
  linksRow.className = 'footer-links';
  let currentCol = null;

  children.forEach((child) => {
    if (child.tagName === 'H6') {
      currentCol = document.createElement('div');
      currentCol.className = 'footer-col';
      currentCol.append(child);
      linksRow.append(currentCol);
    } else if (child.tagName === 'UL' && currentCol) {
      currentCol.append(child);
    } else if (child.tagName === 'DIV' && child.querySelector('h6')) {
      linksRow.append(child);
    } else {
      // paragraphs (social, legal, copyright) stay as direct children
      block.append(child);
    }
  });

  if (linksRow.children.length > 0) {
    block.prepend(linksRow);
  }
}
