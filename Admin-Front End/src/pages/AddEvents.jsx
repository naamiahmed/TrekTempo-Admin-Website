import React from "react";
import "./AddEvents.css";

const AddEvents = () => {
  return (
    <div className="Eventcard">
      <img src="/AddEventIcon.png" alt="Add Events" className="card-icon" />
      <h2>Add Events</h2>
      <button className="card-button">➔</button>
    </div>
  );
};

export default AddEvents;