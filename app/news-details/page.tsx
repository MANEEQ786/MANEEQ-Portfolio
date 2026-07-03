import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NewsDetailsPage() {
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
              <h2>Blog Details</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li><i className="fa-solid fa-angle-right"></i></li>
                <li className="active">Blog Details</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* News Details Section Start */}
      <section className="news-details-section section-padding">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="news-details-area">
                <div className="single-news-post">
                  <div className="news-thumb">
                    <img src="/assets/img/news/19.jpg" alt="img" />
                  </div>
                  <div className="news-content">
                    <ul className="news-meta">
                      <li className="green">Branding</li>
                      <li className="date"><span></span>26 June 2024</li>
                    </ul>
                    <h3 className="ext">The Importance of User-Centered Design </h3>
                    <p>In today’s digital world, a product’s success depends on how well it meets user
                      expectations. User-Centered Design (UCD) is a design philosophy that places users at
                      the core of the design process, ensuring products are intuitive, efficient, and
                      enjoyable. In this blog, we’ll explore why User-Centered Design is essential, its
                      benefits, and how to implement it effectively.
                    </p>
                    <div className="highlight-text">
                      <div className="qoute-shape">
                        <img src="/assets/img/service/5.png" alt="shape" />
                      </div>
                      <div className="content">
                        <h6>Our team of UI/UX experts conducts a thorough evaluation o the submitted
                          element, analyzing its usability, functionality, visual design, and overall
                          user experience.</h6>
                        <div className="info">
                          <img src="/assets/img/service/4.png" alt="img" />
                          <h5>Tushar Raja</h5>
                        </div>
                      </div>
                    </div>
                    <h3 className="mb-3">What is User-Centered Design (UCD)?</h3>
                    <p>User-Centered Design is an iterative design approach that focuses on users’ needs,
                      behaviors, and goals throughout the product development process. It involves
                      constant feedback, testing, and refinement to create experiences that truly resonate
                      with the audience.
                    </p>
                    <div className="news-list mt-3">
                      <h4 className="mb-3">Key Principles of UCD:</h4>
                      <div className="news-item">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>User Research:</h6>
                          <p>Understanding user behaviors and pain points.</p>
                        </div>
                      </div>
                      <div className="news-item">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>Iterative Process:</h6>
                          <p>Designing, testing, and refining continuously..
                          </p>
                        </div>
                      </div>
                      <div className="news-item">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>Usability &amp; Accessibility:</h6>
                          <p>Ensuring products are easy to use for everyone.</p>
                        </div>
                      </div>
                      <div className="news-item mb-0">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>User Feedback:</h6>
                          <p>Gathering insights to improve the experience.</p>
                        </div>
                      </div>
                    </div>
                    <h3 className="mt-3">Why is User-Centered Design Important?</h3>
                    <h4 className="mt-3">1. Improves Usability</h4>
                    <p className="mt-3">When designs prioritize users, navigation becomes intuitive, reducing
                      confusion and frustration. A seamless experience leads to higher engagement and
                      lower bounce rates.</p>
                    <h4 className="mt-3">2. Enhances User Satisfaction</h4>
                    <p className="mt-3">Users feel valued when products are tailored to their needs. A smooth,
                      enjoyable experience increases customer loyalty and brand trust.</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="post-thumb">
                          <img src="/assets/img/news/20.jpg" alt="img" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="post-thumb">
                          <img src="/assets/img/news/21.jpg" alt="img" />
                        </div>
                      </div>
                    </div>
                    <h3 className="mt-3">Final Thoughts</h3>
                    <p className="mt-3">User-Centered Design is not just a method—it’s a mindset. By focusing on
                      user needs,
                      businesses can create experiences that drive engagement, loyalty, and long-term
                      success.
                    </p>
                    <h4 className="mt-3">Key Principles of UCD:</h4>
                    <ul className="post-list">
                      <li>
                        <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        [The Power of Usability Testing in UX Design]
                      </li>
                      <li>
                        <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        [How to Conduct Effective UX Research]
                      </li>
                      <li className="mb-0">
                        <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        [Designing for Accessibility: Making UI Inclusive]
                      </li>
                    </ul>
                  </div>
                  <div className="comments-area">
                    <div className="comments-heading">
                      <h3>02 Comments</h3>
                    </div>
                    <div className="blog-single-comment d-flex gap-4 pt-4 pb-4">
                      <div className="image">
                        <img src="/assets/img/news/22.jpg" alt="image" />
                      </div>
                      <div className="content">
                        <div
                          className="head d-flex flex-wrap gap-2 align-items-center justify-content-between">
                          <div className="con">
                            <h5><Link href="/news-details">Lrene Strong</Link></h5>
                            <span>February 10, 2025 at 2:37 pm</span>
                          </div>
                          <Link href="/news-details" className="reply">Reply</Link>
                        </div>
                        <p className="mt-30 mb-4">Neque porro est qui dolorem ipsum quia quaed inventor
                          veritatis et quasi architecto var sed efficitur turpis gilla sed sit amet
                          finibus eros.</p>
                      </div>
                    </div>
                    <div className="blog-single-comment style-2 d-flex gap-4 pt-5 pb-4">
                      <div className="image">
                        <img src="/assets/img/news/23.jpg" alt="image" />
                      </div>
                      <div className="content">
                        <div
                          className="head d-flex flex-wrap gap-2 align-items-center justify-content-between">
                          <div className="con">
                            <h5><Link href="/news-details">Green Rayul</Link></h5>
                            <span>February 10, 2024 at 2:37 pm</span>
                          </div>
                          <Link href="/news-details" className="reply">Reply</Link>
                        </div>
                        <p className="mt-30 mb-4">Neque porro est qui dolorem ipsum quia quaed inventor
                          veritatis et quasi architecto var sed efficitur turpis.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                <div className="info-sidebar-widget" style={{ backgroundImage: "url(/assets/img/shape/bg.png)" }}>
                  <div className="info-widget">
                    <div className="logo">
                      <Link href="/"><img src="/assets/img/logo/Logo-black.svg" alt="logo" /></Link>
                    </div>
                    <div className="content">
                      <h3>Don't Hesitate to Contact Me</h3>
                      <h5>+971 56 3048781</h5>
                    </div>
                    <Link href="/contact" className="theme-btn">Get in Touch <i
                      className="fa-solid fa-arrow-right"></i></Link>
                  </div>
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
