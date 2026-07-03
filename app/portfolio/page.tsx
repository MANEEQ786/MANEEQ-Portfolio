import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PortfolioPage() {
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
              <h2>Protifolio</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li><i className="fa-solid fa-angle-right"></i></li>
                <li className="active">Protifolio</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Project Section Start */}
      <section className="project-standard-section section-padding fix">
        <div className="container">
          <div className="project-standard-wrapper">
            <div className="row">
              <div className="col-xl-7 col-md-6">
                <div className="project-items-2 mt-0 wow fadeInUp" data-wow-delay=".2s">
                  <div className="images">
                    <img src="/assets/img/project/15.jpg" alt="img" />
                  </div>
                  <div className="content">
                    <div className="text">
                      <span>Foodie Delight</span>
                      <h4><Link href="/portfolio-details">Food delivery & restaurant app UI/UX design</Link>
                      </h4>
                    </div>
                    <div className="icon">
                      <Link href="/portfolio-details"> <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-md-6">
                <div className="project-items-2 mt-md-0 wow fadeInUp" data-wow-delay=".4s">
                  <div className="images">
                    <img src="/assets/img/project/16.jpg" alt="img" />
                  </div>
                  <div className="content">
                    <div className="text">
                      <span>App / Development</span>
                      <h4><Link href="/portfolio-details">App interface phone screen</Link></h4>
                    </div>
                    <div className="icon">
                      <Link href="/portfolio-details"> <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-md-6">
                <div className="project-items-2 wow fadeInUp" data-wow-delay=".6s">
                  <div className="images">
                    <img src="/assets/img/project/17.jpg" alt="img" />
                  </div>
                  <div className="content">
                    <div className="text">
                      <span>App / Development</span>
                      <h4><a href="">Mobile App for Task Management</a></h4>
                    </div>
                    <div className="icon">
                      <Link href="/portfolio-details"> <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-md-6">
                <div className="project-items-2 wow fadeInUp" data-wow-delay=".8s">
                  <div className="images">
                    <img src="/assets/img/project/18.jpg" alt="img" />
                  </div>
                  <div className="content">
                    <div className="text">
                      <span>Web Banner Design</span>
                      <h4><Link href="/portfolio-details">Gradient Business Strategy </Link></h4>
                    </div>
                    <div className="icon">
                      <Link href="/portfolio-details"> <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="project-items-2 wow fadeInUp" data-wow-delay="1s">
                  <div className="images">
                    <img src="/assets/img/project/19.jpg" alt="img" />
                  </div>
                  <div className="content">
                    <div className="text">
                      <span>App / Development</span>
                      <h4><Link href="/portfolio-details">Template Banking Mobile App</Link></h4>
                    </div>
                    <div className="icon">
                      <Link href="/portfolio-details"> <i className="fa-solid fa-arrow-right"></i></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="project-items-2 wow fadeInUp" data-wow-delay="1.2s">
                  <div className="images">
                    <img src="/assets/img/project/20.jpg" alt="img" />
                  </div>
                  <div className="content">
                    <div className="text">
                      <span>App / Development</span>
                      <h4><Link href="/portfolio-details">Mobile App for Task Management</Link></h4>
                    </div>
                    <div className="icon">
                      <Link href="/portfolio-details"> <i className="fa-solid fa-arrow-right"></i></Link>
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
