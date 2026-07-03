import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home3Page() {
  return (
    <>
      <Header variant="header-3" />

      {/* Hero Section Start */}
      <section className="hero-section hero-3 bg-cover fix" style={{ backgroundImage: "url(/assets/img/hero/bg-3.jpg)" }}>
        <div className="balance-shape float-bob-x">
          <img src="/assets/img/shape/balance.png" alt="shape" />
        </div>
        <div className="ruler-shape float-bob-y">
          <img src="/assets/img/shape/rules-coler-2.png" alt="shape" />
        </div>
        <div className="random-shape float-bob-y">
          <img src="/assets/img/shape/random-shape-2.png" alt="random-shape" />
        </div>

        <div className="hero-info">
          <a href="#" className="active">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Linked in</a>
          <a href="#">Dribbble</a>
        </div>
        <div className="container">
          <div className="hero-content-wrapper">
            <span className="wow fadeInUp"><img src="/assets/img/icon/32.svg" alt="icon" />YOUR OUR LEGAL ADVOCATE</span>
            <h1 className="wow fadeInUp" data-wow-delay=".2s">We Stand Firmly for <br /> Your Right to Justice</h1>
            <p className="wow fadeInUp" data-wow-delay=".3s">Fliquam massa nisl quis neque suspendisse in orci enim
              Lorem Ipsum proin gravida nibh vel velit
              auctor aliquet <br /> sollicit negligence We’re a team of strategic working globally with largest
              brands.
            </p>
            <Link href="/contact" className="theme-btn wow fadeInUp" data-wow-delay=".4s">Hire Me Now <i
              className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section Start */}
      <section className="feature-section">
        <div className="container">
          <div className="feature-wrapper">
            <div className="row g-3">
              <div className="col-lg-4 col-md-6">
                <div className="feature-item wow fadeInUp" data-wow-delay=".3s">
                  <div className="icon">
                    <img src="/assets/img/icon/33.svg" alt="icon" />
                  </div>
                  <div className="content">
                    <h4><Link href="/contact">Best Client Support</Link></h4>
                    <p>Auit zaer odit aut fugit quia magni eos ratione voluptatem reruo</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="feature-item wow fadeInUp" data-wow-delay=".6s">
                  <div className="icon">
                    <img src="/assets/img/icon/34.svg" alt="icon" />
                  </div>
                  <div className="content">
                    <h4><Link href="/contact">Certified Lawyers</Link></h4>
                    <p>Auit zaer odit aut fugit quia magni eos ratione voluptatem reruo</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="feature-item wow fadeInUp" data-wow-delay=".9s">
                  <div className="icon">
                    <img src="/assets/img/icon/35.svg" alt="icon" />
                  </div>
                  <div className="content">
                    <h4><Link href="/contact">Legal Advices</Link></h4>
                    <p>Auit zaer odit aut fugit quia magni eos ratione voluptatem reruo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Start */}
      <section className="about-section about-3 section-padding fix">
        <div className="order-shape float-bob-y">
          <img src="/assets/img/shape/scale-orders.png" alt="shape" />
        </div>
        <div className="scales-shape float-bob-x">
          <img src="/assets/img/shape/Scales-2.png" alt="img" />
        </div>
        <div className="container">
          <div className="about-wrapper-3">
            <div className="row g-3 align-items-center justify-content-between">
              <div className="col-xl-5 col-lg-5">
                <div className="about-images">
                  <img src="/assets/img/about/man-3.png" alt="img" className="wow img-custom-anim-left"
                    data-wow-delay=".3s" />
                  <div className="circle-box ">
                    <img src="/assets/img/about/circle-2.png" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="about-content">
                  <div className="section-title">
                    <span className="style-3 wow fadeInUp"><img src="/assets/img/icon/32.svg" alt="icon" />About
                      Me</span>
                    <h2 className="wow fadeInUp" data-wow-delay=".2s">Experienced lawyers ready to help</h2>
                    <p className="wow fadeInUp" data-wow-delay=".3s">It is a long established fact that a reader
                      will distracted content of a page when
                      looking at established It is a Set up you appointment today, choosing between
                      meeting in person.</p>
                  </div>
                  <div className="text wow fadeInUp" data-wow-delay=".5s">
                    <div className="icon">
                      <img src="/assets/img/icon/36.svg" alt="icon" />
                    </div>
                    <p>We believe everyone deserves affordable and simple access to legal services and
                      helping people.</p>
                  </div>
                  <div className="items">
                    <div className="item wow fadeInUp" data-wow-delay=".3s">
                      <div className="icon">
                        <img src="/assets/img/icon/37.svg" alt="icon" />
                      </div>
                      <h6>Proven Track Record</h6>
                    </div>
                    <div className="item wow fadeInUp" data-wow-delay=".6s">
                      <div className="icon">
                        <img src="/assets/img/icon/38.svg" alt="icon" />
                      </div>
                      <h6>Accessible and Responsive</h6>
                    </div>
                  </div>
                  <div className="about-btn">
                    <Link href="/about" className="theme-btn">Learn More
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                    <a href="https://www.youtube.com/watch?v=8Q3jJA60jWo" className="video-btn video-popup">
                      <span className="icon"><i className="fa-solid fa-play"></i></span>
                      <span className="textx">Inter Video</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section Start */}
      <section className="service-section service-3 section-padding section-bg fix">
        <div className="random-shape float-bob-x">
          <img src="/assets/img/shape/random-shape-3.png" alt="shape" />
        </div>
        <div className="container">
          <div className="section-title text-center">
            <span className="style-3 wow fadeInUp"><img src="/assets/img/icon/32.svg" alt="icon" />Services</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">What I Do</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="service-item wow fadeInUp" data-wow-delay=".3s">
                <div className="icon">
                  <img src="/assets/img/icon/39.svg" alt="" />
                </div>
                <div className="content">
                  <h4><Link href="/service-details">Business Law</Link></h4>
                  <p>Our law firm’s securitie there attorneys understand that is a difference.</p>
                </div>
                <Link href="/service-details" className="theme-btn">
                  Read More
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-item wow fadeInUp" data-wow-delay=".6s">
                <div className="icon">
                  <img src="/assets/img/icon/40.svg" alt="" />
                </div>
                <div className="content">
                  <h4><Link href="/service-details">Family Law</Link></h4>
                  <p>Our law firm’s securitie there attorneys understand that is a difference.</p>
                </div>
                <Link href="/service-details" className="theme-btn">
                  Read More
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-item wow fadeInUp" data-wow-delay=".9s">
                <div className="icon">
                  <img src="/assets/img/icon/41.svg" alt="" />
                </div>
                <div className="content">
                  <h4><Link href="/service-details">International Law</Link></h4>
                  <p>Our law firm’s securitie there attorneys understand that is a difference.</p>
                </div>
                <Link href="/service-details" className="theme-btn">
                  Read More
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <span className="wow fadeInUp mt-5" data-wow-delay=".3s">
            Contect Us For Better Help &amp; Service <Link href="/service-details">View All Service</Link>
          </span>
        </div>
      </section>

      {/* Client Section Start */}
      <section className="client-section section-padding section-bg-2 fix">
        <div className="container">
          <div className="client-wrapper-2">
            <div className="row g-4">
              <div className="col-lg-7">
                <div className="client-item-wrapper">
                  <div className="client-item wow fadeInUp" data-wow-delay=".2s">
                    <img src="/assets/img/client/11.png" alt="img" />
                  </div>
                  <div className="client-item wow fadeInUp" data-wow-delay=".4s">
                    <img src="/assets/img/client/11.png" alt="img" />
                  </div>
                  <div className="client-item wow fadeInUp" data-wow-delay=".6s">
                    <img src="/assets/img/client/11.png" alt="img" />
                  </div>
                  <div className="client-item wow fadeInUp" data-wow-delay=".8s">
                    <div className="content">
                      <h2><span className="count">45</span>+</h2>
                      <p>Active Clients</p>
                    </div>
                  </div>
                  <div className="client-item wow fadeInUp style-2" data-wow-delay=".2s">
                    <Link href="/contact">View All Logo</Link>
                  </div>
                  <div className="client-item wow fadeInUp" data-wow-delay=".4s">
                    <img src="/assets/img/client/11.png" alt="img" />
                  </div>
                  <div className="client-item wow fadeInUp" data-wow-delay=".6s">
                    <img src="/assets/img/client/11.png" alt="img" />
                  </div>
                  <div className="client-item wow fadeInUp" data-wow-delay=".8s">
                    <img src="/assets/img/client/11.png" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="client-content">
                  <div className="section-title">
                    <span className="wow fadeInUp"><img src="/assets/img/shape/star-2.png"
                      alt="icon" />Clients</span>
                    <h2 className="wow fadeInUp" data-wow-delay=".2s">Worked with largest Corporate Company</h2>
                  </div>
                  <p className="wow fadeInUp mt-3 mt-mb-0" data-wow-delay=".3s">Give lady of they such they sure
                    it. Me
                    contained explained my education.
                    Vulgar as hearts by garret perceived as perfection.
                  </p>
                  <div className="icon wow fadeInUp" data-wow-delay=".4s">
                    <img src="/assets/img/client/avater.png" alt="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Section Start */}
      <section className="project-section project-3 section-padding fix">
        <div className="scale-shape float-bob-x">
          <img src="/assets/img/shape/Scales-3.png" alt="img" />
        </div>
        <div className="regulation-shape float-bob-y">
          <img src="/assets/img/shape/regulation.png" alt="img" />
        </div>
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <span className="style-3 wow fadeInUp"><img src="/assets/img/icon/32.svg" alt="icon" />CASE STUDIES</span>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">My Recent Working Project</h2>
            </div>
            <Link href="/portfolio-details" className="theme-btn">
              View All Project
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="project-wrapper-3">
            <div className="main-box">
              <div className="box active wow fadeInUp">
                <div className="project-content">
                  <div className="text">
                    <span>Criminal Low</span>
                    <h4><Link href="/portfolio-details">Criminal Lawyer</Link></h4>
                  </div>
                  <Link href="/portfolio-details" className="icon"><i className="fa-solid fa-arrow-right"></i></Link>
                </div>
              </div>
              <div className="box bg-1 wow fadeInUp wow" data-wow-delay=".2s">
                <div className="project-content">
                  <div className="text">
                    <span>Criminal Low</span>
                    <h4><Link href="/portfolio-details">Criminal Lawyer</Link></h4>
                  </div>
                  <Link href="/portfolio-details" className="icon"><i className="fa-solid fa-arrow-right"></i></Link>
                </div>
              </div>
              <div className="box bg-2 wow fadeInUp wow" data-wow-delay=".4s">
                <div className="project-content">
                  <div className="text">
                    <span>Criminal Low</span>
                    <h4><Link href="/portfolio-details">Criminal Lawyer</Link></h4>
                  </div>
                  <Link href="/portfolio-details" className="icon"><i className="fa-solid fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section Start */}
      <section className="experience-section experience-3 section-padding section-bg fix">
        <div className="random-shape float-bob-x">
          <img src="/assets/img/shape/star-5.png" alt="img" />
        </div>
        <div className="container">
          <div className="section-title text-center">
            <span className="style-3 wow fadeInUp"><img src="/assets/img/icon/32.svg" alt="icon" />RESUME</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">My Work Experience</h2>
          </div>
          <div className="experience-main-wrapper">
            <div className="content-item wow fadeInUp" data-wow-delay=".3s">
              <div className="head">
                <h4><img src="/assets/img/icon/32.svg" alt="icon" /> Personal Injury &amp; Civil Litigation</h4>
                <span>2022 - 24 (Present)</span>
              </div>
              <div className="text">
                <ul className="list">
                  <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />Representing clients in
                    personal injury claims, including car accidents and medical malpractice.</li>
                  <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />Handling civil disputes,
                    contract breaches, and settlement negotiations.</li>
                </ul>
                <div className="logo">
                  <img src="/assets/img/project/12.png" alt="img" />
                </div>
              </div>
            </div>
            <div className="content-item wow fadeInUp" data-wow-delay=".6s">
              <div className="head">
                <h4><img src="/assets/img/icon/32.svg" alt="icon" /> Employment &amp; Labor Law</h4>
                <span>2019 - 2021</span>
              </div>
              <div className="text">
                <ul className="list">
                  <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />Representing employees and
                    businesses in workplace disputes and legal claims.</li>
                  <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />dvising on employment
                    contracts, wrongful termination, and workplace compliance.</li>
                </ul>
                <div className="logo">
                  <img src="/assets/img/project/13.png" alt="img" />
                </div>
              </div>
            </div>
            <div className="content-item wow fadeInUp" data-wow-delay=".9s">
              <div className="head">
                <h4><img src="/assets/img/icon/32.svg" alt="icon" /> Family Law &amp; Divorce Cases</h4>
                <span>2016 - 2018</span>
              </div>
              <div className="text">
                <ul className="list">
                  <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" /> Representing employees and
                    businesses in workplace disputes and legal claims.</li>
                  <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" /> dvising on employment
                    contracts, wrongful termination, and workplace compliance.</li>
                </ul>
                <div className="logo">
                  <img src="/assets/img/project/14.png" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section 3 Start */}
      <section className="testimonials-section testimonials-3 section-padding section-bg-2 fix">
        <div className="scale-shape float-bob-x">
          <img src="/assets/img/shape/Scales.png" alt="shape" />
        </div>
        <div className="orders-shape float-bob-y">
          <img src="/assets/img/shape/scale-orders-2.png" alt="shape" />
        </div>
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <span className="style-3 wow fadeInUp"><img src="/assets/img/shape/star-2.png"
                alt="img" />TESTIMONIALS</span>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">What’s Our Clients Say</h2>
            </div>
            <div className="slide-btn">
              <button className="array-prev style-2"><i className="fa-solid fa-arrow-left"></i></button>
              <button className="array-next style-2"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className="swiper testimonial-slider-2">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="testimonials-card-item">
                      <div className="content">
                        <div className="star">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <p>“Law is a system of rules guid created and enforced by Working with several
                          word theme
                          templates the last years only can say this is best.”</p>
                        <div className="bottom">
                          <div className="info">
                            <h4>Jackin Martinez</h4>
                            <span>Business Law Service</span>
                          </div>
                          <div className="icon">
                            <img src="/assets/img/testimonials/glyph.png" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="thumb-box wow img-custom-anim-top">
                        <img src="/assets/img/testimonials/5.jpg" alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="thumb">
                <img src="/assets/img/testimonials/6.jpg" alt="img" className="wow img-custom-anim-top"
                  data-wow-delay=".3s" />
                <div className="info">
                  <h4>Jackin Martinez</h4>
                  <span>Business Law Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* funfact section start */}
      <section className="funfact-section">
        <div className="container">
          <div className="funfact-wrapper">
            <div className="row g-3">
              <div className="col-lg-3 col-md-6">
                <div className="item wow fadeInUp" data-wow-delay=".2s">
                  <h2><span className="count">23</span>k</h2>
                  <p>Trusted Clients</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="item wow fadeInUp" data-wow-delay=".4s">
                  <h2><span className="count">162</span>k</h2>
                  <p>Recovered Clients</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="item wow fadeInUp" data-wow-delay=".6s">
                  <h2><span className="count">90</span>%</h2>
                  <p>Special Cases</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="item wow fadeInUp" data-wow-delay=".8s">
                  <h2><span className="count">22</span>+</h2>
                  <p>Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section Start */}
      <section className="news-section news-1 style-3 section-padding fix">
        <div className="regulation-shape float-bob-x">
          <img src="/assets/img/shape/regulation.png" alt="shape" />
        </div>
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <span className="style-3 wow fadeInUp"><img src="/assets/img/icon/32.svg" alt="icon" />UPDATE</span>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Latest News &amp; Blogs</h2>
            </div>
            <Link href="/news-details" className="theme-btn">View All Project<i
              className="fa-solid fa-arrow-right"></i></Link>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="news-item wow fadeInUp" data-wow-delay=".3s">
                <div className="content">
                  <ul className="news-meta">
                    <li>Nuvio</li>
                    <li className="date"><span></span>26 June 2024</li>
                  </ul>
                  <h4><Link href="/news-details">How to Choose the Right Lawyer for Your Case</Link></h4>
                </div>
                <div className="thumb">
                  <img src="/assets/img/news/24.jpg" alt="img" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="news-item wow fadeInUp" data-wow-delay=".6s">
                <div className="content">
                  <ul className="news-meta">
                    <li>Nuvio</li>
                    <li className="date"><span></span>26 June 2024</li>
                  </ul>
                  <h4><Link href="/news-details">Top Legal Mistakes People Make and How to Avoid Them</Link>
                  </h4>
                </div>
                <div className="thumb">
                  <img src="/assets/img/news/25.jpg" alt="img" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="news-item wow fadeInUp" data-wow-delay=".9s">
                <div className="content">
                  <ul className="news-meta">
                    <li>Nuvio</li>
                    <li className="date"><span></span>26 June 2024</li>
                  </ul>
                  <h4><Link href="/news-details">How to Find the Right Lawyer for Your Legal Needs</Link></h4>
                </div>
                <div className="thumb">
                  <img src="/assets/img/news/26.jpg" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Start */}
      <section className="contact-section contact-1 section-padding section-bg-2 fix">
        <div className="bottom-shape float-bob-x">
          <img src="/assets/img/shape/Scales-2.png" alt="shape" />
        </div>
        <div className="regulation-shape float-bob-y">
          <img src="/assets/img/shape/regulation-2.png" alt="shape" />
        </div>
        <div className="random-shape float-bob-x">
          <img src="/assets/img/shape/random-shape-2.png" alt="shape" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-wrapper">
                <div className="section-title">
                  <span className="style-3 wow fadeInUp"><img src="/assets/img/icon/32.svg" alt="icon" />Stay
                    connected</span>
                  <h2 className="wow fadeInUp" data-wow-delay=".2s">Building Something Great Together</h2>
                  <p className="wow fadeInUp" data-wow-delay=".3s">Each demo built with Teba will look different.
                    You customize almost anything in the
                    appearance of your website with only a few clicks Teba will look different.</p>
                  <div className="contact-items">
                    <div className="icon wow fadeInUp" data-wow-delay=".4s">
                      <img src="/assets/img/contact/icon.png" alt="icon" />
                    </div>
                    <div className="content wow fadeInUp" data-wow-delay=".5s">
                      <h5>Call Now</h5>
                      <h4>+888 (555) 546-33</h4>
                    </div>
                  </div>
                </div>
                <div className="ctx">
                  <div className="icon"></div>
                  <div className="phone">
                    <h5>Call Now</h5>
                    <a href="tel:+888(555)546-33">+888 (555) 546-33</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-form">
                <h3>Get a Quote</h3>

                <form action="#" method="POST">
                  <div className="contact-box">
                    <div className="row">
                      <div className="col-md-6">
                        <input type="text" name="name" placeholder="Enter Your Name" />
                      </div>
                      <div className="col-md-6">
                        <input type="text" name="phone" placeholder="Enter Your Number" />
                      </div>
                      <div className="col-12">
                        <input type="email" name="email" placeholder="Enter Your Email" />
                      </div>
                      <div className="col-12">
                        <input type="text" name="message" className="ext" placeholder="Enter Your Message" />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="theme-btn">Send Message</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="footer-3" />
    </>
  );
}
