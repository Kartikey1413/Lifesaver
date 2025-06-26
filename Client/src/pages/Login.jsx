import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginImg from "../assets/images/login.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/config";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "donor",
    
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const logInHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: result.data,
            token: result.token,
            role: result.role,
          },
        });

        toast.success(result.message);

        // Navigate based on role and user status
        if (result.role === "admin") {
          navigate("/all-donors");
        } else if (result.role === "donor" && result.isNewUser) {
          navigate("/save-donor");
        } else {
          navigate("/");
        }
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server not responding");
    }
  };

  return (
    <div className="min-h-screen my-5 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {/* Login Photo */}
          <div className="col-md-6 d-none d-md-block">
            <img
              src={LoginImg}
              alt="LifeSaver Login Logo"
              className="img-fluid btn-rd"
            />
          </div>

          {/* Login Form */}
          <div className="col-12 col-md-6"> 
            <div className="card border-black">
              <div className="card-body">
                <h2 className="text-center mb-4">Login</h2>
                <p className="text-center text-muted mb-4">
                  Enter your credentials to access your account.
                </p>

                <form onSubmit={logInHandler}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInput}
                      required
                    />                  
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
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
                    />
                  </div>

                  <div className="mb-3">
                    {/* <label className="form-label " htmlFor="role">Role</label> */}
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

                      <div className="form-check">
                        <input
                          type="radio"
                          id="role.admin"
                          name="role"
                          value="admin"
                          onChange={handleInput}
                          checked={formData.role === "admin"}
                          className="form-check-input"
                        />
                        <label htmlFor="role.admin" className="form-check-label">
                          Admin
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                  <p className="text-center">
                    Don't have an Account?{" "}
                    <Link to="/register" className="text-primary text-decoration-none">
                      Register here
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

export default Login;