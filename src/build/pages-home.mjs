import { SITE, SERVICES, GENERAL_FAQS, YEARS } from "./data.mjs";
import { page, pic, esc, ICON, ctaBand, faqList, faqSchema } from "./layout.mjs";

const SHOWCASE = [
  { key: "cedar", tab: "Cedar Horizontal", title: "Cedar Horizontal", body: "Tight, modern boards in real cedar with matching gates and black strap hinges." },
  { key: "vinylSpindle", tab: "Vinyl + Spindle", title: "White Vinyl, Black Spindle", body: "Zero-maintenance white vinyl privacy crowned with a sleek black spindle topper." },
  { key: "aluminum", tab: "Aluminum", title: "Black Aluminum", body: "The wrought-iron look with no rust, ever. Perfect for pools and front yards." },
  { key: "woodGate", tab: "Wood Privacy", title: "Wood Privacy", body: "Pressure-treated pine, set deep in concrete, with gates that swing true." },
  { key: "chainLink", tab: "Chain Link", title: "Black Chain Link", body: "Vinyl-coated chain link that disappears into the yard. Silver, black, green or white." },
];

function hero() {
  const tabs = SHOWCASE.map((s, i) => `<button type="button" role="tab" id="sc-tab-${i}" aria-controls="sc-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-title="${esc(s.title)}" data-body="${esc(s.body)}">${esc(s.tab)}</button>`).join("");
  const pics = SHOWCASE.map((s, i) => pic(s.key, { cls: i === 0 ? "is-active" : "", eager: i === 0, sizes: "(min-width: 980px) 500px, 92vw" })).join("");
  return `<section class="hero" aria-labelledby="hero-h">
  <div class="container" data-showcase>
    <div>
      <p class="eyebrow">Waldorf, MD &middot; Southern Maryland &middot; Washington, DC</p>
      <h1 id="hero-h"><span class="line">Fences built</span><span class="line">like it's our</span><span class="line accent">own home.</span></h1>
      <p class="lede">AFK Fence is a family-owned, woman-owned fence company installing wood, cedar, vinyl, aluminum and chain link fences since ${SITE.founded}. Straight lines, deep posts, gates that close right.</p>
      <div class="btn-row">
        <a class="btn" href="/contact/#quote">Get a Quote ${ICON.arrow}</a>
        <a class="btn btn--ghost" href="${SITE.phoneHref}">${ICON.phone} ${SITE.phone}</a>
      </div>
      <div class="switcher">
        <p class="switcher__label" id="sc-label">Preview a style</p>
        <div class="switcher__tabs" role="tablist" aria-labelledby="sc-label">${tabs}</div>
      </div>
    </div>
    <div class="showcase" id="sc-panel" role="tabpanel" aria-live="polite">
      <div class="showcase__frame">${pics}</div>
      <div class="showcase__badge"><div><strong>${YEARS}+</strong><span>Years</span></div></div>
      <div class="showcase__spec"><small>Now showing</small><strong data-spec-title>${esc(SHOWCASE[0].title)}</strong><p data-spec-body>${esc(SHOWCASE[0].body)}</p></div>
    </div>
  </div>
</section>`;
}

function ticker() {
  const words = ["Wood", "Cedar Horizontal", "Vinyl", "Aluminum", "Chain Link", "Custom Gates", "Since 2004", "Hablamos Español"];
  const group = words.map((w, i) => `<span${i % 2 ? ' class="o"' : ""}>${w}</span><i></i>`).join("");
  return `<div class="ticker" aria-hidden="true"><div class="ticker__track"><div class="ticker__group">${group}</div><div class="ticker__group">${group}</div></div></div>`;
}

function trust() {
  const items = [
    [ICON.calendar, `Since ${SITE.founded}`, `${YEARS}+ years building fences`],
    [ICON.shield, "Licensed", "Maryland & Washington, DC"],
    [ICON.heart, "Woman-Owned", "Family-run, values-first"],
    [ICON.chat, "Bilingual", "Hablamos español"],
  ];
  return `<section class="trust" aria-label="Why homeowners trust AFK Fence"><div class="container"><ul>${items.map(([ic, a, b]) => `<li>${ic}<div><strong>${a}</strong><span>${b}</span></div></li>`).join("")}</ul></div></section>`;
}

