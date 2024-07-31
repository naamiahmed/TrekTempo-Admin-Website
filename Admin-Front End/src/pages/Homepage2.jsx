/* Sing IN page */
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage2.css";

const Homepage2 = () => {
  const navigate = useNavigate();

  const onForgotPasswordTextClick = useCallback(() => {
    navigate("/12");
  }, [navigate]);

  return (
    <div className="homepage">
      <main className="header">
        <section className="frame-group">
          <div className="frame-wrapper">
            <form className="rectangle-container">
              <div className="frame-child11" />
              <div className="sign-in-wrapper">
                <h1 className="sign-in">SIGN IN</h1>
              </div>
              <div className="frame-container">
                <div className="email-input-parent">
                  <div className="email-input">
                    <h2 className="email">EMAIL</h2>
                  </div>
                  <input className="rectangle-input" type="text" />
                </div>
              </div>
              <div className="password-input">
                <div className="password-label">
                  <div className="email-input">
                    <h2 className="password">PASSWORD</h2>
                  </div>
                  <div className="login-button" />
                  <div className="account-question">
                    <h3
                      className="forgot-password1"
                      onClick={onForgotPasswordTextClick}
                    >
                      Forgot password?
                    </h3>
                  </div>
                </div>
              </div>
              <div className="separator">
                <button className="sign-in-btn">
                  <div className="sign-in-btn-child" />
                  <b className="sign-in1">SIGN IN</b>
                </button>
              </div>
              <div className="facebook-login">
                <div className="or-label">
                  <div className="frame-div">
                    <div className="dont-you-have-any-account-alr-parent">
                      <div className="dont-you-have">Don’t you have any account already? <span className="sign-up">Sign up</span></div>
                      
                    </div>
                    <div className="icons-facebook">
                      <div className="or">Or</div>
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
                      <div className="ellipse-group">
                        
                      </div>
                      <div className="icons8-google-48-1-wrapper">
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
                      />
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
