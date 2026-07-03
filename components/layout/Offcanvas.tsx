// Offcanvas sidebar (mobile) — identical on every original page. The
// `.mobile-menu` div is populated by meanmenu (see main.js).
export default function Offcanvas() {
  return (
    <>
      {/* Offcanvas Area Start */}
      <div className="fix-area">
        <div className="offcanvas__info">
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-end align-items-center">
                <div className="offcanvas__close">
                  <button>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <p className="text d-none d-xl-block">
                Nullam dignissim, ante scelerisque the is euismod fermentum odio sem semper the is erat, a
                feugiat leo urna eget eros. Duis Aenean a imperdiet risus.
              </p>
              <div className="mobile-menu fix mb-3"></div>
              <div className="offcanvas__contact">
                <h4>Contact Info</h4>
                <ul>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-envelope"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="mailto:saqib.masood@visiontact.com"><span className="mailto:saqib.masood@visiontact.com">saqib.masood@visiontact.com</span></a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="far fa-phone"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="tel:+971563048781">+971 56 3048781</a>
                    </div>
                  </li>
                </ul>
                <div className="social-icon d-flex align-items-center">
                  <a href="https://www.linkedin.com/in/smasoodpk/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="https://twitter.com/isaqibmasood" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a>
                  <a href="https://github.com/msmasood" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=saqib.masood@visiontact.com" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-envelope"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas__overlay"></div>
    </>
  );
}
