import { SITE, IMG, SERVICES, AREAS } from "./data.mjs";

export const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const P = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
export const ICON = {
  phone: `<svg viewBox="0 0 24 24" ${P}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" ${P}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" ${P}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" ${P}><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
  check: `<svg viewBox="0 0 24 24" ${P}><path d="M20 6 9 17l-5-5"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" ${P}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" ${P}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" ${P}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" ${P}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" ${P}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" ${P}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
};

export function pic(key, { cls = "", eager = false, sizes = "(min-width: 900px) 40vw, 100vw" } = {}) {
  const i = IMG[key];
  const load = eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
  return `<picture${cls ? ` class="${cls}"` : ""}><source type="image/webp" srcset="/assets/img/${i.src}.webp"><img src="/assets/img/${i.src}.jpg" alt="${esc(i.alt)}" width="${i.w}" height="${i.h}" ${load} decoding="async" sizes="${sizes}"></picture>`;
}

const NAV = [
  ["/services/", "Services"],
  ["/gallery/", "Our Work"],
  ["/service-areas/", "Areas"],
  ["/about/", "About"],
  ["/contact/", "Contact"],
];

export const ORG_ID = `${SITE.url}/#business`;

export function businessSchema() {
  return {
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.short,
    url: `${SITE.url}/`,
    logo: `${SITE.url}/assets/img/logo.png`,
    image: [`${SITE.url}/assets/img/og-image.jpg`, `${SITE.url}/assets/img/${IMG.cedar.src}.jpg`],
    description: "Family-owned, woman-owned fence company in Waldorf, Maryland installing wood, cedar horizontal, vinyl, aluminum and chain link fences and custom gates since 2004. Licensed in Maryland and Washington, DC. Hablamos español.",
    telephone: "+1-240-615-6308",
    email: SITE.email,
    foundingDate: SITE.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.zip,
      addressCountry: "US",
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${SITE.mapQuery}`,
    areaServed: [
      { "@type": "State", name: "Maryland" },
      { "@type": "City", name: "Washington, DC" },
      ...AREAS.flatMap((a) => a.towns.map((t) => ({ "@type": "Place", name: t.includes(",") || t.includes("County") ? t : `${t}, MD` }))),
    ],
    knowsLanguage: ["en", "es"],
    slogan: "Fences built like it's our own home.",
    sameAs: [SITE.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fence Installation Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `${s.name} Installation`, url: `${SITE.url}/${s.slug}/` },
      })),
    },
    priceRange: "$$",
  };
}

export function breadcrumbSchema(trail) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([url, name], i) => ({
      "@type": "ListItem", position: i + 1, name, item: `${SITE.url}${url}`,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export function breadcrumbs(trail) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${trail.map(([url, name], i) =>
    i === trail.length - 1 ? `<li aria-current="page">${esc(name)}</li>` : `<li><a href="${url}">${esc(name)}</a></li>`).join("")}</ol></nav>`;
}

export function faqList(faqs) {
  return `<div class="faq">${faqs.map(([q, a], i) => `
    <details${i === 0 ? " open" : ""}><summary>${esc(q)}</summary><div class="faq__a"><p>${esc(a)}</p></div></details>`).join("")}
  </div>`;
}

function head({ title, description, path, schema = [], ogImage = "og-image.jpg", noindex = false, preload }) {
  const canonical = `${SITE.url}${path}`;
  const graph = { "@context": "https://schema.org", "@graph": [
    businessSchema(),
    { "@type": "WebSite", "@id": `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name, publisher: { "@id": ORG_ID }, inLanguage: "en-US" },
    { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: title, description, isPartOf: { "@id": `${SITE.url}/#website` }, about: { "@id": ORG_ID }, inLanguage: "en-US" },
    ...schema,
  ] };
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}">
<meta name="theme-color" content="#111511">
<meta name="geo.region" content="US-MD">
<meta name="geo.placename" content="Waldorf, Maryland">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}/assets/img/${ogImage}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;1,700;1,800&family=Manrope:wght@400;500;600;700;800&display=swap">
${preload ? `<link rel="preload" as="image" href="/assets/img/${preload}.webp" type="image/webp">\n` : ""}<link rel="stylesheet" href="/assets/css/site.css">
<script>document.documentElement.className = document.documentElement.className.replace("no-js", "js");</script>
<script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>`;
}

function header(path) {
  const navItems = NAV.map(([href, label]) =>
    `<li><a href="${href}"${path.startsWith(href) ? ' aria-current="page"' : ""}>${label}</a></li>`).join("");
  return `<a class="skip-link" href="#main">Skip to content</a>
<div class="topbar"><div class="container">
  <div class="topbar__left"><a href="${SITE.phoneHref}">${SITE.phone}</a><a href="mailto:${SITE.email}">${SITE.email}</a></div>
  <div class="topbar__right"><span>Licensed in MD &amp; DC</span><span>Since ${SITE.founded}</span><span lang="es">Hablamos español</span></div>
</div></div>
<header class="site-header">
  <div class="container">
    <a class="brand" href="/" aria-label="${SITE.name} home">
      <img src="/assets/img/logo.webp" alt="" width="62" height="62">
      <span class="brand__text"><span class="brand__name">AFK Fence</span><span class="brand__sub">Waldorf, MD &middot; Since ${SITE.founded}</span></span>
    </a>
    <nav class="nav" aria-label="Main"><ul>${navItems}</ul></nav>
    <a class="btn header-cta" href="/contact/#quote">Get a Quote</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu"><span></span></button>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav" aria-hidden="true" tabindex="-1">
  <button class="nav-toggle nav-close" type="button" aria-expanded="true" aria-label="Close menu"><span></span></button>
  <ul><li><a href="/">Home</a></li>${navItems}</ul>
  <div class="btn-row"><a class="btn" href="${SITE.phoneHref}">${ICON.phone} Call ${SITE.phone}</a><a class="btn btn--ghost" href="/contact/#quote">Get a Quote</a></div>
</div>`;
}

export function ctaBand(heading = "Ready for a fence you'll be proud of?") {
  return `<section class="cta-band picket-top" aria-labelledby="cta-h">
  <div class="container">
    <div>
      <h2 id="cta-h">${esc(heading)}</h2>
      <p>Talk to a fence pro today. Se habla español.</p>
      <a class="cta-band__phone" href="${SITE.phoneHref}">${SITE.phone}</a>
    </div>
    <div class="btn-row"><a class="btn" href="/contact/#quote">Request a Quote ${ICON.arrow}</a><a class="btn btn--ghost" href="/#planner">Plan My Fence</a></div>
  </div>
</section>`;
}

function footer() {
  const svcLinks = SERVICES.map((s) => `<li><a href="/${s.slug}/">${s.name}</a></li>`).join("");
  return `<footer class="site-footer picket-top">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="/assets/img/logo-light.webp" alt="${SITE.name}" width="130" height="131" loading="lazy">
        <p>Family-owned, woman-owned fence company building wood, vinyl, aluminum and chain link fences across Southern Maryland and Washington, DC since ${SITE.founded}.</p>
        <div class="socials">
          <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="AFK Fence on Instagram">${ICON.instagram}</a>
          <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="AFK Fence on Facebook">${ICON.facebook}</a>
        </div>
      </div>
      <div><h2>Fences</h2><ul>${svcLinks}<li><a href="/services/">All Services</a></li></ul></div>
      <div><h2>Company</h2><ul><li><a href="/about/">About Us</a></li><li><a href="/gallery/">Our Work</a></li><li><a href="/service-areas/">Service Areas</a></li><li><a href="/contact/">Contact</a></li></ul></div>
      <div><h2>Contact</h2><ul>
        <li><a href="${SITE.phoneHref}">${SITE.phone}</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li><address style="font-style:normal">${SITE.street}<br>${SITE.city}, ${SITE.region} ${SITE.zip}</address></li>
        <li>Licensed in Maryland &amp; Washington, DC</li>
        <li lang="es">Hablamos español</li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>${new Date().getFullYear()}</span> ${SITE.name}. All rights reserved.</span>
      <span>Fence installation in Waldorf, MD &amp; Washington, DC</span>
    </div>
  </div>
</footer>
<nav class="callbar" aria-label="Quick contact">
  <a href="${SITE.phoneHref}">${ICON.phone} Call Now</a>
  <a href="/contact/#quote">Get a Quote</a>
</nav>
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

export function page(opts, body) {
  return `${head(opts)}
<body>
${header(opts.path)}
<main id="main">
${body}
</main>
${footer()}`;
}
