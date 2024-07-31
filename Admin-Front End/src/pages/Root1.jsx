/* OTP typing page */
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Root1.css";

const Root1 = () => {
  const navigate = useNavigate();

  const onVerifyButtonShapeClick = useCallback(() => {
    navigate("/19");
  }, [navigate]);

  return (
    <div className="root">
      <main className="sub-content-wrapper">
        <section className="sub-content">
          <div className="sub-content-child" />
          <div className="nested-content">
            <div className="deep-content">
              <div className="inner-content">
                <div className="forgot-password">Forgot password?</div>
              </div>
              <div className="icon-container">
                <div className="icon2">
                  <div className="icon-container1">
                    <div className="icon-container-child" />
                    <img
                      className="pngwingcom-1-1"
                      loading="lazy"
                      alt=""
                      src="/pngwingcom-1-1@2x.png"
                    />
                  </div>
                </div>
              </div>
              <div className="please-check-your-container">
                <span>{`Please check your email `}</span>
                <span className="wwwtravelgmailcom">www.travel@gmail.com</span>
                <span> to see the verification code</span>
              </div>
            </div>
          </div>
          <div className="resend-container-parent">
            <div className="resend-container">
              <div className="frame-parent">
                <div className="rectangle-group">
                  <div className="frame-item" />
                  <div className="frame-item" />
                  <div className="frame-item" />
                  <div className="frame-item" />
                </div>
                <div className="resend-otp-wrapper">
                  <div className="resend-otp">Resend OTP</div>
                </div>
              </div>
            </div>
            <div className="verification-container-parent">
              <div className="verification-container">
                <div className="ellipse-parent">
                  <div className="ellipse-div" />
                  <div className="frame-child2" />
                  <div className="frame-child3" />
                  <div className="frame-child4" />
                  <div className="frame-child5" />
                  <div className="frame-child6" />
                  <div className="frame-child7" />
                  <div className="frame-child8" />
                  <div className="frame-child9" />
                  <div className="frame-child10" />
                </div>
              </div>
              <button className="verify-button-shape-parent">
                <div
                  className="verify-button-shape"
                  onClick={onVerifyButtonShapeClick}
                />
                <b className="verify">Verify</b>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Root1;
