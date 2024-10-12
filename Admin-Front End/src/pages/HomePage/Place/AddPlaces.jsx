import React from "react";
import "./AddPlaces.css";

const AddPlaces = () => {
  return (
    <div className="Placecard">
      <img src="/AddPlaceIcon.png" alt="Add Places" className="card-icon" />
      <h2>Add Places</h2>
      <button className="card-button">➔</button>
    </div>
  );
};

export default AddPlaces;