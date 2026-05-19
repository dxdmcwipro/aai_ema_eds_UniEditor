/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: AA Insurance sections.
 * Inserts section breaks (<hr>) between content sections based on template section selectors.
 * Selectors from captured DOM (migration-work/cleaned.html):
 *   - Section 1 (Hero Banner): .hero-abl (line 757)
 *   - Section 2 (Product Grid): .columns.mobile-lower-50 (line 890)
 *   - Section 3 (Awards Section): .content-block__center.content-block__borderless.content-block__noTitle (line 1221)
 *   - Section 4 (Promotional Cards): .card-grid (line 1236)
 *   - Section 5 (Why Choose AA Insurance): .columns.why-choose-aai-footer (line 1329)
 *   - Section 6 (Trust Badges): .columns.text__align-center (line 1401)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const document = element.ownerDocument;
    const sections = template.sections;

    // Process sections in reverse order to avoid position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);

      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before every section except the first
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
