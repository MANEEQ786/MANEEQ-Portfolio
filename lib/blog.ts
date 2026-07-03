import { readSnapshot } from "./snapshots";

// Builds the Blog list from the author's LinkedIn newsletter ("AI & Data
// Intelligence Insight") editions. LinkedIn newsletters can't be scraped from
// their container URL (login wall), but each edition is posted to the profile,
// and those posts ARE captured in data/linkedin-posts.json — which the 48h cron
// refreshes. So the blog auto-updates every 48h with zero extra scraping.

export type BlogEntry = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  url: string;
};

type Post = {
  type?: string;
  text?: string;
  url?: string;
  date?: string;
  relative?: string;
  author?: { name?: string };
};

// Cycle through the theme's existing blog thumbnails.
const IMAGES = [
  "/assets/img/news/4.jpg", "/assets/img/news/5.jpg", "/assets/img/news/6.jpg",
  "/assets/img/news/7.jpg", "/assets/img/news/8.jpg", "/assets/img/news/9.jpg",
  "/assets/img/news/10.jpg", "/assets/img/news/11.jpg", "/assets/img/news/12.jpg",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(raw?: string, relative?: string): string {
  if (raw) {
    const d = new Date(raw.replace(" ", "T"));
    if (!isNaN(d.getTime())) return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }
  return relative || "";
}

function category(text: string): string {
  const s = text.toLowerCase();
  if (/voiceai|voice ai|conversationalai/.test(s)) return "Voice AI";
  if (/saas|operationalintelligence|erp|mvp/.test(s)) return "AI SaaS";
  if (/dataintelligence|narrativeintelligence|predictiveanalytics|data intelligence/.test(s)) return "Data Intelligence";
  if (/automation|futureofwork|productivity|co-?worker/.test(s)) return "AI Automation";
  return "AI & Data Intelligence";
}

function makeTitle(text: string): string {
  const lines = text.split("\n").map((s) => s.trim()).filter(Boolean);
  let t = lines[0] || "";
  // If the first line is just an intro ending with a colon, use the next line —
  // unless that next line is a bullet point (then keep the intro line itself).
  const nextIsBullet = !!lines[1] && /^[-•*✅▪►–·]/.test(lines[1]);
  if (/[:：]\s*$/.test(t) && lines[1] && !nextIsBullet) t = lines[1];
  // Drop a leading bullet marker if present.
  t = t.replace(/^[-•*✅▪►–·]\s*/, "");
  // Strip the recurring newsletter intro filler.
  t = t
    .replace(/^in (this|my latest) [^,:]*[,:]?\s*/i, "")
    .replace(/^i explore[:,]?\s*/i, "")
    .replace(/^our latest [^.]*\.\s*/i, "")
    .replace(/^this (piece|edition)\s*/i, "");
  // Drop trailing hashtags / mentions.
  t = t.replace(/(\s+[#@][\w-]+)+\s*$/g, "").trim();
  // Keep it to a clean single sentence / reasonable length.
  if (t.length > 110) {
    const cut = t.slice(0, 110);
    const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
    t = (stop > 40 ? cut.slice(0, stop + 1) : cut.replace(/\s+\S*$/, "")) + (stop > 40 ? "" : "…");
  }
  t = t.replace(/[:：]\s*$/, "").trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function makeExcerpt(text: string, title: string): string {
  let body = text.replace(/\s+/g, " ").trim();
  // Skip past the chunk used for the title.
  const tail = body.slice(Math.min(title.length, 60));
  body = (tail || body).replace(/https?:\/\/\S+/g, "").replace(/(\s*[#@][\w-]+)+/g, " ").trim();
  if (body.length > 160) body = body.slice(0, 160).replace(/\s+\S*$/, "") + "…";
  return body;
}

export async function getBlogEntries(): Promise<BlogEntry[]> {
  const data = (await readSnapshot("linkedin-posts.json")) as { posts?: Post[] } | null;
  const posts = data?.posts || [];
  // Real cover images fetched from each post's og:image (scripts/refresh-blog.mjs).
  const covers = ((await readSnapshot("blog-images.json")) as Record<string, string> | null) || {};

  const editions = posts.filter(
    (p) => p.type !== "repost" && /newsletter|ai & data intelligence|data intelligence insight/i.test(p.text || "")
  );

  return editions.map((p, i) => {
    const text = (p.text || "").trim();
    return {
      title: makeTitle(text),
      excerpt: makeExcerpt(text, makeTitle(text)),
      category: category(text),
      date: formatDate(p.date, p.relative),
      image: (p.url && covers[p.url]) || IMAGES[i % IMAGES.length],
      url: p.url || "#",
    };
  });
}
