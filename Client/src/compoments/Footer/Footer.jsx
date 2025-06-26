import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/Images/logo2.png";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        {/* Logo & Description */}
        <div className="row mb-4">
          <div className="col-md-3">
            <Link to="/" className="navbar-brand d-flex align-items-center text-white text-decoration-none">
              <img src={Logo} alt="LifeSaver Logo" style={{ width: 40 }} className="me-2" />
              <h5 className="mb-0 fw-bold">LifeSaver</h5>
            </Link>
            <p className="mt-3">Connecting blood donors with those in need since 2025.</p>
            <div className="d-flex gap-3 fs-5">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/find-donors" className="text-white text-decoration-none">Find Donors</Link></li>
              <li><Link to="/eligibility" className="text-white text-decoration-none">Eligibility Criteria</Link></li>
              <li><Link to="/faqs" className="text-white text-decoration-none">FAQs</Link></li>
              <li><Link to="/stories" className="text-white text-decoration-none">Success Stories</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li><Link to="/guide" className="text-white text-decoration-none">Blood Donation Guide</Link></li>
              <li><Link to="/benefits" className="text-white text-decoration-none">Health Benefits</Link></li>
              <li><Link to="/myths" className="text-white text-decoration-none">Myths vs Facts</Link></li>
              <li><Link to="/research" className="text-white text-decoration-none">Research & Stats</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <ul className="list-unstyled">
              <li><FaMapMarkerAlt className="me-2" /> Moradabad, Uttar Pradesh </li>
              <li><FaPhoneAlt className="me-2" /> +91 9876543210</li>
              <li><FaEnvelope className="me-2" /> help@lifesaver.org</li>
              <li><FaClock className="me-2" /> 24/7 Emergency Support</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <hr className="border-light" />
        <div className="text-center">
          <p className="mb-0">&copy; {year} LifeSaver Blood Donation Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
