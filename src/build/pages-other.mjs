import { SITE, SERVICES, IMG, AREAS, YEARS } from "./data.mjs";
import { page, pic, esc, ICON, ctaBand, faqList, faqSchema, breadcrumbs, breadcrumbSchema, ORG_ID } from "./layout.mjs";
import { planner, buildLine } from "./pages-home.mjs";

export function aboutPage() {
  const trail = [["/", "Home"], ["/about/", "About"]];
  const values = [
    ["Precision", "Level tops, plumb posts, even spacing. The small details are the job."],
    ["Communication", "Clear answers from the first call through the final walk-through."],
    ["Integrity", "Honest quotes and recommendations, even when the simpler option is the right one."],
    ["People first", "Your home, your family, your neighbors. We treat every yard like our own."],
  ];
  return page({
    title: "About AFK Fence | Family & Woman-Owned Since 2004 | Waldorf, MD",
    description: "AFK Fence LLC is a family-owned, woman-owned fence company in Waldorf, MD, building fences since 2004. Licensed in Maryland & DC. Hablamos español.",
    path: "/about/",
    schema: [breadcrumbSchema(trail), { "@type": "AboutPage", "@id": `${SITE.url}/about/#about`, url: `${SITE.url}/about/`, mainEntity: { "@id": ORG_ID } }],
  }, `<section class="page-hero page-hero--media"><div class="container">
  <div>
    ${breadcrumbs(trail)}
    <p class="eyebrow">About AFK Fence LLC</p>
    <h1>Family-owned.<br>Woman-owned.<br><span class="accent">Since ${SITE.founded}.</span></h1>
    <p class="lede">AFK Fence LLC is a proud family-owned fencing company built on trust, craftsmanship and strong values, serving homes and commercial properties across Maryland and Washington, DC.</p>
  </div>
  <div class="page-hero__img">${pic("woodGate", { eager: true, sizes: "380px" })}</div>
</div></section>
<section class="section"><div class="container split">
  <div class="reveal prose">
    <p class="eyebrow">Our story</p>
    <h2>Built on trust, one fence at a time.</h2>
    <p>We have been building fences since ${SITE.founded}. In that time the materials have changed, the styles have changed, and our neighborhoods have grown, but the way we work has not: we treat each project as if it were for our own home, with care, precision and a personal touch.</p>
    <p>As a woman-owned business, we believe in clear communication, reliable service and results that exceed expectations. From the first consultation to the final installation, you'll know what's happening, when, and why.</p>
    <p>We are licensed in Maryland and Washington, DC, and our team speaks English and Spanish. <span lang="es">Hablamos español.</span></p>
    <div class="stat-row"><div><strong>${YEARS}+</strong><span>Years building</span></div><div><strong>MD+DC</strong><span>Licensed</span></div><div><strong>EN/ES</strong><span>Bilingual team</span></div></div>
  </div>
  <div class="photo-pair reveal"><figure class="tilt">${pic("cedar")}</figure><figure>${pic("aluminum")}</figure></div>
</div></section>
<section class="section section--dark picket-top"><div class="container">
  <div class="section-head reveal"><p class="eyebrow">What we stand for</p><h2>Our values are<br><span class="accent">built into every post.</span></h2></div>
  <ol class="steps reveal">${values.map(([h, p]) => `<li><h3>${h}</h3><p>${p}</p></li>`).join("")}</ol>
</div></section>
${buildLine("Family-owned since " + SITE.founded)}
${ctaBand("Let's talk about your fence.")}`);
}

