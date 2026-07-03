import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ServicePage() {
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
              <h2>Service</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li><i className="fa-solid fa-angle-right"></i></li>
                <li className="active">Service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section Start */}
      <section className="service-section service-1 section-padding section-bg-2 fix">
        <div className="random-shape float-bob-y">
          <img src="/assets/img/shape/random-shape.png" alt="img" />
        </div>
        <div className="container">
          <div className="section-title text-center">
            <span className="wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />Our Service</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">The Ease-<span>Service</span> Process</h2>
          </div>
          <div className="service-wrapper">
            <div className="services-item wow fadeInUp" data-wow-delay=".2s">
              <div className="head">
                <span>01</span>
                <h4><Link href="/service-details">Moblie App Design</Link></h4>
              </div>
              <div className="text">
                <p>We’re a team of strategic working globally with largest brands, <br />
                  progress only you to play things safe.</p>
              </div>
              <div className="link-btn">
                <i className="fa-solid fa-arrow-right"></i>
                <Link href="/service-details">Read More</Link>
              </div>
            </div>
            <div className="services-item wow fadeInUp" data-wow-delay=".4s">
              <div className="head">
                <span>02</span>
                <h4><Link href="/service-details">Web Design</Link></h4>
              </div>
              <div className="text">
                <p>We’re a team of strategic working globally with largest brands,
                  <br /> progress only you to play things safe.
                </p>
              </div>
              <div className="link-btn">
                <i className="fa-solid fa-arrow-right"></i>
                <Link href="/service-details">Read More</Link>
              </div>
            </div>
            <div className="services-item wow fadeInUp" data-wow-delay=".6s">
              <div className="head">
                <span>03</span>
                <h4><Link href="/service-details">UI/UX Design</Link></h4>
              </div>
              <div className="text">
                <p>We’re a team of strategic working globally with largest brands, <br />
                  progress only you to play things safe.</p>
              </div>
              <div className="link-btn">
                <i className="fa-solid fa-arrow-right"></i>
                <Link href="/service-details">Read More</Link>
              </div>
            </div>
            <div className="services-item wow fadeInUp" data-wow-delay=".8s">
              <div className="head">
                <span>04</span>
                <h4><Link href="/service-details">Visual Design</Link></h4>
              </div>
              <div className="text">
                <p>We’re a team of strategic working globally with largest brands, <br />
                  progress only you to play things safe.</p>
              </div>
              <div className="link-btn">
                <i className="fa-solid fa-arrow-right"></i>
                <Link href="/service-details">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section Start */}
      <section className="awards-section section-padding fix">
        <div className="trophy-shape">
          <img src="/assets/img/shape/trophy.png" alt="img" />
        </div>
        <div className="star-shape float-bob-x">
          <img src="/assets/img/shape/star.png" alt="img" />
        </div>
        <div className="container">
          <div className="awards-wrapper">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="section-title mb-0">
                  <span className="wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />Awards</span>
                  <h2 className="wow fadeInUp" data-wow-delay=".2s"><span>Awards</span> &amp; Recognition</h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className="awards-item wow fadeInUp" data-wow-delay=".2s">
                  <div className="content">
                    <div className="icon">
                      <img src="/assets/img/icon/1.svg" alt="img" />
                    </div>
                    <div className="text">
                      <h4>Design Leadership Award</h4>
                      <span>March 26, 2024</span>
                    </div>
                  </div>
                  <div className="icon">
                    <img src="/assets/img/icon/5.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="awards-item wow fadeInUp" data-wow-delay=".5s">
                  <div className="content">
                    <div className="icon">
                      <img src="/assets/img/icon/2.svg" alt="img" />
                    </div>
                    <div className="text">
                      <h4>Best Mobile App Design</h4>
                      <span>March 26, 2024</span>
                    </div>
                  </div>
                  <div className="icon">
                    <img src="/assets/img/icon/6.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="awards-item wow fadeInUp" data-wow-delay=".8s">
                  <div className="content">
                    <div className="icon">
                      <img src="/assets/img/icon/3.svg" alt="img" />
                    </div>
                    <div className="text">
                      <h4>Best UI/UX Design Award</h4>
                      <span>March 26, 2024</span>
                    </div>
                  </div>
                  <div className="icon">
                    <img src="/assets/img/icon/7.svg" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="awards-item wow fadeInUp" data-wow-delay="1.1s">
                  <div className="content">
                    <div className="icon">
                      <img src="/assets/img/icon/4.svg" alt="img" />
                    </div>
                    <div className="text">
                      <h4>Creative Awards</h4>
                      <span>March 26, 2024</span>
                    </div>
                  </div>
                  <div className="icon">
                    <img src="/assets/img/icon/8.svg" alt="img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section Start */}
      <section className="pricing-section section-padding section-bg fix">
        <div className="container">
          <div className="section-title text-center">
            <span><img src="/assets/img/shape/star-2.png" alt="img" />Best Pricing</span>
            <h2>My <span>Pricing</span> Plan</h2>
          </div>
          <div className="price-wrapper">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="price-item">
                  <div className="content">
                    <h4>Basic Plan</h4>
                    <h3>$2500<span>/Monthly</span></h3>
                    <p>Description of the tier list will go here, copy should be concise and impactful.</p>
                  </div>
                  <ul className="price-list">
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> UI UX Design</li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Design Customization
                    </li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Design with Figma</li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Multipage Design</li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Support 6 months</li>
                  </ul>
                  <Link href="/contact" className="theme-btn">
                    Start My Project Now
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="price-item style-2">
                  <div className="content">
                    <h6 className="box">Most Popular </h6>
                    <h4>Standard Plan</h4>
                    <h3>$2500<span>/Monthly</span></h3>
                    <p>Description of the tier list will go here, copy should be concise and impactful.</p>
                  </div>
                  <ul className="price-list">
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> UI UX Design</li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Design Customization
                    </li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Design with Figma</li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Multipage Design</li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Support 6 months</li>
                  </ul>
                  <Link href="/contact" className="theme-btn">
                    Start My Project Now
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="price-item">
                  <div className="content">
                    <h4>Premium Plan</h4>
                    <h3>$3500<span>/Monthly</span></h3>
                    <p>Description of the tier list will go here, copy should be concise and impactful.</p>
                  </div>
                  <ul className="price-list">
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> UI UX Design</li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Design Customization
                    </li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Design with Figma</li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Multipage Design</li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="img" /> Support 6 months</li>
                  </ul>
                  <Link href="/contact" className="theme-btn">
                    Start My Project Now
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section Start */}
      <section className="work-section section-padding fix">
        <div className="star-shape float-bob-x">
          <img src="/assets/img/shape/star-8.png" alt="img" />
        </div>
        <div className="container">
          <div className="section-title text-center">
            <span className="style-2 wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />How It Works</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">Our Development Process</h2>
          </div>
          <div className="work-wrapper">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="work-items wow fadeInUp" data-wow-delay=".2s">
                  <div className="icon"><img src="/assets/img/icon/21.svg" alt="img" /></div>
                  <div className="content">
                    <h4>Development</h4>
                    <p>We provide cutting-edge development <br /> solutions, including web, mobile.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="work-items wow fadeInUp" data-wow-delay=".5s">
                  <div className="icon"><img src="/assets/img/icon/22.svg" alt="img" /></div>
                  <div className="content">
                    <h4>Deployment &amp; Launch</h4>
                    <p>We ensure a smooth deployment and launch by setting up servers, optimizing
                      performance.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="work-items wow fadeInUp" data-wow-delay=".8s">
                  <div className="icon"><img src="/assets/img/icon/23.svg" alt="img" /></div>
                  <div className="content">
                    <h4> Maintenance &amp; Support</h4>
                    <p>We provide ongoing maintenance and support, including updates, security patches.</p>
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
