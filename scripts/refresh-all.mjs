// Runs all four data refreshers in sequence, overwriting the data/*.json
// snapshots with fresh data (each run replaces the previous file contents).
// Continues if one source fails — a single failure (e.g. Apify out of credits)
// won't block the others, and a failed source keeps its last-good file rather
// than being blanked.
// Run:  node scripts/refresh-all.mjs   (or: npm run refresh:all)

import { spawnSync } from "child_process";

const jobs = [
  ["GitHub", "scripts/refresh-github.mjs"],
  ["LinkedIn", "scripts/refresh-linkedin.mjs"],
  ["Twitter", "scripts/refresh-twitter.mjs"],
  ["Upwork", "scripts/refresh-upwork.mjs"],
  // Blog covers depend on a fresh linkedin-posts.json, so run after LinkedIn.
  ["Blog covers", "scripts/refresh-blog.mjs"],
];

const stamp = () => new Date().toISOString();
console.log(`\n[${stamp()}] Refreshing all ${jobs.length} platforms ...`);

// Use the same node binary running this script (cron/launchd has a minimal PATH
// and may not resolve a bare "node").
const results = jobs.map(([name, script]) => {
  const r = spawnSync(process.execPath, [script], { stdio: "inherit" });
  return [name, r.status === 0];
});

const ok = results.filter(([, s]) => s).map(([n]) => n);
const failed = results.filter(([, s]) => !s).map(([n]) => n);
console.log(
  `[${stamp()}] Done. Updated: ${ok.join(", ") || "none"}` +
    (failed.length ? ` | Failed (kept old data): ${failed.join(", ")}` : "")
);

// Non-zero only if everything failed, so a partial run still counts as success.
process.exitCode = failed.length && !ok.length ? 1 : 0;
