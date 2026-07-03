import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getBlogEntries } from "@/lib/blog";

// Re-read the LinkedIn snapshot periodically so new newsletter editions appear
// after the 48h cron refresh (matches the Blog page behaviour).
export const revalidate = 1800; // 30 min

export default async function AboutPage() {
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
              <h2>About Us</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li><i className="fa-solid fa-angle-right"></i></li>
                <li className="active">About Us</li>
              </ul>
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
                  <img src="/Sir/Artboard%201.png" alt="img" className="wow img-custom-anim-left"
                    data-wow-delay=".2s" style={{ width: "100%", maxWidth: "610px", aspectRatio: "610 / 560", objectFit: "cover" }} />
                  <div className="bg-shape">
                    <img src="/assets/img/about/bg-shape-2.png" alt="img" />
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

      {/* Experience Section Start */}
      <section className="experience-section section-padding section-bg-2 fix">
        <div className="random-shape float-bob-x">
          <img src="/assets/img/shape/random-shape.png" alt="img" />
        </div>
        <div className="container">
          <div className="section-title  text-center">
            <span className="wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />My Experience</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">My Work Experience</h2>
          </div>
          <div className="experience-wrapper">
            <div className="experience-items wow fadeInUp" data-wow-delay=".2s">
              <span>2024</span>
              <h4>Senior Designer</h4>
              <h6>Behance</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay=".4s">
              <span>2024</span>
              <h4>UX Design case study</h4>
              <h6>Behance</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay=".6s">
              <span>2024</span>
              <h4>Product Designer v/s Product Manage</h4>
              <h6>Product Hunt</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay=".8s">
              <span>2024</span>
              <h4>Xiomi in Product Design (UI/UX)</h4>
              <h6>Pinterest</h6>
            </div>
          </div>
          <div className="client-wrapper">
            <div className="client-items">
              <div className="client-item">
                <div className="icon">
                  <img src="/assets/img/client/1.svg" alt="img" />
                </div>
                <h4 className="number"><span className="count">98</span>% <span className="text">Figma</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <img src="/assets/img/client/2.svg" alt="img" />
                </div>
                <h4 className="number"><span className="count">90</span>% <span className="text">Photoshop</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <img src="/assets/img/client/3.svg" alt="img" />
                </div>
                <h4 className="number"><span className="count">79</span>% <span className="text">Illustrator</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <img src="/assets/img/client/4.svg" alt="img" />
                </div>
                <h4 className="number"><span className="count">88</span>% <span className="text">Sketch</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <img src="/assets/img/client/5.svg" alt="img" />
                </div>
                <h4 className="number"><span className="count">93</span>% <span className="text">Adobe_Xd</span></h4>
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

      {/* News/Blog Section Start */}
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
                        <img src="/assets/img/testimonials/4.jpg" alt="img" />
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
                        <img src="/assets/img/testimonials/3.jpg" alt="img" />
                      </div>
                      <div className="text">
                        <h4>Marvin McKinney</h4>
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
                        <img src="/assets/img/testimonials/4.jpg" alt="img" />
                      </div>
                      <div className="text">
                        <h4>Jaden Smith</h4>
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
      <Footer variant="footer-1" />
    </>
  );
}
