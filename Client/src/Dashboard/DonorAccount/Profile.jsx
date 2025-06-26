import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, token, dispatch } = useContext(AuthContext); // Access authenticated user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
    // Set initial form data with user details
    setFormData({
      username: user.username || "",
      email: user.email || "",
      password: "",
    });
  }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`${BASE_URL}/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
        body: JSON.stringify(formData),
      });

      const { message } = await response.json();

      if (response.ok) {
        toast.success("user profile updated successfully.");
        // Update the user data in the context
        dispatch({
          type: "UPDATE_USER",
          payload: {
            user: response.data,
            token: response.token,
          },
        });
        navigate("/login"); 
        toast.success(message);
      } else {
        toast.error(message || "Failed to update user profile");
      }
    } catch (error) {
      toast.error("Server not responding");
    }
  };


  const confirmDelete = async () => {
    const result = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (result) {
      deleteAccount();
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/delete/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { message } = await response.json();

      if (response.ok) {
        dispatch({ type: "LOGOUT" });
        toast.success("Account deleted successfully.");
        navigate("/register");
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding. Please try again later.");
    }
  };

  // if (loading) {
  //   return <div className="text-center py-5">Loading...</div>;
  // }

  // if (error) {
  //   return <div className="text-center py-5">Error loading user data</div>;
  // }

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title">user Profile</h3>
        </div>
        <div className="card-body">
            <form action="" onSubmit={handleUpdate}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="username">Full Name:</label>{" "}
                  {/* Changed from Name to Username */}
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    disabled // Make email unchangeable
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
              <button
                onClick={confirmDelete}
                className="btn btn-danger ms-2"
              >
                Delete Account
              </button>
              {/* <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button> */}
            </form>
          
            {/* <>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>Full Name:</h5> {/* Changed from Name to Username 
                  <p>{formData.username}</p>
                </div>
                <div className="col-md-6">
                  <h5>Email:</h5>
                  <p>{formData.email}</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>Phone:</h5>
                  <p>{formData.phone}</p>
                </div>
                <div className="col-md-6">
                  <h5>Blood Group:</h5>
                  <p>{formData.bloodGroup}</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>Street:</h5>
                  <p>{formData.address?.street}</p>
                </div>
                <div className="col-md-6">
                  <h5>City:</h5>
                  <p>{formData.address?.city}</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>State:</h5>
                  <p>{formData.address?.state}</p>
                </div>
                <div className="col-md-6">
                  <h5>Pincode:</h5>
                  <p>{formData.address?.pincode}</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>Availability:</h5>
                  <p>{formData.isAvailable ? "Available" : "Not Available"}</p>
                </div>
              </div>
              <button
                className="btn btn-primary"
              >
                Edit Profile
              </button>
            </> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
