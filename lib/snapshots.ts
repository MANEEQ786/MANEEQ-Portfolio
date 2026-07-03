import { readFile } from "fs/promises";
import path from "path";
import { getSnapshot } from "@/lib/snapshot-store";
import type { SnapshotKey } from "@/lib/platform-refresh/types";

// Reads a refreshed snapshot (server-side only). Source of truth is the
// snapshot store written by the cron at /api/cron/refresh-platforms:
//   • Hostinger / VPS / local: the persistent filesystem (SNAPSHOT_DIR or data/).
//   • Vercel (if BLOB_READ_WRITE_TOKEN is set): Vercel Blob.
//
// If the store has nothing yet (e.g. a fresh deploy before the first cron run),
// fall back to the snapshot bundled in the repo's data/ folder.
//
// Callers pass the file name (e.g. "twitter-posts.json"); the key is the name
// without the .json extension.

async function readBundled(file: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(path.join(process.cwd(), "data", file), "utf8"));
  } catch {
    return null;
  }
}

export async function readSnapshot(file: string): Promise<unknown> {
  const key = file.replace(/\.json$/, "") as SnapshotKey;
  const fromStore = await getSnapshot(key);
  if (fromStore != null) return fromStore;
  return readBundled(file);
}
