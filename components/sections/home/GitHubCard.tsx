import githubData from "@/data/github-profile.json";

// GitHub profile card (wide banner below the pricing/feed row). Profile + repos
// are snapshotted into data/github-profile.json by scripts/refresh-github.mjs.
// The contribution graph is an external image rendered live by ghchart.rshah.org.

type Repo = {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
};
type Profile = {
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

const ACCENT = "#28E98C";

type GitHubData = { profile?: Profile; repos?: Repo[] };

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontWeight: 700, fontSize: "18px", lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: "12px", color: "#666" }}>{label}</div>
    </div>
  );
}

export default function GitHubCard({ data }: { data?: GitHubData }) {
  const d = (data ?? (githubData as GitHubData)) || {};
  const profile = d.profile as Profile;
  const repos = (d.repos as Repo[]) || [];
  return (
    <div className="price-item" style={{ padding: 0, overflow: "hidden" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <i className="fa-brands fa-github" style={{ fontSize: "30px", color: "#171515" }}></i>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontWeight: 700 }}>{profile.name}</div>
          <div style={{ fontSize: "13px", opacity: 0.65 }}>@{profile.login}</div>
        </div>
        <a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "auto", fontSize: "13px", fontWeight: 600, color: "#171515" }}
        >
          View profile
        </a>
      </div>

      {/* Body: profile info (left) + contribution graph (right) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          padding: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flex: "1 1 320px", minWidth: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar}
            alt={profile.name}
            style={{ width: "84px", height: "84px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${ACCENT}` }}
          />
          <div style={{ minWidth: 0 }}>
            {profile.bio && <p style={{ margin: "0 0 8px", fontSize: "14px", color: "#1d1d1f" }}>{profile.bio}</p>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", fontSize: "13px", color: "#666" }}>
              {profile.company && (
                <span><i className="fa-solid fa-building" style={{ marginRight: 5 }}></i>{profile.company}</span>
              )}
              {profile.location && (
                <span><i className="fa-solid fa-location-dot" style={{ marginRight: 5 }}></i>{profile.location}</span>
              )}
              {profile.blog && (
                <a href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, fontWeight: 600 }}>
                  <i className="fa-solid fa-link" style={{ marginRight: 5 }}></i>{profile.blog.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
            <div style={{ display: "flex", gap: "22px", marginTop: "12px" }}>
              <Stat value={profile.publicRepos} label="Repositories" />
              <Stat value={profile.followers} label="Followers" />
              <Stat value={profile.totalStars} label="Stars" />
            </div>
          </div>
        </div>

        {/* Contribution graph */}
        <div style={{ flex: "1 1 420px", minWidth: 0 }}>
          <div style={{ fontSize: "12px", color: "#666", marginBottom: "6px" }}>Contribution activity</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/${ACCENT.replace("#", "")}/${profile.login}`}
            alt={`${profile.login} GitHub contribution graph`}
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </div>

      {/* Top repositories */}
      {repos.length > 0 && (
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>Popular repositories</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "12px",
            }}
          >
            {repos.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: "8px",
                  padding: "12px 14px",
                  textDecoration: "none",
                  color: "inherit",
                  background: "#fff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "14px", color: "#0969da" }}>
                  <i className="fa-regular fa-folder"></i>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
                </div>
                {r.description && (
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: "12.5px",
                      color: "#57606a",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {r.description}
                  </p>
                )}
                <div style={{ display: "flex", gap: "16px", marginTop: "10px", fontSize: "12px", color: "#57606a" }}>
                  {r.language && (
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: ACCENT, display: "inline-block" }}></span>
                      {r.language}
                    </span>
                  )}
                  <span><i className="fa-regular fa-star" style={{ marginRight: 4 }}></i>{r.stars}</span>
                  <span><i className="fa-solid fa-code-fork" style={{ marginRight: 4 }}></i>{r.forks}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
