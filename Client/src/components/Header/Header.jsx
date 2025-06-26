import React, { useState, useRef, useEffect, useContext } from "react";
import Logo from "@/assets/images/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch, role } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/home");
    toast.info("Logged Out");
  };

  useEffect(() => {
    let lastScrollTop = window.pageYOffset;
    const header = headerRef.current;

    const handleWheel = (event) => {
      const currentScrollTop = window.pageYOffset;

      if (event.deltaY > 0) {
        // Scrolling down
        header.classList.add("hidden");
      } else {
        // Scrolling up
        header.classList.remove("hidden");
      }

      lastScrollTop = currentScrollTop;
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <header ref={headerRef} className="shadow-sm bg-light">
      <nav className="navbar navbar-expand-lg navbar-light container">
      
        <Link to="/" className="navbar-brand d-flex align-item-center logo">
          <img src={Logo} alt="LifeSaver Logo" className="logo-img me-2" />
          <div className="text-center">
            <h3 className="mb-0 text-black">LifeSaver</h3>
          </div>
        </Link>
      
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {role !== "admin" && (
              <>
                <li className="nav-item">
                  <Link to="/home" className="nav-link ">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/find-donors" className="nav-link ">
                    Find Donors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/eligibility" className="nav-link ">    
                    Eligibility
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link ">
                    About
                  </Link>
                </li>
                
              </>
            )}
            {role === "admin" && (
              <li className="nav-item align-items-center">
                <Link to="/all-donors" className="nav-link ">
                  Donors
                </Link>
              </li>
            )}
            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    to={role === "donor" && "/my-account"}
                    className="nav-link fw-bold blue"
                  >
                    {user.username}
                  </Link>
                </li>
                <li className="nav-item ">
                  <button
                    onClick={handleLogout}
                    className="btn btn-dark btn-sm btn-rd ms-2 px-4 py-2 "
                  >
                    Logout
                    <IoLogOutOutline className="ms-2" />
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-primary btn-sm btn-rd me-2 px-4 py-2  ">
                  < FaUser className="me-1"/>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                
                  <Link to="/register" className="btn btn-danger btn-sm btn-rd px-4 py-2 ">
                  <FaUserPlus className="me-1"/>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;