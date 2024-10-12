import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddPlaces.css";

const AddPlaces = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSkip = () => {
    navigate("/21"); // Navigate to the Body component
  };
  return (
    <div className="Placecard">
      <img src="/AddPlaceIcon.png" alt="Add Places" className="card-icon" />
      <h2>Add Places</h2>
      <button className="card-button"  onClick={handleSkip}>➔</button>
    </div>
    
      
    );
};

export default AddPlaces;