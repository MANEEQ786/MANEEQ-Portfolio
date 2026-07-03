import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getBlogEntries } from "@/lib/blog";

// Re-read the LinkedIn snapshot periodically so new newsletter editions appear
// after the 48h cron refresh. No scraping happens here — only a local JSON read.
export const revalidate = 1800; // 30 min

export default async function NewsPage() {
  const entries = await getBlogEntries();
  return (
    <>
      <Header variant="default" />
      {/* Breadcrumb-Section Start */}
      <section className="breadcrumb-wrapper fix bg-cover" style={{ backgroundImage: "url(/assets/img/breadcrumb/bg.jpg)" }}>
        <div className="star-shape float-bob-x">
          <img src="/assets/img/shape/star.png" alt="img" />
        </div>
        <div className="container">
          <div className="row">
            <div className="page-heading">
              <h2>Blog</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li><i className="fa-solid fa-angle-right"></i></li>
                <li className="active">Blog</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* News Section Start */}
      <section className="news-section news-1 section-padding section-bg">
        <div className="container">
          <div className="row">
            {entries.map((e, i) => (
              <div className="col-lg-4 col-md-6" key={e.url + i}>
                <div className="news-item wow fadeInUp" data-wow-delay=".3s">
                  <div className="thumb">
                    <img src={e.image} alt="img" />
                  </div>
                  <div className="content">
                    <ul className="news-meta">
                      <li className="green">{e.category}</li>
                      <li className="date"><span></span>{e.date}</li>
                    </ul>
                    <h4>
                      <a href={e.url} target="_blank" rel="noopener noreferrer">{e.title}</a>
                    </h4>
                    <div className="news-btn">
                      <a href={e.url} target="_blank" rel="noopener noreferrer" className="icon">
                        <i className="fa-solid fa-arrow-right"></i>
                      </a>
                      <a href={e.url} target="_blank" rel="noopener noreferrer" className="link-btn">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {entries.length === 0 && (
              <div className="col-12 text-center">
                <p>No newsletter editions found yet — they’ll appear here after the next refresh.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer variant="footer-1" />
    </>
  );
}
