/**
 * GitHub profile + top repos via the public REST API.
 * Mirrors scripts/refresh-github.mjs. Returns data; never writes.
 */

import { getEnv } from './env';
import { fetchJson } from './http';
import type { GitHubRepo, GitHubSnapshot, RefreshResult } from './types';

interface RawRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  pushed_at: string;
}

interface RawUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  company: string | null;
  location: string | null;
  blog: string | null;
}

export async function refreshGitHub(): Promise<RefreshResult<GitHubSnapshot>> {
  const fetchedAt = new Date().toISOString();
  const { github } = getEnv();

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-refresh',
    ...(github.token ? { Authorization: `Bearer ${github.token}` } : {}),
  };

  try {
    const u = await fetchJson<RawUser>(`https://api.github.com/users/${github.user}`, { headers });
    const rawRepos = await fetchJson<RawRepo[]>(
      `https://api.github.com/users/${github.user}/repos?per_page=100&sort=updated`,
      { headers },
    );

    const totalStars = rawRepos.reduce((a, r) => a + (r.stargazers_count || 0), 0);

    const repos: GitHubRepo[] = rawRepos
      .filter((r) => !r.fork)
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      )
      .slice(0, github.topRepos)
      .map((r) => ({
        name: r.name,
        description: r.description || '',
        url: r.html_url,
        language: r.language || '',
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
      }));

    const data: GitHubSnapshot = {
      fetchedAt,
      profile: {
        login: u.login,
        name: u.name || u.login,
        bio: u.bio || '',
        avatar: u.avatar_url,
        url: u.html_url,
        followers: u.followers || 0,
        following: u.following || 0,
        publicRepos: u.public_repos || 0,
        totalStars,
        company: u.company || '',
        location: u.location || '',
        blog: u.blog || '',
      },
      repos,
    };

    return { source: 'github', ok: true, fetchedAt, data, count: repos.length };
  } catch (err) {
    return {
      source: 'github',
      ok: false,
      fetchedAt,
      count: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
