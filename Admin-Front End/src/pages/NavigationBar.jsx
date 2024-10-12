
import React from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <header className="navbar">
      <div className="logo-section">
        <img src="/Logo.png" alt="Logo" className="logo-icon" />
        <h1>TrackTempo</h1>
      </div>
      <div className="user-section">
        <img src="/Notifications.png" alt="Notifications" className="icon" />
        {/* <img src="/Profile.png" alt="User Profile" className="icon" /> */}
      </div>
    </header>
  );
};

export default NavigationBar;