function services() {
  const cards = SERVICES.filter((s) => s.slug !== "cedar-horizontal-fence");
  const ordered = [SERVICES.find((s) => s.slug === "cedar-horizontal-fence"), ...cards].slice(0, 4);
  const extra = SERVICES.filter((s) => !ordered.includes(s));
  return `<section class="section" aria-labelledby="svc-h">
  <div class="container">
    <div class="section-head section-head--split reveal">
      <div><p class="eyebrow">What we build</p><h2 id="svc-h">Five materials.<br>Zero shortcuts.</h2></div>
      <p class="lede">Vinyl, wood, aluminum and chain link are our most common fences, and we design custom fences and gates too. Pick a style to see how we build it.</p>
    </div>
    <div class="bento">
      ${ordered.map((s, i) => `<a class="svc-card reveal" href="/${s.slug}/">
        ${pic(s.img, { sizes: i === 0 ? "(min-width: 720px) 66vw, 100vw" : "(min-width: 720px) 33vw, 100vw" })}
        <span class="svc-card__num">0${i + 1}</span>
        <h3>${s.name}</h3><p>${s.card}</p>
        <span class="svc-card__more">Explore ${s.short} ${ICON.arrow}</span>
      </a>`).join("")}
    </div>
    <p style="margin-top:1.5rem">${extra.map((s) => `Also: <a class="text-link" href="/${s.slug}/">${s.name}</a> &middot; `).join("")}<a class="text-link" href="/services/">Compare all fence types</a></p>
  </div>
</section>`;
}

function buildLine(label = "Every fence, built picket by picket") {
  return `<div class="build-line" data-build-line aria-hidden="true"><span class="build-line__label">${label}</span><div class="build-line__row">${Array.from({ length: 48 }, (_, i) => `<b style="--i:${Math.abs(i - 23.5) | 0}"></b>`).join("")}</div><div class="build-line__rail build-line__rail--1"></div><div class="build-line__rail build-line__rail--2"></div></div>`;
}

function chips(name, options, checked) {
  return `<div class="chips">${options.map((o) => `<label class="chip"><input type="radio" name="${name}" value="${esc(o)}"${o === checked ? " checked" : ""}><span>${esc(o)}</span></label>`).join("")}</div>`;
}

export function planner() {
  return `<section class="section section--paper2 picket-top" id="planner" aria-labelledby="plan-h">
  <div class="container">
    <div class="section-head section-head--split reveal">
      <div><p class="eyebrow">Fence planner</p><h2 id="plan-h">Plan your fence<br>in 30 seconds.</h2></div>
      <p class="lede">Tap through your options and we'll hand your plan straight to our team, so your quote conversation starts where you left off.</p>
    </div>
    <form class="planner reveal" data-planner onsubmit="return false">
      <div>
        <fieldset><legend><em>1</em> Material</legend>${chips("material", ["Wood", "Cedar Horizontal", "Vinyl", "Aluminum", "Chain Link", "Not sure yet"], "Vinyl")}</fieldset>
        <fieldset><legend><em>2</em> Height</legend>${chips("height", ["4 ft", "5 ft", "6 ft", "8 ft"], "6 ft")}</fieldset>
        <fieldset><legend><em>3</em> Approx. length</legend>
          <div class="range-wrap"><label class="visually-hidden" for="plan-feet">Approximate linear feet</label><input type="range" id="plan-feet" name="feet" min="25" max="600" step="5" value="150"><output id="plan-feet-out" for="plan-feet">150 ft</output></div>
        </fieldset>
        <fieldset><legend><em>4</em> Gates</legend>${chips("gates", ["None", "1 walk gate", "2 walk gates", "Double / drive gate"], "1 walk gate")}</fieldset>
        <fieldset style="margin-bottom:0"><legend><em>5</em> Main goal</legend>${chips("purpose", ["Privacy", "Pets & kids", "Pool", "Curb appeal", "Security"], "Privacy")}</fieldset>
      </div>
      <aside class="planner__summary" aria-live="polite">
        <h3>Your fence plan</h3>
        <div class="planner__viz" aria-hidden="true"></div>
        <dl>
          <div><dt>Material</dt><dd data-out="material"></dd></div>
          <div><dt>Height</dt><dd data-out="height"></dd></div>
          <div><dt>Length</dt><dd data-out="feet"></dd></div>
          <div><dt>Gates</dt><dd data-out="gates"></dd></div>
          <div><dt>Goal</dt><dd data-out="purpose"></dd></div>
        </dl>
        <a class="btn" href="/contact/#quote" data-planner-link>Send My Plan ${ICON.arrow}</a>
        <small>No obligation. We'll confirm measurements on site.</small>
      </aside>
    </form>
  </div>
</section>`;
}

