import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function FaqPage() {
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
              <h2>Faqs</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li><i className="fa-solid fa-angle-right"></i></li>
                <li className="active">Faqs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section Start */}
      <section className="faq-section faq-1 section-padding fix">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-lg-10">
              <div className="faq-items mt-0 me-0">
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
                          efficiency, <br /> scalability, and security.
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
                          efficiency, <br /> scalability, and security.
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
                          efficiency, <br /> scalability, and security.
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
                          efficiency, <br /> scalability, and security.
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

      {/* Testimonials Section 2 Start */}
      <section className="testimonials-section testimonials-2 section-padding section-bg">
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <span className="style-2 wow fadeInUp"><img src="/assets/img/shape/star-2.png"
                alt="img" />Testimonial</span>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Peoples Say’s About Me</h2>
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
                        <h4>Jakie Chen</h4>
                        <span>Senior Developer</span>
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
              <div className="swiper-slide">
                <div className="testimonials-item style-2">
                  <div className="head">
                    <div className="info">
                      <div className="thumb">
                        <img src="/assets/img/testimonials/4.jpg" alt="img" />
                      </div>
                      <div className="text">
                        <h4>Jaden Smith</h4>
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
        </div>
      </section>

      <Footer variant="footer-1" />
    </>
  );
}
