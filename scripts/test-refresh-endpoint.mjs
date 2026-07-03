// Manually trigger the deployed cron refresh endpoint and print the result.
//
//   CRON_URL=https://your-domain.com CRON_SECRET=xxxx npm run refresh:prod-test
//
// Reads CRON_URL and CRON_SECRET from the environment, falling back to .env.local.
// Never prints the secret.

import { readFileSync } from "fs";

function loadEnv() {
  const env = { ...process.env };
  try {
    for (const line of readFileSync(".env.local", "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !(m[1] in env)) env[m[1]] = m[2].trim();
    }
  } catch {}
  return env;
}

const env = loadEnv();
const base = (env.CRON_URL || "").replace(/\/$/, "");
const secret = env.CRON_SECRET || "";

if (!base) {
  console.error("✗ Set CRON_URL (e.g. https://your-domain.com)");
  process.exit(1);
}
if (!secret) {
  console.error("✗ Set CRON_SECRET");
  process.exit(1);
}

const url = `${base}/api/cron/refresh-platforms`;
console.log(`→ POST-equivalent GET ${url}`);

const res = await fetch(url, {
  headers: { Authorization: `Bearer ${secret}` },
});

const text = await res.text();
let body;
try {
  body = JSON.parse(text);
} catch {
  body = text;
}

console.log(`HTTP ${res.status}`);
console.log(typeof body === "string" ? body : JSON.stringify(body, null, 2));

process.exitCode = res.ok ? 0 : 1;
