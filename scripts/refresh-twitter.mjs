// Refreshes data/twitter-posts.json by scraping the X (Twitter) profile via Apify.
// Run:  node scripts/refresh-twitter.mjs   (or: npm run refresh:twitter)
// Reads APIFY_TOKEN / X_PROFILE / APIFY_X_ACTOR / X_TOTAL_POSTS from .env.local.

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

function relativeTime(dateStr) {
  const then = new Date(dateStr).getTime();
  if (!then) return "";
  const d = Math.floor((Date.now() - then) / 86400000);
  if (d < 1) return "today";
  if (d < 7) return `${d} ${d === 1 ? "day" : "days"} ago`;
  if (d < 30) {
    const w = Math.floor(d / 7);
    return `${w} ${w === 1 ? "week" : "weeks"} ago`;
  }
  if (d < 365) {
    const mo = Math.floor(d / 30);
    return `${mo} ${mo === 1 ? "month" : "months"} ago`;
  }
  const y = Math.floor(d / 365);
  return `${y} ${y === 1 ? "year" : "years"} ago`;
}

const env = loadEnv();
const TOKEN = env.APIFY_TOKEN || process.env.APIFY_TOKEN;
const PROFILE = env.X_PROFILE || "isaqibmasood";
const ACTOR = (
  env.APIFY_X_ACTOR ||
  "xtdata/twitter-x-user-tweets-scraper"
).replace("/", "~");
const TOTAL = Number(env.X_TOTAL_POSTS || 50);

if (!TOKEN) {
  console.error("✗ Missing APIFY_TOKEN in .env.local");
  process.exit(1);
}

const url = `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?token=${TOKEN}`;
console.log(`Scraping X posts for "@${PROFILE}" via ${ACTOR} ...`);

// This actor is flaky: the same request intermittently returns 0 tweets even on
// HTTP 200. And its `twitterHandles` mode is broken (returns [] for everyone),
// so we pass the profile via `startUrls`. Retry until it returns data.
const MAX_TRIES = Number(env.X_MAX_TRIES || 5);
async function fetchTweets() {
  for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startUrls: [`https://twitter.com/${PROFILE}`], maxItems: TOTAL }),
    });
    if (!res.ok) {
      console.error(`✗ Apify error ${res.status} (attempt ${attempt}/${MAX_TRIES}):`, await res.text());
    } else {
      const data = await res.json();
      if (Array.isArray(data) && data.length) return data;
      console.warn(`! Attempt ${attempt}/${MAX_TRIES}: 0 tweets returned, retrying ...`);
    }
  }
  return [];
}

// This actor returns raw X (GraphQL) tweet objects. Helpers below flatten the
// nested structure (legacy / core / retweeted_status_result) into a clean shape.

// Long tweets put their untruncated body in note_tweet; otherwise legacy.full_text.
function pickText(node, legacy) {
  const note = node?.note_tweet?.note_tweet_results?.result?.text;
  if (note) return note;
  return legacy?.full_text || legacy?.text || "";
}

function pickMedia(legacy) {
  const list =
    (legacy?.extended_entities && legacy.extended_entities.media) ||
    (legacy?.entities && legacy.entities.media) ||
    [];
  const m = list[0];
  return m ? { type: m.type || "photo", url: m.media_url_https || m.media_url || "" } : null;
}

// Normalize either a flat author object or a nested user_result.result into
// { name, handle, picture, verified }.
function normUser(u) {
  if (!u) return { name: "", handle: PROFILE, picture: "", verified: false };
  const legacy = u.legacy || u;
  return {
    name: legacy.name || "",
    handle: legacy.screen_name || PROFILE,
    picture: (legacy.profile_image_url_https || "").replace("_normal", "_400x400"),
    verified: Boolean(u.is_blue_verified || legacy.verified),
  };
}

const src = await fetchTweets();
const posts = (Array.isArray(src) ? src : [])
  .filter((t) => t && t.id)
  .map((t) => {
    const rt = t.retweeted_status_result && t.retweeted_status_result.result;
    const isRepost = Boolean(rt);

    // For a repost, read text/author/media/stats from the original tweet.
    const legacy = isRepost ? rt.legacy || {} : t;
    const noteNode = isRepost ? rt : t;
    const user = isRepost
      ? rt.core && rt.core.user_result && rt.core.user_result.result
      : t.author;
    const author = normUser(user);

    const restId = isRepost ? rt.rest_id : t.id;
    const url =
      author.handle && restId
        ? `https://x.com/${author.handle}/status/${restId}`
        : t.url || t.twitterUrl || "";

    const m = pickMedia(legacy);
    return {
      id: String(t.id),
      url,
      type: isRepost ? "repost" : "tweet",
      text: pickText(noteNode, legacy),
      // Top-level created_at is when it hit this timeline (repost time).
      date: t.created_at,
      relative: relativeTime(t.created_at),
      likes: Number(legacy.favorite_count || 0),
      retweets: Number(legacy.retweet_count || 0),
      replies: Number(legacy.reply_count || 0),
      views: Number((t.view_count_info && t.view_count_info.count) || 0),
      isReply: Boolean(!isRepost && t.in_reply_to_status_id_str),
      isPinned: false,
      author,
      media: m,
    };
  })
  // Newest first.
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Don't let an empty/failed scrape wipe a working snapshot to blank.
if (posts.length === 0) {
  console.error("✗ X returned 0 posts — keeping existing data/twitter-posts.json");
  process.exit(1);
}

writeFileSync(
  "data/twitter-posts.json",
  JSON.stringify({ profile: PROFILE, fetchedAt: new Date().toISOString(), posts }, null, 2)
);
console.log(`✓ Saved ${posts.length} posts to data/twitter-posts.json`);
