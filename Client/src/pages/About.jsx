import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Kartikey from "../assets/Images/kartikey.jpg";
import Amit from "../assets/Images/amit.jpg";
const About = () => {
  return (
    <div className="container my-5">
      <header className="text-center mb-4">
        <h2 className="display-4">About Us</h2>
      </header>
      <section className="mb-5">
        <p>
          LifeSaver is a platform dedicated to connecting blood donors with
          those in need. Our mission is to save lives by making blood donation
          simple, accessible, and impactful.
        </p>
        <p>
          We believe in the power of community and the importance of giving
          back. Through our platform, we aim to bridge the gap between donors
          and recipients, ensuring that no one has to wait for the life-saving
          gift of blood.
        </p>
        <p>
          Join us in our mission to make a difference and be a LifeSaver today!
        </p>
      </section>

      <div className="col-12 text-center mb-5">
        <h3 className="display-5">Our Team Members</h3>
        <div className="row">
          <section className="col-12 col-md-6 mx-auto mb-5">
            <Link
              to="https://www.linkedin.com/in/kartikey-sharma-431310215/"
              className="text-decoration-none text-dark"
            >
              <img
                src={Kartikey}
                alt="Frontend Developer"
                className="img-fluid rounded"
              />
              <h3 className="mt-3">Kartikey Sharma</h3>
            </Link>
            <p>
              Frontend Developer <br /> TCA2208021
            </p>
          </section>
          <section className="col-12 col-md-6 mx-auto mb-5">
            <img
              src={Amit}
              alt="Backend Developer"
              className="img-fluid rounded"
            />
            <Link to="" className="text-decoration-none text-dark">
              <h3 className="mt-3">Amit Yadav</h3>
            </Link>
            <p>
              Backend Developer <br /> TCA2208004
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
