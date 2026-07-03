// Refreshes data/upwork-profile.json by scraping the Upwork freelancer profile
// via Apify. Upwork has no public profile API and blocks direct profile-URL
// scraping, so we run a talent search by name and pick the matching username.
// Run:  node scripts/refresh-upwork.mjs   (or: npm run refresh:upwork)
// Reads APIFY_TOKEN / UPWORK_USERNAME / UPWORK_SEARCH_QUERY / APIFY_UPWORK_ACTOR.

import { writeFileSync, readFileSync, mkdirSync } from "fs";

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
const USERNAME = env.UPWORK_USERNAME || "smasoodpk";
const QUERY = env.UPWORK_SEARCH_QUERY || "Saqib Masood";
const ACTOR = (env.APIFY_UPWORK_ACTOR || "parseforge/upwork-freelancers-scraper").replace("/", "~");

if (!TOKEN) {
  console.error("✗ Missing APIFY_TOKEN in .env.local");
  process.exit(1);
}

const url = `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?token=${TOKEN}`;
console.log(`Searching Upwork talent "${QUERY}" to find "${USERNAME}" via ${ACTOR} ...`);

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ searchQuery: QUERY, maxItems: 20 }),
});

if (!res.ok) {
  console.error("✗ Apify error", res.status, await res.text());
  process.exit(1);
}

const src = await res.json();
const list = Array.isArray(src) ? src : [];
const f =
  list.find((x) => (x.profileUrl || "").toLowerCase().includes(USERNAME.toLowerCase())) || null;

if (!f) {
  console.error(
    `✗ Could not find "${USERNAME}" in ${list.length} search results. ` +
      `Try a different UPWORK_SEARCH_QUERY in .env.local.`
  );
  process.exit(1);
}

// Map Upwork's status codes to human-readable badges.
const BADGES = {
  top_rated_plus: "Top Rated Plus",
  top_rated: "Top Rated",
  hipo: "Rising Talent",
};
const badge =
  BADGES[f.topRatedPlusStatus] && f.topRatedPlusStatus === "top_rated_plus"
    ? "Top Rated Plus"
    : BADGES[f.topRatedStatus] || "";

// Upwork returns skills as slugs ("generative-technique"); make them readable.
const SKILL_OVERRIDES = { saas: "SaaS", ai: "AI", ui: "UI", ux: "UX", api: "API", mvp: "MVP" };
const prettySkill = (s) =>
  String(s)
    .split("-")
    .map((w) => SKILL_OVERRIDES[w.toLowerCase()] || w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// Upwork's portrait CDN blocks hotlinking from other origins, so download the
// real photo and serve it locally from /public so it always renders.
let portraitFile = "";
const portraitUrl = f.portraitUrl || "";
if (portraitUrl) {
  try {
    const img = await fetch(portraitUrl, { headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.upwork.com/" } });
    if (img.ok) {
      const buf = Buffer.from(await img.arrayBuffer());
      const ct = img.headers.get("content-type") || "";
      const ext = ct.includes("png") ? "png" : ct.includes("webp") ? "webp" : "jpg";
      mkdirSync("public/upwork", { recursive: true });
      writeFileSync(`public/upwork/portrait.${ext}`, buf);
      portraitFile = `/upwork/portrait.${ext}`;
      console.log(`✓ Downloaded portrait → public${portraitFile}`);
    } else {
      console.warn(`! Portrait download failed (${img.status}); card will fall back to remote URL`);
    }
  } catch (e) {
    console.warn(`! Portrait download error: ${e.message}; card will fall back to remote URL`);
  }
}

const profile = {
  name: `${(f.firstName || "").trim()} ${(f.lastName || "").trim()}`.trim(),
  title: f.title || "",
  description: f.description || "",
  portrait: portraitUrl,
  portraitFile,
  url: f.profileUrl || `https://www.upwork.com/freelancers/${USERNAME}`,
  hourlyRate: f.hourlyRate || 0,
  currency: f.currency || "USD",
  badge,
  jobSuccessScore: f.jobSuccessScore || 0,
  totalEarnings: f.totalEarnings || 0,
  totalJobs: f.totalJobs || 0,
  totalHours: f.totalHours || 0,
  location: [f.city, f.country].filter(Boolean).join(", "),
  availabilityBadge: Boolean(f.hasAvailabilityBadge),
  skills: (Array.isArray(f.skills) ? f.skills : []).map(prettySkill),
};

writeFileSync(
  "data/upwork-profile.json",
  JSON.stringify({ username: USERNAME, fetchedAt: new Date().toISOString(), profile }, null, 2)
);
console.log(`✓ Saved Upwork profile for "${USERNAME}" to data/upwork-profile.json`);
