import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home2Page() {
  return (
    <>
      <Header variant="style-2" />
      {/* Hero Section Start */}
      <section className="hero-section hero-2 fix section-bg-2">
        <div className="arrow-shape float-bob-y">
          <img src="/assets/img/shape/angle-arrow-3.png" alt="img" />
        </div>
        <div className="star-shape float-bob-x">
          <img src="/assets/img/shape/star-3.png" alt="img" />
        </div>

        <div className="container">
          <div className="hero-title">
            <span className="wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="icon" /> Hi, I’m George
              Holdbrook</span>
            <h1 className="wow fadeInUp" data-wow-delay=".3s">Code the Future with <br /> Innovative Development</h1>
          </div>
          <div className="hero-content-wrappers">
            <div className="hero-content-left">
              <p className="wow fadeInUp" data-wow-delay=".4s">Unlock the power of innovation with cutting-edge
                development solutions. From web and mobile apps
                to
                AI and blockchain, we build scalable, future-ready technology tailored.</p>
              <div className="hero-btn">
                <Link href="/contact" className="theme-btn wow fadeInUp">Let's Talk
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <div className="social">
                  <a href="#" className="wow fadeInUp" data-wow-delay=".2s"><i
                    className="fa-brands fa-facebook-f"></i></a>
                  <a href="#" className="wow fadeInUp" data-wow-delay=".4s"><i
                    className="fa-brands fa-instagram"></i></a>
                  <a href="#" className="wow fadeInUp" data-wow-delay=".6s"><i
                    className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#" className="wow fadeInUp" data-wow-delay=".8s"><i
                    className="fa-brands fa-twitter"></i></a>
                </div>
              </div>
            </div>
            <div className="hero-thumb">
              <img src="/assets/img/hero/2.png" alt="img" />
            </div>
            <div className="hero-content-right d-none d-xl-block wow fadeInUp">
              <div className="content">
                <span><img src="/assets/img/shape/star-2.png" alt="icon" /> My Tech Stacks</span>
                <p>
                  Expert in modern tech stacks: React, Node.js, Python, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section Start */}
      <section className="service-section service-2 section-padding fix">
        <div className="container">
          <div className="section-title text-center">
            <span className="style-2 wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />Our Services</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">My Quality Services</h2>
          </div>
          <div className="service-wrapper">
            <div className="row">
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <div className="service-card-items-2 text-center wow fadeInUp" data-wow-delay=".2s">
                      <div className="icon">
                        <img src="/assets/img/icon/31.svg" alt="icon" />
                      </div>
                      <div className="content">
                        <h4><Link href="/service-details">Full Stack Web Development</Link></h4>
                        <p>I specialize in full-stack web development, building dynamic, responsive</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="service-card-items-2 text-center wow fadeInUp" data-wow-delay=".4s">
                      <div className="icon">
                        <img src="/assets/img/icon/45.svg" alt="icon" />
                      </div>
                      <div className="content">
                        <h4><Link href="/service-details">API Development</Link></h4>
                        <p>We develop robust e-commerce solutions with secure payment gateways</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="service-card-items-2 style-2 text-center wow fadeInUp" data-wow-delay=".6s">
                  <div className="icon">
                    <img src="/assets/img/icon/44.svg" alt="icon" />
                  </div>
                  <div className="content">
                    <h4><Link href="/service-details">Mobile App Development (iOS &amp; Android)</Link></h4>
                    <p>We create high-performance iOS and Android mobile apps with intuitive designs,
                      seamless functionality, and cutting-edge.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <div className="service-card-items-2 text-center wow fadeInUp" data-wow-delay=".8s">
                      <div className="icon">
                        <img src="/assets/img/icon/46.svg" alt="icon" />
                      </div>
                      <div className="content">
                        <h4><Link href="/service-details">Social Media Marketing</Link></h4>
                        <p>We provide seamless custom API integrations to enhance functionality.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="service-card-items-2 text-center wow fadeInUp" data-wow-delay="1s">
                      <div className="icon">
                        <img src="/assets/img/icon/47.svg" alt="icon" />
                      </div>
                      <div className="content">
                        <h4><Link href="/service-details">UI/UX Design &amp; Development</Link></h4>
                        <p>We craft intuitive UI/UX designs for seamless, engaging, and user-friendly
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Start */}
      <section className="about-section about-2 section-padding pb-0 section-bg fix">
        <div className="star-shape float-bob-x">
          <img src="/assets/img/shape/star-4.png" alt="img" />
        </div>
        <div className="star-down-shape float-bob-y">
          <img src="/assets/img/shape/star-5.png" alt="img" />
        </div>
        <div className="container">
          <div className="about-wrapper-2">
            <div className="row g-4">
              <div className="col-lg-6 order-2 order-lg-1">
                <div className="about-images">
                  <img src="/assets/img/about/man-2.png" alt="img" className="wow img-custom-anim-left"
                    data-wow-delay=".2s" />
                  <div className="bg-shape">
                    <img src="/assets/img/about/bg-shape-2.png" alt="img" />
                  </div>
                  <div className="video">
                    <a href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I" className="video-btn video-popup">
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
                    <div className="circle-image">
                      <img src="/assets/img/about/circle.png" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2">
                <div className="about-content">
                  <div className="section-title">
                    <span className="style-2 wow fadeInUp"><img src="/assets/img/shape/star-2.png"
                      alt="img" />About Me</span>
                    <h2 className="wow fadeInUp" data-wow-delay=".2s">My Story and Expertise</h2>
                    <p className="wow fadeInUp" data-wow-delay=".3s">With a passion for technology and years of
                      experience, I specialize in web, mobile,
                      AI, and blockchain development. My expertise lies in creating innovative, scalable,
                      and efficient solutions that help businesses.</p>
                  </div>
                  <div className="client-reviews">
                    <div className="cr-item wow fadeInUp" data-wow-delay=".3s">
                      <h2><span className="count">10</span>+</h2>
                      <p>Years of Experience</p>
                    </div>
                    <div className="cr-item wow fadeInUp" data-wow-delay=".6s">
                      <h2><span className="count">4530</span>+</h2>
                      <p>Project Completed</p>
                    </div>
                    <div className="cr-item wow fadeInUp" data-wow-delay=".9s">
                      <h2><span className="count">600</span>+</h2>
                      <p>Happy Customer</p>
                    </div>
                  </div>
                  <div className="about-button">
                    <Link href="/about" className="theme-btn wow fadeInUp" data-wow-delay=".3s">Learn More
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                    <Link href="/contact" className="theme-btn style-2 wow fadeInUp"
                      data-wow-delay=".6s">Contact Me
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* client section start */}
      <section className="client-section section-bg-2 fix">
        <div className="container">
          <div className="social-media-area wow fadeInUp" data-wow-delay=".3s">
            <div className="row align-items-center">
              <div className="col-xl-2">
                <div className="social-media-items">
                  <div className="content">
                    <h4>My Trusted Clients</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-10">
                <div className="item">
                  <div className="swiper brand-slider">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="social-media-items">
                          <div className="icon-thumb">
                            <img src="/assets/img/client/6.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="social-media-items">
                          <div className="icon-thumb">
                            <img src="/assets/img/client/6.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="social-media-items">
                          <div className="icon-thumb">
                            <img src="/assets/img/client/7.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="social-media-items">
                          <div className="icon-thumb">
                            <img src="/assets/img/client/8.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="social-media-items">
                          <div className="icon-thumb">
                            <img src="/assets/img/client/9.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="social-media-items">
                          <div className="icon-thumb">
                            <img src="/assets/img/client/10.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="social-media-items">
                          <div className="icon-thumb">
                            <img src="/assets/img/client/6.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Section Start */}
      <section className="project-section section-padding fix">
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <span className="style-2 wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />Project</span>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">My Seccess Work</h2>
            </div>
            <Link href="/portfolio-details" className="theme-btn wow fadeInUp" data-wow-delay=".3s">View All Project
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="project-wrapper-2">
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <div className="project-items-2 wow fadeInUp" data-wow-delay=".3s">
                      <div className="image">
                        <img src="/assets/img/project/5.jpg" alt="img" />
                      </div>
                      <div className="content">
                        <div className="text">
                          <span>App / Development</span>
                          <h4><Link href="/portfolio-details">Food Delivery App Development</Link></h4>
                        </div>
                        <div className="icon">
                          <Link href="/portfolio-details">
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="project-items-2 wow fadeInUp" data-wow-delay=".6s">
                      <div className="image">
                        <img src="/assets/img/project/7.jpg" alt="img" />
                      </div>
                      <div className="content">
                        <div className="text">
                          <span>App / Development</span>
                          <h4><Link href="/portfolio-details">Business Landing Page</Link></h4>
                        </div>
                        <div className="icon">
                          <Link href="/portfolio-details"> <i
                            className="fa-solid fa-arrow-right"></i></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <div className="project-items-2 wow fadeInUp" data-wow-delay=".9s">
                      <div className="image">
                        <img src="/assets/img/project/6.jpg" alt="img" />
                      </div>
                      <div className="content">
                        <div className="text">
                          <span>App / Development</span>
                          <h4><Link href="/portfolio-details">Mobile App Development Projects</Link>
                          </h4>
                        </div>
                        <div className="icon">
                          <Link href="/portfolio-details"> <i
                            className="fa-solid fa-arrow-right"></i></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="project-items-2 wow fadeInUp" data-wow-delay="1.2s">
                      <div className="image">
                        <img src="/assets/img/project/8.jpg" alt="img" />
                      </div>
                      <div className="content">
                        <div className="text">
                          <span>App / Development</span>
                          <h4><Link href="/portfolio-details">Architecture &amp; Interior Design</Link></h4>
                        </div>
                        <div className="icon">
                          <Link href="/portfolio-details">
                            <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section Start */}
      <section className="experience-section-2 section-bg-2 fix">
        <div className="random-shape float-bob-x">
          <img src="/assets/img/shape/star-5.png" alt="img" />
        </div>
        <div className="container">
          <div className="section-title  text-center">
            <span className="style-2 wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />Experience</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">Skills &amp; Tools</h2>
          </div>
          <div className="experience-wrapper-2">
            <ul className="skill-list">
              <li className="wow fadeInUp" data-wow-delay=".3s"><img src="/assets/img/icon/9.svg" alt="img" /> Tailwind
                CSS $ CSS3</li>
              <li className="wow fadeInUp" data-wow-delay=".6s"><img src="/assets/img/icon/10.svg" alt="img" /> Visual
                Basic</li>
              <li className="wow fadeInUp" data-wow-delay=".9s"><img src="/assets/img/icon/11.svg" alt="img" /> HTML &amp;
                CSS</li>
              <li className="wow fadeInUp" data-wow-delay=".3s"><img src="/assets/img/icon/12.svg" alt="img" />
                WordPress</li>
              <li className="wow fadeInUp" data-wow-delay=".6s"><img src="/assets/img/icon/13.svg" alt="img" />
                JavaScript (ES6+)</li>
              <li className="wow fadeInUp" data-wow-delay=".9s"><img src="/assets/img/icon/14.svg" alt="img" /> Python
              </li>
              <li className="wow fadeInUp" data-wow-delay=".9s"><img src="/assets/img/icon/15.svg" alt="img" /> React
              </li>
              <li className="wow fadeInUp" data-wow-delay=".6s"><img src="/assets/img/icon/16.svg" alt="img" />
                JavaScript (ES6+)</li>
              <li className="wow fadeInUp" data-wow-delay=".3s"><img src="/assets/img/icon/17.svg" alt="img" /> VueJS
              </li>
              <li className="wow fadeInUp" data-wow-delay=".9s"><img src="/assets/img/icon/18.svg" alt="img" /> Flutter
              </li>
              <li className="wow fadeInUp" data-wow-delay=".6s"><img src="/assets/img/icon/19.svg" alt="img" /> Sveltejs
              </li>
              <li className="wow fadeInUp" data-wow-delay=".3s"><img src="/assets/img/icon/20.svg" alt="img" /> Nextjs
              </li>
            </ul>
            <h6 className="mb-5 wow fadeInUp" data-wow-delay=".3s">You've got a Challenge?<Link href="/contact"
              className="link-btn"> Let's talk!</Link></h6>
          </div>
        </div>
      </section>

      {/* Marquee Section Start */}
      <section className="marquee-section section-bg-2 fix">
        <div className="marquee-container">
          <div className="marquee-wrapper">
            <div className="marquee-content">
              <div className="marquee-text">
                <img src="/assets/img/star/star-2.png" alt="img" />
                <h3>THE BEST SOLUTION</h3>
              </div>
              <div className="marquee-text">
                <img src="/assets/img/star/star-2.png" alt="img" />
                <h3>THE BEST SOLUTION</h3>
              </div>
              <div className="marquee-text">
                <img src="/assets/img/star/star-2.png" alt="img" />
                <h3>THE BEST SOLUTION</h3>
              </div>
              <div className="marquee-text">
                <img src="/assets/img/star/star-2.png" alt="img" />
                <h3>THE BEST SOLUTION</h3>
              </div>
              <div className="marquee-text">
                <img src="/assets/img/star/star-2.png" alt="img" />
                <h3>THE BEST SOLUTION</h3>
              </div>
            </div>

            {/* duplicate content for seamless scroll */}
            <div className="marquee-content">
              <div className="marquee-text">
                <img src="/assets/img/star/star-2.png" alt="img" />
                <h3>THE BEST SOLUTION</h3>
              </div>
              <div className="marquee-text">
                <img src="/assets/img/star/star-2.png" alt="img" />
                <h3>THE BEST SOLUTION</h3>
              </div>
              <div className="marquee-text">
                <img src="/assets/img/star/star-2.png" alt="img" />
                <h3>THE BEST SOLUTION</h3>
              </div>
              <div className="marquee-text">
                <img src="/assets/img/star/star-2.png" alt="img" />
                <h3>THE BEST SOLUTION</h3>
              </div>
              <div className="marquee-text">
                <img src="/assets/img/star/star-2.png" alt="img" />
                <h3>THE BEST SOLUTION</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section Start */}
      <section className="faq-section faq-1 section-padding fix">
        <div className="arrow-shape float-bob-y">
          <img src="/assets/img/shape/angle-arrow-2.png" alt="img" />
        </div>
        <div className="star-shape float-bob-x">
          <img src="/assets/img/shape/star-6.png" alt="img" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="section-title">
                <span className="style-2 wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />Find Your
                  Answer</span>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Read Most Frequent Questions</h2>
                <p className="wow fadeInUp" data-wow-delay=".3s">The value of development projects depends on <br />
                  complexity, technology, and features. Prices
                  range from <br />
                  $1,000 for simple websites.</p>
              </div>
              <h6 className="wow fadeInUp" data-wow-delay=".4s">Haven’t found an answer to your query?</h6>
              <Link href="/contact" className="theme-btn wow fadeInUp" data-wow-delay=".5s">Contact Us</Link>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="faq-items">
                <div className="faq-accordion">
                  <div className="accordion" id="accordion1">
                    <div className="accordion-item mb-3 wow fadeInUp" data-wow-delay=".1s">
                      <h4 className="accordion-header">
                        <button className="accordion-button collapsed" type="button"
                          data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="false"
                          aria-controls="faq1">
                          What services do you offer in development?
                        </button>
                      </h4>
                      <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#accordion1">
                        <div className="accordion-body">
                          Yes, we provide tailored solutions based on your business needs, ensuring
                          efficiency, scalability, and security.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-3 wow fadeInUp" data-wow-delay=".3s">
                      <h5 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                          data-bs-target="#faq2" aria-expanded="true" aria-controls="faq2">
                          Do you offer custom development solutions?
                        </button>
                      </h5>
                      <div id="faq2" className="accordion-collapse collapse show"
                        data-bs-parent="#accordion1">
                        <div className="accordion-body">
                          Yes, we provide tailored solutions based on your business needs, ensuring
                          efficiency, scalability, and security.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-3 wow fadeInUp" data-wow-delay=".5s">
                      <h5 className="accordion-header">
                        <button className="accordion-button collapsed" type="button"
                          data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false"
                          aria-controls="faq3">
                          Can you help with website and app maintenance?
                        </button>
                      </h5>
                      <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#accordion1">
                        <div className="accordion-body">
                          Yes, we provide tailored solutions based on your business needs, ensuring
                          efficiency, scalability, and security.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item wow fadeInUp" data-wow-delay=".6s">
                      <h5 className="accordion-header">
                        <button className="accordion-button collapsed" type="button"
                          data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false"
                          aria-controls="faq4">
                          Do you develop e-commerce websites?
                        </button>
                      </h5>
                      <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#accordion1">
                        <div className="accordion-body">
                          Yes, we provide tailored solutions based on your business needs, ensuring
                          efficiency, scalability, and security.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section Start */}
      <section className="work-section section-padding fix pt-0">
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
                    <h4>Deployment & Launch</h4>
                    <p>We ensure a smooth deployment and launch by setting up servers, optimizing
                      performance.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="work-items wow fadeInUp" data-wow-delay=".8s">
                  <div className="icon"><img src="/assets/img/icon/23.svg" alt="img" /></div>
                  <div className="content">
                    <h4> Maintenance & Support</h4>
                    <p>We provide ongoing maintenance and support, including updates, security patches.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section 2 Start */}
      <section className="testimonials-section testimonials-2 section-padding section-bg fix">
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <span className="style-2"><img src="/assets/img/shape/star-2.png" alt="img" />Testimonial</span>
              <h2>Peoples Say’s About Me</h2>
            </div>
            <div className="slide-btn">
              <button className="array-prev"><i className="fa-solid fa-arrow-left"></i></button>
              <button className="array-next"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
          </div>
          <div className="swiper testi-content-slider mxg">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="testimonials-item style-2">
                  <div className="head">
                    <div className="info">
                      <div className="thumb">
                        <img src="/assets/img/testimonials/2.jpg" alt="img" />
                      </div>
                      <div className="text">
                        <h4>Michael Sarah</h4>
                        <span>Product Manager</span>
                      </div>
                    </div>
                    <div className="qoute">
                      <img src="/assets/img/icon/24.svg" alt="img" />
                    </div>
                  </div>
                  <p>Our app exceeded expectations! The design, performance, and user experience were
                    flawless. Highly
                    recommend their services!</p>
                  <div className="star">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonials-item">
                  <div className="head">
                    <div className="info">
                      <div className="thumb">
                        <img src="/assets/img/testimonials/3.jpg" alt="img" />
                      </div>
                      <div className="text">
                        <h4>James L.</h4>
                        <span>UI Designer</span>
                      </div>
                    </div>
                    <div className="qoute">
                      <img src="/assets/img/icon/24.svg" alt="img" />
                    </div>
                  </div>
                  <p>Our app exceeded expectations! The design, performance, and user experience were
                    flawless. Highly
                    recommend their services!</p>
                  <div className="star">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonials-item style-2">
                  <div className="head">
                    <div className="info">
                      <div className="thumb">
                        <img src="/assets/img/testimonials/4.jpg" alt="img" />
                      </div>
                      <div className="text">
                        <h4>Marvin McKinney</h4>
                        <span>Seinor Developer</span>
                      </div>
                    </div>
                    <div className="qoute">
                      <img src="/assets/img/icon/24.svg" alt="img" />
                    </div>
                  </div>
                  <p>Our app exceeded expectations! The design, performance, and user experience were
                    flawless. Highly
                    recommend their services!</p>
                  <div className="star">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonials-item">
                  <div className="head">
                    <div className="info">
                      <div className="thumb">
                        <img src="/assets/img/testimonials/3.jpg" alt="img" />
                      </div>
                      <div className="text">
                        <h4>Michael Sarah</h4>
                        <span>Product Manager</span>
                      </div>
                    </div>
                    <div className="qoute">
                      <img src="/assets/img/icon/24.svg" alt="img" />
                    </div>
                  </div>
                  <p>Our app exceeded expectations! The design, performance, and user experience were
                    flawless. Highly
                    recommend their services!</p>
                  <div className="star">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-dot-2">
            <div className="dot-2"></div>
          </div>
        </div>
      </section>

      {/* Contact Section Start */}
      <section className="contact-section contact-1 section-padding section-bg-2 fix">
        <div className="star-left-shape float-bob-y">
          <img src="/assets/img/shape/star-5.png" alt="shape" />
        </div>
        <div className="star-right-shape float-bob-y">
          <img src="/assets/img/shape/star-7.png" alt="shape" />
        </div>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="contact-wrapper">
                <div className="section-title">
                  <span className="style-2 wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />Contact
                    Me</span>
                  <h2 className="wow fadeInUp" data-wow-delay=".2s">Contact With Me Today</h2>
                  <p className="wow fadeInUp" data-wow-delay=".3s">Let’s bring your ideas to life! Contact me
                    today for innovative web, app, and software
                    development solutions tailored to your needs.</p>
                </div>
                <div className="google-map">
                  <iframe className="wow img-custom-anim-left" data-wow-delay=".3s"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd"
                    style={{ border: 0 }} allowFullScreen loading="lazy">
                  </iframe>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-form">
                <h3>Get In Touch</h3>

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
                        <textarea name="message" placeholder="Enter Your Message"></textarea>
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

      {/* News Section Start */}
      <section className="news-section news-2 section-padding fix">
        <div className="container">
          <div className="section-title text-center">
            <span className="style-2 wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />My Articles</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">My Recent Blog & Articles</h2>
          </div>
          <div className="news-content-wrapper">
            <div className="news-item-2 wow fadeInUp" data-wow-delay=".3s">
              <div className="title">
                <h4><Link href="/news-details">How IoT is Revolutionizing Smart Technology</Link></h4>
              </div>
              <div className="content">
                <p>Stay ahead with the latest trends in web <br /> and app development, including AI integration
                </p>
              </div>
              <ul className="post-meta">
                <li className="green">Development</li>
                <li><span></span> 26 June 2024</li>
              </ul>
              <div className="thumb-hover bg-cover" style={{ backgroundImage: "url('/assets/img/news/27.jpg')" }}>
              </div>
            </div>
            <div className="news-item-2 wow fadeInUp" data-wow-delay=".6s">
              <div className="title">
                <h4><Link href="/news-details">Essential Tools & Frameworks for Modern Developers</Link></h4>
              </div>
              <div className="content">
                <p>Modern developers rely on essential tools and <br /> frameworks like React</p>
              </div>
              <ul className="post-meta">
                <li className="green">Development</li>
                <li><span></span> 26 June 2024</li>
              </ul>
              <div className="thumb-hover bg-cover" style={{ backgroundImage: "url('/assets/img/news/27.jpg')" }}>
              </div>
            </div>
            <div className="news-item-2 wow fadeInUp" data-wow-delay=".9s">
              <div className="title">
                <h4><Link href="/news-details">Latest Trends in Web & App Development</Link></h4>
              </div>
              <div className="content">
                <p>Stay ahead with the latest trends in web <br /> and app development, including AI integration
                </p>
              </div>
              <ul className="post-meta">
                <li className="green">Development</li>
                <li><span></span> 26 June 2024</li>
              </ul>
              <div className="thumb-hover bg-cover" style={{ backgroundImage: "url('/assets/img/news/27.jpg')" }}>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer variant="footer-2" />
    </>
  );
}
