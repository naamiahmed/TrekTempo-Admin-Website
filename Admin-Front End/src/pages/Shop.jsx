import FrameComponent from "../components/FrameComponent";
import "./Shop.css";

const Shop = () => {
  return (
    <div className="shop">
      <main className="enter-draw">
        <form className="new-password-fields">
          <div className="new-password-fields-child" />
          <div className="reset-password-button">
            <h2 className="reset-password">Reset Password</h2>
          </div>
          <div className="icon-wrapper">
            <div className="icon">
              <img className="icon1" alt="" src="/icon.svg" />
              <div className="help-icons">
                <img
                  className="question-circle-streamline-ul-icon"
                  alt=""
                  src="/questioncirclestreamlineultimatepng@2x.png"
                />
                <img
                  className="icons8-reset-100-1"
                  alt=""
                  src="/icons8reset100-1@2x.png"
                />
                <img
                  className="icons8-lock-78-xxhdpi-1"
                  loading="lazy"
                  alt=""
                  src="/icons8lock78xxhdpi-1@2x.png"
                />
              </div>
            </div>
          </div>
          <div className="new-password-inputs">
            <div className="new-password-input-confirm">
              <input
                className="confirm-new-password-input"
                placeholder="Enter New Password"
                type="text"
              />
              <div className="eye-icon-parent">
                <div className="eye-icon-parent-child" />
                <img className="eyeicon" alt="" src="/eyeicon.svg" />
              </div>
            </div>
          </div>
          <div className="new-password-inputs">
            <div className="new-password-input-confirm">
              <input
                className="confirm-new-password"
                placeholder="Confirm New Password"
                type="text"
              />
              <div className="rectangle-parent">
                <div className="eye-icon-parent-child" />
                <img className="eyeicon" alt="" src="/eyeicon.svg" />
              </div>
            </div>
          </div>
          <FrameComponent propAlignSelf="unset" propWidth="452.8px" />
        </form>
      </main>
    </div>
  );
};

export default Shop;