export function galleryPage() {
  const trail = [["/", "Home"], ["/gallery/", "Our Work"]];
  const items = [
    ["cedar", "Cedar horizontal privacy + gate"], ["vinylSpindle", "White vinyl with black spindle"],
    ["aluminum", "Black ornamental aluminum"], ["woodGate", "Wood privacy gate"],
    ["chainLink", "Black vinyl chain link"], ["vinylPrivacy", "White vinyl privacy"],
    ["woodPrivacy", "Pressure-treated wood privacy"],
  ];
  return page({
    title: "Fence Gallery | Recent Installs in Southern MD & DC | AFK Fence",
    description: "See real fences built by AFK Fence: horizontal cedar, white vinyl with black spindle, black aluminum, wood privacy and chain link in Southern Maryland & DC.",
    path: "/gallery/",
    schema: [breadcrumbSchema(trail), {
      "@type": "ImageGallery", name: "AFK Fence project gallery",
      image: items.map(([k, c]) => ({ "@type": "ImageObject", contentUrl: `${SITE.url}/assets/img/${IMG[k].src}.jpg`, caption: c, description: IMG[k].alt, creator: { "@id": ORG_ID } })),
    }],
  }, `<section class="page-hero"><div class="container"><div>
  ${breadcrumbs(trail)}
  <p class="eyebrow">Our work</p>
  <h1>Proof is in<br><span class="accent">the post.</span></h1>
  <p class="lede">Every fence on this page was built by AFK Fence. Tap any photo to see it larger, then tell us which style you want in your yard.</p>
</div></div></section>
<section class="section"><div class="container">
  <div class="gallery">${items.map(([k, c]) => `<figure class="reveal"><button type="button" data-lightbox="/assets/img/${IMG[k].src}.jpg" data-alt="${esc(IMG[k].alt)}" data-caption="${esc(c)}" aria-label="View larger: ${esc(c)}">${pic(k, { sizes: "(min-width: 900px) 33vw, 50vw" })}</button><figcaption>${esc(c)}</figcaption></figure>`).join("")}</div>
  <p style="margin-top:2rem">Follow new installs on Instagram: <a class="text-link" href="${SITE.instagram}" target="_blank" rel="noopener">${SITE.instagramHandle}</a></p>
</div></section>
<dialog class="lightbox" id="lightbox" aria-label="Photo viewer"><button class="lightbox__close" type="button" aria-label="Close">&times;</button><img src="" alt=""><p></p></dialog>
${ctaBand("Like what you see?")}`);
}

function field(id, label, type = "text", { required = false, full = false, auto = "", extra = "" } = {}) {
  const req = required ? ' required aria-required="true"' : "";
  return `<div class="field${full ? " full" : ""}"><label for="${id}">${label}${required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label><input id="${id}" name="${id}" type="${type}"${auto ? ` autocomplete="${auto}"` : ""}${req} aria-describedby="${id}-err"${extra}><div class="err" id="${id}-err" aria-live="polite"></div></div>`;
}

export function contactPage() {
  const trail = [["/", "Home"], ["/contact/", "Contact"]];
  return page({
    title: "Contact AFK Fence | Get a Fence Quote | (240) 615-6308",
    description: "Request a fence quote from AFK Fence in Waldorf, MD. Call (240) 615-6308, email afkfence@gmail.com or send the form. Licensed MD & DC. Hablamos español.",
    path: "/contact/",
    schema: [breadcrumbSchema(trail), { "@type": "ContactPage", "@id": `${SITE.url}/contact/#contact`, url: `${SITE.url}/contact/`, mainEntity: { "@id": ORG_ID } }],
  }, `<section class="page-hero"><div class="container"><div>
  ${breadcrumbs(trail)}
  <p class="eyebrow">Contact &middot; <span lang="es">Contáctenos</span></p>
  <h1>Let's build<br><span class="accent">your fence.</span></h1>
  <p class="lede">Call, text, email or send the form. We'll set up a time to see your property and talk through options. <span lang="es">Hablamos español.</span></p>
</div></div></section>
<section class="section" id="quote"><div class="container contact-grid">
  <div class="reveal">
    <ul class="contact-list">
      <li><span class="ico">${ICON.phone}</span><div><small>Call or text</small><a href="${SITE.phoneHref}">${SITE.phone}</a></div></li>
      <li><span class="ico">${ICON.mail}</span><div><small>Email</small><a href="mailto:${SITE.email}">${SITE.email}</a></div></li>
      <li><span class="ico">${ICON.pin}</span><div><small>Visit</small><address>${SITE.street}<br>${SITE.city}, ${SITE.regionName} ${SITE.zip}</address></div></li>
      <li><span class="ico">${ICON.instagram}</span><div><small>Instagram</small><a href="${SITE.instagram}" target="_blank" rel="noopener">${SITE.instagramHandle}</a></div></li>
    </ul>
    <div class="map-frame"><iframe title="Map to AFK Fence, ${SITE.street}, ${SITE.city}, MD" src="https://maps.google.com/maps?q=${SITE.mapQuery}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
  <form class="form-card reveal" action="/send.php" method="post" novalidate data-quote-form>
    <h2>Request a quote</h2>
    <p class="form-note" style="margin:0 0 1.25rem">Fields marked <span class="req" style="color:#b42318">*</span> are required.</p>
    <div class="form-grid">
      ${field("name", "Full name", "text", { required: true, auto: "name" })}
      ${field("phone", "Phone", "tel", { required: true, auto: "tel", extra: ' inputmode="tel"' })}
      ${field("email", "Email", "email", { required: true, auto: "email" })}
      ${field("location", "City or ZIP", "text", { auto: "postal-code" })}
      <div class="field full"><label for="service">Fence type</label><select id="service" name="service">
        <option value="">Choose one (optional)</option>${SERVICES.map((s) => `<option value="${esc(s.material)}">${esc(s.name)}</option>`).join("")}<option value="Not sure yet">Not sure yet</option><option value="Repair / gate">Repair or gate only</option><option value="Commercial">Commercial project</option>
      </select></div>
      <div class="field full"><label for="message">Project details</label><textarea id="message" name="message" placeholder="Approximate length, height, gates, timeline, HOA requirements..."></textarea></div>
    </div>
    <div class="hp" aria-hidden="true"><label for="website">Leave blank</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
    <input type="hidden" name="ts" value="">
    <button class="btn" type="submit">Send My Quote Request</button>
    <div class="form-status" role="status" aria-live="polite"></div>
    <p class="form-note">We only use your info to respond to your request.</p>
  </form>
</div></section>
${planner()}`);
}

