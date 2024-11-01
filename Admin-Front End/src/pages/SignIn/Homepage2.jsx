import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Body from "../HomePage/Body/Body"; // Import the Body component
import "./Homepage2.css";

const Homepage2 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onForgotPasswordTextClick = useCallback(() => {
    navigate("/12");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email && !password) {
      setError("Invalid Credentials");
      return;
    }
    if (!email) {
      setError("Enter the Email");
      return;
    }
    if (!password) {
      setError("Enter the Password");
      return;
    }

    try {
      console.log("Sending sign-in request with:", { email, password });
      const response = await axios.post("http://localhost:5000/api/signin/", { email, password });
      console.log("Received response:", response);

      if (response.status === 200 && response.data) {
        // Handle successful login, e.g., save token, redirect, etc.
        console.log("Login successful:", response.data);
        navigate("/20"); // Navigate to the Body component
      } else {
        console.error("Unexpected response:", response);
        setError("Invalid Credentials");
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("Invalid Credentials");
    }
  };

  useEffect(() => {
    const setZoomLevel = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      let zoomLevel = 1;

      if (screenWidth < 1200 || screenHeight < 800) {
        zoomLevel = 0.67; // Adjust this value as needed
      } else if (screenWidth < 1600 || screenHeight < 900) {
        zoomLevel = 0.8; // Adjust this value as needed
      } else {
        zoomLevel = 1; // Default zoom level
      }

      document.body.style.zoom = zoomLevel;
    };

    setZoomLevel();
    window.addEventListener("resize", setZoomLevel);

    return () => {
      window.removeEventListener("resize", setZoomLevel);
    };
  }, []);

  return (
    <div className="homepage">
      <main className="header">
        <section className="frame-group">
          <div className="frame-wrapper">
            <form className="rectangle-container" onSubmit={handleSubmit}>
              <div className="frame-child11" />
              <div className="sign-in-wrapper">
                <h1 className="sign-in">SIGN IN</h1>
              </div>
              <div className="frame-container">
                <div className="email-input-parent">
                  <div className="email-input">
                    <h2 className="email">EMAIL</h2>
                  </div>
                  <input
                    className="rectangle-input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="password-input">
                <div className="password-label">
                  <div className="email-input">
                    <h2 className="password">PASSWORD</h2>
                  </div>
                  <input
                    className="rectangle-input login-button"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="account-question">
                    <h3
                      className="forgot-password1"
                      // onClick={onForgotPasswordTextClick}
                    >
                      Forgot password ? Click Help
                    </h3>
                  </div>
                </div>
              </div>
              {error && <div className="error">{error}</div>}
              <div className="separator">
                <button className="sign-in-btn" type="submit">
                  <div className="sign-in-btn-child" />
                  <b className="sign-in1">SIGN IN</b>
                </button>
              </div>
              <div className="facebook-login">
                <div className="or-label">
                  <div className="frame-div">
                    <div className="dont-you-have-any-account-alr-parent">
                      <div className="dont-you-have">
                        Don’t you have any account already? <span className="sign-up">HELP</span>
                      </div>
                    </div>
                    <div className="icons-facebook">
                      {/* <div className="or">Or</div> */}
                    </div>
                  </div>
                </div>
                <div className="frame-parent1">
                  <div className="line-parent">
                    <div className="line-div" />
                    <div className="line-div" />
                  </div>
                  <div className="frame-wrapper1">
                    <div className="frame-parent2">
                      <div className="ellipse-group"></div>
                      {/* <div className="icons8-google-48-1-wrapper">
                        <img
                          className="icons8-google-48-1"
                          loading="lazy"
                          alt=""
                          src="/icons8google48-1@2x.png"
                        />
                      </div>
                      <img
                        className="icons8-facebook-48-1"
                        loading="lazy"
                        alt=""
                        src="/icons8facebook48-1@2x.png"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="rectangle-parent1">
            <div className="frame-child23" />
            <div className="group-div">
              <div className="frame-parent3">
                <div className="frame-parent4">
                  <img className="group-icon" alt="" src="/group-334@2x.png" />
                  <img
                    className="frame-child24"
                    loading="lazy"
                    alt=""
                    src="/group-335@2x.png"
                  />
                </div>
                <img className="frame-child25" alt="" src="/group-333@2x.png" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage2;