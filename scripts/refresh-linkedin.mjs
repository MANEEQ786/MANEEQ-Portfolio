// Refreshes data/linkedin-posts.json by scraping the LinkedIn profile via Apify.
// Run:  node scripts/refresh-linkedin.mjs   (or: npm run refresh:linkedin)
// Reads APIFY_TOKEN / LINKEDIN_PROFILE / APIFY_LINKEDIN_ACTOR from .env.local.

import { writeFileSync, readFileSync } from "fs";

function loadEnv() {
  const env = {};
  try {
    for (const line of readFileSync(".env.local", "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].trim();
    }
  } catch {}
  return env;
}

const env = loadEnv();
const TOKEN = env.APIFY_TOKEN || process.env.APIFY_TOKEN;
const PROFILE = env.LINKEDIN_PROFILE || "smasoodpk";
const ACTOR = (env.APIFY_LINKEDIN_ACTOR || "apimaestro/linkedin-profile-posts").replace("/", "~");
const TOTAL = Number(env.LINKEDIN_TOTAL_POSTS || 12);

if (!TOKEN) {
  console.error("✗ Missing APIFY_TOKEN in .env.local");
  process.exit(1);
}

const url = `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?token=${TOKEN}`;
console.log(`Scraping LinkedIn posts for "${PROFILE}" via ${ACTOR} ...`);

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: PROFILE, total_posts: TOTAL }),
});

if (!res.ok) {
  console.error("✗ Apify error", res.status, await res.text());
  process.exit(1);
}

const src = await res.json();
const posts = (Array.isArray(src) ? src : []).map((p) => {
  const a = p.author || {};
  const m = p.media && typeof p.media === "object" && !Array.isArray(p.media) ? p.media : null;
  const pa = p.posted_at || {};
  const st = p.stats || {};
  return {
    id: p.urn,
    url: p.url,
    type: p.post_type,
    text: p.text || "",
    date: pa.date,
    relative: (pa.relative || "").split("•")[0].trim(),
    reactions: Number(st.total_reactions || 0),
    author: {
      name: `${a.first_name || ""} ${a.last_name || ""}`.trim(),
      headline: a.headline || "",
      profileUrl: a.profile_url,
      picture: a.profile_picture,
      type: a.actor_type,
    },
    media: m ? { type: m.type, url: m.url, thumbnail: m.thumbnail } : null,
  };
});

// Don't let an empty/failed scrape wipe a working snapshot to blank.
if (posts.length === 0) {
  console.error("✗ LinkedIn returned 0 posts — keeping existing data/linkedin-posts.json");
  process.exit(1);
}

writeFileSync(
  "data/linkedin-posts.json",
  JSON.stringify({ profile: PROFILE, fetchedAt: new Date().toISOString(), posts }, null, 2)
);
console.log(`✓ Saved ${posts.length} posts to data/linkedin-posts.json`);
