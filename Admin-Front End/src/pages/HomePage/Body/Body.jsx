import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
    <div className="Placecard" >
      <img src="/AddPlaceIcon.png" alt="Add Places" className="card-icon" />
      <div className="flex-container">
      <h2>Places</h2>
      <div className="listofthings">
        <div onClick={() => navigate("/25")}>View</div>
        <div onClick={() => navigate("/26")}>Add</div>
        <div onClick={() => navigate("/21")}>Req</div>
      </div>
    </div>
      </div>
  );
};

// AddEvents Component
const AddEvents = () => {
  const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate("/22");
  // };

  return (
    <div className="Placecard">
      <img src="/AddEventIcon.png" alt="Add Events" className="card-icon" />
      <div className="flex-container">
      <h2>Events</h2>
      <div className="listofthings">
        <div onClick={() => navigate("/23")}>View</div>
        <div onClick={() => navigate("/add-event")}>Add</div>
        <div onClick={() => navigate("/22")}>Req</div>
      </div>
      </div>
    </div>
  );
};



// RequetedAccommodation Component
const RequetedAccommodation = () => {
  const navigate = useNavigate();

  return (
    <div className="Placecard">
      <img src="/AddPlace.png" alt="Requested Accommodation" className="card-icon" />
      <div className="flex-container">
      <h2>Accommodation</h2>
      <div className="listofthings">
        <div onClick={() => navigate("#")}>View</div>
        <div onClick={() => navigate("/add-accommodation")}>Add</div>
        <div onClick={() => navigate("/27")}>Req</div>
      </div>
      </div>
    </div>
  );
};




// Sidebar Component
const Sidebar = () => {
  return (
    <div className="Sidebar">
      <img src="/AppIcon.png" alt="Sidebar Image" className="sidebar-image" />
      <p className="sidebar-text">TRACKTEMPO</p>
      <div className="horizontal-line"></div>
    </div>
  );
};

// CenteredContainer Component
const CenteredContainer = () => {
  return (
    <div className="CenteredContainer">
      {/* <img src="/Dashboard.png" alt="Centered" className="centered-image" /> */}
      <h2 className="centered-text">Dashboard</h2>
    </div>
  );
};

// MainContent Component
const MainContent = () => {
  return (
    <div className="MainContent">
      
    </div>
  );
};

// Main Body Component that renders all sections
const Body = () => {
  return (
    <Fade>
      <div className="Body">
        <Sidebar />
        <div style={{ marginTop: "280px" }}>
          <AddPlaces />
          <AddEvents />
          <RequetedAccommodation />
        </div>
        <CenteredContainer />
        <MainContent />
      </div>
    </Fade>
  );
};

export default Body;