import React from "react";
import { useNavigate } from "react-router-dom";
import "./places.css";
import "../../DisplayEvent/DisplayEvent"

const Places = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/25");
  };

  return (
    <div className="Addedplaces">
      <img src="/AddPlace.png" alt="Add Events" className="card-icon" />
      <h2>Available Places</h2>
      <button className="card-button" onClick={handleClick}>➔</button>
    </div>
  );
};

export default Places;