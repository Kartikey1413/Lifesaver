import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";

const CreateDonors = () => {
  const navigate = useNavigate();
  const { user,token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const YOUR_API_KEY = "6aec3bdc581a4530b912088e78b12ff7";

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${YOUR_API_KEY}`
          );
          const street = response.data.results[0].components.road || "Unknown Street";
          const city = response.data.results[0].components.city || "Unknown City";
          const state = response.data.results[0].components.state || "Unknown State";
          const country = response.data.results[0].components.country || "Unknown Country";
          const pincode = response.data.results[0].components.postcode || "Unknown Pincode";
            
          // Update formData with fetched location details
          setFormData((prevFormData) => ({
            ...prevFormData,
            street,
            city,
            state,
            country,
            pincode,
          }));
  
          toast.success("Location fetched successfully!");
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch current location.");
        }
      },
      (err) => {
        console.error(err);
        toast.error("Failed to fetch current location.");
      }
    );
  };


  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    photo: "",
    isAvailable: true,
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/donors/create/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const { message } = await response.json();

      if (response.ok) {
        toast.success(message);
        navigate("/home");
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center mb-4">Donor Profile</h2>
                <form onSubmit={handleSubmit}>
                  {/* Full Name and Phone */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="fullname"
                        placeholder="Enter Full Name"
                        className="form-control"
                        value={formData.fullname}
                        onChange={handleInput}
                        required
                      />
                      {formData.fullname && !/^[a-zA-Z\s]+$/.test(formData.fullname) && (
                        <div className="text-danger small mt-1">Name should only contain letters</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Enter Phone Number"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleInput}
                        required
                      />
                      {formData.phone && !/^\d{10}$/.test(formData.phone) && (
                        <div className="text-danger small mt-1">Phone number must be 10 digits</div>
                      )}
                    </div>
                  </div>

                  {/* Age, Gender, and Blood Group */}
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        name="age"
                        placeholder="Enter Age"
                        className="form-control"
                        value={formData.age}
                        onChange={handleInput}
                        required
                      />
                      {formData.age && (formData.age < 18 || formData.age > 65) && (
                        <div className="text-danger small mt-1">Age must be between 18 and 65</div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Gender</label>
                      <select
                        name="gender"
                        className="form-select"
                        value={formData.gender}
                        onChange={handleInput}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Blood Group</label>
                      <select
                        name="bloodGroup"
                        className="form-select"
                        value={formData.bloodGroup}
                        onChange={handleInput}
                        required
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Street</label>
                      <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        className="form-control"
                        value={formData.street}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="form-control"
                        value={formData.city}
                        onChange={handleInput}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">State</label>
                      <select
                        name="state"
                        className="form-select"
                        value={formData.state}
                        onChange={handleInput}
                        required
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Country</label>
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        className="form-control"
                        value={formData.country}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        className="form-control"
                        value={formData.pincode}
                        onChange={handleInput}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={fetchCurrentLocation}
                    >
                      Current Location
                    </button>
                  </div>

                  {/* Photo */}
                  <div className="mb-3">
                    <label className="form-label">Donor Photo</label>
                    <input
                      type="file"

                      name="photo"
                      placeholder="Choose Photo"
                      className="form-control"
                      value={formData.photo}
                      onChange={handleInput}
                      required
                    />
                  </div>

                  {/* Availability */}
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isAvailable"
                      name="isAvailable"
                      checked={formData.isAvailable}
                      onChange={(e) =>
                        setFormData({ ...formData, isAvailable: e.target.checked })
                      }
                    />
                    <label className="form-check-label" htmlFor="isAvailable">
                      Available for Donation
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDonors;