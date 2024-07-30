import PropTypes from "prop-types";
import "./ImagePlaceholder.css";

const ImagePlaceholder = ({ className = "" }) => {
  return (
    <div className={`image-placeholder ${className}`}>
      <div className="placeholder-dots" />
      <div className="placeholder-dots1" />
      <div className="placeholder-dots2" />
      <div className="placeholder-dots3" />
      <div className="feature-icons-row-parent">
        <div className="feature-icons-row" />
        <div className="feature-icons-row1" />
        <div className="feature-icons-row2" />
        <div className="feature-icons-row3" />
        <div className="feature-icons-row4" />
        <div className="feature-icons-row5" />
        <img className="frame-child30" alt="" src="/group-3341@2x.png" />
        <img className="frame-child31" alt="" src="/group-3351@2x.png" />
      </div>
      <img
        className="image-2-icon"
        loading="lazy"
        alt=""
        src="/image-2@2x.png"
      />
    </div>
  );
};

ImagePlaceholder.propTypes = {
  className: PropTypes.string,
};

export default ImagePlaceholder;
