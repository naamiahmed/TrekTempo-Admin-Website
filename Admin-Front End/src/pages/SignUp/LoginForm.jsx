import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./LoginForm.css";

const LoginForm = ({ className = "" }) => {
  const navigate = useNavigate();

  // States for inputs and errors
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    // If no errors, return true
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = useCallback(
    (e) => {
      e.preventDefault();
      if (validateInputs()) {
        // If validation passes, navigate to the next page
        navigate("/16");
      }
    },
    [navigate, username, email, password, confirmPassword]
  );

  return (
    <form className={`login-form ${className}`} onSubmit={handleSignUp}>
      {/* <div className="login-form-child" /> */}
      <div className="signup-button">
        <div className="button-container">
          <div className="signup-label">
            <h1 className="sign-up2">SIGN UP</h1>
          </div>
          <div className="please-fill-the">
            Please fill the details and create an account
          </div>
        </div>
      </div>

      {/* Username Field */}
      <div className="input-fields">
        <div className="username">
          <div className="username-child" />
          <div className="username-input">
            <div className="username-input-child" />
            <img className="user-icon" alt="" src="/user-icon.svg" />
          </div>
          <input
            className="username-field"
            placeholder="USERNAME"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      {errors.username && <p className="error-text">{errors.username}</p>}

      {/* Email Field */}
      <div className="input-fields">
        <div className="username">
          <div className="username-child" />
          <div className="rectangle-parent3">
            <div className="password-icons-child" />
            <img
              className="email-envelope-3-streamline-n-icon"
              alt=""
              src="/emailenvelope3streamlinenovasvg.svg"
            />
          </div>
          <input
            className="mail-item"
            placeholder="EMAIL"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {errors.email && <p className="error-text">{errors.email}</p>}

      {/* Password Field */}
      <div className="password-fields-parent">
        <div className="password-fields">
          <div className="username-child" />
          <div className="password-input1">
            <div className="password-icons">
              <div className="password-icons-child" />
              <img
                className="lock-streamline-microsvg-icon"
                alt=""
                src="/lockstreamlinemicrosvg.svg"
              />
            </div>
            <input
              className="password-labels"
              placeholder="PASSWORD"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="visibility-toggles">
            <img className="eyeicon2" alt="" src="/eyeicon1.svg" />
          </div>
        </div>

          {errors.password && <p className="error-text">{errors.password}</p>}

        {/* Confirm Password Field */}
        <div className="password1">
          <div className="username-child" />
          <div className="frame-parent8">
            <div className="rectangle-parent3">
              <div className="password-icons-child" />
              <img
                className="lock-streamline-microsvg-icon1"
                alt=""
                src="/lockstreamlinemicrosvg-1.svg"
              />
            </div>
            <input
              className="frame-input"
              placeholder="CONFIRM PASSWORD"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="eyeicon-wrapper">
            <img className="eyeicon3" alt="" src="/eyeicon-1.svg" />
          </div>
        </div>
      </div>
      {errors.confirmPassword && (
        <p className="error-text">{errors.confirmPassword}</p>
      )}

      {/* Submit Button */}
      <div className="submit-button">
        <button type="submit" className="group-button">
          <div className="frame-child34" />
          <div className="sign-up3">SIGN UP</div>
        </button>
      </div>

      {/* Already have an account? */}
      <div className="account-options-wrapper">
        <div className="account-options">
          <div className="login-option">
            <div className="login-link">
              <div className="already-have-an">Already have an account ?</div>
              <div className="sign-in2" onClick={() => navigate("/16")}>
                Sign in
              </div>
            </div>
            <div className="social-login">
              <div className="or-connect">Or connect</div>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="social-buttons">
            <div className="social-icons">
              <img
                className="icons8-google-48-11"
                loading="lazy"
                alt=""
                src="/icons8google48-11@2x.png"
              />
              <img
                className="icons8-google-48-11"
                loading="lazy"
                alt=""
                src="/icons8facebook48-11@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
