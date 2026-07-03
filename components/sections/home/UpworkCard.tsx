import upworkData from "@/data/upwork-profile.json";
import upworkExtras from "@/data/upwork-extras.json";

// Upwork profile / dashboard card (replaces the middle "Standard Plan" pricing
// card). The CORE profile (photo, title, bio, rate, badge, location, skills) is
// REAL and auto-synced from Upwork via Apify — run `npm run refresh:upwork` to
// repull it into data/upwork-profile.json (and download the latest portrait).
// Resume-style sections Upwork's scraper can't return (certifications, jobs,
// education, project catalog, portfolio) live in data/upwork-extras.json and are
// merged in here.

type SyncedProfile = {
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

type Extras = {
  openToContractToHire: boolean;
  hoursPerWeek: string;
  verified: boolean;
  associatedWith: string;
  introVideo: string;
  languages: { name: string; level: string }[];
  verifications: string[];
  consultation: { title: string; price: string; topics: string[] };
  projectCatalog: { title: string; price: string }[];
  portfolio: { title: string; subtitle: string }[];
  certifications: { name: string; provider: string; issued: string }[];
  employment: { role: string; company: string; period: string; description: string }[];
  otherExperience: { role: string; description: string }[];
  education: { school: string; degree: string; years: string }[];
  linkedAccounts: { platform: string; name: string; note: string }[];
};

const x = upworkExtras as Extras;
const GREEN = "#14A800";
const fmtMoney = (n: number) => (n >= 1000 ? `$${Math.round(n / 1000)}K+` : `$${n}`);

type UpworkData = { profile: SyncedProfile };

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#999", margin: "22px 0 10px" }}>
      {children}
    </div>
  );
}

