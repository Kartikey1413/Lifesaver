import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserPlus,FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
// import BASE_URL from "../utils/config";
import SearchBar from "../shared/SearchBar";

const Home = () => {
  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="row bg-danger text-white text-center py-5">
        <div className="col">
          <h1>Donate Blood. Save Lives.</h1>
          <p>Find blood donors near you or register as a donor to help those in need.</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="row my-5">
        <div className="col">
          <SearchBar />
        </div>
      </div>

      {/* Services Section */}
      {/* <div className="row my-5">
        <div className="col">
          <h2>Our Services</h2>
          <p>
            We provide a platform to connect blood donors with those in need. Our services include:
          </p>
          <ul>
            <li>Blood donation drives</li>
            <li>Emergency blood donor matching</li>
            <li>Awareness campaigns</li>
          </ul>
        </div>
      </div> */}
      
      <div className="row bg-danger text-white text-center py-5">
        <div className="col">
          <h2 className="fw-bold">Ready to Save a Life?</h2>
        <p className="mb-4">Join our community of blood donors and make a difference in someone's life today.</p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/register" className="btn btn-light btn-rd fw-bold px-4 py-2">
            <FaUserPlus className="me-2" /> Register as Donor
          </Link>
          <Link to="/about" className="btn btn-dark btn-rd text-white fw-bold px-4 py-2">
            <FaQuestionCircle className="me-2" /> Learn More
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;