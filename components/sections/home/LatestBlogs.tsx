"use client";

import { useRef, useState } from "react";
import type { BlogEntry } from "@/lib/blog";

// Homepage "Latest Blog" grid. Shows the first 3 editions; the "View all blogs"
// button reveals the rest beneath them in place (instead of navigating away).
export default function LatestBlogs({ entries }: { entries: BlogEntry[] }) {
  const [expanded, setExpanded] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const visible = expanded ? entries : entries.slice(0, 3);
  const hasMore = entries.length > 3;

  const toggle = () => {
    setExpanded((v) => {
      const next = !v;
      // When collapsing, scroll back up to the blog section so the user isn't
      // stranded at the bottom of the (now removed) long list.
      if (!next) {
        topRef.current?.closest(".news-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return next;
    });
  };

  return (
    <>
      <div className="row" ref={topRef}>
        {visible.map((e, i) => (
          <div className="col-lg-4 col-md-6" key={e.url + i}>
            <div className="news-item wow fadeInUp" data-wow-delay={`${0.3 + (i % 3) * 0.3}s`}>
              <div className="thumb">
                <img src={e.image} alt="img" />
              </div>
              <div className="content">
                <ul className="news-meta">
                  <li className="green">{e.category}</li>
                  <li className="date"><span></span>{e.date}</li>
                </ul>
                <h4><a href={e.url} target="_blank" rel="noopener noreferrer">{e.title}</a></h4>
                <div className="news-btns">
                  <i className="fa-solid fa-arrow-right"></i>
                  <a href={e.url} target="_blank" rel="noopener noreferrer">Read More</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="news-button text-center">
          <button
            type="button"
            onClick={toggle}
            style={{
              background: "transparent",
              color: "var(--theme)",
              border: "none",
              padding: "20px 10px",
              fontFamily: '"Manrope", sans-serif',
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {expanded ? "Show less" : "View all blogs"} <i className={`fa-solid ${expanded ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
          </button>
        </div>
      )}
    </>
  );
}
