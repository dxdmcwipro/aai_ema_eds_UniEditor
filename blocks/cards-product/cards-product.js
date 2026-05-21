import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div, index) => {
      if (index === 0) {
        div.className = 'cards-product-card-image';
        const buttonLink = div.querySelector('a.button');
        if (buttonLink) {
          buttonLink.classList.remove('button');
          const container = buttonLink.closest('.button-container');
          if (container) container.classList.remove('button-container');
        }
      } else {
        div.className = 'cards-product-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('.cards-product-card-image picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
