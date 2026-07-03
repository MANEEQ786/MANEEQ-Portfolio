import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShowReel from "@/components/sections/home/ShowReel";
import StrategyCallButton from "@/components/sections/home/StrategyCallButton";
import TwitterFeed from "@/components/sections/home/TwitterFeed";
import LinkedInFeed from "@/components/sections/home/LinkedInFeed";
import UpworkCard from "@/components/sections/home/UpworkCard";
import GitHubCard from "@/components/sections/home/GitHubCard";
import LatestBlogs from "@/components/sections/home/LatestBlogs";
import ServiceDrawer, { ServiceTrigger } from "@/components/sections/home/ServiceDetails";
import ContactForm from "@/components/sections/contact/ContactForm";
import BookDemoWrapper from "@/components/sections/contact/BookDemoWrapper";
import { readSnapshot } from "@/lib/snapshots";
import { getBlogEntries } from "@/lib/blog";

// Re-read the data/*.json snapshots periodically so the feeds reflect the
// latest scheduled refresh (the cron job updates them every 48h). No Apify call
// happens here — the page only reads local JSON, so visitors cost nothing.
export const revalidate = 1800; // 30 min

// Brand logos shown in the scrolling marquee band (white logos on the dark
// #1e1e1e marquee background). Paths are URL-encoded because the files contain
// spaces. Format/exact duplicates were left out.
const brandLogos = [
  "/Logos/45.png",
  "/Logos/Artboard%2036%20copy%202.png",
  "/Logos/Artboard%2036%20copy%203.png",
  "/Logos/PNGSS%20(3).png",
  "/Logos/artsy%20n%20logo%20copy%208.webp",
  "/Logos/logo%20copy%2011.png",
  "/Logos/logo%20copy%2012.webp",
];

