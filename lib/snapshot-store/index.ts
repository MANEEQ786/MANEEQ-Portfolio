/**
 * Persistent snapshot storage.
 *
 * Backend is chosen automatically:
 *   • Vercel Blob  — used only if BLOB_READ_WRITE_TOKEN is set (Vercel hosting,
 *     where the serverless filesystem is ephemeral).
 *   • Filesystem   — the DEFAULT everywhere else, including Hostinger (VPS /
 *     Node hosting) and local dev, where the disk is persistent and writable.
 *
 * JSON snapshots are written as <SNAPSHOT_DIR>/<key>.json (SNAPSHOT_DIR defaults
 * to the project's data/ folder). Set SNAPSHOT_DIR to a path OUTSIDE the deploy
 * directory if you want snapshots to survive re-uploading/rebuilding the app.
 *
 * Binary assets (the Upwork portrait) are written under public/ so they are
 * served statically, and the returned URL is a site-relative path.
 *
 * Locking is best-effort (a lock file / lock object with a timestamp). For
 * strict mutual exclusion a real lock service is better, but a thrice-weekly
 * cron almost never overlaps.
 */

import { put, list, del } from '@vercel/blob';
import { readFile, writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import type { SnapshotKey, RefreshStatus } from '@/lib/platform-refresh/types';

const BLOB_PREFIX = 'snapshots';
const BLOB_LOCK = `${BLOB_PREFIX}/locks/refresh-platforms.json`;

/** Writable directory for JSON snapshots (persistent on Hostinger/VPS/dev). */
function dataDir(): string {
  return process.env.SNAPSHOT_DIR
    ? path.resolve(process.env.SNAPSHOT_DIR)
    : path.join(process.cwd(), 'data');
}

/** Public web root, where served static assets (portrait) are written. */
function publicDir(): string {
  return process.env.PUBLIC_DIR
    ? path.resolve(process.env.PUBLIC_DIR)
    : path.join(process.cwd(), 'public');
}

/** True when Vercel Blob is configured; otherwise we use the filesystem. */
export function blobAvailable(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/* ── Filesystem helpers ──────────────────────────────────────────────────── */

async function fsReadJson<T>(file: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(file, 'utf8')) as T;
  } catch {
    return null;
  }
}

async function fsWriteJson<T>(file: string, data: T): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2));
}

/* ── Blob helpers (only invoked when blobAvailable) ──────────────────────── */

async function blobReadJson<T>(pathname: string): Promise<T | null> {
  const { blobs } = await list({ prefix: pathname, limit: 1 });
  const match = blobs.find((b) => b.pathname === pathname);
  if (!match) return null;
  const res = await fetch(match.url, { cache: 'no-store' });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

async function blobWriteJson<T>(pathname: string, data: T): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

/* ── Public API ──────────────────────────────────────────────────────────── */

export async function getSnapshot<T>(key: SnapshotKey): Promise<T | null> {
  if (blobAvailable()) {
    try {
      return await blobReadJson<T>(`${BLOB_PREFIX}/${key}.json`);
    } catch {
      return null;
    }
  }
  return fsReadJson<T>(path.join(dataDir(), `${key}.json`));
}

export async function putSnapshot<T>(key: SnapshotKey, data: T): Promise<void> {
  if (blobAvailable()) {
    await blobWriteJson(`${BLOB_PREFIX}/${key}.json`, data);
    return;
  }
  await fsWriteJson(path.join(dataDir(), `${key}.json`), data);
}

/**
 * Store a binary asset (e.g. the Upwork portrait) and return its public URL.
 * Blob → absolute Blob URL. Filesystem → site-relative path under /public.
 */
export async function putBinary(
  pathname: string,
  body: Buffer,
  contentType: string,
): Promise<string> {
  if (blobAvailable()) {
    const { url } = await put(`${BLOB_PREFIX}/${pathname}`, body, {
      access: 'public',
      contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 31_536_000,
    });
    return url;
  }
  const dest = path.join(publicDir(), pathname);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, body);
  return `/${pathname}`;
}

export async function getRefreshStatus(): Promise<RefreshStatus | null> {
  return getSnapshot<RefreshStatus>('refresh-status');
}

export async function putRefreshStatus(status: RefreshStatus): Promise<void> {
  await putSnapshot('refresh-status', status);
}

/** Append an immutable history record. */
export async function putRefreshHistory(status: RefreshStatus, stampIso: string): Promise<void> {
  const safe = stampIso.replace(/[:.]/g, '-');
  if (blobAvailable()) {
    await blobWriteJson(`${BLOB_PREFIX}/refresh-history/${safe}.json`, status);
    return;
  }
  await fsWriteJson(path.join(dataDir(), 'refresh-history', `${safe}.json`), status);
}

/* ── Best-effort lock ────────────────────────────────────────────────────── */

interface LockRecord {
  acquiredAt: string;
}

function lockFile(): string {
  return path.join(dataDir(), '.refresh-lock.json');
}

export async function acquireLock(ttlMs = 10 * 60 * 1000): Promise<boolean> {
  const now = Date.now();

  // Read existing lock (Blob or FS).
  let existing: LockRecord | null = null;
  try {
    existing = blobAvailable()
      ? await blobReadJson<LockRecord>(BLOB_LOCK)
      : await fsReadJson<LockRecord>(lockFile());
  } catch {
    existing = null;
  }
  if (existing?.acquiredAt) {
    const age = now - new Date(existing.acquiredAt).getTime();
    if (age >= 0 && age < ttlMs) return false; // a fresh lock is held
  }

  // Acquire.
  try {
    const record: LockRecord = { acquiredAt: new Date(now).toISOString() };
    if (blobAvailable()) await blobWriteJson(BLOB_LOCK, record);
    else await fsWriteJson(lockFile(), record);
    return true;
  } catch {
    return false;
  }
}

export async function releaseLock(): Promise<void> {
  try {
    if (blobAvailable()) await del(BLOB_LOCK);
    else await unlink(lockFile());
  } catch {
    // ignore — a stale lock self-expires by TTL
  }
}