export function areasHub(areaPages) {
  const trail = [["/", "Home"], ["/service-areas/", "Service Areas"]];
  const byCounty = {};
  areaPages.forEach((a) => { (byCounty[a.county] = byCounty[a.county] || []).push(a); });
  return page({
    title: "Fence Company Service Areas | Southern MD & Washington, DC",
    description: "AFK Fence installs fences across Charles County, Prince George's County, Calvert, St. Mary's & Washington, DC from our Waldorf, MD base. Find your town.",
    path: "/service-areas/",
    schema: [breadcrumbSchema(trail), {
      "@type": "ItemList", name: "AFK Fence service areas",
      itemListElement: areaPages.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}/${a.slug}/`, name: `Fence installation in ${a.town}, ${a.state}` })),
    }],
  }, `<section class="page-hero"><div class="container"><div>
  ${breadcrumbs(trail)}
  <p class="eyebrow">Service areas</p>
  <h1>Your neighborhood<br><span class="accent">fence company.</span></h1>
  <p class="lede">From our shop at ${SITE.street} in Waldorf, we build fences across Southern Maryland and Washington, DC. Pick your town for local details.</p>
</div></div></section>
<section class="section"><div class="container">
  <div class="area-grid">${Object.entries(byCounty).map(([county, list]) => `<div class="area-card reveal"><h2 style="font-size:1.6rem;font-style:normal">${esc(county)}</h2><ul>${list.map((a) => `<li><a href="/${a.slug}/">${esc(a.town)}</a></li>`).join("")}</ul></div>`).join("")}</div>
  <p style="margin-top:2rem">Don't see your town? We likely still serve you. Call <a class="text-link" href="${SITE.phoneHref}">${SITE.phone}</a>.</p>
</div></section>
${ctaBand()}`);
}

export function areaPage(a, areaPages) {
  const path = `/${a.slug}/`;
  const place = a.state === "DC" ? "Washington, DC" : `${a.town}, ${a.state}`;
  const trail = [["/", "Home"], ["/service-areas/", "Service Areas"], [path, place]];
  const svc = (slug) => SERVICES.find((s) => s.slug === slug) || SERVICES[0];
  const nearby = a.nearby.map((slug) => areaPages.find((p) => p.slug === slug)).filter(Boolean);
  const heroImg = svc(a.picks[0].service).img;
  return page({
    title: a.metaTitle,
    description: a.metaDescription,
    path,
    preload: IMG[heroImg].src,
    schema: [breadcrumbSchema(trail), faqSchema(a.faqs), {
      "@type": "Service",
      "@id": `${SITE.url}${path}#service`,
      name: `Fence Installation in ${place}`,
      serviceType: "Fence installation",
      description: a.answer,
      provider: { "@id": ORG_ID },
      areaServed: { "@type": a.state === "DC" ? "City" : "Place", name: place, containedInPlace: { "@type": "AdministrativeArea", name: a.county }, ...(a.zips?.length ? { address: { "@type": "PostalAddress", addressLocality: a.town, addressRegion: a.state, postalCode: a.zips[0], addressCountry: "US" } } : {}) },
      hasOfferCatalog: { "@type": "OfferCatalog", name: `Fences in ${place}`, itemListElement: a.picks.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: svc(p.service).name, url: `${SITE.url}/${p.service}/` } })) },
    }],
  }, `<section class="page-hero page-hero--media"><div class="container">
  <div>
    ${breadcrumbs(trail)}
    <p class="eyebrow">${esc(a.county)} &middot; ${esc(a.drive)}</p>
    <h1>${esc(a.h1)}</h1>
    <p class="lede">${esc(a.intro[0])}</p>
    <div class="btn-row"><a class="btn" href="/contact/#quote">Get a ${esc(a.town)} Quote ${ICON.arrow}</a><a class="btn btn--ghost" href="${SITE.phoneHref}">${ICON.phone} ${SITE.phone}</a></div>
  </div>
  <div class="page-hero__img">${pic(heroImg, { eager: true, sizes: "380px" })}</div>
</div></section>
<section class="section"><div class="container with-aside">
  <article class="prose">
    <div class="answer-box"><p><strong>Fence company in ${esc(place)}</strong>${esc(a.answer)}</p></div>
    ${a.intro.slice(1).map((p) => `<p>${esc(p)}</p>`).join("")}
    <h2>${esc(a.local.heading)}</h2>
    ${a.local.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
    <h2>Fences that fit ${esc(a.town)}</h2>
    <div class="feature-grid">${a.picks.map((p) => `<a class="feature" style="text-decoration:none" href="/${p.service}/"><h3>${esc(svc(p.service).name)}</h3><p>${esc(p.why)}</p></a>`).join("")}<a class="feature" style="text-decoration:none;background:var(--ink);color:#fff" href="/#planner"><h3>Not sure yet?</h3><p style="color:#c5ccc3">Use our 30-second fence planner and we'll recommend options for your yard.</p></a></div>
    <figure class="inline-photo">${pic(svc(a.picks[1].service).img, { sizes: "(min-width: 980px) 700px, 100vw" })}<figcaption>${esc(IMG[svc(a.picks[1].service).img].alt)}.</figcaption></figure>
    <h2>${esc(a.considerations.heading)}</h2>
    <div class="feature-grid">${a.considerations.items.map(([h, p]) => `<div class="feature"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join("")}</div>
    <h2>Neighborhoods we serve around ${esc(a.town)}</h2>
    <ul class="chips" style="list-style:none;padding:0">${a.neighborhoods.map((n) => `<li class="chip"><span>${esc(n)}</span></li>`).join("")}</ul>
    ${a.zips?.length ? `<p style="margin-top:1rem;color:var(--muted)">ZIP codes: ${a.zips.map(esc).join(", ")}</p>` : ""}
    <h2>${esc(a.town)} fence FAQs</h2>
    ${faqList(a.faqs)}
    ${nearby.length ? `<h2>Nearby service areas</h2><p>We also build fences in ${nearby.map((n) => `<a class="text-link" href="/${n.slug}/">${esc(n.town)}</a>`).join(", ")} and <a class="text-link" href="/service-areas/">across Southern Maryland and DC</a>.</p>` : ""}
  </article>
  <aside class="aside-card">
    <h3>${esc(a.town)} fence quote</h3>
    <p>Licensed in Maryland &amp; DC. Building since ${SITE.founded}. <span lang="es">Hablamos español.</span></p>
    <a class="btn" href="/contact/#quote">Request a Quote</a>
    <a class="btn btn--ghost" href="${SITE.phoneHref}">${SITE.phone}</a>
    <hr>
    <h3 style="font-size:1.2rem">Fence types</h3>
    <ul>${SERVICES.map((s) => `<li><a href="/${s.slug}/">${s.name} <span aria-hidden="true">&rarr;</span></a></li>`).join("")}</ul>
  </aside>
