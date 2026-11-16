# AFK Fence LLC website

Static HTML/CSS/JS site. The deployable output is the `site/` folder.

## Commands
- `node src/build/build.mjs` builds `site/` from `src/`
- `node serve.mjs` starts a preview at http://localhost:4321. It has a mock form endpoint.

## Deploy
- **GoDaddy / cPanel / any Apache host:** upload the contents of `site/` (including `.htaccess`) to `public_html/`. `send.php` emails quote requests to afkfence@gmail.com through PHP `mail()`. Make sure a `no-reply@afkfence.com` sender exists or is allowed, and set up SPF so the email doesn't land in spam.
- **WordPress:** upload `site/` as a static site in its own folder or subdomain, or rebuild the pages in a block theme using `site/assets/css/site.css`. Replace the form with WPForms or Contact Form 7 and keep the field names.

## Editing content
- Business info, services and FAQs are in `src/build/data.mjs`.
- Town pages are in `src/build/areas/batch-a.mjs` and `batch-b.mjs`. Each town has its own copy.
- Styles are in `src/assets/css/`. Behavior is in `src/assets/js/main.js`.

## Before launch
- Confirm the service-area towns and the neighborhood names on the town pages.
- Replace the Facebook link in `data.mjs` (`facebook`) with the real page URL.
- Submit `sitemap.xml` in Google Search Console, and match the Google Business Profile name, address and phone exactly to the site.
