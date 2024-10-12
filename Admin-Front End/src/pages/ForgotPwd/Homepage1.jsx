/* Forgot password page 3rd page */
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage1.css";

const Homepage1 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); 

  const onSendClick = useCallback(() => {
    navigate("/17", { state: { email: email } });
  }, [navigate, email]);

  return (
    <div className="homepage1">
      <main className="content">
        <section className="steps">
          <div className="steps-child" />
          <div className="step-three">
            <div className="step-four">
              <div className="step-five">
                <h2 className="forgot-password3">Forgot password</h2>
              </div>
              <div className="icon-frame">
                <div className="icon4">
                  <div className="verification-code-parent">
                    <div className="verification-code" />
                    <img
                      className="image-14-icon1"
                      loading="lazy"
                      alt=""
                      src="/image-14@2x.png"
                    />
                  </div>
                </div>
              </div>
              <div className="please-enter-your">
                Please enter your email address to receive a Verification Code
              </div>
            </div>
          </div>
          <div className="input-area">
            <div className="email-input1">
              <div className="email-entry">
                <div className="email-entry-child" />
                
                <input
                  type="email"
                  className="travelgmailcom1" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="loading-animation-parent">
              <div className="loading-animation">
                <div className="loading-dots">
                  {/* Any loading animation if necessary */}
                </div>
              </div>
              <button className="send-button" onClick={onSendClick}>
                <div className="xxxxxx" />
                <b className="send">SEND</b>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage1;
