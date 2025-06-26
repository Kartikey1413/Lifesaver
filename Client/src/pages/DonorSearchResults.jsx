import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const DonorSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const donors = location.state; // Get the donors from the state passed

  // Handle case when no donors are returned
  if (!donors || donors.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>No donors found for the given search criteria.</h4>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center">Matching Blood Donors</h3>
      <div className="row">
        {donors.map((donor) => (
          <div className="col-md-4 mb-4" key={donor._id}>
            <Card className="shadow-sm h-100">
              {/* {donor.photo && (
                <Card.Img
                  variant="top"
                  src={donor.photo}
                  alt="Donor"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )} */}
              <Card.Body>
                <Card.Title className="fw-bold red">{donor.fullname}</Card.Title>
                <Card.Text>
                  <strong>Blood Group:</strong> {donor.bloodGroup}
                  <br />
                  <strong>Phone:</strong> {donor.phone}
                  <br />
                  <strong>Location:</strong> {donor.city}, {donor.state}
                  <br />
                  <strong>Age:</strong> {donor.age}
                  <br />
                  <strong>Gender:</strong> {donor.gender}
                  <br />
                  <strong>Available:</strong>{" "}
                  {donor.isAvailable ? "Yes" : "No"}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(donor.phone);
                    toast.success("Phone number copied to clipboard!");
                  }}
                >
                  Copy Phone
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorSearchResults;
