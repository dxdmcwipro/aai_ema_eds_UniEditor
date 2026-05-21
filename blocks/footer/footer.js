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

    const divs = [...block.querySelectorAll(':scope > div')];
    if (divs.length > 1) {
      const linksRow = document.createElement('div');
      linksRow.className = 'footer-links';
      divs.forEach((div) => linksRow.append(div));
      block.prepend(linksRow);
    }
  }
}
