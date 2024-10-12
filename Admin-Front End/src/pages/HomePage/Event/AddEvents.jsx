import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddEvents.css";
import "../../DisplayEvent/DisplayEvent"

const AddEvents = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/22");
  };

  return (
    <div className="Eventcard">
      <img src="/AddEventIcon.png" alt="Add Events" className="card-icon" />
      <h2>Add Events</h2>
      <button className="card-button" onClick={handleClick}>➔</button>
    </div>
  );
};

export default AddEvents;