import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PortfolioDetailsPage() {
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
              <h2>Protifolio Details</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li><i className="fa-solid fa-angle-right"></i></li>
                <li className="active">Protifolio Details</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Project Section Start */}
      <section className="project-details-section section-padding fix">
        <div className="container">
          <div className="project-details-wrapper">
            <div className="row">
              <div className="col-12">
                <div className="project-details-images">
                  <img src="/assets/img/project/21.jpg" alt="img" />
                </div>
              </div>
            </div>
            <div className="row g-5">
              <div className="col-lg-8">
                <div className="project-details-content">
                  <span>Create a seamless and engaging food ordering experience</span>
                  <h2>Food Delivery &amp; Restaurant Website</h2>
                  <p className="mb-3">At [Your Restaurant Name], we believe food is more than just a meal—it’s an
                    experience.
                    Whether you’re craving comfort food or gourmet dishes, we serve up quality and flavor.
                    With a commitment to fresh ingredients and exceptional service, we aim to provide you
                    with an unforgettable dining experience, both at our restaurant and from the comfort of
                    your home.</p>
                  <h3 className="mt-2">Research &amp; User Insights</h3>
                  <ul className="list-item">
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                      <h6>User Research:</h6> Surveys, competitor analysis, and pain points
                    </li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                      <h6>Target Audience:</h6> Restaurant owners, foodies, busy professionals
                    </li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                      <h6>User Personas:</h6> Example personas with goals &amp; frustrations
                    </li>
                  </ul>
                  <p>
                    At [Your Restaurant Name], we believe food is more than just a meal—it’s an experience.
                    Whether you’re craving comfort food or gourmet dishes, we serve up quality and flavor.
                    With a commitment to fresh ingredients and exceptional service, we aim to provide you
                    with an unforgettable dining experience, both at our restaurant and from the comfort of
                    your home.
                  </p>
                  <h3 className="mt-4">Problem Statement</h3>
                  <ul className="list-item">
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" /> Challenges in existing
                      food delivery/restaurant websites</li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" /> Need for better user
                      experience, faster ordering, and modern UI</li>
                  </ul>
                  <h3>Final Outcome &amp; Impac:</h3>
                  <ul className="list-item">
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" />
                      <h6>Before vs. After UI Comparison:</h6> Showcasing improvements
                    </li>
                    <li><img src="/assets/img/icon/arrow-circle-right.svg" alt="icon" /> Need for better user
                      experience, faster ordering, and modern UI</li>
                  </ul>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="project-thumb">
                        <img src="/assets/img/project/22.jpg" alt="img" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="project-thumb">
                        <img src="/assets/img/project/23.jpg" alt="img" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4">We believe food is more than just a meal—it’s an experience. Whether you’re
                    craving
                    comfort food or gourmet dishes, we serve up quality and flavor. With a commitment to
                    fresh ingredients and exceptional service, we aim to provide </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="main-sidebar">
                  <div className="single-sidebar-widget">
                    <div className="wid-title">
                      <h3>Project Information</h3>
                    </div>
                    <div className="project-info">
                      <div className="item">
                        <h6>Project Name</h6>
                        <span>Foodie Delight</span>
                      </div>
                      <div className="item">
                        <h6>Client</h6>
                        <span>Tushar Raja</span>
                      </div>
                      <div className="item">
                        <h6>Technology</h6>
                        <span>Figma</span>
                      </div>
                      <div className="item">
                        <h6>Cost</h6>
                        <span>USD 1,50,499</span>
                      </div>
                      <div className="item">
                        <h6>Date</h6>
                        <span>25 February, 2025</span>
                      </div>
                    </div>
                    <div className="social">
                      <h6>Social: </h6>
                      <ul className="social-list">
                        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                      </ul>
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
        </div>
      </section>
      <Footer variant="footer-1" />
    </>
  );
}
