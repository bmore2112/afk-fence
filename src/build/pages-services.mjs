import { SITE, SERVICES, IMG } from "./data.mjs";
import { page, pic, esc, ICON, ctaBand, faqList, faqSchema, breadcrumbs, breadcrumbSchema, ORG_ID } from "./layout.mjs";
import { buildLine } from "./pages-home.mjs";

const meter = (n) => `<span class="meter" role="img" aria-label="${n} out of 5">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</span>`;

const COMPARE = [
  ["wood-fence", "Wood", 5, 2, "Classic privacy, budget-conscious", "Stain or seal every 2 to 3 years"],
  ["cedar-horizontal-fence", "Cedar Horizontal", 5, 3, "Modern, architectural yards", "Optional stain to keep color"],
  ["vinyl-fence", "Vinyl", 5, 5, "Families, HOAs, low upkeep", "Rinse with a hose"],
  ["aluminum-fence", "Aluminum", 1, 5, "Pools, front yards, open views", "Practically none"],
  ["chain-link-fence", "Chain Link", 1, 4, "Pets, fields, commercial lots", "Very low"],
];

export function servicesHub() {
  const trail = [["/", "Home"], ["/services/", "Services"]];
  const faqs = [
    ["What is the best fence for privacy?", "Wood stockade, board-on-board, horizontal cedar and solid vinyl privacy fences all block sight lines completely at 6 ft. Vinyl is the lowest maintenance; wood and cedar offer warmth and custom character."],
    ["What is the lowest-maintenance fence?", "Vinyl and ornamental aluminum need the least upkeep. Neither needs paint or stain, and both clean up with water."],
    ["What is the most affordable fence?", "Chain link is generally the most cost-effective fence per foot, followed by pressure-treated pine. Exact pricing depends on your yard, height and gates."],
  ];
  return page({
    title: "Fence Installation Services | Wood, Vinyl, Aluminum | AFK Fence",
    description: "Compare wood, cedar horizontal, vinyl, aluminum and chain link fences installed by AFK Fence in Waldorf, Southern MD & Washington, DC. Custom gates too.",
    path: "/services/",
    schema: [breadcrumbSchema(trail), faqSchema(faqs), {
      "@type": "ItemList", name: "Fence installation services",
      itemListElement: SERVICES.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}/${s.slug}/`, name: s.name })),
    }],
  }, `<section class="page-hero"><div class="container"><div>
  ${breadcrumbs(trail)}
  <p class="eyebrow">Fence installation services</p>
  <h1>Choose your fence.<br><span class="accent">We'll build it right.</span></h1>
  <p class="lede">Vinyl, wood, aluminum and chain link are the fences we install most, plus horizontal cedar and fully custom designs. Every install includes gates built to match.</p>
  <div class="btn-row"><a class="btn" href="/contact/#quote">Get a Quote ${ICON.arrow}</a><a class="btn btn--ghost" href="/#planner">Plan My Fence</a></div>
</div></div></section>
<section class="section"><div class="container">
  <div class="bento">${SERVICES.slice(0, 4).map((s, i) => `<a class="svc-card reveal" href="/${s.slug}/">${pic(s.img)}<span class="svc-card__num">0${i + 1}</span><h3>${s.name}</h3><p>${s.card}</p><span class="svc-card__more">Explore ${s.short} ${ICON.arrow}</span></a>`).join("")}</div>
  <a class="svc-card reveal" style="margin-top:1rem;min-height:260px" href="/${SERVICES[4].slug}/">${pic(SERVICES[4].img)}<span class="svc-card__num">05</span><h3>${SERVICES[4].name}</h3><p>${SERVICES[4].card}</p><span class="svc-card__more">Explore ${SERVICES[4].short} ${ICON.arrow}</span></a>
</div></section>
<section class="section section--paper2 picket-top" aria-labelledby="cmp-h"><div class="container">
  <div class="section-head section-head--split reveal"><div><p class="eyebrow">Side by side</p><h2 id="cmp-h">Compare fence materials.</h2></div><p class="lede">A quick way to match a material to what you need most. We're happy to talk through the trade-offs on site.</p></div>
  <div class="compare-wrap reveal"><table class="compare">
    <caption class="visually-hidden">Fence material comparison</caption>
    <thead><tr><th scope="col">Material</th><th scope="col">Privacy</th><th scope="col">Low upkeep</th><th scope="col">Best for</th><th scope="col">Maintenance</th></tr></thead>
    <tbody>${COMPARE.map(([slug, n, p, m, best, maint]) => `<tr><th scope="row"><a class="text-link" href="/${slug}/">${n}</a></th><td>${meter(p)}</td><td>${meter(m)}</td><td>${best}</td><td>${maint}</td></tr>`).join("")}</tbody>
  </table></div>
</div></section>
<section class="section"><div class="container">
  <div class="section-head reveal"><p class="eyebrow">Choosing a fence</p><h2>Common questions.</h2></div>
  ${faqList(faqs)}
</div></section>
${ctaBand()}`);
}

export function servicePage(s, areaPages) {
  const path = `/${s.slug}/`;
  const trail = [["/", "Home"], ["/services/", "Services"], [path, s.name]];
  const others = SERVICES.filter((o) => o.slug !== s.slug);
  const areaLinks = areaPages.slice(0, 10);
  return page({
    title: `${s.name} Installation in Waldorf, MD & DC | AFK Fence`,
    description: `${s.name} installed by AFK Fence: ${s.card} Serving Southern Maryland & Washington, DC since 2004. Call ${SITE.phone}.`.slice(0, 158),
    path,
    preload: IMG[s.img].src,
    schema: [breadcrumbSchema(trail), faqSchema(s.faqs), {
      "@type": "Service",
      "@id": `${SITE.url}${path}#service`,
      name: `${s.name} Installation`,
      serviceType: "Fence installation",
      description: s.answer,
      provider: { "@id": ORG_ID },
      areaServed: [{ "@type": "State", name: "Maryland" }, { "@type": "City", name: "Washington, DC" }],
      image: `${SITE.url}/assets/img/${IMG[s.img].src}.jpg`,
      url: `${SITE.url}${path}`,
    }],
  }, `<section class="page-hero page-hero--media"><div class="container">
  <div>
    ${breadcrumbs(trail)}
    <p class="eyebrow">${esc(s.name)}</p>
    <h1>${esc(s.name)} <span class="accent">done right.</span></h1>
    <p class="lede">${esc(s.tagline)} ${esc(s.intro)}</p>
    <div class="btn-row"><a class="btn" href="/contact/?material=${encodeURIComponent(s.material)}#quote">Quote My ${esc(s.short)} Fence ${ICON.arrow}</a><a class="btn btn--ghost" href="${SITE.phoneHref}">${ICON.phone} ${SITE.phone}</a></div>
  </div>
  <div class="page-hero__img">${pic(s.img, { eager: true, sizes: "380px" })}</div>
</div></section>
<section class="section"><div class="container with-aside">
  <article class="prose">
    <div class="answer-box"><p><strong>Quick answer</strong>${esc(s.answer)}</p></div>
    <h2>${esc(s.short)} styles we install</h2>
    <div class="feature-grid">${s.styles.map(([h, p]) => `<div class="feature"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join("")}</div>
    <figure class="inline-photo">${pic(s.img2, { sizes: "(min-width: 980px) 700px, 100vw" })}<figcaption>${esc(IMG[s.img2].alt)}.</figcaption></figure>
    <h2>What's included</h2>
    <ul class="checklist">${s.points.map((p) => `<li>${ICON.check}<span>${esc(p)}</span></li>`).join("")}</ul>
    <h2>Why homeowners choose AFK Fence</h2>
    <p>We have been building fences since ${SITE.founded}. As a family-owned, woman-owned company, we run every job the way we'd want our own home handled: clear communication, careful layout, posts set deep, and a clean site when we leave. We are licensed in Maryland and Washington, DC, and our team speaks English and Spanish.</p>
    <h2>${esc(s.short)} fence FAQs</h2>
    ${faqList(s.faqs)}
    <h2>${esc(s.name)} near you</h2>
    <p>We install ${esc(s.name.toLowerCase())} across ${areaLinks.map((a) => `<a class="text-link" href="/${a.slug}/">${esc(a.town)}</a>`).join(", ")} and the rest of <a class="text-link" href="/service-areas/">our service area</a>.</p>
  </article>
  <aside class="aside-card">
    <h3>Get your ${esc(s.short.toLowerCase())} quote</h3>
    <p>Tell us about your yard and we'll set up a time to measure.</p>
    <a class="btn" href="/contact/?material=${encodeURIComponent(s.material)}#quote">Request a Quote</a>
    <a class="btn btn--ghost" href="${SITE.phoneHref}">${SITE.phone}</a>
    <hr>
    <h3 style="font-size:1.2rem">Other fences</h3>
    <ul>${others.map((o) => `<li><a href="/${o.slug}/">${o.name} <span aria-hidden="true">&rarr;</span></a></li>`).join("")}</ul>
  </aside>
</div></section>
${buildLine(`${s.short} built to last`)}
${ctaBand(`Let's build your ${s.short.toLowerCase()} fence.`)}`);
}
