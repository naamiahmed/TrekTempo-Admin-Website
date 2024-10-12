import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import ImagePlaceholder from "./ImagePlaceholder";
import LoginForm from "./LoginForm";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSkip = () => {
    navigate("/20"); // Navigate to the Body component
  };

  return (
    <div className="home-page">
      <main className="sign-up1">
        <div className="image-container">
          <button className="skip" onClick={handleSkip}>
            SKIP
          </button>
          <div className="image-container-child" />
          <ImagePlaceholder />
        </div>
        <div className="content1">
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
