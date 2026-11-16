import { mkdir, writeFile, readFile, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, SERVICES, GENERAL_FAQS } from "./data.mjs";
import { homePage } from "./pages-home.mjs";
import { servicesHub, servicePage } from "./pages-services.mjs";
import { aboutPage, galleryPage, contactPage, areasHub, areaPage, thankYouPage, notFoundPage } from "./pages-other.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SRC = join(ROOT, "src");
const OUT = join(ROOT, "site");

async function loadAreas() {
  const batches = [["batch-a.mjs", "AREAS_A"], ["batch-b.mjs", "AREAS_B"]];
  const all = [];
  for (const [file, name] of batches) {
    const p = join(SRC, "build", "areas", file);
    if (!existsSync(p)) { console.warn(`[build] missing ${file}, skipping`); continue; }
    const mod = await import(`file:///${p.replace(/\\/g, "/")}`);
    all.push(...mod[name]);
  }
  const required = ["slug", "town", "state", "county", "metaTitle", "metaDescription", "h1", "answer", "intro", "local", "picks", "considerations", "faqs", "nearby", "neighborhoods"];
  all.forEach((a) => {
    const missing = required.filter((k) => !(k in a));
    if (missing.length) throw new Error(`Area ${a.slug || a.town} missing: ${missing.join(", ")}`);
    a.picks.forEach((p) => { if (!SERVICES.some((s) => s.slug === p.service)) throw new Error(`Area ${a.slug}: unknown service ${p.service}`); });
  });
  return all;
}

async function emit(path, html) {
  const file = path.endsWith(".html") ? join(OUT, path) : join(OUT, path, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html, "utf8");
  return path;
}

function sitemap(paths) {
  const today = new Date().toISOString().slice(0, 10);
  const pri = (p) => (p === "/" ? "1.0" : p.startsWith("/fence-company-") ? "0.8" : "0.9");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE.url}${p}</loc><lastmod>${today}</lastmod><priority>${pri(p)}</priority></url>`).join("\n")}
</urlset>
`;
}

function llms(areas) {
  return `# ${SITE.name}

> Family-owned, woman-owned fence installation company in Waldorf, Maryland, building wood, cedar horizontal, vinyl, aluminum and chain link fences and custom gates since ${SITE.founded}. Licensed in Maryland and Washington, DC. Spanish spoken (Hablamos español).

## Contact
- Phone: ${SITE.phone}
- Email: ${SITE.email}
- Address: ${SITE.street}, ${SITE.city}, ${SITE.region} ${SITE.zip}
- Instagram: ${SITE.instagram}

## Services
${SERVICES.map((s) => `- [${s.name}](${SITE.url}/${s.slug}/): ${s.answer}`).join("\n")}

## Service areas
${areas.map((a) => `- [${a.town}, ${a.state}](${SITE.url}/${a.slug}/) (${a.county})`).join("\n")}

## Key facts
${GENERAL_FAQS.map(([q, a]) => `- ${q} ${a}`).join("\n")}

## Pages
- [Home](${SITE.url}/)
- [All services](${SITE.url}/services/)
- [Gallery](${SITE.url}/gallery/)
- [About](${SITE.url}/about/)
- [Contact / quote](${SITE.url}/contact/)
`;
}

const HTACCESS = `# AFK Fence - Apache (GoDaddy / cPanel)
Options -Indexes
ErrorDocument 404 /404.html
DirectoryIndex index.html index.php

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} !^www\\. [NC]
RewriteCond %{HTTP_HOST} ^(?:www\\.)?(.+)$ [NC]
RewriteRule ^ https://www.%1%{REQUEST_URI} [L,NE,R=301]
# Old site URLs
RewriteRule ^cart/?$ / [L,R=301]
</IfModule>

<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
<FilesMatch "\\.(webp|jpg|png|css|js)$">
Header set Cache-Control "public, max-age=2592000"
</FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/json text/plain application/xml
</IfModule>
`;

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  await cp(join(SRC, "assets", "img"), join(OUT, "assets", "img"), { recursive: true });
  await cp(join(SRC, "assets", "js"), join(OUT, "assets", "js"), { recursive: true });
  const css = (await readFile(join(SRC, "assets", "css", "styles.css"), "utf8")) + "\n" + (await readFile(join(SRC, "assets", "css", "innovate.css"), "utf8"));
  await mkdir(join(OUT, "assets", "css"), { recursive: true });
  await writeFile(join(OUT, "assets", "css", "site.css"), css, "utf8");
  await cp(join(SRC, "send.php"), join(OUT, "send.php"));

  const areas = await loadAreas();
  const paths = [];
  paths.push(await emit("/", homePage(areas)));
  paths.push(await emit("/services/", servicesHub()));
  for (const s of SERVICES) paths.push(await emit(`/${s.slug}/`, servicePage(s, areas)));
  paths.push(await emit("/service-areas/", areasHub(areas)));
  for (const a of areas) paths.push(await emit(`/${a.slug}/`, areaPage(a, areas)));
  paths.push(await emit("/gallery/", galleryPage()));
  paths.push(await emit("/about/", aboutPage()));
  paths.push(await emit("/contact/", contactPage()));
  await emit("/thank-you/", thankYouPage());
  await emit("/404.html", notFoundPage());

  await writeFile(join(OUT, "sitemap.xml"), sitemap(paths), "utf8");
  await writeFile(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${SITE.url}/sitemap.xml\n`, "utf8");
  await writeFile(join(OUT, "llms.txt"), llms(areas), "utf8");
  await writeFile(join(OUT, ".htaccess"), HTACCESS, "utf8");
  console.log(`[build] ${paths.length} indexable pages (${areas.length} area pages) -> ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
