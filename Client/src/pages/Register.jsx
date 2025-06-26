import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterImg from "../assets/Images/register.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/config";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"donor"
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { message } = await response.json();

      if (response.ok) {
        toast.success(message);
        navigate("/login");
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  return (
    <div className="min-h-screen my-5 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {/* Register Image */}
          <div className="col-md-6 d-none d-md-block">
            <img
              src={RegisterImg}
              alt="LifeSaver Register Logo"
              className="img-fluid btn-rd "
            />
          </div>

          {/* Register Form */}
          <div className="col-md-6">
            <div className="card border-black">
              <div className="card-body">
                <h2 className="text-center mb-4">Register</h2>
                <p className="text-center text-muted mb-4">
                  Create your account to start your journey.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Full Name<span className="red">*</span>
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your Full Name"
                      autoComplete="off"
                      className="form-control"
                      value={formData.username}
                      onChange={handleInput}
                      required
                      minLength={3}
                      maxLength={50}
                      pattern="^[a-zA-Z\s]+$"
                      title="Name should only contain letters and spaces"
                      autoCapitalize="on"
                      inputMode="text"
                    />
                    {formData.username && !/^[a-zA-Z\s]+$/.test(formData.username) && (
                      <div className="text-danger small mt-1">Name should only contain letters and spaces</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email<span className="red">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="xyz@gmail.com"
                      autoComplete="off"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInput}
                      required
                      pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                      title="Please enter a valid email address"
                      inputMode="email"
                    />
                    {formData.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email) && (
                      <div className="text-danger small mt-1">Please enter a valid email address</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password<span className="red">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleInput}
                      required
                      minLength={6}
                      maxLength={32}
                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$"
                      title="Password must be at least 6 characters and contain letters and numbers"
                      inputMode="text"
                    />
                    {formData.password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(formData.password) && (
                      <div className="text-danger small mt-1">Password must be at least 6 characters and contain letters and numbers</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password<span className="red">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={handleInput}
                      required
                      minLength={6}
                      maxLength={32}
                      title="Passwords must match"
                      inputMode="text"
                    />
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <div className="text-danger small mt-1">Passwords do not match</div>
                    )}
                  </div>

                  {/* 
                  {/* <div className="mb-3">
                    <label className="form-label">Role</label>
                    <div className="d-flex">
                      <div className="form-check me-3" required>
                        <input
                          type="radio"
                          id="role.donor"
                          name="role"
                          value="donor"
                          onChange={handleInput}
                          checked={formData.role === "donor"}
                          className="form-check-input"
                        />
                        <label htmlFor="role.donor" className="form-check-label">
                          Donor
                        </label>
                      </div>
                      <div className="form-check me-3">
                        <input
                          type="radio"
                          id="role.user"
                          name="role"
                          value="user"
                          onChange={handleInput}
                          checked={formData.role === "user"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="role.user"
                          className="form-check-label"
                        >
                          User
                        </label>
                      </div>
                    </div>
                  </div> */}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                  <p className="text-center">
                    Already have an Account?{" "}
                    <Link
                      to="/login"
                      className="text-primary text-decoration-none"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
