import React from "react";
import { useNavigate } from "react-router-dom";
import "./Body.css";
import "./NavigationBar.css";

// NavigationBar Component
const NavigationBar = () => {
  return (
    <header className="navbar">
      <div className="logo-section">
        <img src="/AppIcon.png" alt="Logo" className="logo-icon" />
        <h1 className="App-name">TrackTempo</h1>
      </div>
      <div className="user-section">
        <img src="/Notifications.png" alt="Notifications" className="icon" />
      </div>
    </header>
  );
};

// AddPlaces Component
const AddPlaces = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard">
      <img src="/AddPlaceIcon.png" alt="Add Places" className="card-icon" />
      <h2>Requested New Places</h2>
      <button className="card-button" onClick={() => navigate("/21")}>➔</button>
    </div>
  );
};

// AddEvents Component
const AddEvents = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/22");
  };

  return (
    <div className="Placecard">
      <img src="/AddEventIcon.png" alt="Add Events" className="card-icon" />
      <h2>Add Events</h2>
      <button className="card-button" onClick={handleClick}>➔</button>
    </div>
  );
};

// Places Component
const Places = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard">
      <img src="/AddPlace.png" alt="Add Events" className="card-icon" />
      <h2>Available Places</h2>
      <button className="card-button" onClick={() => navigate("/25")}>➔</button>
    </div>
  );
};

// AddNewPlace Component
const AddNewPlace = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard">
      <img src="/AddPlace.png" alt="Add New Places" className="card-icon" />
      <h2>Add New Places</h2>
      <button className="card-button" onClick={() => navigate("/26")}>➔</button>
    </div>
  );
};

// RequetedAccommodation Component
const RequetedAccommodation = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard">
      <img src="/AddPlace.png" alt="Requested Accommodation" className="card-icon" />
      <h2>Requested Accommodation</h2>
      <button className="card-button" onClick={() => navigate("/27")}>➔</button>
    </div>
  );
};

// Main Body Component that renders all sections
const Body = () => {
  return (
    <div className="Body">
      <NavigationBar />
      <AddPlaces />
      <AddEvents />
      <Places />
      <AddNewPlace />
      <RequetedAccommodation />
    </div>
  );
};

export default Body;
