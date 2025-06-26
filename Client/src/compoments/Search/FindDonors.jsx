import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdLocationPin } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import BASE_URL from "../../utils/config";
import { useNavigate } from "react-router-dom";

const FindDonors = () => {
  const cityRef = useRef(0);
  const navigate = useNavigate();

  const YOUR_API_KEY = "6aec3bdc581a4530b912088e78b12ff7";

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${YOUR_API_KEY}`
          );
          // const address = response.data.results[0].formatted_address || "Unknown Address";
          const city =
            response.data.results[0].components.city || "Unknown City";
          // const state = response.data.results[0].components.state || "Unknown State";
          // const country = response.data.results[0].components.country || "Unknown Country";
          // const postalCode = response.data.results[0].components.postalcode || "Unknown Postal Code";

          cityRef.current.value = city; // Set the input field value
          // toast.success("Location fetched successfully!");
        } catch (err) {
          console.error(err);
          setError("Failed to fetch current city.");
        }
      },
      (err) => {
        console.error(err);
        setError("Failed to fetch current city.");
      }
    );
  };

  const SubmitHandler = async () => {
    const city = cityRef.current.value;
    if (city === "") {
      toast.error("Please provide a city.");
      return;
    }
    const encodedCity = encodeURIComponent(city);
    try {
      const response = await fetch(
        `${BASE_URL}/donors/search?city=${encodedCity}`
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error("No donors found.");
        return;
      }

      navigate(`/donors/search`, {
        state: result.data,
      });
    } catch (err) {
      toast.error("Server error while searching for donors");
    }
  };

  return (
    <div className="container py-4 ">
      <div className="bg-white shadow rounded p-4">
        <form className="row g-3 align-items-end justify-content-center">
          <div className="col-12 ">
            <h4 className="text-center">Find Blood Donors</h4>
          </div>
          {/* Location Input */}
          <div className="col-12 col-md-4">
            <label htmlFor="city" className="form-label d-flex ms-2 gap-2">
              <MdLocationPin size={20} />
              <span>Location</span>
            </label>
            <div className="input-group">
              <input
                type="search"
                id="city"
                placeholder="Find Donor by City"
                ref={cityRef}
                className="form-control"
              />
              <button
                type="button"
                id="city"
                className="btn btn-outline-secondary"
                onClick={fetchCurrentLocation}
              >
                <MdLocationPin size={20} />
              </button>
            </div>
          </div>
          
          <div className="col-12 col-md-2 text-center">
            <button
              type="button"
              className="btn btn-primary mt-4 d-flex gap-2"
              onClick={SubmitHandler}
            >
              <IoIosSearch size={20} />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindDonors;
