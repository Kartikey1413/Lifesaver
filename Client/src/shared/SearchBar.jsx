import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdBloodtype, MdLocationPin } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { toast } from "react-toastify";
import BASE_URL from "../utils/config";

const SearchBar = () => {
  const bloodGroupRef = useRef(0);
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
          const city =
            response.data.results[0].components.city || "Unknown City";
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
    const bloodGroup = bloodGroupRef.current.value;
    const city = cityRef.current.value;

    if (!bloodGroup || !city) {
      toast.error("Please fill all the fields");
      return;
    } 

     const encodedBloodGroup = encodeURIComponent(bloodGroup);
    const encodedCity = encodeURIComponent(city);
    
    try{
      // Fetch donors based on blood group and city
      const response = await fetch(
        `${BASE_URL}/donors/search?city=${encodedCity}&bloodGroup=${encodedBloodGroup}`
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error("No Record Found!");
        return;
      } 
        // If donors are found, pass the result to the next page via `navigate`
        navigate(`/donors/search`, { state: result.data });
      
    }catch(err){
      toast.error("Server error while searching for donors")
    }
  };

  return (
    <div className="container py-4">
      <div className="bg-white shadow rounded p-4">
        <form className="row g-3 align-items-end justify-content-evenly">
          <div className="col-12 ">
            <h4 className="text-center">Find Blood Donors</h4>
          </div>

          {/* Blood Group Select */}
          <div className="col-12 col-md-4">
            <label htmlFor="bloodGroup" className="form-label d-flex ms-2 gap-2">
              <MdBloodtype size={20} />
              <span>Blood Group</span>
            </label>
            <select ref={bloodGroupRef} id="bloodGroup" className="form-select">
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

          {/* Location Input */}
          <div className="col-12 col-md-4">
            <label htmlFor="city" className="form-label d-flex ms-2 gap-2">
              <MdLocationPin size={20} />
              <span>Location</span>
            </label>
            <div className="input-group">
              <input
                id="city"
                type="search"
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

          {/* Search Button */}
          <div className="col-12 col-md-2 text-center">
            <button
              type="button"
              className="btn btn-primary mt-4 d-flex align-items-center justify-content-center gap-2"
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

export default SearchBar;
