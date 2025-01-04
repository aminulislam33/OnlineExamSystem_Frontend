import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5>About AptiCrack</h5>
            <p>
              AptiCrack is an initiative by the Electrical Engineer's Society to help students
              sharpen their aptitude skills through weekly challenges and competitions.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contact
                </a>
                <a href="https://twitter.com/" className="text-light me-3">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="https://facebook.com/" className="text-light me-3">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://instagram.com/" className="text-light">
                  <i className="bi bi-instagram"></i>
                </a>

              </li>
              <li>
                <a href="/terms" className="text-light text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>
              <i className="bi bi-geo-alt-fill me-2"></i>
              Electrical Engineer's Society, IIEST Shibpur<br />
              Howrah, India  <br />
              Pin - 711103
            </p>
            <p>
              <i className="bi bi-envelope-fill me-2"></i>
              <a href="mailto:info@apticrack.com" className="text-light text-decoration-none">
                info@apticrack.com
              </a>
            </p>
            <p>
              <i className="bi bi-telephone-fill me-2"></i>
              +1-234-567-8900
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="row">
          <div className="col text-center mt-3">
            <p className="mb-0">&copy; 2024 Electrical Engineer's Society. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;