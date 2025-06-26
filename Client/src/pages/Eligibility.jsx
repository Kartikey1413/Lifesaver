import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Eligibility = () => {
  return (
    <div className="container my-5">
      {/* Header Section */}
      <header className="text-center mb-4">
        <h2 className="display-4">Blood Donor Eligibility</h2>
        <p className="lead">
          Find out if you're eligible to donate blood and save lives.
        </p>
      </header>

      {/* Content Section */}
      <main>
        {/* Basic Requirements Section */}
        <section className="mb-5">
          <h2 className="h4 text-danger">Basic Requirements</h2>
          <ul className="list-group">
            <li className="list-group-item">
              Must be at least 17 years old (16 with parental consent).
            </li>
            <li className="list-group-item">
              Weigh at least 110 pounds (50 kilograms).
            </li>
            <li className="list-group-item">
              Be in good general health and feeling well.
            </li>
          </ul>
        </section>

        {/* Health Conditions Section */}
        <section className="mb-5">
          <h2 className="h4 text-danger">Health Conditions</h2>
          <p>
            Certain health conditions may temporarily or permanently prevent
            you from donating blood. Please consult with your doctor or blood
            donation center for more details.
          </p>
        </section>

        {/* Travel and Lifestyle Section */}
        <section className="mb-5">
          <h2 className="h4 text-danger">Travel and Lifestyle</h2>
          <p>
            Recent travel to certain countries or specific lifestyle factors
            may affect your eligibility. Ensure you disclose all relevant
            information during the screening process.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Eligibility;