const summaryStyle: React.CSSProperties = {
  cursor: "pointer",
  fontSize: "13.5px",
  fontWeight: 700,
  color: "#1d1d1f",
  padding: "10px 0",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  listStyle: "none",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function UpworkCard({ data }: { data?: UpworkData }) {
  const p = (data ?? (upworkData as UpworkData)).profile;
  const photo = p.portraitFile || p.portrait;
  const rate = p.hourlyRate ? `${p.currency === "USD" ? "$" : ""}${p.hourlyRate.toFixed(2)}/hr` : "";
  // Only show stat tiles Upwork actually exposes (Rising Talent profiles report 0).
  const stats = [
    p.jobSuccessScore > 0 && { value: `${p.jobSuccessScore}%`, label: "Job Success" },
    p.totalEarnings > 0 && { value: fmtMoney(p.totalEarnings), label: "Earned" },
    p.totalJobs > 0 && { value: p.totalJobs, label: "Jobs" },
    p.totalHours > 0 && { value: `${p.totalHours}+`, label: "Hours" },
  ].filter(Boolean) as { value: string | number; label: string }[];
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
        <i className="fa-brands fa-upwork" style={{ color: GREEN, fontSize: "30px" }}></i>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontWeight: 700 }}>Upwork</div>
          <div style={{ fontSize: "13px", opacity: 0.65 }}>Freelancer profile</div>
        </div>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "auto", fontSize: "13px", fontWeight: 600, color: GREEN }}
        >
          View profile
        </a>
      </div>

      {/* Body — scrollable so the card matches the LinkedIn/Twitter card height */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0, padding: "18px 18px 22px" }}>
        {/* Identity */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={p.name}
              style={{ width: "68px", height: "68px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${GREEN}`, background: "#f4f4f4" }}
            />
            {p.availabilityBadge && (
              <span
                title="Available now"
                style={{ position: "absolute", right: 2, bottom: 2, width: "15px", height: "15px", borderRadius: "50%", background: GREEN, border: "2px solid #fff" }}
              />
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: 700, fontSize: "17px", lineHeight: 1.2 }}>{p.name}</span>
              {x.verified && <i className="fa-solid fa-circle-check" style={{ color: GREEN, fontSize: "14px" }} title="Verified"></i>}
            </div>
            <div style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>
              <i className="fa-solid fa-location-dot" style={{ marginRight: 4 }}></i>{p.location}
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap" }}>
              {p.badge && (
                <span style={{ fontSize: "11px", fontWeight: 700, color: GREEN, background: "rgba(20,168,0,0.1)", borderRadius: "20px", padding: "3px 10px" }}>
                  {p.badge}
                </span>
              )}
              {p.availabilityBadge && (
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#666", background: "rgba(0,0,0,0.05)", borderRadius: "20px", padding: "3px 10px" }}>
                  ● Available now
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Title / tagline */}
        {p.title && <p style={{ margin: "14px 0 0", fontSize: "14px", fontWeight: 600, color: "#1d1d1f", lineHeight: 1.4 }}>{p.title}</p>}

        {/* Intro video */}
        {x.introVideo && (
          <a
            href={x.introVideo}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "14px", padding: "10px 12px", border: `1px solid ${GREEN}`, borderRadius: "10px", textDecoration: "none", color: "#1d1d1f" }}
          >
            <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className="fa-solid fa-play" style={{ fontSize: "12px", marginLeft: "2px" }}></i>
            </span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: "block", fontSize: "13.5px", fontWeight: 700 }}>Meet {p.name}</span>
              <span style={{ display: "block", fontSize: "12px", color: "#666" }}>Watch intro video</span>
            </span>
          </a>
        )}

        {/* Stats (only those Upwork exposes) */}
        {stats.length > 0 && (
          <div style={{ display: "flex", gap: "10px", marginTop: "16px", padding: "14px 0", borderTop: "1px solid rgba(0,0,0,0.08)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "19px", lineHeight: 1.1, color: "#1d1d1f" }}>{s.value}</div>
                <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Quick facts grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "16px" }}>
          {[
            rate && { icon: "fa-dollar-sign", label: "Rate", value: rate },
            { icon: "fa-location-dot", label: "Location", value: p.location },
          ]
            .filter(Boolean)
            .map((f) => {
              const fact = f as { icon: string; label: string; value: string };
              return (
                <div key={fact.label} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "10px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "11px", color: "#999" }}>
                    <i className={`fa-solid ${fact.icon}`} style={{ marginRight: 5, color: GREEN }}></i>{fact.label}
                  </div>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1d1d1f", marginTop: "3px" }}>{fact.value}</div>
                </div>
              );
            })}
        </div>

        {/* Hours per week */}
        {x.hoursPerWeek && (
          <>
            <SectionTitle>Hours per week</SectionTitle>
            <div style={{ fontSize: "13.5px", color: "#1d1d1f" }}>
              <i className="fa-solid fa-clock" style={{ marginRight: 7, color: GREEN }}></i>{x.hoursPerWeek}
              {x.openToContractToHire && <span style={{ color: "#666" }}> · Open to contract-to-hire</span>}
            </div>
          </>
        )}

        {/* Languages */}
        {x.languages.length > 0 && (
          <>
            <SectionTitle>Languages</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {x.languages.map((l) => (
                <div key={l.name} style={{ fontSize: "13.5px", color: "#1d1d1f" }}>
                  <i className="fa-solid fa-language" style={{ marginRight: 7, color: GREEN }}></i>
                  <strong>{l.name}:</strong> <span style={{ color: "#666" }}>{l.level}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Verifications */}
        {x.verifications.length > 0 && (
          <>
            <SectionTitle>Verifications</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {x.verifications.map((v) => (
                <div key={v} style={{ fontSize: "13.5px", color: "#1d1d1f" }}>
                  <i className="fa-solid fa-circle-check" style={{ marginRight: 7, color: GREEN }}></i>{v}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Associated with */}
        {x.associatedWith && (
          <>
            <SectionTitle>Associated with</SectionTitle>
            <div style={{ fontSize: "13.5px", color: "#1d1d1f" }}>
              <i className="fa-solid fa-building" style={{ marginRight: 7, color: GREEN }}></i>{x.associatedWith}
            </div>
          </>
        )}

        {/* Overview (collapsible) */}
        {p.description && (
          <details open style={{ marginTop: "18px" }}>
            <summary style={summaryStyle}>
              <span>Overview</span>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: "11px", color: "#999" }}></i>
            </summary>
            <p style={{ margin: "8px 0 0", fontSize: "13px", lineHeight: 1.55, color: "#444", whiteSpace: "pre-line" }}>{p.description}</p>
          </details>
        )}

        {/* Consultation (collapsible) */}
        <details open>
          <summary style={summaryStyle}>
            <span>Book a consultation</span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: GREEN }}>{x.consultation.price}</span>
          </summary>
          <div style={{ padding: "4px 0 8px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#1d1d1f" }}>{x.consultation.title}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
              {x.consultation.topics.map((t) => (
                <span key={t} style={{ fontSize: "12px", color: "#1d1d1f", background: "rgba(20,168,0,0.08)", borderRadius: "20px", padding: "4px 11px" }}>{t}</span>
              ))}
            </div>
          </div>
        </details>

        {/* Project catalog */}
        <SectionTitle>Project Catalog</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {x.projectCatalog.map((c) => (
            <div key={c.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "10px", padding: "10px 12px" }}>
              <span style={{ fontSize: "13px", color: "#1d1d1f", lineHeight: 1.35 }}>{c.title}</span>
              <span style={{ fontSize: "12.5px", fontWeight: 700, color: GREEN, whiteSpace: "nowrap" }}>{c.price}</span>
            </div>
          ))}
        </div>

        {/* Portfolio */}
        <SectionTitle>Portfolio</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {x.portfolio.map((item) => (
            <div key={item.title} style={{ borderLeft: `3px solid ${GREEN}`, paddingLeft: "12px" }}>
              <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1d1d1f" }}>{item.title}</div>
              <div style={{ fontSize: "12.5px", color: "#666" }}>{item.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Skills (synced) */}
        {p.skills.length > 0 && (
          <>
            <SectionTitle>Skills</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {p.skills.map((s) => (
                <span key={s} style={{ fontSize: "12px", color: "#1d1d1f", background: "rgba(0,0,0,0.05)", borderRadius: "20px", padding: "5px 12px" }}>{s}</span>
              ))}
            </div>
          </>
        )}

        {/* Certifications (collapsible) */}
        <details style={{ marginTop: "18px" }}>
          <summary style={summaryStyle}>
            <span>Certifications ({x.certifications.length})</span>
            <i className="fa-solid fa-chevron-down" style={{ fontSize: "11px", color: "#999" }}></i>
          </summary>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "6px 0 4px" }}>
            {x.certifications.map((c) => (
              <div key={c.name} style={{ display: "flex", gap: "10px" }}>
                <i className="fa-solid fa-certificate" style={{ color: GREEN, fontSize: "15px", marginTop: "2px", flexShrink: 0 }}></i>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1d1d1f", lineHeight: 1.3 }}>{c.name}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>{c.provider} · {c.issued}</div>
                </div>
              </div>
            ))}
          </div>
        </details>

        {/* Employment history (collapsible) */}
        <details open>
          <summary style={summaryStyle}>
            <span>Employment history</span>
            <i className="fa-solid fa-chevron-down" style={{ fontSize: "11px", color: "#999" }}></i>
          </summary>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "8px 0 4px" }}>
            {x.employment.map((j) => (
              <div key={j.role}>
                <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.35 }}>{j.role}</div>
                <div style={{ fontSize: "12px", color: GREEN, fontWeight: 600 }}>{j.company} · {j.period}</div>
                <p style={{ margin: "6px 0 0", fontSize: "12.5px", color: "#555", lineHeight: 1.5 }}>{j.description}</p>
              </div>
            ))}
            {x.otherExperience.length > 0 && (
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Other experience</div>
                {x.otherExperience.map((o) => (
                  <div key={o.role} style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1d1d1f" }}>{o.role}</div>
                    <p style={{ margin: "4px 0 0", fontSize: "12.5px", color: "#555", lineHeight: 1.5 }}>{o.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </details>

        {/* Education */}
        <SectionTitle>Education</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {x.education.map((e) => (
            <div key={e.school} style={{ display: "flex", gap: "10px" }}>
              <i className="fa-solid fa-graduation-cap" style={{ color: GREEN, fontSize: "15px", marginTop: "2px", flexShrink: 0 }}></i>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#1d1d1f" }}>{e.school}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>{e.degree} · {e.years}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Linked accounts */}
        <SectionTitle>Linked accounts</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
          {x.linkedAccounts.map((a) => (
            <span key={a.platform} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#1d1d1f", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "20px", padding: "5px 12px" }}>
              <i className={`fa-brands ${a.platform === "GitHub" ? "fa-github" : "fa-stack-overflow"}`} style={{ fontSize: "13px" }}></i>
              {a.platform}{a.note ? ` · ${a.note}` : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
