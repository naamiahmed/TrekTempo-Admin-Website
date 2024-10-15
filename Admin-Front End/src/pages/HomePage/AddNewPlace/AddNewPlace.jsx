import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AddNewPlace.css";

const AddNewPlace = () => {
  const navigate = useNavigate(); // Call useNavigate to get the navigate function

  return (
    <div className="AddNewPlace">
      <img src="/AddPlace.png" alt="Add Events" className="card-icon" />
      <h2>Available Places</h2>
      {/* Use navigate function when button is clicked */}
      <button className="card-button" onClick={() => navigate("/26")}>➔</button>
    </div>
  );
};

export default AddNewPlace;