export default async function HomePage() {
  // Read the four feed snapshots from /data (written by the 48h cron job).
  const [twitter, linkedin, github, upwork] = await Promise.all([
    readSnapshot("twitter-posts.json"),
    readSnapshot("linkedin-posts.json"),
    readSnapshot("github-profile.json"),
    readSnapshot("upwork-profile.json"),
  ]);
  // Real newsletter editions for the "Latest Blog" section (client component
  // shows the first 3 and reveals the rest in place on demand).
  const latestBlogs = await getBlogEntries();
  return (
    <>
      <Header variant="default" />

      {/* Hero Section Start */}
      <section id="hero" className="hero-section hero-1 bg-cover fix" style={{ backgroundImage: "url(/assets/img/hero/bg.jpg)" }}>
        <div className="random-shape float-bob-x">
          <img src="/assets/img/shape/random-shape.png" alt="img" />
        </div>
        <div className="arrow-shape float-bob-y">
          <img src="/assets/img/hero/angle-arrow.png" alt="img" />
        </div>
        <div className="star-shape float-bob-y">
          <img src="/assets/img/shape/star.png" alt="img" />
        </div>
        <div className="hero-info">
          <a href="https://www.upwork.com/freelancers/smasoodpk" target="_blank" rel="noopener noreferrer" className="active">Upwork</a>
          <a href="https://www.linkedin.com/in/smasoodpk/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://twitter.com/isaqibmasood" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://github.com/msmasood" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="hero-images">
                <img src="/Sir/hero-portrait.png?v=3" alt="img" style={{ width: "100%", maxWidth: "555px", aspectRatio: "555 / 745", objectFit: "cover", transform: "translateX(2mm)" }} />
                <div className="hero-shape">
                  <img src="/assets/img/shape/bg-shape.png" alt="img" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="hero-content">
                <span><img src="/assets/img/shape/star-2.png" alt="img" />Hey There!</span>
                <h1 style={{ maxWidth: "100%" }}><span style={{ whiteSpace: "nowrap", fontSize: "clamp(26px, 4.2vw, 64px)" }}>I&apos;m <span className="hero-name" style={{ color: "#3CB371", fontWeight: "900", fontFamily: "inherit", WebkitTextStroke: "1.5px #3CB371", fontSize: "1em", letterSpacing: "1px", whiteSpace: "nowrap" }}>SAQIB MASOOD</span></span> <br /> <strong className="type-text" style={{ whiteSpace: "normal", overflowWrap: "break-word", wordBreak: "break-word" }}></strong></h1>
                <p style={{ fontWeight: "400", fontSize: "clamp(15px, 2.2vw, 21px)" }}>Leading VisionTact with AI-powered products in HR recruitments,voice agents,CRM and business intelligence helping companies move manual workflow to intelligent operations.</p>
                <div className="hero-btn-wrapper">
                  <StrategyCallButton />
                  <ShowReel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section Start */}
      <section className="marquee-section section-bg-2 fix">
        <div className="marquee-container">
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {brandLogos.map((logo, i) => (
                <div className="marquee-text" key={`a-${i}`}>
                  <img src={logo} alt="brand logo" style={{ height: "45px", width: "auto" }} />
                </div>
              ))}
            </div>

            {/* duplicate content for seamless scroll */}
            <div className="marquee-content">
              {brandLogos.map((logo, i) => (
                <div className="marquee-text" key={`b-${i}`}>
                  <img src={logo} alt="brand logo" style={{ height: "45px", width: "auto" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section Start */}
      <section id="about" className="about-section fix section-padding pb-0" style={{ scrollMarginTop: "100px" }}>
        <div className="container">
          <div className="about-wrapper-1 pt-0">
            <div className="random-shape float-bob-x">
              <img src="/assets/img/shape/random-shape.png" alt="img" />
            </div>
            <div className="star-shape float-bob-y">
              <img src="/assets/img/shape/star.png" alt="shape" />
            </div>
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <div className="about-content">
                  <div className="section-title">
                    <span className="wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />About
                      Me</span>
                    <h2 className="wow fadeInUp" data-wow-delay=".2s">Creating Impact Through <br /> <span>AI &amp;
                      Data Innovation</span></h2>
                    <p className="wow fadeInUp" data-wow-delay=".3s" style={{ fontWeight: "400", fontSize: "18px" }}>My work sits at the intersection of strategy, product architecture and execution. I help businesses turn complex processes into intelligent systems combining Generative AI, Agentic AI, RAG, automation, analytics and scalable SaaS platforms to create measurable business value.</p>
                  </div>
                  <div className="client-reviews mt-4 mt-md-0">
                    <div className="cr-item wow fadeInUp" data-wow-delay=".4s">
                      <h2><span className="count">20</span>+</h2>
                      <h6>Years <br />
                        experience...
                      </h6>
                    </div>
                    <div className="cr-item wow fadeInUp" data-wow-delay=".5s">
                      <h2><span className="count">16</span>+</h2>
                      <h6>AI<br />
                        Products
                      </h6>
                    </div>
                  </div>
                  <div className="about-button">
                    <a href="#contact" className="theme-btn wow fadeInUp" data-wow-delay=".6s">Contact Me <i
                      className="fa-solid fa-arrow-right"></i></a>
                    <div className="phone wow fadeInUp" data-wow-delay=".7s">
                      <div className="icon">
                        <img src="/assets/img/icon/phone.svg" alt="img" />
                      </div>
                      <div className="text">
                        <span>Phone</span>
                        <h6>+971 56 3048781</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-center">
                <div className="about-images">
                  <img className="wow img-custom-anim-right" data-wow-delay=".3s" src="/Sir/person_true_transparent.png"
                    alt="img" style={{ width: "100%", maxWidth: "592px", aspectRatio: "592 / 630", objectFit: "cover", objectPosition: "top" }} />
                  <div className="bg-shape wow img-custom-anim-top">
                    <img src="/assets/img/shape/bg-shape-2.png" alt="img" />
                  </div>
                  <div className="shape-left float-bob-x">
                    <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 20px 45px rgba(0,0,0,0.10)", padding: "16px 22px", display: "flex", alignItems: "center", gap: "14px", maxWidth: "300px" }}>
                      <span style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg,#2bd576,#16a34a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <img src="/assets/img/shape/star-2.png" alt="" style={{ width: "24px", height: "24px", filter: "brightness(0) invert(1)" }} />
                      </span>
                      <span style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>Founder-Led Execution<br />Strategy &middot; Architecture</span>
                    </div>
                  </div>
                  <div className="shape-right float-bob-y">
                    <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 20px 45px rgba(0,0,0,0.10)", padding: "18px 24px", display: "flex", alignItems: "center", gap: "14px", minWidth: "230px" }}>
                      <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                        <img src="/Sir/Artboard%2036.jpg" alt="product" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }} />
                        <img src="/Sir/logo%20copy%204-100.jpg" alt="product" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", marginLeft: "-14px" }} />
                        <img src="/Sir/voicetact%20(4).jpg" alt="product" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", marginLeft: "-14px" }} />
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", lineHeight: 1.25 }}>AI Product<br />Ecosystem</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero responsive ── */
        .hero-name {
          font-size: inherit;
        }
        #hero .hero-content h1 {
          line-height: 1.1;
        }
        /* On tablet (col stacks at lg breakpoint) */
        @media (max-width: 991px) {
          #hero.hero-1 { padding-top: 100px; padding-bottom: 48px; }
          #hero .hero-content { text-align: center; }
          #hero .hero-content span { justify-content: center; display: inline-flex; align-items: center; }
          #hero .hero-content .hero-btn-wrapper { justify-content: center; }
        }
        /* Mobile */
        @media (max-width: 767px) {
          #hero.hero-1 { padding-top: 88px; padding-bottom: 0 !important; }
          #hero .hero-images { overflow: hidden; display: flex; justify-content: center; margin-bottom: 0; }
          #hero .hero-images img { width: 100% !important; max-width: 100% !important; max-height: none !important; display: block; }
          #hero .row { margin-bottom: 0 !important; }
          #hero .col-lg-6:last-child { padding-bottom: 0; margin-bottom: 0; }
        }
        /* Small mobile */
        @media (max-width: 575px) {
          #hero.hero-1 { padding-top: 80px; padding-bottom: 0 !important; }
        }
        /* Very small (iPhone SE etc.) */
        @media (max-width: 390px) {
          #hero.hero-1 { padding-top: 72px; }
        }

        /* Footer contact col — negative offset only on md+ so phone is visible on mobile */
        @media (min-width: 768px) {
          .footer-contact-col { margin-left: -300px; }
        }

        .link-btn .venture-name {
          opacity: 0;
          max-width: 0;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          vertical-align: middle;
          margin-left: 0;
          font-size: 14px;
          font-weight: 600;
          color: #3CB371;
          transition: opacity 0.3s ease, max-width 0.3s ease, margin-left 0.3s ease;
        }
        .link-btn:hover .venture-name {
          opacity: 1;
          max-width: 200px;
          margin-left: 10px;
        }
        .experience-items span {
          font-weight: 900 !important;
          color: #ffffff !important;
          font-size: 1.2em !important;
        }
        .cr-item h2 {
          font-size: 3rem !important;
          font-weight: 900 !important;
          color: #000000 !important;
        }
        .cr-item p {
          font-size: 1rem !important;
          font-weight: 700 !important;
          color: #000000 !important;
        }
      `}</style>

      {/* Service Section Start */}
      <section id="services" className="service-section service-1 section-padding section-bg-2 fix" style={{ scrollMarginTop: "100px" }}>
        <div className="random-shape float-bob-y">
          <img src="/assets/img/shape/random-shape.png" alt="img" />
        </div>
        <div className="container">
          <div className="section-title text-center">
            <span className="wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />My Ventures</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">Building AI Companies, <span>SaaS Products</span> &amp; Digital Ventures</h2>
            <p className="wow fadeInUp" data-wow-delay=".3s" style={{ color: "#ffffff", maxWidth: "720px", margin: "0 auto" }}>I&rsquo;m not only advising on AI transformation  I&rsquo;m actively building companies, platforms and product ecosystems across AI SaaS, business marketplaces, software services and healthcare operations.</p>
          </div>
          <div className="service-wrapper">
            <div className="services-item wow fadeInUp" data-wow-delay=".2s">
              <div className="head">
                <span>01</span>
                <h4><ServiceTrigger id="mvp"><span style={{ whiteSpace: "nowrap", fontFamily: "Manrope, sans-serif", fontWeight: "inherit" }}>AI Product Company</span> </ServiceTrigger></h4>
              </div>
              <div className="text" style={{ flex: 1, paddingLeft: "24px", paddingRight: "24px" }}>
                <p style={{ textAlign: "center" }}>VisionTact is my AI-first product company focused on building enterprise AI SaaS platforms, agentic AI systems, voice automation, recruitment intelligence products</p>
              </div>
              <div className="link-btn" style={{ left: 0 }}>
                <i className="fa-solid fa-arrow-right"></i>
                <a href="https://visiontact.com/" target="_blank" rel="noopener noreferrer" className="venture-name">VisionTact</a>
              </div>
            </div>
            <div className="services-item wow fadeInUp" data-wow-delay=".4s">
              <div className="head">
                <span>02</span>
                <h4><ServiceTrigger id="saas"><span style={{ whiteSpace: "nowrap", fontFamily: "Manrope, sans-serif", fontWeight: "inherit" }}>AI Marketplace</span></ServiceTrigger></h4>
              </div>
              <div className="text" style={{ flex: 1, paddingLeft: "24px", paddingRight: "24px" }}>
                <p style={{ textAlign: "center" }}>ChaltaKarobar is AI-enabled business discovery,marketplace platform designed to help entrepreneurs,assess,buy,sell and grow businesses with better intelligence.</p>
              </div>
              <div className="link-btn" style={{ left: 0 }}>
                <i className="fa-solid fa-arrow-right"></i>
                <a href="https://chaltakarobar.com/" target="_blank" rel="noopener noreferrer" className="venture-name">ChaltaKarobar</a>
              </div>
            </div>
            <div className="services-item wow fadeInUp" data-wow-delay=".6s">
              <div className="head">
                <span>03</span>
                <h4><ServiceTrigger id="hr"><span style={{ fontFamily: "Manrope, sans-serif", fontWeight: "inherit" }}>AI Executive Circle</span></ServiceTrigger></h4>
              </div>
              <div className="text" style={{ flex: 1, paddingLeft: "24px", paddingRight: "24px" }}>
                <p style={{ textAlign: "center" }}>AI Summit Pakistan connects innovation, policy, and industry to strengthen Pakistan's role in the global AI economy.</p>
              </div>
              <div className="link-btn" style={{ left: 0 }}>
                <i className="fa-solid fa-arrow-right"></i>
                <a href="https://aisummit.pk/" target="_blank" rel="noopener noreferrer" className="venture-name">AI Summit Pakistan</a>
              </div>
            </div>
            <div className="services-item mb-0 wow fadeInUp" data-wow-delay=".8s">
              <div className="head">
                <span>04</span>
              <h4><ServiceTrigger id="hr"><span style={{ fontFamily: "Manrope, sans-serif", fontWeight: "inherit" }}>Medical & Billing</span></ServiceTrigger></h4>
              </div>
              <div className="text" style={{ flex: 1, paddingLeft: "24px", paddingRight: "24px" }}>
                <p style={{ textAlign: "center" }}>Betta Medical Billing company serving hospitals, urgent care centers, emergency rooms and private practices with billing, coding, credentialing and operational support.</p>
              </div>
              <div className="link-btn" style={{ left: 0 }}>
                <i className="fa-solid fa-arrow-right"></i>
                <a href="https://bettamedicalbilling.com/" target="_blank" rel="noopener noreferrer" className="venture-name">Betta Medical Billing</a>
              </div>
            </div>
          </div>
        </div>
        <ServiceDrawer />
      </section>

      {/* ===== About page content copied onto Home 1 (beneath the service section) ===== */}
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
                        alt="img" />My Story</span>
                    <h2 className="wow fadeInUp" data-wow-delay=".2s">My Story and Expertise</h2>
                    <p className="wow fadeInUp" data-wow-delay=".3s" style={{ fontWeight: "400", fontSize: "18px" }}>My journey has moved from enterprise data engineering to national-scale digital transformation, AI-driven geospatial intelligence and product company building. I now focus on creating AI SaaS platforms that combine deep technical architecture with practical business execution products that are not only innovative, but usable, scalable and commercially meaningful.</p>
                  </div>
                  <div className="client-reviews">
                    <div className="cr-item wow fadeInUp" data-wow-delay=".3s">
                      <h2><span className="count">20</span>+</h2>
                      <p>Years in Technology</p>
                    </div>
                    <div className="cr-item wow fadeInUp" data-wow-delay=".6s">
                      <h2><span className="count">5</span>+</h2>
                      <p>Core Business Domains</p>
                    </div>
                    <div className="cr-item wow fadeInUp" data-wow-delay=".9s">
                      <h2><span className="count">16</span>+</h2>
                      <p>AI Products</p>
                    </div>
                  </div>
                  <div className="about-button">
                    <a href="#contact" className="theme-btn wow fadeInUp" data-wow-delay=".3s">Contact Me
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
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
            <h2 className="wow fadeInUp" data-wow-delay=".2s">Founder Journey & Executive Experience</h2>
          </div>
          <div className="experience-wrapper">
            <div className="experience-items wow fadeInUp" data-wow-delay=".2s">
              <span>2023 – Present</span>
              <h4 style={{ paddingLeft: "15px" }}>Founder & AI Product Owner</h4>
              <h6>VisionTact</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay=".4s">
              <span>2022 - present</span>
              <h4 style={{ paddingLeft: "0px", marginLeft: "-110px" }}>Founder &amp; Visionary | AI Marketplace Product Owner</h4>
              <h6>ChaltaKarobar</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay=".6s">
              <span>2022 - 2025</span>
              <h4 style={{ paddingLeft: "0px", marginLeft: "16px" }}>Geospatial AI &amp; Data Consultant</h4>
              <h6>FAO — United Nations</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay=".8s">
              <span style={{ marginLeft: "-160px", position: "relative", left: "160px" }}>2011 - 2022</span>
              <h4>Digital Transformation &amp; Public Sector Technology Leader</h4>
              <h6>Government of Pakistan</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay="1s">
              <span>2007 &ndash; 2011</span>
              <h4 style={{ marginLeft: "100px" }}>Founder &amp; Director</h4>
              <h6>SaqTech Solutions</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay="1.2s">
              <span>2005 &ndash; 2006</span>
              <h4>Enterprise Data &amp; ETL Developer</h4>
              <h6>IBM</h6>
            </div>
          </div>
          <div className="client-wrapper">
            <div className="client-items">
              <div className="client-item">
                <div className="icon">
                  <i className="fa-solid fa-bullseye" style={{ fontSize: "40px", color: "#A259FF" }}></i>
                </div>
                <h4 className="number"><span className="count">95</span>% <span className="text">AI Strategy</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: "40px", color: "#31A8FF" }}></i>
                </div>
                <h4 className="number"><span className="count">93</span>% <span className="text">Generative AI</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <i className="fa-solid fa-robot" style={{ fontSize: "40px", color: "#FF9A00" }}></i>
                </div>
                <h4 className="number"><span className="count">91</span>% <span className="text">AI Agents</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <i className="fa-solid fa-cloud" style={{ fontSize: "40px", color: "#FDB300" }}></i>
                </div>
                <h4 className="number"><span className="count">90</span>% <span className="text">AI SaaS</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <i className="fa-solid fa-microphone-lines" style={{ fontSize: "40px", color: "#FF61F6" }}></i>
                </div>
                <h4 className="number"><span className="count">89</span>% <span className="text">Voice AI</span></h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section — hidden on home 1 (commented out via false &&) */}
      {false && (
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
                      <h4>Rising Talent — Upwork</h4>
                      <span>Verified Profile · 2025</span>
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
                      <h4>Generative AI Certified — Microsoft &amp; AWS</h4>
                      <span>Sep 2025</span>
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
                      <h4>IBM Machine Learning &amp; Deep Learning</h4>
                      <span>Sep 2025</span>
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
                      <h4>Global AI Show — Featured Speaker</h4>
                      <span>Riyadh &amp; Abu Dhabi · 2025–26</span>
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
      )}

      {/* Testimonials Section 2 — hidden on home 1 (commented out via false &&) */}
      {false && (
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
      )}
      {/* ===== End copied About page content ===== */}

      {/* Project Section Start */}
      <section id="portfolio" className="project-section section-padding fix" style={{ scrollMarginTop: "100px", paddingBottom: "120px" }}>
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <span className="wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />Portfolio</span>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">My Featured AI Product <span>Portfolio</span></h2>
              <p className="wow fadeInUp" data-wow-delay=".3s" style={{ borderLeft: "none", paddingLeft: "30px", marginTop: "20px", textIndent: "40px", color: "#000000" }}>A selection of AI SaaS platforms, automation systems and product ventures built or led under VisionTact and related initiatives spanning recruitment, voice agents, HR, operations, legal intake, fleet management, education, CRM, business marketplaces and enterprise intelligence.</p>
            </div>
            <a href="https://visiontact.com/portfolio/" target="_blank" rel="noopener noreferrer" className="theme-btn wow fadeInUp" data-wow-delay=".4s" style={{ alignSelf: "flex-start", marginTop: "35px", paddingLeft: "45px", paddingRight: "45px", whiteSpace: "nowrap", flexShrink: 0 }}>
              View All Project
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div className="project-wrapper">
            <div className="row g-4">
              <div className="col-xl-7 col-lg-6 col-md-6">
                <div className="project-items wow img-custom-anim-top" data-wow-delay=".3s" style={{ position: "relative" }}>
                  <span className="portfolio-badge" style={{ position: "absolute", bottom: "calc(70px + 2mm)", right: "16px", zIndex: 2, fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", padding: "6px 14px", borderRadius: "100px" }}>#AI Recruitment SaaS</span>
                  <div className="image" style={{ height: "auto" }}>
                    <img src="/Sir/Artboard%201%20copy%208.jpg" alt="img" style={{ width: "100%", height: "auto", display: "block", background: "#fff" }} />
                  </div>
                  <div className="content">
                    <div className="text">
                      <h4><a href="https://talentsage.io/" target="_blank" rel="noopener noreferrer">TalentSage</a></h4>
                      <p style={{ margin: "6px 0 0", fontSize: "13.5px", lineHeight: 1.5, color: "#666" }}>An AI-powered recruitment platform that brings ATS, CRM, resume parsing, candidate matching, assessments, AI interviews, onboarding and human-approved hiring decisions into one intelligent workflow.</p>
                    </div>
                    <div className="icon">
                      <a href="https://talentsage.io/" target="_blank" rel="noopener noreferrer"> <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-6">
                <div className="project-items wow img-custom-anim-top" data-wow-delay=".6s" style={{ position: "relative" }}>
                  <span className="portfolio-badge" style={{ position: "absolute", bottom: "calc(70px + 5mm)", right: "16px", zIndex: 2, fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", padding: "6px 14px", borderRadius: "100px" }}>#AI Voice Agent Platform</span>
                  <div className="image" style={{ height: "auto" }}>
                    <img src="/Sir/Artboard%201%20copy%2010.jpg" alt="img" style={{ width: "100%", height: "auto", display: "block", background: "#fff" }} />
                  </div>
                  <div className="content">
                    <div className="text">
                      <h4><a href="https://www.voicetact.com/" target="_blank" rel="noopener noreferrer">VoiceTact</a></h4>
                      <p style={{ margin: "6px 0 0", fontSize: "13.5px", lineHeight: 1.5, color: "#666" }}>A multilingual voice AI product suite for appointment booking, customer support, lead qualification, follow-ups and industry-specific call automation across healthcare, real estate, legal, automotive and service businesses.</p>
                    </div>
                    <div className="icon">
                      <a href="https://www.voicetact.com/" target="_blank" rel="noopener noreferrer"> <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="project-items wow img-custom-anim-top" data-wow-delay=".9s" style={{ position: "relative" }}>
                  <span className="portfolio-badge" style={{ position: "absolute", bottom: "calc(70px + 2mm)", right: "16px", zIndex: 2, fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", padding: "6px 14px", borderRadius: "100px" }}>#AI operations os</span>
                  <div className="image">
                    <img src="/Sir/Artboard%201%20copy%206.jpg" alt="img" style={{ objectFit: "contain", background: "#fff" }} />
                  </div>
                  <div className="content">
                    <div className="text">
                      <h4><a href="https://opsstak.com/" target="_blank" rel="noopener noreferrer">OpsStak</a></h4>
                      <p style={{ margin: "6px 0 0", fontSize: "13.5px", lineHeight: 1.5, color: "#666" }}>An operational intelligence platform that replaces spreadsheets and disconnected tools with structured workflows, SOP digitization, task accountability, real-time dashboards and daily execution visibility.</p>
                    </div>
                    <div className="icon">
                      <a href="https://opsstak.com/" target="_blank" rel="noopener noreferrer"> <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="project-items wow img-custom-anim-top" data-wow-delay="1.2s" style={{ position: "relative" }}>
                  <span className="portfolio-badge" style={{ position: "absolute", bottom: "calc(70px + 2mm)", right: "16px", zIndex: 2, fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", padding: "6px 14px", borderRadius: "100px" }}>#AI hrms platform</span>
                  <div className="image">
                    <img src="/Sir/Artboard%201%20copy%207.jpg" alt="img" style={{ objectFit: "contain", background: "#fff" }} />
                  </div>
                  <div className="content">
                    <div className="text">
                      <h4><a href="https://www.peoplesage.com/" target="_blank" rel="noopener noreferrer">PeopleSage</a></h4>
                      <p style={{ margin: "6px 0 0", fontSize: "13.5px", lineHeight: 1.5, color: "#666" }}>A modern HR management platform designed to help organizations manage people, attendance, documents, performance, payroll-ready workflows and employee operations through a cleaner digital system.</p>
                    </div>
                    <div className="icon">
                      <a href="https://www.peoplesage.com/" target="_blank" rel="noopener noreferrer"> <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="project-items wow img-custom-anim-top" data-wow-delay="1.5s" style={{ position: "relative" }}>
                  <span className="portfolio-badge" style={{ position: "absolute", bottom: "calc(70px + 2mm)", right: "16px", zIndex: 2, fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", padding: "6px 14px", borderRadius: "100px" }}>#Arabic AI App Builder</span>
                  <div className="image">
                    <img src="/Sir/Artboard%201%20copy%209.jpg" alt="img" style={{ objectFit: "contain", background: "#fff" }} />
                  </div>
                  <div className="content">
                    <div className="text">
                      <h4><a href="#" target="_blank" rel="noopener noreferrer">Bannaa</a></h4>
                      <p style={{ margin: "6px 0 0", fontSize: "13.5px", lineHeight: 1.5, color: "#666" }}>An Arabic-first AI app builder concept inspired by modern no-code and agentic development platforms, designed to help founders and teams create software products faster for regional markets.</p>
                    </div>
                    <div className="icon">
                      <a href="http://banna.visiontact.com/" target="_blank" rel="noopener noreferrer"> <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="project-items wow img-custom-anim-top" data-wow-delay="1.8s" style={{ position: "relative" }}>
                  <span className="portfolio-badge" style={{ position: "absolute", bottom: "calc(70px + 2mm)", right: "16px", zIndex: 2, fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", padding: "6px 14px", borderRadius: "100px" }}>#AI Fleet Management SaaS</span>
                  <div className="image">
                    <img src="/Sir/Artboard%201%20copy%2011.jpg" alt="img" style={{ objectFit: "contain", background: "#fff" }} />
                  </div>
                  <div className="content">
                    <div className="text">
                      <h4><a href="https://fleetora.visiontact.com/" target="_blank" rel="noopener noreferrer">Fleetora</a></h4>
                      <p style={{ margin: "6px 0 0", fontSize: "13.5px", lineHeight: 1.5, color: "#666" }}>A smart fleet management platform for GCC car rental and vehicle operations, bringing vehicles, drivers, trips, maintenance, bookings, reporting and operational intelligence into one connected dashboard.</p>
                    </div>
                    <div className="icon">
                      <a href="https://fleetora.visiontact.com/" target="_blank" rel="noopener noreferrer"> <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section — duplicate hidden on home 1 (commented out via false &&) */}
      {false && (
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
              <span>2023 – Present</span>
              <h4 style={{ paddingLeft: "15px" }}>IT Manager ,  Digital Transformation</h4>
              <h6>VisionTact</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay=".4s">
              <span>2022 - present</span>
              <h4 style={{ paddingLeft: "0px", marginLeft: "-110px" }}>Founder &amp; Visionary | AI Marketplace Product Owner</h4>
              <h6>ChaltaKarobar</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay=".6s">
              <span>2022 - 2025</span>
              <h4 style={{ paddingLeft: "0px", marginLeft: "16px" }}>Geospatial AI &amp; Data Consultant</h4>
              <h6>FAO — United Nations</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay=".8s">
              <span style={{ marginLeft: "-160px", position: "relative", left: "160px" }}>2011 - 2022</span>
              <h4>Digital Transformation &amp; Public Sector Technology Leader</h4>
              <h6>Government of Pakistan</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay="1s">
              <span>2007 &ndash; 2011</span>
              <h4 style={{ marginLeft: "100px" }}>Founder &amp; Director</h4>
              <h6>SaqTech Solutions</h6>
            </div>
            <div className="experience-items wow fadeInUp" data-wow-delay="1.2s">
              <span>2005 &ndash; 2006</span>
              <h4>Enterprise Data &amp; ETL Developer</h4>
              <h6>IBM</h6>
            </div>
          </div>
          <div className="client-wrapper">
            <div className="client-items">
              <div className="client-item">
                <div className="icon">
                  <i className="fa-solid fa-bullseye" style={{ fontSize: "40px", color: "#A259FF" }}></i>
                </div>
                <h4 className="number"><span className="count">95</span>% <span className="text">AI Strategy</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: "40px", color: "#31A8FF" }}></i>
                </div>
                <h4 className="number"><span className="count">93</span>% <span className="text">Generative AI</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <i className="fa-solid fa-robot" style={{ fontSize: "40px", color: "#FF9A00" }}></i>
                </div>
                <h4 className="number"><span className="count">91</span>% <span className="text">AI Agents</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <i className="fa-solid fa-cloud" style={{ fontSize: "40px", color: "#FDB300" }}></i>
                </div>
                <h4 className="number"><span className="count">90</span>% <span className="text">AI SaaS</span></h4>
              </div>
              <div className="client-item">
                <div className="icon">
                  <i className="fa-solid fa-microphone-lines" style={{ fontSize: "40px", color: "#FF61F6" }}></i>
                </div>
                <h4 className="number"><span className="count">89</span>% <span className="text">Voice AI</span></h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Awards Section — duplicate hidden on home 1 (commented out via false &&) */}
      {false && (
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
                      <h4>Rising Talent — Upwork</h4>
                      <span>Verified Profile · 2025</span>
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
                      <h4>Generative AI Certified — Microsoft &amp; AWS</h4>
                      <span>Sep 2025</span>
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
                      <h4>IBM Machine Learning &amp; Deep Learning</h4>
                      <span>Sep 2025</span>
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
                      <h4>Global AI Show — Featured Speaker</h4>
                      <span>Riyadh &amp; Abu Dhabi · 2025–26</span>
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
      )}

      {/* News Section Start */}
      <section id="blog" className="news-section news-1 section-padding section-bg fix" style={{ scrollMarginTop: "100px" }}>
        <div className="container">
          <div className="section-title text-center">
            <span className="wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />My Blog</span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">Latest Blog</h2>
          </div>
          <LatestBlogs entries={latestBlogs} />
        </div>
      </section>

      {/* Testimonials Section — hidden on home 1 (commented out via false &&) */}
      {false && (
      <section className="testimonials-section testimonials-1 section-padding section-bg-2 fix">
        <div className="random-shape float-bob-x">
          <img src="/assets/img/shape/random-shape.png" alt="img" />
        </div>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="section-title">
                <span className="wow fadeInUp"><img src="/assets/img/shape/star-2.png" alt="img" />Testimonials</span>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Our clients awesome Testimonials</h2>
              </div>
              <div className="reviews wow fadeInUp" data-wow-delay=".4s">
                <h2 className="count">4.8</h2>
                <div className="item">
                  <span>1200+ Clients Rating.</span>
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
            <div className="col-lg-6">
              <div className="testimonials-wrapper">
                <div className="swiper testimonial-slider">
                  <div className="swiper-wrapper">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div className="swiper-slide" key={i}>
                        <div className="testimonial-box-items">
                          <div className="client-info">
                            <img src="/assets/img/testimonials/1.png" alt="img" />
                            <div className="client-content">
                              <h5>Daniel Smith</h5>
                              <p>Senior engineer</p>
                            </div>
                          </div>
                          <div className="testi-content">
                            <div className="icon">
                              <img src="/assets/img/icon/42.svg" alt="img" />
                            </div>
                            <p>
                              This digital agency completely transformed our online presence. Their
                              expertise, creativity, and attention to detail exceeded all our
                              expectations. We highly recommend their outstanding services!
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="swiper-dot text-center">
                  <div className="dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Pricing Section Start */}
      <section className="pricing-section section-padding section-bg fix" style={{ paddingTop: 0, marginTop: "-40px" }}>
        <div className="container">
          <div className="section-title text-center">
            <span><img src="/assets/img/shape/star-2.png" alt="img" />My Platforms</span>
            <h2>Profiles &amp; <span>Platforms</span></h2>
          </div>
          <div className="price-wrapper">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <TwitterFeed data={twitter as never} />
              </div>
              <div className="col-lg-4 col-md-6">
                <UpworkCard data={upwork as never} />
              </div>
              <div className="col-lg-4 col-md-6">
                <LinkedInFeed data={linkedin as never} />
              </div>
            </div>
            <div className="row" style={{ marginTop: "24px" }}>
              <div className="col-12">
                <GitHubCard data={github as never} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Start */}
      <section id="contact" className="contact-from-section section-padding fix" style={{ paddingTop: "90px", scrollMarginTop: "100px" }}>
        <div className="container">
          <div className="section-title text-center" style={{ marginBottom: "40px" }}>
            <h2 className="wow fadeInUp" data-wow-delay=".2s"><img src="/assets/img/shape/star-2.png" alt="img" style={{ marginRight: "10px", verticalAlign: "middle" }} />Let&rsquo;s Build <span>the Next Intelligent</span> Business System</h2>
            <p className="wow fadeInUp" data-wow-delay=".3s" style={{ maxWidth: "800px", margin: "0 auto" }}>Whether you are planning an AI SaaS product, automating a business process, building an AI agent, launching a platform or exploring a strategic technology partnership, I bring the founder-level perspective needed to move from idea to execution.</p>
          </div>
          <div className="row g-4 align-items-start">
            <div className="col-12 col-lg-6">
              <BookDemoWrapper />
            </div>
            <div className="col-12 col-lg-6">
              <div className="contact-form-box" style={{ marginLeft: "20px" }}>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="footer-1" />
    </>
  );
}
