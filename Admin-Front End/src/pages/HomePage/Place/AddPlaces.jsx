import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddPlaces.css";

const AddPlaces = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <div className="Placecard">
      <img src="/AddPlaceIcon.png" alt="Add Places" className="card-icon" />
      <h2>Requested New Places</h2>
      <button className="card-button" onClick={() => navigate("/21")}>Skip</button>
    </div>
  );
};

export default AddPlaces;