function about() {
  return `<section class="section" aria-labelledby="about-h">
  <div class="container split">
    <div class="photo-pair reveal">
      <figure class="tilt">${pic("woodPrivacy")}</figure>
      <figure>${pic("vinylPrivacy")}</figure>
    </div>
    <div class="reveal">
      <p class="eyebrow">Family-owned &middot; Woman-owned</p>
      <h2 id="about-h">We treat your yard like our own.</h2>
      <p class="lede">AFK Fence LLC is a proud family-owned fencing company built on trust, craftsmanship and strong values. Every project gets the care, precision and personal touch we'd want at our own home.</p>
      <ul class="checklist">
        <li>${ICON.check}<span><strong>Clear communication</strong> from the first consultation to the final walk-through.</span></li>
        <li>${ICON.check}<span><strong>Attention to small details</strong>: level tops, plumb posts, clean cuts, tidy job sites.</span></li>
        <li>${ICON.check}<span><strong>Homes and commercial properties</strong> across Maryland and Washington, DC.</span></li>
      </ul>
      <a class="btn btn--green" href="/about/">Meet AFK Fence ${ICON.arrow}</a>
      <div class="stat-row">
        <div><strong>${SITE.founded}</strong><span>Building fences since</span></div>
        <div><strong>MD+DC</strong><span>Licensed</span></div>
        <div><strong>5</strong><span>Fence materials</span></div>
      </div>
    </div>
  </div>
</section>`;
}

function process() {
  const steps = [
    ["Reach out", "Call, text, email or send your fence plan. Tell us what you want the fence to do."],
    ["On-site visit", "We walk the property, measure, talk through materials, gates and layout, and answer questions."],
    ["Clear quote", "You get a straightforward quote. Once approved, we schedule and handle utility marking."],
    ["Build day", "Posts set, panels hung, gates adjusted, site cleaned up. We walk it with you before we leave."],
  ];
  return `<section class="section section--dark picket-top" aria-labelledby="proc-h">
  <div class="container">
    <div class="section-head section-head--split reveal">
      <div><p class="eyebrow">How it works</p><h2 id="proc-h">From first call to<br><span class="accent">final latch.</span></h2></div>
      <p class="lede">A simple, honest process with no surprises. In English or Spanish.</p>
    </div>
    <ol class="steps reveal">${steps.map(([h, p]) => `<li><h3>${h}</h3><p>${p}</p></li>`).join("")}</ol>
  </div>
</section>`;
}

function galleryTeaser() {
  const keys = ["cedar", "aluminum", "vinylSpindle", "woodGate", "chainLink", "vinylPrivacy"];
  return `<section class="section" aria-labelledby="work-h">
  <div class="container">
    <div class="section-head section-head--split reveal">
      <div><p class="eyebrow">Recent work</p><h2 id="work-h">Real fences.<br>Real yards.</h2></div>
      <p class="lede">Every photo here is an AFK Fence install. Look for our blue sign on the post. <a class="text-link" href="/gallery/">See the full gallery</a></p>
    </div>
    <div class="gallery reveal">${keys.map((k) => `<figure>${pic(k, { sizes: "(min-width: 900px) 33vw, 50vw" })}</figure>`).join("")}</div>
  </div>
</section>`;
}

function areasTeaser(areaPages) {
  const links = areaPages.map((a) => `<li><a href="/${a.slug}/">${esc(a.town)}${a.state === "DC" ? "" : ", " + a.state}</a></li>`).join("");
  return `<section class="section section--green picket-top" aria-labelledby="areas-h">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">Where we work</p>
      <h2 id="areas-h">Rooted in Waldorf.<br>Building across MD &amp; DC.</h2>
      <p class="lede" style="color:#cfe3d1">From our shop on Gardner Road we install fences throughout Charles County, Prince George's County, Southern Maryland and Washington, DC.</p>
      <a class="btn" href="/service-areas/">All Service Areas ${ICON.arrow}</a>
    </div>
    <ul class="area-links reveal">${links}</ul>
  </div>
</section>`;
}

export function homePage(areaPages) {
  const faqs = GENERAL_FAQS;
  return page({
    title: "AFK Fence LLC | Fence Company in Waldorf, MD & Washington, DC",
    description: "Family & woman-owned fence company in Waldorf, MD since 2004. Wood, cedar, vinyl, aluminum & chain link fences. Licensed MD & DC. Call (240) 615-6308.",
    path: "/",
    preload: "cedar-horizontal-fence-gate",
    schema: [faqSchema(faqs)],
  }, `${hero()}
${ticker()}
${trust()}
${services()}
${buildLine()}
${planner()}
${about()}
${process()}
${galleryTeaser()}
${areasTeaser(areaPages)}
<section class="section" aria-labelledby="faq-h">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Straight answers</p><h2 id="faq-h">Fence questions, answered.</h2></div>
    ${faqList(faqs)}
  </div>
</section>
${ctaBand()}`);
}

export { buildLine };
