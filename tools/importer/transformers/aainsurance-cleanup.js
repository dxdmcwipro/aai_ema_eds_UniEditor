/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: AA Insurance cleanup.
 * Removes non-authorable site chrome and global elements.
 * Selectors from captured DOM (migration-work/cleaned.html).
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove modals that may interfere with block parsing
    // Found in captured HTML: <div class="modal-popup contact-modal"> (line 732)
    // Found in captured HTML: <div class="modal-popup undefined"> (line 782)
    WebImporter.DOMUtils.remove(element, ['.modal-popup']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove notification banner (non-authorable)
    // Found in captured HTML: <div class="notifications notifications__top"> (line 8)
    WebImporter.DOMUtils.remove(element, ['.notifications']);

    // Remove header/navigation (non-authorable)
    // Found in captured HTML: <div class="header-component"> (line 31)
    WebImporter.DOMUtils.remove(element, ['.header-component']);

    // Remove site footer (non-authorable)
    // Found in captured HTML: <footer class="aa-footer"> (line 1450)
    WebImporter.DOMUtils.remove(element, ['footer.aa-footer']);

    // Remove any remaining non-content elements
    WebImporter.DOMUtils.remove(element, ['noscript', 'link']);
  }
}
