/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-promo.js
  function parse(element, { document }) {
    const picture = element.querySelector(".hero-abl-backdrop picture, .hero-abl-backdrop img");
    const heading = element.querySelector(".hero-abl-header h1, .hero-abl-header-container h1, h1");
    const ctaLinks = Array.from(
      element.querySelectorAll(".hero-abl-card-links > .hero-abl-card-link > a.button")
    );
    const promoContent = element.querySelector(".hero-abl-card-main .hero-abl-card-content, .hero-abl-card-main");
    const textFragment = document.createDocumentFragment();
    textFragment.appendChild(document.createComment(" field:text "));
    if (heading) {
      const h1 = document.createElement("h1");
      h1.textContent = heading.textContent.trim();
      textFragment.appendChild(h1);
    }
    if (ctaLinks.length > 0) {
      const ctaParagraph = document.createElement("p");
      ctaLinks.forEach((link) => {
        const a = document.createElement("a");
        a.href = link.href || link.getAttribute("href");
        const labelEl = link.querySelector(".button--label__text");
        a.textContent = labelEl ? labelEl.textContent.trim() : link.textContent.trim();
        ctaParagraph.appendChild(a);
        ctaParagraph.appendChild(document.createTextNode(" "));
      });
      textFragment.appendChild(ctaParagraph);
    }
    if (promoContent) {
      const paragraphs = promoContent.querySelectorAll("p");
      paragraphs.forEach((p) => {
        if (p.textContent.trim()) {
          const newP = document.createElement("p");
          newP.innerHTML = p.innerHTML;
          textFragment.appendChild(newP);
        }
      });
    }
    const imageFragment = document.createDocumentFragment();
    imageFragment.appendChild(document.createComment(" field:image "));
    if (picture) {
      imageFragment.appendChild(picture.cloneNode(true));
    }
    const cells = [
      [imageFragment],
      [textFragment]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse2(element, { document }) {
    const productIcons = element.querySelectorAll(".product-icon");
    const cells = [];
    productIcons.forEach((product) => {
      const iconLink = product.querySelector(".product-icon__icon-link, .product-icon-wrapper__fa");
      const iconImg = iconLink ? iconLink.querySelector("img") : null;
      const imageCell = document.createDocumentFragment();
      if (iconImg) {
        imageCell.appendChild(document.createComment(" field:image "));
        const img = document.createElement("img");
        img.src = iconImg.src;
        imageCell.appendChild(img);
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      const dropdownText = product.querySelector(".button-dropdown__button-text");
      const headingLink = product.querySelector(".product-icon__heading-link");
      if (dropdownText) {
        let href = iconLink && iconLink.tagName === "A" ? iconLink.getAttribute("href") : null;
        if (!href) {
          const firstDropdownLink = product.querySelector(".button-dropdown__dropdown li a");
          href = firstDropdownLink ? firstDropdownLink.getAttribute("href") : "#";
        }
        const productName = dropdownText.textContent.trim();
        const link = document.createElement("a");
        link.href = href;
        link.textContent = productName;
        const p = document.createElement("p");
        p.appendChild(link);
        textCell.appendChild(p);
        const dropdownItems = product.querySelectorAll(".button-dropdown__dropdown li a");
        if (dropdownItems.length > 0) {
          const ul = document.createElement("ul");
          dropdownItems.forEach((item) => {
            const li = document.createElement("li");
            const subLink = document.createElement("a");
            subLink.href = item.getAttribute("href");
            const labelSpan = item.querySelector(".product-icon__label");
            subLink.textContent = labelSpan ? labelSpan.textContent.trim() : item.textContent.trim();
            li.appendChild(subLink);
            ul.appendChild(li);
          });
          textCell.appendChild(ul);
        }
      } else if (headingLink) {
        const link = document.createElement("a");
        link.href = headingLink.getAttribute("href");
        link.textContent = headingLink.textContent.trim();
        const p = document.createElement("p");
        p.appendChild(link);
        textCell.appendChild(p);
        const subheading = product.querySelector(".product-icon__subheading");
        if (subheading) {
          const sub = document.createElement("p");
          sub.textContent = subheading.textContent.trim();
          textCell.appendChild(sub);
        }
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-editorial.js
  function parse3(element, { document }) {
    const cardCells = element.querySelectorAll('.card-grid-cell, [class*="card-grid-cell"]');
    const cells = [];
    cardCells.forEach((cardCell) => {
      const card = cardCell.querySelector(".grid-card") || cardCell;
      const picture = card.querySelector(".grid-card-hero picture, picture");
      const img = card.querySelector(".grid-card-hero img, img");
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:image "));
      if (picture) {
        imageCell.appendChild(picture);
      } else if (img) {
        imageCell.appendChild(img);
      }
      const title = card.querySelector('h6.grid-card-title, .grid-card-title, h6, [class*="card-title"]');
      const descriptionContainer = card.querySelector('.grid-card-description, [class*="card-description"]');
      const descriptions = descriptionContainer ? descriptionContainer.querySelectorAll("p") : card.querySelectorAll(".grid-card-content p");
      const ctaLink = card.querySelector(".grid-card-footer a.button, .grid-card-footer a, a.button");
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      if (title) {
        textCell.appendChild(title);
      }
      if (descriptions && descriptions.length > 0) {
        descriptions.forEach((p) => {
          textCell.appendChild(p);
        });
      }
      if (ctaLink) {
        const ctaParagraph = document.createElement("p");
        ctaParagraph.appendChild(ctaLink);
        textCell.appendChild(ctaParagraph);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-editorial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse4(element, { document }) {
    const columns = element.querySelectorAll(".row.row__content .col-12, .row.row__content .col-md-4");
    const columnContainers = element.querySelectorAll('.row.row__content > [class*="col-"]');
    const cells = [];
    const row = [];
    columnContainers.forEach((col) => {
      const cellContent = [];
      const icon = col.querySelector(".icon-wrapper img, .icon-wrapper__single img");
      if (icon) {
        cellContent.push(icon);
      }
      const title = col.querySelector("h6.content-block__title, .content-block__title");
      if (title) {
        cellContent.push(title);
      }
      const contentDiv = col.querySelector(".content-block__content > div, .content-block__content");
      if (contentDiv) {
        const paragraphs = contentDiv.querySelectorAll("p.paragraph, p");
        paragraphs.forEach((p) => {
          cellContent.push(p);
        });
      }
      row.push(cellContent);
    });
    if (row.length > 0) {
      cells.push(row);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-badges.js
  function parse5(element, { document }) {
    const columns = element.querySelectorAll('.row__content > [class*="col-12"]');
    const cells = [];
    const row = [];
    columns.forEach((col) => {
      const cellContent = [];
      const img = col.querySelector(".image-wrapper img, img.image-wrapped");
      if (img) {
        cellContent.push(img);
      }
      const title = col.querySelector("h6.content-block__title, h6");
      if (title) {
        cellContent.push(title);
      }
      const link = col.querySelector(".content-block__content a, .content-block__content p a");
      if (link) {
        const p = document.createElement("p");
        p.appendChild(link.cloneNode(true));
        cellContent.push(p);
      }
      row.push(cellContent);
    });
    if (row.length > 0) {
      cells.push(row);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-badges", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/aainsurance-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [".modal-popup"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [".notifications"]);
      WebImporter.DOMUtils.remove(element, [".header-component"]);
      WebImporter.DOMUtils.remove(element, ["footer.aa-footer"]);
      WebImporter.DOMUtils.remove(element, ["noscript", "link"]);
    }
  }

  // tools/importer/transformers/aainsurance-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const document = element.ownerDocument;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-promo": parse,
    "cards-product": parse2,
    "cards-editorial": parse3,
    "columns-feature": parse4,
    "columns-badges": parse5
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "AA Insurance homepage with hero banner, product grid, promotional cards, trust badges, and why choose us section",
    urls: ["https://www.aainsurance.co.nz/"],
    blocks: [
      {
        name: "hero-promo",
        instances: [".hero-abl"]
      },
      {
        name: "cards-product",
        instances: [".columns.mobile-lower-50"]
      },
      {
        name: "cards-editorial",
        instances: [".card-grid-columns.card-grid-columns-3"]
      },
      {
        name: "columns-feature",
        instances: [".columns.why-choose-aai-footer"]
      },
      {
        name: "columns-badges",
        instances: [".columns.text__align-center"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: ".hero-abl",
        style: null,
        blocks: ["hero-promo"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Product Grid",
        selector: ".columns.mobile-lower-50",
        style: null,
        blocks: ["cards-product"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Awards Section",
        selector: ".content-block__center.content-block__borderless.content-block__noTitle",
        style: null,
        blocks: [],
        defaultContent: ["h3", ".image-auto-size"]
      },
      {
        id: "section-4",
        name: "Promotional Cards",
        selector: ".card-grid",
        style: null,
        blocks: ["cards-editorial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Why Choose AA Insurance",
        selector: ".columns.why-choose-aai-footer",
        style: null,
        blocks: ["columns-feature"],
        defaultContent: [".columns__heading"]
      },
      {
        id: "section-6",
        name: "Trust Badges",
        selector: ".columns.text__align-center",
        style: null,
        blocks: ["columns-badges"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
