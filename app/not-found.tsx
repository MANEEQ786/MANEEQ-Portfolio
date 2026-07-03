import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
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
              <h2>Error</h2>
              <ul className="breadcrumb-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li><i className="fa-solid fa-angle-right"></i></li>
                <li className="active">Error</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Error Section Start */}
      <section className="error-section section-padding">
        <div className="container">
          <div className="error-wrapper">
            <div className="error">
              <h2>404</h2>
            </div>
            <div className="error-content">
              <h2><span>Oops!</span> Page Not Found</h2>
              <p>Sorry, the page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. <br /> Let&rsquo;s get you back
                explore
                our Latest Posts</p>
            </div>
            <div className="error-btn">
              <Link href="/" className="theme-btn">Back To Home <i className="fa-solid fa-arrow-right"></i></Link>
              <Link href="/contact" className="theme-btn style-2">Contact Me <i
                className="fa-solid fa-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="footer-1" />
    </>
  );
}
