import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/contact/ContactForm";

export default function ContactPage() {
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
              <h2>Contact Me</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li><i className="fa-solid fa-angle-right"></i></li>
                <li className="active">Contact Me</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Start */}
      <section className="contact-section contact-1 section-padding fix">
        <div className="star-left-shape"></div>
        <div className="star-right-shape"></div>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="contact-wrapper-2">
                <div className="section-title">
                  <span className="style-2 border-0 p-0 wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />Contact
                    Me</span>
                  <h2 className="wow fadeInUp" data-wow-delay=".2s">Have a Project in Mind? Let&rsquo;s Talk!</h2>
                  <p className="mt-3 mt-mb-0">Are you looking to create a seamless and engaging user <br />
                    experience? here to help!</p>

                </div>
                <div className="contact-item-wrapper">
                  <div className="contact-item wow fadeInUp" data-wow-delay=".2s">
                    <div className="icon">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div className="content">
                      <span>Call Now</span>
                      <h6>+888 (555) 546-33</h6>
                    </div>
                  </div>
                  <div className="contact-item wow fadeInUp" data-wow-delay=".4s">
                    <div className="icon">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="content">
                      <span>Email</span>
                      <h6>xiomi@gmail.com</h6>
                    </div>
                  </div>
                  <div className="contact-item wow fadeInUp" data-wow-delay=".6s">
                    <div className="icon">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div className="content">
                      <span>Address</span>
                      <h6>66 Broklyant,Road 1240 Canada</h6>
                    </div>
                  </div>
                </div>
                <div className="social">
                  <h6>Social: </h6>
                  <ul className="social-list">
                    <li className="wow fadeInUp" data-wow-delay=".2s"><a href="#"><i
                      className="fa-brands fa-facebook-f"></i></a></li>
                    <li className="wow fadeInUp" data-wow-delay=".4s"><a href="#"><i
                      className="fa-brands fa-twitter"></i></a></li>
                    <li className="wow fadeInUp" data-wow-delay=".6s"><a href="#"><i
                      className="fa-brands fa-instagram"></i></a></li>
                    <li className="wow fadeInUp" data-wow-delay=".8s"><a href="#"><i
                      className="fa-brands fa-linkedin-in"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="google-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd"
                  style={{ border: 0 }} allowFullScreen loading="lazy">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* contact form section */}
      <section className="contact-from-section section-padding pt-0 fix">
        <div className="container">
          <div className="contact-form-box">
            <h3 className="wow fadeInUp">Get In Touch</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Testimonials Section 2 Start */}
      <section className="testimonials-section testimonials-2 section-padding section-bg fix">
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <span className="style-2 wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />Testimonial</span>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Peoples Say&rsquo;s About Me</h2>
            </div>
            <a href="" className="theme-btn wow fadeInUp" data-wow-delay=".3s">Testimonial</a>
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
            </div>
          </div>
        </div>
      </section>

      <Footer variant="footer-1" />
    </>
  );
}
