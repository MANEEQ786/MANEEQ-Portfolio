/**
 * Typed access to the environment for the refresh modules.
 *
 * Reads ONLY from process.env (Next.js loads .env.local into process.env in dev;
 * Vercel injects the configured env in production). The modules never read the
 * .env.local file directly, so production never depends on a local file.
 *
 * Never log the returned token values.
 */

function str(name: string, fallback = ''): string {
  const v = process.env[name];
  return v == null || v === '' ? fallback : v.trim();
}

function num(name: string, fallback: number): number {
  const v = Number(process.env[name]);
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

/** Apify actor ids are written "owner/actor" but the API wants "owner~actor". */
function actor(name: string, fallback: string): string {
  return str(name, fallback).replace('/', '~');
}

export interface RefreshEnv {
  apifyToken: string;

  github: { user: string; token: string; topRepos: number };
  linkedin: { profile: string; actor: string; totalPosts: number };
  twitter: { profile: string; actor: string; totalPosts: number; maxTries: number };
  upwork: { username: string; searchQuery: string; actor: string };
}

export function getEnv(): RefreshEnv {
  return {
    apifyToken: str('APIFY_TOKEN'),

    github: {
      user: str('GITHUB_USER', 'msmasood'),
      token: str('GITHUB_TOKEN'),
      topRepos: num('GITHUB_TOP_REPOS', 6),
    },
    linkedin: {
      profile: str('LINKEDIN_PROFILE', 'smasoodpk'),
      actor: actor('APIFY_LINKEDIN_ACTOR', 'apimaestro/linkedin-profile-posts'),
      totalPosts: num('LINKEDIN_TOTAL_POSTS', 12),
    },
    twitter: {
      profile: str('X_PROFILE', 'isaqibmasood'),
      actor: actor('APIFY_X_ACTOR', 'xtdata/twitter-x-user-tweets-scraper'),
      totalPosts: num('X_TOTAL_POSTS', 50),
      maxTries: num('X_MAX_TRIES', 5),
    },
    upwork: {
      username: str('UPWORK_USERNAME', 'smasoodpk'),
      searchQuery: str('UPWORK_SEARCH_QUERY', 'Saqib Masood'),
      actor: actor('APIFY_UPWORK_ACTOR', 'parseforge/upwork-freelancers-scraper'),
    },
  };
}

/** True when running on Vercel in the production environment. */
export function isProduction(): boolean {
  return process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
}

/** Throws if APIFY_TOKEN is missing (the Apify-backed sources need it). */
export function requireApifyToken(env: RefreshEnv): string {
  if (!env.apifyToken) throw new Error('APIFY_TOKEN is not configured');
  return env.apifyToken;
}
