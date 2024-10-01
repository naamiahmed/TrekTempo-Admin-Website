import PropTypes from "prop-types";
import "./FrameComponent.css";

const FrameComponent = ({ className = "" }) => {
  return (
    <div className={`rectangle-parent ${className}`}>
      <div className="rectangle-div" />
      <div className="vaadinlines-list-wrapper">
        <img
          className="vaadinlines-list-icon"
          loading="lazy"
          alt=""
          src="/vaadinlineslist.svg"
        />
      </div>
      <div className="tablerbrand-booking" />
      <div className="frame-container">
        <div className="cilsearch-wrapper">
          <img
            className="cilsearch-icon"
            loading="lazy"
            alt=""
            src="/cilsearch.svg"
          />
        </div>
        <div className="typcnhome-outline-parent">
          <img
            className="typcnhome-outline-icon"
            loading="lazy"
            alt=""
            src="/typcnhomeoutline.svg"
          />
          <div className="frame-div">
            <div className="frame-parent1">
              <div className="frame-parent2">
                <div className="mingcutesend-plane-fill-wrapper">
                  <img
                    className="cilsearch-icon"
                    loading="lazy"
                    alt=""
                    src="/mingcutesendplanefill.svg"
                  />
                </div>
                <img
                  className="icon-park-solidtrend"
                  loading="lazy"
                  alt=""
                  src="/iconparksolidtrend@2x.png"
                />
              </div>
              <img
                className="mask-group-icon"
                loading="lazy"
                alt=""
                src="/mask-group.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
