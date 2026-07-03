// Refreshes data/github-profile.json from the public GitHub REST API.
// Run:  node scripts/refresh-github.mjs   (or: npm run refresh:github)
// Reads GITHUB_USER / GITHUB_TOKEN (optional, for higher rate limit) from .env.local.

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
const USER = env.GITHUB_USER || "msmasood";
const TOKEN = env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
const TOP_REPOS = Number(env.GITHUB_TOP_REPOS || 6);

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "portfolio-refresh-script",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) {
    console.error(`✗ GitHub error ${res.status} on ${path}:`, await res.text());
    process.exit(1);
  }
  return res.json();
}

console.log(`Fetching GitHub profile for "${USER}" ...`);

const u = await gh(`/users/${USER}`);
const rawRepos = await gh(`/users/${USER}/repos?per_page=100&sort=updated`);

const totalStars = rawRepos.reduce((a, r) => a + (r.stargazers_count || 0), 0);

const repos = rawRepos
  .filter((r) => !r.fork)
  .sort(
    (a, b) =>
      b.stargazers_count - a.stargazers_count ||
      new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  )
  .slice(0, TOP_REPOS)
  .map((r) => ({
    name: r.name,
    description: r.description || "",
    url: r.html_url,
    language: r.language || "",
    stars: r.stargazers_count || 0,
    forks: r.forks_count || 0,
  }));

const data = {
  fetchedAt: new Date().toISOString(),
  profile: {
    login: u.login,
    name: u.name || u.login,
    bio: u.bio || "",
    avatar: u.avatar_url,
    url: u.html_url,
    followers: u.followers || 0,
    following: u.following || 0,
    publicRepos: u.public_repos || 0,
    totalStars,
    company: u.company || "",
    location: u.location || "",
    blog: u.blog || "",
  },
  repos,
};

writeFileSync("data/github-profile.json", JSON.stringify(data, null, 2));
console.log(`✓ Saved profile + ${repos.length} repos to data/github-profile.json`);
