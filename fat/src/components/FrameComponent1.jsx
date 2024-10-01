import PropTypes from "prop-types";
import "./FrameComponent1.css";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <div className={`dashboard-inner ${className}`}>
      <header className="frame-parent">
        <div className="image-17-parent">
          <img
            className="image-17-icon"
            loading="lazy"
            alt=""
            src="/image-17@2x.png"
          />
          <div className="tracktempo-wrapper">
            <b className="tracktempo">TrackTempo</b>
          </div>
        </div>
        <div className="frame-wrapper">
          <div className="settings-icon-parent">
            <div className="settings-icon">
              <div className="mdiweb-parent">
                <img
                  className="mdiweb-icon"
                  loading="lazy"
                  alt=""
                  src="/mdiweb.svg"
                />
                <img
                  className="vector-icon"
                  loading="lazy"
                  alt=""
                  src="/vector.svg"
                />
              </div>
            </div>
            <div className="frame-group">
              <img
                className="group-icon"
                loading="lazy"
                alt=""
                src="/group-410.svg"
              />
              <div className="dashiconsarrow-up-wrapper">
                <img
                  className="dashiconsarrow-up"
                  loading="lazy"
                  alt=""
                  src="/dashiconsarrowup.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
