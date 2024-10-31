import React from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import "./Body.css";
// import "./NavigationBar.css";

// NavigationBar Component
// const NavigationBar = () => {
//   return (
//     <header className="navbar">
//       <div className="logo-section">
//         <img src="/AppIcon.png" alt="Logo" className="logo-icon" />
//         <h1 className="App-name">TrackTempo</h1>
//       </div>
//       <div className="user-section">
//         <img src="/Notifications.png" alt="Notifications" className="icon" />
//       </div>
//     </header>
//   );
// };

// AddPlaces Component
const AddPlaces = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard" onClick={() => navigate("/21")}>
      <img src="/AddPlaceIcon.png" alt="Add Places" className="card-icon" />
      <h2>Requested Places</h2>
      {/* <button className="card-button" >➔</button> */}
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
    <div className="Placecard" onClick={handleClick}>
      <img src="/AddEventIcon.png" alt="Add Events" className="card-icon" />
      <h2>Add Events</h2>
      {/* <button className="card-button" >➔</button> */}
    </div>
  );
};

// Places Component
const Places = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard" onClick={() => navigate("/25")}>
      <img src="/AddPlace.png" alt="Add Events" className="card-icon" />
      <h2>Available Places</h2>
      {/* <button className="card-button" >➔</button> */}
    </div>
  );
};

// AddNewPlace Component
const AddNewPlace = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard" onClick={() => navigate("/26")}>
      <img src="/AddPlace.png" alt="Add New Places" className="card-icon" />
      <h2>Add New Places</h2>
      {/* <button className="card-button" >➔</button> */}
    </div>
  );
};

// RequetedAccommodation Component
const RequetedAccommodation = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard" onClick={() => navigate("/27")}>
      <img
        src="/AddPlace.png"
        alt="Requested Accommodation"
        className="card-icon"
      />
      <h2>Accommodation</h2>
      {/* <button className="card-button" >➔</button> */}
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  return (
    <div className="Sidebar">
      <img
        src="/AppIcon.png"
        alt="Sidebar Image"
        className="sidebar-image"
      />
      <p className="sidebar-text">TREKTEMPO</p>
      <div className="horizontal-line"></div>
      {/* <h2>Sidebar</h2>
      <p>Additional content can go here.</p> */}
    </div>
  );
};

// CenteredContainer Component
const CenteredContainer = () => {
  return (
    <div className="CenteredContainer">
      <img src="/Dashboard.png" alt="Centered" className="centered-image" />
      <p className="centered-text">Dashboard</p>
    </div>
  );
};

// Main Body Component that renders all sections
const Body = () => {
  return (
    <Fade>
      <div className="Body">
      <Sidebar />
      <CenteredContainer />
        <div style={{ marginTop: "280px" }}>
          <AddPlaces />
          <AddEvents />
          <Places />
          <AddNewPlace />
          <RequetedAccommodation />
        </div>
        
      </div>
    </Fade>
  );
};

export default Body;
