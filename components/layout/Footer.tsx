import Link from "next/link";
import type { FooterVariant } from "@/types/navigation";

interface FooterProps {
  /** "footer-1" = home-1 + all inner pages, "footer-2" = home-2, "footer-3" = home-3 */
  variant?: FooterVariant;
}

function Footer1() {
  return (
    <footer className="footer-section footer-1 fix section-bg-2 fix">
      <div className="random-shape float-bob-y">
        <img src="/assets/img/shape/random-shape.png" alt="img" />
      </div>
      <div className="star-shape float-bob-x">
        <img src="/assets/img/shape/star.png" alt="img" />
      </div>
      <div className="container">
        <div className="footer-widget-wrapper">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-md-6">
                  <div className="single-footer-widget">
                    <div className="widget-head">
                      {/* <h4>Address</h4> */}
                    </div>
                    <div className="content">
                     
                    </div>
                  </div>
                </div>
                <div className="col-md-6 footer-contact-col" style={{ paddingLeft: "0" }}>
                  <div className="single-footer-widget">
                    <div className="widget-head">
                      <h4>Contact</h4>
                    </div>
                    <div className="content">
                      <a href="mailto:saqib.masood@visiontact.com">saqib.masood@visiontact.com</a> <br />
                      <a href="tel:+4733378901">+971 56 3048781</a>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="footer-social">
                    <h4>Social: </h4>
                    <ul className="socials-icon">
                      <li><a href="https://www.linkedin.com/in/smasoodpk/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></a></li>
                      <li><a href="https://twitter.com/isaqibmasood" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a></li>
                      <li><a href="https://github.com/msmasood" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a></li>
                      <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=saqib.masood@visiontact.com" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-envelope"></i></a></li>
                    </ul>
                  </div>
                  <p style={{ marginTop: "14px", fontSize: "13px", color: "#aaa", lineHeight: 1.6 }}>Founder of VisionTact · Building AI SaaS, Agentic AI, Voice AI &amp; Enterprise Intelligence Platforms</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row justify-content-between footer-right-margin">
                <div className="col-lg-5 col-md-6">
                  <div className="single-footer-widget">
                    <div className="widget-head">
                      <h4>Useful Links</h4>
                    </div>
                    <ul className="list-items">
                      <li><Link href="/#about">About Me</Link></li>
                      <li><Link href="/#services">My Ventures</Link></li>
                      <li><Link href="/#portfolio">Portfolio</Link></li>
                      <li><Link href="/#blog">Blog</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6">
                  <div className="single-footer-widget">
                    <div className="widget-head">
                      <h4>My Ventures</h4>
                    </div>
                    <ul className="list-items">
                      <li><a style={{ cursor: "default" }}>AI Product Company</a></li>
                      <li><a style={{ cursor: "default" }}>AI Marketplace</a></li>
                      <li><a style={{ cursor: "default" }}>AI Executive Circle</a></li>
                      <li><a style={{ cursor: "default" }}>Medical & Billing</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Footer2() {
  return (
    <footer className="footer-section footer-2 fix section-bg-2 fix">
      <div className="arrow-shape float-bob-x">
        <img src="/assets/img/shape/angle-arrow-3.png" alt="img" />
      </div>
      <div className="star-shape float-bob-y">
        <img src="/assets/img/shape/star-9.png" alt="img" />
      </div>
      <div className="container">
        <div className="footer-widget-wrapper">
          <div className="row">
            <div className="col-xl-5 col-md-6">
              <div className="single-footer-widget me-lg-5">
                <div className="widget-head">
                  <Link href="/"><img src="/assets/img/logo/logo-white.svg" alt="logo" /></Link>
                </div>
                <div className="footer-content">
                  <p>On the other hand, We denounce with righteous indigna-tion And Dislike men who are
                    beguiled and demoralized the Charms of Pleasure At vero eos et</p>
                </div>
                <div className="ph-items">
                  <div className="icon">
                    <img src="/assets/img/icon/phone-2.svg" alt="icon" />
                  </div>
                  <div className="ph-item">
                    <span>Call Now</span> <br />
                    <a href="tel:+770224440505">+971 56 3048781</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-6">
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h4>Quick Links</h4>
                </div>
                <ul className="list-items style-2">
                  <li><Link href="/service-details">Moblie App Design</Link></li>
                  <li><Link href="/service-details">Web Design</Link></li>
                  <li><Link href="/service-details">UI/UX Design</Link></li>
                  <li><Link href="/service-details">Visual Design</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-5 col-md-6">
              <div className="single-footer-widget">
                <div className="footer-address">
                  <span>Say Hello</span>
                  <h3><a href="mailto:xiomi.info@webmail.com">Xiomi.info@webmail.com</a></h3>

                  <div className="socials">
                    <h5>Social Icon:</h5>
                    <ul className="social-icon">
                      <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                      <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                      <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-wrapper style-2">
            <p>Copyright©<span>Xiomi</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Footer3() {
  return (
    <footer className="footer-section footer-3 fix section-bg-2 fix">
      <div className="container">
        <div className="footer-widget-wrapper style-2">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="single-footer-widget">
                <Link href="/"><img src="/assets/img/logo/logo-white.svg" alt="logo" /></Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="single-footer-widget">
                <ul className="menu-list">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/portfolio-details">Portfolio</Link></li>
                  <li><Link href="/news-details">Blog</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-wrapper">
            <p>
              Copyright©<span>Xiomi</span>
            </p>
            <ul className="social-icon">
              <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Footer({ variant = "footer-1" }: FooterProps) {
  if (variant === "footer-2") return <Footer2 />;
  if (variant === "footer-3") return <Footer3 />;
  return <Footer1 />;
}