</div></section>
${ctaBand(`Ready to fence your ${a.town} yard?`)}`);
}

export function thankYouPage() {
  return page({ title: "Thank You | AFK Fence", description: "Your quote request was sent to AFK Fence.", path: "/thank-you/", noindex: true },
    `<section class="page-hero" style="min-height:60vh"><div class="container"><div>
  <p class="eyebrow">Request received</p>
  <h1>Thank you!<br><span class="accent">We'll be in touch.</span></h1>
  <p class="lede">Your request is on its way to our team. If it's urgent, call or text <a class="text-link" href="${SITE.phoneHref}">${SITE.phone}</a>. <span lang="es">Gracias.</span></p>
  <div class="btn-row"><a class="btn" href="/gallery/">Browse Our Work</a><a class="btn btn--ghost" href="/">Back Home</a></div>
</div></div></section>`);
}

export function notFoundPage() {
  return page({ title: "Page Not Found | AFK Fence", description: "That page could not be found.", path: "/404.html", noindex: true },
    `<section class="page-hero" style="min-height:60vh"><div class="container"><div>
  <p class="eyebrow">404</p>
  <h1>This gate<br><span class="accent">doesn't open.</span></h1>
  <p class="lede">The page you're looking for isn't here. Try one of these instead.</p>
  <div class="btn-row"><a class="btn" href="/">Home</a><a class="btn btn--ghost" href="/services/">Fence Types</a><a class="btn btn--ghost" href="/contact/">Contact</a></div>
</div></div></section>`);
}

export { AREAS };
