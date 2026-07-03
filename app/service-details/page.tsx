import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ServiceDetailsPage() {
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
              <h2>Service Details</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li><i className="fa-solid fa-angle-right"></i></li>
                <li className="active">Service Details</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Details Section Start */}
      <section className="service-details-section section-padding">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="service-details-post">
                <div className="single-service-post">
                  <div className="service-thumb">
                    <img src="/assets/img/service/1.jpg" alt="img" />
                  </div>
                  <div className="post-content">
                    <h2 className="mb-3">Web Design</h2>
                    <p>In today’s digital landscape, your website is often the first impression
                      of your
                      brand. That’s why we focus on creating custom, responsive, and user-friendly
                      websites that not only look great but also provide an outstanding user experience.
                    </p>
                    <p className="mt-4">
                      Whether you're a startup or an established business, our team designs websites that
                      meet your specific needs, attract visitors, and convert them into loyal customers.
                    </p>

                    <div className="post-list">
                      <h3 className="mb-3">Our Web Design Process:</h3>
                      <p>We begin with discovery and research, create wireframes and
                        prototypes,
                        design custom
                        solutions, ensure responsiveness, optimize for SEO, and provide testing, launch,
                        and
                        ongoing support.</p>

                      <div className="post-item">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>Discovery &amp; Research:</h6>
                          <p>We begin by understanding your business, target audience, and goals. This
                            helps us design a website that reflects your brand and meets user
                            expectations.
                          </p>
                        </div>
                      </div>
                      <div className="post-item">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>Wireframing &amp; Prototyping:</h6>
                          <p>We develop wireframes and prototypes to visualize the website's layout
                            and structure, ensuring a smooth user journey.
                          </p>
                        </div>
                      </div>
                      <div className="post-item">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>Custom Design:</h6>
                          <p>Your website will be fully responsive, ensuring it looks and works
                            seamlessly across all devices, including desktops, tablets, and
                            smartphones.
                          </p>
                        </div>
                      </div>
                      <div className="post-item">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>SEO Optimization:</h6>
                          <p>We ensure your website is built with SEO best practices, increasing
                            visibility and helping you rank higher on search engines.
                          </p>
                        </div>
                      </div>
                      <div className="post-item">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>Testing &amp; Launch:</h6>
                          <p>Before going live, we rigorously test the website across browsers and
                            devices to ensure it performs perfectly.
                          </p>
                        </div>
                      </div>
                      <div className="post-item mb-3">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>Ongoing Support &amp; Maintenance:</h6>
                          <p>After launch, we provide ongoing support to ensure your website remains
                            up-to-date, secure, and optimized for performance.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row g-4 mt-4 mb-4">
                      <div className="col-lg-6">
                        <div className="post-thumb">
                          <img src="/assets/img/service/2.jpg" alt="img" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="post-thumb">
                          <img src="/assets/img/service/3.jpg" alt="img" />
                        </div>
                      </div>
                    </div>
                    <p>When an unknown printer took ar galley offer type year anddey scrambled
                      make aewer
                      specimen a book bethas survived not only five when anner year unknown printer eed
                      little help from friend from time to time. Although we offer the one-stop
                      convenience. unknown printer took galley type year anddey unknown printer took
                      galley type scrambled.</p>
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
                    <h3 className="mb-3">Why Choose Us for Your Web Design Needs?</h3>
                    <p>We create custom, user-centered, responsive websites optimized for performance, SEO,
                      and mobile, ensuring an outstanding user experience and helping your business
                      succeed online.</p>
                    <div className="post-list mt-3">
                      <div className="post-item">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>Tailored Designs:</h6>
                          <p>Every website is custom-designed to match your brand and audience.</p>
                        </div>
                      </div>
                      <div className="post-item">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>Tailored Designs:</h6>
                          <p>We focus on creating intuitive and seamless experiences for your users.
                          </p>
                        </div>
                      </div>
                      <div className="post-item mb-0">
                        <div className="icon">
                          <img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                        </div>
                        <div className="content">
                          <h6>Mobile-First Design:</h6>
                          <p>With more people browsing on mobile, we prioritize mobile-friendly
                            design.</p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3">
                      Let’s make your website work harder for you! Whether you're launching a new site or
                      redesigning an existing one, we’re here to bring your vision to life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="main-sidebar">
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Service List</h3>
                  </div>
                  <div className="service-list">
                    <ul>
                      <li><Link href="/service-details">Moblie App Design</Link> <img
                        src="/assets/img/icon/43.svg" alt="icon" /></li>
                      <li><Link href="/service-details">Web Design</Link> <img src="/assets/img/icon/43.svg"
                        alt="icon" /></li>
                      <li><Link href="/service-details">UI/UX Design</Link> <img
                        src="/assets/img/icon/43.svg" alt="icon" /></li>
                      <li><Link href="/service-details">UI/UX Design</Link> <img
                        src="/assets/img/icon/43.svg" alt="icon" /></li>
                      <li><Link href="/service-details">Visual Design</Link> <img
                        src="/assets/img/icon/43.svg" alt="icon" /></li>
                      <li><Link href="/service-details">Project Design</Link> <img
                        src="/assets/img/icon/43.svg" alt="icon" /></li>
                      <li><Link href="/service-details">Barnd Design</Link> <img
                        src="/assets/img/icon/43.svg" alt="icon" /></li>
                    </ul>
                  </div>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h3>Categories</h3>
                  </div>
                  <div className="categories-list">
                    <div className="list-item">
                      <Link href="/service-details">Wireframing</Link>
                      <Link href="/service-details">Mobile App</Link>
                      <Link href="/service-details">UI Design</Link>
                      <Link href="/service-details">Website Design</Link>
                      <Link href="/service-details">User Research</Link>
                      <Link href="/service-details">Landing page</Link>
                      <Link href="/service-details">Admin Dashboard</Link>
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
                    <Link href="/contact" className="theme-btn">
                      Get in Touch
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
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
