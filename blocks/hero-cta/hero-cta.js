export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length >= 1) {
    const contentRow = rows[0];
    contentRow.classList.add('hero-cta-content');
  }
}
