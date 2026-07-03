import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NewsClassicPage() {
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
              <h2>Blog Classic</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li><i className="fa-solid fa-angle-right"></i></li>
                <li className="active">Blog Classic</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* News Classic Section Start */}
      <section className="news-classic-section section-padding fix">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <div className="main-sidebar">
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Search Here</h3>
                  </div>
                  <div className="search-widget">
                    <form action="#">
                      <input type="text" placeholder="Search here" />
                      <button type="submit"><i className="fa-regular fa-magnifying-glass"></i></button>
                    </form>
                  </div>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Categories</h3>
                  </div>
                  <ul className="categories-items">
                    <li>
                      <Link href="/news-details">Moblie App Design</Link>
                      <span>(03)</span>
                    </li>
                    <li>
                      <Link href="/news-details">Web Design</Link>
                      <span>(05)</span>
                    </li>
                    <li>
                      <Link href="/news-details">UI/UX Design</Link>
                      <span>(02)</span>
                    </li>
                    <li>
                      <Link href="/news-details">Visual Design</Link>
                      <span>(06)</span>
                    </li>
                  </ul>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Recent Post</h3>
                  </div>
                  <div className="recent-post-area">
                    <div className="recent-item">
                      <div className="thumb">
                        <img src="/assets/img/news/13.jpg" alt="img" />
                      </div>
                      <div className="content">
                        <h6><Link href="/news-details">UI/UX Design Trends to Watch in 2025</Link></h6>
                        <span>March 26, 2024</span>
                      </div>
                    </div>
                    <div className="recent-item">
                      <div className="thumb">
                        <img src="/assets/img/news/14.jpg" alt="img" />
                      </div>
                      <div className="content">
                        <h6><Link href="/news-details">The Role of in Enhancing User Experience</Link>
                        </h6>
                        <span>March 26, 2024</span>
                      </div>
                    </div>
                    <div className="recent-item">
                      <div className="thumb">
                        <img src="/assets/img/news/15.jpg" alt="img" />
                      </div>
                      <div className="content">
                        <h6><Link href="/news-details">The Wireframing in the UI/UX Design Process</Link>
                        </h6>
                        <span>March 26, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Tags</h3>
                  </div>
                  <div className="news-widget-categories">
                    <div className="tagcloud">
                      <Link href="/news-details">Barnd</Link>
                      <Link href="/news-details">Creative</Link>
                      <Link href="/news-details">Parsonal</Link>
                      <Link href="/news-details">Awards</Link>
                      <Link href="/news-details">Business</Link>
                      <Link href="/news-details">Modern</Link>
                      <Link href="/news-details">One Page</Link>
                      <Link href="/news-details">Design</Link>
                      <Link href="/news-details">Photography</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="news-standard-wrapper">
                <div className="news-standard-items">
                  <div className="news-thumb">
                    <img src="/assets/img/news/16.jpg" alt="img" />
                  </div>
                  <div className="news-content">
                    <ul className="news-meta">
                      <li className="green">Branding</li>
                      <li className="date"><span></span>26 June 2024</li>
                    </ul>
                    <div className="content">
                      <h3><Link href="/news-details">The Importance of User-Centered Design</Link>
                      </h3>
                      <p>User-Centered Design focuses on creating experiences tailored to users' needs and
                        behaviors. It improves usability, satisfaction.</p>
                    </div>
                    <div className="news-btn">
                      <Link href="/news-details" className="icon">
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                      <Link href="/news-details" className="link-btn">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="news-standard-items">
                  <div className="news-thumb">
                    <img src="/assets/img/news/17.jpg" alt="img" />
                  </div>
                  <div className="news-content">
                    <ul className="news-meta">
                      <li className="green">Branding</li>
                      <li className="date"><span></span>26 June 2024</li>
                    </ul>
                    <div className="content">
                      <h3><Link href="/news-details">Best Practices for Usability Testingn</Link>
                      </h3>
                      <p>To ensure effective usability testing, involve real users, set clear goals, test
                        early and often, observe user interactions, gather feedback.
                      </p>
                    </div>
                    <div className="news-btn">
                      <Link href="/news-details" className="icon">
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                      <Link href="/news-details" className="link-btn">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="news-standard-items">
                  <div className="news-thumb">
                    <img src="/assets/img/news/18.jpg" alt="img" />
                  </div>
                  <div className="news-content">
                    <ul className="news-meta">
                      <li className="green">Branding</li>
                      <li className="date"><span></span>26 June 2024</li>
                    </ul>
                    <div className="content">
                      <h3><Link href="/news-details">A Beginner’s Guide to UX Research </Link>
                      </h3>
                      <p>UX research helps understand user needs and behaviors. Use methods like surveys,
                        interviews, and usability testing to gather insights.
                      </p>
                    </div>
                    <div className="news-btn">
                      <Link href="/news-details" className="icon">
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                      <Link href="/news-details" className="link-btn">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="page-nav-wrap text-center">
                  <ul>
                    <li><a className="page-numbers" href="#"><i className="fal fa-long-arrow-left"></i></a></li>
                    <li className="active"><a className="page-numbers" href="#">01</a></li>
                    <li><a className="page-numbers" href="#">02</a></li>
                    <li><a className="page-numbers" href="#">03</a></li>
                    <li><a className="page-numbers" href="#"><i className="fal fa-long-arrow-right"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer variant="footer-1" />
    </>
  );
}
