// Fetches the real cover image for each LinkedIn newsletter edition by reading
// the public Open Graph (og:image) tag of each post URL, and writes a
// { postUrl: imageUrl } map to data/blog-images.json. The Blog page (lib/blog.ts)
// looks images up by URL. Run after the LinkedIn refresh (refresh-all does this).
// Run:  node scripts/refresh-blog.mjs   (or via: npm run refresh:all)

import { writeFileSync, readFileSync } from "fs";

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

let posts = [];
try {
  posts = JSON.parse(readFileSync("data/linkedin-posts.json", "utf8")).posts || [];
} catch {
  console.error("✗ data/linkedin-posts.json not found — run refresh:linkedin first");
  process.exit(1);
}

const editions = posts.filter(
  (p) => p.type !== "repost" && /newsletter|ai & data intelligence|data intelligence insight/i.test(p.text || "")
);

const out = {};
for (const p of editions) {
  if (!p.url) continue;
  try {
    const html = await fetch(p.url, { headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" } }).then((r) => r.text());
    const m =
      html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
      html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
    if (m) out[p.url] = m[1].replace(/&amp;/g, "&");
  } catch (e) {
    console.warn(`! og:image fetch failed for a post: ${e.message}`);
  }
}

// Don't overwrite a good map with an empty one (LinkedIn may rate-limit).
if (Object.keys(out).length === 0) {
  console.error("✗ Got 0 cover images — keeping existing data/blog-images.json");
  process.exit(1);
}

writeFileSync("data/blog-images.json", JSON.stringify(out, null, 2));
console.log(`✓ Saved ${Object.keys(out).length}/${editions.length} blog cover images to data/blog-images.json`);
