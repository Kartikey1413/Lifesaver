import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../utils/config";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

function AllDonors() {
  const [donors, setDonors] = useState([]);

  // Fetch all donors
  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = () => {
    axios
      .get(`${BASE_URL}/donors/all-donors`)
      .then((response) => {
        setDonors(response.data.data); // <- Make sure the backend returns data under .data
      })
      .catch((error) => {
        console.error("Error fetching donors:", error);
        toast.error("Failed to fetch donors.");
      });
  };

  // Delete donor by ID
  const deleteDonor = (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      axios
        .delete(`${BASE_URL}/donors/delete/${id}`) // fixed 'dalete' typo
        .then(() => {
          toast.success("Donor deleted successfully.");
          fetchDonors(); // Refresh the donor list
        })
        .catch((error) => {
          console.error("Error deleting donor:", error);
          toast.error("Failed to delete donor.");
        });
    }
  };

  // View donor details
  const viewDonor = (donor) => {
    alert(`
      Full Name: ${donor.fullname}
      Age: ${donor.age}
      Gender: ${donor.gender}
      Blood Group: ${donor.bloodGroup}
      phone: ${donor.phone}
      Address: ${donor.street}, ${donor.city}, ${donor.state}, ${donor.country} - ${donor.pincode}
      Available: ${donor.isAvailable ? "Yes" : "No"}
    `);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">All Donors</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Blood Group</th>
              <th>phone</th>
              <th>Address</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id}>
                <td>{donor._id}</td>
                <td>{donor.fullname}</td>
                <td>{donor.age}</td>
                <td>{donor.gender}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.phone}</td>
                <td>
                  {donor.street}, {donor.city}, {donor.state}, {donor.country} -{" "}
                  {donor.pincode}
                </td>
                <td>{donor.isAvailable ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => viewDonor(donor)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteDonor(donor._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllDonors;
