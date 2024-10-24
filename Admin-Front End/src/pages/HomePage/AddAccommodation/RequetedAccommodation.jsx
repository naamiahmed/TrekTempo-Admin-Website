import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./RequetedAccommodation.css";

const RequetedAccommodation = () => {
  const navigate = useNavigate(); // Call useNavigate to get the navigate function

  return (
    <div className="RequetedAccommodation">
      <img src="/AddPlace.png" alt="Requeted Accommodation" className="card-icon" />
      <h2>Requeted Accommodation</h2>
      {/* Use navigate function when button is clicked */}
      <button className="card-button" onClick={() => navigate("/27")}>➔</button>
    </div>
  );
};

export default RequetedAccommodation;
