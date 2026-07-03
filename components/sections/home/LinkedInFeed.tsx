import linkedinData from "@/data/linkedin-posts.json";

// LinkedIn posts feed (replaces the Premium Plan pricing card).
// Posts are scraped via Apify and snapshotted into data/linkedin-posts.json by
// scripts/refresh-linkedin.mjs (run that to refresh). Rendered as a custom feed
// so it loads instantly with zero per-visitor cost.

type Media = { type: string; url?: string; thumbnail?: string } | null;
type PostId = {
  activity_urn?: string | null;
  share_urn?: string | null;
  ugcPost_urn?: string | null;
};
type Post = {
  id: PostId;
  url: string;
  type: string;
  text: string;
  date?: string;
  relative?: string;
  reactions: number;
  author: {
    name: string;
    headline?: string;
    profileUrl?: string;
    picture?: string;
    type?: string;
  };
  media: Media;
};

const PROFILE_URL = "https://www.linkedin.com/in/smasoodpk/";

type LinkedInData = { posts?: Post[] };

export default function LinkedInFeed({ data }: { data?: LinkedInData }) {
  const d = (data ?? (linkedinData as LinkedInData)) || {};
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
        <i className="fa-brands fa-linkedin" style={{ color: "#0A66C2", fontSize: "32px" }}></i>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontWeight: 700 }}>Saqib Masood</div>
          <div style={{ fontSize: "13px", opacity: 0.65 }}>Posts &amp; reposts</div>
        </div>
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "auto", fontSize: "13px", fontWeight: 600, color: "#0A66C2" }}
        >
          View profile
        </a>
      </div>

      {/* Scrollable feed */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0, background: "#f4f2ee" }}>
        {posts.map((p, i) => (
          <article
            key={p.id?.activity_urn || p.id?.ugcPost_urn || p.id?.share_urn || p.url || i}
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
                <div
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <i className="fa-solid fa-retweet"></i> Saqib reposted
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
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#0A66C2", flexShrink: 0 }} />
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "14px", lineHeight: 1.2 }}>{p.author.name}</div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.author.headline}
                  </div>
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

            {p.media && (p.media.thumbnail || p.media.url) && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", position: "relative", marginTop: "10px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.media.thumbnail || p.media.url}
                  alt=""
                  style={{ width: "100%", display: "block", maxHeight: "260px", objectFit: "cover" }}
                />
                {p.media.type === "video" && (
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
                )}
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
              <span style={{ fontSize: "12px", color: "#666" }}>👍 {p.reactions}</span>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "12px", fontWeight: 600, color: "#0A66C2" }}
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
