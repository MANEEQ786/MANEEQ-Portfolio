/**
 * Shared types for the platform-refresh system (cron-driven data ingestion).
 *
 * Snapshot data shapes are kept byte-identical to what the original
 * scripts/refresh-*.mjs produced, so the existing UI components
 * (GitHubCard, LinkedInFeed, TwitterFeed, UpworkCard) and lib/blog.ts keep
 * receiving exactly the data they already expect.
 */

/** Logical snapshot identifiers — map 1:1 to blob/local file names. */
export type SnapshotKey =
  | 'twitter-posts'
  | 'linkedin-posts'
  | 'github-profile'
  | 'upwork-profile'
  | 'blog-images'
  | 'refresh-status';

/** Refreshable sources. */
export type RefreshSource = 'github' | 'linkedin' | 'twitter' | 'upwork' | 'blog';

/* ── Snapshot payload shapes (preserved from the original scripts) ───────── */

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
}

export interface GitHubSnapshot {
  fetchedAt: string;
  profile: {
    login: string;
    name: string;
    bio: string;
    avatar: string;
    url: string;
    followers: number;
    following: number;
    publicRepos: number;
    totalStars: number;
    company: string;
    location: string;
    blog: string;
  };
  repos: GitHubRepo[];
}

export interface LinkedInPost {
  id: string;
  url: string;
  type: string;
  text: string;
  date?: string;
  relative: string;
  reactions: number;
  author: {
    name: string;
    headline: string;
    profileUrl?: string;
    picture?: string;
    type?: string;
  };
  media: { type?: string; url?: string; thumbnail?: string } | null;
}

export interface LinkedInSnapshot {
  profile: string;
  fetchedAt: string;
  posts: LinkedInPost[];
}

export interface TwitterPost {
  id: string;
  url: string;
  type: string;
  text: string;
  date?: string;
  relative: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  isReply: boolean;
  isPinned: boolean;
  author: { name: string; handle: string; picture: string; verified: boolean };
  media: { type?: string; url?: string } | null;
}

export interface TwitterSnapshot {
  profile: string;
  fetchedAt: string;
  posts: TwitterPost[];
}

export interface UpworkSnapshot {
  username: string;
  fetchedAt: string;
  profile: {
    name: string;
    title: string;
    description: string;
    portrait: string;
    portraitFile: string;
    url: string;
    hourlyRate: number;
    currency: string;
    badge: string;
    jobSuccessScore: number;
    totalEarnings: number;
    totalJobs: number;
    totalHours: number;
    location: string;
    availabilityBadge: boolean;
    skills: string[];
  };
}

/** Blog cover images: { [postUrl]: imageUrl }. */
export type BlogImages = Record<string, string>;

/* ── Refresh result + status ─────────────────────────────────────────────── */

export interface RefreshResult<T = unknown> {
  source: RefreshSource;
  ok: boolean;
  fetchedAt: string;
  data?: T;
  count: number;
  /** Set when the source failed — caller preserves the last-good snapshot. */
  error?: string;
  /** Non-fatal note (e.g. portrait could not be persisted). */
  warning?: string;
}

export interface SourceStatus {
  ok: boolean;
  fetchedAt?: string;
  count?: number;
  error?: string;
  warning?: string;
  /** True when this run failed but the previous good snapshot was kept. */
  preservedLastGood?: boolean;
}

export interface RefreshStatus {
  lastAttempt: string;
  lastSuccessfulRefresh: string | null;
  durationMs: number;
  schedule: string;
  /** Human description of the cron cadence. */
  scheduleDescription: string;
  sources: Record<RefreshSource, SourceStatus>;
}
