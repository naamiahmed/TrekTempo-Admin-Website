/* mail popup page */
import { useCallback } from "react";
import FrameComponent from "./FrameComponent";
import { useNavigate, useLocation } from "react-router-dom"; 
import "./Root.css";

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const email = location.state?.email || "No email provided";

  const onBackgroundClick = useCallback(() => {
    navigate("/18");
  }, [navigate]);

  return (
    <div className="root1">
      <main className="root-inner">
        <section className="frame-section">
          <div className="frame-child26" />
          <div className="frame-parent5">
            <div className="frame-wrapper2">
              <div className="frame-parent6">
                <div className="forgot-password-wrapper">
                  <div className="forgot-password2">Forgot password?</div>
                </div>
                <div className="frame-parent7">
                  <div className="icon-parent">
                    <div className="icon3">
                      <div className="ellipse-container">
                        <div className="frame-child27" />
                        <img
                          className="image-14-icon"
                          alt=""
                          src="/image-14@2x.png"
                        />
                      </div>
                    </div>
                    <div className="rectangle-parent2">
                      <div className="frame-child28" />
                      <div className="frame-wrapper3">
                        <div className="frame-wrapper4">
                          <div className="ellipse-parent1">
                            <div className="frame-child29" />
                            <img
                              className="pngwingcom-2-2"
                              loading="lazy"
                              alt=""
                              src="/pngwingcom-2-2@2x.png"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="verification-message-parent">
                        <div className="verification-message">
                          <div className="check-your-email">
                            Check your email
                          </div>
                        </div>
                        <div className="we-have-send">
                          We have send Verification code to your email
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="email-display-wrapper">
                    <div className="email-display">
                      <div className="email-display-child" />
                      {/* Display the email passed from the previous page */}
                      <div className="travelgmailcom">{email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FrameComponent />
            <div className="background" onClick={onBackgroundClick} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Root;
