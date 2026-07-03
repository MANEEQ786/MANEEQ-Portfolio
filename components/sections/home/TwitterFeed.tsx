import twitterData from "@/data/twitter-posts.json";

// X (Twitter) posts feed (replaces the Basic Plan pricing card).
// Posts are scraped via Apify and snapshotted into data/twitter-posts.json by
// scripts/refresh-twitter.mjs (run that to refresh). Rendered as a custom feed
// so it loads instantly with zero per-visitor cost.

type Media = { type: string; url?: string } | null;
type Post = {
  id: string;
  url: string;
  type?: string;
  text: string;
  date?: string;
  relative?: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  isReply?: boolean;
  isPinned?: boolean;
  author: {
    name: string;
    handle: string;
    picture?: string;
    verified?: boolean;
  };
  media: Media;
};

type TwitterData = { profile?: string; posts?: Post[] };

export default function TwitterFeed({ data }: { data?: TwitterData }) {
  const d = (data ?? (twitterData as TwitterData)) || {};
  const PROFILE = d.profile || "isaqibmasood";
  const PROFILE_URL = `https://x.com/${PROFILE}`;
  const posts = (d.posts as Post[]) || [];
  return (
    <div
      className="price-item"
      style={{ display: "flex", flexDirection: "column", height: "620px", padding: 0, overflow: "hidden" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 18px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          flexShrink: 0,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            background: "#000",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "20px",
            flexShrink: 0,
          }}
        >
          𝕏
        </span>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontWeight: 700 }}>Saqib Masood</div>
          <div style={{ fontSize: "13px", opacity: 0.65 }}>@{PROFILE}</div>
        </div>
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "auto", fontSize: "13px", fontWeight: 600, color: "#000" }}
        >
          View profile
        </a>
      </div>

      {/* Scrollable feed */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0, background: "#f7f9f9" }}>
        {posts.map((p, i) => (
          <article
            key={p.id || p.url || i}
            style={{
              background: "#fff",
              margin: "10px",
              borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", color: "inherit", textDecoration: "none" }}
            >
              <div style={{ padding: "12px 14px 0" }}>
                {p.type === "repost" && (
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-retweet"></i> Saqib Masood reposted
                  </div>
                )}
                {p.isReply && (
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-reply"></i> Reply
                  </div>
                )}
                {p.isPinned && (
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fa-solid fa-thumbtack"></i> Pinned
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {p.author.picture ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.author.picture}
                      alt=""
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                    />
                  ) : (
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#000", flexShrink: 0 }} />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "14px", lineHeight: 1.2, display: "flex", alignItems: "center", gap: "4px" }}>
                      {p.author.name}
                      {p.author.verified && (
                        <i className="fa-solid fa-circle-check" style={{ color: "#1d9bf0", fontSize: "13px" }}></i>
                      )}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>@{p.author.handle}</div>
                    <div style={{ fontSize: "12px", color: "#999" }}>{p.relative}</div>
                  </div>
                </div>
              </div>

              {p.text && (
                <p
                  style={{
                    padding: "10px 14px 0",
                    fontSize: "13.5px",
                    lineHeight: 1.45,
                    whiteSpace: "pre-line",
                    display: "-webkit-box",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    color: "#1d1d1f",
                  }}
                >
                  {p.text}
                </p>
              )}
            </a>

            {p.media && p.media.url && p.media.type !== "video" && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", marginTop: "10px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.media.url}
                  alt=""
                  style={{ width: "100%", display: "block", maxHeight: "260px", objectFit: "cover" }}
                />
              </a>
            )}

            {p.media && p.media.url && p.media.type === "video" && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", position: "relative", marginTop: "10px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.media.url}
                  alt=""
                  style={{ width: "100%", display: "block", maxHeight: "260px", objectFit: "cover" }}
                />
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                  >
                    <i className="fa-solid fa-play"></i>
                  </span>
                </span>
              </a>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                marginTop: "10px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#666", display: "flex", gap: "12px" }}>
                <span>❤ {p.likes}</span>
                <span>🔁 {p.retweets}</span>
              </span>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "12px", fontWeight: 600, color: "#000" }}
              >
                View post ↗
              </a>
            </div>
          </article>
        ))}

        {posts.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>No posts yet.</div>
        )}
      </div>
    </div>
  );
}
